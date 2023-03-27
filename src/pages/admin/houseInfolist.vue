<template>
  <n-card title="用户管理" :bordered="false" class="rounded-16px shadow-sm">
    <n-h3> 房源信息列表 </n-h3>
    <!-- 搜索 -->

    <n-form
      ref="formRef"
      :model="model"
      inline
      label-placement="left"
      :label-width="80"
      :style="{
        maxWidth: '1240px',
      }"
    >
      <n-form-item label="房屋类别:" path="selectValue">
        <n-select
          v-model:value="model.selectValue"
          placeholder="Select"
          :options="generalOptions"
          style="width: 200px"
        />
      </n-form-item>
      <n-form-item label="城市:" path="city">
        <n-select
          v-model:value="model.selectValue"
          placeholder="Select"
          :options="generalOptions"
          style="width: 200px"
        />
      </n-form-item>
      <n-form-item label="关键字:" path="inputValue">
        <n-input v-model:value="model.inputValue" placeholder="Input" />
      </n-form-item>
      <n-form-item><n-button type="primary"> 搜索 </n-button></n-form-item>
    </n-form>
    <n-table :single-line="false">
      <thead>
        <tr>
          <th v-for="(v, idx) in TableTh" :key="idx" :class="v.key">
            {{ v.label }}
          </th>
        </tr>
      </thead>
      <Suspense>
        <tbody>
          <tr
            v-for="(item, i) in useGetTableDataEs(store.houseInfoList)"
            :key="item.id"
          >
            <td v-for="v in TableTh" :class="v.key" :key="v.key">
              <template v-if="v.key === 'first_picture'">
                <img :src="item.tableItem[v.key][1]" alt="房源图片" />
              </template>
              <template v-else-if="v.key === 'Homeowner_info'">
                {{ item.tableItem[v.key].username }}</template
              ><template v-else-if="v.key === 'house_description'">
                <n-ellipsis :line-clamp="2" :tooltip="false">
                  <p v-if="item.tableItem[v.key] != ''">
                    {{ item.tableItem[v.key] }}
                  </p>
                  <p v-else>
                    房源位置 这是1套自如品质房源，位于汉阳人信汇二期天悦。
                  </p>
                </n-ellipsis>
              </template>
              <template v-else-if="v.key == 'operation'">
                <n-button text @click="showHouse(item.id as string)"
                  >查看</n-button
                >
                <n-button text @click="updataHouse(item.id as string)"
                  >修改</n-button
                ><n-button text>删除</n-button>
              </template>

              <template v-else> {{ item.tableItem[v.key] }}</template>
            </td>
          </tr>
        </tbody>

        <template #fallback>
          <tbody class="table-loading">
            <n-spin size="large" />
          </tbody>
        </template>
      </Suspense>
    </n-table>
    <div class="pagination">
      <n-pagination
        :page-count="Math.ceil(store.getHouseNums / pageSize)"
        size="medium"
        show-quick-jumper
        show-size-picker
        :page-sizes="[10, 20, 30, 40]"
        :on-update:page="updatePage"
        :on-update:page-size="upDataPageSize"
      />
    </div>
    <n-modal
      v-model:show="showModal"
      :style="bodyStyle"
      size="huge"
      :bordered="false"
    >
      <div>
        <n-thing>
          <template #header>房源信息详情 </template>
          <template #header-extra>
            <n-button tertiary size="small" @click="showModal = false"
              ><n-icon :component="CloseOutline" size="40" :depth="1"
            /></n-button>
          </template>
        </n-thing>
        <show-card :house-data-one="(housedataone as IhouseInfo)" />
      </div>
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { CloseOutline } from "@vicons/ionicons5";
import { onMounted, reactive, Ref, ref } from "vue";
import { useHouseInfoStore } from "@/store/modules/index";
import { type IhouseInfo } from "@/typings/ApiInterface";
import showCard from "./component/showCard.vue";
import * as _ from "lodash";
import {
  TableTh,
  useGetTableData,
  useGetTableDataEs,
} from "@/store/modules/admin/tableData";
const page: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(10);
const showModal = ref(false);
const housedataone = ref({});
const model = reactive({ inputValue: "", selectValue: "--所有--" });
const store = useHouseInfoStore();

const bodyStyle = {
  width: "1440px",
  background: "#fff",
  padding: "12px",
};
function showHouse(id: string) {
  showModal.value = true;
  // housedataone.value = store.getHouseInfoOne(id);
  housedataone.value = _.find(
    useGetTableDataEs(store.houseInfoList),
    (item) => {
      return item.id === id;
    }
  ).tableItem;
}
const updataHouse = (id: string) => {};

const segmented = {
  content: "soft",
  footer: "soft",
} as const;
function onNegativeClick() {
  console.log("1");
}
function onPositiveClick() {
  console.log("2");
}

function updatePage(num: number) {
  page.value = num;
  store.setHouseInfoList({
    page: page.value,
    pageSize: pageSize.value,
  });
}

function upDataPageSize(num: number) {
  pageSize.value = num;
  store.setHouseInfoList({
    page: page.value,
    pageSize: pageSize.value,
  });
}

onMounted(() => {
  if (store.HouseInfo.length === 0) {
    store.setHouseInfoALl();
  }
});

const generalOptions = [
  "--所有--",
  "groode",
  "veli good",
  "emazing",
  "lidiculous",
].map((v) => ({
  label: v,
  value: v,
}));
</script>

<style lang="scss" scoped>
th,
td {
  text-align: center;
}
.table-loading {
  width: 100%;
  height: 100%;
}

.address {
  width: 300px;
}

.house_description {
  width: 200px;
}

.Homeowner_info {
  width: 80px;
}

.operation {
  width: 150px;
  button {
    margin: 6px;
  }
}

.first_picture {
  width: 250px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
