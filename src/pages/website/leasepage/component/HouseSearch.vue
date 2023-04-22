<template>
  <div class="wh-full">
  <div v-if="!isHouseTotalEmpty" class="wh-full">
    <n-grid cols="1 xs:2 s:2 m:3 l:5" x-gap="12" y-gap="20" class="mt-20" item-responsive responsive="screen">
      <n-grid-item v-for="item in searchHouseList" :key="(item.key as string)" span="1" >
        <house-info-card @click.stop.prevent="toHouseDetail(item.house_id)" :card-date="item">
        </house-info-card>
      </n-grid-item>
    </n-grid>
    <div class="rent_foot">
      <p class="rent_foot-title">
        离家不再远，相顾如寓有。精选房源等你，找到适合你。
      </p>
    </div>
  </div>

    <div v-else class="wh-full">
      <n-empty :description="emptyText" />
    </div>
   </div>
</template>

<script setup lang="ts">
import {  useSearchStore } from "@/store";
import { ref } from "vue";
import houseInfoCard from '@/components/card/houseInfoCard.vue'
import { useRouterPush } from "@/composables";
import { storeToRefs } from "pinia";
defineOptions({ name: "houseSearch" })

const search = useSearchStore();
const { searchHouseList,isHouseTotalEmpty } = storeToRefs(search);



const { toHouseDetail } = useRouterPush();




const emptyText = computed(() => {
  return "暂无数据";
});

</script>

<style lang="scss" scoped>
.rent_foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px;
  text-align: center;

  .n-pagination {
    align-self: center;
  }

  p {
    margin-top: 32px;
    color: #222;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
