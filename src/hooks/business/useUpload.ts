import { UploadCustomRequestOptions } from "naive-ui";

/**
 * 切片上传文件函数
 * @param file 要上传的文件对象
 * @param options 上传请求的其他选项
 * @param chunkSize 每个块的大小
 */
async function uploadFileByChunks(
  file: File,
  options: UploadCustomRequestOptions,
  chunkSize: number = 2 * 1024 * 1024 // 2MB
): Promise<void> {
  const { onProgress, onFinish, onError } = options;

  // 1. 将文件切成块
  const chunks: Blob[] = [];
  let start = 0;
  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    chunks.push(file.slice(start, end));
    start += chunkSize;
  }

  // 2. 上传每个块
  const numChunks = chunks.length;
  let uploadedChunks = 0;
  for (let i = 0; i < numChunks; i++) {
    const formData = new FormData();
    formData.append('file', chunks[i]);
    formData.append('chunkIndex', i.toString());
    if (typeof options.data === 'function') {
      Object.entries(options.data({ file })).forEach(([key, value]) => {
        formData.append(key, value);
      });
    } else if (options.data) {
      Object.entries(options.data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    const res = await axios.post(options.action, formData, {
      withCredentials: options.withCredentials || false,
      headers: typeof options.headers === 'function' ? options.headers({ file }) : options.headers,
      onUploadProgress: (e: ProgressEvent) => {
        const percent = Math.round((100 * (uploadedChunks + e.loaded / e.total)) / numChunks);
        onProgress({ percent });
      },
    }).catch(err => {
      onError();
      throw err;
    });
    uploadedChunks++;
  }

  // 3. 通知上传完成
  onFinish();
}


const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB
/**
 * 将上传完成的部分存储到 IndexedDB 中
 * @param fileInfo 包含要上传的文件信息的对象
 * @param chunkIndex 已经上传的最后一个块的索引
 */
async function saveUploadedChunksToIndexedDB(fileInfo: FileInfo, chunkIndex: number): Promise<void> {
  const dbName = 'my-db';
  const storeName = 'uploaded-chunks';

  // 打开 IndexedDB 数据库
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onerror = () => {
      reject(new Error('无法打开 IndexedDB 数据库'));
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'fileId' });
      }
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
  });

  // 将已上传的块信息存储到 IndexedDB 中
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  // 读取已上传的块信息
  const record = await new Promise<IDBObjectStore>((resolve, reject) => {
    const request = store.get(fileInfo.id);
    request.onerror = () => {
      reject(new Error('无法读取 IndexedDB 数据'));
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
  });
  const chunks = record ? JSON.parse(record.chunks) : [];
  const numChunks = Math.ceil(fileInfo.file!.size / CHUNK_SIZE);
  for (let i = chunkIndex + 1; i < numChunks; i++) {
    chunks[i] = true;
  }
  await new Promise<void>((resolve, reject) => {
    const request = store.put({ fileId: fileInfo.id, chunks: JSON.stringify(chunks) });
    request.onerror = () => {
      reject(new Error('无法存储 IndexedDB 数据'));
    };
    request.onsuccess = () => {
      resolve();
    };
  });

  // 关闭数据库连接
  db.close();
}
