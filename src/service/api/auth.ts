import { EnumContentType } from "@/enum";
import { mockRequest, request } from "../request";
import { localStg } from "@/utils";

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchCaptcha(phone: string|number,ctcode:string | number) {
  return request.post<boolean>("/captcha/send", { phone,ctcode });
}

/**
 * 用户密码登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(username: string, password: string) {
  // return mockRequest.post<ApiAuth.Token>("/login", JSON.stringify({ username, password }));
  return request.post<ApiAuth.Token>("/user/login", { username, password });
}

/**
 * 账户密码登录
 * @param account - 用户名
 * @param password - 密码
 */
export function fetchAccountLogin(account: string, password: string) {
  return request.post<ApiAuth.Token>("/user/account/login", { account, password });
}



/**
 * 手机验证码登录
 * @param phone - 手机号
 * @param captcha - 验证码
 */
export function fetchCaptchaLogin(phone: number|string, captcha: number|string) {
  // return mockRequest.post<ApiAuth.Token>("/login", JSON.stringify({ username, password }));
  return request.post<ApiAuth.Token>("/user/login/captcha", { phone, captcha });
}

/**
 * 注册用户
 * @param username - 用户名
 * @param phone - 手机号
 * @param password - 密码
 */
export function fetchRegisterUser(
  username: string,
  phone: string,
  password: string
) {
  return request.post<ApiAuth.Token>("/user/register", {
    phone,
    password,
    username,
  });
}
/**
 * 重置密码
 * @param phone - 手机号
 * @param captcha - 验证码
 * @param password - 密码
 */
export function fetchResetPwd(
  phone: string,
  captcha: string,
  password: string
) {
  return request.post<ApiAuth.UserInfo>("/user/reset/pwd", {
    phone,
    password,
    captcha,
  });
}




/** 获取用户信息 */
export function fetchUserInfo() {
  // return mockRequest.get<ApiAuth.UserInfo>('/getUserInfo');
  return request.post<ApiAuth.UserInfo>("/user/info");
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: string) {
  return request.get<ApiRoute.Route>("/menu/route");
  // return request.post<ApiRoute.Route>("/meun/route", { userId });
}
export function fetchUserRoutesMock(userId: string) {
  return mockRequest.post<ApiRoute.Route>("/getUserRoutes", { userId });
}
/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
  return request.post<ApiAuth.Token>("/token/update", { refreshToken });
}

interface UpdateAvater{
    path:string;
    user:ApiAuth.UserInfo;
}
/**上传用户图像 */
export function fetchUploadAvatar(data: any) {
  return request.post<UpdateAvater>("/user/avatar", data,);
}

/**获取手机区号 */
export function fetchPhonePrefix() {
  return request.get<ApiAuth.PhonePrefix[]>("/phone/prefix");
}
interface ICollect{
   house_id:string;
}

/**收藏接口 */
export function fetchCollect(data: ICollect) {
  let userId = localStg.get("userInfo") ? localStg.get("userInfo")?.user_id : "";
  return request.post<ApiAuth.Collect>(`/user/${userId}/favorite`, data);
}
/**获取用户收藏列表 */
export function fetchCollectList(userId:string) {
  return request.get<ApiUserManagement.CollectLsit[]>(`/user/${userId}/favorite`);
}
