import { request } from "../request/index";

export async function fetchCityConfig() {
  let reslut = await request.get("/config/citys");
  return reslut;
}
