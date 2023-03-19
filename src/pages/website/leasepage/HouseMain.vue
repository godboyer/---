<template>
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
  <div class="rent_foot">
    <n-pagination
      :on-update:page="upDatePage"
      :page-count="pageCount"
      v-model:page-size="pageSize"
    />
    <p class="rent_foot-title">
      离家不再远，相顾如寓有。精选房源等你，找到适合你。
    </p>
  </div>
</template>

<script setup lang="ts">
import { GetPageingInfo } from "@/server/api/house";
import { useHouseInfoStore } from "@/store/modules";
import { IapiResponse, IpageingInfo } from "@/typings/ApiInterface";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const HouseInfoStore = useHouseInfoStore();
const pageSize = ref(10);
let pageCount = ref(100);
const page = ref(1);

const { getHouseInfo, setHouseInfo, setHouseCardInfo, getHouseCardInfo } =
  HouseInfoStore;
const GoToHouseDetail = function (id: string) {
  router.push({
    path: `/house/detail`,
    query: {
      house_id: id,
    },
  });
};

const upDatePage = function (page: number) {
  console.log("我触发了");
  setHouseCardInfo({ pageSize: pageSize.value, page });
};

const InitalData = async function () {
  let res = (await GetPageingInfo({
    pageSize: pageSize.value,
  })) as unknown as IapiResponse<IpageingInfo>;
  if (res) {
    pageCount.value = (res.data as IpageingInfo).pageCount;
  }
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
</style>
