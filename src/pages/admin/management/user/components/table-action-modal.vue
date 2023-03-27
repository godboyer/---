<template>
  <n-modal
    v-model:show="modalVisible"
    preset="card"
    :title="title"
    class="w-700px"
  >
    <n-form
      ref="formRef"
      label-placement="left"
      :label-width="80"
      :model="formModel"
      :rules="rules"
    >
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="用户名" path="username">
          <n-input v-model:value="formModel.username" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="年龄" path="age">
          <n-input-number v-model:value="formModel.age" clearable />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="性别" path="gender">
          <n-radio-group v-model:value="formModel.gender">
            <n-radio
              v-for="item in genderOptions"
              :key="item.value"
              :value="item.value"
              >{{ item.label }}</n-radio
            >
          </n-radio-group>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="手机号" path="phone">
          <n-input-number v-model:value="formModel.phone" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="邮箱" path="email">
          <n-input v-model:value="formModel.email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="状态" path="user_status">
          <n-select
            v-model:value="formModel.user_status"
            :options="userStatusOptions"
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="权限" path="role_permission">
          <n-select
            v-model:value="formModel.role_permission"
            :options="userRoleOptions"
          />
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">取消</n-button>
        <n-button class="w-72px" type="primary" @click="handleSubmit"
          >确定</n-button
        >
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import type { FormInst, FormItemRule } from "naive-ui";
import { genderOptions, userStatusOptions, userRoleOptions } from "@/constants";
import { formRules, createRequiredFormRule } from "@/utils";
import { fetchUserAdd, fetchUserUpdate } from "@/service";

export interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /**
   * 弹窗类型
   * add: 新增
   * edit: 编辑
   */
  type?: "add" | "edit";
  /** 编辑的表格行数据 */
  editData?: UserManagement.User | null;
}

export type ModalType = NonNullable<Props["type"]>;

defineOptions({ name: "TableActionModal" });

const props = withDefaults(defineProps<Props>(), {
  type: "add",
  editData: null,
});

interface Emits {
  (e: "update:visible", visible: boolean): void;
  (e: "update-action"): void;
}

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit("update:visible", visible);
  },
});
const closeModal = () => {
  modalVisible.value = false;
};

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: "添加用户",
    edit: "编辑用户",
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<
  UserManagement.User,
  | "username"
  | "age"
  | "gender"
  | "phone"
  | "email"
  | "user_status"
  | "role_permission"
>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  username: createRequiredFormRule("请输入用户名"),
  age: createRequiredFormRule("请输入年龄"),
  gender: createRequiredFormRule("请选择性别"),
  phone: formRules.phone,
  email: formRules.email,
  user_status: createRequiredFormRule("请选择用户状态"),
  role_permission: createRequiredFormRule("请选择用户权限"),
};

function createDefaultFormModel(): FormModel {
  return {
    username: "",
    age: null,
    gender: null,
    phone: null,
    email: null,
    user_status: null,
    role_permission: "",
  };
}
/**将从props获取的数据填入formModel */
function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}
function updateOrDelteDate() {
  const fetchHandlers: Record<ModalType, () => Promise<boolean>> = {
    add: async () => {
      let { error, data } = await fetchUserAdd(formModel);
      if (!error) {
        emit("update-action");
        return true;
      }
      return false;
    },
    edit: async () => {
      const { _id } = props.editData as UserManagement.User;
      let { error, data } = await fetchUserUpdate(_id as string, formModel);
      if (!error) {
        emit("update-action");
        return true;
      }
      return false;
    },
  };
 return fetchHandlers[props.type]();
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    },
  };

  handlers[props.type]();
}

async function handleSubmit() {
  await formRef.value?.validate();
  //调用数据修改的函数
  let flag = await updateOrDelteDate();

  if (flag) {
    window.$message?.success("新增成功!");
    closeModal();
  }
}

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {

      handleUpdateFormModelByModalType();
    }
  }
);
</script>

<style scoped></style>
