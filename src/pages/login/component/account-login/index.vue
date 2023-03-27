<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    size="large"
    :show-label="false"
    class="gap-23px"
  >
    <p class="mb-24px">
      没有账号？
      <span
        @click="changeModule('register')"
        class="color-#008489 cursor-pointer"
        >立即注册</span
      >
    </p>
    <n-form-item class="h-46px" path="account">
      <n-input
        v-model:value="model.account"
        class="h-46px flex-y-center"
        placeholder="邮箱/账号/手机号"
      />
    </n-form-item>
    <div class="h-20px"></div>
    <n-form-item class="h-46px" path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        class="h-46px flex-y-center"
        show-password-on="click"
        placeholder="请输入密码"
      />
    </n-form-item>
    <div class="h-20px"></div>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button :text="true" @click="changeModule('reset-pwd')"
          >忘记密码？</n-button
        >
      </div>
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
          @click="handleLoginOtherAccount"
        >
          立即登录
        </n-button>
      </div>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInst, FormRules } from "naive-ui";
import { loginModuleLabels } from "@/constants";
import { useRouterPush } from "@/composables";
import { createRequiredFormRule, formRules } from "@/utils";
import { OtherAccount } from "./components";
import { useAuthStore } from "@/store";
import { Emits } from "../index";
import { useCaptcha, useLoginForm } from "@/hooks";
const emit = defineEmits<Emits>();
const { auth, login, accountLogin, formRef, changeModule } = useLoginForm(emit);
const { toLoginModule } = useRouterPush();

const model = reactive({
  account: "Soybean",
  password: "soybean123",
});

const rules: FormRules = {
  account: createRequiredFormRule("请输入账户"),
  password: formRules.pwd,
};

const rememberMe = ref(false);

async function handleLoginOtherAccount() {
  const { account, password } = model;
  await accountLogin(account, password);
  auth.isLogin && emit("close-modal");
}
</script>

<style scoped></style>
