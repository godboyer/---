import { Ref, unref } from "vue";

export default function useTypeCheck() {
  const checkType = (input: Ref | any) => {
    const type = Object.prototype.toString.call(unref(input));
    return type;
  };
  const isFunction = (input: Ref | any) => {
    return checkType(unref(input)) === "[object Function]";
  };

  const isString = (input: Ref | any) => {
    return checkType(unref(input)) === "[object String]";
    };
    
     const isArray = (input: Ref | any) => {
    return checkType(unref(input)) === "[object Array]";
  };

  const isObject = (input: Ref | any) => {
    return checkType(unref(input)) === "[object Object]";
  };
  return {
    isFunction,
    isString,
    isArray,
    isObject,
  };
}
