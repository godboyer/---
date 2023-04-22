import { request } from "../request";
import { adapter } from "@/utils";
import {
  HouseAdapter,
  HouseListAdapter
} from "./management.adapter";
export async function fetchSearchHouse(data: any) {
  let reslut = await request.post<any>("/search/house", data);
  return adapter(HouseListAdapter, reslut);
}

export function fetchCityArea(city_id: string) {
  let data = request.get<any>("/config/city-area", {
    params: {
      city_id,
    },
  });
  return data;
}
