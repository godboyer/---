<template>
  <div class="largecard">
    <div class="is_top"></div>
    <div class="is_bot">
      <div class="bot-swiper">
        <n-carousel
            :slides-per-view="4"
            :space-between="12"
            :loop="false"
            centered-slides
            draggable
            :show-dots="false"
            class="bot-carousel"
          >
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
            />
          </n-carousel>
      </div>
    </div>
    <div class="my-largecard">
      <n-card :bordered="false" class="left-card">
        <template #cover>
          <img
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </template>
      </n-card>
      <n-card
        class="right_card"
        :bordered="false"
        :content-style="contentstyle"
        :header-style="headerstyle"
        :footer-style="footerstyle"
      >
        <template #header-extra>
          <img src="../assets/map2.png" alt="" />
        </template>
        <template #header>
          <n-ellipsis style="max-width: 240px"> 恒杰丁香花园(公寓) </n-ellipsis>
        </template>
        <template #footer> 更多房间 </template>
        <template #action>
          <n-carousel
            :slides-per-view="3"
            :space-between="20"
            :loop="false"
            centered-slides
            draggable
            :show-dots="false"
            class="action-carousel"
          >
            <div
              class="carousel-box"
            />
            <div
              class="carousel-box"
            />
            <div
              class="carousel-box"
            />
            <div
              class="carousel-box"
            />
          </n-carousel>
        </template>
        <div class="decbox">描述</div>
        <div class="decbox">描述</div>
        <div class="tagbox">
          <n-tag type="success" size="small"> 不该 </n-tag>
          <n-tag type="success" size="small"> 不该 </n-tag>
          <n-tag type="success" size="small"> 不该 </n-tag>
          <n-tag type="success" size="small"> 不该 </n-tag>
        </div>
      </n-card>
    </div>

    <button class="love" @click="Collection = !Collection">
        <svg
          v-if="!Collection"
          viewBox="0 0 24 24"
          fill="#484848"
          fill-opacity="0.5"
          stroke="#ffffff"
          stroke-width="2"
          focusable="false"
          aria-label="添加房源到心愿单"
          role="img"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="height: 28px; width: 28px; display: block; overflow: visible"
        >
          <path
            d="m17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8-1.6-1.6-3.8-3.2-6.2-2.7-1.5.2-2.9 1.2-3.6 2.6-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6"
            stroke-linejoin="round"
          ></path>
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="#FF5A5F"
          fill-opacity="1"
          stroke="#ffffff"
          stroke-width="2"
          focusable="false"
          aria-label="将房源从列表中删除"
          role="img"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="height: 28px; width: 28px; display: block; overflow: visible"
        >
          <path
            d="m17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8-1.6-1.6-3.8-3.2-6.2-2.7-1.5.2-2.9 1.2-3.6 2.6-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
const Collection = ref(false);
const contentstyle = reactive({
    height: "148px",
    padding: 0,
    paddingLeft:'16px'
});

const headerstyle = reactive({
  paddingTop: "8px",
  paddingLeft: "16px",
});
const footerstyle = reactive({
    padding: 0,
    color: 'white',
    fontSize: '12px',
    paddingLeft: "16px",
  
});
</script>

<style lang="scss" scoped>
.love{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 48px;
    height: 48px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
    cursor: pointer;

}
.action-carousel,.n-carousel__slides{
    width: 330px !important;
   height: 82px !important;
   :deep(.n-carousel__slide){
     width: 112px !important;
     height: 82px !important;
     flex-shrink: 0 !important;
     overflow: visible;
   }
   .carousel-box {
  width: 112px;
  height: 82px;
  background: #fff;
  border-radius: 6px;
  object-fit: cover;
}
}
.bot-carousel{
    width: 636px !important;
    .n-carousel__slide{
        width: 158px !important;
        height: 100px !important;
    }
.carousel-img {
    width: 158px !important;
        height: 100px !important;
  object-fit: cover;
}
}
.n-tag{
    height: 18px;
    font-size: 10px;
}
.decbox{
    height: 36px;
    background-color: #333;
}
.tagbox{
    height: 60px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-top:10px;
}


.n-card {
  position: relative;
  justify-content: center;
  border-radius: 0;
  background: transparent;
}
.left-card {
  width: 308px;
}
.right_card {
  //   flex: 1;
  width: 330px;
  .n-card__content {
    height: 148px !important;
    
  }
}

:deep(.n-card-header) {
  height: 53px !important;
}
:deep(.n-card-cover) {
  align-self: center;
  width: 308px !important;
  height: 334px !important;
  //   border-radius: 20px !important;
  img {
    display: block;
    margin: 0 auto;
    border-radius: 8px 8px 0 0 !important;
  }
}

:deep(.n-card__action) {
  width: 330px;
  height: 128px !important;
  padding: 0 12px 0;
  color: #3e4958;
  background: transparent;
  display: flex;
  //   align-items: center;
}
:deep(.n-card__content) {
}
.largecard {
  width: 637px;
  height: 460px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  margin: 70px;
  .is_top {
    width: 100%;
    flex: 1;
  }
  .is_bot {
    flex: 1.5;
    background-color: #aaaaaa;
  }
}
.bot-swiper {
    box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 126px;
  display: flex;
  align-items: center;
  padding-left:  12px;
}
.my-largecard {
  position: absolute;
  top: 0;
  width: 100%;
  height: 334px;
  background-color: rgb(143, 70, 70);
  display: flex;
  // justify-content:baseline;
  background: transparent;
}
</style>
