import { request } from "../request";

export function fetchSearchHouse(data: any) {
  let reslut = request.post<any>("/search/house", data );
  return reslut;
}

export function fetchCityArea(city_id: string) {
  let data = request.get<any>("/config/city-area", { params:{
    city_id
  } });
  return data;
}
