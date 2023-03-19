import type { App, Directive, DirectiveBinding } from "vue";

interface MousePosition {
  x: number;
  y: number;
}

interface Options {
  delay: number;
}

const DEFAULT_OPTIONS: Options = {
  delay: 2000, // 默认延迟 2 秒自动隐藏
};

const BOTTOM_MARGIN = 50; // 鼠标距离屏幕底部的距离小于该值时触发弹出

const mousePosition: MousePosition = { x: 0, y: 0 }; // 鼠标位置

let timeoutId: number | null = null; // 定时器 ID

function onMouseMove(event: MouseEvent) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;

  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function onScroll() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function hide(el: HTMLElement) {
  el.style.display = 'none';
  el.removeEventListener('mouseenter', onEnter);
  el.removeEventListener('mouseleave', onLeave);
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('mousemove', onMouseMove);
}

function show(el: HTMLElement, binding: DirectiveBinding<Options>) {
  el.style.display = 'block';
  const { delay } = { ...DEFAULT_OPTIONS, ...binding.value };
  timeoutId = window.setTimeout(() => {
    hide(el);
  }, delay);
  el.addEventListener('mouseenter', onEnter);
  el.addEventListener('mouseleave', onLeave);
  window.addEventListener('scroll', onScroll);
  window.addEventListener('mousemove', onMouseMove);
}

function onEnter(this: HTMLElement) {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function onLeave(this: HTMLElement, binding: DirectiveBinding<Options>) {
  const rect = this.getBoundingClientRect();
  const bottom = window.innerHeight - rect.bottom;
  if (bottom <= BOTTOM_MARGIN) {
    show(this, binding);
  } else {
    hide(this);
  }
}
export default function setupPopupDirective(app: App) {
  const PopupDirective: Directive<HTMLElement, Options> = {
    beforeMount(el, binding) {
     
      el.style.display = "none";
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    },
    updated(el, binding) {
      if (el.style.display !== "none") {
        onLeave.call(el, binding);
      }
    },
    unmounted(el) {
      hide(el);
    },
  };

  app.directive("popup", PopupDirective);
}
