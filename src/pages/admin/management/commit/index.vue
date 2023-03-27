<template>
  <div class="h-full overflow-hidden">
    <n-card title="房源评价管理" :bordered="false" class="rounded-16px shadow-sm">
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
        :max-height="800"
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
import { commentStatusLabels, genderLabels, userStatusLabels } from "@/constants";
import { fetchCommentDel, fetchCommentList } from "@/service";
import { useBoolean, useLoading,useTable } from "@/hooks";
import TableActionModal from "./components/table-action-modal.vue";
import type { ModalType } from "./components/table-action-modal.vue";
import ColumnSetting from "./components/column-setting.vue";
import dayjs from "dayjs";

const {} = useTable()

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const tableData = ref<CommentManagement.Comment[]>([]);
function setTableData(data: CommentManagement.Comment[]) {
  tableData.value = data;
}

async function getTableData() {
  startLoading();
  const { data } = await fetchCommentList();
  if (data) {
    setTimeout(() => {
      setTableData(data);
      endLoading();
    }, 1000);
  }
}

const columns: Ref<DataTableColumns<CommentManagement.Comment>> = ref([
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
    key: "comment_id",
    title: "评论ID",
    align: "center",
  },
   {
    key: "house_title",
    title: "房屋名称",
    align: "center",
  },
  {
    key: "username",
    title: "用户名称",
    align: "center",
  }, 
   {
    key: "role_permission",
    title: "用户类型",
    align: "center",
  },
  {
    key: "content",
    title: "评论内容",
    align: "center",
  },
   {
    key: "create_time",
    title: "评论时间",
     align: "center",
     render:  ({ create_time }) => {
       if (create_time) {
     
          
          return  (<span>{dayjs(create_time).format("YY年MM月DD日 HH:mm:ss")}</span>)
       }
       return ( <span> </span>  )
       
      }
  },
 
  {
    key: "deleted_state",
    title: "状态",
    align: "center",
    render: (row) => {
      if (row.deleted_state) {
        const tagTypes: Record<
          CommentManagement.CommentStatusKey,
          NaiveUI.ThemeColor
        > = {
          "1": "success",
          "2": "error",
          "3": "warning",
          "4": "default",
        };

        return (
          <NTag type={tagTypes[row.deleted_state]}>
            {commentStatusLabels[row.deleted_state]}
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
          <NButton size={"small"} onClick={() => handleEditTable(row.comment_id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.comment_id)}>
            {{
              default: () => "确认删除",
              trigger: () => <NButton size={"small"}>删除</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      );
    },
  },
]) as Ref<DataTableColumns<CommentManagement.Comment>>;

const modalType = ref<ModalType>("add");

function setModalType(type: ModalType) {
  modalType.value = type;
}

let editData = reactive<CommentManagement.Comment>(createDefaultEditData());
function createDefaultEditData(): CommentManagement.Comment {
  return {
    _id: null,
    index: null,
    key: null,
    /** 用户id */
    user_id: '',
    /**用户状态 */
    house_id: '',
    /** 用户名 */
    comment_id: "",
    content: "",
    create_time: "",
    /**手机号 */
    deleted_state: "",
  
  };
}
/**
 * 设置需要操作的数据的函数
 * @param   data  需要操作的数据
 */
function setEditData(data: CommentManagement.Comment | null) {
  Object.assign(editData, createDefaultEditData(), data);
  // console.log('editData: ', editData);
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
  // console.log("rowId: ", rowId);
  //可能存在没有的变量的值
  const findItem = tableData.value.find((item) => item.comment_id === rowId);
  // console.log("findItem: ", findItem);

  if (findItem) {
    setEditData(findItem);
  }
  setModalType("edit");
  openModal();
}

async function handleDeleteTable(rowId: string | null) {

  let {error,data} = await  fetchCommentDel(rowId as string);
  if (!error) {
    getTableData()
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
