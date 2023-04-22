<template>
  <n-grid :cols="24" :x-gap="45" class="relative">
    <n-grid-item class="flex-center" span="12">
      <slot name="left"></slot>
    </n-grid-item>
    <n-grid-item class="flex-center" span="12">
      <slot name="right"></slot>
    </n-grid-item>
  </n-grid>
 
</template>

<script setup lang="ts">
defineOptions({
  name: "LeftAndRightLayout",
});
</script>

<style lang="scss" scoped>

</style>
