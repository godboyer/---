<template>
  <n-space justify="center">
    <n-button size="small" @click="handleEditTable">编辑</n-button>
    <n-button size="small" @click="handleShowTable">查看</n-button>
    <n-popconfirm @positiveClick="handleDeleteTable">
      <template #default>确认删除</template>
      <template #trigger><n-button size="small">删除</n-button></template>
    </n-popconfirm>
  </n-space>
</template>

<script setup lang="ts">
import { NSpace, NButton, NPopconfirm } from "naive-ui";
defineOptions({ name: "TableAction" });
const props =  defineProps<{
    key: number | string | null | undefined;
    
}>();
const emit=  defineEmits(["edit", "show", "delete"]);


function handleEditTable() {
  emit("edit", props.key);
}
function handleShowTable() {
  emit("show", props.key);
}
function handleDeleteTable() {
  emit("delete", props.key);
}
</script>

<style lang="scss" scoped></style>
