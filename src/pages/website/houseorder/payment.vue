<template>
  <n-space :vertical="true">
    <div class="h80px">
      <system-header>
        <template #title>支付订单</template>
      </system-header>
    </div>
    <div class="container">
      <n-thing>
        <template #avatar>
          <n-image width="100" :src="oneHouseInfo?.first_picture" />
        </template>
        <template #header>
          {{ oneHouseInfo?.title }}
        </template>
        <template #header-extra>
          <div>
            <n-avatar
              :src="(oneHouseInfo?.owner_id?.avatar as string)"
            ></n-avatar>
            <p>{{ order.lessor }}</p>
          </div>
        </template>
        <template #description>
          {{ oneHouseInfo?.location }}
        </template>
        <template #footer>
          <!-- 租住 时长 -->
          <div>
            <span class="mr-12px">租住时长:</span>
            <span
              >{{ dayjs(order.begin_date).format("YYYY-MM-DD") }} 至
              {{ dayjs(order.end_date).format("YYYY-MM-DD") }}</span
            >
          </div>

          <div>
            <span class="mr-12px">租金:</span>
            <span>{{ oneHouseInfo?.price }}元/月</span>
          </div>

        </template>
        <template #action>
        <n-space justify="space-between" align="center">
            <div>
                <span>总价:</span>
                <span>{{ order.amount }}元</span>
            </div>
            <n-button @click="goPay">去支付</n-button>
        </n-space>
            
        </template>
      </n-thing>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useOrderStore, useHouseStore } from "@/store";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store";
import { computed, ref, watchEffect } from "vue";
import dayjs from "dayjs";
const order = useOrderStore();
const { userInfo } = useAuthStore();
const house = useHouseStore();
const { oneHouseInfo } = storeToRefs(house);
const route = useRoute();
console.log(house.OneHouseDetailInfo);


function goPay() {
    
    console.log('去支付');
}

watchEffect(
  () => {
    if (!oneHouseInfo.value) {
      house.getOneHouseDetailByFetch(order.houseId);
    }
    console.log("我执行了");
  },
  {
    flush: "post",
  }
);
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
