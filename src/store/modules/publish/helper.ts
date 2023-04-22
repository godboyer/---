import { DynamicTagsOption } from "naive-ui";

interface MyDynamicTagsOption extends DynamicTagsOption {
  checked: boolean;
}
export const dynamicTagsValueDefalut:MyDynamicTagsOption[] = [
     {
        label: "合租",
        value: "tag_合租",
        checked: false,
      },
      {
        label: "独立公寓",
        value: "tag_独立公寓",
        checked: false,
      },
      {
        label: "转租找室友",
        value: "tag_转租找室友",
        checked: false,
      },
      {
        label: "长租",
        value: "tag_长租",
        checked: false,
      },
      {
        label: "短租",
        value: "tag_短租",
        checked: false,
      },
      {
        label: "长&短租",
        value: "tag_长&短租",
        checked: false,
      },
      {
        label: "搬离",
        value: "tag_搬离",
        checked: false,
      },
      {
        label: "LGBTQ友好",
        value: "tag_LGBTQ友好",
        checked: false,
      },
      {
        label: "宠物友好",
        value: "tag_宠物友好",
        checked: false,
      },
]