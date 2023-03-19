import { mockRequest ,request} from '../request';

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchCaptcha(phone: string) {
  return request.post<boolean>('/getSmsCode', { phone });
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
 * 手机验证码登录
 * @param phone - 手机号
 * @param captcha - 验证码
 */
export function fetchCaptchaLogin(phone: number, captcha: number) {
	// return mockRequest.post<ApiAuth.Token>("/login", JSON.stringify({ username, password }));
	return request.post<ApiAuth.Token>("/user/login/captcha", { phone, captcha });

}

/**
 * 注册用户
 * @param username - 用户名
 * @param phone - 手机号
 * @param password - 密码
 */
export function fetchRegisterUser(username:string,phone: string, password: string) {
	return request.post<ApiAuth.Token>("/user/register", { phone, password ,username});

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
  return request.post<ApiAuth.Token>('/token/update', { refreshToken });
}
