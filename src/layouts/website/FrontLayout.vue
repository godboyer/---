<template>
  <n-layout>
    <n-layout-header :bordered="true">
      <headerComp>
        <template v-if="$route.path === '/website/home'" #nav>
          <Nav></Nav>
        </template>
        <template v-if="$route.path !== '/website/home'" #search="{ changeBgAfter }">
          <Search @changeBgAfter="changeBgAfter">
            <template #city>wqewqe</template>
          </Search>
        </template>
      </headerComp></n-layout-header
    >
    <n-layout-content
   
      :content-style="$route.path !== '/home' ? contentStyle : ''"
    >
      <n-config-provider :breakpoints="breakpoints">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <KeepAlive>
              <Suspense>
                <component :is="Component"></component>

                <template #fallback> <LoadingCardCom /> </template>
              </Suspense>
            </KeepAlive>
          </template>
        </RouterView>
      </n-config-provider>
    </n-layout-content>
    <n-layout-footer  v-popup > <footer-comp />  </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { RouterView } from "vue-router";
import headerComp from "@/components/headerComp.vue";
import Search from "@/components/search.vue";
import Nav from "@/components/nav.vue";
import LoadingCardCom from "@/pages/website/component/LoadingCardCom.vue";
import anime from "animejs/lib/anime.es.js";
import footerComp from "@/components/footer/index.vue";
defineOptions({ name: 'WebsiteLayout' });

const breakpoints = { xs: 515, s: 744, m: 1128, l: 1440, xl: 1536, xxl: 1920 };
anime({
  targets: "common-layout",
  translateX: 250,
  rotate: "1turn",
  backgroundColor: "#FFF",
  duration: 800,
});
const isSticky: Ref<boolean> = ref(false);
const isStickyTwo: Ref<boolean> = ref(false);

const handleScroll = function (event: any) {
  if (window.scrollY > 80) {
    isSticky.value = true;
    isStickyTwo.value = true;
  } else if (window.scrollY >= 40) {
    isStickyTwo.value = true;
  } else {
    isSticky.value = false;
  }
};

const contentStyle = {
  padding: "24px",
  paddingTop:"0px"
};

const handClickSearch = () => {
  console.log("object");
  // isSticky.value = false;
};

const ChangeBgColor = () => {
  isSticky.value = false;
};

onMounted(() => {
  isStickyTwo.value = true;
  window.addEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.n-layout-header {
  height: 80px !important;
}
:deep(.el-row) {
  z-index: 1 !important;
}
.headertwo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  height: 80px;
}
.ouback {
  height: 170px !important;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
}

.common-layout {
  .el-header {
    // background: #333;
    background: url("../../assets/bg_header@1x.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    // background-position-y:-100px ;
    height: 552px;
    position: relative;
    z-index: 9;
  }
  .el-main {
    padding: 0;
    padding: none;
  }
  .container {
    padding-top: 0;
    // background: #72d29d99;
    padding: 32px !important;
  }
}

footer {
  padding: 0;
}
.foot-img {
  width: 100%;
  height: 148px;
  display: block;
}
</style>
