<template>
  <section class="p-t-10px">
    <n-carousel class="swiper-show" autoplay draggable>
      <n-carousel-item v-for="item in swiperItem" :key="item.key">
        <img :src="item.src" class="w-full h-450px" :alt="item.src" />
      </n-carousel-item>
    </n-carousel>

    <n-card title="最新房源" :bordered="false">
      <div class="newhouse">
        <n-carousel :slides-per-view="3" :space-between="20" autoplay draggable>
          <n-carousel-item v-for="item in newHouseList" :key="item.key">
            <house-info-card
              class="new-card"
              @click="toHouseDetail(item.house_id)"
              :card-date="item"
            >
            </house-info-card>
          </n-carousel-item>
        </n-carousel>
      </div>
    </n-card>
    <n-card title="城市攻略" :bordered="false">
      <n-carousel
        slides-per-view="auto"
        :space-between="20"
        :loop="false"
        draggable
      >
        <n-carousel-item
          class="city-box"
          v-for="item in imges"
          :key="item.title"
          style="width: 265px"
        >
          <div class="city-item">
            <img :src="item.pic" :alt="item.title" />
            <div class="info">
              <h2>{{ item.title }}</h2>
              <p>{{ item.subtitle }}</p>
            </div>
          </div>
        </n-carousel-item>
        <template #arrow="{ prev, next }">
          <div class="custom-arrow">
            <button type="button" class="custom-arrow--left" @click="prev">
              <icon-ion:chevron-left class="text-64px color-#fff" />
            </button>
            <button type="button" class="custom-arrow--right" @click="next">
              <icon-ion:chevron-right class="text-64px color-#fff" />
            </button>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li
              v-for="index of total"
              :key="index"
              :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>
    </n-card>
  </section>
</template>
<script setup lang="ts">
import MiddleLayout from "@/layouts/MiddleLayout/index.vue";
import { fetchNewHouseInfo } from "@/service/api/house";
import houseInfoCard from "@/components/card/houseInfoCard.vue";
import { useRouterPush } from "@/composables";
import { useHouseStore, useAppStore } from "@/store";
import { onMounted, reactive, ref } from "vue";

const { routerPush, toHouseDetail } = useRouterPush();
const house = useHouseStore();
const app = useAppStore();

onMounted(() => {
  init();
});

const imges = [
  {
    title: "上海",
    subtitle: "在繁华的浦东，与世界接轨，享受不一样的上海生活。",
    pic: "/src/assets/images/shanghai.jpg",
  },
  {
    title: "北京",
    subtitle: "让天安门广场成为您的邻居，来一场真正的京城生活",

    pic: "/src/assets/images/beijing-new.jpeg",
  },
  {
    title: "杭州",
    subtitle: "在西湖畔，领略江南水乡的美景，感受杭州的文化底蕴。",

    pic: "/src/assets/images/hangzhou.jpeg",
  },
  {
    title: "南京",
    subtitle: "在历史与现代的交汇处，寻找你的家的感觉。",

    pic: "/src/assets/images/nanjing.jpeg",
  },
  {
    title: "深圳",
    subtitle: "在科技之城，与创新同行，开启前所未有的深圳之旅。",

    pic: "/src/assets/images/shenzhen-new.jpeg",
  },
  {
    title: "武汉",
    subtitle: "在黄鹤楼，俯瞰长江，领略武汉的江城风光。",

    pic: "/src/assets/images/wuhan.jpg",
  },
];
const swiperItem = reactive([
  {
    key: "1",
    src: "/src/assets/images/swiper-bg1.jpg",
  },
  {
    key: "2",
    src: "/src/assets/images/swiper-bg2.jpg",
  },
  {
    key: "3",
    src: "/src/assets/images/swiper-bg3.jpg",
  },
  {
    key: "4",
    src: "/src/assets/images/swiper-bg4.jpg",
  },
  {
    key: "5",
    src: "/src/assets/images/swiper-bg5.jpeg",
  },
  {
    key: "6",
    src: "/src/assets/images/swiper-bg5.jpg",
  },
]);

const newHouseList = ref<HousePage.CardList[]>([]);

async function init() {
  let { error, data } = await fetchNewHouseInfo();
  if (error) return;
  newHouseList.value = data as HousePage.CardList[];
}

init();
</script>

<style lang="scss" scoped>
.city-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .city-item,
  li {
    // width: 25%;
    margin-bottom: 10px;
    position: relative;

    &:hover {
      div {
        opacity: 0.8;
      }
    }

    img {
      width: 100%;
      height: 310px;
      object-fit: cover;

      // 使用css：：before图片遮罩
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        background-color: #000 !important;
        opacity: 0.3 !important;
      }
    }

    .info,
    div {
      position: absolute;
      top: 62px;
      left: 24px;
      padding: 10px;
      width: 80%;

      h2 {
        font-size: 32px;
        line-height: 35px;
        color: #fff;
        font-weight: 700;
        margin-bottom: 10px;
      }

      p {
        font-size: 16px;
        line-height: 26px;
        color: #fff;
        font-weight: 600;
      }
    }
  }
}

.swiper-showP {
  height: 400px;
  width: 100vw !important;
  background-color: #fff;
  padding-top: 80px;
}

.newhouse {
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;

  .new-card::before {
    content: "";
    position: absolute;
    top: -4px !important;
    left: 9px !important;
    z-index: 99 !important;
    width: 85px;
    height: 85px;
    transform: rotateZ(30deg);
    background: url("@/assets/images/new-solid.png") no-repeat;
    pointer-events: none;
  }
}

.custom-arrow {
  width: 100vw;
  height: 100vh;
  background-color: red;
  pointer-events: none;
  position: relative;
  z-index: 999;
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
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.custom-arrow--right {
  position: absolute;
  right: 0;
  top: 0;
  width: 10%;
  height: 100%;
  pointer-events: auto;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
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
</style>
