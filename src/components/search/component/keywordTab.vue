<template>
     <n-card :bordered="false"  title="选择城市" class="wh-full">
    <n-space>
      <n-button
      v-for="item in cityList"
      :key="item.city_id"
      class="h-54px b-rd-12px"
      @click="handleClickCity(item.city_name)"
    >
      {{ item.city_name }}
    </n-button>
    </n-space>
  </n-card>

</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>

</style>