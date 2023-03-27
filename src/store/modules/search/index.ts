import { defineStore } from "pinia";
import { fetchSearchHouse } from "@/service";
import { useHouseStore } from "../house";
interface SearchStore {
  keywords: string; //关键字
  address: string; // 区域
  house_category: string; //房源类别
  rental_price: string; //租房价格
  rental_category: string; //租赁类型
  cityName: string; //所在城市
  decoration_condition: string; //装修情况
  lease_long:Record<string,any>[]
}

export const useSearchStore = defineStore("search-store", {
  state: (): SearchStore => {
    return {
      keywords: "", //关键字
      address: "", // 区域
      house_category: "", //房源类别
      rental_price: "", //租房价格
      rental_category: "", //租赁类型
      cityName: "", //所在城市
      decoration_condition: "", //装修情况
      lease_long:[]
    };
  },

  actions: {
    /**
     * 获取相关房源信息
     * @param payload 分页查询参数
     */
    async GetHouseCardInfo(payload: ApiQuery.QeuryPage) {
      const house = useHouseStore();

      let { error, data } = await fetchSearchHouse(payload);
      if (!error) {
        house.HouseCardList = data;
      }
    },
  },
});
