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
        <!-- <n-form-item-grid-item :span="12" label="公告ID" path="notice_id">
          <n-input v-model:value="formModel.notice_id" />
        </n-form-item-grid-item> -->
        <n-form-item-grid-item :span="12" label="公告标题" path="notice_title">
          <n-input v-model:value="formModel.notice_title" clearable />
        </n-form-item-grid-item>

        <n-form-item-grid-item
          :span="12"
          label="公告内容"
          path="notice_content"
        >
          <n-input type="textarea" v-model:value="formModel.notice_content" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="状态" path="deleted_state">
          <n-select
            v-model:value="formModel.deleted_state"
            :options="noticeOptions"
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
import {  noticeOptions } from "@/constants";
import { formRules, createRequiredFormRule } from "@/utils";
import { fetchNoticeAdd, fetchNoticeUpdate, NoticeFormModel } from "@/service";

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
  editData?: NoticeManagement.Notice | null;
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
  NoticeManagement.Notice,
  "notice_title" | "notice_content" | "deleted_state"
>;

const formModel = reactive<NoticeFormModel>(createDefaultFormModel());

const rules: Record<keyof NoticeFormModel, FormItemRule | FormItemRule[]> = {
  notice_id: { required: false },
  notice_title: createRequiredFormRule("请输入公告标题"),
  notice_content: createRequiredFormRule("请输入公告内容"),
  deleted_state: createRequiredFormRule("请选择状态"),
};

function createDefaultFormModel(): NoticeFormModel {
  return {
    notice_id: "",
    notice_title: "",
    notice_content: "",
    deleted_state: "1",
  };
}
/**将从props获取的数据填入formModel */
function handleUpdateFormModel(model: Partial<NoticeFormModel>) {
  Object.assign(formModel, model);
}
function updateOrDelteDate() {
  const fetchHandlers: Record<ModalType, () => Promise<boolean>> = {
    add: async () => {
      let { error, data } = await fetchNoticeAdd(formModel);
      if (!error) {
        emit("update-action");
        return true;
      }
      return false;
    },
    edit: async () => {
      const { _id } = props.editData as NoticeManagement.Notice;
      let { error, data } = await fetchNoticeUpdate(_id as string, formModel);
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
