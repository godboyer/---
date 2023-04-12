<template>
  <div>
    <n-list bordered>
      <template #header>
        我的收藏
      </template>
      <n-space :vertical="true" justify="start" >
        <div class="w-100% b-rd-15px b-1 p-12px flex gap-12px relative cursor-pointer" v-for=" item  in collectList" :key="item.user_id">
          <n-image width="120" :src="item.first_picture" />
          <n-thing class="flex-1"  :title="item.title" @click=" toHouseDetail(item.house_id)" >
            {{ item.address }}
           <price-comp :price="item.price"  />
          </n-thing>
          <div class="absolute right-12px top-10px">
            <collection-btn :house_id="item.house_id" />
          </div>
        </div>
      </n-space>
    </n-list>
  </div>
</template>

<script setup lang='ts'>
import { useAuthStore, useHouseDetailStore } from '~/src/store';
import collectionBtn from '@/components/swiper/collection-btn.vue';
import priceComp from '@/components/card/priceComp.vue';
import { useRouterPush } from "@/composables";
import { computed } from 'vue';
const {toHouseDetail} = useRouterPush();
const user = useAuthStore();
const house = useHouseDetailStore();

const collectList = computed(() => user.collectList);

user.getCollectList();
</script>

<style lang='scss' scoped></style>