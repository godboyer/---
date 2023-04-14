<template>
  <div class="h-10.5 flex-y-center justify-between">
    <n-dropdown
      class="w-300px text-center b-rd-15px"
      size="large"
      :options="options"
      @select="handleSelect"
    >
      <div class="login-button hover-bg b-2">
        <icon-ic:twotone-menu class="text-42px" />
        <upload-avatar class="flex-y-center">
          <template #avatar="{ avatarUrl }">
            <n-avatar round :size="42" :src="avatarUrl || avatar" />
          </template>
        </upload-avatar>
      </div>
    </n-dropdown>
    <LoginActionModal />
  </div>
</template>

<script setup lang="ts">
import { useRouterPush } from "@/composables";
import { useAuthStore } from "@/store";
import LoginActionModal from "@/pages/website/loginmodel/index.vue";
import { computed, ref } from "vue";
import { url } from "@/service/request";
import UploadAvatar from "@/components/common/uploadAvatar.vue";

defineOptions({ name: "userMenu" });
const auth = useAuthStore();
const { openLoginModel } = useAuthStore();
const { routerPush,toAdminHome,toPublish } = useRouterPush();
let options = computed(() => {
  return auth.getMenuList();
});

const avatar = computed(() => {
  return (
    auth.userInfo.avatar?.replace(/public/, url.replace(/\/api/, "")) ||
    "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  );
});

const handleSelect = function (key: string | number) {
  console.log(key);
  switch (key) {
    case "publish":
      if (auth.isLogin) {
      toPublish();
      } else {
        openLoginModel();
      }

      break;
    case "login":
      openLoginModel();

      break;
    case "personal":
      if (auth.isLogin) {
        routerPush("/personal/userinfo");
      } else {
        openLoginModel();
      }
      break;
    case "logout":
      auth.logout();
      break;
    case "feedback":
    routerPush("/feedback");
      break;
    case "admin":
      toAdminHome(true);
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
.hover-bg {
  transition: 0.3s;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
}

.login-button {
  width: 120px;
  height: 50px;
  border-radius: 25px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  padding: 6px 2px;
  box-sizing: border-box;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
