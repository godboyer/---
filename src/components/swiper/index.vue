<template>
  <main class="wh-full relative z-5">
    <n-carousel
      touchable
      effect="custom"
      :transition-props="{ name: 'creative' }"
      :show-arrow="showarrow"
      class="b-rd-1 wh-full relative"
      @mouseenter.stop="onMouseEnter"
      @mouseleave.stop="onMouseLeave"
    >
      <n-image
        v-for="src in swiperPic"
        :key="src"
        width="100"
        height="100"
        :src="src"
        object-fit="cover"
        class="imgstyle"
        :img-props="{width: '100%'} "  
      />
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <button type="button" class="custom-arrow--left" @click.stop="prev">
            <icon-ion:chevron-back-outline class="text-46px color-#fff" />
          </button>
          <button type="button" class="custom-arrow--right" @click.stop="next">
            <icon-ion:chevron-forward-outline class="text-46px color-#fff" />
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


    <div class="Collection-btn">
      <collection-btn :house_id="house_id" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ImgHTMLAttributes, Ref, computed, ref, useAttrs } from "vue";
import { useRouter } from "vue-router";
import collectionBtn from "./collection-btn.vue";
import { useRouterPush } from "@/composables";

defineOptions({ name: "swiperHousePic" });
const props = defineProps<{
  cardData: HousePage.Card | HouseManagement.House;
}>();
//可选参数透传
const attrs = useAttrs();
console.log("attrs: ", attrs);
// const previewDisabled = computed(() => {
//   if (attrs["preview-disabled"]) {
//     return true;
//   }
//   return false;
// });
const imgRef = ref<ImgHTMLAttributes | null>(null);
const swiperPic = computed(() => {
  return props.cardData?.swiper_pic;
});


const showarrow: Ref<boolean> = ref(false);
const onMouseEnter = function () {
  showarrow.value = true;
};
const onMouseLeave = function () {
  showarrow.value = false;
};

const house_id = computed(() => props.cardData.house_id);
</script>

<style lang="scss" scoped>
.custom-arrow {
  display: flex;
  position: absolute;
  top: 0;
  font-size: large;
  width: 100%;
  height: 100%;
  font-size: large;
  // background: red;

  .custom-arrow--left {
    position: absolute;
    top: 0px;
    left:0px;
    font-size: 40px;
    height: 100%;

    // top: 75px;
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: 50px;
      height: 100%;
      background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.288)
      );
    }
  }

  .custom-arrow--right {
    position: absolute;
    right: 0px;
    height: 100%;
    &::before {
      content: "";
      position: absolute;
      right: -9px;
      width: 50px;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.281)
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
  width: 44px;
  height: 44px;
  border: 0px !important;
  z-index: 9;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  background: transparent !important;
}

.imgstyle{
  width: 100%;
  height: 100%;
  object-fit: cover;
    aspect-ratio: 350/235; //容器的宽高比例
}
</style>
