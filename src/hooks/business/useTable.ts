import { ref, reactive,watch, Ref,UnwrapRef  } from 'vue';
import { MaybeRef } from '@vueuse/shared';
import { DataTableColumns } from 'naive-ui';



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

interface UseTableReturn<T> {tableData:TableData<T>, pagination:PaginationProps, getTableData:() => Promise<void>}


export  function useTable<T>(fetchData: () => Promise<T[]>){
  const tableData:TableData<T> = ref([]);
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
    const data = await fetchData();
    if (data) {
      tableData.value = data  ;
    }
  }

  return {tableData, pagination, getTableData};
}



export function useSearchTable<T>(
  searchField: keyof T,
  searchQuery: Ref<string>,
  originalData: MaybeRef<T[]>
): Ref<UnwrapRef<T[]>> {
  const filteredData = ref([...originalData.value]);

  watch(
    searchQuery,
    (newQuery) => {
      if (newQuery.trim()) {
        filteredData.value = originalData.value.filter((item) =>
          String(item[searchField]).toLowerCase().includes(newQuery.toLowerCase())
        );
      } else {
        filteredData.value = [...originalData.value];
      }
    },
    { immediate: true }
  );

  return filteredData;
}
