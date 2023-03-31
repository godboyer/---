import { MaybeRef } from '@vueuse/shared';
import { DataTableColumns } from "naive-ui";
import { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { isRef, Ref, unref } from "vue";
type ColumnKeyTitle = {
  [key: string]: string;
};
/**
 * 提取 `columns` 中的键和标题，并将它们作为对象返回。
 *
 * @param {MaybeRef<DataTableColumns<T>[]>} columns - 一个包含数据表列的数组或 Ref 对象。
 * @returns {ColumnKeyTitle} - 一个对象，其中键是列键，值是对应的标题。
 */
export function extractKeysAndTitles<T>(
  columns: MaybeRef<DataTableColumns<T>>
): ColumnKeyTitle {                                                                                                                                                                                            
  const keysAndTitles: ColumnKeyTitle = {};                                                                                                      
  const unwrappedColumns:any[] = isRef(columns) ? unref(columns) :columns ;
                                                                                                
 unwrappedColumns.forEach((column:any) => {                     
    if (column.key && column.title) {
      keysAndTitles[column.key] = column.title;
    }
  });
  return keysAndTitles;
}




/**
 * 使用提供的键创建一个具有默认值（null）的数据对象。
 *
 * @param {ColumnKeyTitle} keysAndTitles - 一个对象，其中键是列键，值是对应的标题。
 * @returns {Record<string, any>} - 一个具有默认值（any）的数据对象。
 */
export function createDefaultData(keysAndTitles: ColumnKeyTitle,value:any): Record<string, any> {
  const defaultData = Object.entries(keysAndTitles).reduce((obj, [key]) => {
    console.log(typeof key);
    obj[key] = value || null;
    return obj;
  }, {} as Record<string, any>);

  return defaultData;
}

/**
 * 从一组json数据中获取指定字段的数据
 * @param data 一组json数据
 * @param field 指定字段的名称数组
 * @returns 返回指定字段的数据组成的数组
 */
export function extractFields<T extends Record<string, any>, K extends keyof T>(
  data:  MaybeRef<T[]>,
  fields: K[]
): Pick<T, K>[] {
  return unref(data).map((item) => {
    const picked = {} as Pick<T, K>;
    fields.forEach((field) => {
      picked[field] = item[field];
    });
    return picked;
  });
}


export  function setEditActionForm(tableColumns: any) {
    let _formItem = Object.entries(tableColumns).reduce((acc, [key, value]) => {
      let obj = Object({
        path: key,
        label: value,
      });
      acc.push(obj);
      return acc;
    }, [] as any);
   return _formItem;
  }
