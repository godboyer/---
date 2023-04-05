<template>
  <main :class="{ tabTop: showTop }" class="w-1440px">
    <hr color="#e5e5e5" ref="dividerRef" />
    <n-grid cols="7" x-gap="12">
      <n-grid-item span="5">
        <n-tabs  :on-update:value="handleClickTab" type="line" animated>
          <n-tab-pane name="description" tab="房源简介">
            <n-space :vertical="true" :size="25">
              <ul class="description-ul">
                <n-h3>房源简介</n-h3>
                <li v-if="!HouseDescription">
                  这套舒适雅致的房源位于保利公园九里五期。小区共有9栋楼。在小区内可以看到全天执勤的安保人员。该小区日常开放3个门。房源离东门较近，走一会就到了。小区内配备饮水站，快递柜。其中便利店就在楼下，生活便利。房源附近有篮球场，锻炼身体很方便。楼栋概况\n房源所在小区建于2018年，楼栋外立面很新。楼栋共有34层，2梯4户，私密性好。小区注重卫生管理，会定期安排人员维护楼栋的卫生。单元有门禁。房源概况\n这间4居室的05卧面积较大，两人住也不会太拥挤。房源位于第25层，在窗边能俯瞰波澜水面，城市美景尽收眼底。卧室朝南，白天光照充足，冬天比较暖和。厨房有1扇窗户，采光通风好。公用卫生间有窗户，保证了通风采光。装修亮点
                  <br />卧室的装修以灰、粉色为主，营造出简约低调的居室氛围。房间优选环保无醛板材，为您居住安全保驾护航。
                </li>
                <li v-else>
                  {{ HouseDescription }}
                </li>
              </ul>
              <ul>
                <n-h3>{{ rentinfo?.title }}</n-h3>
                <li v-for="item in rentinfo?.data">
                  <span class="label">{{ item.label }}</span>
                  <span class="text-14px">{{ item.value }}</span>
                </li>
              </ul>

              <ul>
                <n-h3>{{ houseDetail?.title }}</n-h3>
                <li v-for="item in houseDetail?.data">
                  <span class="label">{{ item.label }}</span>
                  <span class="text-14px">{{ item.value }}</span>
                </li>
              </ul>
            </n-space>
          </n-tab-pane>
          <n-tab-pane name="comment" tab="评价"> Hey Jude </n-tab-pane>

          <n-tab-pane name="Facilities" :tab="Facilities?.title">
            <n-h3>{{ Facilities?.title }}</n-h3>
            <ul class="Facilities-ul">
              <li v-for="(v, idx) in (Facilities as any)?.data" :key="idx">
                <i :class="'iconfont ' + v.icon"></i>
                <span>{{ v?.name }}</span>
              </li>
            </ul>
          </n-tab-pane>
          <n-tab-pane name="address" tab="位置">
            <div class="h-500px">
              <baidu-map />
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-grid-item>
      <n-grid-item span="2">
        <n-card class="w-full mt-50px">
          <template #header>
            <div class="mt-10px p-15px ">

              <n-h3 class="text-center">{{ owner?.own_house_name }}</n-h3>
            </div>
          </template>
          <div class="owner-info">

            <n-avatar round :size="80" :src="ownerAvatar" />
            <div class="owner-info-item">
              <span class="name">{{ owner?.username }}</span>
              <span class="phone">{{ owner?.phone }}</span>
            </div>
          </div>

          <n-button type="primary" block>立即预约</n-button>
        </n-card>
      </n-grid-item>
    </n-grid>
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useHouseDetailStore } from "@/store/index";
import BaiduMap from "@/components/map/components/baidu-map.vue";
const store = useHouseDetailStore();
const containerRef = ref<HTMLElement | undefined>(undefined);
const dividerRef = ref<HTMLElement | undefined>(undefined);
const Facilities = computed(() => {
  return store.HouseDetail?.facilities;
});
const HouseDescription = computed(() => {
  return store.HouseDetail?.house_description;
});
const rentinfo = computed(() => {
  return store.HouseDetail?.rentinfo;
});
const houseDetail = computed(() => {
  return store.HouseDetail?.houseDetail;
});

const owner = computed(() => {
  return store.HouseDetail?.owner_id;
});
const ownerAvatar = computed(() => {
  return store.HouseDetail?.owner_id?.avatar;
});

const showTop = ref(false);
const handleClickTab = (name: string) => {
  console.log(name);
  // dividerRef.value?.scrollIntoView();
  console.log(' dividerRef.value?.scrollIntoView();: ',  dividerRef.value.offsetTop);
  showTop.value = true;
  window.scrollBy(
    0,
    dividerRef.value?.offsetTop  - window.scrollY
  );
 
};
</script>

<style lang="scss" scoped>
.tabTopP {
  position: fixed !important;
  top: 0 !important;
  width: 100% !important;
  z-index: 999 !important;
  background: #cb2c2c !important;
  transition: all 0.3s !important;

}

.owner-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  .owner-info-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 10px;
    text-indent: 25px;

    .name {
      font-size: 18px;
      font-weight: 600;

    }

    .phone {
      font-size: 14px;
      color: #999;
    }
  }
}

.Facilities-ul {
  column-count: 2;

  li {
    width: 220px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 12px;
    padding: 12px;

    text-align: center;

    span {
      vertical-align: middle;
      line-height: 75px;
    }

    i {
      margin-right: 32px;

      text-align: center;
      width: 75px;
      height: 75px;
      position: relative;
      font-size: 64px;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.description-ul {
  li {
    font-size: 16px;
    line-height: 26px;
    text-align: justify;
  }

  margin-bottom: 25px !important;
}

.label {
  color: #999;
  font-size: 16px;
  margin-right: 12px;

  &::after {
    content: ":";
  }
}
</style>
