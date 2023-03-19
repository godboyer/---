<template>
  <n-grid
    cols="1 s:2 m:3 l:4 xl:5"
    x-gap="12"
    y-gap="20"
    item-responsive
    responsive="screen"
  >
    <n-grid-item v-for="item in 30" :key="item" span="1">
      <n-card
        :bordered="false"
        :content-style="contentstyle"
        :header-style="headerstyle"
        :footer-style="footerstyle"
      >
        <template #header>
          <n-skeleton height="58px" width="200px" :sharp="false" />
        </template>
        <template #cover class="cover">
          <n-skeleton height="180px" width="283px" />

          <button>
            <n-skeleton height="34px" circle />
          </button>
        </template>

        <div>
          <n-skeleton height="10px" width="80%" text :sharp="false" />
        </div>
        <template #header-extra>
          <n-skeleton height="45px" circle />
        </template>

        <template #footer>
          <n-skeleton height="20px" width="80%" :sharp="false" />
        </template>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const contentstyle = reactive({
  "font-size": "12px",
  "line-height": "22px",
  "font-weight": 400,
  color: "rgb(72,72,72)",
  padding: 0,
  paddingLeft: "12px",
});

const headerstyle = reactive({
  padding: "12px",
});
const footerstyle = reactive({
  padding: "12px",
});
</script>

<style lang="scss" scoped>
.skeleton_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.con-card {
  padding: 0;
}
.n-card {
  max-width: 285px;
  max-height: 318px;
  margin: 3px;
}
.n-card-header {
  padding: 12px !important;
}
.n-card-cover {
  position: relative;
  height: 220px !important;
  img {
    height: 220px;
  }
  button {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 8px;
    margin: -8px;
    width: 44px;
    height: 44px;
    border: 0px !important;
    z-index: 999;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
    background: transparent !important;
  }
}

:deep(div[class="n-card-header__main"]) {
  font-size: 16px;
  font-weight: 800 !important;
}
</style>
