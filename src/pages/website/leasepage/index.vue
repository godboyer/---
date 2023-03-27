<template>
  <n-page-header
    v-show="!app.showMapFlag || showPopover"
    subtitle=" 当前所在城市共有：2200套房源"
  >
    <n-grid :cols="5">
      <n-gi>
        <n-statistic label="整租" value="125 个" />
      </n-gi>
      <n-gi>
        <n-statistic label="合租" value="22 个" />
      </n-gi>
      <n-gi>
        <n-statistic label="二手房" value="36 个" />
      </n-gi>
      <n-gi>
        <n-statistic label="车库" value="83 个" />
      </n-gi>
      <n-gi>
        <n-statistic label="别墅" value="2,346 个" />
      </n-gi>
    </n-grid>
    <template #title> 所在城市：武汉 </template>
    <template #header> </template>
    <template #avatar>
      <n-avatar
        src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
      />
    </template>
    <template #extra> </template>
    <template #footer> </template>
  </n-page-header>
  <div
    :class="{ topmap: app.showMapFlag }"
  >
  <search-tab/>
  </div>
  <div  v-show="visible"  ref="backdropRef"  class="backdrop-box"></div>
  <router-view v-slot="{ Component, route }">
    <!-- <transition :name="theme.pageAnimateMode" mode="out-in" :appear="true"> -->
    <keep-alive :include="['houseMain', 'houseMap']">
      <Suspense>
        <component
          :is="Component"
          v-if="app.reloadFlag"
          :key="route.fullPath"
        />
        <template #fallback> <LoadingCardCom /> </template>
      </Suspense>
    </keep-alive>
    <!-- </transition> -->
  </router-view>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/store";
import { onMounted, ref, Ref } from "vue";
import mapSwitch from "./component/map-switch.vue";
import searchTab from "./component/search-tab.vue";
const value = ref([50, 70]);
const overlap = ref(false);
const visible   = ref(false);
const app = useAppStore();
const router = useRouter();
const route = useRoute();
const loading: Ref<boolean> = ref(false);
const showPopover = ref(false);
const filterdomRef  =  ref<HTMLElement|null>(null)
const backdropRef = ref<HTMLElement|null>(null)
onMounted(() => {
  switch (route.path) {
    case "/lease/home":
      app.toggleShowMapFlag(false);
      break;
    case "/lease/map":
      app.toggleShowMapFlag(true);
      break;

    default:
      break;
  }
});

function handleBackDrop(e:Event) {
    console.log("事件",e.target);
  visible.value = true;
  showPopover.value = true;
  let height = filterdomRef.value?.offsetTop  
    console.log(filterdomRef.value?.offsetTop);
    backdropRef.value.style.top = `${height}px`
}
function handlePopoverShow(value: boolean) {

  console.log("我触发了",value);

}

function handleOutsideClick() {
  visible.value = false
   showPopover.value = false;
  console.log("我触发了");
}
</script>

<style lang="scss" scoped>


.topmap{
  position: fixed;
  top: 80px !important;
  left: 0px !important;
  width: 100% !important;
  padding:0 20px !important;
  background-color: #fff !important;
  z-index: 99;
}
</style>
