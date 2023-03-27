<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="城市编号" path="user_status">
            <n-input v-model:value="formModel.city_id" />
          <n-select v-model:value="formModel.city_id" :options="userStatusOptions" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="城市名称" path="username">
          <n-dropdown trigger="click" :options="dropoptions" >
            <n-input v-model:value="formModel.city_name" />

          </n-dropdown>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="状态" path="age">
          <n-input v-model:value="formModel.deleted_state" clearable />
        </n-form-item-grid-item>

      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">取消</n-button>
        <n-button class="w-72px" type="primary" @click="handleSubmit">确定</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import type { FormInst, FormItemRule } from "naive-ui";
import { genderOptions, userStatusOptions, userRoleOptions } from "@/constants";
import { formRules, createRequiredFormRule } from "@/utils";
import { fetchCityAdd, fetchCityUpdate } from "@/service";

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
  editData?: CityManagement.City | null;
}




export type ModalType = NonNullable<Props["type"]>;
const dropoptions = [
        {
          label: '滨海湾金沙，新加坡',
          key: 'marina bay sands',
          disabled: true
        },
        {
          label: '布朗酒店，伦敦',
          key: "brown's hotel, london"
        },
        {
          label: '亚特兰蒂斯巴哈马，拿骚',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: '比佛利山庄酒店，洛杉矶',
          key: 'the beverly hills hotel, los angeles'
        }
      ]
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
    add: "添加城市",
    edit: "编辑城市",
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<
  CityManagement.City,
  | "city_id"
  | "city_name"
  | "deleted_state"

>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  city_id: createRequiredFormRule("请输入用户名"),
  deleted_state: createRequiredFormRule("请输入年龄"),
  city_name: createRequiredFormRule("请选择性别"),

};

function createDefaultFormModel(): FormModel {
  return {
    city_id: "",
    deleted_state: '',
    city_name: '',

  };
}
/**将从props获取的数据填入formModel */
function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}
function updateOrDelteDate() {
  const fetchHandlers: Record<ModalType, () => Promise<boolean>> = {
    add: async () => {
      let { error} = await fetchCityAdd(formModel);
      // console.log("error: ", error);
      if (!error) {
        emit("update-action");
        return true;
      }
      return false;
    },
    edit: async () => {
      const { _id } = props.editData as CityManagement.City;
      let { error } = await fetchCityUpdate(_id as string, formModel);
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
  // console.log('flag: ', flag);

  if (flag) {
    window.$message?.success("新增成功!");
    closeModal();
  }
}

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      // console.log("newValue: ", newValue);

      handleUpdateFormModelByModalType();
    }
  }
);
</script>

<style scoped></style>
