<template>
  <div class="search-box">
    <n-space>
      <slot name="sel_ect">

      </slot>

      <input
        type="text"
        v-model="searchText"
        @input="onInput"
        @keydown.enter="onSearch"
        placeholder="搜索"
        class="search-input"
      />
    </n-space>

    <button @click="onSearch" class="search-button">搜索</button>
  </div>
</template>

<script setup lang="ts">
import { MaybeRef } from "@vueuse/shared";
import { Ref, ref, watch } from "vue";
import { useSearchTable } from "@/hooks";
defineOptions({ name: "SearchBox" });
const props = defineProps<{ search: string }>();
const emit = defineEmits([
  "search",
  "update:search",
  "onInput:search",
  "click:search",
]);

const searchText: Ref<string> = ref(props.search);
// const {search} = props
function onSearch() {
  emit("click:search", searchText.value);
}
function onInput(event: Event) {
  searchText.value = (event.target as HTMLInputElement).value;
  emit("onInput:search", searchText.value);
  emit("update:search", searchText.value);
}
watch(searchText, (newValue) => {
  emit("update:search", newValue);
});
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
