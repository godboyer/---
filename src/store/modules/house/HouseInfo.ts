import { defineStore } from "pinia";
import {
  GetCardsInfoPage,
  GetHouseInfoAll,
  GetHouseInfoOne,
  GetHouseInfoPage,
} from "@/server/api/house";

import {
  IapiResponse,
  IcardData,
  IhouseInfo,
  PageTion,
} from "@/typings/ApiInterface";
import * as _ from "lodash";
import { useGetTableData, useGetTableDataEs } from "../admin/tableData";
import HouseFetch from "@/service/api/house";
const { fetchHouseAddToAdmin, fetchHouseListToAdmin, fetchHouseListToCard } =
  new HouseFetch();

// 注意事项：state和actions还有getters里面声明的变量不能重名，否则会报错
export const useHouseInfoStore = defineStore("HouseInfoStore", {
  state: (): {
    HouseInfo: Array<IhouseInfo>;
    HouseCardInfo: HousePage.CardList[] |null;
    HouseDetail: IhouseInfo | null;
    houseInfoList: Array<IhouseInfo>;
    showMapFlag: Boolean;
  } => {
    return {
      HouseInfo: [],
      HouseCardInfo: [],
      HouseDetail: null,
      houseInfoList: [],
      showMapFlag: false,
    };
  },
  actions: {
    /**
     * 获取房源信息
     * @param payload 调用接口参数
     */
    async setHouseInfo(payload: any) {
      let res = (await GetHouseInfoPage(
        payload
      )) as unknown as IapiResponse<IhouseInfo>;

      this.HouseInfo = res.data as any;
    },
    async setHouseInfoALl() {
      let res = (await GetHouseInfoAll(
        {}
      )) as unknown as IapiResponse<IhouseInfo>;
      this.HouseInfo = res.data as any;
      this.houseInfoList = this.HouseInfo.filter((item: any, index: number) => {
        return 0 <= index && index <= 9;
      });
      console.log(useGetTableDataEs<IhouseInfo>(this.houseInfoList));
    },
    /**
     * 获取房源卡片信息
     * @param payload 分页查询参数
     */
    async setHouseCardInfo(payload: ApiQuery.QeuryPage) {
      let { error, data } = await fetchHouseListToCard(payload);
      if (!error) {
        
        this.HouseCardInfo = data;
      }
    },
    setHouseInfoList(payload: PageTion) {
      this.houseInfoList = this.getHouseInfoPage(payload);
    },
  },
  getters: {
    //获取地图找房的标志
    getHouseMap(state) {
      return state.showMapFlag;
    },
    getHouseNums(): number {
      return this.HouseInfo.length;
    },
    getHouseInfo(): any {
      return this.HouseInfo;
    },
    getHouseInfoList(): any {
      return this.houseInfoList;
    },
    getHouseCardInfo(): any {
      return this.HouseCardInfo;
    },
    /**
     * 实现前端分页的函数
     * @param state 状态
     * @returns 分页数据
     */
    getHouseInfoPage: (state: any) => {
      return (payload: PageTion) => {
        let { page, pageSize } = payload;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const filteredData = state.HouseInfo.filter(
          (item: any, index: number) => {
            return start <= index && index < end;
          }
        );
        return filteredData;
      };
    },
    /**
     * 获取单个房屋信息
     */
    getHouseInfoOne: (state: any) => {
      return (id: string) => {
        console.log(id);
        return _.find(
          state.houseInfoList,
          (item: any, index: number) => item._id === id
        );
      };
    },
  },
});
