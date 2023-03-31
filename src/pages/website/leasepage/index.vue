<template>
  <n-page-header v-show="!app.showMapFlag || showPopover" :subtitle="`当前所在城市共有：${house.$state.houseTotal}套房源`">
    <template #title> 所在城市：{{ house.$state.cityName }}</template>
    <template #header> </template>
    <template #avatar>
    </template>
    <template #extra> </template>
    <template #footer> </template>
  </n-page-header>
  <div :class="{ topmap: app.showMapFlag }">
    <search-tab>
      <template #switch>
        <map-switch />
      </template>
    </search-tab>
  </div>
  <div v-show="visible" ref="backdropRef" class="backdrop-box"></div>
  <router-view v-slot="{ Component, route }">
    <!-- <transition :name="theme.pageAnimateMode" mode="out-in" :appear="true"> -->
    <keep-alive :include="['house-main', 'house-map']">
      <Suspense>
        <component :is="Component" v-if="app.reloadFlag" :key="route.fullPath" />
        <template #fallback>
          <div>加载中...</div>
        </template>
      </Suspense>
    </keep-alive>
    <!-- </transition> -->
  </router-view>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAppStore, useHouseStore } from "@/store";
import { onMounted, ref, Ref } from "vue";
import mapSwitch from "./component/map-switch.vue";
import { searchTab } from "@/components/search/component/index";
const value = ref([50, 70]);
const overlap = ref(false);
const visible = ref(false);
const app = useAppStore();
const house = useHouseStore();
const router = useRouter();
const route = useRoute();
const loading: Ref<boolean> = ref(false);
const showPopover = ref(false);
const filterdomRef = ref<HTMLElement | null>(null)
const backdropRef = ref<HTMLElement | null>(null)
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


function handlePopoverShow(value: boolean) {

  console.log("我触发了", value);

}

const options = [{
  label: '杰·盖茨比',
  key: 'jay gatsby'
},
{
  label: '黛西·布坎南',
  key: 'daisy buchanan'
},
{
  type: 'divider',
  key: 'd1'
},
{
  label: '尼克·卡拉威',
  key: 'nick carraway'
},]
function handleSelect() {
  visible.value = false
  showPopover.value = false;
  console.log("我触发了");
}
</script>

<style lang="scss" scoped>
.topmap {
  position: fixed;
  top: 80px !important;
  left: 0px !important;
  width: 100% !important;
  padding: 0 20px !important;
  background-color: #fff !important;
  z-index: 99;
}
</style>
