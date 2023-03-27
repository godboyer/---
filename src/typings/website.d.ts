declare namespace HousePage {
  interface Card {
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
  }
  interface CardList extends HousePage.Card {
    /** 序号 */
    index: number | null;
    /** 表格的key（id） */
    key: string ;
  }

  interface IHomeownerinfo {
    user_id: string;
    house_name: string;
    username: string;
    phone: string;
    pic: string;
  }


  interface HouseState{
      itemTotal:number
  }



}

declare namespace HomePage {}
declare namespace LeasePage {}

declare namespace PublishPage {}

declare namespace ServicePage {}

declare namespace AboutPage {}
