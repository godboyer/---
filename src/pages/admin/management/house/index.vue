<template>
  <div class="h-full overflow-hidden">
    <n-card title="用户管理" :bordered="false" class="rounded-16px shadow-sm">
      <n-space class="pb-12px" justify="space-between">
        <n-space>
          <n-button type="primary" @click="handleAddTable">
            <icon-ic-round-plus class="mr-4px text-20px" />
            新增
          </n-button>
          <n-button type="error" @click="handleDeleteTableData">
            <icon-ic-round-delete class="mr-4px text-20px" />
            删除
          </n-button>
          <n-button type="success" @click="handleTableToExcel">
            <icon-uil:export class="mr-4px text-20px" />
            导出Excel
          </n-button>

          <!-- ----------------------------------搜索房源------------------------------- -->
          <search-box
            v-model:original-data="originalData"
            :slot-list="slotList"
            @search:end="handleSearchEnd"
          >
            <template v-slot="slotProps">
              <div v-for="item in slotList">
                <n-select
                  :fallback-option="fallbackOption"
                  v-model:value="item.value"
                  placeholder="Select"
                  :options="item.options"
                  style="width: 120px"
                  @update:value="slotProps.slotHandler"
                />
              </div>
            </template>
          </search-box>

          <!-- ----------------------------------搜索房源------------------------------- -->
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
        @update:sorter="handleSorterChange"
        @update:page="handlePageChange"
        @update:checked-row-keys="handleCheck"
      />
      <table-action-modal
        v-model:visible="visible"
        :type="modalType"
        :edit-data="editData"
        @update-action="getTableData"
      />
    </n-card>
    <n-modal v-model:show="showModal" size="huge" :bordered="false">
      <div>
        <n-thing>
          <template #header>房源信息详情 </template>
          <template #header-extra>
            <n-button tertiary size="small" @click="showModal = false">
              <!-- <n-icon :component="CloseOutline" size="40" :depth="1"
            /> -->
            </n-button>
          </template>
        </n-thing>
        <show-card
          :house-data-one="(housedataone as unknown as HouseManagement.HouseInfo)"
        />
      </div>
    </n-modal>
    <n-modal v-model:show="isPreview" size="huge">
      <vue-office-excel :src="excelSrc" style="width: 80vw; height: 860px" />
    </n-modal>
  </div>
</template>

<script setup lang="tsx">
import { computed, h, reactive, ref, unref } from "vue";
import type { Ref } from "vue";
import { DataTableRowKey, NButton, NImage, NPopconfirm, NSpace, NTag } from "naive-ui";
import type { DataTableColumns, PaginationProps } from "naive-ui";
import {
  leaseStatusLabels,
  examStatusLabels,
  defaultStatusLabels,
} from "@/constants";
import { useBoolean, useLoading } from "@/hooks";
import showCard from "@/pages/admin/component/showCard.vue";
import TableActionModal from "./components/table-action-modal.vue";
import type { ModalType } from "./components/table-action-modal.vue";
import { columnSetting, searchBox } from "@/pages/admin/component/index";
import { useHouseInfoStore } from "@/store";
import HouseFetch from "@/service/api/house";
import dayjs from "dayjs";
import { useExcelTool, useSearchTable } from "@/hooks";
import {
  defaultStatusOptions,
  leaseStatusOptions,
  examStatusOptions,
} from "@/constants";
import { SearchSelectOption } from "@/hooks/business/useTable";
import "@vue-office/excel/lib/index.css";
import { extractKeysAndTitles, renderHouseAction, renderDescription, renderFirstPicture, renderFormDate, renderTag } from "@/utils";
const { exportExcelFile, previewExcel, excelSrc, isPreview } = useExcelTool();
const { fetchHouseListToAdmin, fetchHouseDeleteToAdmin } = new HouseFetch();
const { creatSearchData } = useSearchTable();
const store = useHouseInfoStore();
const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();
const showModal = ref(false);
const housedataone = ref<HouseManagement.HouseInfo | null>(null);

const tableData = ref<HouseManagement.House[]>([]);
function setTableData(data: HouseManagement.House[]) {
  tableData.value = data;
}

//查询的参数

const searchModel = reactive({
  searchQuery: ref(""),
  selectValue: "--出租状态--",
  status: "",
  examStatus: "",
  defaultStatus: "",
  leaseValue: "--出租状态--",
  examValue: "--审核状态--",
  defaultValue: "--状态--",
});

const slotList = [
  {
    name: "leaseStatus",
    label: "出租状态",
    type: "select",
    value: searchModel.leaseValue,
    options: leaseStatusOptions,
  },
  {
    name: "examStatus",
    label: "审核状态",
    type: "select",
    value: searchModel.examValue,
    options: examStatusOptions,
  },
  {
    name: "defaultStatus",
    label: "默认状态",
    type: "select",
    value: searchModel.defaultValue,
    options: defaultStatusOptions,
  },
];

function handleSearchEnd(data: any) {
  console.log("data: ", data);
  setTableData(data);
}

function fallbackOption(value: string): SearchSelectOption {
  return {
    label: value,
    value: "",
    field: "",
  };
}

const originalData = computed(() => {
  return unref(tableData);
});

async function getTableData() {
  startLoading();
  const { data } = await fetchHouseListToAdmin({
    page: 1,
    pageSize: 9999,
    pageCount: 1,
  });
  if (data) {
    setTableData(data);
    creatSearchData(data);
    endLoading();
  }
}

//被选中行的key值
const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
/**选中行事件 */
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  //选中的key值数组,可以进行多选操作比如删除,等等
  checkedRowKeysRef.value = rowKeys;
  window.$message?.info(`你选择中了 ${rowKeys}` as any);
};

