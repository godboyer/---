import { defineStore } from "pinia";
import { fetchSearchHouse } from "@/service";
import { useHouseStore } from "../house";
import { dateFormatYMd } from "@/utils";

interface SearchStore {
  filter: SearchFields;
  showSearchPanel: boolean;
  visibleBackDrop: boolean;
}

interface SearchFields {
  keywords: string[]; //关键字
  address: string; // 区域
  house_category: string; //房源类别
  priceRange: Record<string, any>; //租房价格
  rental_category: string; //租赁类型
  city_id: string; //所在城市
  city_name: string; //所在城市
  decoration_condition: string; //装修情况
  lease_long: Record<string, any>;
  area: string; //面积,
  floor: string; //楼层,
  orientation: string; //朝向,
  decoration: string; //装修,
}

export const useSearchStore = defineStore("search-store", {
  state: (): SearchStore => {
    return {
      filter: {
        keywords: [""],
        address: "-1",
        house_category: "-1",
        priceRange: { min: 0, max: -1 },
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
      visibleBackDrop: false,
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
    closeSearchPanel() {
      this.showSearchPanel = false;
    },
    openSearchPanel() {
      this.showSearchPanel = true;
    },
    closeBackDrop() {
      this.visibleBackDrop = false;
    },
    openBackDrop() {
      this.visibleBackDrop = true;
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
    setPriceRange(priceRange:number[]) {
      this.filter.priceRange = {
        min: priceRange[0],
        max: priceRange[1],
      };
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
