<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <p class="m-t-15px text-14px color-#333">
      未注册的手机号或微信号验证后将自动创建新账号
    </p>
    <n-form-item path="phone">
      <n-input-group>
        <n-select
          size="large"
          label-field="label"
          :consistent-menu-width="false"
          :style="{ width: '35%' }"
          v-model:value="model.ctcode"
          :options="phonePrefixs"
          :fallback-option="(value: string | number) => ({ label: '中国(+86)' })"
        />
        <n-input
          class="h-46px flex-y-center"
          size="large"
          placeholder="请输入手机号"
          v-model:value="model.phone"
          @keydown.enter.prevent
        />
      </n-input-group>
    </n-form-item>
    <n-form-item path="captcha">
      <n-input-group>
        <n-input
          class="h-46px flex-y-center"
          size="large"
          v-model:value="model.captcha"
          placeholder="验证码"
        />
        <n-button
          class="h-46px flex-y-center"
          size="large"
          :disabled="isCounting"
          :loading="smsLoading"
          @click="handleCaptcha"
        >
          {{ label }}
        </n-button>
      </n-input-group>
    </n-form-item>
    <!-- <n-space :vertical="true" :size="10"> -->
    <n-button
      type="primary"
      color="#008489"
      size="large"
      :block="true"
      class="h-48px"
      :loading="auth.loginLoading"
      @click="handleSubmit"
    >
      立即登录
    </n-button>
    <n-divider title-placement="center"> 或 </n-divider>
    <n-button
      size="large"
      :block="true"
      class="h-48px"
      @click="changeModule('bind-wechat')"
    >
      <span class="p-6px"
        ><icon-uiw:weixin
          class="text-20px cursor color-black inline-block"
        ></icon-uiw:weixin
      ></span>
      <span>微信账号扫码灯登录</span>
    </n-button>
    <n-divider title-placement="center"> 其它 </n-divider>
    <n-space justify="space-between" :wrap="false" :size="10">
      <n-button
        size="large"
        class="!w-250px b-1"
        @click="changeModule('pwd-login')"
      >
        <span>账号密码登录</span>
      </n-button>
      <n-button size="large" class="!w-250px" @click="changeModule('register')">
        <span>注册</span>
      </n-button>
    </n-space>

    <!-- </n-space> -->
  </n-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, unref } from "vue";
import { FormInst } from "naive-ui";
import { useAuthStore } from "@/store";
import { useCaptcha } from "@/hooks";
import { createRequiredFormRule, formRules, getImgCodeRule } from "@/utils";
const {
  label,
  isCounting,
  phonePrefixs,
  loading: smsLoading,
  getCaptcha,
  getPhonePrefix,
} = useCaptcha();
const auth = useAuthStore();
const { captchaLogin } = useAuthStore();

interface ModelType {
  phone: string;
  captcha: string;
  ctcode: string | number; //区号
}
interface Emits {
  (e: "update-action", key: string): void;
  (e: "close-modal"): void;
}
const emit = defineEmits<Emits>();
const formRef = ref<HTMLElement & FormInst>();

const model = reactive<ModelType>({
  phone: "",
  captcha: "",
  ctcode: 86,
});

const rules = {
  phone: formRules.phone,
  captcha: formRules.code,
  ctcode: createRequiredFormRule("请选择区号"),
};

/**获取验证码 */
function handleCaptcha() {
  getCaptcha(model.phone, model.ctcode);
}
/**deng'l'b */
async function handleSubmit() {
  await formRef.value?.validate();
  await captchaLogin(model.phone, model.captcha);
  auth.isLogin && emit("close-modal");

  // window.$message?.success("验证成功!");
}

function changeModule(key: string) {
  emit("update-action", key);
}

async function init() {
  await getPhonePrefix();
}

onMounted(() => {
  if (unref(phonePrefixs).length === 0) init();
});
</script>

<style lang="scss" scoped>
:deep(.n-base-selection) {
  height: 46px;
}
</style>
