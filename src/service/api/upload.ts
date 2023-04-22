import { request } from "../request";

// interface APiUploadImage extends ApiFeedbackManagement.ImgInfo {}

/**
 * 上传图片
 */
export function fetchUploadImage(data: any, params?: any) {
  let reslut = request.post<ApiUpload.ImgInfo>("/upload/image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      accept: "application/json, text/plain, image/*",
    },
    params,
  });
  return reslut;
}

interface UploadVideo {
  filename: string;
  [key: string]: any;
}

/**
 * 上传视频---切片上传
 */
export function fetchUploadVideo(data: UploadVideo, params?: any) {
  let reslut = request.post("/upload/video", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      accept: "application/json, text/plain, video/*",
    },
    params,
  });
  return reslut;
}

interface UploadPrepare {
  fileList: string[]; // 文件列表
}

/**
 * 切片上传前准备
 */
export function fetchUploadPrepare(HASH: string) {
  let reslut = request.get<UploadPrepare>("/upload/already", {
    params: {
      HASH,
    },
  });
  return reslut;
}

interface UploadMerge {
  HASH: string; // 文件hash
  numChunks: number; // 切片数量
  dirpath: string; // 文件路径
}

/**
 * 切片上传完成后合并
 */
export function fetchUploadMerge(data: UploadMerge) {
  let reslut = request.post<ApiFeedbackManagement.VideoInfo>(
    "/upload/merge",
    data
  );
  return reslut;
}
