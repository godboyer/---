import { defineStore } from "pinia";



export const useHouseDetailStore = defineStore("houseDetailStore", {
  state: (): {
    HouseDetail: HouseManagement.HouseInfo | null;
  } => {
    return { HouseDetail: null };
  },
  actions: {
    /**
     * 获取房源详情信息
     * @param payload 查询参数---房源sID
     */
    async getHouseDetail(id: string) {
    
    },
  },
  getters: {
  
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
