import { useAppStore } from "@/store";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function createPageGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const app = useAppStore();
  const { changeCurrentPath } = useAppStore();
  //如果是admin开头的路由，就把currentPath改为admin
  if (to.path.startsWith("/admin") ) {
    changeCurrentPath("admin");
  } else if (to.path.startsWith("/website")) {
    changeCurrentPath("website");
  }

  switch (to.path) {
    case "/lease/home":
      app.toggleShowMapFlag(false);
      break;
    case "/lease/map":
      app.toggleShowMapFlag(true);
      break;

    default:
      break;
  }
}
