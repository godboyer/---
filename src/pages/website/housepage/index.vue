<template>
  <div class="house-detail" ref="containerRef">
    <system-header>
      <template #title>
        {{ x }}
        {{ y }}
      </template>
    </system-header>
    <div class="house-head">
      <n-page-header :subtitle="housetitle" @back="routerBack()">
      </n-page-header>
    </div>

    <section class="house-content">
      <HouseDetailmain />
      <HouseDetailFoot />
    </section>
  </div>
  <n-back-top :right="100" />
</template>

<script setup lang="ts">
import HouseDetailmain from "./HouseDetailMain.vue";
import HouseDetailFoot from "./HouseDetailFoot.vue";
import { useMessage } from "naive-ui";
import { computed, onMounted, reactive, Ref, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import _ from "lodash-es";
import { useHouseDetailStore, useHouseStore } from "@/store";
import { useRouterPush } from "@/composables";
import { useWindowScroll, useEventListener } from "@vueuse/core";
const { x, y } = useWindowScroll();

const { routerBack } = useRouterPush();
const containerRef = ref<HTMLElement | undefined>(undefined);
const route = useRoute();

const house = useHouseStore();

const housetitle = computed(() => {
  return house.OneHouseDetailInfo?.title;
});

onMounted(() => {
  if (route.query) {
    const { house_id } = route.query;
    console.log("house_id: ", house_id);
    house.getOneHouseDetailByFetch(house_id as string);
  }
});
</script>

<style lang="scss" scoped>
.house-detail {
  position: relative;
  padding-top: 90px !important;
}

.house-title {
  // padding: 12px;
  font-weight: bold;
  color: #222;
}

:deep(.n-tabs-tab-wrapper) {
  span {
    font-size: 20px;
  }
}

:deep(.n-tabs-nav--top) {
  height: 80px;
}

:deep(.n-tab-pane) {
  height: 1000px;
}

.foot-img {
  width: 100%;
  display: block;
}

.house-head {
  // margin-top: 92px;
  padding: 0 32px;
}

.house-content {
  width: 100%;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.action-carousel {
  width: 330px !important;
  height: 82px !important;

  .carousel-box {
    width: 112px;
    height: 82px;
    background: #fff;
    border-radius: 6px;
    object-fit: cover;
  }
}

.bot-carousel {
  width: 100% !important;

  :deep(.n-carousel__slides) {
    width: 100% !important;
    height: 265px;
    // transform: translateX(0px) !important;
  }

  :deep(.n-carousel__slide) {
    width: 412px !important;
    height: 261px !important;
    border-radius: 8px;
    overflow: visible;
  }

  .carousel-img {
    width: 412px !important;
    height: 261px !important;
    border-radius: 8px;
    object-fit: cover;
  }
}

.n-tag {
  height: 18px;
  font-size: 10px;
}

.n-card {
  position: relative;
  justify-content: center;
  border-radius: 0;
  background: transparent;
  box-sizing: border-box;
}

:deep(.n-card-header) {
  padding: 0;
  padding-left: 12px;
  // height: 53px !important;
}

:deep(.n-card-cover) {
  align-self: center;
  // width: 470px !important;
  // height: 355px !important;
  border-radius: 12.2078px 12.2078px 0px 0px;

  //   border-radius: 20px !important;
  img {
    display: block;
    margin: 0 auto;
    border-radius: 8px 8px 0 0 !important;
  }
}

:deep(.n-card__action) {
  // width: 100%;
  height: 206px;
  padding: 0 12px 0;
  background: #d5d5d5;
  /* Gray 2 */
  border: 1.59722px solid #8a8a8a;
  border-radius: 9.58333px;
  // margin-left: 12px;
  display: flex;
  //   align-items: center;
}

:deep(.v-x-scroll) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.my-largecard {
  width: 100%;
  height: 355px;
  padding: 12px 73px;
  //   background-color: rgb(143, 70, 70);
  display: flex;
  justify-content: baseline;
  //   background: transparent;
}
</style>
