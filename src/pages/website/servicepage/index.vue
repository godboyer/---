<template>
  <header>
    <div :class="isStickyTwo ? 'headertwo' : 'headertwo ouback'"></div>
  </header>
  <div class="w-100 h-23">
    <BetterScroll :options="options">
      <div v-for="v in 20" class="w-10 h-30 inline-block ">
        <span style="background-color: rgb(2, 3, {{v}});"> {{ v }}</span>
      </div>
    </BetterScroll>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import BetterScroll from "@/components/custom/BetterScroll.vue";

const options = {
  scrollX: true,
  click: true,
};
const isSticky: Ref<boolean> = ref(false);
const isStickyTwo: Ref<boolean> = ref(false);
const ChangeBgColor = () => {
  isStickyTwo.value = false;
};
</script>

<style lang="scss" scoped></style>
