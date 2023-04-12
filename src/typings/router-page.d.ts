declare namespace RouterPage {
  /** 根路由 */
  type RootRouteKey = "root";

  /** 未找到路由(捕获无效路径的路由) */
  type NotFoundRouteKey = "not-found";

  /** 页面路由 */
  type RouteKey =
    | "403"
    | "404"
    | "500"
    | "about"
    | "management_city"
    | "management_lease"
    | "management_user"
    | "management_house"
    | "website"
    | "website_home"
    | "house_detail"
    | "service"
    | "home-page"
    | "lease"
    | "lease_home"
    | "lease_map"
    | "publish"
    | "home"
    | "admin"
    | "admin_home"
    | "admin_user"
    | "admin_city"
    | "admin_houselease"
    | "admin_houseInfo"
    | "admin_comment"
    | "admin_notice"
    | "admin_about"
    | "admin_city_list"
    | "houselease"
    | "houselease_list"
    | "houselease_outlist"
    | "notice"
    | "notice_list"
    | "houseInfo"
    | "houseInfo_list"
    | "houseComment"
    | "houseComment_list"
    | "leaveword"
    | "leaveword_list"
    | "login"
    | "exception_403"
    | "exception_404"
    | "exception_500"
    | "login"
    | "management"
    | "management_auth"
    | "management_role"
    | "management_route"
    | "management_user"
    | "test"
    | "feedback"
    | "personal"
    | "not-found";

  /** 最后一级路由(该级路有对应的vue文件) */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    | "403"
    | "404"
    | "500"
    | "about"
    | "management_city"
    | "management_lease"
    | "management_user"
    | "management_house"
    | "website_home"
    | "house_detail"
    | "service"
    | "lease"
    | "lease_home"
    | "lease_map"
    | "publish"
    | "admin_home"
    | "admin_user"
    | "admin_about"
    | "admin_city_list"
    | "houselease_list"
    | "houselease_outlist"
    | "notice_list"
    | "houseInfo_list"
    | "houseComment_list"
    | "leaveword_list"
    | "login"
    | "login"
    | "management_user"
    | "not-found"
    | "test"
    | "feedback"
    | "personal"
  >;
}
