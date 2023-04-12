<template>
  <div class="board-container"  >
   <Teleport to="body" >
    <div class="board-panel" v-on-click-outside="handleOutside" :class="{ 'active': shouBoard }">
      <div class="board-header">
        <h2>My Kanban Board</h2>
      
      </div>
      <div class="board-body">
        <!-- kanban board content goes here -->
      </div>
    </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { computed } from 'vue';
import { useVModel } from '@vueuse/core';
defineOptions({ name: "KanbanBoard" });

const props = withDefaults(defineProps<{
  boardVisible: boolean;
}>(), {
    boardVisible: false,
});
const emit = defineEmits<{
  (event: 'update:boardVisible', value: boolean): void;
}>();

const shouBoard = useVModel(props, 'boardVisible', emit);

function handleOutside() {
   shouBoard.value = false;
}


</script>

<style lang="scss"  scoped >
$width: 600px;
.board-container {
  position: relative;
}

.board-toggle {
  position: fixed;
  right: 0;
  bottom: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3f51b5;
  color: #fff;
  font-size: 2rem;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.board-toggle:hover {
  background-color: #1a237e;
  transform: scale(1.1);
}

.board-panel {
  position: fixed;
  top: 0;
  right:  - $width;
  width: $width;
  height: 100%;
  background-color: #fff;
  box-shadow: -5px 0px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.board-panel.active {
  right: 0;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #3f51b5;
  color: #fff;
}

.board-header h2 {
  margin: 0;
  font-size: 2rem;
}

.close-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: transparent;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: #fff;
  color: #3f51b5;
}
</style>
