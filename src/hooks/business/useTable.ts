import { onMounted, onUnmounted, shallowRef, toRaw, toRefs, unref } from "vue";
import { ref, reactive, watch, Ref, UnwrapRef } from "vue";
import { MaybeRef } from "@vueuse/shared";
import {
  DataTableColumns,
  DataTableRowKey,
  elementDark,
  NSpace,
} from "naive-ui";
import { useBoolean, useLoading } from "../common";
import {
  createColumn,
  extractFields,
  isArray,
  isString,
  localStg,
  queryAllFields,
  querySpecifiedFields,
  renderBaseAction,
} from "@/utils";
import localforage from "localforage";
import { SelectBaseOption } from "naive-ui/es/select/src/interface";
import { fetchCityDel, fetchTableList } from "@/service";

export interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /**
   * 弹窗类型
   * add: 新增
   * edit: 编辑
   */
  type?: "add" | "edit";
}
export type ModalType = NonNullable<Props["type"]>;
type TableData<T> = Ref<T[]>;
type PaginationProps = {
  page: number;
  pageSize: number;
  showSizePicker: boolean;
  pageSizes: number[];
  onChange: (page: number) => void;
  onUpdatePageSize: (pageSize: number) => void;
};

interface TableTitles {
  [label: string]: string;
  path: string;
}

export interface SearchSelectOption extends SelectBaseOption {
  field: string; //字段名
}

export function useTable<T>(tableName: MaybeRef<string>) {
  const { loading, startLoading, endLoading } = useLoading(false);
  const { bool: visible, setTrue: openModal } = useBoolean();

  const tableData: TableData<T> = ref([]);

  /**
   * 表格编辑类数据
   */
  const modalType = ref<ModalType>("add");
  let editData = ref<any>({}); //编辑的数据
  const modelFormItems = ref<TableTitles[]>([]);
  function setModalType(type: ModalType) {
    modalType.value = type;
  }
 


  /**
   * 创建默认表格数据
   * @param tableName 表名
   * @returns
   */
  async function createTable() {
  
    startLoading();
    const { error, data } = await fetchTableList(unref(tableName), {
      page: 1,
      pageSize: -1,
    });
    if (!error) {
      const { tableName, tableDatas, tableColumns } = data;
      setTimeout(() => {
        setTableData(tableDatas);
         localforage.setItem("originalData", tableDatas)
        endLoading();
      }, 1000);
      return tableColumns;
    }
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
  function handleEditTable(row: any) {
    console.log("rowId: ", row);
    if (!row) {
      resetEditData(editData);
    }
    setEditData(row);
    setModalType("edit");
    openModal();
  }

  /**
   * 创建默认编辑数据
   * @param data 需要编辑的数据
   * @returns
   */
  function createDefaultEditData(data: any) {
    editData.value = data;
    console.log("editData: ", editData);
  }

  /**
   * 设置需要操作的数据的函数
   * @param   data  需要操作的数据
   */
  function setEditData(data: T | null) {
    console.log("editData: ", editData, data);
    Object.assign(editData.value, data);
  }

  /**
   * 重置编辑数据
   * @param data 需要重置的数据
   */
  function resetEditData<T extends Record<string, unknown>>(
    data: Ref<T>
  ): void {
    const _rawData = toRaw(unref(data));
    const keys = Object.entries(_rawData).reduce((obj, [key, value]) => {
      obj[key] = null;
      return obj;
    }, {} as Record<string, null>);

    Object.assign(data, keys);
  }

  //被选中行的key值
  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  /**选中行事件 */
  const handleCheckRowKeys = (rowKeys: DataTableRowKey[]) => {
    //选中的key值数组,可以进行多选操作比如删除,等等
    checkedRowKeysRef.value = rowKeys;
    window.$message?.info(`你选择中了 ${rowKeys}` as any);
  };

  /**分页 */
  const pagination: PaginationProps = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 15, 20, 25, 30],
    onChange: (page: number) => {
      pagination.page = page;
      createTable();
      console.log("我触发了");
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize;
      pagination.page = 1;
      createTable();
    },
  });

  /**设置表格数据 */
  function setTableData(data: T[]) {
    tableData.value = data;
  }

  return {
    modalType,
    setEditData,
    editData,
    createDefaultEditData,
    handleCheckRowKeys,
    tableData,
    pagination,
    loading,
    visible,
    openModal,
    modelFormItems,
    checkedRowKeysRef,
    handleEditTable,
    handleAddTable,
    createTable,
    resetEditData
  };
}

export function useSearchTable<T>() {
  const searchQuery = ref<string>(""); //搜索框的值
  const searchData: Ref<T[]> = ref([]); //搜索的数据源
  const filteredData: Ref<T[]> = ref([]); //搜索后的数据

  /**
   * 创建当前搜索的数据
   * @param Data 传入的数据
   */
  async function creatSearchData(Data: MaybeRef<any[]>) {
    const _rawData = toRaw(unref(Data));
    const originalData = await localforage.getItem("originalData");

    if (!originalData || (isArray(originalData) && originalData.length === 0)) {
      //数据持久化
      localforage.setItem("originalData", _rawData).then((value) => {
        searchData.value = value;
      });
    } else {
      searchData.value = originalData as T[];
    }
  }

  /** 点击搜索模糊搜索*/
  async function onSearch() {
    const originalData = await localforage.getItem("originalData");
    searchData.value = originalData as T[];
    console.log('searchQuery: ', searchQuery);
    console.log('searchData: ', searchData);

    filteredData.value = queryAllFields(searchQuery, searchData);
    return unref(filteredData);
  }
  /**  监听搜索框的值*/
  function watchSearch() {}

  /** select选项搜索*/

  function onSearchSelect(queryOption: SearchSelectOption) {
    const { label, value: searchQuery, field: searchFields } = queryOption;
    filteredData.value = querySpecifiedFields(
      unref(searchQuery) as string,
      searchData,
      searchFields
    );
    return unref(filteredData);
  }

  onUnmounted(() => {
    localforage.removeItem("originalData");
  });

  return {
    creatSearchData,
    filteredData,
    onSearch,
    watchSearch,
    onSearchSelect,
    searchQuery,
  };
}
