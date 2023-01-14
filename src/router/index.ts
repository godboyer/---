import { createRouter,createWebHashHistory,createWebHistory } from "vue-router";
const routes: any = [
    {
      path: "/",
      name: "首页",
      component: 'HomeView',
    },
    {
      path: "/user",
      name: "个人中心",
      component: 'UserView',
      children: [],
    }]
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export default router