<script setup lang="ts">
import { Login, Register } from "./server/api/index";
import FrontLayout from "./layouts/website/FrontLayout.vue";
</script>

<template>
  <div>
    <n-message-provider>
    <router-view></router-view>
    </n-message-provider>
    <!-- <front-layout/>/ -->
   
  </div>
</template>

<style scoped></style>
