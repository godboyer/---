

/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
  /** 返回的token和刷新token */
  interface Token {
    token: string;
    refreshToken: string;
    success: boolean;
  }
  interface PhonePrefix {
    id: String;
    en: String;
    ch: String;
    abbreviate: String;
    prefix: String;
    sort: Number;
    createAt: String;
  }

  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
  /** 后端返回的路由数据类型 */
  interface Route {
    /** 动态路由 */
    routes: AuthRoute.Route[];
    /** 路由首页对应的key */
    home: AuthRoute.AllRouteKey;
  }
}
/**用户管理接口 */
declare namespace ApiUserManagement {
  interface User {
    /**文档id */
    _id: string | null;
    /** 用户id */
    user_id: string | null;
    /** 用户名 */
    username: string | null;
    /** 用户年龄 */
    age: number | null;
    /**真实姓名 */
    true_name?: string;
    /**地址 */
    address?: string;
    /**手机号 */
    phone?: number | null;
    /** 用户头像 */
    avatar?: string | null;

    /**
     * 用户性别
     * - 0: 女
     * - 1: 男
     */
    gender: "0" | "1" | null;

    /** 用户邮箱 */
    email: string | null;
    /**
     * 用户状态
     * - 1: 启用
     * - 2: 禁用
     * - 3: 冻结
     * - 4: 软删除
     */
    user_status: "1" | "2" | "3" | "4" | null;
    /**用户权限 */
    role_permission: string | null;
    /**创建时间 */
    createtime: string | null;
  }
}
/**城市管理接口 */
declare namespace ApiCityManagement {
  interface City {
    /**文档id */
    _id: string | null;
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
}

declare namespace ApiNoticeManagement {
  interface Notice {
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
     * 状态
     */
    deleted_state: string;
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
    updated_time?: string;
  }
}

/**房屋评价管理 */
declare namespace ApiCommentManagement {
  interface Comment {
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
    /**
     * 更新时间
     */
    updated_time?: string;
  }
}

/**留言信息管理---ApiLeavewordManagement */
declare namespace ApiLeavewordManagement {
  interface Leaveword {
    /**文档id */
    _id: string | null;
    /**
     * 内容，留言内容
     */
    content: string;
    /**
     * 留言时间
     */
    create_time: string;
    /**
     * 留言ID，留言数据的标识
     */
    leaveword_id: string;
    /**
     * 回复状态，回复状态
     */
    recovery_state: string;
    /**
     * 更新时间
     */
    updated_time?: string;
    /**
     * 用户ID或者编号，用户的留言
     */
    user_id: string;
  }
}

declare namespace ApiHouseManagement {
  interface House {
    /**文档id */
    _id: string | null;
    address: string;
    alt?: string;
    area?: string;
    city_id: string;
    create_time: Date | null;
    decoration_condition: string;
    deleted_state: string;
    des?: string;
    exam_status: string;
    facilities?: { [key: string]: any };
    first_picture?: string;
    Homeowner_info?: { [key: string]: any } | null;
    house_category: string;
    house_description: string;
    house_id: string;
    houseDetail?: { [key: string]: any };
    href?: string;
    image_path?: string;
    lease_state: string;
    location?: string;
    city_name?: string;
    price: string;
    rental_category: string;
    rentinfo?: { [key: string]: any };
    Roommate_Info?: { [key: string]: any };
    swiper_BigPic?: string[];
    swiper_pic?: string[];
    tags?: string[];
    title?: string;
    user_id: string;
    video?: string;
    owner_id?: Record<string, any>;
  }

  interface ApiData{
    houseCardList: House[];
    houseStatus: HouseStatus;
  }

  interface HouseStatus{
    city_id: string;
    house_total: string | number;
    city_name: string;
  }


}

declare namespace ApiQuery {
  interface QeuryPage {
    page: number;
    pageSize: number;
    pageCount?: number;
  }

  interface QueryCityId {
    city_id: string;
    page: number;
    pageSize: number;
  }
}

declare namespace ApiTableManagement {
  interface Table {
    /**文档id */
    _id: string | null;
    /**
     * 表格编号
     */
    table_id: string;
    /**
     * 表格名称
     */
    table_name: string;
    /**
     * 表格内容
     */
    table_content: string;
    /**
     * 删除状态
     */
    deleted_state: string;
    /**
     * 创建时间
     */
    create_time?: string;
    /**
     * 更新时间
     */
    updated_time?: string;
  }
}
