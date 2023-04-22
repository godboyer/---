<template>
  <SmoothLayout>
    <template #prompt>
      <LeftAndRightLayout>
        <template #left>
          <div class="flex-col select-none p-l-80px p-r-80px text-start">
            <h2 class="lh-30px">第3步</h2>
            <strong class="text-40px lh-70px">签约与发布</strong>
            <p class="text-16px lh-26px">
              在这一步,我们需要签署协议和确定房屋的租金与押金,并且发布房源。
            </p>
          </div>
        </template>
        <template #right>
          <n-space :vertical="true">
            <n-space :vertical="true" align="start">
              <n-h4>租金/押金 线上签约功能(可选)，将更为效的保护您的权益:</n-h4>
              <p class="text-justify">
                1.在您确认房客的租房申请后,如果房客擅自取消入住,您所耽误/等待的相应天数的房租,将自动转入到您的个人账户.
              </p>
              <p>2.如果房客对房屋造成损坏，您可以通过平台向房客提出赔偿.</p>
              <p>3.线上托管的押金只有经过您的确认后，才会返还给房客.</p>
              <p>4.房客在入住后，租金直接支付给您.</p>
            </n-space>

            <n-form>
              <n-form-item label="租金/月(RMB)">
                <n-input-group>
                  <n-input-number
                    placeholder="租金/月"
                    :style="{ width: '140px' }"
                    v-model:value="CurrentPageContent.price"
                  >
                    <template #> </template>
                  </n-input-number>
                </n-input-group>
              </n-form-item>
              <n-form-item label="押金(RMB)">
                <n-input-group>
                  <n-input-number
                    placeholder="押金(RMB)"
                    :style="{ width: '140px' }"
                     v-model:value="CurrentPageContent.deposit"
                  >
                    <template #> </template>
                  </n-input-number>
                </n-input-group>
              </n-form-item>
            </n-form>
          </n-space>
        </template>
      </LeftAndRightLayout>
    </template>
  </SmoothLayout>
  <div>第三步</div>
</template>
<script setup lang="ts">
import SmoothLayout from "./SmoothLayout.vue";
import LeftAndRightLayout from "./LeftAndRightLayout.vue";
import { usePublishStore } from "@/store";
import { storeToRefs } from "pinia";
const {CurrentPageContent} = storeToRefs(usePublishStore())

</script>

<style lang="scss" scoped></style>
