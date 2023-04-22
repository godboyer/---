<template>
  <n-config-provider
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <naive-provider>
      <router-view></router-view>
    </naive-provider>
  </n-config-provider>
</template>
<script setup lang="ts">

import windowResize from "./utils/resize";
import { onMounted, onUnmounted } from "vue";
import { dateZhCN, zhCN } from "naive-ui";
import { subscribeStore, useThemeStore } from "@/store";
import { useGlobalEvents } from "@/composables";
import { fetchCurrentCity } from "@/service";

const theme = useThemeStore();
subscribeStore();
useGlobalEvents();
const { calcRate, windowDraw, unWindowDraw } = windowResize();

onMounted(() => {
  // 监听浏览器窗口尺寸变化
  windowDraw();
  calcRate();
  // getCity()
});

/**获取地址 */
async function  getCity() {
  let { error, data } = await fetchCurrentCity()
  if (error) {
    // console.log(error);
  } else {
    // console.log(data);
  }
}

onUnmounted(() => {
  unWindowDraw();

});
</script>
<style scoped></style>
