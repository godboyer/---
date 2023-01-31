import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./styles/index.scss";
import "normalize.css";

import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPersist); //pinia数据持久化

// console.log("import.meta",import.meta.env)
// console.log(import.meta.env.VITE_API_URL)
const app = createApp(App);

app.use(router);

app.mount("#app");
