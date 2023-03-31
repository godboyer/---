<template>
  <button @click="onClick" :class="{ active: isActive }"  class="w-60px h-45px b-rd-12px inline-block" >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'FilterButton' })

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const isActive = computed(() => props.modelValue === props.value);

const onClick = () => {
  console.log('props.value: ', props.value);
  emit('update:modelValue', props.value);
};
</script>

<style scoped>
.active {
  outline: 2px solid #222;
}
</style>
