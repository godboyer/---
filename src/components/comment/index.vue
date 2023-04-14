<template>
  <n-popover :overlap="true" placement="top-start" trigger="click">
    <template #trigger>
      <n-thing class="bg-#fff p-12px comment-hover">
        <template #avatar>
          <n-avatar>
            <n-icon>
              <cash-icon />
            </n-icon>
          </n-avatar>
        </template>
        <template #header>
          {{ comment.comment_id }}
        </template>
        <template #header-extra>
          <span class="color-#e5e5e5 text-12px"> {{ commentTime }}</span>
        </template>
        <template #description>
          <n-rate readonly size="small" :default-value="3" />
        </template>
        {{ comment.content }}
        {{ comment?.evaluation_content }}
        <template #footer> </template>
        <template #action>
          <n-space justify="end">
            <div class="flex items-center gap-24px">
              <p>
                <icon-ph:thumbs-up-light /> <icon-ph:thumbs-up-fill />
                <span>1220</span>
              </p>
              <p>
                <icon-ph:thumbs-down-light /> <icon-ph:thumbs-down-fill />
                <span>1220</span>
              </p>
            </div>
          </n-space>
        </template>
      </n-thing>
    </template>

    <template  #header>
        用户信息
        <p>
          以租10天
        </p>
    </template>

  </n-popover>
</template>

<script setup lang="ts">
import { fetchUserInfo } from "@/service";
import dayjs from "dayjs";
import { computed } from "vue";

defineOptions({ __name: "commentItme" });
const props = defineProps<{
  comment: CommentManagement.Comment;
}>();

const commentTime = computed(() => {
  return dayjs(props.comment?.create_time).format("YYYY-MM-DD HH:mm:ss");
});
</script>

<style lang="scss" scoped>
.comment-hover {
  &:hover {
    // background-color: #f5f5f5;
    box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
</style>
