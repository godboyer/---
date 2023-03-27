<template>
  <n-modal
    v-model:show="modalVisible"
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
        @close-modal="closeModal"
        :is="activeModule.component"
      />
    </transition>
    <!-- <template #action>
      <n-popover placement="top-start" trigger="focus">
        <template #trigger>
            <div ref="agrementRef">

              <Login-agreement  v-model:value="agreement" />
            </div>
        </template>

        请先阅读隐私政策!
      </n-popover>
    </template> -->
  </n-modal>
</template>

<script setup lang="ts">
import {
  type Component,
  computed,
  ref,
  onMounted,
  markRaw,
  reactive,
  shallowRef,
  onUpdated,
  unref,
toRefs,
} from "vue";
import { WebsiteloginModuleLabels } from "@/constants";
import {
  CodeLogin,
  AccLogin,
  Register,
  ResetPwd,
  BindWechat,
} from "@/pages/login/component/index";

export interface Props {
  /** 弹窗可见性 */
  visible: boolean;

  /** 登录模块分类 */
  module: UnionKey.LoginModule;
}
defineOptions({ name: "LoginActionModal" });
interface Emits {
  (e: "update:visible", visible: boolean): void;
}
interface LoginModule {
  key: UnionKey.LoginModule;
  label: string;
  component: Component;
}
const agreement = ref(false);
const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  module: "code-login",
});
const agrementRef = ref<HTMLInputElement | null>(null)


const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit("update:visible", visible);
  },
});

const module = ref<UnionKey.LoginModule>();

const closeModal = () => {
  modalVisible.value = false;
};

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
  } else {
    active = modules.find((item) => item.key === props.module) as LoginModule;
  }
  return active;
}

let activeModule = shallowRef<LoginModule>(creatActiveModule());
function changeActiveModule(key: UnionKey.LoginModule) {
  module.value = key;
  activeModule.value = creatActiveModule(key);
  console.log(agrementRef.value);
  agrementRef.value?.focus()
}
</script>

<style lang="scss" scoped></style>
