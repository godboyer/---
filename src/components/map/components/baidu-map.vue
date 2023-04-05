<template>
  <div ref="domRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useScriptTag } from '@vueuse/core';
import { BAIDU_MAP_SDK_URL } from '@/config';


defineOptions({ name: 'BaiduMap' });

const { load } = useScriptTag(BAIDU_MAP_SDK_URL);

const domRef = ref<HTMLDivElement>();

async function renderMap() {
  await load(true);
  if (!domRef.value) return;
  const map = new BMap.Map(domRef.value);  // 创建地图实例 
  const point = new BMap.Point(114.05834626586915, 22.546789983033168);// 创建点坐标 
  map.centerAndZoom(point, 15);  // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom();   //开启鼠标滚轮缩放
}

onMounted(() => {
  renderMap();
});
</script>

<style scoped></style>
