<script setup lang="ts">
import { Login, Register } from "./server/api/index";
import FrontLayout from "./layouts/website/FrontLayout.vue";
import windowResize from "./utils/resize";
import { onMounted, onUnmounted } from "vue";
const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize();

onMounted(() => {
  // 监听浏览器窗口尺寸变化
  windowDraw();
  calcRate();
});

onUnmounted(() => {
  unWindowDraw();
});
</script>

<template>
  <!-- <div ref="screenRef"> -->
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
  <!-- <front-layout/>/ -->
</template>

<style scoped></style>
