import qs from "qs";
import FormData from "form-data";
import { EnumContentType } from "@/enum";
import { isArray, isFile } from "../common";
import SparkMD5 from "spark-md5";

/**
 * 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
export async function transformRequestData(
  requestData: any,
  contentType?: string
) {
  // application/json类型不处理
  let data = requestData;
  // form类型转换
  if (contentType === EnumContentType.formUrlencoded) {
    data = qs.stringify(requestData);
  }
  // form-data类型转换
  if (contentType === EnumContentType.formData) {
    data = await handleFormData(requestData);
  }

  return data;
}

async function handleFormData(data: Record<string, any>) {
  const formData = new FormData();
  const entries = Object.entries(data);
  console.log('entries: ', entries);
  entries.forEach(async ([key, value]) => {
    // 判断是否为文件类型
    const isFileType =
      isFile(value) || (isArray(value) && value.length && isFile(value[0]));

    if (isFileType) {
      await transformFile(formData, key, value);
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}

/**
 * 接口为上传文件的类型时数据转换
 * @param key - 文件的属性名
 * @param file - 单文件或多文件
 */
async function transformFile(
  formData: FormData,
  key: string,
  file: File[] | File
) {
  if (isArray(file)) {
    // 多文件
    await Promise.all(
      (file as File[]).map((item) => {
        formData.append(key, item);
        return true;
      })
    );
  } else {
    // 单文件
    formData.append(key, file);
  }
}

/**将file文件转换为buffer并使用hash计算出文件的md5值
 * @param file
 */

interface ReturnFileBuffer { 
  buffer: ArrayBuffer;
  HASH: string;
  suffix: string;
  filename: string;
}


export function changeFileToBuffer(file: File): Promise<ReturnFileBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (ev) => {
      let buffer = ev.target?.result as ArrayBuffer,
        spark = new SparkMD5.ArrayBuffer();

      spark.append(buffer);
      let HASH = spark.end();
      let suffix = (/\.([a-zA-Z0-9]+)$/.exec(file.name) as RegExpExecArray)[1];

      resolve({
        buffer,
        HASH,
        suffix,
        filename: `${HASH}.${suffix}`,
      });
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
}
