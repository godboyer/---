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
    _id?: string | null;
    /** 用户id */
    user_id: string | null;
    /**用户状态 */
    user_status: string | null;
    /** 用户名 */
    username: string | null;
    /**密码 */
    password?: string;
    /**手机号 */
    phone?: number | null;
    /** 用户头像 */
    avatar?: string | null;
    gender: "0" | "1" | null;
    /** 用户角色类型 */
    role_permission: RoleType;
    createtime: string;
  }
}

declare namespace UserManagement {
  interface User extends ApiUserManagement.User {
    /** 序号 */
    index: number | null;
    /** 表格的key（id） */
    key: string | null;
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
  type UserStatusKey = NonNullable<User["user_status"]>;

  type UserRoleKey = NonNullable<User["role_permission"]>;
}

/**城市相关模块 */
declare namespace CityManagement {
  interface City extends ApiCityManagement.City {
    /** 序号 */
    index: number | null;
    /** 表格的key（id） */
    key: string | null;
  }

  /**城市信息 */
  interface CityInfo {
    /**
     * 城市编号
     */
    city_id: string;
    /**
     * 城市名称
     */
    city_name: string;
    /**
     * 删除状态
     */
    deleted_state: string;
  }

  interface EditInfo extends CityInfo {
    /**文档id */
    _id?: string | null;
    /**表格key */
    key: string | null;
  }

  /**
   * 城市状态
   * - 1: 启用
   * - 2: 禁用
   * - 3: 冻结
   * - 4: 软删除
   */
  type CityStatusKey = NonNullable<City["deleted_state"]>;
}

/**评论管理相关模块 */
declare namespace CommentManagement {
  // CommentStatusKey
  interface Comment extends ApiCommentManagement.Comment {
    /** 序号 */
    index: number | null;
    /** 表格的key（id） */
    key: string | null;
  }

  /*评论信息 */
  interface CommentInfo {
    /**文档id */
    _id: string | null;
    /**
     * 点评信息的ID，该点评信息的ID
     */
    comment_id: string;
    /**
     * 用户ID，点评人的ID
     */
    user_id: string;
    /**
     * 房屋ID，点评的房屋ID
     */
    house_id: string;
    /**
     * 内容，评价内容
     */

    content: string;

    /**
     * 删除状态，该条[评论是否删除或者能否查看
     */
    deleted_state: string;

    /**
     * 创建时间
     */
    create_time?: string;
  }

  /**
   * 评论状态
   * - 1: 启用
   * - 2: 禁用
   * - 3: 冻结
   * - 4: 软删除
   */
  type CommentStatusKey = NonNullable<Comment["deleted_state"]>;
}

/**公告管理相关模块 --NoticeManagement*/
declare namespace NoticeManagement {
  // CommentStatusKey
  interface Notice extends ApiNoticeManagement.Notice {
    /** 序号 */
    index: number | null;
    /** 表格的key（id） */
    key: string | null;
  }

  /**公告信息 */
  interface NoticeInfo {
    /**文档id */
    _id: string | null;
    /**
     * 公告编号
     */
    notice_id: string;
    /**
     * 创建时间
     */
    create_time: string;

    /**
     * 公告内容
     */
    notice_content: string;

    /**
     * 公告标题
     */
    notice_title: string;
    /**
     * 更新时间
     */
    updated_time: string;
    /**
     * 状态
     */
    deleted_state: string;
  }

  /**
   * 评论状态
   * - 1: 启用
   * - 2: 禁用
   * - 3: 冻结
   * - 4: 软删除
   */
  type NoticeStatusKey = NonNullable<Notice["deleted_state"]>;
}

/**留言管理相关模块--LeavewordManagement */
declare namespace LeavewordManagement {
  // CommentStatusKey
  interface Leaveword extends ApiLeavewordManagement.Leaveword {
    /** 序号 */
    index: number | null;
    /** 表格的key（id） */
    key: string | null;
  }

  /**公告信息 */
  interface LeavewordInfo {
    /**文档id */
    _id: string | null;
    /**
     * 公告编号
     */
    notice_id: string;
    /**
     * 创建时间
     */
    create_time: string;

    /**
     * 公告内容
     */
    notice_content: string;

    /**
     * 公告标题
     */
    notice_title: string;
    /**
     * 更新时间
     */
    updated_time: string;
    /**
     * 状态
     */
    deleted_state: string;
  }

  /**
   * 评论状态
   * - 1: 启用
   * - 2: 禁用
   * - 3: 冻结
   * - 4: 软删除
   */
  type LeavewordStatusKey = NonNullable<Leaveword["deleted_state"]>;
}

/**房源相关模块 */
declare namespace HouseManagement {
  interface House extends ApiHouseManagement.House {
    /** 序号 */
    index: number | null;
    /** 表格的key（id） */
    key: string | null;
  }

  /**房屋信息 */
  interface HouseInfo extends ApiHouseManagement.House {
      


  }

  /**
   * 出租状态
   */
  type leaseStatusKey = NonNullable<House["lease_state"]>;

  /**
   * 审核状态
   */
  type examStatusKey = NonNullable<House["exam_status"]>;

  /**
   * 默认状态
   * 1:new新房
   * 2:"启用"
   *
   */
  type defaultStatusKey = NonNullable<House["deleted_state"]>;
}

/**房源相关模块 */
declare namespace LeaseManagement {
  interface House extends ApiHouseManagement.House {
    /** 序号 */
    index: number | null;
    /** 表格的key（id） */
    key: string | null;
  }

  /**房屋信息 */
  interface HouseInfo extends ApiHouseManagement.House {
      


  }

  // /**
  //  * 出租状态
  //  */
  // type leaseStatusKey = NonNullable<House["lease_state"]>;

  // /**
  //  * 审核状态
  //  */
  // type examStatusKey = NonNullable<House["exam_status"]>;

  // /**
  //  * 默认状态
  //  * 1:new新房
  //  * 2:"启用"
  //  *
  //  */
  // type defaultStatusKey = NonNullable<House["deleted_state"]>;
}


declare namespace TableManagement {
  interface Table extends ApiTableManagement.Table {
    /** 序号 */
    index: number | null;
    /** 表格的key（id） */
    key: string | null;
  }

  interface TableInfo {
    /**文档id */
    _id: string | null;
    /**表格key */
    key: string | null;
    /**表格名 */
    table_name: string;
    /**表格描述 */
    table_desc: string;
    /**表格状态 */
    deleted_state: string;
  }

  type TableStatusKey = NonNullable<Table["deleted_state"]>;
}


declare namespace AdminManagement { 

    type StatusKey = '1'|'2'|'3'|'4'|'5'|'0' |string | number | symbol;
}

declare namespace FeedbackManagement { 

  interface Feedback extends ApiFeedbackManagement.Feedback{
        /** 序号 */
    index: number;
    /** 表格的key（id） */
    key?: string;

  }


    type StatusKey = '1'|'2'|'0' |string | number | symbol;
}