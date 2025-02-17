/** 获取登录页面模块的动态路由的正则 */
export function getLoginModuleRegExp() {
  const modules: EnumType.LoginModuleKey[] = ['pwd-login', 'code-login', 'register', 'reset-pwd', 'bind-wechat'];
  return modules.join('|');
}

/** 获取登录页面模块的动态路由的正则 */
export function getPersonalModuleRegExp() {
  const modules: EnumType.PersonalModuleKey[] = ['userinfo', 'collection', 'comment', 'history','subscribe'];
  return modules.join('|');
}

export function getPublishModuleRegExp() { 

  const modules: EnumType.PublishModuleKey[] = ['nextone', 'nexttwo', 'nextthr', 'nextfour', 'nextfive']
    return modules.join('|');
}