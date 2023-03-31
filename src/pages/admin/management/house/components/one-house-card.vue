<template>
  <n-space vertical>
    <n-grid cols="5" rows="2" x-gap="32px">
      <n-grid-item span="2"
        ><n-card class="left-card">
          <template #cover>
            <n-carousel show-arrow>
              <img
                v-for="(picSrc, idx) in houseDataOne.swiper_pic"
                :key="idx"
                class="carousel-img"
                :src="picSrc"
              />
            </n-carousel>
          </template> </n-card
      ></n-grid-item>
      <n-grid-item span="3">
        <n-list>
          <template #header> {{ houseDataOne.title }} </template>

          <n-list-item v-for="(v, idx) in tableTitle">
            <!-- <template #prefix>
              <n-button>Prefix</n-button>
            </template> -->
            <!-- <template #suffix>
              <n-button>Suffix</n-button>
            </template> -->
            <!-- <n-thing :title="v.label + ':'" :title-extra="houseDataOne[v.key]"> -->
            <!-- </n-thing> -->
          </n-list-item>
          <n-list-item> </n-list-item> </n-list
      ></n-grid-item>
    </n-grid>

    <n-grid cols="1">
      <n-grid-item>
        <n-list>
          <template #header> 房源介绍 </template>
          <n-list-item v-if="houseDataOne.house_description != ''">
            {{ houseDataOne.house_description }}
          </n-list-item>
          <n-list-item v-else
            >房源位置 这是1套自如品质房源，位于汉阳人信汇二期天悦。</n-list-item
          >
        </n-list></n-grid-item
      >
    </n-grid>
  </n-space>
</template>

<script setup lang="ts">
import { TableTh } from "@/store/modules/admin/tableData";
import * as _ from "lodash";
import { keysOf } from "naive-ui/es/_utils";
defineOptions({name:'oneHouseCard'})


const tableTitle = _.filter(TableTh, (item: any) => {
  if (item.key === "Homeowner_info") {
  }

  return (
    item.key != "house_description" &&
    item.key != "operation" &&
    item.key != "first_picture" &&
    item.key != "index"
  );
});

const props = defineProps<{
  houseDataOne: HouseManagement.HouseInfo;
}>();


</script>

<style lang="scss" scoped>
.carousel-img {
  //   width: 210px;
  //   height: 420px;
  object-fit: cover;
}
.left-card {
  //   width: 420px;
  height: 410px;
  margin-right: 12px;
  border-radius: 8px;
}
:deep(.n-card-cover) {
  border-radius: 8px;
}
.n-list {
  // column-count: 2;
}
</style>
