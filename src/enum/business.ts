/** 用户角色 */
export enum EnumUserRole {
  super = '超级管理员',
  admin = '管理员',
  user = '普通用户'
}

/** 登录模块 */
export enum EnumLoginModule {
  'pwd-login' = '账密登录',
  'code-login' = '手机验证码登录',
  'register' = '注册',
  'reset-pwd' = '重置密码',
  'bind-wechat' = '微信绑定'
}
/** 个人中心模块 */
export enum EnumPersonalModule {
  'userinfo' = '个人信息',
  'collection' = '个人收藏',
  'comment' = '房源评价',
  'history' = '浏览历史',
  'subscribe' = '预约房源',
}
