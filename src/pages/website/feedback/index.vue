<template>
  <middle-layout>
    <template #title>
      <h2 class="title">网站反馈</h2>
    </template>
    <main class="flex bg-#fff">
      <div class="feedback-page">
        <div class="feedback-form">
          <n-form ref="formRef" class="wh-full" size="large" :model="feedbackInfo" :rules="rules">
            <n-form-item label="邮箱：" path="email">
              <n-input
                v-model:value="feedbackInfo.email"
                placeholder="输入您的有效邮箱"
              />
            </n-form-item>
            <n-form-item label="电话号码:" path="phone">
              <n-input
                v-model:value="feedbackInfo.phone"
                placeholder="输入您的有效电话"
              />
            </n-form-item>
            <n-form-item label="反馈类型：" path="feedback_type">
              <n-select
                v-model:value="feedbackInfo.feedback_type"
                :options="feedbackTypeOptions"
              />
            </n-form-item>

            <n-form-item label="反馈内容：" path="content">
              <n-input
                type="textarea"
                placeholder="输入您的反馈内容"
                v-model:value="feedbackInfo.content"
                :autosize="{
                  minRows: 3,
                  maxRows: 5,
                }"
              />
            </n-form-item>
            <button
              type="submit"
              class="submit-btn"
              @click.prevent="submitFeedback"
            >
              提交反馈
            </button>
          </n-form>
        </div>
      </div>

      <div class="w-50% p-50px 20px">
        <n-h2>上传照片</n-h2>
        <span class="text-14px color-#D90000 lh-16px">图片最多上传5张</span>
        <n-upload
          multiple
          :max="5"
          list-type="image-card"
          :custom-request="customRequestImageHandler"
          @preview="handlePreview"
        >
          点击上传
        </n-upload>
        <n-divider />
        <div>
          <n-h2>上传视频</n-h2>
          <span class="text-14px color-#D90000 lh-16px"
            >视频大小请勿超过20mb</span
          >
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
        <n-modal
          v-model:show="showModal"
          preset="card"
          style="width: 600px"
          title="一张很酷的图片"
        >
          <img :src="previewImageUrl" style="width: 100%" />
        </n-modal>
        {{ feedbackInfo }}
      </div>
    </main>
  </middle-layout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import MiddleLayout from "@/layouts/MiddleLayout/index.vue";
import {
  FormRules,
  UploadCustomRequestOptions,
  UploadFileInfo,
} from "naive-ui";
import { FileInfo } from "naive-ui/es/upload/src/interface";
import axios from "axios";
import { useFeedbackStore } from "@/store";
import { storeToRefs } from "pinia";
import { feedbackTypeOptions } from "@/constants";
import { changeFileToBuffer } from "@/utils";
import {
  fetchUploadVideo,
  fetchUploadPrepare,
  fetchUploadMerge,
  fetchUploadImage,
} from "@/service";
import { REGEXP_PHONE, REGEXP_EMAIL } from "@/config";
defineOptions({
  name: "FeedbackPage",
});

const feedback = useFeedbackStore();
//结果action方法
const {
  fetchFeedbackAddHandle,
  setFeedbackInfo,
  setFeedbackPushImg,
  setFeedbackVideoInfo,
} = useFeedbackStore();

//保留响应式解构
const { getFeedbackInfo, feedbackInfo } = storeToRefs(feedback);

const formRef = ref<HTMLFormElement | null>(null);

const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: "请输入邮箱",
    },
    {
      pattern: REGEXP_EMAIL,
      message: "请输入正确的邮箱",
      trigger: ['input', 'blur']
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入电话号码",
    },
    {
      pattern: REGEXP_PHONE,
      message: "请输入正确的电话号码",
      trigger: ['input', 'blur']
    },
  ],
  feedback_type: {
    required: true,
    message: "请选择反馈类型",
    trigger: ['blur']
  },
  content: {
    required: true,
    message: "请输入反馈内容",
    trigger: ['blur']

  },
});

async function submitFeedback(e: Event) {
  // 校验表单
  e.preventDefault();
  console.log(formRef.value);
   await formRef.value?.validate();
   fetchFeedbackAddHandle();
}

const showModal = ref(false);
const previewImageUrl = ref("");

/**
 * 处理图片预览
 * @param file
 */

function handlePreview(file: UploadFileInfo) {
  //当前文件
  const { url, file: currentFile } = file;
  console.log("currentFile: ", currentFile);
  console.log("url: ", url);
  //处理图片预览
  const reader = new FileReader();
  if (currentFile) {
    reader.readAsDataURL(currentFile);
    reader.onload = (e) => {
      console.log("e: ", e);
      previewImageUrl.value = e.target?.result as string;
      showModal.value = true;
    };
  } else {
    previewImageUrl.value = url as string;
    showModal.value = true;
  }
}

let testVideo = ref(true);
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
function handleRemove() {
  testVideo.value = true;
}

async function customRequestImageHandler(options: UploadCustomRequestOptions) {
  const { file: fileInfo, onFinish, onError } = options;
  if (!fileInfo.file) {
    onError();
    return;
  }
  //判断文件类型
  const { type, file } = fileInfo;
  if (type?.indexOf("image") === -1) {
    onError();
    return;
  }

  let { HASH, buffer, suffix, filename } = await changeFileToBuffer(file);
  //准备上传
  const uploadIamge = {
    feedback: file, //字段 上传的文件
    filename,
  };

  fetchUploadImage(uploadIamge, {
    filename,
  }).then((res) => {
    console.log("res: ", res);
    const { data, error } = res;
    if (!data || error) {
      onError();
      return;
    }
    //储存图片的文件信息
    setFeedbackPushImg(data);
    //上传成功
    onFinish();
  });
}

/**
 * 自定义上传请求
 */
function customRequestHandler(options: UploadCustomRequestOptions) {
  const { file, onFinish, onError } = options;
  //判断文件类型
  const { type, file: fileInfo } = file;
  if (type?.indexOf("video") === -1) {
    onError();
    return;
  }

  //文件切片上传
  uploadFileByChunks(file, options);
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
  const fieldname = "feedback-video";
  const chunks: {
    "feedback-video": Blob;
    filename: string;
  }[] = []; //切片后的文件数组
  let numChunks = Math.ceil(file.size / chunkSize); //切片的数量
  if (numChunks > 100) {
    chunkSize = Math.ceil(file.size / 100);
    numChunks = 100;
  }
  let index = ref(0);
  while (index.value < numChunks) {
    chunks.push({
      "feedback-video": file.slice(
        index.value * chunkSize,
        (index.value + 1) * chunkSize
      ),
      filename: `${HASH}_${index.value + 1}.${suffix}`,
    });
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
        dirpath: `${fieldname}_${HASH}`,
      })
        .then((result) => {
          const { error, data } = result;
          if (!error && data) {
            setFeedbackVideoInfo(data);
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
    let dirName = `${fieldname}_${chunk.filename}`;
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

<style scoped>
.feedback-page {
  width: 50%;
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 20px;
}

.title {
  text-align: center;
}

.feedback-form {
  /* margin-top: 40px; */
  display: flex;
  /* justify-content: center; */
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn {
  padding: 10px 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #0069d9;
}
</style>
