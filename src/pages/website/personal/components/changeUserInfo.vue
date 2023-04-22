<template>
  <n-form>
    <n-h2>完善个人信息</n-h2>
    <n-form-item path="realName" label="真实姓名">
      <n-input v-model:value="userInfo.realName" placeholder="请输入真实姓名" />
    </n-form-item>
    <n-form-item path="idCard" label="身份证号">
      <n-input v-model:value="userInfo.idCard" placeholder="请输入身份证号" />
    </n-form-item>
    <n-form-item path="email" label="邮箱">
      <n-input v-model:value="userInfo.email" placeholder="请输入邮箱" />
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
const auth = useAuthStore()
const {userInfo} = storeToRefs(auth)




</script>

<style lang="scss" scoped></style>
