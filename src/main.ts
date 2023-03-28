import { createApp } from "vue";
import App from "./App.vue";
import AppLoading from "./components/common/AppLoading.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupDirectives } from "./directives";

import "./styles/index.scss";
import "normalize.css";
import "uno.css";
import Logo from "./components/Logo.vue";
import VueOfficeExcel from '@vue-office/excel'

async function setupApp() {
  // 网站页面加载
  const appLoading = createApp(AppLoading)
  appLoading.mount("#appLoading")

  //创建app
  const app = createApp(App);

  //安装 store plugin: pinia
  setupStore(app);

  //安装自定义指令 vue custom directives
  setupDirectives(app);
  //安装 vue router
  await setupRouter(app);

  //安装全局组件
  app.component("Logo", Logo);
  app.component('vue-office-excel',VueOfficeExcel)
  //挂载mount app
  app.mount("#app");
}

//执行安装app函数
setupApp();
