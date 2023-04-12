<template>
    <p>{{count}}</p>
    <ul>
        <li v-for="(value,key)  in  lietem"  :key="key">
            <template v-if="actionItme == 'array'">
                 <slot v-bind="value"></slot>
            </template>
             <template v-else-if="actionItme == 'object'">
                 <span> {{value }} </span>  
                 <span> {{key }} </span>  
                 <slot v-bind="key"></slot>
            </template>
              <template v-else="actionItme == 'undefined'">
                 <slot v-bind="value"></slot>
            </template>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { isArray, isObject } from '@/utils';
import { watchEffect } from 'vue';
import { computed, ref } from 'vue';

defineOptions({
    name: 'listcomp',

})
const count = ref(0)
const props = defineProps<{
    lietem: any[] | object
}>()

const actionItme = computed(() => {
    if (isArray(props.lietem)) {
        return 'array'

    }
    if (isObject(props.lietem)) {
        return 'object'
    }

})

watchEffect(() => {
    // console.log("执行watchEffect",props.lietem);
    // console.log("actionItme---watchEffect", actionItme)
    // count.value++
}, { flush: 'sync' })

</script>

<style lang='scss' scoped></style>