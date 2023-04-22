import { defineStore } from "pinia";
import {
  fetchFeedbackList,
  fetchFeedbackAdd,
  fetchFeedbackUpdate,
  fetchFeedbackDel,
} from "@/service";
import { getUserId } from "@/store/modules/auth/helpers";
interface FeedbackState {
  feedbackList: FeedbackManagement.Feedback[];
  feedbackTotal: number;
  /**单个反馈信息 */
  feedbackInfo: FeedbackManagement.FeedbackInfo;
}

export const useFeedbackStore = defineStore("feedback-store", {
  state: (): FeedbackState => ({
    feedbackList: [],
    feedbackTotal: 0,
    feedbackInfo: {
      content: "",
      user_id: getUserId(),
      feedback_type: "other",
      email: "qweqwe",
      phone: "",
      status: "2",
      images: [],
      video: {
        fieldname: "",
        originalname: "string",
        encoding: "string",
        mimetype: "string",
        destination: "string",
        filename: "string",
        path: "string",
        size: 0,
        servicePath: "string",
      },
      createAt: Date.now().toString(),
    },
  }),
  getters: {
    getFeedbackList: (state) => {
      return state.feedbackList;
    },
    getFeedbackInfo: (state) => {
      return state.feedbackInfo;
    },
    feedbackEmail: (state) => {
      return state.feedbackInfo.email;
    },
  },
  actions: {
    resetFeedbackPageState() {},
    setFeedbackListData(data: any) {
      this.feedbackList = data;
    },
    setFeedbackInfo(data: any) {
      this.feedbackInfo = data;
    },
    /**push上传后的图片路径 */
    setFeedbackPushImg(imgPath: ApiFeedbackManagement.ImgInfo) {
      this.feedbackInfo.images?.push(imgPath);
    },

    /**设置视频信息 */
    setFeedbackVideoInfo(videoInfo: ApiFeedbackManagement.VideoInfo) {
      this.feedbackInfo.video = videoInfo;
    },
    async fetchFeedbackListHandle() {
      let { error, data } = await fetchFeedbackList();
      if (!error && data) {
        this.setFeedbackListData(data);
      }
    },
    async fetchFeedbackAddHandle() {
      let params = this.feedbackInfo;
      let { error } = await fetchFeedbackAdd(params);
      if (!error) {
        this.fetchFeedbackListHandle();
      }
    },
    async fetchFeedbackUpdateHandle(_id: string, data: any) {
      let { error } = await fetchFeedbackUpdate(_id, data);
      if (!error) {
        this.fetchFeedbackListHandle();
      }
    },
    async fetchFeedbackDelHandle(_id: any) {
      let { error } = await fetchFeedbackDel(_id);
      if (!error) {
        this.fetchFeedbackListHandle();
      }
    },
  },
});
