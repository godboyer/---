import { useRouter } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import { router as globalRouter, routeName } from "@/router";

/**
 * 路由跳转
 * @param inSetup - 是否在vue页面/组件的setup里面调用，在axios里面无法使用useRouter和useRoute
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter;
  const route = globalRouter.currentRoute;

  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param newTab - 是否在新的浏览器Tab标签打开
   */
  function routerPush(to: RouteLocationRaw, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to);
      window.open(routerData.href, "_blank");
    } else {
      router.push(to);
    }
  }
  /**路由跳转保留当前重定向*/
  function routerPushKeepRedirect(path: string) {
    const { query } = route.value;

    if (query?.redirect) {
      const redirect = query.redirect as string;
      const routeLocation: RouteLocationRaw = {
        path: path as string,
        query: { redirect },
      };
      return routerPush(routeLocation);
    } else {
      return routerPush(path);
    }
  }

  /**根据路由参数跳转 */
  function routerPushByParams(path?: any) {
    const { query } = route.value;
    console.log('query: ', query);
    const routeLocation: RouteLocationRaw = path || query.redirect || "/";
    routerPush(routeLocation);
  }

  /** 返回上一级路由 */
  function routerBack() {
    router.go(-1);
  }

  /**
   * 跳转首页
   * @param newTab - 在新的浏览器标签打开
   */
  function toWebsiteHome(newTab = false) {
    routerPush({ name: routeName("root") }, newTab);
  }
  /**
   * 跳转后台首页
   * @param newTab - 在新的浏览器标签打开
   */
  function toAdminHome(newTab = false) {
    routerPush({ name: routeName("admin") }, newTab);
  }
  function toHome(newTab = false) {
    if (localStorage.getItem("currentPath") == "admin") {
      return toAdminHome();
    } else {
      return toWebsiteHome();
    }
  }

  /**
   * 跳转登录页面
   * @param loginModule - 展示的登录模块
   * @param redirectUrl - 重定向地址(登录成功后跳转的地址),默认undefined表示取当前地址为重定向地址
   */
  function toLogin(
    loginModule?: EnumType.LoginModuleKey,
    redirectUrl?: string
  ) {
    const module: EnumType.LoginModuleKey = loginModule || "pwd-login";
    const routeLocation: RouteLocationRaw = {
      name: routeName("login"),
      params: { module },
    };
    const redirect = redirectUrl || route.value.fullPath;
    Object.assign(routeLocation, { query: { redirect } });
    routerPush(routeLocation);
  }

  /**
   * 登录页切换其他模块
   * @param module - 切换后的登录模块
   */
  function toLoginModule(module: EnumType.LoginModuleKey) {
    const { query } = route.value;
    routerPush({ name: routeName("login"), params: { module }, query });
  }

  /**
   * 登录成功后跳转重定向的地址
   */
  function toLoginRedirect() {
    const { query } = route.value;
    // console.log("query: ", query);
    if (query?.redirect) {
      routerPush(query.redirect as string);
    } else {
      toAdminHome();
      // toHome();
    }
  }

  /**跳转到详情页 */
  function toHouseDetail(id: string) {
    routerPush({
      path: `/house/detail`,
      query: {
        house_id: id,
      },
    });
  }
  /**跳转发布页 */
  function toPublish(redirectUrl?: string) {
    const routeLocation: RouteLocationRaw = {
      name: routeName("publish"),
    };
    const redirect = redirectUrl || route.value.fullPath;
    Object.assign(routeLocation, { query: { redirect } });
    routerPush(routeLocation);
  }

  return {
    routerPush,
    routerBack,
    toWebsiteHome,
    toLogin,
    toLoginModule,
    toLoginRedirect,
    toHouseDetail,
    toAdminHome,
    toPublish,
    routerPushKeepRedirect,
    routerPushByParams,
    toHome
  };
}
