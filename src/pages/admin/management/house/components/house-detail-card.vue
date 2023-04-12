<template>
  <n-card>
    <template v-if="houseDetailData">
      <n-thing>
        <template #avatar>
          <div class="swiper-house-pic">
            <swiper-house-pic :card-data="houseDetailData" />
          </div>
        </template>
        <template #header>
          {{ houseDetailData?.title }}
        </template>
        <template #header-extra>
          <div class="ower-avatar">
            <n-avatar
              class="mr-6 mb-3"
              round
              :size="65"
              :src="
                houseDetailData?.Homeowner_info?.pic ??
                'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
              "
            />
          </div>
        </template>

        <template #description>
         <p>{{ houseDetailData.location }}</p> 

           <p class="text-right color-red  font-700 text-18px">
           {{ houseDetailData.price.split("/").join("元/") }}
        </p>
        </template>
       
        <template #footer>
          <n-h3>房源介绍</n-h3>
          <p class="indent-2em">
            {{ houseDetailData.house_description }}
          </p>
        </template>
        <template #action>
          <n-space :vertical="true">
            <ul>
              <n-h3>{{ houseDetailData.rentinfo?.title }}</n-h3>
              <li v-for="item in houseDetailData.rentinfo?.data">
                <span class="label">{{ item.label }}</span>
                <span class="text-14px">{{ item.value }}</span>
              </li>
            </ul>

            <ul>
              <n-h3>{{ houseDetailData.houseDetail?.title }}</n-h3>
              <li v-for="item in houseDetailData.houseDetail?.data">
                <span class="label">{{ item.label }}</span>
                <span class="text-14px">{{ item.value }}</span>
              </li>
            </ul>
          </n-space>
        </template>
      </n-thing>
    </template>
    <template v-else>
      <div>加载中...</div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { useHouseStore } from "@/store";
import swiperHousePic from "@/components/swiper/index.vue";
import { computed } from "vue";
const house = useHouseStore();
defineOptions({ name: "houseDetailCard" });

const houseDetailData = computed(
  () => house.OneHouseDetailInfo as HouseManagement.House | null
);
</script>

<style lang="scss" scoped>
.swiper-house-pic {
  width: 250px;
  object-fit: cover;
  aspect-ratio: 350/235; //容器的宽高比例

  :deep(img) {
    width: 350px !important;
    height: 100%;
  }
}

.label {
  color: #999;
  font-size: 16px;
  margin-right: 12px;

  &::after {
    content: ":";
  }
}
.ower-avatar {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
.test {
  text-indent: 2em;
}
</style>
