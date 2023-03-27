<template>
  <div class="search-box">
    <input
      type="text"
      v-model="searchText"
      @keydown.enter="onSearch"
      placeholder="搜索"
      class="search-input"
    />
    <button @click="onSearch" class="search-button">搜索</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchBox',
  setup(_, { emit }) {
    const searchText = ref('');

    function onSearch() {
      emit('search', searchText.value);
    }

    return {
      searchText,
      onSearch,
    };
  },
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
