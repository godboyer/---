<template>
  <n-card>
    <div>
      <n-h2>上传视频</n-h2>
      <span class="text-14px color-#D90000 lh-16px">视频大小请勿超过20mb</span>
    </div>
    <n-upload
      directory-dnd
      :max="1"
      name="feedback"
      :custom-request="customRequestHandler"
      @finish="handleUploadVideoFinish"
      @remove="handleRemove"
    >
      <n-upload-dragger v-show="testVideo">
        <div style="margin-bottom: 12px">
          <icon-ph:archive-tray class="text-48px" />
        </div>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
        </n-p>
      </n-upload-dragger>
    </n-upload>
  </n-card>
</template>

<script setup lang="ts">
import {
  fetchUploadMerge,
  fetchUploadPrepare,
  fetchUploadVideo,
} from "@/service";
import { changeFileToBuffer } from "@/utils";
import { UploadCustomRequestOptions, UploadFileInfo } from "naive-ui";
import { FileInfo } from "naive-ui/es/upload/src/interface";

defineOptions({
  name: "UploadVideo",
});

const props = defineProps<{
  //   action: string;
  fieldname: string;
  dirpath: string;
}>();
const emit = defineEmits<{
  (event: "finish", args: ApiUpload.VideoInfo): void;
  // (event: "remove", ...args: any[]): void;
}>();

const testVideo = ref(true);
function handleRemove() {
  testVideo.value = true;
}

/** 切片上传完成处理*/
function handleUploadVideoFinish({
  file,
  event,
}: {
  file: UploadFileInfo;
  event?: ProgressEvent;
}) {
  console.log("切片上传上传完成", file, event);
  testVideo.value = false;
}
/**
 * 自定义上传请求
 */
function customRequestHandler(options: UploadCustomRequestOptions) {
  const { file, onFinish, onError } = options;
  //判断文件类型
  const { type, file: fileInfo } = file;
  // console.log('fileInfo: ', fileInfo);
  if (type?.indexOf("video") === -1) {
    onError();
    return;
  }

  //文件切片上传
  uploadFileByChunks(file, options);
}

interface Chunkvalue {
  filename: string;
  [key: string]: any;
}
/**
 * 切片上传文件函数
 * @param fileInfo 要上传的文件信息对象
 * @param options 上传请求的其他选项
 * @param chunkSize 每个块的大小
 */
async function uploadFileByChunks(
  fileInfo: FileInfo,
  options: UploadCustomRequestOptions,
  chunkSize: number = 2 * 1024 * 1024 // 2MB
): Promise<void> {
  const { onProgress, onFinish, onError, action } = options;
  // 1. 获取文件信息
  const file = fileInfo.file!;
  // const 
  let { HASH, buffer, suffix, filename } = await changeFileToBuffer(file);

  //获取已经上传的文件切片信息
  let already: string[] = []; //已经上传的切片
  try {
    let { error, data } = await fetchUploadPrepare(HASH);
    // console.log("data: ", data);
    if (!error && data) {
      already = data.fileList;
    }
  } catch (error) {}

  // 2. 将文件切成块 [固定数量 && 固定大小]
  //文件字段
  const chunks: Chunkvalue[] = []; //切片后的文件数组
  let numChunks = Math.ceil(file.size / chunkSize); //切片的数量
  if (numChunks > 100) {
    chunkSize = Math.ceil(file.size / 100);
    numChunks = 100;
  }
  let index = ref(0);
  while (index.value < numChunks) {
    let newChunk: Chunkvalue = {
      filename: `${HASH}_${index.value + 1}.${suffix}`,
    };
    newChunk[props.fieldname] = file.slice(
      index.value * chunkSize,
      (index.value + 1) * chunkSize
    );
    chunks.push(newChunk);
    index.value++;
  }

  // 2. 上传每个块
  // 当前上传的切片索引
  let currentIndex = 0;

  //每个切片上传完成后，调用此方法
  function onLoaded() {
    currentIndex++;
    // 上传进度
    onProgress({
      percent: Math.round((currentIndex / numChunks) * 100),
    });

    // 上传完成
    if (currentIndex == numChunks) {
      //上传完成后，合并切片
      fetchUploadMerge({
        HASH,
        numChunks,
        dirpath: props.dirpath,
      })
        .then((result) => {
          const { error, data } = result;
          if (!error && data) {
            emit("finish", data);
            onFinish();
            return;
          }
          return Promise.reject(error);
        })
        .catch((err) => {
          console.log("err: ", err);
          onError();
        });
    }
  }

  chunks.forEach((chunk, index) => {
    //判断当前切片是否已经上传过
    let dirName = `${props.fieldname}_${chunk.filename}`;
    if (already.length > 0 && already.includes(dirName)) {
      console.log("这个切片已经上传过了");
      onLoaded();
      return;
    }

    fetchUploadVideo(chunk, {
      HASH,
      filename: chunk.filename,
      suffix,
      chunkSize,
      numChunks,
      index: index + 1,
    })
      .then((result) => {
        const { error, data } = result;
        if (!error && data) {
          onLoaded();
          return;
        }
        return Promise.reject(error);
      })
      .catch((err) => {
        onError();
        alert("当前切片上传失败,请重新上传");
      });
  });
}
</script>

<style scoped></style>
