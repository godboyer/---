<template>
  <div  title="选择城市" class="wh-full">
    关键字搜索
     <n-space justify="end">
      <button class="push-button btn-active" @click="handleSearch">确定</button>
    </n-space>
  </div>
  
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useSearchStore } from '@/store'
const { closeSearchPanel, setKeywords } = useSearchStore()
const search = useSearchStore()

function handleSearch() {


  closeSearchPanel()
}
</script>

<style lang='scss' scoped>

</style>