import { GetAction } from './../request';
import { PostAction } from "../request";

export const Login = (data: any) => {
    let res = PostAction("/user/login", data);
    console.log(res);
    return res;
};
//短信验证登录
export const CaptchaLogin = (data: any) => {
  let res = PostAction("/user/captlogin", data);
  // console.log(res);
  return res;
};
  
  export const Register = (data: any) => {
    let res = PostAction("/register", data);
    console.log("注册响应数据 =>", res);
    return res;
  };
  export const ChechPhone = (data: any) => {
    let res = PostAction("/chechphone", data);
    console.log("验证手机号响应数据==>", res);
    return res;
  };
  
  export const getToken = (data: any) => {
    let res = PostAction("/gettoken", data);
    return res;
  };
  
  export const FindPass = (data: any) => {
    let res = PostAction("/findpass", data);
    console.log(res);
    return res;
  };
  
  export const ChangePass = (data: any) => {
    let res = PostAction("/changepass", data);
    console.log(res);
    return res;
};
export const SendCaptchaAPI = (data: any) => { 
  console.log(data);
return PostAction("/user/sendcaptcha", data);
} 

export const GetPhonePrefixList = () => {return GetAction('/user/phoneprefix') }