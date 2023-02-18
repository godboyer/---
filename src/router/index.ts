import { createRouter,createWebHashHistory,createWebHistory } from "vue-router";
import { getSession } from "../utils/storage";
import { routes } from "./config";

console.log(import.meta.env.BASE_URL);
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to,from,next) => { 

    console.log(to, from);
    if (to.path === '/admin') {
        let userInfo = getSession('userInfo')
        // if (!userInfo) {
        //     next({
        //       path: "/login",
        //     });
        // }
    }
    next()
})


export default router