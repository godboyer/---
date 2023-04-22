<template>
  <div class="wh-full">

 
  <div v-if="!isHouseTotalEmpty" class="wh-full">
    <n-grid cols="1 xs:2 s:2 m:3 l:5" x-gap="12" y-gap="20" class="mt-20" item-responsive responsive="screen">
      <n-grid-item v-for="item in HouseCardListData" :key="(item._id as string) " span="1">
        <house-info-card @click.stop.prevent="toHouseDetail(item.house_id)" :card-date="item">
        </house-info-card>
      </n-grid-item>
    </n-grid>
    <div v-show="!isHouseTotalEmpty" class="rent_foot">
      <n-pagination :show-size-picker="true" @update:page="updatePage" @update:page-size="handlerPageSizeUpdate"
        :page-count="pagination.pageCount" v-model:page="pagination.page" :page-sizes="[10, 20, 30]" size="large"
        v-model:page-size="pagination.pageSize">
      </n-pagination>
      <p class="rent_foot-title">
        离家不再远，相顾如寓有。精选房源等你，找到适合你。
        pagination.pageCount: {{ pagination.pageCount }}
        pagination.pageSize: {{ pagination.pageSize }}
      </p>
    </div>
  </div>

    <div v-else class="wh-full">
      <n-empty :description="emptyText" />

    </div>
   </div>
</template>

<script setup lang="ts">
import { useHouseStore, useSearchStore } from "@/store";
import { ref } from "vue";
import houseInfoCard from '@/components/card/houseInfoCard.vue'
import { useRouterPush } from "@/composables";
import { storeToRefs } from "pinia";
defineOptions({ name: "houseMain" })
const house = useHouseStore();
const { changePageCount,setCurrentPage } = useHouseStore();
const { HouseCardList, paginatedData, pagination, houseTotal,isHouseTotalEmpty,HouseCardListData } = storeToRefs(house);

const { toHouseDetail } = useRouterPush();

const updatePage = async function (page: number) {
  changePageCount()
 
};

async function handlerPageSizeUpdate(pageSize: number) {
  changePageCount()
  /**进行一次判断 */
  if (pageSize * pagination.value.page > (houseTotal.value as number)) {
    setCurrentPage(1)
  }
 
}


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
