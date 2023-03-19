import type { App } from 'vue';
import { createPinia } from 'pinia';
import { resetSetupStore } from './plugins';
import piniaPersist from "pinia-plugin-persist";

/** setup vue store plugin: pinia. - [安装vue状态管理插件：pinia] */
export function setupStore(app: App) {
  const store = createPinia();
  store.use(resetSetupStore);
  store.use(piniaPersist); //pinia数据持久化
  app.use(store);
}

export * from './modules';
export * from './subscribe';
