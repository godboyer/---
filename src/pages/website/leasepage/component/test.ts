import {decrypto} from "@/utils/crypto";
// 定义每页显示的数据条数
const PAGE_SIZE = 10;
// 定义数据总条数
const MAX_ITEMS = 10000;

// 定义 Item 接口，表示每个数据项的结构
export interface Item {
  id: number;
  name: string;
  // 其他属性...
}

// 定义 ItemCache 接口，表示数据缓存的结构
interface ItemCache {
  [index: number]: Promise<Item>;
}

// 定义一个使用 WeakMap 实现的数据缓存类
class ItemCacheMap {
  private cache: WeakMap<object, ItemCache>;

  constructor() {
    this.cache = new WeakMap();
  }

  // 获取指定页码的数据
  public get(page: number, target: object): Promise<Item[]> {
    // 从缓存中获取对应的数据
    let pageCache = this.cache.get(target);
    if (!pageCache) {
      // 如果该对象还没有缓存数据，则创建一个新的缓存对象
      pageCache = {};
      this.cache.set(target, pageCache);
    }
    // 获取该页码对应的 Promise 对象
    let item = pageCache[page];
    if (!item) {
      // 如果该页码的数据还没有被获取，则通过 fetchItems() 函数获取数据，并将其保存到缓存中
      item = fetchItems(page);
      pageCache[page] = item;
    }
    // 返回 Promise 对象
    return item;
  }
}

// 定义获取数据的异步函数，参数为页码
async function fetchItems(page: number): Promise<Item[]> {
  // 计算数据的起始位置和条数
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  // 构造请求的 URL
  const url = `http://localhost:3040/api/comment/all-list`;
  // 发送请求获取数据
  const response = await fetch(url);
  // 解析返回的 JSON 数据
  const data = await response.json();
  console.log('data: ', decrypto(data.data));
  // 返回解析后的数据
  return decrypto(data.data);
}

// 使用 ItemCacheMap 类构造一个缓存对象，用于保存已经获取的数据
const itemCache = new ItemCacheMap();

// 定义获取数据的函数，参数为页码和组件实例对象
async function getItems(page: number, target: object): Promise<Item[]> {
    console.log(itemCache);
  // 调用 ItemCacheMap.get() 方法获取数据
  const item = await itemCache.get(page, target);
  console.log('item: ', item);
  // 返回获取到的数据
  return item;
}

export {getItems}












