import { nextTick } from "vue";
import { defineStore } from "pinia";
import { getAppVar } from "./helpers";
interface AppState {
  /** 重载页面(控制页面的显示) */
  reloadFlag: boolean;
  /** 项目配置的抽屉可见状态 */
  settingDrawerVisible: boolean;
  /** 侧边栏折叠状态 */
  siderCollapse: boolean;
  /** vertical-mix模式下 侧边栏的固定状态 */
  mixSiderFixed: boolean;
  /**设置地图找房 */
  showMapFlag: boolean;
  /**当前访问的页面变量 */
  currentPath: "website" | "admin" | string;
}

export const useAppStore = defineStore("app-store", {
  state: (): AppState => ({
    reloadFlag: true,
    settingDrawerVisible: false,
    siderCollapse: false,
    mixSiderFixed: false,
    showMapFlag: false,
    currentPath: getAppVar("currentPath"),
  }),
  actions: {
    /**
     * 重载页面
     * @param duration - 重载的延迟时间(ms)
     */
    async reloadPage(duration = 0) {
      this.reloadFlag = false;
      await nextTick();
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true;
        }, duration);
      } else {
        this.reloadFlag = true;
      }
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
      }, 100);
    },
    /**改变页面变量 */
    changeCurrentPath(path: "website" | "admin") {
      this.currentPath = path;
      //存储到本地
      localStorage.setItem("currentPath", path);
    },
    /** 打开设置抽屉 */
    openSettingDrawer() {
      this.settingDrawerVisible = true;
    },
    /** 关闭设置抽屉 */
    closeSettingDrawer() {
      this.settingDrawerVisible = false;
    },
    /** 切换抽屉可见状态 */
    toggleSettingDrawerVisible() {
      this.settingDrawerVisible = !this.settingDrawerVisible;
    },
    /** 设置侧边栏折叠状态 */
    setSiderCollapse(collapse: boolean) {
      this.siderCollapse = collapse;
    },
    /** 折叠/展开 侧边栏折叠状态 */
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse;
    },
    /** 设置 vertical-mix模式下 侧边栏的固定状态 */
    setMixSiderIsFixed(isFixed: boolean) {
      this.mixSiderFixed = isFixed;
    },
    /** 设置 vertical-mix模式下 侧边栏的固定状态 */
    toggleMixSiderFixed() {
      this.mixSiderFixed = !this.mixSiderFixed;
    },
    /**关闭或打开地图 */
    toggleShowMapFlag(isShow: boolean) {
      this.showMapFlag = isShow;
    },
  },
});
