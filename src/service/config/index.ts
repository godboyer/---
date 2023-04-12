/** 请求服务的环境配置 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>;

/** 不同请求服务的环境配置 */
const serviceEnv: ServiceEnv = {
	dev: {
		url: "http://127.0.0.1:3040/api",
		urlPattern: "/url-pattern",
		secondUrl: "http://127.0.0.1:3040/api",
		secondUrlPattern: "/second-url-pattern",
	},
	test: {
		url: "https://localhost:8080",
		urlPattern: "/url-pattern",
		secondUrl: "https://localhost:8081",
		secondUrlPattern: "/second-url-pattern",
	},
	prod: {
		url: "http://114.132.198.2:3020/api",
		urlPattern: "/url-pattern",
		secondUrl: "http://114.132.198.2:3020/api",
		secondUrlPattern: "/second-url-pattern",
	},
};

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv) {
  const { VITE_SERVICE_ENV = 'dev' } = env;

  const config = serviceEnv[VITE_SERVICE_ENV];

  return config;
}
