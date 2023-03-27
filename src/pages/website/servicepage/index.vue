<template>
  <n-layout>
    <n-layout-header 
    class="overflow"
      >
      <headerComp>
        <template #nav>
          <Nav></Nav>
        </template>
      </headerComp>
      <div :style="headerBgstyle" class="h-450px relative">
          <div class="absolute top-150px left-220px color-#fff  ">
            <h1 class="font-800  text-60px">如寓服务</h1>
            <p class="text-22px ">让租房不再是烦恼，选择相顾如寓享受无忧生活</p>
          </div>
        
      </div>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px"  class="flex-center mw-1440px h-880px" >

      <div class="w-1440px">

          <n-space :warp="false" justify="center">
            <div
              v-for="item in itemDate"
              :key="item.title"
              class="w-365px h-415px relative"
            >
              <div class="absolute top-52px left-24px w-210px color-#fff">
                <h2 class="font-700 text-24px">{{ item.title }}</h2>
                <p>{{ item.subTitle }}</p>
              </div>
              <img width="365" :src="item.src" />
            </div>
          </n-space>
      </div>
      
    </n-layout-content>
    <n-layout-footer>

      <footer-box/>

    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import BetterScroll from "@/components/custom/BetterScroll.vue";
import { url } from "@/service/request/index";
import footerBox from "@/components/footer/index.vue"

const options = {
  scrollX: true,
  click: true,
};
const isSticky: Ref<boolean> = ref(false);
const isStickyTwo: Ref<boolean> = ref(false);
const ChangeBgColor = () => {
  isStickyTwo.value = false;
};
const CleaningImg = url.replace("api", "house/service-baojie.png");
const movehouseImg = url.replace("api", "house/service-banjia.png");
const HomeRepairImg = url.replace("api", "house/service-jiaxiu.png");

const itemDate = [
  { title: "保洁", subTitle: "拥抱清新 回归自然", src: CleaningImg },
  { title: "搬家", subTitle: "打包记忆 搬运理想", src: movehouseImg },
  { title: "家修", subTitle: "及时专业 安全守护", src: HomeRepairImg },
];

const headerBgstyle = {
  background: `url(${url.replace("api", "house/serivce-bg1.png")} )`,
  backgroundRepeat: "no-repeat",
  "background-position-y": "0px",
  backgroundSize:'cover'
};
</script>

<style lang="scss" scoped>

.overflow{

  overflow: hidden;
  padding: 0px;
}
</style>
