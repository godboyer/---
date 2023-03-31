<template>
  <div class="h-full overflow-hidden">
    <n-card title="城市管理" :bordered="false" class="rounded-16px shadow-sm">
      <n-space class="pb-12px" justify="space-between">
        <n-space>
          <n-button type="primary" @click="handleAddTable">
            <icon-ic-round-plus class="mr-4px text-20px" />
            新增
          </n-button>
          <n-button type="error" @click="handleDeleteAllTable">
            <icon-ic-round-delete class="mr-4px text-20px" />
            删除
          </n-button>
          <n-button type="success">
            <icon-uil:export class="mr-4px text-20px" />
            导出Excel
          </n-button>
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
        :row-props="rowProps"
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
import { computed, nextTick, reactive, ref, toRaw, unref } from "vue";
import type { Ref } from "vue";
import { DataTableRowKey, NButton, NPopconfirm, NSpace, NTag } from "naive-ui";
import type { DataTableColumns, PaginationProps } from "naive-ui";
import { cityStatusLabels, genderLabels, userStatusLabels } from "@/constants";
import { useBoolean, useLoading, useTable } from "@/hooks";
import TableActionModal from "./components/table-action-modal.vue";
import ColumnSetting from "./components/column-setting.vue";
import {
  createColumn,
  createDefaultData,
  extractFields,
  extractKeysAndTitles,
  renderBaseAction,
  renderTag,
} from "@/utils";
import { type ModalType } from "@/hooks/business/useTable";
import { fetchCityDel } from "@/service";

const tableName = ref("city");

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
} = useTable<CityManagement.City>(tableName);

createDefaultEditData({
  _id: "",
  key: null,
  /** 城市id */
  city_id: "",
  /**城市状态 */
  deleted_state: "",
  /** 城市名 */
  city_name: "",
});
 

const columns: Ref<DataTableColumns<CityManagement.City>> = ref([
  createColumn(undefined, undefined, undefined, "center", "selection"),
  createColumn("index", "序号"),
  createColumn("actions", "操作", (row) => {
    return renderBaseAction(row, handleEditTable, handleDeleteTable);
  }),
]) as Ref<DataTableColumns<CityManagement.City>>;


function handleDeleteAllTable() {
  console.log("checkedRowKeysRef: ", checkedRowKeysRef.value);
}

const rowProps = (row: CityManagement.City) => {
  return {
    style: "cursor: pointer;",
    onClick: () => {
      // window.$message?.info(row.index as any);
    },
  };
};
/**删除单表格数据 */
async function handleDeleteTable(rowId: string | null) {
  let { error, data } = await fetchCityDel(rowId as string);
  if (!error) {
    createTable();
    window.$message?.info("删除成功");
  }
}

/**
 * 初始化
 */
async function init() {
  let tableColumns = await createTable();

  let myColumns = tableColumns.map((item: any) => {
    if (item.title === "状态") {
      item.render = (row: CityManagement.City) => {
        return renderTag(row.deleted_state, cityStatusLabels);
      };
    }
    return item;
  });

  columns.value.splice(2, 0, ...myColumns);
}

// 初始化
init();
</script>

<style scoped></style>
