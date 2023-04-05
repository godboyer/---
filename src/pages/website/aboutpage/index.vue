<template>
  <!-- <div>
    "相顾如寓"是一个专门提供二手房租赁服务的网站，旨在为客户提供最优质的住房体验。我们相信，每一个人都应该有一个舒适的家，一个可以让人感到安全和温馨的地方。因此，我们将竭诚为每一位客户提供最适合他们需求的住房选择。
    我们的网站上有各种各样的房屋信息，涵盖了不同的城市和地区，以满足客户的各种需求。我们提供详细的房屋信息，包括房屋的图片、地址、面积、装修情况、价格等。我们的客户可以通过简单的搜索功能找到最适合他们需求的房屋，并在线预订。
    在"相顾如寓"，我们拥有一支专业的客服团队，随时准备为客户提供帮助。如果客户在租赁过程中遇到任何问题，我们将竭诚为您解决。
    总体而言，"相顾如寓"是一个提供高品质二手房租赁服务的网站，致力于为客户提供最舒适和最满意的住房体验。我们期待您的光临，并为您提供最优质的服务。

    <h4>
      "相顾如寓，把租房换成家。一站式服务，让你拎包入住。"
      "离家不再远，相顾如寓有。精选房源等你，找到适合你。"
      "相顾如寓，让租房不再孤单。最优质的选择，让生活更舒适。"
      "租房找相顾，如家般舒适。无忧租房体验，让你感到惬意。"
      "让你住得好，相顾如寓有。热心服务招待，找到合适房。"
    </h4>
  </div> -->
  <div class="h-50px"></div>
  <n-space :size="25" :vertical="true" align="center">
    <div v-resize-observer:params="handleReszie" class="box" v-for="(item, index) in itemData" :key="item.title">
      <p class="box-title">
        <b>{{ index + 1 }}</b>. <strong>{{ item.title }}</strong>
      </p>

      <template v-if="item.children">
        <ul class="box-2">
          <li class="box-item" v-for="v in item.children">
            {{ v.title }}
            <template v-if="v.children">
              <p class="item-li" v-for="k in v.children">
                <span>></span> {{ k.title }}
              </p>
            </template>
          </li>
        </ul>
      </template>
    </div>
  </n-space>
</template>

<script setup lang="ts">
// defineOptions({ naem: 'tamp' })
// defineProps<{
//     itemData:any[]
// }>()
function handleReszie(size: any) {
  console.log("监听元素大小", size);
}

const itemData = [
  {
    title: "绪论",
    children: [
      {
        title: "研究背景",
      },
      {
        title: "研究意义",
      },
      {
        title: "国内外研究现状",
      },
    ],
  },
  {
    title: "网站需求分析",
    children: [
      {
        title: "技术可行性分析",
      },
      {
        title: "用户分析",
        children: [
          {
            title: "系统角色描述",
          },
          {
            title: "用户需求分析",
          },
        ]
      },
      {
        title: "功能需求分析",
        children: [
          {
            title: "前台功能分析",
            children: [
              {
                title: "用户功能模块",
              },
              {
                title: "房源详情展示模块",
              },

              {
                title: "二手房租赁模块",
              },
              {
                title: "房源搜索与筛选",
              },
              {
                title: "房源发布模块",
              },
            ]
          },
          {
            title: "后台功能分析",
            children: [
              {
                title: "房源信息管理模块",
              },
              {
                title: "用户与权限管理模块",
              },
              {
                title: "房源评价管理模块",
              },

              {
                title: "用户反馈管理模块",
              },
              {
                title: "系统公告管理模块",
              },
              {
                title: "城市管理模块",
              },
              {
                title: "数据统计管理模块",
              },
            ]
          },

        ],
      },
      {
        title: "性能需求分析",
      },
      {
        title: "安全需求分析",
      },

    ],
  },
  {
    title: "网站总体设计",
    children: [
      {
        title: "系统架构设计",
        children: [
          { title: "B/S架构" },
          {
            title: "功能结构设计",
          },
          {
            title: "功能模块设计",
          },
        ],
      },
      {
        title: "前端架构设计",
        children: [
           {
            title: "前端框架概述",
          },
          {
            title: "组件化设计",
          },
          {
            title: "模块化设计",
          },
          {
            title: "响应式设计",
          },
         
        ],
      },
      {
        title: "后端架构设计",
        children: [
          {title: "MVC设计"},
          {
            title: "RESTful API 设计",
          },
          {
            title: "数据库设计",
          },
        ],
      },
      {
        title: "安全策略设计",
      },
    ],
  },

  {
    title: "网站实现",
    children: [
      {
        title: "前端实现",
        children: [
          {
            title: "组件化开发",
          },

          {
            title: "状态管理实现",
          },
          {
            title: "前端与后端交互",
          },
        ],
      },

      {
        title: "后端实现",
        children: [
          {
            title: "API 开发",
          },

          {
            title: "数据库操作实现",
          },
        ],
      },
      {
        title: "安全措施实施",
      },
    ],
  },
  {
    title: "网站性能优化",
    children: [
      {
        title: "代码优化",
      },

      {
        title: "网络优化",
      },
      {
        title: "缓存策略",
      },
      {
        title: "跨平台兼容性处理",
      },
    ],
  },

  {
    title: "结论及展望",
    children: [
      {
        title: "研究成果总结",
      },

      {
        title: "未来发展与展望",
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.box {
  $gap: 15px;
  $height: 15px;
  border: 3px dashed black;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  row-gap: $gap;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: calc(100% + 2px);
    width: 4px;
    background: black;
    height: $height;
  }

  &::after {
    content: "";
    position: absolute;
    display: block;
    top: calc(100% + #{$height});
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid black;
    border-bottom: solid transparent;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }

  .box-2 {
    padding: 10px;
    display: flex;
    justify-content: space-evenly;
    gap: 20px;
    align-items: baseline;
  }

  .box-item {
    border: 2px solid black;
    border-radius: 5px;
    text-align: start;
    display: grid;
    place-content: center;
    padding: 6px 8px !important;
    white-space: nowrap;

    .item-li {
      text-indent: 12px;
    }
  }
}
</style>
