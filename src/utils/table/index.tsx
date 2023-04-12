import dayjs from "dayjs";
import {
  NButton,
  NImage,
  NPopconfirm,
  NSpace,
  NTag,
  NEllipsis,
} from "naive-ui";
import { VNode, h } from "vue";
import { dateFormat } from "@/utils";
type ColumnRender = (params: any) => JSX.Element;
type ColumnAlign = "left" | "center" | "right";

interface Column {
  key: string;
  title: string;
  align?: ColumnAlign;
  render?: ColumnRender;
  type?: string;
}

export const createColumn = (
  key: string | undefined,
  title: string | undefined,
  render?: ColumnRender,
  align: ColumnAlign = "center",
  type?: string
): Partial<Column> => ({
  key,
  title,
  align,
  render,
  type,
});

export const baseColuns: any[] = [
  createColumn(undefined, undefined, undefined, "center", "selection"),
  createColumn("index", "序号"),
];

const tagTypes: Record<AdminManagement.StatusKey, NaiveUI.ThemeColor> = {
  "1": "success",
  "2": "error",
  "3": "warning",
  "4": "default",
  "5": "primary",
  "0": "info",
};

export function renderTag(
  statusKey: string,
  tagLabels: Record<string, string>
) {
  if (statusKey) {
    return <NTag type={tagTypes[statusKey]}>{tagLabels[statusKey]}</NTag>;
  }
  return <span></span>;
}

export function renderFormDate(create_time: string | Date | null) {
  if (create_time) {
    return <span>{dateFormat(create_time)}</span>;
  }
  return <span> </span>;
}

export function renderIMG(create_time: string | Date) {
  if (create_time) {
    return <span>{dayjs(create_time).format("YY年MM月DD日 HH:mm:ss")}</span>;
  }
  return <span> </span>;
}
/**
 * 渲染带有特定样式的图片
 * @param first_picture 图片的URL
 * @returns 返回一个带有指定样式的图片VNode
 */
export function renderFirstPicture(first_picture: string | undefined): VNode {
  return h(NImage, {
    style: {
      width: "200px",
      "aspect-ratio": "1.3 / 1",
      display: "inline-block",
    },
    src: first_picture,
  });
}

/**
 * 渲染房屋描述
 * @param house_description 房屋的描述
 * @returns 返回一个带有指定样式的房屋描述VNode
 */
export function renderDescription(
  house_description: string | undefined
): VNode {
  if (!house_description) {
    return <span>暂无房屋信息介绍</span>;
  }

  return (
    <NEllipsis style={{ width: "200px" }} line-clamp={"4"} tooltip={false}>
      {house_description}
    </NEllipsis>
  );
}

export function renderHouseAction(
  row: any,
  handleEditTable: (id: string | null) => void,
  handleShowTable: (id: string | null) => void,
  handleDeleteTable: (id: string | null) => void
): VNode {
  return (
    <NSpace justify={"center"}>
      <NButton size={"small"} onClick={() => handleEditTable(row.key)}>
        编辑
      </NButton>
      <NButton size={"small"} onClick={() => handleShowTable(row.key)}>
        查看
      </NButton>
      <NPopconfirm onPositiveClick={() => handleDeleteTable(row.key)}>
        {{
          default: () => "确认删除",
          trigger: () => <NButton size={"small"}>删除</NButton>,
        }}
      </NPopconfirm>
    </NSpace>
  );
}

export function renderBaseAction(
  row: any,
  handleEditTable: (id: string | null) => void,
  handleDeleteTable: (id: string | null) => void
): VNode {
  return (
    <NSpace justify={"center"}>
      <NButton size={"small"} onClick={() => handleEditTable(row)}>
        编辑
      </NButton>

      <NPopconfirm onPositiveClick={() => handleDeleteTable(row.key)}>
        {{
          default: () => "确认删除",
          trigger: () => <NButton size={"small"}>删除</NButton>,
        }}
      </NPopconfirm>
    </NSpace>
  );
}
