import { defineStore } from "pinia";
import HouseFetch, { fetchHouseInfo } from "@/service/api/house";
import { MaybeRef } from "@vueuse/shared";
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
  /**房源完整信息列表 */
  HouseList: HouseManagement.House[];
  /**单个房源详情信息 */
  OneHouseDetailInfo: HouseManagement.HouseInfo | null;
  /**房源数量 */
  houseTotal: number | string;
  /**所在城市 */
  cityName: string;
  /**城市id */
  cityId: string;
}

interface HouseResult{
  error: string | null;
  data: HouseManagement.HouseInfo | null;
}

export const useHouseStore = defineStore("house-store", {
  state: (): HouseStore => {
    return {
      HouseCardList: [],
      HouseList: [],
      OneHouseDetailInfo: null,
      houseTotal: 0,
      cityName: "",
      cityId: "",
    };
  },

  actions: {
    resetHousePageState() {},
    /**
     * 获取房源详情信息
     * @param payload 查询参数---房源sID
     */
    async getOneHouseDetailByFetch(id: string) {
      let { error, data } = await fetchHouseInfo(id);

      if (!error && data) {
        this.OneHouseDetailInfo = data;
      }
    },
    /**筛选房源获取单个房源信息 */
    getOneHouseDetailByFilter(id: string) {
      const house = this.HouseList.find((item) => item["_id"] === id);
      if (house) {
        this.OneHouseDetailInfo = house;
      }
      return false;
    },
    async getOneHouseDetail(id: string ) {
      const fetchResult =  fetchHouseInfo(id);
      const filterResult:Promise<Service.SuccessResult |HouseResult > = new Promise((resolve,reject) => {
        const house = this.HouseList.find((item) => item["_id"] === id);
        if (house) {
          resolve({ error: null, data: house });
        } else {
          resolve({ error: null, data: null });
        }
      });
      const result = await Promise.allSettled([fetchResult, filterResult]);
      result.forEach((item) => { 
        if (item.status === 'fulfilled' && item.value?.data) {
          this.OneHouseDetailInfo = item.value?.data;
        }
      });      

     
     
    },

    /**
     * 设置房源详情信息
     * @param cityName
     */

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
