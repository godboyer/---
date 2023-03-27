import { getLoginModuleRegExp } from "@/utils";
import { appRoutes } from "./appRoutes";
/** 根路由: / */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: "root",
  path: "/",
  redirect: import.meta.env.VITE_ADMIN_URL,
  meta: {
    title: "Root",
  },
};

/** 固定的路由 */
export const constantRoutes: AuthRoute.Route[] = [
  ...appRoutes,
  {
    name: "home",
    path: "/home",
    redirect: "/website",
    meta: {
      title: "home",
    },
  },
  {
    path: "/admin",
    name: "admin",
    redirect: "/admin/home",
    meta: {
      title: "首页",
      keepAlive: true,
    },
  },
  {
    name: "login",
    path: "/login",
    component: "self",
    props: (route: any) => {
      const moduleType =
        (route.params.module as EnumType.LoginModuleKey) || "pwd-login";
      return {
        module: moduleType,
      };
    },
    meta: {
      title: "登录",
      dynamicPath: `/login/:module(${getLoginModuleRegExp()})?`,
      singleLayout: "blank",
    },
  },
  // 匹配无效路径的路由
  {
    name: "not-found",
    path: "/:pathMatch(.*)*",
    component: "blank",
    meta: {
      title: "未找到",
      singleLayout: "blank",
    },
  },
  {
    name: "403",
    path: "/403",
    component: "self",
    meta: {
      title: "无权限",
      singleLayout: "blank",
    },
  },
  {
    name: "404",
    path: "/404",
    component: "self",
    meta: {
      title: "未找到",
      singleLayout: "blank",
    },
  },
  {
    name: "500",
    path: "/500",
    component: "self",
    meta: {
      title: "服务器错误",
      singleLayout: "blank",
    },
  },
];
