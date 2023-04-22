<template>
  <n-card>
    <n-h2>上传照片</n-h2>
    <span class="text-14px color-#D90000 lh-16px">图片最多上传5张</span>
    <n-upload
      multiple
      :max="5"
      list-type="image-card"
      :custom-request="customRequestImageHandler"
      @preview="handlePreview"
      @remove="handleRemove"
    >
      点击上传
    </n-upload>
    <n-modal
      v-model:show="showModal"
      preset="card"
      style="width: 600px"
      title="一张很酷的图片"
    >
      <img :src="previewImageUrl" style="width: 100%" />
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
import { fetchUploadImage } from "@/service";
import { changeFileToBuffer } from "@/utils";
import { UploadCustomRequestOptions, UploadFileInfo } from "naive-ui";
import { ref } from "vue";

defineOptions({
  name: "UploadImage",
});
// defineProps({

// });

const emit = defineEmits<{
  (e: "uploadImageDown", data: ApiUpload.ImgInfo): void;
  (e: "deleteimage", filename: string): Promise<boolean> | boolean | any;
}>();
const showModal = ref(false);
const previewImageUrl = ref("");

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
    image: file, //字段 上传的文件
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
    emit("uploadImageDown", data);
    //上传成功
    onFinish();
  });
}
/**
 * 处理图片预览
 * @param file
 */

function handlePreview(file: UploadFileInfo) {
  //当前文件
  const { url, file: currentFile } = file;
  //   console.log("currentFile: ", currentFile);
  //   console.log("url: ", url);
  //处理图片预览
  const reader = new FileReader();
  if (currentFile) {
    reader.readAsDataURL(currentFile);
    reader.onload = (e) => {
      //   console.log("e: ", e);
      previewImageUrl.value = e.target?.result as string;
      showModal.value = true;
    };
  } else {
    previewImageUrl.value = url as string;
    showModal.value = true;
  }
}


/**
 * 处理图片移除
 */
async function handleRemove(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }) {
   let { filename } = await changeFileToBuffer(options.file.file as File);
   let emistReslut = emit("deleteimage", filename);
  /**从后端删除文件 */
    
  
  return emistReslut;
}
</script>

<style scoped></style>
