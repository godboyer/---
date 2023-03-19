import { PostAction } from "../request";

export const AdminLogin = (data: any) => {
    let res = PostAction("/login", data);
    console.log(res);
    return res;
  };
  
  export const AdminRegister = (data: any) => {
    let res = PostAction("/register", data);
    console.log("注册响应数据 =>", res);
    return res;
  };
  export const AdminChechPhone = (data: any) => {
    let res = PostAction("/chechphone", data);
    console.log("验证手机号响应数据==>", res);
    return res;
  };
  
  export const AdmingetToken = (data: any) => {
    let res = PostAction("/gettoken", data);
    return res;
  };
  
  export const AdminFindPass = (data: any) => {
    let res = PostAction("/findpass", data);
    console.log(res);
    return res;
  };
  
  export const AdminChangePass = (data: any) => {
    let res = PostAction("/changepass", data);
    console.log(res);
    return res;
  };