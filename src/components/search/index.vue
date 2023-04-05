<template>
  <div
    id="search"
    ref="searchRef"
    class="h-68px relative flex-x-center items-center"
  >
    <Transition name="form">
      <small-search v-if="!showSearch" @show-true-search="transferSearch" />
      <div v-else="showSearch">
        <div v-show="visibleTitle" class="flex-center w-81 h-12">
          <div class="c-#333">搜索房源</div>
        </div>
        <true-search-tab @show-search-panel="handleShowSearchPanel" />
      </div>
    </Transition>

    <n-card
      v-show="showSearchPanel"
      :title="activeModule.label"
      class="absolute top-180px searchPanel w-865px"
    >
      <component :is="activeModule.component"></component>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, unref, watch,computed } from "vue";
import {
  cityTab,
  dateTab,
  keywordTab,
  smallSearch,
  trueSearchTab,
} from "./component";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/store";
import { MaybeElement, onClickOutside } from "@vueuse/core";
defineOptions({ name: "searchBox" });
interface Emits {
  (e: "change-After", flag: boolean): void;
}
const search = useSearchStore();
const { openSearchPanel, closeSearchPanel } = useSearchStore();

const router = useRouter();
const showSearch: Ref<boolean> = ref(false);
const visibleTitle: Ref<boolean> = ref(false);
const searchRef = ref<MaybeElement>(null);

const showSearchPanel = computed(() => {
  return search.showSearchPanel;
});

const emit = defineEmits<Emits>();
const module = ref("");
const activeModule = computed(() => {
  let active = { ...modules[0] };
  let itmeDate = modules.find((item) => item.key == module.value);
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
    key: "date",
    label: "选择租房时长",
    component: dateTab,
  },
  {
    key: "keywords",
    label: "关键字搜索",
    component: keywordTab,
  },
];

watch(showSearch, (newValue) => {
  if (!newValue) {
    emit("change-After", false);
  }
});

router.beforeEach((to, from, next) => {
  showSearch.value = false;
  closeSearchPanel();
  next();
});

onClickOutside(searchRef, handleSearchOff);

function handleSearchOff(event: any) {
  //先检查tabpanel面板是否关闭,然后关闭搜索面板

  if (search.showSearchPanel) {
    if (event.target.nodeName === "HEADER") return;
    if (event.target.closest(".n-form-item")) return;
    if (event.target.closest(".nav-box")) return;
    if (event.target.classList.contains("item")) return;
    closeSearchPanel();
    return;
  }

  if (!search.showSearchPanel && unref(showSearch)) {
    if (
      event.target.classList.contains("backdrop") ||
      event.target.nodeName === "IMG"
    ) {
      showSearch.value = false;
      if (!unref(showSearch)) {
        emit("change-After", false);
      }
    }
  }
}

/**
 * 改变搜索显示
 */

function transferSearch(show: boolean) {
  emit("change-After", true);
  visibleTitle.value = true;
  showSearch.value = show;
}

function handleShowSearchPanel(key: string) {
  module.value = key;
  openSearchPanel();
  // debugger
}
</script>
<style lang="scss" scoped>
.searchPanel {
  left: 50%;
  transform: translateX(-50%);
  border-radius: 32px;
  z-index: 999;
}
</style>
