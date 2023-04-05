import UAParser from 'ua-parser-js';
import { useAuthStore } from '@/store';
import { isArray, isString } from '@/utils';

interface AppInfo {
  /** 项目名称 */
  name: string;
  /** 项目标题 */
  title: string;
  /** 项目描述 */
  desc: string;
}

/** 项目信息 */
export function useAppInfo(): AppInfo {
  const { VITE_APP_NAME: name, VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env;

  return {
    name,
    title,
    desc
  };
}
//composables \system.ts
/** 获取设备信息 */
export function useDeviceInfo() {
  const parser = new UAParser();
  const result = parser.getResult();
  return result;
}

/** 权限判断 */
export function usePermission() {
  const auth = useAuthStore();

  function hasPermission(permission: Auth.RoleType | Auth.RoleType[]) {
    const { role_permission } = auth.userInfo;

    let has = role_permission === 'super';
    if (!has) {
      if (isArray(permission)) {
        has = (permission as Auth.RoleType[]).includes(role_permission);
      }
      if (isString(permission)) {
        has = (permission as Auth.RoleType) === role_permission;
      }
    }
    return has;
  }

  return {
    hasPermission
  };
}
