import { defineStore } from "pinia";
import { Component } from "vue";
import {
  publishOne,
  publishTwo,
  publishThr,
  publishHome,
} from "@/pages/website/publishpage/components";
import { type DynamicTagsOption } from "naive-ui";
import { dynamicTagsValueDefalut } from "./helper";
import { fetchAddPublishHouse } from "@/service";

export interface PublishModule {
  key: string;
  label: string;
  component: Component;
  /**进度 */
  progress: number;
  /**是否是最后一个 */
  isLast?: boolean;
  /**左按钮文本 */
  leftBtnText?: string;
  /**右按钮文本 */
  rightBtnText?: string;
}
interface MyDynamicTagsOption extends DynamicTagsOption {
  checked: boolean;
}

// storeToRefs
interface PublishStore {
  /**保存当前页面 */
  saveCurrentPage: PublishModule;
  /**保存当前页面填写的内容 */
  CurrentPageContent: HousePublishManagement.PublishHouseInfo;
  /**标签 */
  dynamicTagsValue: MyDynamicTagsOption[];
  /** 其它表单配置 */
}

export const usePublishStore = defineStore("publish-store", {
  state: (): PublishStore => ({
    saveCurrentPage: {
      key: "home",
      label: "房源信息",
      component: publishHome,
      progress: 0,
    },
    CurrentPageContent: {
      realName: "",
      title: "",
      price: null,
      deposit: null,
      area: null,
      rental_category: "",
      user_id: "",
      house_category: "",
      address: "",
      city_id: "",
      create_time: Date.now(),
      decoration_condition: "",
      exam_status: "",
      first_picture: "",
      house_description: "",
      location: "",
      city_name: "",
      swiper_pic: [],
      tags: [],
      video: null,
      floor: null,
      total_floor: null,
      bedroom: "",
      living_room: "",
      elevator: "",
      facilities: [],
      point: {} as BMap.Point,
    },
    dynamicTagsValue: dynamicTagsValueDefalut,
  }),

  actions: {
    /**设置动态标签的值 */
    setDynamicTagsValue(index: number, val: boolean) {
      this.dynamicTagsValue[index].checked = val;
    },
    /**设置当前页面 */
    setCurrentPage(page: PublishModule) {
      this.saveCurrentPage = page;
    },
    /**保存当前填写的发布房源信息 */
    saveCurrentPageContent(content: HousePublishManagement.PublishHouseInfo) {
      this.CurrentPageContent = content;
      this.$patch({});
    },
    setVideoUrl(video: ApiUpload.VideoInfo) {
      this.CurrentPageContent.video = video.servicePath;
    },
    setPushSwiperPic(image: ApiUpload.ImgInfo) {
      this.CurrentPageContent.swiper_pic?.push(image.servicePath);
      this.setFirstPicture();
    },
    deleteSwiperPic(filename: string) {
      let index = this.CurrentPageContent.swiper_pic?.findIndex((item) =>
        item.endsWith(filename)
      );
      if (index !== -1 && index !== undefined) {
        this.CurrentPageContent.swiper_pic?.splice(index, 1);
        this.setFirstPicture();
        return true;
      }
      return false;
    },
    setTags(tags: MyDynamicTagsOption[]) {
      this.CurrentPageContent.tags = tags;
    },
    setFacilities(payload: MyDynamicTagsOption[]) {
      this.CurrentPageContent.facilities = payload;
    },
    setLocation(location: string) {
      this.CurrentPageContent.location = location;
    },
    setFirstPicture() {
      if (
        this.CurrentPageContent.swiper_pic &&
        this.CurrentPageContent.swiper_pic.length > 0
      ) {
        this.CurrentPageContent.first_picture =
          this.CurrentPageContent.swiper_pic[0];
      }
    },
    setAddress(address: string) {
      this.CurrentPageContent.address = address;
    },
    setPoint(point: BMap.Point) {
      this.CurrentPageContent.point = point;
    },
    setCityId(cityId: string) {
      this.CurrentPageContent.city_id = cityId;
    },

    /**发布房源信息 */
    async publishHouseHandler() {
      //参数
      let params = {
        ...this.CurrentPageContent,
        arae: this.CurrentPageContent.area + 'm²',
      };
      let { error, data } = await fetchAddPublishHouse(params);
      if (!error && data) {
        window.$dialog?.success({
          title: "发布成功",
          content: "发布成功",
        });
        return true;
      } else {
        window.$dialog?.error({
          title: "发布失败",
          content: "发布失败",
        });
        return false;
      }
    },
  },
  getters: {
    getSwiperPic: (state) => {
      if (
        state.CurrentPageContent.swiper_pic &&
        state.CurrentPageContent.swiper_pic.length > 0
      ) {
        return state.CurrentPageContent.swiper_pic;
      } else {
        return null;
      }
    },
  },
});
