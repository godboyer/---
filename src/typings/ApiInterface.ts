export interface IhouseInfo {
  _id: string | number | symbol | undefined;
  house_id: Number;

  user_id: Number;

  city_id: Number;

  address: String;

  create_time: Date;

  lease_state: String;

  deleted_state: Number;

  image_path: string;

  price: Number;

  house_description: String;

  house_category: String;

  exam_status: Number;
  des: string;
  area: String;
  title: String;
  decoration_condition: String;
  rental_category: String;
  tags: Array<string>;
  swiper_BigPic: Array<string>;
  swiper_pic: Array<string>;

  video: String;

  location_content: String;

  facilities: Object;

  rentinfo: Object;

  houseDetail: Object;

  Roommate_Info: Object;

  Homeowner_info: Object;
}

export interface IapiResponse<T> {
  code: number;
  msg: string;
  data?: Array<T> | T;
  result?: T;
  ret?: boolean;
  isRegistration?: boolean;
  userInfo?: IuserInfo;
}

export interface IpageingInfo {
  pageCount: number;
  totalPage: number;
}

export interface IuserInfo {
  user_id: Number;

  username: String;

  password: String;

  true_name: String;

  address: String;

  createtime: Date;

  deleted_state: Number;

  email: String;

  phone: String;

  qq: Number;

  role_permission: Number;
}

export interface Iphoneprefix {
  id: string;
  en: string;
  ch: string;
  abbreviate: string;
  prefix: string;
  sort: number;
  create: number;
}
export interface PageTion {
  page: number;
  pageSize: number;
}
export interface Iinfo<T> {
  title: string;
  data: Array<T>;
}
export interface IHomeownerinfo {
  user_id: string;
  house_name: string;
  username: string;
  phone: string;
  pic: string;
}

export type IcardData = {
  _id: string;
  href: string;
  image_path: string;
  alt: string;
  price: string;
  tags: Array<string>;
  location: string;
  des: string;
  area: string;
  title: string;
  house_id: string;
  swiper_pic: Array<string>;
  Homeowner_info: IHomeownerinfo;
};
