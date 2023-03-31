import { defineStore } from "pinia";
import HouseFetch from "@/service/api/house";
const {
  fetchHouseAddToAdmin,
  fetchHouseListToAdmin,
  fetchHouseListToCard,
  fetchHouseListToCardByCity,
  fetchHouseState,
} = new HouseFetch();
interface HouseStore {
  /**房源信息卡片 */
  HouseCardList: HousePage.CardList[];
  /**房源数量 */
  houseTotal: number | string;
  /**所在城市 */
  cityName: string;
  /**城市id */
  cityId: string;
}

export const useHouseStore = defineStore("house-store", {
  state: (): HouseStore => {
    return {
      HouseCardList: [],
      houseTotal: 0,
      cityName: "",
      cityId: "",
    };
  },

  actions: {
    resetHousePageState() {},
    setCityName(cityName: string) {
      this.cityName = cityName;
    },
    sethouseTotal(count: number | string) {
      this.houseTotal = count;
    },
    setCityId(cityId: string) {
      this.cityId = cityId;
    },

    async getHousePageState() {
      let { error, data } = await fetchHouseState();
      if (!error) {
        const { itemTotal } = data as HousePage.HouseState;
        this.houseTotal = itemTotal;
      }
    },

    /**
     * 获取房源卡片信息
     * @param payload 分页查询参数
     */
    async GetHouseCardInfo(payload: ApiQuery.QeuryPage) {
      await this.getHousePageState();
      let { error, data } = await fetchHouseListToCard(payload);
      if (!error) {
        this.HouseCardList = data as unknown as HousePage.CardList[];
      }
    },
    /**
     * 获取房源卡片信息
     * @param payload 分页查询参数
     */
    async GetHouseCardInfoByCity(payload: ApiQuery.QueryCityId) {
      let { error, data } = await fetchHouseListToCardByCity(payload);
      console.log("data: ", data);

      if (!error) {
        const { houseCardList, houseStatus } =
          data as ApiHouseManagement.ApiData;
        this.HouseCardList = houseCardList as unknown as HousePage.CardList[];

        this.setCityName(houseStatus.city_name);
        this.sethouseTotal(houseStatus.house_total);
        this.setCityId(houseStatus.city_id);
      }
    },
  },
});

export * from "./detail";
