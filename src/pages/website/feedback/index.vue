<template>
  <middle-layout>
    <template #title>
      <h2 class="title">网站反馈</h2>
    </template>
    <main class="flex bg-#fff">
      <div class="feedback-page">
        <div class="feedback-form">
          <form class="wh-full">
            <!-- <div class="form-group">
              <label for="name">姓名：</label>
              <input
                placeholder="我们怎么称呼您"
                type="text"
                id="name"
                v-model="feedbackInfo.name"
                required
              />
            </div> -->
            <div class="form-group">
              <label for="email">邮箱：</label>
              <input
                type="email"
                id="email"
                v-model="feedbackInfo.email"
                required
                placeholder="输入您的有效邮箱"
              />
              {{ feedback.feedbackInfo }}
            </div>
            <div class="form-group">
              <label for="phone">电话：</label>
              <input
                placeholder="输入您的有效电话"
                type="tel"
                id="phone"
                v-model="feedbackInfo.phone"
                required
              />
              {{ getFeedbackInfo }}
            </div>
            <div class="form-group">
              <label for="phone">反馈类型：</label>
              <n-select
                v-model:value="feedbackInfo.feedback_type"
                :options="feedbackTypeOptions"
              />
            </div>

            <div class="form-group">
              <label for="content">反馈内容：</label>
              <textarea
                id="content"
                v-model="feedbackInfo.content"
                rows="5"
                required
                placeholder="输入您的反馈内容"
              ></textarea>
            </div>
            <button
              type="submit"
              class="submit-btn"
              @click.prevent="submitFeedback"
            >
              提交反馈
            </button>
          </form>
        </div>
      </div>

      <div class="w-50% p-50px 20px">
        <n-h2>上传照片</n-h2>
        <span class="text-14px color-#D90000 lh-16px">图片最多上传5张</span>
        <n-upload
          multiple
          :max="5"
          accept="image/*"
          name="feedback"
          action="http://localhost:3040/api/upload/image"
          list-type="image-card"
          @preview="handlePreview"
          @finish="handleUploadImageFinish"
        >
          <!-- :default-file-list="previewFileList" -->
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
          accept="video/*"
          directory-dnd
          action="http://localhost:3040/api/upload/video"
          :max="1"
          :data="{
            name: 'feedback',
            type: 'video',
          }"
          name="feedback"
          :custom-request="customRequestHandler"
          @finish="handleFinish"
        >
          <n-upload-dragger>
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
      </div>

      <img :src="testImg" style="width: 200px" />
    </main>
  </middle-layout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import MiddleLayout from "@/layouts/MiddleLayout/index.vue";
import { UploadCustomRequestOptions, UploadFileInfo } from "naive-ui";
import { FileInfo } from "naive-ui/es/upload/src/interface";
import axios from "axios";
import { useFeedbackStore } from "@/store";
import { storeToRefs } from "pinia";
import { feedbackTypeOptions } from "@/constants";
import { changeFileToBuffer } from "@/utils";

defineOptions({
  name: "FeedbackPage",
});

const feedback = useFeedbackStore();
//结果action方法
const { fetchFeedbackAddHandle, setFeedbackInfo, setFeedbackPushImg } =
  useFeedbackStore();

//保留响应式解构
const { getFeedbackInfo, feedbackInfo } = storeToRefs(feedback);

function submitFeedback() {
  // 校验表单

  // TODO: 实现提交反馈逻辑
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

/** 切片上传完成处理*/
function handleFinish({
  file,
  event,
}: {
  file: UploadFileInfo;
  event?: ProgressEvent;
}) {
  console.log("上传完成");
  console.log("file: ", file);
  console.log("event: ", event);
}

const testImg = ref("");

/**
 * 处理图片上传完成
 */
function handleUploadImageFinish({
  file,
  event,
}: {
  file: UploadFileInfo;
  event?: ProgressEvent;
}) {
  /**每上传完一张就push一张 */
  console.log("图片上传完成");
  console.log("file: ", file);
  console.log("event: ", event?.target as XMLHttpRequest);
  /**从事件中获取图片上传完成的信息 */
  const { readyState, status, response, responseURL } =
    event?.target as XMLHttpRequest;
  if (readyState === 4 && status === 200) {
    const { data, code } = JSON.parse(response);
    if (code !== 200) return;
    let path = responseURL.replace(
      "/api/upload/image",
      data?.path.replace(/public/, "").replace(/\\/g, "/")
    );
    data.path = path;
    console.log("data: ", data);
    setFeedbackPushImg(data);
  }
}

/**
 * 自定义上传请求
 */
function customRequestHandler(options: UploadCustomRequestOptions) {
  const { file, onFinish, onError } = options;

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
  console.log("HASH ,buffer,suffix,filename: ", HASH, buffer, suffix, filename);
  debugger;

  //获取已经上传的文件切片信息
  let already = []; //已经上传的切片
  try {
    let response = await axios.get(
      action?.replace("video", "already") as string,
      {
        params: {
          HASH,
        },
      }
    );
    const { code, data } = response.data;
    if (+code === 200) {
      already = data.fileList;
    }
  } catch (error) {}

  // 2. 将文件切成块 [固定数量 && 固定大小]
  const chunks: {
    file: Blob;
    filename: string;
  }[] = [];//切片后的文件数组
  let numChunks = Math.ceil(file.size / chunkSize); //切片的数量
  if (numChunks > 100) {
    chunkSize = Math.ceil(file.size / 100);
    numChunks = 100;
  }
  let index = 0;
  while (index < file.size) {
    chunks.push({
      file: file.slice(index * chunkSize, (index + 1) * chunkSize),
      filename: `${HASH}_${index + 1}.${suffix}`,
    });
    index++;
  }

  console.log("chunks: ", chunks);

  // 2. 上传每个块
  for (let i = 0; i < numChunks; i++) {
    //判断当前切片是否已经上传过
    if (already.length > 0 && already.includes(chunks[i].filename)) {
      onProgress(
        {
          percent: Math.round(((i + 1) / numChunks) * 100),
        },
      )
      continue;
    }

    const formData = new FormData();
    formData.append("feedback-video", chunks[i].file);
    formData.append("filename", chunks[i].filename);
    axios
      .post(action!, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: file.type,
        },
        params: {},
      })
      .then((res) => {
        const { code, data, msg } = res.data;
        console.log("data: ", data);
        if (+code === 200) {
          already.push(data);
          onProgress({
            percent: Math.round(((i + 1) / numChunks) * 100),
          });
          return;
        }
        return Promise.reject(res.data);
      })
      .catch((err) => {
        alert("当前切片上传失败,请重新上传");
      });
  }

  // 3. 通知上传完成
  // onFinish();
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
