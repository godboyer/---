import type { App, Directive } from "vue";

export default function setupClickOutsideDirective(app: App) {
  const outsideDirective: Directive<HTMLElement, boolean | undefined> = {
    beforeMount(el:HTMLElement, binding) {
      el.clickOutsideEvent = function (event: { target: any }) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event);
        }
      };
      document.body.addEventListener("mousedown", el.clickOutsideEvent);
    },
    unmounted(el) {
      document.body.removeEventListener("mousedown", el.clickOutsideEvent);
    },
    };
    
    app.directive("click-outside",outsideDirective);
}


