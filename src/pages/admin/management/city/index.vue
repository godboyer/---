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
                    <n-button size="small" type="primary" @click="getTableData">
                        <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
                        刷新表格
                    </n-button>
                    <column-setting v-model:columns="columns" />
                </n-space>
            </n-space>
            <n-data-table :columns="columns" :row-props="rowProps" :data="tableData" :loading="loading"
                :pagination="pagination" @update:checked-row-keys="handleCheck" />
            <table-action-modal v-model:visible="visible" :type="modalType" :edit-data="editData"
                @update-action="getTableData" />
        </n-card>
    </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from "vue";
import type { Ref } from "vue";
import { DataTableRowKey, NButton, NPopconfirm, NSpace, NTag } from "naive-ui";
import type { DataTableColumns, PaginationProps } from "naive-ui";
import { cityStatusLabels, genderLabels, userStatusLabels } from "@/constants";
import { fetchCityDel, fetchCityList, fetchUserDEL, fetchUserList } from "@/service";
import { useBoolean, useLoading } from "@/hooks";
import TableActionModal from "./components/table-action-modal.vue";
import type { ModalType } from "./components/table-action-modal.vue";
import ColumnSetting from "./components/column-setting.vue";

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const tableData = ref<CityManagement.City[]>([]);
function setTableData(data: CityManagement.City[]) {
    tableData.value = data;
}

async function getTableData() {
    startLoading();
    const { data } = await fetchCityList();
    console.log('data: ', data);
    // debugger
    if (data) {
        setTimeout(() => {
            setTableData(data);
            endLoading();
        }, 1000);
    }
}

const columns: Ref<DataTableColumns<CityManagement.City>> = ref([
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
        title: "城市名称",
        align: "center",
    },
    {
        key: "city_id",
        title: "城市编号",
        align: "center",
    },
    {
        key: "deleted_state",
        title: "状态",
        align: "center",
        render: (row) => {
            if (row.deleted_state) {
                const tagTypes: Record<
                    CityManagement.CityStatusKey,
                    NaiveUI.ThemeColor
                > = {
                    "1": "success",
                    "2": "error",
                    "3": "warning",
                    "4": "default",
                };

                return (
                    <NTag type={tagTypes[row.deleted_state]}>
                        {cityStatusLabels[row.deleted_state]}
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
                    <NButton size={"small"} onClick={() => handleEditTable(row._id)}>
                        编辑
                    </NButton>
                    <NPopconfirm onPositiveClick={() => handleDeleteTable(row._id)}>
                        {{
                            default: () => "确认删除",
                            trigger: () => <NButton size={"small"}>删除</NButton>,
                        }}
                    </NPopconfirm>
                </NSpace>
            );
        },
    },
]) as Ref<DataTableColumns<CityManagement.City>>;

const modalType = ref<ModalType>("add");

function setModalType(type: ModalType) {
    modalType.value = type;
}

let editData = reactive<CityManagement.City>(createDefaultEditData());
function createDefaultEditData(): CityManagement.City {
    return {
        _id: null,
        index: null,
        key: null,
        /** 城市id */
        city_id: '',
        /**城市状态 */
        deleted_state: '',
        /** 城市名 */
        city_name: '',

    };
}
/**
 * 设置需要操作的数据的函数
 * @param   data  需要操作的数据
 */
function setEditData(data: CityManagement.City | null) {
    Object.assign(editData, createDefaultEditData(), data);
    console.log('editData: ', editData);
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

/**删除单表格数据 */
async function handleDeleteTable(rowId: string | null) {
    // window.$message?.info(`删除的_id是${rowId}`)
    let { error, data } = await fetchCityDel(rowId as string);
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


function handleDeleteAllTable() {


}



const rowProps = (row: CityManagement.City) => {
    return {
        style: 'cursor: pointer;',
        onClick: () => {
            window.$message?.info(row.index as any)
        }
    }
}

const checkedRowKeysRef = ref<DataTableRowKey[]>([])
/**选中行事件 */
const handleCheck = (rowKeys: DataTableRowKey[]) => {
    //选中的key值数组,可以进行多选操作比如删除,等等
    checkedRowKeysRef.value = rowKeys


    window.$message?.info(`你选择中了 ${rowKeys}` as any)
}



function init() {
    getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
