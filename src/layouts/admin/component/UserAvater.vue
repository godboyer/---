<template>
  <div class="user-ava">
    <n-upload
      action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
      :headers="{
        'naive-info': 'hello!',
      }"
      :data="{
        'naive-data': 'cool! naive!',
      }"
    >
      <n-avatar
        round
        size="large"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </n-upload>
    <n-dropdown :options="options">
      <n-button>用户资料</n-button>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { h, defineComponent, ref, Component } from "vue";
import { NIcon } from "naive-ui";
import { useMessage } from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const options = [
  {
    label: "用户资料",
    key: "profile",
    icon: renderIcon(UserIcon),
  },
  {
    label: "编辑用户资料",
    key: "editProfile",
    icon: renderIcon(EditIcon),
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
];
</script>

<style lang="scss" scoped>
.user-ava {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.n-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  .n-upload-trigger {
    span {
      display: flex;
      align-items: center;
    }
  }
}
</style>
