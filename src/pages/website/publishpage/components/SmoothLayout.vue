<template>
  <main class="wh-full proximity-scroll-snapping ">
    <template v-for="(comp, key) in slots">
      <section
        class="wh-full overflow-hidden flex  justify-between items-center pl80px pr80px main-section"
      >
        <slot :name="key"> </slot>
      </section>
    </template>
 
  </main>
</template>

<script setup lang="ts">
import { useSlots } from "vue";

defineOptions({
  name: "SmoothLayout",
});
const slots = useSlots();
console.log("slots: ", slots);
const showArrow = ref(true);
function handleScroll() {
  const el = document.querySelector(".proximity-scroll-snapping");
  showArrow.value = false;
  el?.scrollTo({
    top: el.scrollHeight,
    behavior: "smooth",
  });
}
</script>

<style lang="scss" scoped>
.proximity-scroll-snapping {
  overflow: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;

  section {
    scroll-snap-align: center;
  }

  &::-webkit-scrollbar {
    width: none;
    display: none;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* 设置滚动条的颜色 */
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    // border-radius: 10px;
  }
}

.main-section {
  align-items: stretch; //不拉伸
  //不拉伸
  flex-grow: 0;
  flex-wrap: nowrap;
}

$fwidth: 18px;
$fheight: 75px;
$swidth: 50px;
$sheight: 15px;
$bottom: 145px;

$bg-color: #3c8a75f2;

.down-arrow {
  position: fixed;
  display: inline-block;
  width: $fwidth;
  height: $fheight;
  background-color: $bg-color;
  bottom: $bottom;
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 5px);
  animation: moveDown 1.5s infinite;
}

.down-arrow::before,
.down-arrow::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: $swidth;
  height: $sheight;
  background-color: $bg-color;
}

.down-arrow::before {
  left: 50%;
  transform-origin: left bottom;
  transform: translate(calc(-50% + $swidth/2), calc($fwidth/2)) rotate(-45deg);
}

.down-arrow::after {
  right: 50%;
  transform-origin: right bottom;
  transform: translate(calc(50% - $swidth/2), calc($fwidth/2)) rotate(45deg);
}

@keyframes moveDown {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}
</style>
