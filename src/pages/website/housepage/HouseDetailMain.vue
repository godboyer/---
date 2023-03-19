<template>
  <div class="main">
    <n-grid cols="6" x-gap="12" item-responsive responsive="screen">
      <n-grid-item span="2">
        <n-card :bordered="false">
          <template #cover>
            <img :src="store.HouseDetail?.swiper_BigPic[3]" />
          </template>
        </n-card>
      </n-grid-item>
      <n-grid-item span="4">
        <n-card
          class="right-card"
          :bordered="false"
          :content-style="contentstyle"
          :footer-style="footerstyle"
        >
          <template #header-extra>
            <img :src="mapSrc" alt="" />
          </template>
          <template #header>
            <h2>{{ store.getTitle }}</h2>
          </template>
          <template #footer> 更多房间 </template>
          <template #action>1111 </template>
          <div class="decbox">{{ store.HouseDetail?.address }}</div>

          <div class="tagbox">
            <n-tag
              v-for="v in store.HouseDetail?.tags"
              type="success"
              size="small"
            >
              {{ v }}
            </n-tag>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
    <div class="bot-swiper">
      <!-- <n-carousel
        :slides-per-view="4"
        :space-between="12"
        :loop="false"
        centered-slides
        draggable
        :show-dots="false"
        class="bot-carousel"
      >
        <img
          v-for="(item, index) in store.HouseDetail?.swiper_pic"
          :key="index"
          class="carousel-img"
          :src="item"
        />
      </n-carousel> -->
      <BetterScroll :options="options">
        <div
          class="w-110  inline-block b-red b-1 mr-1"
          v-for="(item, index) in store.HouseDetail?.swiper_pic"
          :key="item"
        >
          <img class="block w-200" :src="item" />
        </div>
      </BetterScroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useHouseDetail } from "@/store";
import mapSrc from "@/assets/map2.png";
import BetterScroll from "@/components/custom/BetterScroll.vue";
const store = useHouseDetail();
const contentstyle = reactive({
  height: "148px",
  padding: 0,
  paddingLeft: "16px",
});
const options = {
  scrollX: true,
  click: true,
};
const footerstyle = reactive({
  padding: 0,
  color: "white",
  fontSize: "12px",
  paddingLeft: "16px",
});
</script>

<style lang="scss" scoped>
.n-grid {
  background-color: red;
}
.main {
  width: 1440px;
  height: 700px;
}
.bot-swiper {
  box-sizing: border-box;
  width: 100%;
  height: 265px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.right-card {
  padding-top: 32px;
  background-color: #2cc46b;
  .n-card__content {
    height: 148px !important;
  }
}

.decbox {
  height: 36px;
}
.tagbox {
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 10px;
}
</style>
