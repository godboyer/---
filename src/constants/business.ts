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
  admin: "房东/中介",
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
export const genderOptions = generateOptions(genderLabels, "gender");

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

export const cityOptions = generateOptions(cityStatusLabels, "city_status");
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
export const commentOptions = generateOptions(
  commentStatusLabels,
  "comment_status"
);

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
export const leavewordOptions = generateOptions(
  leavewordStatusLabels,
  "leaveword_status"
);

/** 反馈状态 */
export const FeedbackStatusLabels: Record<
  FeedbackManagement.StatusKey,
  string
> = {
  1: "已回复",
  2: "未处理",
  0: "删除",
};
export const FeedbackOptions = generateOptions(
  FeedbackStatusLabels,
  "Feedback_status"
);

/** 公告状态 */
export const noticeStatusLabels: Record<
  NoticeManagement.NoticeStatusKey,
  string
> = {
  1: "发布",
  2: "下架",
  3: "草稿",
  4: "删除",
};
export const noticeOptions = generateOptions(
  noticeStatusLabels,
  "notice_status"
);

/** 出租状态 */
export const leaseStatusLabels: Record<HouseManagement.leaseStatusKey, string> =
  {
    1: "未出租",
    2: "待出租",
    3: "冻结",
    4: "软删除",
    0: "正在出租",
  };
export const leaseStatusOptions = generateOptions(
  leaseStatusLabels,
  "lease_state"
);

/** 审核状态 */
export const examStatusLabels: Record<HouseManagement.examStatusKey, string> = {
  1: "审核通过",
  2: "待审核",
  3: "冻结",
  4: "软删除",
  0: "未通过",
};
export const examStatusOptions = generateOptions(
  examStatusLabels,
  "exam_state"
);

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
export const defaultStatusOptions = generateOptions(
  defaultStatusLabels,
  "default_status"
);

export const userStatusOptions = generateOptions(
  userStatusLabels,
  "user_status"
);

export const feedbackTypeLabels: Record<FeedbackManagement.TypeKey, string> = {
  suggest: "功能建议",
  bug: "BUG",
  other: "其他",
};

//租住类型
export const RentalCategoryLabels: Record<
  HouseManagement.RentalCategoryKey,
  string
> = {
  1001: "整租",
  1002: "合租",
};

//租住时长
export const RentalDurationLabels: Record<HouseManagement.RentalDurationKey, string> = {
  1: "长租",
  2: "短租",
};

export const RentalCategoryOptions = generateOptions( RentalCategoryLabels, "RentalCategory");

export const RentalDurationOptions = generateOptions( RentalDurationLabels, "RentalDuration");

export const feedbackTypeOptions = generateOptions(
  feedbackTypeLabels,
  "feedback_type"
);

function generateOptions<T extends string | number>(
  labels: Record<T, string>,
  field: string
): Common.OptionWithKey<T>[] {
  return Object.entries(labels).map(([key, label]) => ({
    value: key as T,
    label: label as string,
    field,
  }));
}

const icons = [
  {
    icon: "iconbingxiang",
    label: "冰箱",
  },
  {
    icon: "iconchuangdian",
    label: "床垫",
  },
  {
    icon: "iconbigualu",
    label: "壁挂炉",
  },
  {
    icon: "iconjidinghe",
    label: "净水器",
  },
  {
    icon: "iconguizi",
    label: "柜子",
  },
  {
    icon: "iconchuang",
    label: "床",
  },

  {
    icon: "iconjidinghe",
    label: "机顶盒",
  },
  {
    icon: "iconmoren",
    label: "默认",
  },
  {
    icon: "icondiancilu",

    label: "电磁炉",
  },
  {
    icon: "iconluyouqi",
    label: "路由器",
  },
  {
    icon: "iconyizi",
    label: "椅子",
  },
  {
    icon: "icondianshan",
    label: "电扇",
  },
  {
    icon: "iconxiyiji",
    label: "洗衣机",
  },
  {
    icon: "iconshafa",
    label: "沙发",
  },
  {
    icon: "icondiancilu",
    label: "电磁炉",
  },
  {
    icon: "icondiannuanqi",
    label: "电暖器",
  },
  {
    icon: "iconreshuiqi",
    label: "热水器",
  },
  {
    icon: "iconshujia",
    label: "书架",
  },
  {
    icon: "iconpaiqishan",
    label: "排气扇",
  },
  {
    icon: "icondianshi",
    label: "电视",
  },
  {
    icon: "iconyuba",
    label: "浴霸",
  },
  {
    icon: "iconweibolu",
    label: "微波炉",
  },
  {
    icon: "iconzhongyangkongtiao",
    label: "中央空调",
  },
  {
    icon: "iconyigui",
    label: "衣柜",
  },
  {
    icon: "iconzhinengsuo",
    label: "智能锁",
  },
  {
    icon: "iconzhongyangkongtiao",
    label: "中央空调",
  },
  {
    icon: "iconzhinengsuo",
    label: "智能锁",
  },
];
