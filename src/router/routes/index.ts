import { getLoginModuleRegExp } from "@/utils";
import { AdminRoutes } from "./adminRoutes";
import { appRoutes } from "./appRoutes";
/** 根路由: / */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: "root",
  path: "/",
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: "Root",
  },
};

/** 固定的路由 */
export const constantRoutes: AuthRoute.Route[] = [
  ...AdminRoutes,
  ...appRoutes,
  {
    name: "home",
    path: "/home",
    redirect: "/website",
    meta: {
      title: "home",
    },
  },
];
