type TableColumn = {
  key:
    | "index"
    | "city_name"
    | "house_description"
    | "address"
    | "operation"
    | "first_picture"
    | "house_category"
    | "price"
    | "des"
    | "Homeowner_info"
    | "exam_status"
    | "create_time";
  label: string;
};

type TableData = {
  // 定义 TableData 对象的类型
  index: number;
  city_name: string;
  house_category: string;
  address: string;
  price: number;
  des: string;
  first_picture: string;
  house_description: string;
  Homeowner_info: string;
  exam_status: string;
  create_time: string;
  operation: string;
};
type TableTh = Array<TableColumn>;
export const TableTh: Array<TableColumn> = [
  { key: "index", label: "序号" },
  { key: "city_name", label: "所在城市" },
  { key: "house_category", label: "房屋类别" },
  { key: "address", label: "地址" },
  { key: "price", label: "月租费(元/月)" },
  { key: "des", label: "面积/楼层" },
  { key: "first_picture", label: "房屋图片" },
  { key: "house_description", label: "房屋介绍" },
  { key: "Homeowner_info", label: "房东" },
  { key: "exam_status", label: "审核状态" },
  { key: "create_time", label: "发布时间" },
  { key: "operation", label: "操作" },
];

export function useGetTableData<T>(data: T[]): any[] {
  return data.map((item) => {
    const tableItem: any = {};
    TableTh.forEach((v) => {
      tableItem[v.key] = item[v.key as keyof T]; // 断言为 keyof T 类型
    });
    return tableItem;
  });
}

function getCityName(str: any) {
  // 使用正则表达式提取出 city=XXX 中的城市名
  const cityReg = /city=([^;]+)/;
  const match = str.match(cityReg);
  if (match) {
    // 如果正则表达式匹配成功，返回匹配到的第二个括号中的内容
    return match[1];
  } else {
    // 如果匹配失败，返回空字符串或 null
    return "";
  }
}

export function useGetTableDataEs<T>(data: T[]): any[] {
  return data.map((item, index) => {
    const tableItem: any = {};
    let id = item["_id" as keyof T];
    TableTh.forEach((v) => {
      if (v.key === "city_name") {
        tableItem[v.key] = getCityName(item["location_content" as keyof T]);
      } else if (v.key === "first_picture") {
        tableItem[v.key] = item["swiper_pic" as keyof T];
      } else if (v.key === "index") {
        tableItem[v.key] = index + 1;
      } else if (v.key === "operation") {
        tableItem[v.key] = true;
      } else if (v.key === "house_category") {
        tableItem[v.key] = item["exam_status" as keyof T];
      } else {
        tableItem[v.key] = item[v.key as keyof T]; // 断言为 keyof T 类型
      }
    });
    return { id, tableItem };
  });
}
