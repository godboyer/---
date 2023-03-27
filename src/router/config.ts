// import { AdminRoutes, appRoutes } from "./routes";
// export const constantRoutes: any = [
//   ...AdminRoutes,
//   ...appRoutes,
//   {
//     name: "root",
//     path: "/home",
//     redirect: "/website",
//     meta: {
//       title: "Root",
//     },
//   },
// ];
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { transformAuthRouteToVueRoutes } from "@/utils/router/transform";
import { appRoutes as WebsiteRoutes } from "@/router/routes/appRoutes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_WEBSITE_URL),
  routes: transformAuthRouteToVueRoutes(WebsiteRoutes),
});
import type { App } from "vue";
export async function setupRouter(app: App) {
  /**挂载路由 */
  app.use(router);
  /**创建路由守卫 */
  // createRouterGuard(router);

  await router.isReady();
}
