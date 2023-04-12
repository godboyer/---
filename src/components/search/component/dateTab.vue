<template>
  <div class="grid gap-24px">
    <n-space :wrap="false" justify="space-evenly">
      <n-date-picker panel v-model:value="start" type="date" size="medium" />

      <n-date-picker panel v-model:value="end" type="date" size="medium" />
    </n-space>
    <n-space justify="end">
      <button class="push-button btn-active" @click="handleSearch">确定</button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useSearchStore } from '@/store';
const { closeSearchPanel, setleaseLong } = useSearchStore();
defineOptions({ name: "dateTab" })

const start = ref<number>(Date.now());
const end = ref<number>(Date.now());

watch([start, end], ([newStart, newEnd]) => {
  setleaseLong(newStart, newEnd)
})



function handleSearch() {
  setleaseLong(start.value, end.value)

  closeSearchPanel()
}


</script>

<style lang="scss" scoped></style>
