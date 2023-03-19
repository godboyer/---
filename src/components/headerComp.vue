<template>
  <header :class="{headerAfter:showSearch}" class="header-box flex items-center justify-between b-b-0.5 pl-6 pr-6 fixed w-100% z-100 h-20 bg-#fff">
      <div class="w-20">
         <Logo :src="isSticky ? logoSrcIn : logoSrc" :to="'/website'" />
      </div>
     

          <nav :class="!isSticky ? 'nav-box' : 'nav-box shot'">
          <slot  name="nav"></slot>
           <slot  name="search" :changeBgAfter="changeBgAfter" ></slot>
         <!-- <Transition
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @enter-cancelled="onEnterCancelled"
          @before-leave="onBeforeLeave"
          @leave="onLeave"
          @after-leave="onAfterLeave"
          @leave-cancelled="onLeaveCancelled"
        >
   
        </Transition> -->
      </nav>
   
      <div class="h-10.5 flex-y-center justify-between  ">
      <!-- <RouterLink class="ft-18 font-700" to="/login">登录</RouterLink> -->
        <n-dropdown size="large" :options="options" @select="handleSelect">
          <div @click="visible = !visible" class="login-button hover-bg b-2 ">
            <img src="../assets/mune.png" alt="mune" />
            <img src="../assets/user.png" alt="user" />
          </div>
        </n-dropdown>
      </div>

    <div v-show="showSearch" :class="{backdrop:showSearch}" class="hidden" ></div>
  </header>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeUnmount, onMounted, reactive, Ref, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { navItem,loginItem } from "./data/index";
import logoSrc from "../assets/logo_7.svg";
import logoSrcIn from "../assets/logo_8.svg";

import anime from "animejs/lib/anime.es.js";

const isSticky: Ref<boolean> = ref(false);
const showSearch: Ref<boolean> = ref(false)
const visible = ref(false);
const showNav = ref(true);
const message = useMessage();
const router = useRouter();
let timerId: number | null = null;
let options:any = ref(loginItem);
function handleResize(e: Event) {
  if (timerId) return; // 如果上一个定时器还没执行完，则直接返回，不创建新的定时器
  (timerId as any) = setTimeout(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 375) {
      options.value = [...navItem,...loginItem]
      showNav.value = false
    } else {
      showNav.value = true
      options.value = [...loginItem]
    }
    timerId = null; // 执行完之后，清除定时器id
  }, 100); // 300ms内只执行一次handleResize
}
const handleSelect = function (key: string | number) {
  if (key === "publish") {
    router.push("/publish");
  }

  message.info(String(key));
};
const handleScroll = function (event: any) {
  console.log(window.scrollY);
  console.log(event);
  if (window.scrollY > 80) {
    isSticky.value = true;
  } else {
    isSticky.value = false;
  }
};
function changeBgAfter() {
    //触发后header的after,向下延申
  showSearch.value  = !showSearch.value;


  console.log("object");
}

onMounted(() => {
  window.scrollTo(0, 0);
    // options.value = [...loginItem]
  window.addEventListener('resize', handleResize)
  // window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el: any) {
  anime({
    targets: el,
    translateX: 250,
    rotate: "1turn",
    backgroundColor: "#FFF",
    duration: 800,
  });
}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el: any, done: () => void) {
  anime({
    targets: el,
    translateX: 250,
    rotate: "1turn",
    backgroundColor: "#FFF",
    duration: 800,
  });
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done();
}

// 当进入过渡完成时调用。
function onAfterEnter(el: any) {
  anime({
    targets: el,
    translateX: 250,
    rotate: "1turn",
    backgroundColor: "#FFF",
    duration: 800,
  });
}
function onEnterCancelled(el: any) {
  anime({
    targets: el,
    translateX: 250,
    rotate: "1turn",
    backgroundColor: "#FFF",
    duration: 800,
  });
}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el: any) {
  anime({
    targets: el,
    translateX: 250,
    rotate: "1turn",
    backgroundColor: "#FFF",
    duration: 800,
  });
}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el: any, done: () => void) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  console.log(el);
  anime({
    targets: el,
    translateX: 250,
    rotate: "1turn",
    backgroundColor: "#FFF",
    duration: 800,
  });
  done();
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el: any) {
  anime({
    targets: el,
    translateX: 250,
    rotate: "1turn",
    backgroundColor: "#FFF",
    duration: 800,
  });
}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el: any) {
  anime({
    targets: el,
    translateX: 250,
    rotate: "1turn",
    backgroundColor: "#FFF",
    duration: 800,
  });
}
</script>

<style lang="scss" scoped>
header{
  position: fixed;
}
.header-box::before{
   content:'';
    position: absolute;
    left: 0px;
    top: 80px;
    width:100%;
    height: 0px;
    opacity: 0;
    background-color:#fff;
    transform-origin: 50% 0%;
    transition: transform 250ms ease;
    transform: scaleY(1);
    box-shadow: rgb(0 0 0 / 8%) 0 1px 1px;


}
.headerAfter::before{ 
    height: 40px;
    background-color:#fff;
    transform: scaleY(2);
    opacity: 1;
}
.headerAfter{
  border: none;
  border: 0;
}
.backdrop{
  display: block;
}
.backdrop::after {
  content: "";
  position: absolute;
  top: 160px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.308);
  filter: blur(1px);
  // z-index: 9;
}


.search-box{
  position: absolute;
}
// header {
//   position: fixed;
//   top: 0px;
//   left: 0px;
//   height: 80px;
//   width: 100%;
//   z-index: 99;
// }
.ft-18{
  font-size: 18px
}
.nav-box {
  flex: 1;
  // align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // height: 170px;
  position: relative;
}


.hover-bg{
  transition: 0.3s;
   &:hover {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
}

</style>
