import { useAppStore } from "@/store";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function createPageGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const app = useAppStore();
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
