<template>
  <div class="text-14px">
          <!-- <n-popover placement="top-start" trigger="focus">
        <template #trigger>
          <n-checkbox ref="checkRef" v-model:checked="checked">我已经仔细阅读并接受</n-checkbox>
        </template>
        请先阅读隐私政策!
      </n-popover> -->
   
    <n-button :text="true" type="primary" @click="handleClickProtocol">《用户协议》</n-button>
    <n-button :text="true" type="primary" @click="handleClickPolicy">《隐私权政策》</n-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';


defineOptions({ name: 'LoginAgreement' });

interface Props {
  /** 是否勾选 */
  value?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: true
});

interface Emits {
  (e: 'update:value', value: boolean): void;
  /**checkref */
  (e: 'check-action', checkRef:HTMLInputElement|null): void;
  /** 点击协议 */
  (e: 'click-protocol'): void;
  /** 点击隐私政策 */
  (e: 'click-policy'): void;
}

const emit = defineEmits<Emits>();

const checked = computed({
  get() {
    return props.value;
  },
  set(newValue: boolean) {
    emit('update:value', newValue);
  }
});
const checkRef = ref<HTMLInputElement|null>(null)




 function handleClickProtocol() {
  checkRef.value?.focus()
  emit('click-protocol');
}
function handleClickPolicy() {
  emit('click-policy');
}
</script>

<style scoped></style>
