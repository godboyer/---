<template>
    <div  class="price">
        {{price?.split("/").join("元/") }}
    </div>
</template>

<script setup lang='ts'>

interface Props {
    price: string;
 }

defineOptions({ name: 'priceComp' })
defineProps<Props>()

</script>

<style lang='scss' scoped>
    .price {
        
      font-size: 18px;
      color: #e01212;
      font-weight: 700;
    }

</style>