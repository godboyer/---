<template>
  <div
    id="search"
    v-click-outside="handleSearchOff"
    ref="search"
    class="search-body"
  >
    <Transition name="actionform">
      <div
        v-if="!showSearch"
        @click="ClickSearch"
        class="flex justify-between b-2 p-3 items-center w-81 h-12 b-rd-8 bg-#fff"
      >
        <div class="lh-5" style="font-size: 14px">搜索房源</div>
        <button class="flex-col-center w-8 h-8 b-rd-50% bg-#ff385c">
          <img src="../assets/search-logo.png" alt="" class="w-5 h-5" />
        </button>
      </div>
      <div v-else @click="ClickSearch">
        <div class="top-title">搜索房源</div>
      </div>
    </Transition>

    <Transition name="form">
      <n-form
        v-if="showSearch"
        label-position="top"
        class="search-tab"
        ref="formRef"
      >
        <div class="top-form">
          <div :class="activeName == 'city' ? 'active item' : 'item'">
            <n-form-item
              class="item-form"
              label="城市"
              @click="setActiveKey('city')"
            >
              <input
                v-model="ruleForm['city']"
                type="text"
                placeholder="你想去哪个城市"
              />
            </n-form-item>
          </div>
          <div :class="activeName == 'date' ? 'active item' : 'item'">
            <n-form-item
              class="item-form"
              label="日期"
              @click="setActiveKey('date')"
            >
              <input
                v-model="ruleForm.date"
                type="text"
                placeholder="请在日历中选择"
              />
            </n-form-item>
          </div>

          <div :class="activeName == 'keywords' ? 'active item ' : 'item '">
            <div class="item-form search-play">
              <n-form-item label="关键字" @click="setActiveKey('keywords')">
                <input
                  v-model="ruleForm.keywords"
                  type="text"
                  placeholder="景点/地点/房源名"
                />
              </n-form-item>
              <button :class="{ 'active-btn': flag }" class="flex-center">
                <img src="../assets/search-logo.png" alt="" />
                <span> {{ flag ? "搜索" : "" }}</span>
              </button>
            </div>
          </div>
        </div>

        <div
          ref="contentRef"
          v-click-outside="handleClickOutside"
          v-show="showContent"
          class="bot-form"
        >
          <div v-show="activeName == 'city'">城市</div>
          <div v-if="activeName == 'date'"></div>
          <div v-if="activeName == 'keywords'"></div>
        </div>
      </n-form>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  reactive,
  type Ref,
  ref,
  unref,
  toRefs,
  onUnmounted,
  onUpdated,
  watch,
} from "vue";
const showSearch: Ref<boolean> = ref(false);
const showSearchTwo: Ref<boolean> = ref(false);
const flag: Ref<boolean> = ref(false);
const scrollY: Ref<number> = ref(0);
const activeName = ref(" ");
const showContent: Ref<boolean> = ref(false);
const contentRef: Ref<any> = ref(null);
const formRef: Ref<string | HTMLElement | undefined> = ref(undefined);

const searchRef: Ref<string | HTMLElement | undefined> = ref(undefined);
const emit = defineEmits(["ChangeBgColor", "changeBgAfter"]);
const ruleForm = reactive({
  city: "",
  date: "",
  keywords: "",
});

const setActiveKey = (key: string) => {
  // console.log(key);
  activeName.value = key;
  // console.log("点击");
  showContent.value = true;

  flag.value = true;
};
//点击头部的搜索
const ClickSearch = function () {
  // console.log(window.scrollY);
  if (!unref(showSearch)) {
    emit("changeBgAfter");
    flag.value = false;
    showSearch.value = true;
  }
};

//测试指令函数,关闭form面板
const handleClickOutside = function (event: any) {
  // console.log(event.target);
  // console.log("我没有被点击");

  if (showContent.value) {
    // console.log("点击的标签是=>", event.target);
    if (
      !(
        event.target.closest(".n-form-item") ||
        event.target.classList.contains("item")
      ) ||
      event.target.nodeName === "HEADER"
    ) {
      showContent.value = false;
      activeName.value = "";
    }
    // console.log("获取与该事件的目标元素最接近的具有 n-form-item 类名的祖先元素",event.target.closest('.n-form-item'));
  }
};
const handleSearchOff = function (event: any) {
  //关闭搜索面板
  if (!showContent.value && showSearch.value) {
    // sh owSearch.value = false
     console.log("点击的标签是=>", event.target,event.target.classList.contains("backdrop"));
    console.log("获取与该事件的目标元素最接近的具有 n-form 类名的祖先元素", event.target.closest('.n-form'));
    if (event.target.classList.contains("backdrop") || event.target.nodeName === "IMG") {
      showSearch.value = false;
      if (!showSearch.value) {
        
        emit("changeBgAfter");
      }
    }
  }
};

