import { defineStore } from "pinia";

// 注意事项：state和actions还有getters里面声明的变量不能重名，否则会报错
export const useUserInfoStore = defineStore("userInfoStore", {
  state: () => {
    return { userToken: "", smsCode: 0, userTel: 0, WapGoodsInfo: {} };
  },
  actions: {
    setUserToken(payload: string):void {
      this.userToken = payload;
    },
   
  },
  getters: {
    getUserToken(): string {
      return this.userToken;
    },
    getSmsCode(): number {
      return this.smsCode;
    },
    getUserTel(): number {
      return this.userTel;
    },
    getWapGoods(): any {
      return this.WapGoodsInfo;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user", //自定义 Key值
        storage: localStorage, // 选择存储方式
      },
    ],
  },
});
