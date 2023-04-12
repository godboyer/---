import { inject, provide } from 'vue';
import type { InjectionKey } from 'vue';

/** 创建共享上下文状态 */
export default function useContext<T>(contextName = 'context') {
  const injectKey: InjectionKey<T> = Symbol(contextName);
  console.log('injectKey: ', injectKey);

  function useProvide(context: T) {
    provide(injectKey, context);
    return context;
  }

  function useInject() {
     console.log('useInject---injectKey: ', injectKey);

    return inject(injectKey) as T;
  }

  return {
    useProvide,
    useInject
  };
}
