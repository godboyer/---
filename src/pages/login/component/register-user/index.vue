<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    size="large"
    :show-label="false"
  >
    <n-form-item path="username">
      <n-input v-model:value="model.username" placeholder="用户名" />
    </n-form-item>
    <n-form-item path="phone">
      <n-input v-model:value="model.phone" placeholder="手机号码" />
    </n-form-item>
    <n-form-item path="captcha">
      <div class="flex-y-center w-full">
        <n-input v-model:value="model.captcha" placeholder="验证码" />
        <div class="w-18px"></div>
        <n-button
          size="large"
          :disabled="isCounting"
          :loading="smsLoading"
          @click="handleCaptcha"
        >
          {{ label }}
        </n-button>
      </div>
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        placeholder="密码"
      />
    </n-form-item>
    <n-form-item path="confirmPwd">
      <n-input
        v-model:value="model.confirmPwd"
        type="password"
        show-password-on="click"
        placeholder="确认密码"
      />
    </n-form-item>
    <n-space :vertical="true" :size="46">
      <div class="flex-y-center justify-between">
        <n-button
          size="large"
          @click="changeModule('code-login')"
          class="w-50px h-50px"
        >
          <icon-charm:chevron-left class="text-24px" />
        </n-button>
        <n-button
          class="w-105px h-50px"
          color="#008489"
          :loading="auth.loginLoading"
          @click="handleSubmit"
        >
          立即注册
        </n-button>
      </div>
      <div class="flex items-center">
        <n-popover placement="top-start" trigger="focus">
          <template #trigger>
            <n-checkbox ref="checkRef" v-model:checked="checked"
              >我已经仔细阅读并接受</n-checkbox
            >
          </template>
          请先阅读隐私政策!
        </n-popover>
        <Login-agreement v-model:value="agreement" />
      </div>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, unref } from "vue";
import type { FormInst, FormRules } from "naive-ui";
import { useRouterPush } from "@/composables";
import { useCaptcha, useLoginForm } from "@/hooks";
import { createRequiredFormRule, formRules, getConfirmPwdRule } from "@/utils";
import { useAuthStore } from "@/store";
import { Emits } from "../index";
const emit = defineEmits<Emits>();
const { auth, login, formRef, changeModule,registerUser } = useLoginForm(emit);

const { label, isCounting, loading: smsLoading, getCaptcha } = useCaptcha();

const model = reactive({
  phone: "",
  username: "",
  captcha: "",
  password: "",
  confirmPwd: "",
});

const rules: FormRules = {
  username:createRequiredFormRule("请输入用户名"),
  phone: formRules.phone,
  captcha: formRules.code,
  password: formRules.pwd,
  confirmPwd: getConfirmPwdRule(toRefs(model).password),
};
const agreement = ref(false);
const checked = ref(false);
const checkRef = ref<HTMLElement | null>(null);
/**获取验证码 */
function handleCaptcha() {
  getCaptcha(model.phone,'');
}

async function handleSubmit() {

  await formRef.value?.validate()
  if (unref(checked)) {
       await registerUser(model.username, model.phone,model.password)
    
  } else {
    checkRef.value?.focus();
  }
}
</script>

<style scoped></style>
