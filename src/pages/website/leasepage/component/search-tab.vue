<template>
  <div
    class="w-full h-12 b-t-2 b-b-2 flex justify-between items-center position-relative"
    ref="filterdomRef"
    :class="{ 'backdrop-box': visible }"
  >
    <div>
      <n-button> 区域 </n-button>
      <n-button> 地铁 </n-button>
      <n-tag> 类型 </n-tag>

      <n-popover
        id="dropbox"
        :overlap="overlap"
        :show="showPopover"
        placement="bottom-start"
        trigger="click"
        :on-clickoutside="handleOutsideClick"
        :on-update:show="handlePopoverShow"
      >
        <template #trigger>
          <n-tag
            class="hover:cursor-pointer hover:bg-#d6d6d6"
            @click="handleBackDrop"
          >
            租金
          </n-tag>
        </template>
        <div class="w-400px h-300px bgshow">
          <n-slider v-model:value="value" range :step="1" />
          <n-space align="center">
            <n-input-number v-model:value="value[0]" size="small" />
            <n-input-number v-model:value="value[1]" size="small" />
          </n-space>
        </div>
      </n-popover>

      <n-tag> 户型 </n-tag>
      <n-tag> 房源面积 </n-tag>
      <n-tag> 房源朝向 </n-tag>
      <n-tag> 供暖方式 </n-tag>
      <n-popover :overlap="overlap" placement="bottom-start" trigger="click">
        <template #trigger>
          <n-tag> 特色户型 </n-tag>
        </template>
        <div class="w-400px h-300px">啊！</div>
      </n-popover>
    </div>
    <map-switch />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/store";
import { onMounted, ref, Ref } from "vue";
import mapSwitch from "./map-switch.vue";

defineOptions({ name: "searchTab" });

const value = ref([50, 70]);
const overlap = ref(false);
const visible = ref(false);
const app = useAppStore();
const showPopover = ref(false);
const filterdomRef = ref<HTMLElement | null>(null);
const backdropRef = ref<HTMLElement | null>(null);
function handleBackDrop(e: Event) {
  console.log("事件", e.target);
  visible.value = true;
  showPopover.value = true;
 
}
function handlePopoverShow(value: boolean) {
  console.log("我触发了", value);
}

function handleOutsideClick() {
  visible.value = false;
  showPopover.value = false;
  console.log("我触发了");
}
</script>

<style lang="scss" scoped>
.backdrop-box::before {
  content: "";
  background: rgba(255, 255, 255, 0.85) !important;
  position: absolute !important;
  left: 0px !important;
  top: 3rem !important;
  width: 100% !important;
  height: 100vh !important;
  z-index: 99 !important;
}
</style>
