<template>
  <div class="mycard">
    <n-card :bordered="false">
      <template #cover>
        <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      </template>
    </n-card>
    <n-card
      :bordered="false"
      :content-style="contentstyle"
      :header-style="headerstyle"
      :footer-style="footerstyle"
    >
      <template #header>
        <n-ellipsis style="max-width: 240px"> 恒杰丁香花园(公寓) </n-ellipsis>
      </template>
      卡片内容
      <template #footer> 1室1厅1卫 </template>
      <template #action>
        <n-rate>
          <n-icon size="20">
            <img src="../assets/Star.png" alt="" />
          </n-icon>
        </n-rate>
        4.5
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">

import { reactive } from "vue";
// import { CashOutline as CashIcon } from '@vicons/ionicons5'
const contentstyle = reactive({
  "font-size": "16px",
  "line-height": "22px",
  "font-weight": 800,
  color: "rgb(72,72,72)",
  paddingBottom: "14px",
});

const headerstyle = reactive({
  "line-height": "21px",
  "font-size": "18px",
  "font-weight": "bold",
  paddingTop: "42px",
  paddingBottom: "14px",
});
const footerstyle = reactive({
  // padding: "12px",
  "font-size": "16px",
  "line-height": "21px",
  color: "#3e4958",
  paddingBottom: "14px",
});
</script>

<style lang="scss" scoped>
.mycard {
  display: flex;
  width: 560px;
  height: 215px;
  border-radius: 20px !important;
  overflow: hidden;
}
:deep(.n-card-header__main) {
  font-weight: bold !important;
}
:deep(.n-card__action) {
  padding-top: 0;
  padding-bottom: 42px;
  color: #3e4958;
}
.n-card {
  justify-content: center;
  // align-items:center ;
  max-width: 300px;
  border-radius: 0;
}
:deep(.n-card-cover) {
  align-self: center;
  width: 263px !important;
  height: 195px !important;
  border-radius: 20px !important;
  img {
    margin: 0 auto;
  }
}
</style>
