<template>
  <n-space :vertical="true">
    <div class="h80px">
      <system-header></system-header>
    </div>
    <div class="container pt-80px">
      <n-space align="center" justify="space-between">
        <div class="flex-y-center gap-12px">
          <span> 选择入住日期: </span>
          <n-date-picker
            @confirm="confirmHandle"
            v-model:value="range"
            type="daterange"
            clearable
          />
        </div>
        <n-button :disabled="!disabled" @click="generateContractHandle"
          >生成合同</n-button
        >
      </n-space>
    </div>
    <Transition  name="fade-slide" >
      <contract
        v-if="showContract"
        :lessor="lessor"
        :lessee="lessee"
        :price="price"
      />
    </Transition>
  </n-space>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import contract from "./contract.vue";
import { useOrderStore, useHouseStore, useAuthStore } from "@/store";
import { useRoute } from "vue-router";

const order = useOrderStore();
const { userInfo } = useAuthStore();
const { setLesser, setLessor, setHouseId, setOrderInfo } = useOrderStore();
const house = useHouseStore();
const { HomeownerInfo } = storeToRefs(house);
const { lessor, lessee } = storeToRefs(order);
const route = useRoute();

const price = computed(() => {
  return house.OneHouseDetailInfo?.price as number;
});
const houseId = ref("");
const range = ref<[number, number]>([Date.now(), Date.now()]);

const showContract = ref(false);
const disabled = computed(() => {
  return (
    range.value[0] < range.value[1] &&
    range.value[1] - range.value[0] > 30 * 24 * 60 * 60 * 1000
  );
});
function generateContractHandle() {
  showContract.value = true;
  const orderNumber = Date.now().toString();
  let days = Math.ceil(
    (range.value[1] - range.value[0]) / (24 * 60 * 60 * 1000)
  );
  //月份
  let  months = Math.ceil(days / 30);
  let orderInfo: ApiRentalOrderManagement.RentalOrder = {
    houselease_id: orderNumber,
    house_id: houseId.value,
    user_id: userInfo.user_id,
    begin_date: range.value[0],
    end_date: range.value[1],
    days,
    house_price: price.value,
    amount: price.value * months,
    status: "1", //待支付
    createAt: Date.now(),
    };
  //设置订单信息
  setOrderInfo(orderInfo);
}

function confirmHandle(value: [number, number]) {
  console.log("value: ", value);
  //进行时间的判断
  if (value[0] > value[1]) {
    window.$message?.error("请选择正确的时间");
    return;
  } else {
    //不满一个月
    if (value[1] - value[0] < 30 * 24 * 60 * 60 * 1000) {
      window.$message?.error("最短租住时间一个月");
      return;
    }
  }
}

onMounted(() => {
  if (route.query) {
    houseId.value = route.query.houseId as string;
    setLesser(userInfo.username as string);
    setLessor(HomeownerInfo.value?.username as string);
    setHouseId(houseId.value);
  }
});
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

td,
th {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

th {
  background-color: #f2f2f2;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.signature {
  margin-top: 50px;
  text-align: center;
}

.signature p {
  margin-bottom: 10px;
}

.signature .name {
  font-weight: bold;
}
</style>
