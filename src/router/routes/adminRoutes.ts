import { getLoginModuleRegExp } from "@/utils";
export const AdminRoutes: AuthRoute.Route[] = [
  // {
  //   path: "/login",
  //   name: "login",
  //   component: "self",
  //   meta: {
  //     title: "后台管理登录",
  //     requiresAuth: true,
  //     keepAlive: true,
  //     singleLayout: "blank",
  //     icon: "fluent:book-information-24-regular",
  //   },
  // },
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
  {
    path: "/admin",
    name: "admin",
    component: "basic",
    redirect: "/admin/home",
    children: [
      {
        path: "/admin/home",
        name: "admin_home",
        component: "self",
        meta: {
          title: "首页",
          requiresAuth: true,
          keepAlive: true,
          permissions: ["super", "admin", "user"],
          icon: "fluent:book-information-24-regular",
          order: 1,
        },
      },
    ],
    meta: {
      title: "首页",
      requiresAuth: true,
      keepAlive: true,
      order: 1,
    },
  },
  {
    path: "/houseComment",
    name: "houseComment",
    component: "basic",
    children: [
      {
        path: "/houseComment/list",
        name: "houseComment_list",
        component: "self",
        meta: {
          title: "房源评价列表",
          requiresAuth: true,
          keepAlive: true,
          permissions: ["super", "admin", "user"],
          icon: "fluent:book-information-24-regular",
        },
      },
    ],
    meta: {
      title: "房源评价管理",
      requiresAuth: true,
      keepAlive: true,
      permissions: ["super", "admin", "user"],
      icon: "fluent:book-information-24-regular",
      order: 2,
    },
  },
  {
    path: "/houseInfo",
    name: "houseInfo",
    component: "basic",
    children: [
      {
        path: "/houseInfo/list",
        name: "houseInfo_list",
        component: "self",
        meta: {
          title: "房源信息列表",
          requiresAuth: true,
          keepAlive: true,
          permissions: ["super", "admin", "user"],
          icon: "fluent:book-information-24-regular",
        },
      },
    ],
    meta: {
      title: "房源管理",
      requiresAuth: true,
      keepAlive: true,
      permissions: ["super", "admin", "user"],
      icon: "fluent:book-information-24-regular",
      order: 3,
    },
  },
  {
    path: "/houselease",
    name: "houselease",
    component: "basic",
    children: [
      {
        path: "/houselease/list",
        name: "houselease_list",
        component: "self",
        meta: {
          title: "房屋租赁列表",
          requiresAuth: true,
          keepAlive: true,
          permissions: ["super", "admin", "user"],
          icon: "fluent:book-information-24-regular",
        },
      },
    ],
    meta: {
      title: "房屋租赁管理",
      requiresAuth: true,
      keepAlive: true,
      permissions: ["super", "admin", "user"],
      icon: "fluent:book-information-24-regular",
      order: 4,
    },
  },
  {
    path: "/admin/city",
    name: "admin_city",
    component: "basic",
    children: [
      {
        path: "/admin/city/list",
        name: "admin_city_list",
        component: "self",
        meta: {
          title: "城市列表",
          requiresAuth: true,
          keepAlive: true,
          permissions: ["super", "admin", "user"],
          icon: "fluent:book-information-24-regular",
          order: 5,
        },
      },
    ],
    meta: {
      title: "城市管理",
      requiresAuth: true,
      keepAlive: true,
      permissions: ["super", "admin", "user"],
      icon: "fluent:book-information-24-regular",
      order: 5,
    },
  },

  {
    path: "/admin/user",
    name: "admin_user",
    component: "self",
    meta: {
      title: "用户管理",
      requiresAuth: true,
      keepAlive: true,
      singleLayout: "basic",
      permissions: ["super", "admin", "user"],
      icon: "fluent:book-information-24-regular",
      order: 6,
    },
  },
  {
    //公告管理
    path: "/notice",
    name: "notice",
    component: "basic",
    children: [
      {
        path: "/notice/list",
        name: "notice_list",
        component: "self",
        meta: {
          title: "公告列表",
          requiresAuth: true,
          keepAlive: true,
        },
      },
    ],
    meta: {
      title: "公告管理",
      requiresAuth: true,
      keepAlive: true,
    },
  },
  {
    name: "admin_about",
    path: "/admin/about",
    component: "self",
    meta: {
      title: "关于",
      requiresAuth: true,
      keepAlive: true,
      singleLayout: "basic",
      permissions: ["super", "admin", "user"],
      icon: "fluent:book-information-24-regular",
      order: 10,
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
