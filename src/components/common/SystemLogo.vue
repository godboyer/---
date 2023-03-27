<template>
  <icon-local-logo-fill v-if="fill" />
  <icon-local-logo-me  v-else />
  <!-- <icon-local-logo-me  v-else /> -->
</template>

<script lang="ts" setup>
defineOptions({ name: 'SystemLogo' });

interface Props {
  /** logo是否填充 */
  fill?: boolean;
}

withDefaults(defineProps<Props>(), {
  fill: false
});
</script>

<style scoped></style>
