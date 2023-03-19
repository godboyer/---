<template>
  <nav>
    <RouterLink v-for="item in navItem" :key="item.key" class="nav-a font-700" :class="{active:$route.path === item.to}" :to="item.to">{{
      item.label
    }}</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { navItem } from "./data/index";


const path = ref<string>("");
const router = useRouter();

onMounted(() => {
  console.log(router.options);
  const { history } = router.options;
  path.value = history.location;
  router.beforeEach((to, from) => {
    // ...
    // 返回 false 以取消导航
    path.value = to.path;
    console.log("to", to);
    console.log("from", from);
    return true;
  });
});
</script>

<style lang="scss" scoped>

.active {
  color: #00afb8 !important;
  cursor: pointer;
 
}

nav {
  width: 40%;
  min-width: 300px;
  display: flex;
  justify-content: space-between;
  gap: 10%;
  font-size: 18px;
  .nav-a {
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      bottom: -5px;
      left: 50%;
      width: 0%;
      height: 3px;
      border-radius: 3px;
      background-color: #222;
      transition: 0.3s ease;
    }
    &:hover::before{
      width: 100%;
      left: 0;
    }
  }
}
</style>
