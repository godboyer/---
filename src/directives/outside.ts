import type { App, Directive } from "vue";

export default function setupClickOutsideDirective(app: App) {
  const outsideDirective: Directive<Element, Function> = {

    //  function handleClickDom(event: { target: Node | null; }) {
       
    //   }

    
    // beforeMount(el: Element, binding) {
    //   const handler = binding.value;
    //   handler(function (event: { target: any }) {
    //     if (!(el === event.target || el.contains(event.target))) {
    //       binding.value(event);
    //     }
    //   // });

     

    //   document.body.addEventListener("mousedown", handleClickDom);
    // },
    // unmounted(el) {
    //   document.body.removeEventListener("mousedown", handleClickDom);
    // },
  };

  app.directive("click-outside", outsideDirective);
}
