import { defineStore } from "pinia";
import HouseFetch from "@/service/api/house";
const {
  fetchHouseAddToAdmin,
  fetchHouseListToAdmin,
  fetchHouseListToCard,
  fetchHouseState,
} = new HouseFetch();
interface HouseStore {
  /**房源信息卡片 */
  HouseCardList: HousePage.CardList[];
  /**房源数量 */
  itemTotal: number;
  /**所在城市 */
  cityName: string;
  
}

export const useHouseStore = defineStore("house-store", {
  state: (): HouseStore => {
    return {
      HouseCardList: [],
      itemTotal: 0,
      cityName:''
    };
  },

  actions: {
      resetHousePageState() {},

    async getHousePageState() {
      let { error, data } = await fetchHouseState();
      if (!error) {
        const { itemTotal } = data as HousePage.HouseState;
        this.itemTotal = itemTotal;
      }
    },

    /**
     * 获取房源卡片信息
     * @param payload 分页查询参数
     */
    async GetHouseCardInfo(payload: ApiQuery.QeuryPage) {
        await this.getHousePageState()
        let { error, data } = await fetchHouseListToCard(payload);
        if (!error) {
          this.HouseCardList = data as unknown as HousePage.CardList[];
        }
    },
  },
});

export * from "./DetailStore";
export * from "./HouseInfo";
