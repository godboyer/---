<template>
  <div class="h-full overflow-hidden">
    <n-card
      title="房源评价管理"
      :bordered="false"
      class="rounded-16px shadow-sm"
    >
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
          <export-excel
            :table-data="tableData"
            :columns="columns"
            :checked-row-keys="checkedRowKeysRef"
          />
        </n-space>
        <n-space align="center" :size="18">
          <n-button size="small" type="primary" @click="createTable">
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
        :max-height="800"
        @update:checked-row-keys="handleCheckRowKeys"
      />
      <table-action-modal
        v-model:visible="visible"
        :type="modalType"
        :edit-data="editData"
        @update-action="createTable"
      />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from "vue";
import type { Ref } from "vue";
import {
  DataTableColumn,
  DataTableRowKey,
  NButton,
  NPopconfirm,
  NSpace,
  NTag,
} from "naive-ui";
import type { DataTableColumns, PaginationProps } from "naive-ui";
import {
  commentStatusLabels,
  genderLabels,
  userStatusLabels,
} from "@/constants";
import { fetchCommentDel, fetchCommentList } from "@/service";
import { useTable } from "@/hooks";
import TableActionModal from "./components/table-action-modal.vue";
import ColumnSetting from "@/pages/admin/component/column-setting.vue";
import dayjs from "dayjs";
import ExportExcel from "@/pages/admin/component/exportExcel.vue";
import { createColumn, renderBaseAction } from "@/utils";
const tableName = ref("comment");

const {
  tableData,
  pagination,
  handleAddTable,
  checkedRowKeysRef,
  handleCheckRowKeys,
  loading,
  createTable,
  handleEditTable,
  modalType,
  visible,
  editData,
  createDefaultEditData,
} = useTable<CommentManagement.Comment>(tableName);


const columns: Ref<DataTableColumns<CommentManagement.Comment>> = ref([
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
    key: "comment_id",
    title: "评论ID",
    align: "center",
  },
  {
    key: "house_title",
    title: "房屋名称",
    align: "center",
  },
  {
    key: "username",
    title: "用户名称",
    align: "center",
  },
  {
    key: "role_permission",
    title: "用户类型",
    align: "center",
  },
  {
    key: "content",
    title: "评论内容",
    align: "center",
  },
  {
    key: "create_time",
    title: "评论时间",
    align: "center",
    render: ({ create_time }) => {
      if (create_time) {
        return (
          <span>{dayjs(create_time).format("YY年MM月DD日 HH:mm:ss")}</span>
        );
      }
      return <span> </span>;
    },
  },

  {
    key: "deleted_state",
    title: "状态",
    align: "center",
    render: (row) => {
      if (row.deleted_state) {
        const tagTypes: Record<
          CommentManagement.CommentStatusKey,
          NaiveUI.ThemeColor
        > = {
          "1": "success",
          "2": "error",
          "3": "warning",
          "4": "default",
        };

        return (
          <NTag type={tagTypes[row.deleted_state]}>
            {commentStatusLabels[row.deleted_state]}
          </NTag>
        );
      }
      return <span></span>;
    },
  },
   createColumn("actions", "操作", (row) => {
    return renderBaseAction(row, handleEditTable, handleDeleteTable);
  }),
]) as Ref<DataTableColumns<CommentManagement.Comment>>;





createDefaultEditData({
  _id: null,
  index: null,
  key: null,
  /** 用户id */
  user_id: "",
  /**用户状态 */
  house_id: "",
  /** 用户名 */
  comment_id: "",
  content: "",
  create_time: "",
  /**手机号 */
  deleted_state: "",
});

/**删除指定数据 */
async function handleDeleteTable(rowId: string | null) {
  // console.log("rowId: ", rowId);
  window.$message?.info(`你要删除的id是${rowId}`);
  let { error, data } = await fetchCommentDel(rowId as string);
  if (!error) {
    let index = tableData.value.findIndex((item) => item.key == rowId);
    createTable();
    tableData.value.splice(index, 1);
    window.$message?.info("删除成功");
  }
}

function init() {
  createTable();
}
// 初始化
init();
</script>

<style scoped></style>
