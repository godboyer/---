<template>
  <div class="publish-page">
    <header class="flex-1 publish-head">
      <system-logo class="text-46px" />
      <n-button size="medium" text-color="#222" @click="handleSaveAndOut">
        保存并退出</n-button
      >
    </header>

    <div class="flex-1 overflow-hidden">
      <transition mode="out-in" appear>
        <component :is="activeModule.component"></component>
      </transition>
    </div>
    <div class="h-80px flex-1 publish-foot">
      <n-progress
        type="line"
        :show-indicator="false"
        :percentage="activeModule.progress"
        :height="12"
        :border-radius="0"
        :fill-border-radius="0"
      />
      <n-space
        class="w-100% p-l-24px p-r-24px flex-1"
        justify="space-between"
        align="center"
      >
        <n-button size="medium" @click="handleBackClick">
          {{ activeModule.leftBtnText }}
        </n-button>
        <template v-if="!activeModule.isLast">
          <n-button
            :strong="true"
            size="medium"
            :color="rightBtnColor"
            text-color="#fff"
            @click="handleNextClick"
          >
            {{ activeModule.rightBtnText }}
          </n-button>
        </template>
        <template v-else>
          <n-button
            :strong="true"
            size="medium"
            color="#E51D52"
            text-color="#fff"
            @click="handlePublishHouse"
          >
            确认发布
          </n-button>
        </template>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, ref, reactive, markRaw, computed } from "vue";
import { publishOne, publishTwo, publishThr, publishHome } from "./components";
import { useRouterPush } from "@/composables";
import { type PublishModule,usePublishStore } from "@/store/modules/publish";
const props = defineProps<{
  module: string;
}>();

const { routerPush, routerPushKeepRedirect, routerBack, routerPushByParams } =
  useRouterPush();

const {publishHouseHandler}  = usePublishStore()

async function handlePublishHouse() {
  let reslut = await publishHouseHandler()
  if(reslut){
    routerPush('/')
  }
  
}





const modules = markRaw<PublishModule[]>([
  {
    key: "home",
    label: "发布房源",
    component: publishHome,
    progress: 0,
    leftBtnText: "返回",
    rightBtnText: "下一步",
  },
  {
    key: "nextone",
    label: "发布房源第一步",
    component: publishOne,
    progress: 30,
    leftBtnText: "上一步",
    rightBtnText: "下一步",
  },
  {
    key: "nexttwo",
    label: "发布房源第二步",
    component: publishTwo,
    progress: 60,
    leftBtnText: "上一步",
    rightBtnText: "下一步",
  },
  {
    key: "nextthr",
    label: "发布房源第三步",
    component: publishThr,
    progress: 100,
    isLast: true,
    leftBtnText: "上一步",
    rightBtnText: "确认发布",
  },
]);

const activeModule = computed(() => {
  const active: PublishModule = { ...modules[0] };
  const findItem = modules.find((item) => item.key === props.module);
  console.log("findItem: ", findItem);
  if (findItem) {
    Object.assign(active, findItem);
  }
  return active;
});

const rightBtnColor = computed(() => {
  return activeModule.value.isLast ? "#E51D52" : "#222";
});

function handleSaveAndOut() {
  console.log("保存并退出");

  /**1保存数据 */

  /**2重定向到之前的页面 */
  routerPushByParams();
}
function handleBackClick() {
  console.log("返回");
  routerBack();
}
function handleNextClick() {
  if (activeModule.value.isLast) {
    console.log("确认发布");
    return;
  }

  console.log("下一步");
  //找到当前模块的下一个模块
  const index =
    modules.findIndex((item) => item.key === activeModule.value.key) + 1;
  let path =
    index >= modules.length - 1
      ? `/publish/${modules[modules.length - 1].key}`
      : `/publish/${modules[index].key}`;

  routerPushKeepRedirect(path);
}
</script>

<style lang="scss" scoped>
.publish-foot {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
.publish-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  height: 100vh;
  width: 100vw;
  padding: 80px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .publish-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 80px;
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 12px 25px;
  }
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.publish-form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

input,
textarea {
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
