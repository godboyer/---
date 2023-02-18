import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
  ElementPlusResolver,
  NaiveUiResolver,
} from "unplugin-vue-components/resolvers";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), NaiveUiResolver()],
    }),
  ],

  mode: "development", // 代码环境  开发和生产    production 生产环境
  // @ => src
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "http://localhost:5173",
  server: {
    hmr: {
      host: "localhost",
    },
    host: "0.0.0.0",
    port: 5173,
    open: true,
    proxy: {},
  },

  // vite 配置
  // define: {
  //   VITE_MY_VARIABLE: process.env.VITE_API_URL,
  // },
});
