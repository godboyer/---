import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";
import { decrypto, encrypto } from "../utils/crypto";
import { baseUrl } from "./config";

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

request.interceptors.request.use(
  function (config: AxiosRequestConfig<AxiosHeaders> | any) {
    // 请求发送之前
    // 调起一个Loading
    // 或者添加一些请求头数据信息
    var token = sessionStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = token ? "Bearer " + token : ""; // 通过请求头把token 发送给服务器
    }
    return config;
  },
  (error) => {
    // Add your request error handling logic here
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response: AxiosResponse) {
    const { status, data } = response;
    let res: AxiosResponse<any, any> | null = null;
    if (status === 200 && data.code === 200) {
      //请求成功
      let crypted = decrypto(data.data);
      res = JSON.parse(crypted);
    } else {
      if (data.code === 3001) {
        //token失效  跳转登录
      }

      return Promise.reject(data.msg);
    }

    return data as AxiosResponse<any, any>;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

/**
 * GetAction: 一个用于发送HTTP GET请求的函数。
 * @param url 发送请求的 URL
 * @param params 作为查询字符串的参数，将附加到 URL 上
 * @param headers 要发送的请求标头。
 * @returns  函数返回一个 Promise，该 Promise 在请求完成后被解析。解析的请求响应包含所有来自服务器的数据，
 * 例如状态码、响应标头和响应体。
 */
export const GetAction = (url: string, params?: any, headers?: object) => {
  console.log("url", url);
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


/**
 * PostAction: 一个用于发送HTTP POST请求的函数。
 * @param url 发送请求的 URL
 * @param data 发送的数据。这可以是一个对象或任何可以序列化为 JSON 的类型。
 * @param params 作为查询字符串的参数，将附加到 URL 上
 * @param headers 要发送的请求标头。
 * @returns  函数返回一个 Promise，该 Promise 在请求完成后被解析。解析的请求响应包含所有来自服务器的数据，
 * 例如状态码、响应标头和响应体。
 */
export const PostAction = (
  url: string,
  data?: any,
  params?: any,
  headers?: object
) => {
  let encyptedData = encrypto(data);
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: "post",
      data: encyptedData,
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

/**
 * 说明:使用 PatchAction 更新用户配置文件的特定属性，
 * 而不是发送完整的新用户配置文件来替换旧配置文件。
 * @param url 发送请求的 URL
 * @param data 发送的数据。这可以是一个对象或任何可以序列化为 JSON 的类型。
 * @param params 作为查询字符串的参数，将附加到 URL 上
 * @param headers 要发送的请求标头。
 * @returns  函数返回一个 Promise，该 Promise 在请求完成后被解析。解析的请求响应包含所有来自服务器的数据，
 * 例如状态码、响应标头和响应体。
 */
export const PatchAction = (url: string, data?: any, params?: any, headers?: AxiosHeaders) => {

  let encyptedData = encrypto(data);
  const config: AxiosRequestConfig = {
    url,
    method: 'PATCH',
    data:encyptedData,
    params,
    headers
  }

  return request(config)
}

/**
 * DelAction: 一个用于发送HTTP DELETE请求的函数。
 * @param url 发送请求的 URL
 * @param data 发送的数据。这可以是一个对象或任何可以序列化为 JSON 的类型。
 * @param params 作为查询字符串的参数，将附加到 URL 上
 * @param headers 要发送的请求标头。
 * @returns  函数返回一个 Promise，该 Promise 在请求完成后被解析。解析的请求响应包含所有来自服务器的数据，
 * 例如状态码、响应标头和响应体。
 */
export const DelAction = (url: string, params?: any, headers?: AxiosHeaders) => {
  const config: AxiosRequestConfig = {
    url,
    method: 'DELETE',
    params,
    headers
  }
  return request(config)
}

export default request;
