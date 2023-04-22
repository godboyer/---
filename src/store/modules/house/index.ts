import { defineStore } from "pinia";
import { fetchHouseInfo, fetchHouseListByCityId } from "@/service/api/house";

interface HouseStore {
  /**房源信息卡片 */
  HouseCardList: HousePage.CardList[];
  /**房源完整信息列表 */
  HouseList: HouseManagement.House[];
  /**单个房源详情信息 */
  OneHouseDetailInfo: HouseManagement.House | null;
  /**房源数量 */
  houseTotal: number | string;
  /**所在城市 */
  cityName: string;
  /**城市id */
  cityId: string;
  /**分页 */
  pagination: {
    page: number; //当前页数
    pageSize: number; //每页条数
    pageCount: number; //总页数
  };
}

interface HouseResult {
  error: string | null;
  data: HouseManagement.House | null;
}

export const useHouseStore = defineStore("house-store", {
  state: (): HouseStore => {
    return {
      HouseCardList: [],
      HouseList: [],
      OneHouseDetailInfo: null,
      houseTotal: 0,
      cityName: "武汉",
      cityId: "4201",
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 1,
      },
    };
  },

  actions: {
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
    async getOneHouseDetail(id: string) {
      const fetchResult = fetchHouseInfo(id);
      const filterResult: Promise<Service.SuccessResult | HouseResult> =
        new Promise((resolve, reject) => {
          const house = this.HouseList.find((item) => item["_id"] === id);
          if (house) {
            resolve({ error: null, data: house });
          } else {
            resolve({ error: null, data: null });
          }
        });
      const result = await Promise.allSettled([fetchResult, filterResult]);
      result.forEach((item) => {
        if (item.status === "fulfilled" && item.value?.data) {
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
    setHouseList(houseList: HouseManagement.House[]) {
      this.HouseList = houseList;
    },
    /**
     * 通过所在城市获取房源信息
     */
    async GetHouseListByCity() {
      let city_id = "4201" || this.cityId;
      let { error, data } = await fetchHouseListByCityId(city_id);
      if (!error && data) {
        const { houseList } = data as HouseManagement.FetchHouseListData;
        this.HouseList = houseList;
        this.setCardListData(houseList);
        this.setPageCount(data.houseTotal, this.pagination.pageSize);
        this.setCityId(data.city_id);
        this.setCityName(data.city_name);
        this.sethouseTotal(data.houseTotal);
      }
    },
    setCardListData(hosueList: HouseManagement.House[]) {
      let HouseCardList = hosueList.map((item) => {
        return {
          index: item.index,
          key: item.key,
          _id: item._id,
          href: item.href,
          alt: item.alt,
          price: item.price,
          tags: item.tags,
          location: item.location,
          area: item.area,
          title: item.title,
          house_id: item.house_id,
          swiper_pic: item.swiper_pic,
          Homeowner_info: item.owner_id,
          floor: item.floor,
        };
      });
      return HouseCardList;
    },

    /**
     *
     * @param page
     */
    setCurrentPage(page: number) {
      if (page > 0 && page <= this.pagination.pageCount) {
        this.pagination.page = page;
      } else {
        this.pagination.page = 1;
      }
    },
    setPageCount(houseTotal: number, pageSize: number) {
      this.pagination.pageCount = Math.ceil(houseTotal / pageSize);
    },
    /**改变pageCount */
    changePageCount() {
      this.pagination.pageCount = Math.ceil(
        +this.houseTotal / this.pagination.pageSize
      );
    },
    setHouseCardListData(newData: HousePage.CardList[]) {
      this.HouseCardList = newData;
    },
  },
  getters: {
    //获取房主信息
    HomeownerInfo: (state) => {
      return state.OneHouseDetailInfo?.owner_id;
    },
    /**获取房源详情信息 */
    oneHouseInfo: (state) => {
      return state.OneHouseDetailInfo;
    },

    /**判断房源信息列表是否有 */
    isHouseListEmpty(): boolean {
      return this.HouseList.length === 0;
    },
    getHouseCardList(): HousePage.CardList[] {
      return this.HouseCardList;
    },
    /**纯前端分页
     * 分页后的数据 */
    paginatedData(state) {
      const start = (state.pagination.page - 1) * state.pagination.pageSize;
      const end = start + state.pagination.pageSize;

      return state.HouseCardList.slice(start, end);
    },
    pageCount(state) {
      return Math.ceil(state.HouseCardList.length / state.pagination.pageSize);
    },
    //房源数量是否为0
    isHouseTotalEmpty(): boolean {
      return this.HouseList.length === 0;
    },

    /**
     * 获取房源卡片列表
     */
    HouseCardListData: (state) => {
      //考虑到分页，所以这里需要重新获取数据
      let reslutList = [];
      reslutList = state.HouseList.map((item) => {
        return {
          index: item.index,
          key: item.key,
          _id: item._id,
          href: item.href,
          alt: item.alt,
          price: item.price,
          tags: item.tags,
          location: item.location,
          area: item.area,
          title: item.title,
          house_id: item.house_id,
          swiper_pic: item.swiper_pic,
          Homeowner_info: item.owner_id,
          floor: item.floor,
        };
      });
      //分页
      const start = (state.pagination.page - 1) * state.pagination.pageSize;
      const end = start + state.pagination.pageSize;
      return reslutList.slice(start, end);
    },

    /**从房源详情中获取房源卡片信息 */
    HouseCardInfo: (state) => {
      return {
        index: state.OneHouseDetailInfo?.index,
        key: state.OneHouseDetailInfo?.key,
        _id: state.OneHouseDetailInfo?._id,
        href: state.OneHouseDetailInfo?.href,
        alt: state.OneHouseDetailInfo?.alt,
        price: state.OneHouseDetailInfo?.price,
        tags: state.OneHouseDetailInfo?.tags,
        location: state.OneHouseDetailInfo?.location,
        area: state.OneHouseDetailInfo?.area,
        title: state.OneHouseDetailInfo?.title,
        house_id: state.OneHouseDetailInfo?.house_id,
        swiper_pic: state.OneHouseDetailInfo?.swiper_pic,
        Homeowner_info: state.OneHouseDetailInfo?.owner_id,
        floor: state.OneHouseDetailInfo?.floor,
      };
    },
  },
});

export * from "./detail";
export * from "./order";
