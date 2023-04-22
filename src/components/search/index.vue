<template>
  <div id="search" ref="searchRef" class="h-68px flex-x-center items-center bg-#fff">
    <div>
      <Transition name="scale">
        <component :is="topModuled.component" />
      </Transition>
    </div>
    <true-search-tab v-on-click-outside="handleSearchOff" />
    <n-card ref="searchPanelRef" v-show="showSearchPanel" :title="activeModule.label"
      class="absolute top-180px searchPanel w-865px">
      <component :is="activeModule.component"></component>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, unref } from "vue";
import {
  cityTab,
  dateTab,
  keywordTab,
  smallSearch,
  trueSearchTab,
  smallSearchBack
} from "./component";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/store";
import { onClickOutside } from "@vueuse/core";
import { vOnClickOutside } from '@vueuse/components'
defineOptions({ name: "searchBox" });
const search = useSearchStore();
const { closeSearchPanel, closeSearchTab, closeFilterBackDrop } = useSearchStore();

const router = useRouter();
const searchRef = ref(null);
const searchPanelRef = ref(null);

//搜索面板是否显示
const showSearchPanel = computed(() => {
  return search.showSearchPanel;
});
//搜索面板是否显示
const showSearch = computed(() => {
  return search.showSearchTab;
});

const activeModule = computed(() => {
  let active = { ...modules[0] };
  let itmeDate = modules.find((item) => item.key == search.module);
  if (itmeDate) {
    Object.assign(active, itmeDate);
  }
  return active;
});

const topModuled = computed(() => {
  let active = { ...modules[3] };
  let itmeDate = modules.find((item) => item.key == search.topModule);
  if (itmeDate) {
    Object.assign(active, itmeDate);
  }
  return active;
});

const modules = [
  {
    key: "city",
    label: "选择城市",
    component: cityTab,
  },
  {
    key: "keywords",
    label: "关键字搜索",
    component: keywordTab,
  },
  {
    key: "smallSearch",
    label: "小搜索",
    component: smallSearch,
  },
  {
    key: "smallSearchBack",
    label: "小搜索面板",
    component: smallSearchBack,
  }

];



watch(showSearch, (newValue) => {
  if (!newValue) {
    closeFilterBackDrop()
  }
});

router.beforeEach((to, from, next) => {
  closeSearchTab()
  closeSearchPanel();
  next();
});


onClickOutside(searchPanelRef, handleSearchOff);
//先检查点击的元素的父元素是否是searchPanelRef 并且 tabpanel面板是否关闭,然后关闭搜索面板

function handleSearchOff(event: any) {
  if (!search.showSearchTab) return
  // console.log(event.target.dataset.search)  //这里可以获取到data-search的值

  let closeFuntion = event.target.dataset.search
  if (closeFuntion == 'closetab') {
    if (unref(showSearchPanel)) return closeSearchPanel()
    if (unref(showSearch)) return closeSearchTab()
  } else {
    if (unref(showSearchPanel)) return
  }
}



</script>
<style lang="scss" scoped>
.searchPanel {
  left: 50%;
  transform: translateX(-50%);
  border-radius: 32px;
  z-index: 999;
}



.scale-enter-active {

  animation: scaleMove 0.25s reverse ;

}

.scale-leave-active {
  animation: scaleMove 0.25s ;
}

@keyframes scaleMove {
  0% {
    opacity: 0;
    transform: translateY(0px) scale(1);
  }

  50% {
    opacity: 1;
    transform: translateY(30px) scale(0.5);
  }

  100% {
    transform: translateY(50px) scale(0.3);
    opacity: 0;
  }
}
</style>
