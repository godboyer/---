import { onUnmounted, shallowRef, toRefs, unref } from "vue";
import { ref, reactive, watch, Ref, UnwrapRef } from "vue";
import { MaybeRef } from "@vueuse/shared";
import { DataTableColumns, DataTableRowKey, elementDark } from "naive-ui";
import { useBoolean, useLoading } from "../common";
import { isString, localStg } from "@/utils";
import localforage from "localforage";
import { SelectBaseOption } from "naive-ui/es/select/src/interface";

type TableData<T> = Ref<T[]>;
type PaginationProps = {
  page: number;
  pageSize: number;
  showSizePicker: boolean;
  pageSizes: number[];
  onChange: (page: number) => void;
  onUpdatePageSize: (pageSize: number) => void;
};
interface UseTableOptions<T> {
  columns: DataTableColumns<T>;
  fetchData: () => Promise<MaybeRef<T[]>>;
}

interface UseTableReturn<T> {
  tableData: TableData<T>;
  pagination: PaginationProps;
  getTableData: () => Promise<void>;
}

export interface SearchSelectOption extends SelectBaseOption  {
    field: string;//字段名
}



export function useTable<T>(
  fetchData: () => Promise<Service.RequestResult<T[]>>
) {
  const { loading, startLoading, endLoading } = useLoading(false);
  const { bool: visible, setTrue: openModal } = useBoolean();

  //被选中行的key值
  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  /**选中行事件 */
  const handleCheck = (rowKeys: DataTableRowKey[]) => {
    //选中的key值数组,可以进行多选操作比如删除,等等
    checkedRowKeysRef.value = rowKeys;
    window.$message?.info(`你选择中了 ${rowKeys}` as any);
  };

  const tableData: TableData<T> = ref([]);
  const pagination: PaginationProps = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 15, 20, 25, 30],
    onChange: (page: number) => {
      pagination.page = page;
      getTableData();
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize;
      pagination.page = 1;
      getTableData();
    },
  });

  async function getTableData() {
    startLoading();
    const { data } = await fetchData();
    if (data) {
      setTimeout(() => {
        setTableData(data);
        endLoading();
      }, 1000);
    }
  }

  function setTableData(data: T[]) {
    tableData.value = data;
  }

  return { tableData, pagination, getTableData, loading, visible, openModal };
}

export function useSearchTable<T>(searchQuery?: MaybeRef<string>) {
  console.log("searchQuery: ", searchQuery);
  const searchData: Ref<T[]> = ref([]); //搜索的数据源
  const filteredData: Ref<T[]> = ref([]); //搜索后的数据

  /**
   * 创建搜索数据
   * @param Data 传入的数据
   */
  async function creatSearchData<U extends T>(Data: MaybeRef<U[]>) {
    const originalData = await localforage.getItem("originalData");
    if (!originalData) {
      //数据持久化
      localforage.setItem("originalData", unref(Data)).then((value) => {
        searchData.value = value;
      });
    } else {
      searchData.value = originalData as T[];
    }
  }

  /** 点击搜索模糊搜索*/
  async function onSearch<U extends T>(searchQuery: MaybeRef<string>) {
    filteredData.value = queryAllFields(searchQuery, searchData);
    return unref(filteredData);
  }
  /**  监听搜索框的值*/
  function watchSearch() {}

  /** select选项搜索*/

  function onSearchSelect<U extends T>(queryOption: SearchSelectOption) {
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

  return { creatSearchData, filteredData, onSearch, watchSearch,onSearchSelect };
}

/**
 * 无指定字段搜索(全局搜索 模糊搜索)
  这个函数将会搜索所有对象的所有字段，并将包含搜索关键词的对象返回。
 * @param searchQuery 搜索的参数
 * @param originalData 搜索的数据来源
 * @returns 
 */
function queryAllFields<T>(
  searchQuery: MaybeRef<string>,
  originalData: Ref<T[]>
): T[] {
  let toRefsOriginalData = toRefs(unref(originalData));
  const _originalData: any[] = [
    ...unref(originalData).map((item, index) => {
      return {
        ...item,
        queryId: String(index + 10),
      };
    }),
  ];
  console.log("searchQuery: ", searchQuery);

  const searchQueryValue = unref(searchQuery).trim();
  console.log("searchQueryValue: ", searchQueryValue);
  if (!searchQueryValue) {
    return [...unref(originalData)];
  }

  const searchFieldsArray = getKeys(toRefsOriginalData[0]);
  console.log("searchFieldsArray: ", searchFieldsArray);

  const matchedKeys = new Set<string>();
  const reg = new RegExp(searchQueryValue, "i");
  for (const item of _originalData) {
    for (const field of searchFieldsArray) {
      if (isString(item[field]) && reg.test(item[field])) {
        matchedKeys.add(item["queryId"]);
      }
    }
  }

  return _originalData.filter((item) => matchedKeys.has(item["queryId"]));
}

/**
 * 指定一个字段或者数组搜索
 * @param searchQuery 搜索关键词字符串的 Ref 对象
 * @param originalData 原始数据数组的 MaybeRef 对象
 * @param searchFields 可选的搜索字段数组，每个元素应该是原始数据对象的一个键名，如果不传则默认为原始数据对象的所有键名数组。
 * @returns 过滤后的数据数组的 Ref 对象
 */
function querySpecifiedFields<T>(
  searchQuery: MaybeRef<string>,
  originalData: MaybeRef<T[]>,
  searchFields: MaybeRef<string> | MaybeRef<string[]>
): T[] {
  let filteredData: any[] = [];
  const searchFieldsArray = Array.isArray(searchFields)
    ? searchFields
    : [searchFields];

  const newQuery = unref(searchQuery).toLowerCase().trim();

  if (!newQuery) {
    return [...unref(originalData)];
  }
  // p: 你好

  filteredData = unref(originalData).filter((item) =>
    searchFieldsArray
      .map((field) => String(item[field]).toLowerCase())
      .some((value) => value.includes(newQuery.toLowerCase()))
  );

  return filteredData;
}

function getKeys<T extends {}>(o: T): (keyof T)[] {
  return Object.keys(unref(o)) as (keyof T)[];
}
