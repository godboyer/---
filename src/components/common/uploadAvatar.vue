<template>
    <div class="flex-y-center">
        <input type="file" ref="fileInput" hidden @change="handleFileChange" />
        <div class=" flex-col" >
            <slot name="avatar" :avatar-url="avatarUrl" :click="handleClick"></slot>
            <slot name="file"></slot>
        </div>
    </div>
</template>
  
<script setup lang='ts'>
import { ref, watchEffect } from "vue";
import { fetchUploadAvatar } from "@/service";
import { useAuthStore } from "@/store";
import { localStg } from "~/src/utils";
import { url } from "@/service/request";
defineOptions({ name: "uploadAvatar" });
const fileInput = ref<HTMLInputElement | null>(null);
const avatarUrl = ref<string>("");
function handleClick() {

    fileInput.value?.click();
}
/**
 * 上传头像
 * @param 
 * @returns
 * @description
 * 1. 上传头像
 * 2. 上传成功后，更新头像
 * 3. 更新头像后，更新本地存储的用户信息
 * 4. 更新本地存储的用户信息后，更新用户信息
 * 5. 更新用户信息后，更新头像
 */
async function handleFileChange() {
    //注释


    if (fileInput.value && fileInput.value.files) {
        const newformData = new FormData();
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.value.files[0]);
        reader.onload = async (e) => {
            avatarUrl.value = e.target?.result as string;
        };
        newformData.append("file", fileInput.value.files[0]);

        let { error, data } = await fetchUploadAvatar(newformData)
        if (data) {
            avatarUrl.value = data.path.replace(/public/, url.replace(/\/api/, ""));
            console.log("newformData", avatarUrl.value);
            localStg.set("userInfo", data.user);
        }
    }

}
</script>
  
<style scoped></style>
  