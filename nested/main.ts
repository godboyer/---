import { createApp } from "vue";
import App from "./AdminApp.vue";

import { setupRouter } from '../src/router/config';
import { setupStore } from '../src/store';


import "@/styles/index.scss";
import "normalize.css";
import 'uno.css'
import Logo from "../src/components/Logo.vue";

async function setupApp() {


  //网站页面加载
  // const appLoading = createApp(AppLoading)
  // appLoading.mount("#appLoading")

  //创建app
  const app = createApp(App);

  //安装 store plugin: pinia
  setupStore(app)


  //安装 vue router
  await setupRouter(app)

  //安装全局组件
  app.component("Logo", Logo);
  //挂载mount app
  app.mount("#app")
  
}

//执行安装app函数
setupApp()





