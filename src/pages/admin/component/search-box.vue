<template>
  <div class="search-box">
    <n-space>
      <slot :slotHandler="handleSlotOption"> </slot>
      <input
        type="text"
        v-model="searchQuery"
        @keydown.enter="onSearch"
        placeholder="搜索"
        class="search-input"
      />
    </n-space>

    <button @click="onSearch" class="search-button">搜索</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref, ref, useSlots, watch } from "vue";
import { useSearchTable } from "@/hooks";
import { SearchSelectOption } from "@/hooks/business/useTable";
defineOptions({ name: "SearchBox" });
// const props = defineProps<{ originalData: any[] }>();
const emit = defineEmits([
  "originalData",
  "update:originalData",
  "onInput:originalData",
  "click:search",
  "search:end",
]);

//查询的参数
const Model = reactive({
  selectValue: "--出租状态--",
  status: "",
  examStatus: "",
  defaultStatus: "",
});
const {  filteredData, onSearch, onSearchSelect, searchQuery } =
  useSearchTable();


function handleSlotOption(value: string, option: SearchSelectOption) {
  onSearchSelect(option);
  emit("search:end", filteredData.value);
}
watch(
  () => filteredData.value,
  (val) => {
    emit("search:end", val);
  }
);

const slot = useSlots();

</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.search-button {
  margin-left: 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
}
</style>
