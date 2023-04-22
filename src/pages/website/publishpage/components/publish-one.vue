<template>
  <smooth-layout>
    <template #pageone>
      <left-and-right-layout>
        <template #left>
          <div class="flex-col select-none p-l-80px p-r-80px text-start">
            <h2 class="lh-30px">第1步</h2>
            <strong class="text-40px lh-70px">介绍一下你的房源</strong>
            <p class="text-16px lh-26px">
              在这一步，我们会询问你的房源属于哪个类型，以及供房客预订的是整
              个房源还是一个房间。然后，请告诉我们房源的位置，以及可入住的房
              客人数。
            </p>
          </div>
        </template>
        <template #right>
          <video class="w-500px h-500px" autoplay muted>
            <source :src="videoSrc" type="video/mp4" />
            I'm sorry; your browser doesn't support HTML5 video.
          </video>
        </template>
      </left-and-right-layout>
    </template>
    <template #pagetwo>
      <n-form
        ref="formRef"
        class="!pt35px select-none"
        :rules="rules"
        :value="CurrentPageContent"
        label-placement="left"
        show-require-mark
        require-mark-placement="left"
        inline
        label-width="auto"
        size="large"
      >
        <n-grid :cols="24" :x-gap="45">
          <n-grid-item span="12">
            <n-h2>填写房源信息</n-h2>
            <n-form-item path="title" label="房源名称">
              <n-input
                v-model:value="CurrentPageContent.title"
                placeholder="请输入房源名称"
              />
            </n-form-item>
            <n-form-item label="标签">
              <n-dynamic-tags
                v-model:value="dynamicTagsValue"
                :render-tag="renderTag"
                @create="onCreate"
              />
            </n-form-item>
            <n-form-item label="类型">
              <n-input-group>
                <n-select
                  v-model:value="CurrentPageContent.rental_category"
                  placeholder="整租/合租"
                  :style="{ width: '50%' }"
                  :options="RentalCategoryOptions"
                />
            
              </n-input-group>
            </n-form-item>
            <n-form-item path="floor" label="楼层">
              <n-input-group>
                <n-input-number
                  v-model:value="CurrentPageContent.floor"
                  placeholder="楼层"
                  :style="{ width: '50%' }"
                />
                <n-input-number
                  v-model:value="CurrentPageContent.total_floor"
                  placeholder="总楼层"
                  :style="{ width: '50%' }"
                />
              </n-input-group>
            </n-form-item>
            <n-space justify="space-between" :wrap="false">
              <n-form-item label="使用面积" path="area">
                <n-input
                  v-model:value="CurrentPageContent.area"
                  placeholder="面积"
                  :style="{ width: '140px' }"
                >
                  <template #suffix>
                    <span> m² </span>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item label="有无电梯" path="elevator">
                <n-radio-group
                  v-model:value="CurrentPageContent.elevator"
                  name="radiogroup2"
                >
                  <n-radio-button type="success" value="1"> 有 </n-radio-button>
                  <n-radio-button value="0"> 无 </n-radio-button>
                </n-radio-group>
              </n-form-item>
            </n-space>
          </n-grid-item>
          <n-grid-item span="12">
            <n-form-item path="location" label="地址">
              <n-cascader
                v-model:value="cascaderValue"
                placeholder="请选择所在城市和地区"
                :expand-trigger="hoverTrigger ? 'hover' : 'click'"
                :options="cascaderOptions"
                :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
                :show-path="showCascaderPath"
                :filterable="filterable"
                size="large"
                class="text-left"
                @update:value="handleUpdateValue"
              />
            </n-form-item>
            <n-form-item path="address" label="详细地址">
              <input
                class="search-input"
                @change=""
                placeholder="请输入详细地址"
                type="text"
                id="suggestId"
                style="width: 350px"
                ref="imputRef"
                v-model="CurrentPageContent.address"
              />
            </n-form-item>
            <searchBaiduMap
              ref="searchBaiduMapRef"
              class="h250px"
              :value="inputText"
              :autolocaltion="autolocaltion"
              @searchAddressResult="searchAddressResultHandler"
            />
          </n-grid-item>
        </n-grid>
      </n-form>
    </template>
  </smooth-layout>
</template>

