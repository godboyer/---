declare namespace HousePage {


  type CardList = Pick<
    HouseManagement.House,
    | "_id"
    | "href"
    | "alt"
    | "price"
    | "tags"
    | "location"
    | "area"
    | "title"
    | "house_id"
    | "swiper_pic"
    | "Homeowner_info"
    | "floor"
    | "index"
    | "key"
  >;

  interface IHomeownerinfo {
    user_id: string;
    house_name: string;
    username: string;
    phone: string;
    pic: string;
  }

  interface HouseState {
    itemTotal: number;
  }
}

declare namespace HomePage {}
declare namespace LeasePage {}

declare namespace PublishPage {}

declare namespace ServicePage {}

declare namespace AboutPage {}
