<template>
  <n-card :bordered="false" title="选择城市" class="wh-full">
    <n-space>
      <n-button v-for="item in cityList" :key="item.city_id" class="h-54px b-rd-12px"
        @click="handleClickCity(item.city_name)">
        {{ item.city_name }}
      </n-button>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { fetchCityList } from "@/service";

import { onMounted, ref } from "vue";
import { useSearchStore } from "@/store"

defineOptions({ name: "cityTab" })

const search = useSearchStore()
const cityList = ref<ApiCityManagement.City[]>([]);

async function initialData() {
  let { error, data } = await fetchCityList();

  if (!error) {
    cityList.value = data as ApiCityManagement.City[];
  }
}

function handleClickCity(city: string) {
  search.cityName = city;
  // window.$message?.info(`当前点击的是${city}`)

}


onMounted(() => {
  initialData();
});
</script>

<style lang="scss" scoped></style>
