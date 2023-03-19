import { defineStore } from "pinia";
import { GetHouseInfoOne } from "@/server/api/house";
import {
  IhouseInfo,
  IcardData,
  IapiResponse,
} from "@/typings/ApiInterface";

export const useHouseDetail = defineStore("houseDetailStore", {
  state: (): {
    HouseDetail: IhouseInfo | null;
  } => {
    return { HouseDetail: null };
  },
  actions: {
    /**
     * 获取房源详情信息
     * @param payload 查询参数---房源sID
     */
    async setHouseDetail(id: string) {
      let res = (await GetHouseInfoOne(
        id
      )) as unknown as IapiResponse<IhouseInfo>;
      this.HouseDetail = res.data as IhouseInfo;
    },
  },
  getters: {
    getSwiperPic(): any {
      return this.HouseDetail?.swiper_pic;
    },
    getSwiperBigPic(): any {
      return this.HouseDetail?.swiper_BigPic;
    },
    getImagePath(): any {
      return this.HouseDetail?.image_path;
    },
    getFacilities: (state) => {
      return state?.HouseDetail?.facilities;
    },
    getTags(): any {
      return this.HouseDetail?.tags;
    },
    getTitle: (state) => {
      return state.HouseDetail?.title;
    },
    getHouseDescription: (state) => {
      let arr = state.HouseDetail?.house_description.split("\n")[1];
      return arr;
    },
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
