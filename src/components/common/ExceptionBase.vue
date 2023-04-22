<template>
  <div class="flex-col-center wh-full">
    <div class="text-400px text-primary">
      <icon-local-no-permission v-if="type === '403'" />
      <icon-local-not-found v-if="type === '404'" />
      <icon-local-service-error v-if="type === '500'" />
    </div>
    <router-link :to="{ name: routeHomePath }">
      <n-button type="primary">{{ currentPath == 'website' ?  '回到首页' : '回到后台管理'}}</n-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { routeName } from '@/router';
import { useRouterPush } from '@/composables';
defineOptions({ name: 'ExceptionBase' });

const { toHome } = useRouterPush();
type ExceptionType = '403' | '404' | '500';

interface Props {
  /** 异常类型 403 404 500 */
  type: ExceptionType;
}

defineProps<Props>();
const currentPath = ref('website')
const routeHomePath = computed(() => {

  if (localStorage.getItem('currentPath') === 'website') {
    currentPath.value = 'website'
    return routeName('website');
  }
  currentPath.value = 'admin'
  return routeName('admin');

});
</script>

<style scoped></style>
