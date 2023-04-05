<template>
   <header class="flex items-center justify-between pl-6 pr-6" >
      <div class="w-20">
         <Logo :src="isSticky ? logoSrcIn : logoSrc" :to="'/home'" />
      </div>
     

          <nav :class="!isSticky ? 'nav-box' : 'nav-box shot'">
          <slot v-if="showNav" name="nav"></slot>
          <div class="search-box">
            <slot  name="search" :changeState="isSticky"></slot>

          </div>
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
   </header>

</template>

<script setup lang='ts'>
import { useMessage } from "naive-ui";
import { onBeforeUnmount, onMounted, reactive, Ref, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { navItem,loginItem } from "../data/index";
import { useRouterPush } from "@/composables";
import logoSrc from "../assets/logo_7.svg";
import logoSrcIn from "../assets/logo_8.svg";

import anime from "animejs/lib/anime.es.js";
const { routerPush, toWebsiteHome } = useRouterPush();


const handleSelect = function (key: string | number) {
  if (key === "publish") {
    router.push("/publish");
  }

  switch (key) {
    case "admin":

      routerPush({
        path: "/login",
        query: {
          redirect: "/admin"
        }
      }, true)
      break;

    default:
      break;
  }



  message.info(String(key));
};
const isSticky: Ref<boolean> = ref(false);
const visible = ref(false);
const showNav = ref(true);
const message = useMessage();
const router = useRouter();
let timerId: number | null = null;
let options:any = ref(loginItem);
</script>

<style lang='scss' scoped>

</style>