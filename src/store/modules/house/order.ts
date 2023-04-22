import { defineStore } from "pinia";

interface OrderStore {
  /**订单列表 */
  OrderList: RentalOrderManagement.RentalOrder[];
  /**订单数量 */
  OrderTotal: number | string;
  /**出租人 */
  lessor: string;
  /**租客 */
  lessee: string;
  /**房源 */
  houseId: string;
  /**房源租约id */
  houselease_id: string;
  /**用户id */
  user_id: string;
  /**开始时间 */
  begin_date: number | null;
  /**结束时间 */
  end_date: number | null;
  /**天数 */
  days: number;
  /**房租 */
  house_price: number;
  /**总金额 */
  amount: number;
  /**订单状态 */
  status: string;
  /**创建时间 */
  createAt: number | null;
}

export const useOrderStore = defineStore("order-Store", {
  state: (): OrderStore => {
    return {
      OrderList: [],
      OrderTotal: 0,
      lessor: "",
      lessee: "",
      houseId: "",
      houselease_id: "",
      user_id: "",
      begin_date: null,
      end_date: null,
      days: 0,
      house_price: 0,
      amount: 0,
      status: "1",
      createAt: null,
    };
  },
  actions: {
    //设置出租人
    setLesser(lesser: string) {
      this.lessee = lesser;
    },
    //设置租客
    setLessor(lessor: string) {
      this.lessor = lessor;
    },
    //设置房源
    setHouseId(houseId: string) {
      this.houseId = houseId;
    },
    //生成订单信息
    setOrderInfo(orderInfo: ApiRentalOrderManagement.RentalOrder) {
      this.houselease_id = orderInfo.houselease_id;
      this.user_id = orderInfo.user_id;
      this.begin_date = orderInfo.begin_date;
      this.end_date = orderInfo.end_date;
      this.days = orderInfo.days;
      this.house_price = orderInfo.house_price;
      this.amount = orderInfo.amount;
      this.status = orderInfo.status;
      this.createAt = orderInfo.createAt;
    },
  },

  getters: {
    getOrderInfo: (state) => {
      return {
        houselease_id: state.houselease_id,
        user_id: state.user_id,
        house_id: state.houseId,
        begin_date: state.begin_date,
        end_date: state.end_date,
        days: state.days,
        house_price: state.house_price,
        amount: state.amount,
        status: state.status,
        createAt: state.createAt,
      };
    },
    //获取订单号
    getOrderNumber: (state) => {
      return  state.houselease_id;
    }

  },
});
