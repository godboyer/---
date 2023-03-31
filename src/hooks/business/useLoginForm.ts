import { ref } from "vue";
import { useAuthStore } from "@/store";
import type { FormInst } from "naive-ui";
import { Emits } from "@/pages/login/component";
import { fetchAccountLogin, fetchRegisterUser, fetchResetPwd } from "@/service";
interface RegisterParams {
  username: string;
  phone: string;
  password: string;
}

export function useLoginForm(emit: Emits) {
  const auth = useAuthStore();
  const { login } = useAuthStore();
  const formRef = ref<HTMLElement & FormInst>();
  /**注册 */
  async function registerUser(
    username: string,
    phone: string,
    password: string
  ) {
    let { error, data } = await fetchRegisterUser(username, phone, password);

    if (!error) {
      console.log("data: ", data);
      window.$message?.success("注册成功！");
      changeModule("pwd-login");
    }
  }
  /**前台账号登录 */
  async function accountLogin(account: string, password: string) {
    auth.loginLoading = true;
    const { error, data } = await fetchAccountLogin(account, password);
    if (!error) {
      //登录成功有token 则表是登录成功
      let successLogn = await auth.loginByToken(data);
      if (successLogn) {
        window.$message?.success("登录成功");
      }
    }
    auth.loginLoading = false;
  }
  /**重置密码 */
  async function resetPassword(
    phone: string,
    captcha: string,
    password: string
  ) {
    auth.loginLoading = true;
    let { error, data } = await fetchResetPwd(phone, captcha, password);
    if (!error) {
      window.$message?.success("密码修改成功");
    }
  }

  function changeModule(key: string) {
    emit("update-action", key);
  }

  return {
    auth,
    login,
    formRef,
    changeModule,
    registerUser,
    accountLogin,
    resetPassword
  };
}
