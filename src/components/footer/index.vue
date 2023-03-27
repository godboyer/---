<template>
 


  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
  >
    <footer
      ref="FootRef"
      v-if="show"
      class="fixed left-0 bottom-0 w-full h-66 bg-#fff mestyle1 p-6"
    >
      <p>
        <i
          @click="show = false"
          class="i-ci-close-big inline-block color-black"
          style="font-size: 25px"
        ></i>
      </p>
      <n-grid x-gap="12" offset="1" :cols="itemData.length">
        <n-grid-item class="gridbox" v-for="item in itemData" :key="item.title">

          <div>
              <h3 class="text-18px font-700 ">{{ item.title }}</h3>
          <template v-if="item?.children.length !== 0">
            <ul class="text-14px color-#b0b0b0 p-t-4!">
              <li  v-for="v in item.children" :key="v.labeL" >
                <router-link class="hover:b-b-1" :to="v.to">{{ v.labeL }}</router-link>
              </li>
            </ul>
          </template>
          </div>
        
        </n-grid-item>
      </n-grid>
    </footer>
  </Transition>
  <Transition
    appear
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <footer
      v-show="!show"
      class="mestyle2 fixed left-0 bottom-0 h-20 p-l-10 p-r-10 bg-#fff w-full"
    >
      <div class="w-100 h-5 flex-y-center gap-6">
        <span>
          <icon-fa-brands:weibo class="text-20px cursor color-black" />
        </span>
        <span>
          <icon-uiw:weixin class="text-20px cursor color-black"></icon-uiw:weixin>
        </span>
        <span
          @click="show = !show"
          class="text-center hover:b-b-1 cursor text-14px color-black"
        >
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { gsap } from "gsap";
import uploadFile from "@/components/common/uploadAvater.vue"

defineOptions({name:'footerBox'})

//  gsap.registerPlugin(window.ScrollTrigger);
const show = ref<boolean>(false);
const dynamicSlotName =ref("avatar")  
const FootRef = ref<HTMLElement | null>(null);
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el: any) {
  gsap.to(FootRef, {
    y: 0,
    duration: 0.5,
    ease: "power3.out",
  });
}

const itemData = [
  {
    title: "随心所寓",
    children: [
      { labeL: "工作机会", to: "" },
      { labeL: "随心所寓新闻", to: "" },
      { labeL: "政策", to: "" },
      { labeL: "无障碍设施", to: "" },
    ],
  },
  {
    title: "客服支持",
    children: [
      { labeL: "帮助", to: "" },
      { labeL: "邻里支持", to: "" },
    ],
  },
  {
    title: "发现",
    children: [
      { labeL: "信任与安全", to: "" },
      { labeL: "旅行基金", to: "" },
      { labeL: "商务差旅", to: "" },
      { labeL: "爱彼迎杂志", to: "" },
    ],
  },
  {
    title: "发现",
    children: [
      { labeL: "为什么要出租?", to: "" },
      { labeL: "房东义务", to: "" },
      { labeL: "开展体验", to: "" },
      { labeL: "资源中心新推出", to: "" },
    ],
  },
];

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el: any, done: () => void) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  gsap.to(FootRef, {
    y: "100%",
    duration: 0.5,
    ease: "power3.in",
    onComplete: () => {
      done();
    },
  });
}

// 当进入过渡完成时调用。
function onAfterEnter(el: any) {}
function onEnterCancelled(el: any) {}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el: any) {}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el: any, done: () => void) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done();
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el: any) {}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el: any) {}
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

.gridbox{
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;

}
.center-box{
  margin-top: 200px;
  display: grid;
  place-content: center;
}
</style>