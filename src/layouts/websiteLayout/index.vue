<template>
  <n-layout class="wh-full">
    <n-layout-header :bordered="true">
      <system-header >
        <template  #search>
          <search-box />
        </template>
      </system-header>
    </n-layout-header>
    <n-layout-content :content-style="contentStyle">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <KeepAlive>
            <Suspense>
              <component :is="Component"></component>
              <template #fallback>
                加载中。。。
              </template>
            </Suspense>
          </KeepAlive>
        </template>
      </RouterView>
    </n-layout-content>
    <systemFooter />
  </n-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import systemHeader from "@/components/header/index.vue";
import systemNavBar from "@/components/navbar/index.vue";
import systemFooter from "@/components/footer/index.vue";
import searchBox from "@/components/search/index.vue";

defineOptions({ name: "BasicLayout" });
const route = useRoute();

const showNavOrSearch = computed(() => {
  return route.path === "/website/home";
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
  paddingTop: "0px",
  paddingBottom: "80px",
  minHeight: "100%",
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
