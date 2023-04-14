<template>
  <div class="wh-full flex-x-center">
    <system-header>
      <template #title>
        <slot name="title"> </slot>  
      </template>
    </system-header>
    <div class="main-container">
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "MiddleLayout",
});
</script>

<style lang="scss" scoped>
.main-container {
  width: 1440px;
  min-height: 100%;
  padding-top: 80px;
}
</style>
