<template>
  <div :class="{ headerAfter: showSearch }" class="header-box flex  items-center justify-between pl-6 pr-6">
    <div class="w-146px">
      <router-link to="/home">

        <system-logo class="cursor-pointer text-64px" />

      </router-link>
    </div>


    <nav :class="!isSticky ? 'nav-box' : 'nav-box shot'">
      <slot v-if="showNav" name="nav"></slot>
      <slot name="search" :changeState="changeState"></slot>

    </nav>

    <div class="w-146px h-10.5 flex-y-center justify-end  ">
     <userMenu/>
    </div>



  </div>
</template>

<script setup lang='ts'>
import { type Ref, ref } from "vue";

import userMenu from "./user-menu.vue";


defineOptions({ name: "systemHeader" });




const isSticky: Ref<boolean> = ref(false);
const showNav = ref(true);
const showSearch = ref(false);


function changeState(show: boolean) {
  console.log("show", show)
  //触发后header的after,向下延申
  showSearch.value = show;
}
</script>

<style lang='scss' scoped>
.header-box {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9;
  width: 100%;
  height: 80px;
  background-color: #fff;
  box-shadow:   0 1px 1px rgba(0, 0, 0, 0.08);
  //   border-bottom: 1px solid #e5e5e5;
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

.login-button {
  width: 120px;
  height: 50px;
  border-radius: 25px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  padding: 6px 2px;
  box-sizing: border-box;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>