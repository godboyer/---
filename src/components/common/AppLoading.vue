<template>
  <div v-show="currentPath === 'admin'" class="fixed-center flex-col">
    <system-logo class="text-120px text-primary" />
    <div class="w-56px h-56px my-36px">
      <div class="relative h-full animate-spin">
        <div v-for="(item, index) in lodingClasses" :key="index"
          class="absolute w-16px h-16px bg-primary rounded-8px animate-pulse" :class="item"></div>
      </div>
    </div>
    <h2 class="text-28px font-500 text-#646464">{{ title }}</h2>
  </div>
  <WebSiteLoading v-show="currentPath === 'website'" />
</template>

<script setup lang="ts">
import { useAppInfo } from '@/composables';
import { localStg } from '@/utils';
import WebSiteLoading from './WebSiteLoading.vue';

const currentPath = computed(() => {
  if (localStorage.getItem('currentPath')) {
    return localStorage.getItem('currentPath')
  }
  return 'admin'
})

const { title } = useAppInfo();

const lodingClasses = [
  'left-0 top-0',
  'left-0 bottom-0 animate-delay-500',
  'right-0 top-0 animate-delay-1000',
  'right-0 bottom-0 animate-delay-1500'
];

function addThemeColorCssVars() {
  const defaultColor = '#1890ff';
  const themeColor = localStg.get('themeColor') || defaultColor;
  const cssVars = `--primary-color: ${themeColor}`;
  document.documentElement.style.cssText = cssVars;
}

addThemeColorCssVars();
</script>

<style scoped></style>
