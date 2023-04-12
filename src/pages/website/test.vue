<template>
  <section class="wh-full flex-y-center justify-center relative">
    <div class="box">
      <code> &lt;RouterView/&gt; </code>
    </div>
    <div class="box !flex">
      <div class="h-full w-30% bg-#333 flex-y-center justify-center">aside</div>
      <div class="w-70% h-full right-box">
        <div class="w-full h-20px bg-#fff flex-y-center justify-center">header</div>
        <div class="w-full flex-1 bg-#e5e5e5 flex-y-center justify-center">
          <code> &lt;RouterView/&gt; </code>
        </div>
      </div>
      
    </div>


    <div class="box">
        公告列表
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
section {
  //3d
  transform-style: preserve-3d;
  //视距
  perspective: 3000px;
  transition: all 1s;
}
.box {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  text-align: center;
  display: grid;
  place-items: center;
  border: 2px solid #000;
//   border-radius: 12px;
//   box-sizing: ;
  &:hover {
    transform: routerZ(20deg);
  }
  position: absolute;
  // top:0;
  // left:0;
  // transform: rotateY(30deg);
  transform-origin: bottom center;
}
section > div:nth-of-type(1) {
     &::before{
    content: "path:'/'";
    position: absolute;
    top: -30px;
    transform: none;
  }
  transform: translateX(-220px) rotateY(62deg) scale(1.5);
}
section > div:nth-of-type(2) {
  transform: translateZ(60px) rotateY(62deg) scale(1.2);
  &::before{
    content: "path:'/notice'";
    position: absolute;
    top: -30px;
    transform: none;
  }
}
section > div:nth-of-type(3) {
background-color: aliceblue;
  transform: translateX(160px) translateZ(120px) rotateY(62deg);
  z-index: 160;
   &::before{
    content: "path:'/notice/list'";
    position: absolute;
    top: -30px;
    transform: none;
  }
}

.right-box{
    display: flex;
    flex-direction: column;
    position: relative;
    .h-20px{
        position: absolute;
        top:0;
        left:0;
        right:0;
    }
    .flex-1{
        flex: 1;
    }
}
</style>
