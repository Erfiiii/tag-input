<script setup lang="ts">
import TagInput from "@/components/TagInput.vue";
</script>

<template>
  <div class="container">
    <TagInput />
  </div>
</template>

<style scoped>
.container {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  border-radius: 5px;
  margin: auto;
  border: 1px dashed #7b61ff;
  padding: 32px;
}
</style>
