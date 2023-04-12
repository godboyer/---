<template>
    <input type="text" v-model="textValue">
</template>

<script setup lang='ts'>
import { ref } from 'vue';
export  interface IUseExpose {
    setvalue: (value: string) => void;
    textValue: string;
}

defineOptions({name:'useexpose'})
const textValue = ref('13123')

defineExpose<IUseExpose>({
    setvalue,
    textValue: textValue.value
})

function onInput(e: any) {
    textValue.value = e.target.value
}

function setvalue(value: string) {
    textValue.value = value
}

</script>

<style lang='scss' scoped></style>