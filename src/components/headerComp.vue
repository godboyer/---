<template>
  <header
    :class="{ headerAfter: showSearch }"
    class="header-box flex items-center justify-between b-b-0.5 pl-6 pr-6 fixed w-100% z-100 h-20 bg-#fff"
  >
    <router-link :to="'/home'">
      <system-logo class="text-64px text-one" />
    </router-link>

    <nav :class="!isSticky ? 'nav-box' : 'nav-box shot'">
      <slot name="nav"></slot>
      <slot name="search" :changeBgAfter="changeBgAfter"></slot>
     
    </nav>

    <div class="h-10.5 flex-y-center justify-between">
      <n-dropdown size="large" :options="options" @select="handleSelect">
        <div class="login-button hover-bg b-2">
          <img src="../assets/mune.png" alt="mune" />
          <img src="../assets/user.png" alt="user" />
        </div>
      </n-dropdown>
    </div>

    <div
      v-show="showSearch"
      :class="{ backdrop: showSearch }"
      class="hidden"
    ></div>
    <login-action-modal
      v-model:visible="visible"
      :module="loginModule"
    ></login-action-modal>
  </header>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeUnmount, onMounted, reactive, Ref, ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { navItem, loginItem } from "./data/index";
import { useBoolean, useLoading } from "@/hooks";
import anime from "animejs/lib/anime.es.js";
import { useRouterPush } from "@/composables";
import LoginActionModal from "@/pages/website/loginmodel/index.vue";

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const { routerPush, toWebsiteHome } = useRouterPush();
const isSticky: Ref<boolean> = ref(false);
const showSearch: Ref<boolean> = ref(false);
const loginModule = ref<UnionKey.LoginModule>("code-login");
const showNav = ref(true);
const message = useMessage();
const router = useRouter();
let timerId: number | null = null;
let options: any = ref(loginItem);

const handleSelect = function (key: string | number) {
  switch (key) {
    case "admin":
      routerPush(
        {
          path: "/login",
          query: {
            redirect: "/admin",
          },
        },
        true
      );
      break;
    case "login":
      loginModule.value = "code-login";
      openModal();
      break;

    case "publish":
      routerPush("/publish");
      break;
    default:
      break;
  }

  message.info(String(key));
};

function changeBgAfter(flag:boolean) {
  console.log('flag: ', flag);
  //触发后header的after,向下延申
  showSearch.value = flag;

}

watch(
  changeBgAfter,
   (newvalue) => {
    console.log('newvalue: ', newvalue);
      debugger
    }
)

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
  // console.log(el);
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
header {
  position: fixed;
}

.header-box::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 80px;
  width: 100%;
  height: 0px;
  opacity: 0;
  background-color: #fff;
  transform-origin: 50% 0%;
  transition: transform 250ms ease;
  transform: scaleY(1);
  box-shadow: rgb(0 0 0 / 8%) 0 1px 1px;
}

.headerAfter::before {
  height: 40px;
  background-color: #fff;
  transform: scaleY(2);
  opacity: 1;
}

.headerAfter {
  border: none;
  border: 0;
}

.backdrop {
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
  z-index: 9;
}

.search-box {
  position: absolute;
}


.ft-18 {
  font-size: 18px;
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

.hover-bg {
  transition: 0.3s;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
}
</style>
