import {decrypto} from "@/utils/crypto/index"

/** 统一失败和成功的请求结果的数据类型 */
export async function handleServiceResult<T = any>(error: Service.RequestError | null, responseData: any) {
  if (error) {
    const fail: Service.FailedResult = {
      error,
      data: null
    };
    return fail;
  }
  const {data} = responseData;
  console.log('解密后的数据data: ',decrypto(data));
  //成功的数据进行解密
  const success: Service.SuccessResult<T> = {
    error: null,
    data:decrypto(data)
  };
  return success;
}
/** 统一失败和成功的请求结果的数据类型 */
// export async function handleServiceResult<T = any>(error: Service.RequestError | null, data: any) {
//   if (error) {
//     const fail: Service.FailedResult = {
//       error,
//       data: null
//     };
//     return Promise.reject(fail); // 返回一个拒绝的 Promise，将错误信息传递给下一个拦截器
//   }
//   const success: Service.SuccessResult<T> = {
//     error: null,
//     data
//   };
//   return Promise.resolve(success); // 返回一个解决的 Promise，将响应数据传递给下一个拦截器
// }

/** 请求结果的适配器：用于接收适配器函数和请求结果 */
export function adapter<T extends Service.ServiceAdapter>(
  adapterFun: T,
  ...args: Service.MultiRequestResult<TypeUtil.GetFunArgs<T>>
): Service.RequestResult<ReturnType<T>> {
  let result: Service.RequestResult | undefined;

  const hasError = args.some(item => {
    const flag = Boolean(item.error);
    if (flag) {
      result = {
        error: item.error,
        data: null
      };
    }
    return flag;
  });

  if (!hasError) {
    const adapterFunArgs = args.map(item => item.data);
    result = {
      error: null,
      data: adapterFun(...adapterFunArgs)
    };
  }

  return result!;
}
