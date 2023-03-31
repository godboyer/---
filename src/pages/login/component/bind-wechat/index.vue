<template>
  <n-space :vertical="true" align="center" :size="24">
    <n-space align="center">
      <div
        class="w-42px h-42px bg-#02E06E b-rd-15px flex-x-center items-center"
      >
        <icon-uiw:weixin class="text-28px color-#fff" />
      </div>
      <span>使用微信扫一扫登录</span>
    </n-space>
    <h2>[欢迎登录相顾如寓]</h2>
    <div >
      <canvas ref="canvas"  ></canvas>
    </div>
      <div class="flex-y-center justify-between">
        <n-button
          size="large"
          @click="changeModule('code-login')"
          class="w-50px h-50px"
        >
          <icon-charm:chevron-left class="text-24px" />
        </n-button>
      
      </div>
  </n-space>
</template>

<script setup lang="ts">
import QRCode from "qrcode";

import { onMounted, ref } from "vue";
import { Emits } from '../index';
import { useCaptcha, useLoginForm } from '@/hooks';

defineOptions({name: 'BindWechat'})

const emit = defineEmits<Emits>();
const { auth, login, formRef, changeModule } = useLoginForm(emit);
const canvas = ref<HTMLCanvasElement | null>(null);
let opts = {
  errorCorrectionLevel: 'H',
 
 
  color: {
    dark:"#010599FF",
    light:"#FFBF60FF"
  }
}
onMounted(() => {
  
QRCode.toCanvas(canvas.value, "https://jienichao.xyz", function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("QR code generated successfully!");
  }
});
  
})
</script>

<style scoped></style>
