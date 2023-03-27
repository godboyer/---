import { getLoginModuleRegExp } from "@/utils";
export const AdminRoutes: AuthRoute.Route[] = [
  {
    path: "/admin/home",
    name: "admin_home",
    component: "self",
    meta: {
      title: "管理首页",
      requiresAuth: true,
      singleLayout: "basic",
      keepAlive: true,
      permissions: ["super", "admin", "user"],
      icon: "fluent:home-12-regular",
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
          icon: "majesticons:checkbox-list-line",
        },
      },
    ],
    meta: {
      title: "房源评价管理",
      requiresAuth: true,
      keepAlive: true,
      permissions: ["super", "admin", "user"],
      icon: "tabler:home-edit",
      order: 2,
    },
  },
  {
    path: "/houseInfo",
    name: "houseInfo",
    component: "basic",
    children: [
      {
        name: "houseInfo_list",
        path: "/houseInfo/list",
        component: "self",
        meta: {
          title: "房源信息列表",
          requiresAuth: true,
          icon: "majesticons:checkbox-list-line",
        },
      },
    ],
    meta: {
      title: "房源管理",
      keepAlive: true,
      permissions: ["super", "admin", "user"],
      icon: "tabler:home-cog",
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
          icon: "fa-regular:list-alt",
        },
      },
    ],
    meta: {
      title: "房屋租赁管理",
      requiresAuth: true,
      keepAlive: true,
      icon: "tabler:home-move",
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
         icon: "fa-regular:list-alt",
          order: 5,
        },
      },
    ],
    meta: {
      title: "城市管理",
      requiresAuth: true,
      keepAlive: true,
      icon: "icon-park-outline:city-one",
      order: 5,
    },
  },

  {
    name: "admin_user",
    path: "/admin/user",
    component: "self",
    meta: {
      title: "用户管理",
      requiresAuth: true,
      keepAlive: true,
      singleLayout: "basic",
      permissions: ["super", "admin","user"],
      icon: "tabler:user-cog",
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
          icon: "fa-regular:list-alt",
        },
      },
    ],
    meta: {
      title: "公告管理",
      requiresAuth: true,
      keepAlive: true,
      icon: "fe:notice-active",
    },
  },
  {
    //留言管理
    path: "/leaveword",
    name: "leaveword",
    component: "basic",
    children: [
      {
        path: "/leaveword/list",
        name: "leaveword_list",
        component: "self",
        meta: {
          title: "留言列表",
          requiresAuth: true,
          keepAlive: true,
          icon: "fa-regular:list-alt",
        },
      },
    ],
    meta: {
      title: "留言管理",
      requiresAuth: true,
      keepAlive: true,
      icon: "majesticons:messages-line",
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
      permissions: ["super", "admin","user"],
      icon: "fluent:book-information-24-regular",
      order: 10,
    },
  },
];
