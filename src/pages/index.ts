import type { RouteComponent } from "vue-router";

export const views: Record<
  RouterPage.LastDegreeRouteKey,
  RouteComponent | (() => Promise<RouteComponent>)
> = {
  403: () => import("./_pubilc/403/index.vue"),
  404: () => import("./_pubilc/404/index.vue"),
  500: () => import("./_pubilc/500/index.vue"),
  login: () => import("./_pubilc/login/index.vue"),
  website_home: () => import("./website/homepage/index.vue"),
  lease: () => import("./website/leasepage/index.vue"),
  lease_home: () => import("./website/leasepage/component/HouseMain.vue"),
  lease_map: () => import("./website/leasepage/component/HouseMap.vue"),
  service: () => import("./website/servicepage/index.vue"),
  publish: () => import("./website/publishpage/index.vue"),
  house_detail: () => import("./website/housepage/index.vue"),
  about: () => import("./website/aboutpage/index.vue"),
  management_user: () => import("./admin/management/user/index.vue"),
  management_house: () => import("./admin/management/house/index.vue"),
  management_lease: () => import("./admin/management/lease/index.vue"),
  management_city: () => import("./admin/management/city/index.vue"),
  admin_home:() => import("./admin/home/index.vue"),
  houseComment_list:() => import("./admin/management/commit/index.vue"),
  houseInfo_list:() => import("./admin/management/house/index.vue"),
  houselease_list:() => import("./admin/management/lease/index.vue"),
  admin_city_list:() => import("./admin/management/city/index.vue"),
  leaveword_list: () => import("./admin/management/leaveword/index.vue"),
  admin_user:() => import("./admin/management/user/index.vue"),
  notice_list:() => import("./admin/management/notice/index.vue"),
  admin_about: () => import("./admin/about/index.vue"),
  "not-found": () => import("./_pubilc/not-found/index.vue"),
};
