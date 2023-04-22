<template>
  <n-space :vertical="true">
  
    <DashboardAnalysisDataCard />
    <DashboardAnalysisTopCard />
  </n-space>
</template>

<script setup lang="ts" >
import DashboardAnalysisDataCard from '@/pages/admin/dashboard/analysis/components/data-card/index.vue';
import DashboardAnalysisTopCard from '@/pages/admin/dashboard/analysis/components/top-chart/index.vue';
import searchBaiduMap from '@/components/common/searchMap.vue';
</script>

<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.login-form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #3f51b5;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #1a237e;
}

.info {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>