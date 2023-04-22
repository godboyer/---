const MAX_ITEMS = 10000;
const PAGE_SIZE = 10;

async function fetchItems(start = 0, limit = PAGE_SIZE) {
  const url = `https://example.com/items?start=${start}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const itemCache:Record<string,any> = new Proxy({}, {
  get(target:Record<string,any>, property:string) {
    if (!(property in target)) {
      target[property] = {};
    }
    return target[property];
  }
});

async function getItems(page: number) {
  const start = (page - 1) * PAGE_SIZE;
  const promises = [];
  for (let i = 0; i < PAGE_SIZE; i++) {
    const index = start + i;
    if (index >= MAX_ITEMS) {
      break;
    }
    if (!itemCache[page][index]) {
      itemCache[page][index] = fetchItems(index, 1)
        .then((items) => {
          return items[0];
        });
    }
    promises.push(itemCache[page][index]);
  }

  const items = await Promise.all(promises);
  return items;
}

// getItems(1).then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.error(error);
// });

export { getItems };