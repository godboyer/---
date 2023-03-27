import { request } from "../request";

export function fetchSearchHouse(params: any) {
  let data = request.get<any>("/search/house", { params });
  return data;
}
