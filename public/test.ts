{//公告管理
  path: "/notice",
    name: "notice",
      component: "admin",
        children: [
          {
            path: "/notice/list",
            name: "notice_list",
            component: "self",
            meta: {
              title: "公告列表",
              requiresAuth: true,
              keepAlive: true,
              permissions: ["super", "landlord"],
              icon: "fa-regular:list-alt"
            }
          }
        ],
          meta: {
    title: "公告管理",
      requiresAuth: true,
        keepAlive: true,
          icon: "fe:notice-active"
  },
  redirect: "/notice/list"
}

{
  key: "notice",
    label: "公告管理",
      routeName: "notice",
        routePath: "/notice",
          icon: function iconRender(),
  children: [
    {
      key: "notice_list",
      label: "公告列表",
      routeName: "notice_list",
      routePath: "/notice/list",
      icon: function iconRender(),
    }
  ]
}

const BasicLayout = () => import('./BasicLayout/index.vue');
const BlankLayout = () => import('./BlankLayout/index.vue');
const AdminLayout = () => import('./admin/AdminLayout.vue');
const WebsiteLayout = () => import('./website/FrontLayout.vue');

const iconRender = (config: IconConfig) => {
  const { color, fontSize, icon, localIcon } = config;

  const style: IconStyle = {};

  if (color) {
    style.color = color;
  }
  if (fontSize) {
    style.fontSize = `${fontSize}px`;
  }

  if (!icon && !localIcon) {
    window.console.warn(
      没有传递图标名称，请确保给icon或localIcon传递有效值!
    );
  }

  return () => h(SvgIcon, { icon, localIcon, style });
};



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
  "path": "/publish-parent",
    "redirect": "/publish",
      "component": blankLayout,//路由框架
        "children": [
          {
            "path": "/publish",
            "name": "publish",
            "component": publish,//页面
            "meta": {
              "title": "发布房源",
              "requiresAuth": false,
              "singleLayout": "blank"
            }
          }
        ]
}