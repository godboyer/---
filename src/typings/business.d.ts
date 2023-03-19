/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户角色类型(前端静态路由用角色类型进行路由权限的控制)
   * - super: 超级管理员(该权限具有所有路由数据)
   * - admin: 管理员
   * - user: 用户
   * - custom: 自定义角色
   */
  type RoleType = keyof typeof import("@/enum").EnumUserRole;

  /** 用户信息 */
  interface UserInfo {
    /**文档id */
    _id?: string;
    /** 用户id */
    user_id: string;
    /**用户状态 */
    user_status: string;
    /** 用户名 */
    username: string;
    /**密码 */
    password?: string;
    /**手机号 */
    phone?: number;
    /** 用户头像 */
    avatar?: string;
    /** 用户角色类型 */
    role_permission: RoleType;
    createtime:string
  }
}

declare namespace UserManagement {
  interface User extends ApiUserManagement.User {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }

  /**
   * 用户性别
   * - 0: 女
   * - 1: 男
   */
  type GenderKey = NonNullable<User["gender"]>;

  /**
   * 用户状态
   * - 1: 启用
   * - 2: 禁用
   * - 3: 冻结
   * - 4: 软删除
   */
  type UserStatusKey = NonNullable<User["userStatus"]>;
}
