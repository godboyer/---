import { PostAction, GetAction, PatchAction, DelAction } from "../request";

/**
 *获取所有租房信息
 * @returns
 */
export const GetHouseInfoAll = (params: any) => {
  let res = GetAction("/house/all", params);
  // console.log("注册响应数据 =>", res);
  return res;
};

/**
 *分页获取房源信息
 * @returns
 */
export const GetHouseInfoPage = (params: any) =>
  GetAction("/house/page", params);

/**
 * 获取单个租房信息
 * @param id 租房信息的ID
 * @returns Promise
 */
export const GetHouseInfoOne = (id: string) => {
  let res = GetAction(`/house/${id}`);
  return res;
};

/**
 * 修改租房信息
 * @param id 租房信息的ID
 * @param data 要修改的数据
 * @returns Promise
 */
export const UpHouseInfo = (id: string, data: any) => {
  return PatchAction(`/house/${id}`, data);
};
/**
 * 删除租房信息
 * @param id 租房信息的ID
 * @returns Promise
 */
export const DelHouseInfo = (id: string) => {
  return DelAction(`/house/${id}`);
};
/**
 * 添加租房信息
 * @param data 要添加的数据
 * @returns Promise
 */
export const AddHouse = (data: any) => {
  return PostAction("/house/add", data);
};

export const GetPageingInfo = (params: { pageSize: number }) => {
  return GetAction("/house/pageinfo", params);
};

export const GetCardsInfo = () => {
  return GetAction("/house/cards");
};
export const GetCardsInfoPage = (params: any) => {
  return GetAction("/house/cardpage", params);
};