// function handleMouse(event: any) {
//   event.stopPropagation();
//   console.log("是多少", event.target.classList.length);
//   if (showContent.value) {
//     if (
//       event.target.classList.length >= 0 &&
//       !event.target.classList.contains("bot-form")
//     ) {
//       showContent.value = false;
//     }
//   }
// }

// watch(showContent, (arg) => {
//   console.log(arg);
//   if (!arg) {
//     document.body.removeEventListener("mousedown", handleMouse, true);
//   } else {
//     document.body.addEventListener("mousedown", handleMouse, true);
//   }
// });
onMounted(() => {
  // document.body.addEventListener("scroll", handleScroll);
});

onUpdated(() => {});
onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.form-enter-active {
  transform: scale(1) translateY(0px);

  transition: all 250ms ease;
}

.form-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.form-enter-from,
.form-leave-to {
  transform: scale(0) translateY(-80px);
  opacity: 0;
}

.actionform-leave-active {
  transform: scale(0);
  opacity: 0.5;

  transition: transform 250ms ease;
}
.actionform-leave-to {
  transform: scale(1.5) translateY(10px);
  opacity: 0;
}

.top-title {
  // margin-top: 20px;
}
.last {
  height: 170px !important;
  // background: #ff385df5 !important;
}

.active {
  background: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    // display: ;
    background: #fff !important;
  }
  & > .item-form::after {
    display: none;
  }
}
:deep(.el-form-item__label) {
  font-weight: bold;
}
.bot-form {
  width: 995px;
  height: 400px;
  position: absolute;
  top: 90px;
  border-radius: 32px;
  background-color: #2b2626;
  padding: 22px;
  box-sizing: border-box;
  z-index: 999;
}
.bot-box {
  width: 100%;
  height: 80px;
  position: absolute;
  // top: 0;
  bottom: -2;
  z-index: 99;
  background-color: #2b2626;
  // justify-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.srh {
}

.top-form {
  position: absolute;
  // z-index: 9;
  display: flex;
  width: 995px;
  .item {
    box-sizing: border-box;
    padding: 5px 32px 0px;
    flex: 1;
    height: 68px;
    border-radius: 32px;
    position: relative;
    z-index: 99;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.25);
    }

    input {
      outline: none;
      border: 0 !important;
      font-size: 16px;
      background: transparent;
    }
  }
}
.search-body {
  // position: absolute ;

  // width: 995px;
  height: 80px;
  // position: absolute;
  // top: 0;
  // left: 0;
  // background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9;
  .top-search {
    position: absolute;
    margin-top: 20px;
    box-sizing: border-box;
    justify-self: flex-start;
    width: 350px;
    height: 48px;
    // background: #fff;
    border-radius: 32px;
    border: 1px solid #343232;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 12px;

    &:hover {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    transition: all 200ms ease;
    cursor: pointer;
    .btn {
      width: 32px;
      height: 32px;
      background: #ff385c;
      border-radius: 50%;
      border: none;
      // float: right;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .search-tab {
    // left: 223px;
    position: absolute;
    top: 85px !important;
    transition: all 200ms ease;

    width: 995px;
    height: 68px;
    background: #f7f7f7f7;
    border: 1px solid #d9d9d9;
    border-radius: 32px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: flex;
    justify-content: center;

    .label {
      flex: 1;
      height: 68px;
      border-radius: 32px;
    }
  }

  .item-form {
    width: 100%;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 30px;
      background-color: #646262;
    }
  }
  .search-play {
    display: flex;
    // align-items: center;

    justify-content: space-between;
    &::after {
      content: "" !important;
      display: none;
    }
    button {
      outline: none;
      border: none;
      background: #ff385c;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-top: 5px;
      cursor: pointer;
      transition: all 200ms ease;
      //   align-self: center;
    }
    .active-btn {
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100px;
      border-radius: 32px;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>
