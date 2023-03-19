<template>
  <n-grid cols="6">
    <n-grid-item span="1"> </n-grid-item>
    <n-grid-item span="4">
      <n-tabs type="line" animated>
        <n-tab-pane name="description" tab="房源简介">
          <n-h3>房源简介</n-h3>
          <ul class="description-ul">
            <li>
              这套舒适雅致的房源位于保利公园九里五期。小区共有9栋楼。在小区内可以看到全天执勤的安保人员。该小区日常开放3个门。房源离东门较近，走一会就到了。小区内配备饮水站，快递柜。其中便利店就在楼下，生活便利。房源附近有篮球场，锻炼身体很方便。楼栋概况\n房源所在小区建于2018年，楼栋外立面很新。楼栋共有34层，2梯4户，私密性好。小区注重卫生管理，会定期安排人员维护楼栋的卫生。单元有门禁。房源概况\n这间4居室的05卧面积较大，两人住也不会太拥挤。房源位于第25层，在窗边能俯瞰波澜水面，城市美景尽收眼底。卧室朝南，白天光照充足，冬天比较暖和。厨房有1扇窗户，采光通风好。公用卫生间有窗户，保证了通风采光。装修亮点
              <br />卧室的装修以灰、粉色为主，营造出简约低调的居室氛围。房间优选环保无醛板材，为您居住安全保驾护航。
            </li>
            <li>
              {{ store.getHouseDescription }}
            </li>
          </ul>
        </n-tab-pane>
        <n-tab-pane name="the beatles" tab="评价"> Hey Jude </n-tab-pane>

        <n-tab-pane
          name="Facilities"
          :tab="(store.getFacilities as any)?.title"
        >
          <n-h3>{{ (store.getFacilities as any)?.title }}</n-h3>
          <ul class="Facilities-ul">
            <li
              v-for="(v, idx) in (store.getFacilities as any)?.data"
              :key="idx"
            >
              <i :class="'iconfont ' + v.icon"></i>
              <span>{{ v?.name }}</span>
            </li>
          </ul>
        </n-tab-pane>
        <n-tab-pane name="jay chou" tab="位置"> 七里香 </n-tab-pane>
      </n-tabs>
    </n-grid-item>
    <n-grid-item span="1"> </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useHouseDetail } from "@/store/index";
import mapSrc from "@/assets/map2.png";

const store = useHouseDetail();
</script>

<style lang="scss" scoped>
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
}
</style>
