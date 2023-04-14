import { localStg } from "@/utils";
import { DropdownOption } from "naive-ui";

/** 获取token */
export function getToken() {
	return localStg.get("token") || "";
}

/** 获取用户信息 */
export function getUserInfo() {
	const emptyInfo: ApiUserManagement.User = {
		user_id: "visitor",	/**如果没有默认访客 */
		username: "",
		role_permission: "user",
		avatar: '',
		user_status: "1",
		createtime: '',
		gender: null,
		age: null,
		email: null
	};

	const userInfo:  ApiUserManagement.User = localStg.get("userInfo") || emptyInfo;
	return userInfo;
}
/**获取用户id */
export function getUserId() {
	const userInfo = getUserInfo();
	return userInfo.user_id;
}



/** 去除用户相关缓存 */
export function clearAuthStorage() {
	localStg.remove("token");
	localStg.remove("refreshToken");
	localStg.remove("userInfo");
}

export type MyDropdownOption = (DropdownOption & {
	permission: string[];
	isLogin: "1" | '2'| '0';
	order: number;
})
export const menuItem: MyDropdownOption[] = [
	{
		label: "登录/注册",
		key: "login",
		path: "/login",
		name: "login",
		permission: ["admin", "super", "user"],
		isLogin: '0',
		order: 1,
		
	},
	{
		label: "发布房源",
		key: "publish",
		path: "/publish",
		name: "publish",
		permission: ["admin", "super", "user"],
		isLogin: '2',
		order: 2,
	},
	{
		label: "反馈",
		key: "feedback",
		path: "/feedback",
		name: "feedback",
		permission: ["admin", "super", "user"],
		isLogin: '2',
		order: 3,
	},

	{
		label: "个人中心",
		key: "personal",
		path: "/personal/home",
		name: "personal",
		permission: ["admin", "super", "user"],
		isLogin: '1',
		order: 1,
	},
	{
		label: "后台管理",
		key: "admin",
		path: "/admin",
		name: "admin",
		permission: ["super"],
		isLogin: '1',
		order: 9,
	},
	{
		label: "经营模式",
		key: "admin",
		path: "/admin",
		name: "admin",
		permission: ["admin"],
		isLogin: '1',
		order: 9,
	},

	{
		label: "退出登录",
		key: "logout",  // 退出登录
		path: "/logout",
		name: "logout",
		permission: ["admin", "super", "user"],
		isLogin: '1',
		order: 10,
	},
]