<template>
  <div class="h-full overflow-hidden">
    <n-card title="用户管理" :bordered="false" class="rounded-16px shadow-sm">
      <n-space class="pb-12px" justify="space-between">
        <n-space>
          <n-button type="primary" @click="handleAddTable">
            <icon-ic-round-plus class="mr-4px text-20px" />
            新增
          </n-button>
          <n-button type="error">
            <icon-ic-round-delete class="mr-4px text-20px" />
            删除
          </n-button>
          <n-button type="success">
            <icon-uil:export class="mr-4px text-20px" />
            导出Excel
          </n-button>
        </n-space>
        <n-space align="center" :size="18">
          <n-button size="small" type="primary" @click="getTableData">
            <icon-mdi-refresh
              class="mr-4px text-16px"
              :class="{ 'animate-spin': loading }"
            />
            刷新表格
          </n-button>
          <column-setting v-model:columns="columns" />
        </n-space>
      </n-space>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
      />
      <table-action-modal
        v-model:visible="visible"
        :type="modalType"
        :edit-data="editData"
        @update-action="getTableData"
      />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from "vue";
import type { Ref } from "vue";
import { NButton, NPopconfirm, NSpace, NTag } from "naive-ui";
import type { DataTableColumns, PaginationProps } from "naive-ui";
import { genderLabels, userStatusLabels } from "@/constants";
import { fetchUserDEL, fetchUserList } from "@/service";
import { useBoolean, useLoading } from "@/hooks";
import TableActionModal from "./components/table-action-modal.vue";
import type { ModalType } from "./components/table-action-modal.vue";
import ColumnSetting from "./components/column-setting.vue";

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const tableData = ref<UserManagement.User[]>([]);
function setTableData(data: UserManagement.User[]) {
  tableData.value = data;
}

async function getTableData() {
  startLoading();
  const { data } = await fetchUserList();
  if (data) {
    setTimeout(() => {
      setTableData(data);
      endLoading();
    }, 1000);
  }
}

const columns: Ref<DataTableColumns<UserManagement.User>> = ref([
  {
    type: "selection",
    align: "center",
  },
  {
    key: "index",
    title: "序号",
    align: "center",
  },
  {
    key: "username",
    title: "用户名",
    align: "center",
  },
  {
    key: "age",
    title: "用户年龄",
    align: "center",
  },
  {
    key: "gender",
    title: "性别",
    align: "center",
    render: (row) => {
      if (row.gender) {
        const tagTypes: Record<UserManagement.GenderKey, NaiveUI.ThemeColor> = {
          "0": "success",
          "1": "warning",
        };

        return (
          <NTag type={tagTypes[row.gender]}>{genderLabels[row.gender]}</NTag>
        );
      }

      return <span></span>;
    },
  },
  {
    key: "phone",
    title: "手机号码",
    align: "center",
  },
  {
    key: "email",
    title: "邮箱",
    align: "center",
  },
  {
    key: "role_permission",
    title: "用户类型",
    align: "center",
  },
  {
    key: "user_status",
    title: "状态",
    align: "center",
    render: (row) => {
      if (row.user_status) {
        const tagTypes: Record<
          UserManagement.UserStatusKey,
          NaiveUI.ThemeColor
        > = {
          "1": "success",
          "2": "error",
          "3": "warning",
          "4": "default",
        };

        return (
          <NTag type={tagTypes[row.user_status]}>
            {userStatusLabels[row.user_status]}
          </NTag>
        );
      }
      return <span></span>;
    },
  },
  {
    key: "actions",
    title: "操作",
    align: "center",
    render: (row) => {
      return (
        <NSpace justify={"center"}>
          <NButton size={"small"} onClick={() => handleEditTable(row.user_id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.user_id)}>
            {{
              default: () => "确认删除",
              trigger: () => <NButton size={"small"}>删除</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      );
    },
  },
]) as Ref<DataTableColumns<UserManagement.User>>;

const modalType = ref<ModalType>("add");

function setModalType(type: ModalType) {
  modalType.value = type;
}

let editData = reactive<UserManagement.User>(createDefaultEditData());
function createDefaultEditData(): UserManagement.User {
  return {
    _id: null,
    index: null,
    key: null,
    /** 用户id */
    user_id: null,
    /**用户状态 */
    user_status: null,
    /** 用户名 */
    username: null,
    gender: null,
    age: null,
    /**手机号 */
    phone: null,
    email: null,
    /** 用户头像 */
    avatar: null,
    /** 用户角色类型 */
    role_permission: null,
    createtime: null,
  };
}
/**
 * 设置需要操作的数据的函数
 * @param   data  需要操作的数据
 */
function setEditData(data: UserManagement.User | null) {
  Object.assign(editData, createDefaultEditData(), data);
}

/**
 * 打开添加表格
 */
function handleAddTable() {
  openModal();
  setModalType("add");
}
/**
 * 打开编辑表格
 * @param rowId 当前列的key值即user_id的值
 */
function handleEditTable(rowId: string | null) {
  //可能存在没有的变量的值
  const findItem = tableData.value.find((item) => item.user_id === rowId);

  if (findItem) {
    setEditData(findItem);
  }
  setModalType("edit");
  openModal();
}

async function handleDeleteTable(rowId: string | null) {

  let {error,data} = await  fetchUserDEL(rowId as string);
  if (!error) {
    getTableData()
    window.$message?.info("删除成功");
  }
}

const pagination: PaginationProps = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20, 25, 30],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
});

function init() {
  getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
