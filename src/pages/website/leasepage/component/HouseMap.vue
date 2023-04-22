<template>
  <div class="wh-full">
    <section class="pr-6 pt-12 left-box">
      <n-list class="pt-12">
        <template #footer>
          <div class="h-5 bg-#fff"></div>
        </template>
        <template v-for="item in HouseCardListData">
          <house-list-card :card-date="item" />
        </template>
      </n-list>
    </section>

    <div class="baidu_map">
      <BaiduMap />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaiduMap from "@/components/map/components/baidu-map.vue";
import houseListCard from "@/components/card/houseListCard.vue";
import { useHouseStore } from "@/store";
import { storeToRefs } from "pinia";

defineOptions({ name: "houseMap" });

const house = useHouseStore();
const { HouseCardListData } = storeToRefs(house);
async function InitalData() {
  await house.GetHouseListByCity();
}

InitalData();
</script>

<style lang="scss" scoped>
.baidu_map {
  position: fixed !important;
  top: 128px !important;
  bottom: 0px !important;
  right: 0px !important;
  z-index: 2 !important;
  display: block !important;
  // display: none;
}

@media (min-width: 1440px) {
  .baidu_map {
    width: 50% !important;
  }

  .left-box {
    width: 50% !important;
  }
}

@media (min-width: 1128px) and (max-width: 1440px) {
  .left-box {
    width: 66% !important;
  }
}

@media (max-width: 1128px) {
  .left-box {
    width: 950px !important;
  }
}

.left-box {
  width: 50%;
  min-width: 650px !important;

  :deep(.n-list-item) {
    margin-right: 24px !important;
    margin-top: 20px !important;
    width: 100% !important;
    border: 1px solid #ebebeb;
    border-radius: 5px;

    &:hover {
      box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.089);
      cursor: pointer;
    }
  }

  :deep(.n-list-item__prefix) {
    width: 300px;
    height: 200px;
    flex: none !important;
    aspect-ratio: 3/2; //容器的宽高比例
    cursor: pointer;

    img {
      width: 100%;
      object-fit: cover;
      // height: 220px;
      cursor: pointer;
    }
  }

  :deep(.n-list-item__suffix) {
    flex: none;
    width: 168px;
    height: 160px;
    border-left: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .price {
      margin-top: 20px;
      align-self: flex-start;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .tag {
    display: flex;
    gap: 10px;
  }
}
</style>
