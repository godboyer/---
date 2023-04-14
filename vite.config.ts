import { defineConfig, loadEnv } from "vite";
import {
  createViteProxy,
  getRootPath,
  getSrcPath,
  setupVitePlugins,
  viteDefine,
} from "./build";
import { getServiceEnvConfig } from "./src/service/config/index";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
  NaiveUiResolver,
} from "unplugin-vue-components/resolvers";
import path, { resolve } from "path";
import Unocss from "unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";
import unplugin from "./build/plugins/unplugin"

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as any;
  console.log('viteEnv: ', viteEnv);
  const rootPath = getRootPath();
  const srcPath = getSrcPath();
  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'Y';
  const envConfig = getServiceEnvConfig(viteEnv);

  return {
    plugins: [
      ...unplugin(viteEnv),
      vue(),
      vueJsx(),
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
    
      }),
      Unocss({
        presets: [ presetAttributify(), presetIcons()],
      }),
    ],
    define: viteDefine,
    mode: "development", // 代码环境  开发和生产    production 生产环境
    // @ => src
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },
    base: "./", // 打包路径
    server: {
      hmr: {
        host: "localhost",
      },
      cors: true,
      port: 5173,
      open: true,
      proxy: {},


    },
    build: {// 打包配置
      minify: 'terser',// 压缩
      terserOptions: {
        compress: {
          drop_console: true,// 删除console
          drop_debugger: true,// 删除debugger
        }
      }
    }

  }
})
