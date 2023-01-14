
import { defineStore } from "pinia";

// 注意事项：state和actions还有getters里面声明的变量不能重名，否则会报错
export const useUserInfoStore = defineStore("userInfoStore", {
  state: () => {
    return { userToken: "", smsCode: 0, userTel: 0 ,WapGoodsInfo:{}};
  },
  actions: {
    setUserToken(payload: string) {
      this.userToken = payload;
    },
    setSmsCode(payload: number) {
      this.smsCode = payload;
    },
    setUserTel(payload: number) {
      this.userTel = payload;
    },
    setWapGoods(payload:any) {
      this.WapGoodsInfo = payload;
    }
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
    }
    
  },
});
