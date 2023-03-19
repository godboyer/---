<template>
  <n-divider>Self 响应式</n-divider>

  <n-divider>Screen 响应式</n-divider>
  <n-grid cols="4" item-responsive responsive="screen" layout-shift-disabled>
    <n-grid-item v-for="v in 9" :key="v" span="0 m:1 l:2">
      <div class="light-green">
        m 以下：不显示<br />
        m 到 l：占据空间 1<br />
        l 以上：占据空间 2
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style scoped>
.light-green {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: rgba(0, 128, 0, 0.24);
}

@supports (-webkit-scroll-behavior: smooth) or (-moz-scroll-behavior: smooth) or
  (-ms-scroll-behavior: smooth) or (scroll-behavior: smooth)
  .c14whb16[class][class] {
  -moz-scroll-snap-type: var(
    --contentscroller_scrollsnaptype,
    inline mandatory
  );
  scroll-snap-type: var(--contentscroller_scrollsnaptype, inline mandatory);
}
</style>
