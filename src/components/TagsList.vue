<script lang="ts" setup>
import type { Item } from "@/components/types";

defineProps<{
  items: Item[];
}>();
const emits = defineEmits<{
  (e: "removeTag", id: string): void;
}>();
</script>

<template>
  <div class="tags">
    <div
      v-for="item in items"
      :key="item.id"
      class="tag"
      @click="emits('removeTag', item.id)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped>
.tags {
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
}
.tag {
  font-sizex: 14px;
  color: #3e5bc4;
  margin: 8px 4px;
  padding: 2px 8px;
  background: #dde1ee;
  border-radius: 100px;
}
.tag:hover {
  color: #ca3b57;
  background: #f2e1e1;
  cursor: pointer;
}
</style>
