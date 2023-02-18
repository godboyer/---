import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./styles/index.scss";
import "normalize.css";
import piniaPersist from "pinia-plugin-persist";
import Logo from "./components/Logo.vue";
import "amfe-flexible/index.js";
const pinia = createPinia();
pinia.use(piniaPersist); //pinia数据持久化

const app = createApp(App);
app.use(pinia);
app.component("Logo", Logo);
app.use(router);

app.mount("#app");