function handleDeleteTableData() {
  previewExcel(tableData, "房源详情列表");
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
        exportExcelFile(unref(tableData), "全部房源信息", columns);
      },
    });
  } else {
    excelData = unref(tableData).filter((item) =>
      unref(checkedRowKeysRef).includes(item.key as string)
    );

    exportExcelFile(excelData, "部分房源信息", columns);
  }
}

const reanderItem = {
  target: "NTag",
  props: {
    type: "exam_status",
  },
  children: "exam_status",
};

const columns: Ref<DataTableColumns<HouseManagement.House>> = ref([
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
    key: "city_name",
    title: "所在城市",
    align: "center",
  },
  {
    key: "house_category",
    title: "房屋类别",
    align: "center",
    render: ({ house_category }) => {
      return h("span", {}, house_category);
    },
  },

  {
    key: "address",
    title: "地址",
    align: "center",
  },
  {
    key: "price",
    title: "月租费(元/月)",
    align: "center",
  },
  {
    key: "des",
    title: "面积/楼层",
    align: "center",
  },
  {
    key: "first_picture",
    title: "房屋图片",
    align: "center",
    render: ({ first_picture }) => {
       return renderFirstPicture(first_picture);
    },
  },
  {
    key: "house_description",
    title: "房屋介绍",
    align: "center",
    render: ({ house_description }) => {
       return  renderDescription(house_description)
    },
  },
  {
    key: "Homeowner_info",
    title: "房东",
    align: "center",
    render: (row) => {
      const { Homeowner_info } = row;
      if (Homeowner_info?.user_id === row.user_id) {
        return <span>{Homeowner_info?.username}</span>;
      }
      return <span>{"暂无房东"}</span>;
    },
  },
  {
    key: "exam_status",
    title: "审核状态",
    align: "center",

    render: ({ exam_status }) => {
      return renderTag(exam_status, examStatusLabels);
    },
  },
  {
    key: "lease_state",
    title: "出租状态",
    align: "center",
    render: ({ lease_state }) => {
      return renderTag(lease_state, leaseStatusLabels);
    },
  },
  {
    key: "deleted_state",
    title: "状态",
    align: "center",
    render: ({ deleted_state }) => {
      return renderTag(deleted_state, defaultStatusLabels);
    },
  },
  {
    key: "create_time",
    title: "发布时间",
    align: "center",
    render: ({ create_time }) => {
       return  renderFormDate(create_time);
    },
  },

  {
    key: "actions",
    title: "操作",
    align: "center",
    render: (row) => {

        return renderHouseAction(row.house_id,handleEditTable,handleShowTable,handleDeleteTable)
    },
  },
]) as Ref<DataTableColumns<HouseManagement.House>>;

let tableTitle = extractKeysAndTitles(columns);
console.log("tableTitle: ", tableTitle);

function createDefaultEditData(): HouseManagement.House {
  return {
    _id: null,
    index: null,
    key: null,
    city_id: "",
    house_id: "",
    user_id: "",
    /** 所在城市 */
    city_name: "",
    /**房屋类别 */
    house_category: "",
    /**出租类别 */
    rental_category: "",
    /** 用户名 */
    address: "",
    /**月租 */
    price: "",
    /**面积/楼层 */
    des: "",
    /**房屋图片 */
    first_picture: "",
    /** 房屋介绍 */
    house_description: "",
    /**装修情况 */
    decoration_condition: "",
    /** 房东信息 */
    Homeowner_info: null,
    /**审核状态 */
    exam_status: "",
    /**出租状态 */
    lease_state: "",
    /**删除状态 */
    deleted_state: "",
    /**创建时间 */
    create_time: null,
  };
}
const modalType = ref<ModalType>("add");

function setModalType(type: ModalType) {
  modalType.value = type;
}

let editData = reactive<HouseManagement.House>(createDefaultEditData());

/**
 * 设置需要操作的数据的函数
 * @param   data  需要操作的数据
 */
function setEditData(data: HouseManagement.House | null) {
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
  console.log('rowId: ', rowId);
  // console.log("rowId: ", rowId);
  //可能存在没有的变量的值
  const findItem = tableData.value.find((item) => item.house_id === rowId);
  // console.log("findItem: ", findItem);

  if (findItem) {
    setEditData(findItem);
  }
  setModalType("edit");
  openModal();
}

function handleShowTable(rowId: string | null) {
  housedataone.value = computed(() => {
    return tableData.value.find((item) => item.house_id == rowId);
  });
}

/**删除指定数据 */
async function handleDeleteTable(rowId: string | null) {
  // console.log("rowId: ", rowId);
  window.$message?.info(`你要删除的id是${rowId}`);
  let { error, data } = await fetchHouseDeleteToAdmin(rowId as string);
  if (!error) {
    let index = tableData.value.findIndex((item) => item.house_id == rowId);

    tableData.value.splice(index, 1);
    window.$message?.info("删除成功");
  }
}
/**分页计数器 */
const pagination: PaginationProps = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40, 50],
  onChange: (page: number) => {
    window.$message?.info(`你要选择的页码是${page}`);
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    window.$message?.info(`你要一页的大小是${pageSize}`);
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
  prefix({ itemCount }) {
    return `Total is ${itemCount}.`;
  },
});

/**分类更换触发函数 */
function handleSorterChange(sorter: { columnKey: string }) {
  window.$message?.info(`这个是sorter=>${sorter}`);
  if (!sorter || sorter.columnKey === "column1") {
  }
}

/**页面变化触发函数 */
function handlePageChange(currentPage: number) {
  window.$message?.info(
    `这个是currentPage=>${currentPage} ,pagination.pageSize => ${pagination.pageSize}`
  );
}

function init() {
  // store.setHouseInfoALl();
  getTableData();
}

// 初始化
init();
</script>

<style lang="scss" scoped></style>
