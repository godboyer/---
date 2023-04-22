import type { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { localStg } from '@/utils';
import { fetchUpdateToken } from '../api';

/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */
export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
  const { resetAuthStore } = useAuthStore();
  const refreshToken = localStg.get('refreshToken') || '';
  const { data } = await fetchUpdateToken(refreshToken);
  if (data) {
    localStg.set('token', data.token);
    localStg.set('refreshToken', data.refreshToken);
    debugger;
    const config = { ...axiosConfig };
    if (config.headers) {
      const headers = config.headers as { [key: string]: string };
         headers['Authorization'] = data.token ? `Bearer ${data.token}` : '';
    }
    debugger;
    return config;
  }

  resetAuthStore();
  return null;
}
