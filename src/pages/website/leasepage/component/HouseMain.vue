<template>
  <div class="wh-full">
    <n-grid cols="1 xs:2 s:2 m:3 l:5" x-gap="12" y-gap="20" class="mt-20" item-responsive responsive="screen">
    <n-grid-item v-for="item in CardList" :key="item.key" span="1">
      <house-info-card @click.stop.prevent="GoToHouseDetail(item.house_id)" :card-date="item">
      </house-info-card>
    </n-grid-item>
  </n-grid>
  <div class="rent_foot">
    <n-pagination :show-size-picker="true" :on-update:page="updatePage" @update:page-size="handlerPageSizeUpdate"
      :page-count="pageCount" :page-sizes="[10, 20, 30]" v-model:page-size="pageSize" />
    <p class="rent_foot-title">
      离家不再远，相顾如寓有。精选房源等你，找到适合你。
    </p>
  </div>
  </div>
  
</template>

<script setup lang="ts">
import { useHouseStore, useSearchStore } from "@/store";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import houseInfoCard from '@/components/card/houseInfoCard.vue'

defineOptions({ name: "houseMain" })

const house = useHouseStore();
const search = useSearchStore()
const router = useRouter();

const pageSize = ref(30);
let pageCount = ref(0);
const page = ref(1);
const CardList = ref<HousePage.CardList[]>([]);

const GoToHouseDetail = function (id: string) {
  router.push({
    path: `/house/detail`,
    query: {
      house_id: id,
    },
  });
};

const updatePage = async function (page: number) {
  let payload = {
    page,
    pageSize: pageSize.value,
    city_id: search.filter.city_id,
  };
  await house.GetHouseCardInfoByCity(payload);
  setCardList(house.HouseCardList);
};

async function handlerPageSizeUpdate(pageSize: number) {
  let payload = {
    page: page.value,
    pageSize,
    city_id: search.filter.city_id,
  };
   await house.GetHouseCardInfoByCity(payload);
  setCardList(house.HouseCardList);
}

function setCardList(data: HousePage.CardList[]) {
  CardList.value = data;
}

async function InitalData() {
  let payload = {
    city_id: search.filter.city_id,
    page: page.value,
    pageSize: pageSize.value,
  };



  await house.GetHouseCardInfoByCity(payload);
  setCardList(house.HouseCardList);
  pageCount.value = Math.ceil(Number(house.houseTotal) / pageSize.value);
}

onMounted(() => {
  InitalData();
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
