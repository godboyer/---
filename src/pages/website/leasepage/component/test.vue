<template>
    <div ref="divRef">
        <ul>
            <li v-for="item in items" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {getItems,Item} from './test';
// 使用 ref() 定义一个响应式变量 items，用于保存获取到的数据
const items = ref<Item[]>([]);
// 使用 ref() 定义一个响应式变量 currentPage，用于保存当前页码
const currentPage = ref(1);
const divRef = ref<HTMLElement | null>(null);
// 定义一个方法 loadItems()，用于加载指定页码的数据
async function loadItems(page: number) {
    try {
        // 调用 getItems() 方法获取数据
        const result = await getItems(page, divRef);
        // 更新 items 变量的值
        items.value = result;
        // 更新 currentPage 变量的值
        currentPage.value = page;
    } catch (error) {
        console.error(error);
    }
}

// 在组件创建时加载第一页的数据
loadItems(1);
</script>

<style scoped></style>