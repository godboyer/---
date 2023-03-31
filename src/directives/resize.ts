import type { App, Directive } from "vue";

// 定义一个WeakMap存储绑定的元素和对应的处理函数
const map = new WeakMap<Element, any>();

// 创建一个ResizeObserver实例，用于监听元素的尺寸变化
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    try {
      // 从WeakMap中获取元素对应的处理函数和参数
      const { value: handler, arg } = map.get(entry.target);

      if (handler) {
        let box = entry.borderBoxSize[0];
        // 根据参数选择要观察的尺寸类型
        switch (arg) {
          case "border-box":
            box = entry.borderBoxSize[0];
            break;
          case "content-box":
            box = entry.contentBoxSize[0];
            break;
          case "dpr":
            box = entry.devicePixelContentBoxSize[0];
            break;
          default:
            break;
        }
        // 调用处理函数并传递新的宽度和高度
        handler({
          width: box?.inlineSize,
          height: box?.blockSize,
        });
      }
    } catch (error) {
        if (error instanceof TypeError) {
            console.error(`监听元素出错${error.message}`);
        }
    }
  }
});

export default function setupResizeObserver(app: App) {
  // 创建一个自定义指令用于监听元素的尺寸变化
  const resizeObserverDirective: Directive<Element, any> = {
    // 指令挂载时开始监听元素尺寸变化
    mounted(el: Element, binding) {
      ob.observe(el);
      // 将元素和对应的处理函数存储在WeakMap中
      map.set(el, binding);
    },

    // 指令卸载时停止监听元素尺寸变化
    unmounted(el) {
      ob.unobserve(el);
    },
  };

  // 在Vue应用中注册自定义指令
  app.directive("resize-observer", resizeObserverDirective);
}
