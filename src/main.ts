import { createApp } from "vue";
import App from "./App.vue";
import AppLoading from "./components/common/AppLoading.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupDirectives } from "./directives";
import systemHeader from "./components/header/index.vue";
import "./styles/index.scss";
import "normalize.css";
import "uno.css";
import VueOfficeExcel from "@vue-office/excel";
// 引入后进行初始化
import Aegis from "aegis-web-sdk";

async function setupApp() {
  // 网站页面加载
  const appLoading = createApp(AppLoading);
  //存入全局变量
  localStorage.setItem("currentPath", "website");
  appLoading.mount("#appLoading");

  //创建app
  const app = createApp(App);

  //安装 store plugin: pinia
  setupStore(app);

  //安装自定义指令 vue custom directives
  setupDirectives(app);
  //安装 vue router
  await setupRouter(app);

  //安装全局组件
  app.component("vue-office-excel", VueOfficeExcel);
  app.component("system-header", systemHeader);
  //启动前端性能监控
  const aegis = new Aegis({
    id: "p0n5aFkgq46J36y00y", // 上报 id
    uin: "xxx", // 用户唯一 ID（可选）
    reportApiSpeed: true, // 接口测速
    reportAssetSpeed: true, // 静态资源测速
    spa: true, // spa 应用页面跳转的时候开启 pv 计算
    hostUrl: "https://rumt-zh.com",
  });
  //挂载mount app
  app.mount("#app");
  aegis.ready();

  console.log("启动前端性能监控");
}

//执行安装app函数
setupApp();
