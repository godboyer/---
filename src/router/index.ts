import type { App } from 'vue';
import { transformRouteNameToRoutePath } from "@/utils";
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { getSession } from "../utils/storage";
import { constantRoutes } from "./routes";
import { createRouterGuard } from './guard';
import { transformAuthRouteToVueRoutes } from '@/utils/router/transform';

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes:transformAuthRouteToVueRoutes(constantRoutes),
});
// console.log("处理后的路由=> ",transformAuthRouteToVueRoutes(constantRoutes));


/**安装vue路由 */
/**
 *函数使用 app.use(router) 将 Vue Router 安装到应用程序实例中，
 使其可用于应用程序中的所有组件。

然后，函数调用 createRouterGuard(router)，
将路由实例传递给 createRouterGuard 函数，
以便在路由跳转之前和之后执行一些逻辑，如权限验证和设置页面标题。

最后，函数调用 router.isReady() 方法等待路由实例完成初始化，
以确保在路由准备就绪之前不会执行任何路由导航。
 *
 */
export async function setupRouter(app: App) {
  /**挂载路由 */
  app.use(router)
  /**创建路由守卫 */
  createRouterGuard(router);
  
  await router.isReady()
  
}


/** 路由名称 */
export const routeName = (key: AuthRoute.AllRouteKey) => key;
/** 路由路径 */
export const routePath = (key: Exclude<AuthRoute.AllRouteKey, 'not-found'>) => transformRouteNameToRoutePath(key);
export * from './routes';
