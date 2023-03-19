<template>

        <n-page-header subtitle="让你的听觉更懂视觉">
    <n-grid :cols="5">
      <n-gi>
        <n-statistic label="正片" value="125 集" />
      </n-gi>
      <n-gi>
        <n-statistic label="嘉宾" value="22 位" />
      </n-gi>
      <n-gi>
        <n-statistic label="道歉" value="36 次" />
      </n-gi>
      <n-gi>
        <n-statistic label="话题" value="83 个" />
      </n-gi>
      <n-gi>
        <n-statistic label="参考链接" value="2,346 个" />
      </n-gi>
    </n-grid>
    <template #title>
      <a href="https://anyway.fm/" style="text-decoration: none; color: inherit"
        >Anyway.FM</a
      >
    </template>
    <template #header> 头部 </template>
    <template #avatar>
      <n-avatar
        src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
      />
    </template>
    <template #extra> </template>
    <template #footer> 
      <div class="h-12  b-t-2 b-b-2 flex justify-between items-center">
          <div>
            筛选条件
          </div>
          <n-switch class="" size="large" />
      </div>  
    </template>
 </n-page-header>

 <router-view></router-view>
    

  <n-grid
        cols="1 xs:2 s:2 m:3 l:5"
        x-gap="12"
        y-gap="20"
        class="mt-20"
        item-responsive
        responsive="screen"
      >
        <n-grid-item
          v-for="item in HouseInfoStore.HouseCardInfo"
          :key="item.house_id"
          span="1"
        >
          <cardone
            :Card1_Data="item"
            @click.stop.prevent="GoToHouseDetail(item.house_id)"
          >
          </cardone>
        </n-grid-item>
      </n-grid>
  <div class="rent_foot">  <n-pagination
        :on-update:page="upDatePage"
        :page-count="pageCount"
        v-model:page-size="pageSize"
      />
      <p class="rent_foot-title">
        离家不再远，相顾如寓有。精选房源等你，找到适合你。
      </p></div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, Ref, ref } from "vue";
import {
  GetHouseInfoAll,
  GetCardsInfo,
  GetPageingInfo,
} from "../../server/api/house";
import { decrypto } from "../../utils/crypto";
import cardone from "../../components/cardone.vue";
import LoadingCardCom from "./component/LoadingCardCom.vue";
import ErrorComponent from "./component/ErrorComponent.vue";
import {
  IapiResponse,
  IcardData,
  IhouseInfo,
  IpageingInfo,
} from "../../typings/ApiInterface";
import { useRouter } from "vue-router";
import { useHouseInfoStore } from "@/stores";

const HouseInfoStore = useHouseInfoStore();
const { getHouseInfo, setHouseInfo, setHouseCardInfo, getHouseCardInfo } =
  HouseInfoStore;
const router = useRouter();
const skeletonShow: Ref<boolean> = ref(true);
const page = ref(1);
const pageSize = ref(10);
let pageCount = ref(100);
const GoToHouseDetail = function (id: string) {
  router.push({
    path: `/house/${id}`,
  });
};
const InitalData = async function () {
  let res = (await GetPageingInfo({
    pageSize: pageSize.value,
  })) as unknown as IapiResponse<IpageingInfo>;
  if (res) {
    pageCount.value = (res.data as IpageingInfo).pageCount;
  }
};

const upDatePage = function (page: number) {
  console.log("我触发了");
  setHouseCardInfo({ pageSize: pageSize.value, page });
};

onMounted(() => {
  InitalData();
  page.value == 1 && setHouseCardInfo({ pageSize: pageSize.value, page: 1 });
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
.rent-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  background-color: #222;
}

.light-green {
  background-color: #222;
}
</style>
