import { ref, computed, unref, watch } from "vue";
import { useSearchStore } from "@/store";

interface Callback {
  (): void;
}

export default function useFilterPopover() {
  const { openBackDrop, closeBackDrop } = useSearchStore();
  const showPopover = ref(false);

  function handlePopoverShow(value: boolean) {
    console.log("我触发了", value);
  }

  function handleSubmit(cb?: Callback) {
    cb && cb();
    showPopover.value = false;
    closeBackDrop();
  }
  function handleReset(cb?: Callback) {
    cb && cb();
  }

  function handleBackDrop(e: Event) {
    showPopover.value = true;
    openBackDrop();
  }
  function handleOutsideClick() {
    closeBackDrop();
    showPopover.value = false;
  }

  return {
    showPopover,
    handlePopoverShow,
    handleSubmit,
    handleReset,
    handleBackDrop,
    handleOutsideClick,
  };
}
