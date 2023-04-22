<template>
  <div
    class="h-12 flex justify-between items-center relative borderStyle"
    ref="filterdomRef"
    :class="{ 'backdrop-box': search.visibleBackDrop }"
  >
    <n-space>
      <price-range-popover />
      <categoryPopover />
     
    </n-space>
    <slot name="switch"></slot>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/store";
import { ref } from "vue";
import {
  priceRangePopover,
  categoryPopover,
  addressPopover,
} from "./popover";
defineOptions({ name: "searchTab" });

const search = useSearchStore();

const filterdomRef = ref<HTMLElement | null>(null);


</script>

<style lang="scss" scoped>
.backdrop-box::before {
  content: "";
  background: rgba(255, 255, 255, 0.85) !important;
  position: absolute !important;
  left: 0px !important;
  top: 50px !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 99 !important;
  border-top: 4px solid #121111 !important;
}

.borderStyle {
  width: 100%;
  padding: 0 20px !important;
  box-sizing: border-box;

}
</style>
