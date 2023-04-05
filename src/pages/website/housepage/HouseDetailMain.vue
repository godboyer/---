<template>
  <div class="main">
    <n-grid cols="6" x-gap="12" item-responsive responsive="screen">
      <n-grid-item span="2">
        <n-card :bordered="false">
          <template #cover>
            <img class="w-650px h-450px" :src="store.HouseDetail?.first_picture" />
          </template>
        </n-card>
      </n-grid-item>
      <n-grid-item span="4">
        <n-card class="right-card" :bordered="false" :content-style="contentstyle" :footer-style="footerstyle">
          <template #header-extra>
            <img class="mr-25px" :src="mapSrc" alt="" />
          </template>
          <template #header>
            <n-h2>{{ store.HouseDetail?.title }}</n-h2>
          </template>
          <template #footer>
            <n-h4> 更多房间 </n-h4>
            <n-carousel slides-per-view="auto" show-arrow :loop="false" draggable :space-between="20" class="wh-full h-220px b-rd-15px  flex-y-center justify-around">
              <n-carousel-item v-for="item in  RoommateInfo?.data" :key="item.area"  class="roommate-card p-10px   bg-#e5e5e5 b-rd-15px color-#222">
               <template v-if="item.time">
                 <n-avatar round :size="64" :src="item.pic.substr(6)"/>
                <ul class="right-ul">
                  <li><span class="label">{{ item.housename }}</span><span>{{ item.time }}</span> </li>
                  <li><span class="label">{{ item.sex }}</span> <span class="label-sub">{{ item.star_sign }}</span> <span>{{ item.work }}</span> </li>
                </ul>
               </template>
                 <template v-else>
                 <img class="w-100px" :src="item.pic.substr(6)"/>
                <ul class="right-ul">
                  <li><span class="label">{{ item.housename }}</span> <span class="!color-red font-700 text-18px">1500元/月</span> </li>
                  <li><span class="label">{{ item.qibla }}</span> <span>{{ item.area }}</span> </li>
                </ul>
               </template>
                

              </n-carousel-item>
             
            </n-carousel>

          </template>
          <!-- <template #action>1111 </template> -->
          <div class="decbox">{{ store.HouseDetail?.address }}</div>

          <div class="tagbox">
            <n-tag v-for="v in store.HouseDetail?.tags" type="success" size="small">
              {{ v }}
            </n-tag>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
    <div class="bot-swiper">
   
      <n-image-group>

        <n-carousel slides-per-view="auto" :space-between="20" dot-placement="bottom" show-arrow :loop="false" draggable>

          <n-carousel-item v-for="(src, index) in store.HouseDetail?.swiper_pic" :key="index" style="width: 356px">
            <n-image width="356" :src="src" />

          </n-carousel-item>

          <template #arrow="{ prev, next }">
            <div class="custom-arrow">
              <button type="button" class="custom-arrow--left" @click="prev">
              <icon-ion:chevron-left class="text-64px color-#fff"/>
              </button>
              <button type="button" class="custom-arrow--right" @click="next">
                 <icon-ion:chevron-right class="text-64px color-#fff"/>
              </button>
            </div>
          </template>
          <template #dots="{ total, currentIndex, to }">
            <ul class="custom-dots">
              <li v-for="index of total" :key="index" :class="{ ['is-active']: currentIndex === index - 1 }"
                @click="to(index - 1)" />
            </ul>
          </template>
        </n-carousel>

      </n-image-group>
     
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useHouseDetailStore } from "@/store";
import mapSrc from "@/assets/map2.png";
import BetterScroll from "@/components/custom/BetterScroll.vue";
import { computed } from "vue";
const store = useHouseDetailStore();
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

const RoommateInfo = computed(() => {
  return store.HouseDetail?.Roommate_Info;
});

</script>

<style lang="scss" scoped>
.custom-arrow {
  width: 100%;
  height: 100%;
  // background-color: red;
  pointer-events: none;
  position: relative;
  top: -100%;
}

.custom-arrow--left {
  position: absolute;
  left: 0;
  top: 0;
  width: 10%;
  height: 100%;
  pointer-events: auto;
    display: flex;
  justify-content: flex-start;
  align-items: center;
  //渐变
  background: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0) 100%);
}

.custom-arrow--right {
  position: absolute;
  right: 0;
  top: 0;
  width: 10%;
  height: 100%;
  pointer-events: auto;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0) 100%);
  display: flex;
  justify-content: flex-end;
    align-items: center;
}
.custom-dots {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
.n-grid {
  // background-color: red;
}

.main {
  width: 1440px;
  height: 750px;
}

.bot-swiper {
  box-sizing: border-box;
  width: 100%;
  height: 265px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  overflow: hidden;
}

.right-card {
  padding-top: 32px;

  // background-color: #2cc46b;
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


.roommate-card{
  display: flex;
  width:auto !important;
  height: 150px !important;
  justify-content: space-around;
  align-items: center;
  .right-ul{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 12px !important;
    li{
      display: flex;
      align-items: center;
      .label{
        font-size: 16px;
        color: #999999;
        margin-right: 8px;
        &::after{
          content: "|";
        }
      
      }
      .label-sub{
          margin-right: 8px;
         &::after{
          content: "|";
        }
      }
      span{
        font-size: 16px;
        color: #333333;
      }
    }
  }
}
</style>
