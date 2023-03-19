import { decrypto, encrypto } from "../crypto";
interface StorageData<T> {
  value: T;
  expire: number | null;
}


/**
 * 这段代码定义了一个函数createLocalStorage，用于创建本地存储（localStorage）对象，
 * 提供了设置、获取、删除、清空本地存储的功能。
 * 其中，set函数用于向本地存储中设置指定键名（key）的值，
 * 如果设置了过期时间，则会将过期时间一起保存；
 * get函数用于从本地存储中获取指定键名的值，如果该值存在且未过期，则直接返回该值，否则返回null；
 * remove函数用于从本地存储中删除指定键名的值；clear函数用于清空本地存储中的所有值。
 * 在set函数中，该函数会将传入的value和expire属性保存到一个名为storageData的对象中，
 * 然后调用encrypto函数对该对象进行加密，最后将加密后的结果以JSON格式保存到本地存储中；
 * 在get函数中，该函数会先从本地存储中获取指定键名的值，然后通过decrypto函数对其进行解密，
 * 最后判断该值是否存在、是否过期，如果符合要求，则直接返回该值，否则返回null并将该键名从本地存储中删除。
 * @returns 本地存储的方法 get set remove等
 */

function createLocalStorage<
  T extends StorageInterface.Local = StorageInterface.Local
>() {
  /** 默认缓存期限为7天 */
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
  // 然后,这个storageData对象会经过加密函数encrypto进行加密,最后存储到localstorage里面。
  function set<K extends keyof T>(
    key: K,
    value: T[K],
    expire: number | null = DEFAULT_CACHE_TIME
  ) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    };
    const json = encrypto(storageData);
    window.localStorage.setItem(key as string, json);
  }

  function get<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(key as string);
    if (json) {
      let storageData: StorageData<T[K]> | null = null;
      try {
        storageData = decrypto(json);
      } catch {
        // 防止解析失败
      }
      if (storageData) {
        const { value, expire } = storageData;
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value as T[K];
        }
      }
      remove(key);
      return null;
    }
    return null;
  }

  function remove(key: keyof T) {
    window.localStorage.removeItem(key as string);
  }
  function clear() {
    window.localStorage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
}

export const localStg = createLocalStorage();
