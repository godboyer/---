<template>
  <n-modal
    v-model:show="auth.showLoginModel"
    preset="card"
    :title="activeModule.label"
    :mask-closable="false"
    class="w-565px p-10px"
  >
    <template #header>
      <h2>{{ activeModule.label }}</h2>
      <!-- <p class="m-t-15px text-14px color-#333">未注册的手机号或微信号验证后将自动创建新账号</p> -->
    </template>
    <transition name="fade-slide" mode="out-in" appear>
      <component
        @update-action="changeActiveModule"
        @close-modal="closeLoginModel()"
        :is="activeModule.component"
      />
    </transition>
 
  </n-modal>
</template>

<script setup lang="ts">
import { type Component, computed, ref, shallowRef, watch } from "vue";
import { WebsiteloginModuleLabels } from "@/constants";
import {
  CodeLogin,
  AccLogin,
  Register,
  ResetPwd,
  BindWechat,
} from "./components";
import {useAuthStore} from "@/store";
import { useBoolean } from "@/hooks";

// export interface Props {
//   /** 弹窗可见性 */
//   // moduleValue: boolean;
//   visible: boolean;
// }
defineOptions({ name: "LoginActionModal" });
interface Emits {
  (e: "update:visible", visible: boolean): void;
}
interface LoginModule {
  key: UnionKey.LoginModule;
  label: string;
  component: Component;
}
const emit = defineEmits<Emits>();
const auth = useAuthStore();
const {closeLoginModel} = auth;
const agrementRef = ref<HTMLInputElement | null>(null);

const module = ref<UnionKey.LoginModule>();



const modules: LoginModule[] = [
  {
    key: "code-login",
    label: WebsiteloginModuleLabels["code-login"],
    component: CodeLogin,
  },
  {
    key: "pwd-login",
    label: WebsiteloginModuleLabels["pwd-login"],
    component: AccLogin,
  },
  {
    key: "register",
    label: WebsiteloginModuleLabels.register,
    component: Register,
  },
  {
    key: "reset-pwd",
    label: WebsiteloginModuleLabels["reset-pwd"],
    component: ResetPwd,
  },
  {
    key: "bind-wechat",
    label: WebsiteloginModuleLabels["bind-wechat"],
    component: BindWechat,
  },
];

// 根据props.module创建activeModule
function creatActiveModule(key?: UnionKey.LoginModule) {
  let active: LoginModule = { ...modules[0] };
  if (key) {
    Object.assign(
      active,
      modules.find((item) => item.key === key) as LoginModule
    );
  } 
 
  return active;
}

let activeModule = shallowRef<LoginModule>(creatActiveModule());
function changeActiveModule(key: UnionKey.LoginModule) {
  module.value = key;
  activeModule.value = creatActiveModule(key);
  console.log(agrementRef.value);
  agrementRef.value?.focus();
}
</script>

<style lang="scss" scoped></style>
