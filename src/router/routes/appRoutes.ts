//website网站主题页面路由
export const appRoutes: AuthRoute.Route[] = [
  {
    name: "root",
    path: "/",
    redirect: "/website",
    meta: {
      title: "Root",
    },
  },
  {
    name: "website",
    path: "/website",
    redirect: "/website/home",
    component: "website",//路由框架
    meta: {
      title: "website",
    },
    children: [
      {
        name: "website_home",
        path: "/website/home",
        component: "self",
        meta: {
          title: "主页",
        },
      },
      {
        name: "lease",
        path: "/lease",
        redirect: "/lease/home",
        component: "self",
        meta: {
          title: "租房",
        },
        children: [
          {
            name: "lease_home",
            path: "/lease/home",
            component: "self",
            meta: {
              title: "租房首页",
            },
          },
          {
            name: "lease_map",
            path: "/lease/map",
            component: "self",
            meta: {
              title: "地图找房",
            },
          },
        ],
      },
    ],
  },
  {
    //服务页
    name: "service",
    path: "/service",
    component: "self",
    meta: {
      title: "服务",
      singleLayout: "blank",
    },
  },
  {
    //关于页
    path: "/about",
    name: "about",
    component: "self",
    meta: {
      title: "关于",
      requiresAuth: false,
      // singleLayout: "blank",

    },
  },
  {
    path: "/publish",
    name: "publish",
    component: "self",
    meta: {
      title: "发布房源",
      requiresAuth: false,
      singleLayout: "blank",
    },
  },
  {
    path: "/house/detail",
    name: "house_detail",
    component: "self",
    meta: {
      title: "房源详情",
      requiresAuth: false,
      singleLayout: "blank",

    },
  },
 
];