<script setup lang="tsx">
import { reactive, ref, h, unref } from "vue";
import videoSrc from "@/assets/video/LivingRoom.mp4";
import {
  NTag,
  DynamicTagsOption,
  NDynamicTags,
  FormItemRule,
  FormInst,
  CascaderOption,
} from "naive-ui";
import { usePublishStore } from "@/store";
import { storeToRefs } from "pinia";
import SmoothLayout from "./SmoothLayout.vue";
import LeftAndRightLayout from "./LeftAndRightLayout.vue";
import { formRules, createRequiredFormRule, findAreaByValue } from "@/utils";
import searchBaiduMap from "@/components/common/searchMap.vue";
import { RentalCategoryOptions, RentalDurationOptions } from "@/constants";
import { fetchCityConfig } from "@/service";
defineOptions({
  name: "PublishOne",
});

const imputRef = ref<HTMLInputElement | string>("");
const inputText = ref<string>("");
const searchBaiduMapRef = ref<InstanceType<typeof searchBaiduMap> | null>(null);
const PublishStore = usePublishStore();
const {
  setDynamicTagsValue,
  setTags,
  setLocation,
  setCityId,
  setAddress,
  setPoint,
} = usePublishStore();
const { dynamicTagsValue, CurrentPageContent } = storeToRefs(PublishStore);
const formRef = ref<FormInst | null>(null);

const cascaderValue = ref(null);
const hoverTrigger = ref(true);
const cascaderOptions = ref<CascaderOption[]>([]);
const checkStrategyIsChild = ref(true);
const showCascaderPath = ref(true);
const filterable = ref(true);
const autolocaltion = ref(null);
watch(
  () => searchBaiduMapRef.value,
  (val) => {
    console.log("地图子组件事件和参数", val);
  }
);

function searchAddressResultHandler(params: any) {
  setAddress(params.address);
  setPoint(params.point);
}

function handleUpdateValue(value: string, option: CascaderOption): void {
  let text = findAreaByValue(value, cascaderOptions.value); // 获取省市区
  setCityId(text?.cityCode); // 设置城市id
  let keywords = text?.province + text?.city + text?.area;
  setLocation(keywords); // 设置地址
  if (searchBaiduMapRef.value !== null) {
    let map = searchBaiduMapRef.value.mapObject.map;
    console.log("map: ", map);
    let ac = searchBaiduMapRef.value.mapObject.ac;
    const createAutoSearch = searchBaiduMapRef.value.createAutoSearch;

    let local = new BMap.LocalSearch(map, {
      renderOptions: {
        map: map,
      },
      onSearchComplete: () => {
        let poi = local.getResults().getPoi(0);
        console.log("poi: ", poi);

        console.log("onSearchComplete", local.getResults());
      },
    }) as any;
    map.clearOverlays(); // 清空原来的标注
    // 搜索地图 关键字搜索
    local.search(keywords);
    // searchBaiduMapRef.value?.handleSearchMapHandle(keywords, {
    //   forceLocal: true,
    // });
    // 设置搜索区域 为当前城市自动搜索
    // ac.setLocation(text?.city + text?.area);
    autolocaltion.value = text?.city + text?.area;
    createAutoSearch(imputRef.value, text?.city);
  }
}



function onCreate(label: string) {
  return {
    label,
    value: "tag_" + label,
    checked: true,
  };
}

function renderTag(tag: DynamicTagsOption, index: number) {
  return h(
    NTag,
    {
      checkable: true,
      checked: unref(dynamicTagsValue)[index].checked,
      "on-update:checked": (val: boolean) => {
        console.log(val);
        setDynamicTagsValue(index, val);
        let checkedTags = unref(dynamicTagsValue).filter(
          (item) => item.checked
        );
        setTags(checkedTags);
      },
      class: "b-1",
      type: "default",
    },
    {
      default: () => tag.label,
    }
  );
}

const rules = reactive({
  realName: formRules.realName,
  idCard: formRules.idCard,
  email: formRules.email,
  title: formRules.title,
  floor: [
    {
      required: true,
      message: "请输入楼层",
      trigger: "blur",
      validator: (rule: FormItemRule, value: any) => {
        if (value < 0) {
          return Promise.reject("面积不能小于0");
        } else {
          return Promise.resolve();
        }
      },
    },
  ],
  area: createRequiredFormRule("请输入面积"),
});

onMounted(async () => {
  const { error, data } = await fetchCityConfig();
  if (!error) {
    cascaderOptions.value = data as CascaderOption[];
  }
});
</script>

<style lang="scss" scoped>
.n-radio__label {
  font-size: 14px;
  color: #333;
}

:deep(.n-radio-button--checked) {
  background-color: #1890ff !important;
  border-color: #f5f5f5 !important;
  color: #fff !important;
}

.search-input {
  width: 125px;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  outline: none;
  font-size: 14px;
  color: #333;
  background: #fff;
  transition: all 0.3s;
  border: 1px solid #ccc;

  &:focus {
    border-color: #409eff;
  }
}
</style>
