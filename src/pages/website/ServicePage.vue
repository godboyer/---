<template>
<header>
        <div :class="isStickyTwo ? 'headertwo' : 'headertwo ouback'">
         
        </div>
      </header>
    <div>服务页</div>
</template>

<script setup lang='ts'>
import { Ref, ref } from 'vue';

const isSticky: Ref<boolean> = ref(false);
const isStickyTwo: Ref<boolean> = ref(false);
const ChangeBgColor = () => {
  isStickyTwo.value = false;
};
</script>

<style lang='scss' scoped>

</style>