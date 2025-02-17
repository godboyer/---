import axios, { AxiosResponse } from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { REFRESH_TOKEN_CODE } from "@/config";
import {
  localStg,
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData,
} from "@/utils";
import { handleRefreshToken } from "./helpers";

/**
 * 封装axios请求类
 * @author Soybean<honghuangdc@gmail.com>
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance;

  backendConfig: Service.BackendResultConfig;

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: "code",
      dataKey: "data",
      msgKey: "msg",
      successCode: 200,
    }
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);

    this.setInterceptor();
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async (config) => {
        const handleConfig = { ...config, timeout: 100000 };
        if (handleConfig.headers) {
          // 数据转换matcher
          const contentType = handleConfig.headers['Content-Type'] as unknown as UnionKey.ContentType;

          // 设置token
          const headers = handleConfig.headers as { [key: string]: string };
          const AUTH_TOKEN = localStg.get("token") || "";
          // 创建实例后修改默认值  这里是设置token
          headers["Authorization"] = AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : "";
          handleConfig.data = await transformRequestData(
            handleConfig.data,
            contentType
          );
        }

        return handleConfig;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
    /**设置响应拦截 */
    this.instance.interceptors.response.use(
      async (response) => {
        const { status } = response;
        /**-----------------------请求成功处理  -------------------------- */
        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          const { codeKey, dataKey, successCode } = this.backendConfig;
          // 请求成功
          if (backend[codeKey] === successCode) {
            return handleServiceResult(null, backend) as unknown as Promise<
              AxiosResponse<any, any>
            >;
          }

          // token失效, 刷新token
          if (REFRESH_TOKEN_CODE.includes(backend[codeKey])) {
            const config = await handleRefreshToken(response.config);
            if (config) {
              return this.instance.request(config);
            }
          }

          const error = handleBackendError(backend, this.backendConfig);
          return handleServiceResult(error, null) as unknown as Promise<
            AxiosResponse<any, any>
          >;
        }

        // 请求失败
        const error = handleResponseError(response);
        return handleServiceResult(error, null) as unknown as Promise<
          AxiosResponse<any, any>
        >;
      },
      (axiosError: AxiosError) => {
        /**
         * aioxs请求错误处理
         */
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }
}
