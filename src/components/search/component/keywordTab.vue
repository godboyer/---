<template>
  <div  class="wh-full">

    <n-space>
      <FilterButton v-for="item in keywords" :key="item.value" :label="item.label" :value="item.value"
      v-model="modelValue">
        <span class="wh-full">{{ item.label }}</span>
      </FilterButton>
    </n-space>






    <n-space justify="end">
      <button class="push-button btn-active" @click="handleSearch">确定</button>
    </n-space>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useSearchStore } from '@/store'
import FilterButton from "./FilterButton.vue";
const { closeSearchPanel } = useSearchStore()
const search = useSearchStore()
const modelValue = ref<string>("");
function handleSearch() {
  closeSearchPanel()
}

const keywords = ref([
  {
    label: 'loft',
    value: 'loft'
  },
  {
    label: '近地铁',
    value: '地铁'
  },
  {
    label: '有电梯',
    value: '电梯'
  },
  {
    label: '有独卫',
    value: '独卫'
  },
  {
    label: '有床',
    value: '床'
  },
  {
    label: '有空调',
    value: '空调'
  },
  {
    label: '有热水器',
    value: '热水器'
  },
 
  {
    label: '有洗衣机',
    value: '洗衣机'
  },
  {
    label: '有冰箱',
    value: '冰箱'
  },
 
  {
    label: '有沙发',
    value: '沙发'
  },
  {
    label: '有电视',
    value: '电视'
  },
  {
    label: '有书桌',
    value: '书桌'
  },
  {
    label: '有书柜',
    value: '书柜'
  },
  {
    label: '有餐桌',
    value: '餐桌'
  },

 
 


])
watch(modelValue, (val) => {
  console.log('val: ', val);
  search.filter.keywords.push(val)  ;
})

</script>

<style lang='scss' scoped></style>