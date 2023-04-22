import { unref, nextTick } from "vue";
import { defineStore } from "pinia";
import { router } from "@/router";
import {
  fetchAccountLogin,
  fetchCaptchaLogin,
  fetchCollectList,
  fetchLogin,
  fetchUserInfo,
} from "@/service";
import { useRouterPush } from "@/composables";
import { localStg } from "@/utils";
import { useTabStore } from "../tab";
import { useRouteStore } from "../route";
import { getToken, getUserInfo, clearAuthStorage, menuItem } from "./helpers";
import { DropdownOption } from "naive-ui";

interface AuthState {
  /** 用户信息 */
  userInfo: UserManagement.UserInfo;
  /** 用户token */
  token: string;
  /** 登录的加载状态 */
  loginLoading: boolean;
  /**导航菜单 */
  menuList: DropdownOption[];
  /**登录控制 */
  showLoginModel: boolean;
  /**收藏列表 */
  collectList: ApiUserManagement.CollectLsit[];
}

export const useAuthStore = defineStore("auth-store", {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false,
    showLoginModel: false,
    collectList: [],
    menuList: [],
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    },
  },
  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useTabStore();
      const { resetRouteStore } = useRouteStore();
      const route = unref(router.currentRoute);

      clearAuthStorage();
      this.$reset();

      if (route.meta.requiresAuth) {
        toLogin();
      }

      nextTick(() => {
        resetTabStore();
        resetRouteStore();
      });
    },
    /** 获取菜单信息 */
    getMenuList() {
      let newMenu: any[] = menuItem
        .sort((a, b) => a?.order - b?.order)
        .map((item) => {
          if (this.isLogin) {
            if (
              (item.isLogin == "1" || item.isLogin == "2") &&
              item.permission.includes(this.userInfo.role_permission as string)
            ) {
              return {
                label: item.label,
                key: item.key,
                path: item.path,
                name: item.name,
              };
            }
          } else {
            return (
              (item.isLogin == "0" || item.isLogin == "2") && {
                label: item.label,
                key: item.key,
                path: item.path,
                name: item.name,
              }
            );
          }
        })
        .filter((item) => item);

      return newMenu;
    },

    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken - 返回的token
     */
    async handleActionAfterLogin(backendToken: ApiAuth.Token) {
      const route = useRouteStore();
      const { toLoginRedirect } = useRouterPush(false);
      //登录成功有token 则表是登录成功
      const loginSuccess = await this.loginByToken(backendToken);

      if (loginSuccess) {
        //初始化权限路由
        await route.initAuthRoute();

        // 跳转登录后的地址
        toLoginRedirect();

        // 登录成功弹出欢迎提示
        if (route.isInitAuthRoute) {
          window.$notification?.success({
            title: "登录成功!",
            content: `欢迎回来，${this.userInfo.username}!`,
            duration: 3000,
          });
        }

        return;
      }

      // 不成功则重置状态
      this.resetAuthStore();
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(backendToken: ApiAuth.Token) {
      let successFlag = false;

      // 先把token存储到缓存中(后面接口的请求头需要token)
      const { token, refreshToken } = backendToken;

      localStg.set("token", token);
      localStg.set("refreshToken", refreshToken);

      // 获取用户信息
      const { data } = await fetchUserInfo();
      if (data) {
        // 成功后把用户信息存储到缓存中

        localStg.set("userInfo", data);
        //获取收藏列表
        await this.getCollectList()
        // 更新状态
        this.userInfo = data;
        this.token = token;

        successFlag = true;
      }

      return successFlag;
    },

    /** 退出登录 */
    logout() {
      const { resetRouteStore } = useRouteStore();
      const route = unref(router.currentRoute);
      console.log("退出登录", route);
      clearAuthStorage();
      this.$reset();
      nextTick(() => {
        resetRouteStore();
      });
    },
    /**
     * 后台登录
     * @param username - 用户名
     * @param password - 密码
     */
    async login(username: string, password: string) {
      this.loginLoading = true;
      const { data } = await fetchLogin(username, password);
      if (data) {
        await this.handleActionAfterLogin(data);
      }
      this.loginLoading = false;
    },

    /**手机号登录 */
    async captchaLogin(phone: number | string, captcha: number | string) {
      this.loginLoading = true;
      const { data } = await fetchCaptchaLogin(phone, captcha);
      if (data) {
        //登录成功有token 则表是登录成功
        let successLogn = await this.loginByToken(data);
        if (successLogn) {
          window.$message?.success("登录成功");
          console.log("用户信息", this.userInfo);
        }
        // await this.handleActionAfterLogin(data);
      }
      this.loginLoading = false;
    },

    /**
     * 更换用户权限(切换账号)
     * @param userRole
     */
    async updateUserRole(userRole: Auth.RoleType) {
      const { resetRouteStore, initAuthRoute } = useRouteStore();

      const accounts: Record<
        Auth.RoleType,
        { username: string; password: string }
      > = {
        super: {
          username: "Super",
          password: "super123",
        },
        admin: {
          username: "Admin",
          password: "admin123",
        },
        user: {
          username: "User01",
          password: "user01123",
        },
      };
      const { username, password } = accounts[userRole];
      const { data } = await fetchLogin(username, password);
      if (data) {
        await this.loginByToken(data);
        resetRouteStore();
        initAuthRoute();
      }
    },

    /**获取收藏列表 */
    async getCollectList() {
      let userId = this.userInfo.user_id || "";
      const { error, data } = await fetchCollectList(userId);
      if (!error) {
        this.collectList = data;
      }
    },

    /**打开登录弹窗 */
    openLoginModel() { 
      this.showLoginModel = true;
    },
    /**关闭登录弹窗 */
    closeLoginModel() {
      this.showLoginModel = false;
    }
    

  },
});
