<template>
  <n-modal
    v-model:show="modalVisible"
    preset="card"
    :title="title"
    class="w-800px"
  >
    <n-form
      ref="formRef"
      label-placement="left"
      :label-width="100"
      :model="formModel"
      :rules="rules"
    >
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="所在城市" path="city_name">
          <n-input v-model:value="formModel.city_name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item
          :span="12"
          label="房屋类别"
          path="house_category"
        >
          <n-input v-model:value="formModel.house_category" clearable />
        </n-form-item-grid-item>

        <n-form-item-grid-item :span="12" label="地址" path="address">
          <n-input v-model:value="formModel['address']" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="月租费(元/月)" path="price">
          <n-input v-model:value="formModel.price" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="面积/楼层" path="des">
          <n-input v-model:value="formModel.des" />
        </n-form-item-grid-item>
        <!-- <n-form-item-grid-item :span="12" label="房东" path="Homeowner_info">
          <n-input v-model:value="formModel.Homeowner_info" />
        </n-form-item-grid-item> -->

        <n-form-item-grid-item :span="12" label="审核状态" path="exam_status">
          <n-select
            v-model:value="formModel.exam_status"
            :options="examStatusOptions"
          />
        </n-form-item-grid-item>
         <n-form-item-grid-item :span="12" label="出租状态" path="lease_state">
          <n-select
            v-model:value="formModel.lease_state"
            :options="leaseStatusOptions"
          />
        </n-form-item-grid-item>
                 <n-form-item-grid-item :span="12" label="发布状态" path="deleted_state">
          <n-select
            v-model:value="formModel.deleted_state"
            :options="defaultStatusOptions"
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
import { defaultStatusOptions, leaseStatusOptions, examStatusOptions } from "@/constants";
import { formRules, createRequiredFormRule } from "@/utils";
import HouseFetch, { HouseFormModel } from "@/service/api/house";

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
  editData?: HouseManagement.House | null;
}

export type ModalType = NonNullable<Props["type"]>;
const { fetchHouseAddToAdmin, fetchHouseUpdateToAdmin } = new HouseFetch();
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
    add: "添加房源",
    edit: "编辑房源",
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

const formModel = reactive<HouseFormModel>(createDefaultFormModel());

const rules: Record<keyof HouseFormModel, FormItemRule | FormItemRule[]> = {
  city_name: createRequiredFormRule("请输入所在城市"),
  house_category: createRequiredFormRule("请输入房屋类别"),
  address: createRequiredFormRule("请选择地址信息"),
  des: createRequiredFormRule("请输入面积/楼层信息"),
  first_picture: createRequiredFormRule("请输入年龄"),
  Homeowner_info: createRequiredFormRule("请选择用户状态"),
  exam_status: createRequiredFormRule("请选择用户权限"),
  lease_state: createRequiredFormRule("请选择租赁状态"),
  deleted_state: createRequiredFormRule("请选择房屋状态"),
  price:createRequiredFormRule("请输入每月租金"),
};

function createDefaultFormModel(): HouseFormModel {
  return {
    city_name: "",
    house_category: "",
    address: "",
    des: "",
    price: "",
    first_picture: "",
    Homeowner_info: null,
    exam_status: "",
    lease_state: "",
    deleted_state: "",
  };
}
/**将从props获取的数据填入formModel */
function handleUpdateFormModel(model: Partial<HouseFormModel>) {
  Object.assign(formModel, model);
}
function updateOrDelteDate() {
  const fetchHandlers: Record<ModalType, () => Promise<boolean>> = {
    add: async () => {
      let { error, data } = await fetchHouseAddToAdmin(formModel);
      if (!error) {
        emit("update-action");
        return true;
      }
      return false;
    },
    edit: async () => {
      const { _id } = props.editData as HouseManagement.House;
      let { error, data } = await fetchHouseUpdateToAdmin(
        _id as string,
        formModel
      );
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
