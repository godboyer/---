<template>
  <n-button type="success"  @click="handleTableToExcel">
    <icon-uil:export class="mr-4px text-20px" />
    导出Excel
  </n-button>
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
}
defineOptions({name: 'ExportExcel'})
const props = defineProps<Props>() ;

/**
 * 将表格数据转化为excel
 */
function handleTableToExcel() {
  let excelData;
  if (unref(props.checkedRowKeys).length == 0) {
    window.$dialog?.warning({
      title: "警告",
      content: "是否导出选择的数据,还是导出全部数据?",
      positiveText: "确定",
      negativeText: "导出全部",
      onNegativeClick: () => {
        exportExcelFile(unref(props.tableData), "全部房源信息", props.columns);
      },
    });
  } else {
    excelData = unref(props.tableData).filter((item: { key: string; }) =>
      unref(props.checkedRowKeys).includes(item.key as string)
    );

    exportExcelFile(excelData, "部分房源信息", props.columns);
  }
}
</script>

<style lang="scss" scoped></style>
