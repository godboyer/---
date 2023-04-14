import { defineStore } from "pinia";
import { Component } from "vue";
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


// storeToRefs
interface PublishStore {

    /**保存当前页面 */
    saveCurrentPage: PublishModule;
    /**保存当前页面填写的内容 */
    CurrentPageContent: HouseManagement.HouseInfo;



 }





export const usePublishStore = defineStore("publish-store", {
  state: () => ({}),

  actions: {},
  getters: {},
});
