<template>
  <div class="flex-y-center">
    <span class="mr-1">显示地图</span>
    <n-switch
      class=""
      size="large"
      :value="app.showMapFlag"
      :loading="loading"
      @update:value="handleUpdateValue"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useAppStore } from "@/store";
import { useRoute, useRouter } from "vue-router";

defineOptions({name:"mapSwitch"})

const app = useAppStore();
const router = useRouter();

const loading: Ref<boolean> = ref(false);

const handleUpdateValue = function (value: boolean) {
  if (value) {
    loading.value = true;

    setTimeout(() => {
      router.push("/lease/map");
      app.$patch({
        showMapFlag: value,
      });
      loading.value = false;
    }, 1000);
  } else {
    app.$patch({
      showMapFlag: value,
    });
    router.push("/lease/home");
  }
};
</script>

<style lang="scss" scoped></style>
