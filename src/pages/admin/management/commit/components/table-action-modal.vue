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
        <!-- <n-form-item-grid-item :span="12" label="用户名" path="username">
          <n-input v-model:value="formModel.user_id" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="房屋名称" path="house_title">
          <n-input v-model:value="formModel.house_id" clearable />
        </n-form-item-grid-item> -->
        <n-form-item-grid-item :span="12" label="评论内容" path="content">
          <n-input v-model:value="formModel.content" clearable />
        </n-form-item-grid-item>
    
        <n-form-item-grid-item :span="12" label="状态" path="deleted_state">
          <n-select
            v-model:value="formModel.deleted_state"
            :options="userStatusOptions"
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="创建时间" path="create_time">
          <n-select
            v-model:value="formModel.create_time"
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
import { fetchCommentAdd, fetchCommentUpdate } from "@/service";

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
  editData?: CommentManagement.Comment | null;
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
    add: "添加评论",
    edit: "编辑评论",
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<
  CommentManagement.Comment,

  | "content"
  | "deleted_state"
  | "create_time"
>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
 
  content: createRequiredFormRule("请输入评论内容"),
  deleted_state: createRequiredFormRule("请输入评论状态"),
  create_time: createRequiredFormRule("请选择创建时间"),
};

function createDefaultFormModel(): FormModel {
  return {
  
    content: '',
    deleted_state: '1',
    create_time: '',
  };
}
/**将从props获取的数据填入formModel */
function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}
function updateOrDelteDate() {
  const fetchHandlers: Record<ModalType, () => Promise<boolean>> = {
    add: async () => {
      let { error, data } = await fetchCommentAdd(formModel);
      // console.log("error: ", error);
      if (!error) {
        emit("update-action");
        return true;
      }
      return false;
    },
    edit: async () => {
      const { comment_id } = props.editData as CommentManagement.Comment;
      let { error, data } = await fetchCommentUpdate(comment_id as string, formModel);
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
