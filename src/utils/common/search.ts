import { MaybeRef } from "@vueuse/core";
import { Ref, toRefs, unref } from "vue";
import { isString } from "./typeof";

/**
 * 指定一个字段或者数组搜索
 * @param searchQuery 搜索关键词字符串的 Ref 对象
 * @param originalData 原始数据数组的 MaybeRef 对象
 * @param searchFields 可选的搜索字段数组，每个元素应该是原始数据对象的一个键名，如果不传则默认为原始数据对象的所有键名数组。
 * @returns 过滤后的数据数组的 Ref 对象
 */
export function querySpecifiedFields<T>(
  searchQuery: MaybeRef<string>,
  originalData: MaybeRef<T[]>,
  searchFields: MaybeRef<string> | MaybeRef<string[]>
): T[] {
  let filteredData: any[] = [];
  const searchFieldsArray = Array.isArray(searchFields)
    ? searchFields
    : [searchFields];

  const newQuery = unref(searchQuery).toLowerCase().trim();
  console.log('newQuery: ', newQuery);

  if (!newQuery) {
    return [...unref(originalData)];
  }
  // p: 你好

  filteredData = unref(originalData).filter((item) =>
    searchFieldsArray
      .map((field) => {
        const fieldValue = item[field as keyof T];
        return fieldValue ? String(fieldValue).toLowerCase() : "";
      })
      .some((value) => value.includes(newQuery.toLowerCase()))
  );

  return filteredData;
}

/**
 * 无指定字段搜索(全局搜索 模糊搜索)
  这个函数将会搜索所有对象的所有字段，并将包含搜索关键词的对象返回。
 * @param searchQuery 搜索的参数
 * @param originalData 搜索的数据来源
 * @returns 
 */
export function queryAllFields<T>(
  searchQuery: MaybeRef<string>,
  originalData: Ref<T[]>
): T[] {
  let toRefsOriginalData = unref(originalData) as any[];
  const _originalData: any[] = [
    ...unref(originalData).map((item, index) => {
      return {
        ...item,
        queryId: String(index + 10),
      };
    }),
  ];
  // console.log("searchQuery: ", searchQuery);

  const searchQueryValue = unref(searchQuery).trim();
  // console.log("searchQueryValue: ", searchQueryValue);
  if (!searchQueryValue) {
    return [...unref(originalData)];
  }

  const searchFieldsArray = getKeys(toRefsOriginalData[0]);
  console.log("searchFieldsArray: ", searchFieldsArray);

  const matchedKeys = new Set<string>();
  const reg = new RegExp(searchQueryValue, "i");
  for (const item of _originalData) {
    for (const field of searchFieldsArray) {
      if (isString(item[field]) && reg.test(item[field])) {
        matchedKeys.add(item["queryId"]);
      }
    }
  }

  return _originalData.filter((item) => matchedKeys.has(item["queryId"]));
}

function getKeys<T extends {}>(o: T): (keyof T)[] {
  return Object.keys(unref(o)) as (keyof T)[];
}
