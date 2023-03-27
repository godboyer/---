<template>
  <div  class="flex-col-center  w-20 ">
    <RouterLink class="ml-1" :to="to">
      <img class="w-19 h-18 mt-1.5" :src="src" alt="logo" srcset="" />
    </RouterLink>
    <slot name="title"></slot>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  src: string;
  to: string;
}>();
</script>


<style lang="scss" scoped>

</style>
