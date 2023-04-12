<template>
  <div class="h-full overflow-hidden">
    <n-card title="留言管理" :bordered="false" class="rounded-16px shadow-sm">
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
          <n-button type="success">
            <icon-uil:export class="mr-4px text-20px" />
            导出Excel
          </n-button>
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
      />
      <table-action-modal
        v-model:visible="visible"
        :type="modalType"
        :edit-data="editData"
        @update-action="getTableData"
      />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from "vue";
import type { Ref } from "vue";
import { NButton, NPopconfirm, NSpace, NTag } from "naive-ui";
import type { DataTableColumns, PaginationProps } from "naive-ui";
import {
  FeedbackStatusLabels,
} from "@/constants";
import {
  fetchFeedbackDel,
  fetchFeedbackList,
} from "@/service";
import { useBoolean, useLoading } from "@/hooks";
import TableActionModal from "./components/table-action-modal.vue";
import type { ModalType } from "./components/table-action-modal.vue";
import ColumnSetting from "./components/column-setting.vue";
import dayjs from "dayjs";
import { extractKeysAndTitles } from "@/utils";

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const tableData = ref<FeedbackManagement.Feedback[]>([]);
function setTableData(data: FeedbackManagement.Feedback[]) {
  tableData.value = data;
}

async function getTableData() {
  startLoading();
  const { data } = await fetchFeedbackList();
  if (data) {
    setTimeout(() => {
      setTableData(data);
      endLoading();
    }, 1000);
  }
}

const columns: Ref<DataTableColumns<FeedbackManagement.Feedback>> = ref([
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
    key: "title",
    title: "标题",
    align: "center",
  },
  {
    key: "content",
    title: "反馈内容",
    align: "center",
  },
  {
    key: "user_id",
    title: "用户",
    align: "center",
  },

  {
    key: "create_time",
    title: "发布时间",
    align: "center",
    render: (row) => {
      return (
        <span>{dayjs(row.create_time).format("YY年MM月DD日 HH:mm:ss")}</span>
      );
    },
  },
  {
    key: "status",
    title: "状态",
    align: "center",
    render: (row) => {
      if (row.status) {
        const tagTypes: Record<
          FeedbackManagement.StatusKey,
          NaiveUI.ThemeColor
        > = {
          "1": "success",
          "2": "error",
          "3": "warning",
          "4": "default",
        };

        return (
          <NTag type={tagTypes[row.status]}>
            {FeedbackStatusLabels[row.status]}
          </NTag>
        );
      }
      return <span></span>;
    },
  },
  {
    key: "actions",
    title: "操作",
    align: "center",
    render: (row) => {
      return (
        <NSpace justify={"center"}>
          <NButton
            size={"small"}
            onClick={() => handleEditTable(row.key)}
          >
            编辑
          </NButton>
          <NPopconfirm
            onPositiveClick={() => handleDeleteTable(row.key)}
          >
            {{
              default: () => "确认删除",
              trigger: () => <NButton size={"small"}>删除</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      );
    },
  },
]) as Ref<DataTableColumns<FeedbackManagement.Feedback>>;
let _fileds = extractKeysAndTitles(columns) 
  console.log('tableTitle: ',_fileds);
const modalType = ref<ModalType>("add");

function setModalType(type: ModalType) {
  modalType.value = type;
}

let editData = reactive<FeedbackManagement.Feedback>(createDefaultEditData());
function createDefaultEditData(): FeedbackManagement.Feedback {
  return {
    _id: '',
    index: 0,
    key: '',
    /**
     * 内容，留言内容
     */
    content: "",
    /**
     * 留言时间
     */
    create_time: "",
    status: '2',
    title:'',
 
    /**
     * 用户ID或者编号，用户的留言
     */
    user_id: "",
  };
}
/**
 * 设置需要操作的数据的函数
 * @param   data  需要操作的数据
 */
function setEditData(data: FeedbackManagement.Feedback | null) {
  Object.assign(editData, createDefaultEditData(), data);
  console.log("editData: ", editData);
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
function handleEditTable(rowId?: string | null) {
  console.log("rowId: ", rowId);
  //可能存在没有的变量的值
  const findItem = tableData.value.find((item) => item._id === rowId);
  console.log("findItem: ", findItem);

  if (findItem) {
    setEditData(findItem);
  }
  setModalType("edit");
  openModal();
}

async function handleDeleteTable(rowId?: string | null) {
  let { error, data } = await fetchFeedbackDel(rowId as string);
  if (!error) {
    getTableData();
    window.$message?.info("删除成功");
  }
}

const pagination: PaginationProps = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20, 25, 30],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
});

function init() {
  getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
