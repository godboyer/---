import { defineStore } from "pinia";
import { fetchSearchHouse } from "@/service";
import { useHouseStore } from "../house";
import { dateFormatYMd, isArray } from "@/utils";
import pinyin from "pinyin";
import { storeToRefs } from "pinia";

interface SearchStore {
  filter: SearchFields; //搜索条件
  showSearchPanel: boolean; //搜索面板
  visibleBackDrop: boolean; //搜索面板遮罩层
  showSearchTab: boolean; //搜索tab
  visibleTabBackDrop: boolean; //搜索tab遮罩层
  module: string; //搜索模块
  topModule: string; //搜索模块
  searchHouseList: HousePage.CardList[]; //搜索房源列表
}

interface SearchFields {
  keywords: string[]; //关键字
  priceRange: Record<string, any>; //租房价格
  rental_category: string; //租赁类型
  city_id: string; //所在城市
  city_name: string; //所在城市
  area?: string; //面积,
  floor?: string; //楼层,
  orientation: string; //朝向,
}

export const useSearchStore = defineStore("search-store", {
  state: (): SearchStore => {
    return {
      filter: {
        keywords: [""],
        priceRange: { min: 100, max: 8000 },
        rental_category: "-1",
        city_id: "4201",
        city_name: "武汉",
        area: "-1",
        floor: "-1",
        orientation: "-1",
      },
      searchHouseList: [],
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
     * 掉取搜索房源接口
     * @param params 搜索条件  
     */
    async handleFetchSearchHouse() {
      const { pagination } = storeToRefs(useHouseStore());
      let params = {
        city_id: this.filter.city_id, //城市id
        city_name: this.filter.city_name, //城市名称
        keywords: this.getKeywordsPinyin, //关键字
        ...pagination.value,
      };
      console.log(params);

      let { error, data } = await fetchSearchHouse(params);
      if (!error && data) {
        const {
          setHouseList,
          setCityName,
          sethouseTotal,
          setPageCount,
          setCityId,
          pagination,
        } = useHouseStore();
        const { houseList, city_id, city_name, houseTotal } = data 
        setHouseList(houseList);
        setCityName(city_name);
        setCityId(city_id);
        sethouseTotal(houseTotal);
        setPageCount(houseTotal, pagination.pageSize);
          

      }
    },
    //搜索成功后，操作
    AfterSearchSuccessful() {
      this.closeSearchTab();
      this.closeSearchPanel();
      //提示搜索成功
      window.$message?.success("搜索成功");
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
      this.visibleTabBackDrop = true;
      this.showSearchTab = true;
    },
    // 设置搜索模块
    setModule(module: string) {
      this.module = module;
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
  },

  getters: {
    getCityName: (state) => {
      return state.filter.city_name;
    },
    getCityId: (state) => {
      return state.filter.city_id;
    },
    getKeywords: (state) => {
      return state.filter.keywords.join("");
    },

    getFilterData: (state) => {
      return state.filter;
    },
    getKeywordsPinyin: (state) => {
      if (isArray(state.filter.keywords) && state.filter.keywords.length > 0) {
        return pinyin(state.filter.keywords.join(""), {
          style: pinyin.STYLE_NORMAL,
        }).join(".*");
      } else {
        return "";
      }
    },
    isHouseTotalEmpty: (state) => {
      return state.searchHouseList.length === 0;
    }

  },
});
