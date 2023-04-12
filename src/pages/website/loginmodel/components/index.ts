import AccLogin from './account-login/index.vue';
import CodeLogin from './code-login/index.vue';
import Register from './register-user/index.vue';
import ResetPwd from './reset-pwd/index.vue';
import BindWechat from './bind-wechat/index.vue';
export interface Emits {
  (e: "update-action", key: string): void;
   (e: "close-modal"): void;
}

export { CodeLogin,AccLogin,Register,ResetPwd ,BindWechat}