import { request } from "../request";
import { adapter } from "@/utils";
import {
  HouseAdapter,
  HouseListAdapter
} from "./management.adapter";

export type HouseFormModel = Pick<
  HouseManagement.House,
  | "city_name"
  | "house_category"
  | "address"
  | "des"
  | "first_picture"
  | "Homeowner_info"
  | "exam_status"
  | "lease_state"
  | "deleted_state"
  | "price"
>;

/**
 * 房屋信息相关请求库
 * @function fetchHouseAddToAdmin --添加房源/发布房源信息的接口
 * @function fetchHouseListToAdmin --获取房源信息列表的接口
 * @function fetchHouseUpdateToAdmin --更新房源信息的接口
 * @function fetchHouseDeleteToAdmin --删除房源信息的接口
 *  @function fetchHouseListToCard --获取房源信息卡片的接口
 *
 *
 */
class HouseFetch {
  async fetchHouseAddToAdmin(data: any) {
    const result = await request.post<ApiHouseManagement.House[] | null>(
      `/house/add`,
      { ...data }
    );
    return result;
  }

  async fetchHouseListToAdmin(params: ApiQuery.QeuryPage) {
    const { page, pageSize, pageCount } = params;
    const data = await request.post<ApiHouseManagement.House[] | null>(
      `/house/all-list`,
      { page, pageSize, pageCount }
    );
    return adapter(HouseAdapter, data);
  }

  async fetchHouseUpdateToAdmin(id: string, data: any) {
    const result = await request.put<ApiHouseManagement.House[] | null>(
      `/house/${id}`,
      { ...data }
    );
    return result;
  }

  async fetchHouseDeleteToAdmin(id: string) {
    const data = await request.delete<ApiHouseManagement.House[] | null>(
      `/house/${id}`
    );
    return data;
  }

  // async fetchHouseListToCard(params: ApiQuery.QeuryPage) {
  //   const { page, pageSize, pageCount } = params;
  //   const data = await request.get<ApiHouseManagement.ApiData | null>(
  //     `/house/card-list`,
  //     { params: { page, pageSize, pageCount } }
  //   );
  //   return adapter(HouseCardAdapter, data);
  // }

  // async fetchHouseListToCardByCity(params: ApiQuery.QueryCityId) {
  //   const { page, pageSize, city_id } = params;
  //   const data = await request.get<ApiHouseManagement.ApiData | null>(
  //     `/house/card-list`,
  //     { params: { city_id, page, pageSize } }
  //   );
  //   return adapter(HouseCardAdapter, data);
  // }

  async fetchHouseState(params?: ApiQuery.QeuryPage) {
    // const { page, pageSize, pageCount } = params;
    const data = await request.get<HousePage.HouseState>(`/house/count`, {
      params,
    });
    return data;
  }

  async fetchHouseInfo(houseId: string) {
    const data = await request.get<HousePage.HouseState>(`/house/${houseId}`);
    return data;
  }
}

export default HouseFetch;

export async function fetchHouseInfo(houseId: string) {
  const data = await request.get<HouseManagement.House>(
    `/house/${houseId}`
  );
  return data;
}

export async function fetchNewHouseInfo() {
  const data = await request.get<HousePage.CardList[]>(`/house/new`);
  return data;
}



export async function fetchHouseState(params?: ApiQuery.QeuryPage) {
  const data = await request.get<HousePage.HouseState>(`/house/count`, {
    params,
  });
  return data;
}

// export async function fetchHouseListToCard(params: ApiQuery.QeuryPage) {
//   const { page, pageSize, pageCount } = params;
//   const data = await request.get<ApiHouseManagement.ApiData | null>(
//     `/house/card-list`,
//     { params: { page, pageSize, pageCount } }
//   );
//   return adapter(HouseCardAdapter, data);
// }

//通过城市id获取房源列表
export async function fetchHouseListByCityId(city_id: string) {
  const data = await request.get<ApiHouseManagement.ApiDataList | null>(
    `/${city_id}/house`
  );
  return adapter(HouseListAdapter, data);
}

/**发布房源 */
export function fetchAddPublishHouse(data: any) {
  let reslut = request.post("/house", data);
  return reslut;
}


/**提交订单  */
export function fetchAddOrder(houseId:string,data: any) {
  let reslut = request.post<ApiRentalOrderManagement.RentalOrder>(`/order/${houseId}`, data);
  return reslut;
}

/**修改订单 */
export function fetchUpdateOrder(houseId:string,data: any) {
  let reslut = request.put(`/order/${houseId}`, data);
  return reslut;
}

