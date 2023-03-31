<template>
  <div class="h-full overflow-hidden">
    <n-card title="公告管理" :bordered="false" class="rounded-16px shadow-sm">
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
          <n-button type="success" @click="handleTableToExcel">
            <icon-uil:export class="mr-4px text-20px" />
            导出Excel
          </n-button>
          <search-box
            v-model:original-data="originalData"
            @search:end="handleSearchEnd"
          >
          </search-box>
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
import { computed, ref, unref } from "vue";
import type { Ref } from "vue";
import { NButton, NPopconfirm, NSpace, NTag } from "naive-ui";
import type { DataTableColumns, PaginationProps } from "naive-ui";
import { noticeStatusLabels } from "@/constants";
import { fetchNoticeDel, fetchNoticeList } from "@/service";
import { useExcelTool, useTable } from "@/hooks";
import TableActionModal from "./components/table-action-modal.vue";
import {
  createColumn,
  extractKeysAndTitles,
  renderBaseAction,
  renderTag,
} from "@/utils";
import { columnSetting, searchBox } from "@/pages/admin/component/index";
const { exportExcelFile, previewExcel, excelSrc, isPreview } = useExcelTool();
const tableName = ref("notice");

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
} = useTable<NoticeManagement.Notice>(tableName);

const columns: Ref<DataTableColumns<NoticeManagement.Notice>> = ref([
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
    key: "notice_title",
    title: "公告标题",
    align: "center",
  },
  {
    key: "notice_content",
    title: "公告内容",
    align: "center",
  },

  {
    key: "create_time",
    title: "创建时间",
    align: "center",
  },
  {
    key: "deleted_state",
    title: "状态",
    align: "center",
    render: (row) => {
      return renderTag(row.deleted_state, noticeStatusLabels);
    },
  },
  createColumn("actions", "操作", (row) => {
    return renderBaseAction(row, handleEditTable, handleDeleteTable);
  }),
]) as Ref<DataTableColumns<NoticeManagement.Notice>>;

createDefaultEditData({
  _id: null,
  index: null,
  key: null,
  /**
   * 公告编号
   */
  notice_id: "",
  /**
   * 创建时间
   */
  create_time: "",
  /**
   * 状态
   */
  deleted_state: "",
  /**
   * 公告内容
   */
  notice_content: "",

  /**
   * 公告标题
   */
  notice_title: "",
});
const originalData = computed(() => {
  return unref(tableData);
});
function handleSearchEnd(data: any) {
  console.log("data: ", data);
  setTableData(data);
}
function setTableData(data: any[]) {
  tableData.value = data;
}

/**
 * 将表格数据转化为excel
 */
function handleTableToExcel() {
  let excelData;
  if (unref(checkedRowKeysRef).length == 0) {
    window.$dialog?.warning({
      title: "警告",
      content: "是否导出选择的数据,还是导出全部数据?",
      positiveText: "确定",
      negativeText: "导出全部",
      onNegativeClick: () => {
        exportExcelFile(unref(tableData), "全部公告信息", columns);
      },
    });
  } else {
    excelData = unref(tableData).filter((item) =>
      unref(checkedRowKeysRef).includes(item.key as string)
    );

    exportExcelFile(excelData, "部分公告信息", columns);
  }
}

async function handleDeleteTable(rowId: string | null) {
  let { error, data } = await fetchNoticeDel(rowId as string);
  if (!error) {
    createTable();
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
