<template>
  <smooth-layout>
    <template #prompt>
      <left-and-right-layout>
        <template #left>
          <div class="flex-col select-none p-l-80px p-r-80px text-start">
            <h2 class="lh-30px">第2步</h2>
            <strong class="text-40px lh-70px">介绍一下你的房源</strong>
            <p class="text-16px lh-26px">
              在这一步，我们会需要填写房源的详情描述,添加房源的图片和视频,以及房源的设施。
            </p>
          </div>
        </template>
        <template #right>
          <video class="w-500px h-500px" autoplay muted>
            <source :src="videoSrc" type="video/mp4" />
            I'm sorry; your browser doesn't support HTML5 video.
          </video>
        </template>
      </left-and-right-layout>
    </template>

    <template #desc>
      <LeftAndRightLayout>
        <template #right>
          <div class="flex-col w-100% justify-self-start">
            <n-h2>房源描述</n-h2>
            <n-form-item
              :rule="formRules.houseDesc"
              label="房源描述"
              :label-style="{
                width: 'auto',
                fontSize: '16px',
                lineHeight: '26px',
                color: '#333333',
                fontWeight: 'bold',
              }"
            >
              <n-input
                class="text-start"
                type="textarea"
                v-model:value="CurrentPageContent.house_description"
                placeholder="请输入描述"
              >
              </n-input>
            </n-form-item>
            <n-form-item
              label="房间设施"
              :label-style="{
                width: 'auto',
                fontSize: '16px',
                lineHeight: '26px',
                color: '#333333',
                fontWeight: 'bold',
              }"
            >
              <n-dynamic-tags
                v-model:value="icons"
                :render-tag="renderTag"
                @create="onCreate"
              >
                <template #trigger>
                  <n-space align="center">
                    <n-button class="h45px" @click="handleCheckAll">
                      全选
                    </n-button>
                    <n-button class="h45px" @click="handleCheckReverse">
                      反选
                    </n-button>
                  </n-space>
                </template>
              </n-dynamic-tags>
            </n-form-item>
          </div>
        </template>
        <template #left>
          <div class="p-50px wh-full flex-col justify-self-start">
            <upload-image
              @deleteimage="deleteImageHandle"
              @upload-image-down="uplaodImageHandle"
            />
            <n-divider />
            <upload-video
              :fieldname="'video'"
              @finish="uploadVideoHandle"
              :dirpath="dirpath"
            />
          </div>
        </template>
      </LeftAndRightLayout>
    </template>
  </smooth-layout>
</template>

<script setup lang="tsx">
import { ref, reactive, watch } from "vue";
import SmoothLayout from "./SmoothLayout.vue";
import LeftAndRightLayout from "./LeftAndRightLayout.vue";
import { DynamicTagsOption, NTag } from "naive-ui";
import { usePublishStore } from "@/store";
import { storeToRefs } from "pinia";
import { formRules } from "@/utils";
import videoSrc from "@/assets/video/livingRoom2.mp4";
import UploadImage from "@/components/upload/uploadImage.vue";
import UploadVideo from "@/components/upload/uploadVideo.vue";
const publish = usePublishStore();
const { setVideoUrl, setPushSwiperPic, setFacilities, deleteSwiperPic,setCityId } =
  usePublishStore();
const { CurrentPageContent } = storeToRefs(publish);

const layout = ref(["right", "left"]);
const dirpath = ref("publishHouse");
function uplaodImageHandle(data: ApiUpload.ImgInfo) {
  setPushSwiperPic(data);
}
function deleteImageHandle(filename: string) {
  return deleteSwiperPic(filename);
}

function uploadVideoHandle(data: ApiUpload.VideoInfo) {
  setVideoUrl(data);
}

