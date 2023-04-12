<template>
  <n-popover id="dropbox" :overlap="overlap" :show="showPopover" placement="bottom-start" trigger="click"
    :on-clickoutside="handleOutsideClick" :on-update:show="handlePopoverShow">
    <template #trigger>
      <n-tag class="hover:cursor-pointer hover:bg-#d6d6d6" @click="handleBackDrop">
        房屋类别
      </n-tag>
    </template>



    <n-space class="wh-full p-25px" :size="25" :vertical="true" justify="space-around">
      <n-space :vertical="true"  :size="12">
        <div>
          <n-h3>类型</n-h3>
        <n-checkbox-group v-model:value="category">
          <n-space item-style="display: flex;">
            <n-checkbox value="整租" label="整租" />
            <n-checkbox value="合租" label="合租" />
            <n-checkbox value="-1" label="全部" />
          </n-space>
        </n-checkbox-group>
        </div>
       

        <div>
          <n-h3>租期</n-h3>
          <n-checkbox-group v-model:value="category">
            <n-space item-style="display: flex;">
              <n-checkbox value="长租" label="长租" />
              <n-checkbox value="短租" label="短租" />
              <n-checkbox value="-1" label="全部" />
            </n-space>
          </n-checkbox-group>
        </div>

      </n-space>


      <n-space justify="start">
        <button class="push-button btn-active" size="small" @click="handleSubmitAction">
          确定
        </button>
      </n-space>
    </n-space>
  </n-popover>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSearchStore } from "@/store";
import { useFilterPopover } from "@/hooks";
defineOptions({ name: "categoryPopver" });
const search = useSearchStore();
const {
  showPopover,
  handlePopoverShow,
  handleSubmit,
  handleBackDrop,
  handleOutsideClick,
} = useFilterPopover();

const overlap = ref(false);
const category = ref<string[]>([]);

function handleSubmitAction() {
  handleSubmit(() => {
      console.log(category.value);
      search.setCategory(category.value);
    });
}
</script>

<style lang="scss" scoped></style>
