import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

export const baseUrl = "http://114.132.198.2:3020/house";
/**
 * 创建axios示例对象
 */
const request = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {},
});

interface Iheaders {
  Authorization: string;
}

request.interceptors.request.use(function (
  config: AxiosRequestConfig<AxiosHeaders> | any
) {
  // 请求发送之前
  // 调起一个Loading
  // 或者添加一些请求头数据信息
  var token = sessionStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = token ? "Bearer " + token : ""; // 通过请求头把token 发送给服务器
  }
  return config;
});

request.interceptors.response.use(
  function (response: AxiosResponse) {
    const { status, data } = response;
    if (status === 200 && data.code === 200) {
      //请求成功
    } else {
      if (data.code === 3001) {
        //token失效  跳转登录
      }

      return Promise.reject(data.msg);
    }

    return data;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export const GetAction = (url: string, params?: any, headers?: object) => {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: "GET",
      params: params,
      headers,

    })
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const PostAction = (
  url: string,
  data?: any,
  params?: any,
  headers?: object
) => {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: "post",
      data: data,
      params: params,
      headers,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default request;
