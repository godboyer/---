<template>
  <n-page-header v-show="!app.showMapFlag || showPopover" :subtitle="`当前所在城市共有：${house.$state.houseTotal}套房源`">
    <template #title> 所在城市：{{ house.$state.cityName }}</template>
    <template #header> </template>
    <template #avatar>
    </template>
    <template #extra> </template>
    <template #footer> </template>
  </n-page-header>
  <div class="search-tab" :class="{ topmap: app.showMapFlag }">
    <search-tab>
      <template #switch>
        <map-switch />
      </template>
    </search-tab>
  </div>
  <div v-show="visible" ref="backdropRef" class="backdrop-box"></div>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component"  :key="route.fullPath" v-bind="route" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { useAppStore, useHouseStore,useAuthStore,useThemeStore } from "@/store";
import {  ref } from "vue";
import mapSwitch from "./component/map-switch.vue";
import searchTab from "@/components/search/component/search-tab.vue";
const visible = ref(false);
const app = useAppStore();
const house = useHouseStore();
const auth = useAuthStore();
const showPopover = ref(false);
const backdropRef = ref<HTMLElement | null>(null)



</script>

<style lang="scss" scoped>
.topmap {
  position: fixed;
  top: 80px !important;
  left: 0px !important;
  width: 100% !important;
  
  background-color: #fff !important;
  z-index: 2;

}
.search-tab{
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}
</style>
