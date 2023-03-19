import { defineConfig, loadEnv } from "vite";
import {
  createViteProxy,
  getRootPath,
  getSrcPath,
  setupVitePlugins,
  viteDefine,
} from "./build";
import { getServiceEnvConfig } from './.env-config';
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import DefineOptions from 'unplugin-vue-define-options/vite';
import {
  ElementPlusResolver,
  NaiveUiResolver,
} from "unplugin-vue-components/resolvers";
import path from "path";
import Unocss from "unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";
// https://vitejs.dev/config/


export default defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
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
      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
      }),
    ],

    mode: "development", // 代码环境  开发和生产    production 生产环境
    // @ => src
    resolve: {
      alias: {
        '~': path.resolve(process.cwd()),
        "@": path.resolve(__dirname, "./src"),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
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
