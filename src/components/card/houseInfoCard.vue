<template>
  <div class="p-1">

    <n-card :bordered="false" :content-style="contentstyle" :header-style="headerstyle">
      <template #cover class="cover">
        <n-skeleton v-if="loading" height="100%" width="100%" size="medium" />
        <swiper-house-pic v-else :card-data="cardDate" />

      </template>
      <div>
        <div class="card_p">
          <n-skeleton v-if="loading" height="100%" width="80%" size="medium" />
          <div v-else>
            <icon-material-symbols:pin-drop-rounded class="text-24px" />
            <span>
              {{ cardDate?.location ?? "无" }}
            </span>
          </div>
        </div>
        <div class="card_p">
          <n-skeleton v-if="loading" height="22px" width="40%" size="medium" />
          <div v-else class="items-center flex">

            <span>
              <icon-local-area class="text-20px" />

              {{ cardDate.area }}
            </span>

            <span>
              <icon-local-storey class="text-20px" />
              {{ cardDate.des.split("|")[1] }}
            </span>
          </div>
          <n-skeleton v-if="loading" height="22px" width="20%" size="medium" />
          <div v-else class="price">
            {{ cardDate.price.split("/").join("元/") }}
          </div>
        </div>
      </div>
      <template #header>
        <n-skeleton v-if="loading" height="29px" width="60%" size="medium" />
        <n-ellipsis v-else style="max-width: 200px,height:25px">
          {{ cardDate?.title ?? "无标题" }}
        </n-ellipsis>
      </template>
      <template #header-extra>
        <n-skeleton v-if="loading" :round="true" height="38px" width="38px" size="medium" />
        <n-avatar v-else round :size="38" :src="
          cardDate?.Homeowner_info.pic ??
          'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        " />
      </template>

      <template #footer>
        <div class="tag h-22px w-full">
          <n-skeleton v-if="loading" v-for="v in cardDate?.tags" :key="v" height="22px" width="20%" size="medium" />

          <template v-else>
            <n-tag v-for="(v, idx) in cardDate?.tags" size="small" :color="{
              color: '#42B2B6',
              textColor: '#fff',
              borderColor: '#42B2B6',
            }" :key="idx">{{ v }}</n-tag>
          </template>


        </div>
      </template>
    </n-card>

  </div>
</template>
  
<script setup lang="ts">
import swiperHousePic from "../swiper/index.vue";
import { onMounted, reactive, ref, watch } from "vue";

defineOptions({ name: "houseInfoCard" });
const loading = ref(true)
const props = defineProps<{
  cardDate: HousePage.CardList;
}>();

const contentstyle = reactive({
  fontSize: "12px",
  lineHeight: "22px",
  fontWeight: 400,
  color: "rgb(72,72,72)",
  padding: "0px",
  paddingLeft: "12px",
});

const headerstyle = reactive({
  padding: "12px",
});

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000);

})

watch(
  () => props.cardDate,
  (val) => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1000);
  })


</script>
  
<style lang="scss" scoped>
.con-card {
  padding: 0;
}

:deep(.n-card__footer) {
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 0;
  padding: 10px 12px 12px;

  .n-tag {
    height: 22px;
    color: #fff;
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
  }
}

.card_p {
  margin: 0;
  line-height: 22px;
  height: 22px;
  color: #767676;
  font-weight: 400;
  display: flex;
  column-gap: 12px;
  align-items: center;
  justify-content: space-between;

  .price {
    font-size: 18px;
    color: #222;
    font-weight: 700;
  }
}

.n-card {
  // max-width: 280px;
  width: 100%;
  // max-height: 318px;
  // margin: 5px;
  transition: width 5s ease-in-out;
}

.n-card-header {
  padding: 12px !important;
}

:deep(.n-card-cover) {
  position: relative;
  object-fit: cover;
  aspect-ratio: 350/235; //容器的宽高比例
  cursor: pointer;

  img {
    width: 100%;

    object-fit: cover;
    cursor: pointer;
  }


}

:deep(div[class="n-card-header__main"]) {
  font-size: 16px;
  font-weight: 800 !important;
}

.tag {
  display: flex;
  gap: 10px;
}
</style>
  