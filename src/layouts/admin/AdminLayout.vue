<template>
  <div class="common-layout">
    <n-layout has-sider>
      <n-layout-sider
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
      >
        <logoTitle />
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="25"
          :options="menuOptions"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-header>
          <n-page-header subtitle="让你的听觉更懂视觉" @back="handleBack">
            <template #title> </template>
            <template #header> 头</template>
            <template #avatar> </template>
            <template #extra> <UserAvater /></template>
            <template #footer> 脚步</template>
          </n-page-header>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <router-view></router-view>
        </n-layout-content>
        <n-layout-footer> 尾部 </n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { h, defineComponent, ref, Component } from "vue";
import { MenuOption, NIcon } from "naive-ui";
import { useMessage } from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";
import UserAvater from "./component/UserAvater.vue";
import { useRouter } from "vue-router";
import logoTitle from "./component/LogoTitle.vue";
defineOptions({ name: 'AdminLayout' });
const router = useRouter();
const message = useMessage();
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
function handleBack() {
  message.info("[onBack]");
  router.back();
}

function transformKeyToRoute(str: string) {
  // 将字符串转换为小写
  str = str.toLowerCase();

  // 将字符串按照 "-" 分割成数组
  const arr = str.split("-");

  // 将数组中的元素用 "/" 连接起来，并在开头添加 "/admin"
  const route = "/admin/" + arr.join("/");

  return route;
}

function handleUpdateValue(key: string, item: MenuOption) {
  router.push(transformKeyToRoute(key));
  message.info("[onUpdate:value]: " + JSON.stringify(key));
  message.info("[onUpdate:value]: " + JSON.stringify(item));
}
const menuOptions = [
  {
    label: "首页",
    key: "home",
    icon: renderIcon(BookIcon),
  },
  {
    label: "用户管理",
    key: "user",
    icon: renderIcon(BookIcon),
    
  },
  {
    label: "城市管理",
    key: "city",
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "城市列表",
        key: "city-list",
      },
    ],
  },
  {
    label: "房屋租赁管理",
    key: "houselease",
    disabled: false,
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "房屋租赁列表",
        key: "houselease-list",
      },
    ],
  },
  {
    label: "房源管理",
    key: "houseInfo",
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "房源信息列表",
        key: "houseInfo-list",
      },
    ],
  },
  {
    label: "房源评价管理",
    key: "houseComment",
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "房源评价列表",
        key: "houseComment-list",
        icon: renderIcon(WineIcon),
      },
    ],
  },
  {
    label: "公告管理",
    key: "notice",
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "公告列表",
        key: "notice-list",
        icon: renderIcon(WineIcon),
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  .n-layout.n-layout--static-positioned {
    height: 100%;
  }
  .n-layout-header,
  .n-layout-footer {
    background: rgba(128, 128, 128, 0.2);
    padding: 24px;
  }

  .n-layout-sider {
    background: rgba(128, 128, 128, 0.3);
  }

  .n-layout-content {
    padding: 12px;
    border-radius: 12px;
    background: #fff;
    background-clip: content-box;
  }
}
</style>
