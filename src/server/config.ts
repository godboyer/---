/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = import.meta.env.VITE_API_URL;
let routerMode = "hash";
let imgBaseUrl = "";
console.log(import.meta.env.MODE);
if (import.meta.env.MODE == "development") {
  imgBaseUrl = "/img/";
  baseUrl = "http://127.0.0.1:3020/api";
} else if (import.meta.env.MODE == "production") {
  imgBaseUrl = "//elm.cangdu.org/img/";
}

export { baseUrl, routerMode, imgBaseUrl };
