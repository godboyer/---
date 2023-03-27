<template>
    <main  class="w-full h-full relative z-5 ">
        <n-carousel
     
        touchable
        effect="custom"
        :transition-props="{ name: 'creative' }"
        :show-arrow="showarrow"
        style="width: 100%;height: 100%;position: relative;"
        class="b-rd-1"
        @mouseenter.stop="onMouseEnter"
        @mouseleave.stop="onMouseLeave"
      >
        <img
          v-for="(src, idx) in cardData?.swiper_pic"
          :key="src"
          class="carousel-img"
          :src.camel="src"
          @click="GoToHouseDetail(cardData?.house_id)"
        />

        <template #arrow="{ prev, next }">
          <div class="custom-arrow">
            <button type="button" class="custom-arrow--left" @click.stop="prev">
              <n-icon><ArrowBack /></n-icon>
            </button>
            <button
              type="button"
              class="custom-arrow--right"
              @click.stop="next"
            >
              <n-icon><ArrowForward /></n-icon>
            </button>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <div class="dots-box">
            <ul class="custom-dots">
              <li
                v-for="index of total"
                :key="index"
                :class="{ ['is-active']: currentIndex === index - 1 }"
                @click="to(index - 1) && total + 1"
              />
            </ul>
          </div>
        </template>
      </n-carousel>
    
        <button class="Collection-btn" @click.stop="Collection = !Collection">
            <icon-local-love   v-if="!Collection" class="text-24px"/>
            <icon-local-love-on v-else class="text-24px"/>
        </button>
   
    </main>

    

</template>

<script  setup lang='ts'>
import { IcardData } from "@/typings/ApiInterface";
import {  Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";

defineOptions({name:'swiperpic'})
defineProps<{
  cardData: IcardData;
}>();
const router = useRouter();
const showarrow: Ref<boolean> = ref(false);
    const Collection = ref(false);
const onMouseEnter = function () {
  showarrow.value = true;
};
const onMouseLeave = function () {
  showarrow.value = false;
};

//跳转对应的详情
const GoToHouseDetail = function (id: string) {
    // console.log("点击了");
  router.push({
    path: `/house/${id}`,
  });
};
</script>

<style lang='scss' scoped>
.custom-arrow {
  display: flex;
  position: absolute;
  top: 0;

  font-size: large;
  width: 100%;
  // height: 50px;
  height: 100%;
  font-size: large;
//   pointer-events: none;
  // background-color: red;
  // background-color: #767676 !important;
  .custom-arrow--left {
    position: absolute;
    left: 12px;
    font-size: 40px;
    height: 100%;
    // top: 75px;
    &::before {
      content: "";
      position: absolute;
      left: -9px;
      width: 50px;
      height: 100%;
      background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.177)
      );
    }
  }
  .custom-arrow--right {
    position: absolute;
    right: 12px;
    font-size: 40px;
    // top: 75px;
       height: 100%;


    &::before {
      content: "";
      position: absolute;
      right: -9px;
      width: 30px;
          height: 100%;

      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.177)
      );
    }
  }
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  & > i {
    transform: scale(0.95);
    transform-origin: center;
  }
}

.dots-box {
  display: inline-flex;
  align-items: center;
  width: 120px;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

 
}
.custom-dots {
  display: flex;
  align-items: center;
  column-gap: 3px;
  margin: 0;
  padding: 0;

 
}

.custom-dots li {

  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 8px;
  height: 8px;
  background: #fff;

  & + li {
    width: 6px;
    height: 6px;
  }

  // &~li{
  //   width: 6px;
  //   height: 6px;
  // }
}
 .Collection-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    padding: 8px;
    // margin: -8px;
    width: 44px;
    height: 44px;
    border: 0px !important;
    z-index: 1;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
    background: transparent !important;
  }
</style>