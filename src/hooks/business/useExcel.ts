import { isArray } from "@/utils";
import { type WorkBook, read, utils, writeFile, write, readFile } from "xlsx";
import { reactive, ref, unref } from "vue";
import { useBoolean } from "../common";

export default function useExcelTool() {
  //创建是否预览的标志
  const {
    bool: isPreview,
    setBool: setPreview,
    setFalse,
    setTrue,
  } = useBoolean();

  const excelData = ref([]);
  const fileName = ref("exported_data.xlsx");
  const file = reactive({
    src: "",
  });
  const excelSrc = ref<string | ArrayBuffer | null | undefined>("");
  const wbook = ref<WorkBook>();

  /**
   * 读取excel文件
   * @param file  文件
   */
  const readExcelFile = (file: File) => {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = (e) => {
      if (e.target) {
        const binaryData = e.target.result;
        const workbook = read(binaryData, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        excelData.value = utils.sheet_to_json(worksheet);
      }
    };
  };

  /**
   * 导出为excel文件
   * @param tableData 导出的数据
   * @param sheetName excel表的名称
   * @returns
   */
  const exportExcelFile = (
    tableData: any,
    sheetName = "Sheet1",
    headers?: any
  ) => {
    if (!isArray(unref(tableData))) {
      return window.$message?.warning("数据的格式应为数组");
    }

    wbook.value = jsonToWorkbook(tableData, sheetName);

    writeFile(unref(wbook) as WorkBook, sheetName + ".xlsx");

    console.log(unref(wbook));
    window.$message?.success("导出excel成功");
  };

  /**
   * 将json数据转换成workbook
   * @param tableData json类型数组
   * @param sheetName 工作表名称
   * @returns workbook对象
   */
  function jsonToWorkbook(tableData: any, sheetName: string): WorkBook {
    const ws = utils.json_to_sheet(unref(tableData));
    const wb = utils.book_new();
    utils.book_append_sheet(unref(wb), ws, sheetName + ".xlsx");
    return wb;
  }

  /**
   * 预览表格
   */
  function previewExcel(tableData: any,sheetName: string) {
 
    wbook.value = jsonToWorkbook(tableData, sheetName);

    excelSrc.value = workbookToDataURL(unref(wbook) as WorkBook);

    setTrue();
  }

  /**
   * 将 workbook 转换为二进制字符串
   * @param workbook 类型
   * @returns dataUrl
   */
  function workbookToDataURL(workbook: WorkBook): string {
    // 将 workbook 转换为二进制字符串
    const binaryString = write(workbook, {
      bookType: "xlsx",
      type: "binary",
    });

    // 将二进制字符串转换为 base64 编码的字符串
    const base64 = btoa(binaryString);

    // 构造一个 Data URL
    const dataUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;

    return dataUrl;
  }
  return {
    excelData,
    excelSrc,
    isPreview,
    previewExcel,
    fileName,
    readExcelFile,
    exportExcelFile,
  };
}
