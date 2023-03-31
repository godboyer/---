<template>
	<el-icon :size="20">
		<component :is="icon" />
	</el-icon>
</template>

<script setup lang="ts">
import { ElIcon } from "element-plus";

defineOptions({ name: 'myIcon' });
interface MyIconProps {
	/** 图标名称 */
	icon?: string;
}

defineProps<MyIconProps>();
</script>

<style scoped></style>
