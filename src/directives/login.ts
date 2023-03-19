import type { App, Directive } from 'vue';
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';



/**
 * 
 * @param app vue实列对象
 */
export default function setupLoginDirective(app: App) {
  /**
   * 使用 useAuthStore 函数从 store 中获取 auth 对象
   * 该对象包含了有关用户身份验证的状态和操作
   */
  const auth = useAuthStore();
  /**
   * 使用 useRouterPush 函数从 Vue Router 中获取一个用于导航到登录页面的帮助程序函数 toLogin
   */
  const { toLogin } = useRouterPush(false);

  /**
   * 该函数用于检查用户是否已登录。如果用户未登录，则阻止事件传播并将用户重定向到登录页面。该函数将作为事件侦听器添加到元素上。
   * @param event 
   */
  function listenerHandler(event: MouseEvent) {
    if (!auth.isLogin) {
      event.stopPropagation();
      toLogin();
    }
  }

  /**自定义指令对象 loginDirective
   * 该对象包含了 mounted 和 unmounted 钩子函数。当该指令被应用到一个元素上时，
   * mounted 钩子函数将被调用，并将 listenerHandler 函数作为事件侦听器添加到元素上。
   * 当该指令从元素上移除时，unmounted 钩子函数将被调用，并从元素上删除事件侦听器。
   */
  const loginDirective: Directive<HTMLElement, boolean | undefined> = {
    mounted(el: HTMLElement, binding) {
      if (binding.value === false) return;
      el.addEventListener('click', listenerHandler, { capture: true });
    },
    unmounted(el: HTMLElement, binding) {
      if (binding.value === false) return;
      el.removeEventListener('click', listenerHandler);
    }
  };

  app.directive('login', loginDirective);
}


