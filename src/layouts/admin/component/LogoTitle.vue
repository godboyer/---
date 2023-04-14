<template>
  <div class="admin-title">
    <Logo :src="logoSrcIn" :to="'/admin'">
      <template #title> <n-h2>后台管理系统</n-h2></template>
    </Logo>
  </div>
</template>

<script setup lang="ts">
import logoSrcIn from "@/assets/svg-icon/logo_8.svg";
</script>

<style lang="scss" scoped>
.admin-title {
  display: flex;
  justify-content: center;
  user-select: none;
  cursor: pointer;
}
</style>