const icons = reactive([
  {
    label: "冰箱",
    value: "iconbingxiang",
    checked: false,
  },
  {
    label: "床垫",
    value: "iconchuangdian",
    checked: false,
  },
  {
    label: "壁挂炉",
    value: "iconbigualu",
    checked: false,
  },
  {
    label: "净水器",
    value: "iconjidinghe",
    checked: false,
  },
  {
    label: "柜子",
    value: "iconguizi",
    checked: false,
  },
  {
    label: "床",
    value: "iconchuang",
    checked: false,
  },
  {
    label: "机顶盒",
    value: "iconjidinghe",
    checked: false,
  },

  {
    label: "电磁炉",
    value: "icondiancilu",
    checked: false,
  },
  {
    label: "路由器",
    value: "iconluyouqi",
    checked: false,
  },
  {
    label: "椅子",
    value: "iconyizi",
    checked: false,
  },
  {
    label: "电扇",
    value: "icondianshan",
    checked: false,
  },
  {
    label: "洗衣机",
    value: "iconxiyiji",
    checked: false,
  },
  {
    label: "沙发",
    value: "iconshafa",
    checked: false,
  },
  {
    label: "电磁炉",
    value: "icondiancilu",
    checked: false,
  },
  {
    label: "电暖器",
    value: "icondiannuanqi",
    checked: false,
  },
  {
    label: "热水器",
    value: "iconreshuiqi",
    checked: false,
  },
  {
    label: "书架",
    value: "iconshujia",
    checked: false,
  },
  {
    label: "排气扇",
    value: "iconpaiqishan",
    checked: false,
  },
  {
    label: "电视",
    value: "icondianshi",
    checked: false,
  },
  {
    label: "浴霸",
    value: "iconyuba",
    checked: false,
  },
  {
    label: "微波炉",
    value: "iconweibolu",
    checked: false,
  },
  {
    label: "中央空调",
    value: "iconzhongyangkongtiao",
    checked: false,
  },
  {
    label: "衣柜",
    value: "iconyigui",
    checked: false,
  },
  {
    label: "智能锁",
    value: "iconzhinengsuo",
    checked: false,
  },
  {
    label: "默认",
    value: "iconmoren",
    checked: false,
  },
]);

watch(
  () => icons.every((item) => item.checked),
  () => {
    console.log("icons", icons);
  }
);

const inputValue = ref("");
const options = computed(() => {
  if (inputValue.value === null) {
    return [];
  }
  const prefix = inputValue.value.split("@")[0];
  const inputSuffix = inputValue.value.split("@")[1];
  if (inputSuffix) {
    return [
      {
        label: prefix + "@" + inputSuffix,
        value: prefix + "@" + inputSuffix,
      },
    ];
  }
  return ["@gmail.com", "@163.com", "@qq.com"].map((suffix) => {
    return {
      label: prefix + suffix,
      value: prefix + suffix,
      checked: true,
    };
  });
});
function handleCheckAll() {
  icons.forEach((item) => {
    item.checked = true;
  });
}

//反选
function handleCheckReverse() {
  icons.forEach((item) => {
    item.checked = !item.checked;
  });
}

function onCreate(label: string) {
  console.log("label: ", label);
  icons.push({
    label,
    value: "iocn" + label,
    checked: true,
  });
  return {
    label,
    value: "iocn" + label,
    checked: true,
  };
}

function renderTag(tag: DynamicTagsOption, index: number) {
  return h(
    NTag,
    {
      checkable: true,
      closable: true,
      checked: icons[index].checked,
      "on-update:checked": (val: boolean) => {
        icons[index].checked = val;
        let checkedTags = icons.filter((item) => item.checked);
        console.log("checkedTags", checkedTags);
        setFacilities(checkedTags);
      },
      onClose: () => {
        icons.splice(index, 1);
      },
      type: "primary",
    },
    {
      default: () => {
        return (
          <div class={"flex-col "}>
            <i class={`iconfont text-55px ${tag.value}`}></i>
            <span>{tag.label}</span>
          </div>
        );
      },
    }
  );
}
</script>

<style lang="scss" scoped>
:deep(.n-tag) {
  height: auto !important;
  padding: 12px;
  border: 1px solid #e2e2e2;
}
</style>
