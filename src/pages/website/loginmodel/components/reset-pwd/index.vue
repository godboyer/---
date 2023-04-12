<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    size="large"
    :show-label="false"
  >
    <n-form-item path="phone">
      <n-input v-model:value="model.phone" placeholder="手机号码" />
    </n-form-item>
    <n-form-item path="code">
      <div class="flex-y-center w-full">
        <n-input v-model:value="model.code" placeholder="验证码" />
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
    <n-form-item path="pwd">
      <n-input
        v-model:value="model.pwd"
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
    <n-space :vertical="true" size="large">
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
          重置密码
        </n-button>
      </div>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import type { FormRules } from "naive-ui";
import { formRules, getConfirmPwdRule } from "@/utils";
import { Emits } from "../index";
import { useCaptcha, useLoginForm } from "@/hooks";
const emit = defineEmits<Emits>();
const { auth, login, formRef, changeModule,resetPassword } = useLoginForm(emit);

const { label, isCounting, loading: smsLoading, getCaptcha } = useCaptcha();

const model = reactive({
  phone: "",
  code: "",
  pwd: "",
  confirmPwd: "",
});

const rules: FormRules = {
  phone: formRules.phone,
  code: formRules.code,
  pwd: formRules.pwd,
  confirmPwd: getConfirmPwdRule(toRefs(model).pwd),
};

/**获取验证码 */
function handleCaptcha() {
  getCaptcha(model.phone, '');
}

async function handleSubmit() {
  await formRef.value?.validate();
  await resetPassword(model.phone,model.code,model.confirmPwd)
  
}
</script>

<style scoped></style>
