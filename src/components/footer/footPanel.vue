<template>
  <footer
    ref="FootRef"
    v-if="show"
    class="fixed left-0 bottom-0 z-999 w-full h-66 bg-#fff mestyle1 p-6"
  >
    <n-space justify="end">
      <i
        @click="show = false"
        class="i-ci-close-big inline-block cursor-pointer color-black"
        style="font-size: 25px"
      ></i>
    </n-space>

    <n-grid x-gap="12" offset="1" :cols="itemData.length">
      <n-grid-item class="gridbox" v-for="item in itemData" :key="item.title">
        <div>
          <h3 class="text-18px font-700">{{ item.title }}</h3>
          <template v-if="item?.children.length !== 0">
            <ul class="text-14px color-#b0b0b0 p-t-4!">
              <li v-for="v in item.children" :key="v.labeL">
                <router-link class="hover:b-b-1" :to="v.to">{{
                  v.labeL
                }}</router-link>
              </li>
            </ul>
          </template>
        </div>
      </n-grid-item>
    </n-grid>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const show = useVModel(props, "modelValue", emit);

const FootRef = ref<HTMLElement | null>(null);

const itemData = [
  {
    title: "随心所寓",
    children: [
      { labeL: "工作机会", to: "" },
      { labeL: "随心所寓新闻", to: "" },
      { labeL: "政策", to: "" },
      { labeL: "无障碍设施", to: "" },
    ],
  },
  {
    title: "客服支持",
    children: [
      { labeL: "帮助", to: "" },
      { labeL: "邻里支持", to: "" },
    ],
  },
  {
    title: "发现",
    children: [
      { labeL: "信任与安全", to: "" },
      { labeL: "旅行基金", to: "" },
      { labeL: "商务差旅", to: "" },
      { labeL: "爱彼迎杂志", to: "" },
    ],
  },
  {
    title: "发现",
    children: [
      { labeL: "为什么要出租?", to: "" },
      { labeL: "房东义务", to: "" },
      { labeL: "开展体验", to: "" },
      { labeL: "资源中心新推出", to: "" },
    ],
  },
];
</script>

<style lang="scss" scoped></style>
