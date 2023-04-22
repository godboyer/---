import { defineStore } from "pinia";
import {fetchHouseInfo} from "@/service/api/house";


export const useHouseDetailStore = defineStore("houseDetailStore", {
  state: (): {
    HouseDetail: HouseManagement.House | null;
    HomeownerInfo: Auth.UserInfo | null;
  } => {
    return { HouseDetail: null,HomeownerInfo:null };
  },
  actions: {
    /**
     * 获取房源详情信息
     * @param payload 查询参数---房源sID
     */
    async getHouseDetail(id: string) {
      let { error, data } = await fetchHouseInfo(id)
      
      if (!error) { 
        this.HouseDetail = data as unknown as HouseManagement.House;
        this.HomeownerInfo = this.HouseDetail?.owner_id as unknown as Auth.UserInfo;
      }

    },
    /**
     *  设置房源详情信息
     * @param id 房源id
     */
     setHouseDetail(id: string) { 
      

    }


  },
  getters: {
    // getHouseDetail: (state) => state.HouseDetail,
    // getRoommateInfo: (state) => state.HouseDetail?.Roommate_Info,
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: `HouseDetail`, //自定义 Key值
        storage: localStorage, // 选择存储方式
      },
    ],
  },
});
