<template>
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
        面积和楼层
      </n-tag>
    </template>
    


    <n-space class="w-400px h-300px" :vertical="true" justify="space-around">
      <n-space justify="space-between">
        <button
          class="push-button btn-active"
          size="small"
          @click="handleResetAction"
        >
          确定
        </button>
        <button
          class="common-button btn-active"
          size="small"
          @click="handleSubmitAction"
        >
          重置
        </button>
      </n-space>
    </n-space>
  </n-popover>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSearchStore } from "@/store";
import { useFilterPopover } from "@/hooks";
defineOptions({ name: "areaAndFloorPopover" });
const search = useSearchStore();
const {
  showPopover,
  handlePopoverShow,
  handleSubmit,
  handleReset,
  handleBackDrop,
  handleOutsideClick,
} = useFilterPopover();

const overlap = ref(false);

function handleResetAction() {
  handleSubmit(() => {
    search.setPriceRange([0, 0]);
  });
}
function handleSubmitAction() {
  handleReset(() => {
    search.setPriceRange([0, 0]);
  });
}
</script>

<style lang="scss" scoped></style>
