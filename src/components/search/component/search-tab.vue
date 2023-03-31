<template>
  <div
    class="h-12 flex justify-between items-center position-relative borderStyle"
    ref="filterdomRef"
    :class="{ 'backdrop-box': search.visibleBackDrop }"
  >
    <n-space>
      <address-popover />
      <price-range-popover />
      <categoryPopover />
      <area-and-floor-popover />
      <more-filter-popver />
      <!-- <n-tag> 户型 </n-tag>
      <n-tag> 房源面积 </n-tag>
      <n-tag> 房源朝向 </n-tag>
      <n-tag> 供暖方式 </n-tag>
      <n-popover :overlap="overlap" placement="bottom-start" trigger="click">
        <template #trigger>
          <n-tag> 特色户型 </n-tag>
        </template>
        <div class="w-400px h-300px">啊！</div>
      </n-popover> -->
    </n-space>

    <slot name="switch"></slot>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useSearchStore } from "@/store";
import { onMounted, ref, Ref } from "vue";
import {
  priceRangePopover,
  categoryPopover,
  areaAndFloorPopover,
  addressPopover,
  moreFilterPopver,
} from "./popover";
defineOptions({ name: "searchTab" });

const search = useSearchStore();
const value = ref([50, 70]);
const overlap = ref(false);
const showPopover = ref(false);
const visible = ref(false);

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

.borderStyle {
  width: 100%;
  border-top: 1px solid #d6d6d6;
  border-bottom: 1px solid #d6d6d6;
}
</style>
