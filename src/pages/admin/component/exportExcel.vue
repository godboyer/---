<template>
  <n-popconfirm @positive-click="handleTableToExcel">
    <template #trigger>
      <n-button type="success" >
        <icon-uil:export class="mr-4px text-20px" />
        导出Excel
      </n-button>
    </template>
    确认导出以选中的数据吗？
  </n-popconfirm>
</template>

<script setup lang="ts">
import { useExcelTool } from "@/hooks";
import { MaybeRef } from "@vueuse/shared";
import { DataTableColumns, DataTableRowKey } from "naive-ui";
import { type } from "os";
import { ref, Ref, unref } from "vue";
const { exportExcelFile, previewExcel, excelSrc, isPreview } = useExcelTool();
interface Props {
  tableData: any[];
  columns: any;
  checkedRowKeys: any;
  tableTitle: string
}
defineOptions({ name: 'ExportExcel' })
const props = defineProps<Props>();

/**
 * 将表格数据转化为excel
 */
function handleTableToExcel() {
  let excelData;
  if (unref(props.checkedRowKeys).length == 0) {
    window.$dialog?.warning({
      title: "警告",
      content: "未选择任何数据，是否导出全部数据?",
      positiveText: "取消",
      negativeText: "导出全部",
      onNegativeClick: () => {
        exportExcelFile(unref(props.tableData), `全部${props.tableTitle}信息`, props.columns);
      },
    });
  } else {
    excelData = unref(props.tableData).filter((item: { key: string; }) =>
      unref(props.checkedRowKeys).includes(item.key as string)
    );

    exportExcelFile(excelData, `部分${props.tableTitle}信息`, props.columns);
  }
}
</script>

<style lang="scss" scoped></style>
