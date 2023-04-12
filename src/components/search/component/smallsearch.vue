<template>
    <div @click="handleShowTrueSearch"
        class="top-search-box flex justify-between p-3 items-center w-81 h-12 b-rd-8 bg-#fff">
        <div class="lh-5" style="font-size: 14px; color: #333">搜索房源</div>
        <button class="flex-col-center w-8 h-8 b-rd-50% bg-#ff385c">
            <icon-local-search-logo class="text-20px" />
        </button>
    </div>
</template>

<script setup lang='ts'>
import { useSearchStore } from "@/store";

const search= useSearchStore()
/**
 * 点击搜索框
 */
function handleShowTrueSearch() {
    search.openSearchTab()
    search.topModule = 'smallSearchBack'
}


</script>

<style lang='scss' scoped>
.top-search-box {
    border: 1px solid #333;

    cursor: pointer;
}


</style>