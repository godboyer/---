<template>
  <div class="container">
    <h1>房屋租赁押金托管协议</h1>
    <table>
      <tr>
        <th>甲方（出租方）</th>
        <td>{{ lessor }}</td>
      </tr>
      <tr>
        <th>乙方（承租方）</th>
        <td>{{ lessee }}</td>
      </tr>
      <tr>
        <th>丙方（托管方）</th>
        <td>{{ Platform }}</td>
      </tr>
      <tr>
        <th>租赁押金总额</th>
        <td>{{ price }}元</td>
      </tr>
    </table>
    <p>
      鉴于甲方与乙方签订了关于房屋租赁的协议，并按照约定交付了租赁押金，甲乙双方通过协商一致，现签订本协议，就租赁押金的托管事宜达成如下约定：
    </p>
    <ol>
      <li>
        甲方委托乙方代为保管租赁押金。租赁押金总额为[金额]元，将在协议签订后三个工作日内存入乙方的银行账户。
      </li>
      <li>乙方承诺妥善保管甲方的租赁押金，并按照以下情况予以处理：</li>
      <ol type="a">
        <li>
          如果租赁期满，甲方履行了租赁合同的全部义务，未发生违约行为，乙方应立即将其托管的租赁押金退还给甲方。
        </li>
        <li>
          如果租赁期满，甲方未履行租赁合同的全部义务，发生了违约行为，乙方应根据双方协商的方式，从托管账户中扣除相应的违约金，并将扣除后的余额退还给甲方。
        </li>
        <li>
          如果在租赁期内发生甲方和乙方不能协商解决的争议，乙方有权暂停执行退还租赁押金的义务，待争议解决后再行处理。
        </li>
      </ol>
      <li>
        本协议自签订之日起生效，有效期至租赁押金退还给甲方之日。本协议未尽事项，由双方另行协商解决。
      </li>
      <li>本协议一式两份，甲乙双方各执一份。</li>
    </ol>
    <div class="signature">
      <p>
        甲方（出租人）：<span class="name">{{ lessor }}</span>
      </p>
      <p>
        乙方（承租人）：<span class="name">{{ lessee }}</span>
      </p>
      <p>
        日期：<span class="name">{{ date }}</span>
      </p>
    </div>
    <n-space justify="space-between">
      <n-button @click="disagreeHandle">不同意</n-button>
      <n-button
        class="font-700"
        color="#00CBCA"
        text-color="#fff"
        @click="agreeAndSubmitHandle"
        >同意并提交</n-button
      >
    </n-space>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { fetchAddOrder } from "@/service";
import { useOrderStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouterPush } from "@/composables";

interface Props {
  lessor: string;
  lessee: string;
  price: number | string;
}

defineOptions({
  name: "contract",
});

const props = defineProps<Props>();
const orderStore = useOrderStore();
const { getOrderInfo, getOrderNumber } = storeToRefs(orderStore);
const { routerPush } = useRouterPush();

const date = ref(dayjs(new Date()).format("YYYY-MM-DD hh:mm"));
const Platform = ref("房屋租赁平台");

function disagreeHandle() {
  console.log("不同意");
}
async function agreeAndSubmitHandle() {
  console.log("同意并提交", getOrderInfo.value);
  //获取订单信息

  //ajax提交订单信息
  let { error, data } = await fetchAddOrder(
    orderStore.houseId,
    getOrderInfo.value
  );
  if (error || !data) {
    window.$message?.error("订单生成失败");
    return;
  } else {
    console.log(data);
    window.$dialog?.success({
      title: "提示",
      content: "订单生成成功",
      positiveText: "去支付",
      negativeText: "取消",
      onNegativeClick: () => {
        //保存订单信息
        orderStore.setOrderInfo(data as ApiRentalOrderManagement.RentalOrder);
      },
      onPositiveClick: () => {
        //跳转到支付页面
        routerPush({
          path: "/rent/pay",
          query: {
            orderId: getOrderNumber.value,
          },
        });
      },
    });
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

td,
th {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

th {
  background-color: #f2f2f2;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.signature {
  margin-top: 50px;
  text-align: center;
}

.signature p {
  margin-bottom: 10px;
}

.signature .name {
  font-weight: bold;
}
</style>
