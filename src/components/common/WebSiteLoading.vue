<!-- src/components/LoadingScreen.vue -->
<template>
	<div class="loading-screen">
		<system-logo class="text-120px text-primary " />

		<div class="loader"></div>
		<transition name="slide-fade">
			<p v-if="showSlogan" class="slogan">寻找您的理想家园，从这里开始！</p>
		</transition>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'WebSiteLoading',
});

const showSlogan = ref(false);
setTimeout(() => {
	showSlogan.value = true;
}, 200);
</script>

<style scoped>
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.logo {
  opacity: 0;
  width: 100px;
  height: auto;
  margin-bottom: 20px;
  animation: fadeIn 1s ease-in forwards;
}

.loader {
  background-color: #3498db;
  width: 100%;
  height: 4px;
  animation: loading 2s linear infinite;
}

.slogan {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  position: absolute;
  bottom: 30%;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes loading {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
