<template>
  <div>
    <input type="file" ref="fileInput" hidden @change="handleFileChange" />
    <div @click="handleClick">
      <slot :avatar-url="avatarUrl"></slot>
      <slot name="avatar"></slot>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref } from "vue";
const fileInput = ref<HTMLInputElement | null>(null);
const avatarUrl = ref<string>("你好");
function handleClick() {
  // console.log("fileInput: ", fileInput);

  fileInput.value?.click();
}

defineOptions({ name: "uploadFile" });

async function handleFileChange() {
  const formData = new FormData();
  formData.append("file", fileInput.value?.files[0]);
  console.log("formData: ", formData);
  // const response = await fetch(uploadUrl, {
  //     method: 'POST',
  //     body: formData
  // });
}
</script>

<style scoped></style>
