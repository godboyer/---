import { defineStore } from "pinia";
import { fetchSearchHouse } from "@/service";
import { useHouseStore } from "../house";
import { dateFormatYMd } from "@/utils";

interface SearchStore {
  filter: SearchFields; //搜索条件
  showSearchPanel: boolean; //搜索面板
  visibleBackDrop: boolean; //搜索面板遮罩层
  showSearchTab: boolean; //搜索tab
  visibleTabBackDrop: boolean; //搜索tab遮罩层
  module: string; //搜索模块
  topModule: string; //搜索模块
}

interface SearchFields {
  keywords: string[]; //关键字
  city_area: string; // 区域
  house_category: string[]; //房源类别
  priceRange: Record<string, any>; //租房价格
  rental_category: string; //租赁类型
  city_id: string; //所在城市
  city_name: string; //所在城市
  decoration_condition: string; //装修情况
  lease_long: Record<string, any>;
  area?: string; //面积,
  floor?: string; //楼层,
  orientation: string; //朝向,
  decoration?: string; //装修,
}

export const useSearchStore = defineStore("search-store", {
  state: (): SearchStore => {
    return {
      filter: {
        keywords: [""],
        city_area: "-1",
        house_category: ["-1"],
        priceRange: { min: 100, max: 8000 },
        rental_category: "-1",
        city_id: "4201",
        city_name: "武汉",
        decoration_condition: "",
        lease_long: { start: Date.now(), end: Date.now() },
        area: "",
        floor: "",
        orientation: "",
        decoration: "",
      },
      showSearchPanel: false,
      visibleBackDrop: false, //筛选面板遮罩层
      visibleTabBackDrop: false, //搜索tab遮罩层
      showSearchTab: false,
      module: "city",
      topModule: "smallSearch",
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

    /**
     * 掉取搜索房源接口
     */
    async handleFetchSearchHouse() {
      
      let params = {
        ...this.filter,
        keywords: this.filter.keywords.join(","), //关键字
        house_category: this.filter.house_category.join(","), //房源类别
      };
      console.log(params);
      let { error, data } = await fetchSearchHouse(params);
      if (!error) {
        console.log(data);
      }
    },

    // 关闭搜索面板
    closeSearchPanel() {
      this.showSearchPanel = false;
    },
    // 打开搜索面板
    openSearchPanel() {
      this.showSearchPanel = true;
    },
    // 关闭遮罩层
    closeFilterBackDrop() {
      this.visibleBackDrop = false;
    },
    // 打开遮罩层
    openFilterBackDrop() {
      this.visibleBackDrop = true;
    },

    // 关闭搜索tab
    closeSearchTab() {
      this.visibleTabBackDrop = false;
      this.showSearchTab = false;
      this.topModule = "smallSearch";
    },
    // 打开搜索tab
    openSearchTab() {
      console.log("打开搜索tab");
      this.visibleTabBackDrop = true;
      this.showSearchTab = true;
    },
    // 设置搜索模块
    setModule(module: string) {
      this.module = module;
    },

    setleaseLong(start: string | number, end: string | number) {
      this.filter.lease_long = {
        start: start,
        end: end,
      };
    },
    setKeywords(keyword: string) {
      this.filter.keywords.push(keyword);
    },
    setPriceRange(priceRange: number[]) {
      this.filter.priceRange = {
        min: priceRange[0],
        max: priceRange[1],
      };
    },
    setCategory(category: string[]) {
      this.filter.house_category = category;
      console.log(this.filter.house_category);
    },
  },

  getters: {
    getCityName: (state) => {
      return state.filter.city_name;
    },
    getCityId: (state) => {
      return state.filter.city_id;
    },
    getKeywords: (state) => {
      return state.filter.keywords.join(",");
    },
    getDateTime: (state) => {
      return `${dateFormatYMd(state.filter.lease_long.start)} - ${dateFormatYMd(
        state.filter.lease_long.end
      )}`;
    },
  },
});
