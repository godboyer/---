import { request } from "../request";


/**
 *  获取当前城市的区域信息
 * @param data 
 * @returns 
 */
export function fetchCurrentCity() {

  let reslut = request.get<any>("/position/current");
  return reslut;
}
