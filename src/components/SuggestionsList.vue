<script setup lang="ts">
import type { Item } from "./types";
defineProps<{
  items: Item[];
  activeItemIndex: number;
  isOpen: boolean;
}>();
const emits = defineEmits<{
  (e: "onSelect", item: Item): void;
}>();
</script>

<template>
  <Transition name="slide-fade">
    <div class="list" v-show="isOpen && items.length > 0">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="list-item"
        :class="{ active: index === activeItemIndex }"
        @click="emits('onSelect', item)"
      >
        {{ item.label }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.list {
  position: absolute;
  top: 3rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  background: #ffffff;
  box-shadow: 0px 8px 24px -4px rgba(27, 46, 94, 0.12);
  border-radius: 8px;
}

.list-item {
  padding: 8px;
  color: #5a6474;
  width: 100%;
  border-radius: 4px;
}
.active {
  background: #f8f8f8;
  cursor: pointer;
}
.list-item:hover {
  background: #f8f8f8;
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
