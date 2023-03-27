export const loginModuleLabels: Record<UnionKey.LoginModule, string> = {
  "pwd-login": "账密登录",
  "code-login": "手机验证码登录",
  register: "注册",
  "reset-pwd": "重置密码",
  "bind-wechat": "微信绑定",
};
export const WebsiteloginModuleLabels: Record<UnionKey.LoginModule, string> = {
  "pwd-login": "账号密码登录",
  "code-login": "登录相顾如寓",
  register: "注册账号",
  "reset-pwd": "重置密码",
  "bind-wechat": "微信绑定",
};

export const userRoleLabels: Record<Auth.RoleType, string> = {
  super: "超级管理员",
  admin: "管理员",
  user: "普通用户",
};

export const userRoleOptions: Common.OptionWithKey<Auth.RoleType>[] = [
  { value: "super", label: userRoleLabels.super },
  { value: "admin", label: userRoleLabels.admin },
  { value: "user", label: userRoleLabels.user },
];

/** 用户性别 */
export const genderLabels: Record<UserManagement.GenderKey, string> = {
  0: "女",
  1: "男",
};
export const genderOptions =  generateOptions(genderLabels)


/** 用户状态 */
export const userStatusLabels: Record<UserManagement.UserStatusKey, string> = {
  1: "启用",
  2: "禁用",
  3: "冻结",
  4: "软删除",
};
/** 城市状态 */
export const cityStatusLabels: Record<CityManagement.CityStatusKey, string> = {
  1: "启用",
  2: "禁用",
  3: "冻结",
  4: "软删除",
};

export const cityOptions =  generateOptions(cityStatusLabels)
/** 评论状态 */
export const commentStatusLabels: Record<
  CommentManagement.CommentStatusKey,
  string
> = {
  1: "启用",
  2: "禁用",
  3: "冻结",
  4: "软删除",
};
export const commentOptions =  generateOptions(commentStatusLabels)

/** 留言状态 */
export const leavewordStatusLabels: Record<
  LeavewordManagement.LeavewordStatusKey,
  string
> = {
  1: "已回复",
  2: "待回复",
  3: "冻结",
  4: "软删除",
};
export const leavewordOptions =  generateOptions(leavewordStatusLabels)

/** 公告状态 */
export const noticeStatusLabels: Record<
  NoticeManagement.NoticeStatusKey,
  string
> = {
  1: "启用",
  2: "禁用",
  3: "冻结",
  4: "软删除",
};
export const noticeOptions =  generateOptions(noticeStatusLabels)

/** 出租状态 */
export const leaseStatusLabels: Record<HouseManagement.leaseStatusKey, string> =
  {
    1: "未出租",
    2: "待出租",
    3: "冻结",
    4: "软删除",
    0: "正在出租",
  };
export const leaseStatusOptions =  generateOptions(leaseStatusLabels)

/** 审核状态 */
export const examStatusLabels: Record<HouseManagement.examStatusKey, string> = {
  1: "审核通过",
  2: "待审核",
  3: "冻结",
  4: "软删除",
  0: "未通过",
};
export const examStatusOptions =  generateOptions(examStatusLabels)

// defaultStatusKey
/** 默认状态 */
export const defaultStatusLabels: Record<
  HouseManagement.defaultStatusKey,
  string
> = {
  1: "启用",
  2: "最新",
  3: "冻结",
  4: "软删除",
  5: "禁用",
  0: "未通过",
};
export const defaultStatusOptions =  generateOptions(defaultStatusLabels)

export const userStatusOptions =  generateOptions(userStatusLabels)


function generateOptions<T extends string | number >(
  labels: Record<T, string>
): Common.OptionWithKey<T>[] {
  return Object.entries(labels).map(([key, label]) => ({
    value: key as T,
    label:label as string,
  }));
}
