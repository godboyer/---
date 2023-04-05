import { getServiceEnvConfig } from '../config';
import { createRequest } from './request';

const { url, secondUrl, secondUrlPattern } = getServiceEnvConfig(import.meta.env);


//是否开启代理
const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export const request = createRequest({ baseURL: url  });


export const secondRequest = createRequest({ baseURL: isHttpProxy ? secondUrlPattern : secondUrl });

export const mockRequest = createRequest({ baseURL: '/mock' });
export  {url  }