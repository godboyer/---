import { defineStore } from "pinia";
import {
  fetchNoticeList,
  fetchNoticeAdd,
  fetchNoticeUpdate,
  fetchNoticeDel,
  NoticeFormModel,
} from "@/service";

interface NoticeStore {
  /**公告信息卡片 */
  noticeList: NoticeManagement.Notice[];
  /**公告数量 */
  noticeTotal: number | string;
}

export const useNoticeStore = defineStore("notice-store", {
  state: (): NoticeStore => {
    return {
      noticeList: [],
      noticeTotal: 0,
    };
  },
  getters: {
    getNoticeList(state) {
      return state.noticeList;
    },
  },
  actions: {
    resetNoticePageState() {},

    setNoticeListData(data: NoticeManagement.Notice[]) {
      this.noticeList = data;
    },
    /**获取公告列表 */
    async fetchNoticeListHandle() {
      let { error, data } = await fetchNoticeList();
      if (!error && data) {
        this.setNoticeListData(data);
      }
    },
    /**添加公告 */
    async fetchNoticeAddHandle(params: NoticeManagement.NoticeInfo) {
      let { error } = await fetchNoticeAdd(params);
      if (!error) {
        this.fetchNoticeListHandle();
      }
    },
    /**修改公告 */
    async fetchNoticeUpdateHandle(_id: string, data: NoticeFormModel) {
      let { error } = await fetchNoticeUpdate(_id, data);
      if (!error) {
        this.fetchNoticeListHandle();
      }
    },
    /**删除公告 */
    async fetchNoticeDelHandle(_id: string) {
      let { error } = await fetchNoticeDel(_id);
      if (!error) {
        this.fetchNoticeListHandle();
      }
    },
  },
});
