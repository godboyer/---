<template>
  <n-space class="wh-full" :vertical="true" :size="50">
    <n-space :vertical="true">
      <h2>当前选中城市</h2>
      <button class="action-button text-16px">
        {{ house.cityName }}
      </button>
    </n-space>

    <n-space :vertical="true">
      <h2>热门城市</h2>
      <n-space>
        <filter-button v-for="item in cityList" :key="item.city_id" :value="item.city_id" v-model="modelValue">
          {{ item.city_name }}
        </filter-button>
      </n-space>
    </n-space>

    <n-space justify="end">
      <button class="push-button btn-active" @click="handleSearch">确定</button>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { fetchCityList } from "@/service";
import { onMounted, ref, watch } from "vue";
import { useSearchStore, useHouseStore } from "@/store"
import FilterButton from "./FilterButton.vue";
defineOptions({ name: "cityTab" })

const search = useSearchStore()
const house = useHouseStore()
const { closeSearchPanel, openSearchPanel } = useSearchStore()
const cityList = ref<ApiCityManagement.City[]>([]);
const modelValue = ref<string>("");
async function initialData() {
  let { error, data } = await fetchCityList();

  if (!error) {
    cityList.value = data as ApiCityManagement.City[];
  }
}
function handleSearch() {
  closeSearchPanel()
}

watch(modelValue, (val) => {
  console.log('val: ', val);
  search.filter.city_id = val;
  search.filter.city_name = cityList.value.find(item => item.city_id === val)?.city_name || "";
})


onMounted(() => {
  initialData();
});
</script>

<style lang="scss" scoped></style>
