<template>
  <Transition appear enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut">
    <footer v-show="show " class="mestyle2  fixed left-0 bottom-0 h-20 p-l-10 p-r-10 bg-#fff w-full">
      <div class="w-100 h-5 flex-y-center gap-6">
        <span>
          <icon-fa-brands:weibo class="text-20px cursor color-black" />
        </span>
        <span class="span-margin">
          <icon-uiw:weixin class="text-20px cursor color-black"></icon-uiw:weixin>
        </span>
        <span @click="handleClick" class="text-center hover:b-b-1 cursor text-14px color-black">
          支持与政策
          <icon-ion:ios-arrow-up class="text-24px"></icon-ion:ios-arrow-up>
        </span>
      </div>
      <div class="h-10 text-12px color-#b0b0b0">
        <p>
          京ICP备16017121号京ICP证 160773号·京公网安备
          11010502032345号·安彼迎网络（北京）有限公司·营业执照
        </p>
        <p class="text-right">
          <span> © 2023 Airbnb, Inc.All rights reserved.</span>

          <span>·</span>
          <span>条款</span>
          <span>·</span>
          <span>隐私政策</span>
          <span>·</span>
          <span>网站地图</span>
          <span>·</span>
          <span>全国旅游投诉渠道</span>
          <span>·</span>
          <span>12301</span>
        </p>
      </div>
    </footer>
   

  </Transition>
  <footer v-show="showSmallFoot" class="small-foot" @click="handleShowPanel">
      <span>阅读隐私政策支持</span>
      <icon-icon-park-outline:attention class="text-18px ml-10px" />
  </footer>
  <footPanel v-model="showPanel" />
</template>
  
<script setup lang="ts">
import { computed, ref } from "vue";
import footPanel from "./footPanel.vue";
import { useRoute } from "vue-router";
defineOptions({ name: "systemFooter" });

const showPanel = ref<boolean>(false);
const route = useRoute();
const show = computed(() => {
  if(route.name=='website_home'){
    return true;
  }
  return false;
});
const showSmallFoot = computed(() => {

  if(route.name!=='website_home'){
    return true;
  }
  return false;
});


function handleShowPanel() {
  showPanel.value = true;
}
function handleClick() {

  showPanel.value = true;
}

</script>
  
<style lang="scss" scoped>
.mestyle1 {
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px !important;
  border-top-left-radius: 12px !important;
  border-top-right-radius: 12px !important;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.822);
  }
}


.mestyle2 {
  z-index: 9;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.822);
  }
}

.cursor {
  cursor: pointer;
}

.animate__animated {
  animation-duration: 250ms;
  animation-fill-mode: both;
}

.animate__fadeIn {
  animation-name: fadeIn;
}

.animate__fadeOut {
  animation-name: fadeOut;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.gridbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;

}

.center-box {
  margin-top: 200px;
  display: grid;
  place-content: center;
}

.span-margin {
  margin: 0 12px
}
</style>
  