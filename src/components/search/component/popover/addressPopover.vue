<template>
  <n-popover id="dropbox" :overlap="overlap" :show="showPopover" placement="bottom-start" trigger="click"
    :on-clickoutside="handleOutsideClick" :on-update:show="handlePopoverShow">
    <template #trigger>
      <n-tag class="hover:cursor-pointer hover:bg-#d6d6d6" @click="handleBackDrop">
        位置区域
      </n-tag>
    </template>



    <n-space class="wh-full" :vertical="true" justify="space-around">
      <n-space>
        <div class="w-120px">
          <button :class="{ active: select == 'area' }" class="w-full h-50px bg-#fff" @click="handleClickChange('area')">
            区域
          </button>
          <button :class="{ active: select == 'subway' }" class="w-full h-50px bg-#fff" @click="handleClickChange('subway')">
            地铁
          </button>
        </div>
        <div class="right-box w-200px h-300px ">

          <div v-if="select == 'area'">

            <ul>
              <li class="w-full h-45px bg-#fff  text-center lh-45px cursor-pointer hover:bg-#e5e5e5"
                :class="{ active: selectArea == 'all' }" @click="handleChangeArea('all')">全部</li>
              <li class="w-full h-45px bg-#fff  text-center lh-45px cursor-pointer hover:bg-#e5e5e5 "
                v-for="item in cityArea" :key="item?.city_id" :class="{ active: item.city_name == selectArea }"
                @click="handleChangeArea(item.city_name)">
                {{ item.city_name }}
              </li>
            </ul>
          </div>
          <div v-if="select == 'subway'">
            地铁线路
          </div>
        </div>

      </n-space>





      <n-space justify="end">

        <button class="push-button btn-active" size="small" @click="handleSubmitAction">
          确定
        </button>

      </n-space>
    </n-space>
  </n-popover>
</template>

<script setup lang="ts">
import { ref, unref, onMounted } from "vue";
import { useSearchStore } from "@/store";
import { useFilterPopover } from "@/hooks";
import { fetchCityArea } from '@/service/api/search'

defineOptions({ name: "addressPopover" });
const search = useSearchStore();
const {
  showPopover,
  handlePopoverShow,
  handleSubmit,
  handleBackDrop,
  handleOutsideClick,
} = useFilterPopover();

const select = ref("area");
const selectArea = ref("all");
const overlap = ref(false);
const cityArea = ref<Record<string, any>>([])

function handleSubmitAction() {

  handleSubmit(() => {
    search.filter.city_area = selectArea.value
  });
}

async function fetchArea() {
  let city_id = unref(search.filter.city_id)
  const { error, data } = await fetchCityArea(city_id)
  if (!error) {
    cityArea.value = data
  }

}
function handleClickChange(val: string) {
  select.value = val;
}

function handleChangeArea(val: string) {
  selectArea.value = val;
  if (val == 'all') {
    search.filter.city_area = '-1'
  }
  search.filter.city_area = val
}



onMounted(() => {
  fetchArea()
});

</script>

<style lang="scss" scoped>
.right-box {
  overflow-y: auto;

}

.active {
  background-color: #d6d6d6;
  color: #0080a8;
}
</style>
