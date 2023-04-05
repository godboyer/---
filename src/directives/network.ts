// import type { App, Directive } from 'vue';
// import { NETWORK_ERROR_MSG } from '@/config';

// export default function setupNetworkDirective(app: App) {
//   function listenerHandler(event: MouseEvent) {
//     const hasNetwork = window.navigator.onLine;
//     if (!hasNetwork) {
//       window.$message?.error(NETWORK_ERROR_MSG);
//       event.stopPropagation();
//     }
//   }

//   const networkDirective: Directive<HTMLElement, boolean | undefined> = {
//     mounted(el: HTMLElement, binding) {
//       if (binding.value === false) return;
//       el.addEventListener('click', listenerHandler, { capture: true });
//     },
//     unmounted(el: HTMLElement, binding) {
//       if (binding.value === false) return;
//       el.removeEventListener('click', listenerHandler);
//     }
//   };

//   app.directive('network', networkDirective);
// }

import type { App, Directive } from 'vue';
import { NETWORK_ERROR_MSG } from '@/config';

export default function setupNetworkDirective(app: App) {
  // 监听器处理函数：在点击事件发生时检查网络连接
  function listenerHandler(event: MouseEvent) {
    // 检查网络连接是否在线
    const hasNetwork = window.navigator.onLine;
    // 如果网络不在线，则显示网络错误消息并停止事件传播
    if (!hasNetwork) {
      window.$message?.error(NETWORK_ERROR_MSG);
      event.stopPropagation();
    }
  }

  // 创建一个网络指令，用于检查网络连接并在离线时阻止点击事件
  const networkDirective: Directive<HTMLElement, boolean | undefined> = {
    // 指令挂载时为元素添加点击事件监听器
    mounted(el: HTMLElement, binding) {
      // 如果绑定值为 false，则不添加事件监听器
      if (binding.value === false) return;
      el.addEventListener('click', listenerHandler, { capture: true });
    },
    // 指令卸载时为元素移除点击事件监听器
    unmounted(el: HTMLElement, binding) {
      // 如果绑定值为 false，则不移除事件监听器
      if (binding.value === false) return;
      el.removeEventListener('click', listenerHandler);
    }
  };

  // 向 Vue 应用注册网络指令
  app.directive('network', networkDirective);
}
