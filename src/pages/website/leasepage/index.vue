<template>
  <n-page-header v-show="!store.showMapFlag" subtitle="让你的听觉更懂视觉">
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
    
    </template>
  </n-page-header>
  <div class="h-12 b-t-2 b-b-2 flex justify-between items-center" :class="{topmap:store.showMapFlag}">
        <div>筛选条件</div>
        <div class="flex-y-center">
         <span class="mr-1">显示地图</span>
          <n-switch
            class=""
            size="large"
            :value="store.showMapFlag"
            :loading="loading"
            @update:value="handleUpdateValue"
          />
        </div>
  </div>
  <router-view ></router-view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUpdated, Ref, ref, unref } from "vue";
import {
  GetHouseInfoAll,
  GetCardsInfo,
  GetPageingInfo,
} from "@/server/api/house";
import { decrypto } from "@/utils/crypto";
import cardone from "@/components/cardone.vue";
import LoadingCardCom from "../component/LoadingCardCom.vue";
import ErrorComponent from "../component/ErrorComponent.vue";
import {
  IapiResponse,
  IcardData,
  IhouseInfo,
  IpageingInfo,
} from "@/typings/ApiInterface";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/store"
const store = useAppStore()
const router = useRouter()
const route = useRoute()
const loading: Ref<boolean> = ref(false);
const activeValue: Ref<boolean> = ref(false);
const handleUpdateValue = function (value: boolean) {
    console.log('value: ', value);
    console.log(unref(loading));
    if (value) {
    loading.value = true

        setTimeout(() => {
            router.push("/lease/map")
          store.$patch({
           showMapFlag:value
          })
          loading.value = false
        }, 1000)

    } else {
         store.$patch({
           showMapFlag:value
          })
        router.push("/lease/home")
    }
   

}
onUpdated(() => {

   switch (route.path) {
      case "/lease/home":
          store.toggleShowMapFlag(false)
            break;
      case "/lease/map":
          store.toggleShowMapFlag(true)
            break;
    
        default:
            break;
    }

})
onMounted(() => {
  console.log("object",route.path);

    switch (route.path) {
      case "/lease/home":
          store.toggleShowMapFlag(false)
            break;
      case "/lease/map":
          store.toggleShowMapFlag(true)
            break;
    
        default:
            break;
    }


    
})



</script>

<style lang="scss" scoped>
.rent-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  background-color: #222;
}
.topmap{
  position: fixed;
  left: 0;
  padding: 0 24px;
  top: 80px;
  width: 100% !important;
  z-index: 9;
  background-color: #fff;
}
.light-green {
  background-color: #222;
}
</style>
