<template>
    <div>
        <p>这里有很多插槽</p>


        <template v-for="(value, name)  in slots" :key="name">
            <p>{{ name }}</p>
            <slot :name="name" v-bind="handleClickfu"></slot>
        </template>


    </div>
</template>

<script setup lang='ts'>
import { useSlots, watchEffect, useAttrs, onBeforeMount } from 'vue';
import listcomp from './listcomp.vue';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useContext } from '@/hooks';
import { inject } from 'vue';
defineOptions({
    name: 'useSlotComp',
})
const props = defineProps<{
    aterSds: any
}>()

const { useInject } = useContext()

const slots = useSlots();
const attrs = useAttrs()
const newContext = inject('myContext')

function handleClickfu() {
    console.log("handleClickfu", newContext);
    if (newContext) {
        (newContext as any).value.name = '我是新的名字'
    }

}

onBeforeMount(() => {
    console.log("执行onBeforeMount", props.aterSds);
    console.log("这是slots有啥", slots)
    console.log("这是attrs有啥", attrs,)
    console.log("这是useInject有啥")
})
onMounted(() => {
    console.log("执行onMounted", props.aterSds);
    // if () {

    // }


})
const newfunc = props.aterSds()

console.log("执行setup这是slots有啥", slots, attrs, Object.keys(slots), props.aterSds)
watchEffect(() => {
    console.log("执行watchEffect");
    console.log("watchEffect", slots)
}, { flush: 'post' })


</script>

<style lang='scss' scoped></style>