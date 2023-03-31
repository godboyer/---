<template>
  <n-form
    label-position="top"
    class="search-tab"
    ref="formRef"
  >
    <n-form-item
      class="item-form"
      :class="{ active: showBefore == 'city' }"
      label="城市"
      @click="handleShowSearchPanel('city')"
    >
      <input type="text" placeholder="你想去哪个城市" :value="search.getCityName"/>
    </n-form-item>
    <n-form-item
      class="item-form"
      :class="{ active: showBefore == 'date' }"
      label="日期"
      @click="handleShowSearchPanel('date')"
    >
      <input type="text" placeholder="请在日历中选择" :value="search.getDateTime" />
    </n-form-item>
    <div
      class="item-form flex items-center"
      :class="{ active: showBefore == 'keywords' }"
    >
      <n-form-item
        class="form"
        label="关键字"
        @click="handleShowSearchPanel('keywords')"
      >
        <input type="text" placeholder="景点/地点/房源名"  :value="search.getDateTime" />
      </n-form-item>
      <button
        @click="flag = true"
        class="flex-center search-button"
        :class="{ 'active-btn': flag }"
      >
        <icon-local-search-logo class="text-24px" />
        <span v-show="flag">搜索</span>
      </button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useSearchStore } from "@/store";
const search = useSearchStore();
interface Emits {
  (e: "show-search-panel", key: string): void;
}


const emit = defineEmits<Emits>();
const flag = ref(false);
const showBefore = ref("");

function handleShowSearchPanel(key: string) {
  emit("show-search-panel", key);
  showBefore.value = key;
}
</script>

<style lang="scss" scoped>
.search-tab {
  // left: 223px;
  position: absolute;
  top: 85px !important;
  left: 50% !important;
  transform: translateX(-50%);
  transition: all 200ms ease;

  width: 865px;
  height: 68px;
  background: #f7f7f7f7;
  border: 1px solid #d9d9d9;
  border-radius: 32px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;

  .item-form {
    flex: 1;
    height: 68px;
    border-radius: 32px;
    padding: 12px 24px;
    box-sizing: border-box;
    position: relative;

    .form {
      align-self: flex-start;
    }
  }

  .active::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 32px;
    border: 1px solid #d9d9d9 !important;
    background: #fff !important;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25) !important;
    z-index: -1;
  }

  :deep(.n-form-item-blank) {
    align-items: flex-start;

    input {
      width: 100%;
      outline: none;
    }
  }

  .search-button {
    outline: none;
    border: none;
    background: #ff385c;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-top: 5px;
    cursor: pointer;
    transition: all 200ms ease;
    box-sizing: border-box;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    line-height: 48px;
  }

  .active-btn {
    padding: 10px;

    width: 100px;
    border-radius: 32px;

    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }

  :deep(.n-form-item-feedback-wrapper) {
    display: none;
  }
}

</style>
