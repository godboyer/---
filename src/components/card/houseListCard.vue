
<template>
  <n-list-item class="wh-full" @click.stop.prevent="toHouseDetail(cardDate.house_id)">
    <template #prefix>
     <swiper-house-pic  :card-data="cardDate"  preview-disabled />
    </template>

    <template #suffix>
      <span class="price">
        {{ price + "元/月"}}
      </span>

      <n-avatar class="mr-6 mb-3" round :size="38" :src="
        Homeowner_info?.avatar ??
        'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      " />
    </template>
    <n-thing :title="cardDate?.title" :description="cardDate?.location">

      <span>
        <icon-material-symbols:pin-drop-rounded class="text-24px" />

        {{ cardDate?.location ?? "无" }}
      </span>
      <p>
        <span>
          <icon-local-area class="text-20px" />

        {{ area }}
        </span>

        <span>
          <icon-local-storey class="text-20px" />
          {{ floor + "层"  }}
        </span>
      </p>
      <p class="tag">
        <n-tag round v-for="(v, idx) in cardDate?.tags" ize="small" :color="{
          color: '#42B2B6',
          textColor: '#fff',
          borderColor: '#42B2B6',
        }" :key="idx">{{ v }}</n-tag>
      </p>

    </n-thing>
  </n-list-item>
</template>
  
<script setup lang="ts">
import { reactive, ref } from "vue";
import swiperHousePic from "../swiper/index.vue";
import { useRouterPush } from "@/composables";
defineOptions({ name: "houseListCard" });

const { toHouseDetail } = useRouterPush();



const props = defineProps<{
  cardDate: HousePage.CardList;
}>();
const {Homeowner_info,title,price,floor,area,location} = props.cardDate;

const contentstyle = reactive({
  height: "148px",
  padding: 0,
  paddingLeft: '16px'
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
.love {
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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

}

.action-carousel,
.n-carousel__slides {
  width: 330px !important;
  height: 82px !important;

  :deep(.n-carousel__slide) {
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

.bot-carousel {
  width: 636px !important;

  .n-carousel__slide {
    width: 158px !important;
    height: 100px !important;
  }

  .carousel-img {
    width: 158px !important;
    height: 100px !important;
    object-fit: cover;
  }
}

.n-tag {
  height: 18px;
  font-size: 10px;
}

.decbox {
  height: 36px;
  background-color: #333;
}

.tagbox {
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 10px;
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

:deep(.n-card__content) {}

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
  padding-left: 12px;
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
  