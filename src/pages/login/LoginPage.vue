<template>
  <div class="login-page">
    <n-card>
      <template #header>
        <logo :src="adminLogoSrc" to="/admin"></logo>
        <h2>租房网站后台登录</h2>
      </template>
      <loginform class="page-form"></loginform>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import loginform from "./component/loginByPhone.vue";
import logo from "../../components/logo.vue";
import adminLogoSrc from "@/assets/logo_7.svg";
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.n-card {
  width: 500px;
  height: 500px;
  padding: 40px;
}

:deep(.n-card-header__main) {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
