<template>
  <n-popover id="dropbox" :overlap="overlap" :show="showPopover" placement="bottom-start" trigger="click"
    :on-clickoutside="handleOutsideClick" :on-update:show="handlePopoverShow">
    <template #trigger>
      <n-tag class="hover:cursor-pointer hover:bg-#d6d6d6" @click="handleBackDrop">
        租金
      </n-tag>
    </template>
    <n-space class="w-400px h-300px " :vertical="true" justify="space-around">
      <div>
        <ul ref="priceBarRef" class="Bar-Chart">
          <li v-for="(item) in liStyle" :style="item">
            <!-- <span></span> -->
          </li>
        </ul>

        <n-slider v-model:value="priceRange" :max="maxPrice" :min="minPrice" range :step="1"
          :on-update:value="handlePriceRange"
          class="mb-24px">
        </n-slider>
        <n-space justify="space-around" :size="24" :wrap="false">
          <n-input-number v-model:value="numberValue[0]" size="small"  :max="maxPrice" :min="minPrice"   :step="100">
            <template #prefix>
              <span>￥</span>
            </template>
          </n-input-number>
          <n-input-number v-model:value="numberValue[1]" size="small"  :max="maxPrice" :min="minPrice" :step="100">
            <template #prefix>
              <span>￥</span>
            </template>
          </n-input-number>
        </n-space>
      </div>

      <n-space justify="space-between">
        <button class="push-button btn-active" size="small" @click="handleSubmit">确定</button>
        <button class="common-button btn-active" size="small" @click="handleReset">重置</button>
      </n-space>
    </n-space>
  </n-popover>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useSearchStore } from "@/store";
const search = useSearchStore();
const { openFilterBackDrop, closeFilterBackDrop } = useSearchStore();
defineOptions({ name: "priceRangePopover" });
const overlap = ref(false);
const showPopover = ref(false);
const priceBarRef = ref<Element | null>(null);
const numberValue = ref([1000, 5000])
const priceRange = ref<number[]>([1000, 5000]);
const minPrice = ref(100);
const maxPrice = ref(8000);
const dpr = ref(50);
const boxWidth = ref(0);
let liStyle = ref<any[]>([]);

watch(
  numberValue,
  (val) => {
    priceRange.value = val;
  },
  { immediate: true, deep: true }
)

watch(
  [priceBarRef, priceRange],
  ([cmop,val]) => {
    numberValue.value = val;
    if (cmop) {
      boxWidth.value = cmop.clientWidth / 31;
      dpr.value = cmop.clientWidth / maxPrice.value;
      liStyle.value = createListyle();
    }
  },
  { immediate: true, deep: true }
);

function createListyle() {
  let item = [];
  let min = (priceRange.value[0] * dpr.value) / boxWidth.value;
  let max = (priceRange.value[1] * dpr.value) / boxWidth.value;
  for (let i = 0; i < 31; i++) {

    let height =  `${i < 15 ? i * 10 : 150 - (i - 15) * 10}px`;
    if (i >= min && i <= max - 1) {

      item.push({
        height,
        width: `${boxWidth.value}px`,
        background:
          "linear-gradient(rgba(0, 132, 137, 0.35) 0%, rgba(0, 132, 137, 0.46) 100%) !important",
      });
    } else {
      item.push({
        height,
        width: `${boxWidth.value}px`,
        backgroundColor: "rgb(216, 216, 216)",
      });
    }
  }
  return item;
}

function handlePriceRange(value: number[]) {
  numberValue.value = value;
}

function handlePopoverShow(value: boolean) {
  console.log("我触发了", value);
}

function handleSubmit() {
  search.setPriceRange(priceRange.value);
  showPopover.value = false;
  closeFilterBackDrop();
}
function handleReset() {
  priceRange.value = [minPrice.value, maxPrice.value];
}

function handleBackDrop(e: Event) {
  showPopover.value = true;
  openFilterBackDrop();
}
function handleOutsideClick() {
  closeFilterBackDrop();
  showPopover.value = false;
}
</script>

<style lang="scss" scoped>
.Bar-Chart {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;

  li {
    display: inline-block !important;
    border-top-left-radius: 3px !important;
    border-top-right-radius: 3px !important;
    flex: 1 1 0% !important;
    margin-right: 1px !important;

    span {
      position: absolute;
      top: -10px;
      left: 0;
      font-size: 12px;
    }
  }
}

:deep(.n-slider-rail__fill) {
  background-color: #00808a !important;
}
</style>
