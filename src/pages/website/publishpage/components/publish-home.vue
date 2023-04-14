<template>
  <div class="wh-full flex">
    <div class="flex-x-center items-center w-50% h-100%">
      <p class="text-40px lh-45px font-700 text-left">
          <span >在相顾如寓, </span>
          <br />
          <span class="text-left">成为房东很简单.</span> 
      </p>
    </div>
    <ul class="w-50% flex-col justify-center !p-r-145px">
      <li class="h-33% flex-col justify-center">
        <n-thing>
          <template #header>
            <n-h2 class="text-left">1.说明房源详细信息</n-h2>
            <p class="indent-2em text-14px">
              提供一些基本信息，例如房源所在位置以及可入住的房客人数。
            </p>
          </template>
          <template #header-extra>
            <img :src="publishOne" alt="" />
          </template>
        </n-thing>
      </li>
      <li class="h-33% flex-col justify-center">
        <n-thing>
          <template #header>
            <n-h2 class="text-left">2.让你的房源脱颖而出</n-h2>
            <p class="indent-2em text-14px">
              添加房源名称和描述，以及至少5张照片。我们会帮你完成这些操作。
            </p>
          </template>
          <template #header-extra>
            <img :src="publishTwo" alt="" />
          </template>
        </n-thing>
      </li>
      <li class="h-33% flex-col justify-center">
        <n-thing>
          <template #header>
            <n-h2 class="text-left"> 3.完成并发布</n-h2>
            <p class="indent-2em text-14px">
              选择首笔订单是否仅接待有经验的房客，设定初始价格，然后发布房源。
            </p>
          </template>
          <template #header-extra>
            <img :src="publishThr" alt="" />
          </template>
        </n-thing>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import publishOne from "@/assets/images/publish-one.png";
import publishTwo from "@/assets/images/publish-two.png";
import publishThr from "@/assets/images/publish-thr.gif";

defineOptions({
  name: "PublishHome",
});
</script>

<style lang="scss" scoped></style>
