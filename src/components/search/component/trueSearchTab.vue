<template>
  <div class="seacrh-tab-container" data-search="closetab" :class="{ backdrop: search.showSearchTab }">

    <Transition  name="scale" >
    <n-form label-position="top" class="search-tab" ref="formRef" v-show="search.showSearchTab">
      <n-form-item class="item-form" :class="{ active: showBefore == 'city' }" label="城市"
        @click="handleShowSearchPanel('city')">
        <input class="search-input" type="text" placeholder="你想去哪个城市" :value="search.getCityName" />
      </n-form-item>
      <n-form-item class="item-form" :class="{ active: showBefore == 'date' }" label="日期"
        @click="handleShowSearchPanel('date')">
        <input class="search-input" type="text" placeholder="请在日历中选择" :value="search.getDateTime" />
      </n-form-item>
      <div class="item-form flex items-center" :class="{ active: showBefore == 'keywords' }">
        <n-form-item class="form" label="关键字" @click="handleShowSearchPanel('keywords')">
          <input class="search-input" type="text" placeholder="景点/地点/房源名"  v-model="keywords" />
        </n-form-item>
        <button @click="handleSearchActive" class="flex-center search-button active-btn" >
          <icon-local-search-logo class="text-24px" />
          <span>搜索</span>
        </button>
      </div>
    </n-form>
  </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useSearchStore } from "@/store";
const search = useSearchStore();
const {openSearchPanel,GetHouseCardInfo } = useSearchStore();

const keywords = computed({
  get: () => search.filter.keywords.join(" "),
  set: (val) => {
    if(!val) return;
    search.filter.keywords = [];
    search.filter.keywords.push(val);
  },
});


const showBefore = ref("");

function handleShowSearchPanel(key: string) {
  showBefore.value = key;
  search.setModule(key);
  openSearchPanel();
}

function handleSearchActive() {
  //调用房源搜索接口
  search.handleFetchSearchHouse();
  console.log("handleSearchActive调用搜索接口");
}
</script>

<style lang="scss" scoped>
.search-tab {

  position: absolute;
  top: 80px !important;
  left: 50% !important;
  transform-origin: center center;
  transform: translateX(-50%);
  transition: all 200ms ease;
  z-index: 99999;
  width: 865px;
  height: 68px;
  background: #f7f7f7f7;
  border: 1px solid #d9d9d9;
  border-radius: 32px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  .search-input{
    background: #f7f7f7f7;
  }
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

.seacrh-tab-container::before {
  content: '';
  position: fixed;
  left: 0px;
  top: 80px;
  min-width: 100vw;
  height: 0;
  background: #fff;
  z-index: -1 !important;
  transition: height  0.55s;
  border-bottom: 1px solid #e5e5e5;
}
.seacrh-tab-container::after{
  content: '';
  position: fixed;
  left: 0px;
  top:  0px;
  transition: top  0.55s;
}


.backdrop::after {
  top: 160px;
  min-width: 100vw !important;
  min-height: 100vh !important;
  background: rgba(84, 84, 84, 0.5);
  z-index: 2 !important;
}

.backdrop::before {
  height: 80px !important;
}


.scale-enter-active {
  animation: identifier 0.35s;


}
.scale-leave-active {
  animation: identifier 0.35s reverse;
  transform-origin: center center;
}
.scale-enter{
  transform: scale(0);
}


@keyframes identifier {
  from {
    width: 20.25rem;
    width: 20.25rem;
    opacity: 0;
    transform-origin: center;
    transform:translateX(-50%)  translateY(-80px) scale(0.4) ;
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0px) scale(1);
  }
}
  

</style>
