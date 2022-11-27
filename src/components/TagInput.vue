<script lang="ts" setup>
  import SuggestionsList from './SuggestionsList.vue';
  import {computed, onMounted, ref} from "vue";
  import type {Item} from "@/components/types";
  import TagsList from "@/components/TagsList.vue";
  import {createNewTagByInput} from "@/components/utils";

  const items = ref<Item[]>([])
  const error = ref<string | null>(null)
  const searchText = ref("");
  const isListOpen = ref(false);
  const selectedTags = ref<Item[]>([]);
  const activeItemIndex = ref(0);
  const filteredItems =computed(()=> {
    return items.value.filter(item=> item.label.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase()))
  })

  onMounted(async ()=>{
    try {
      const data = await fetch('/api/tags');
      const tags = await data.json();
      items.value = tags
    } catch (e) {
      error.value = "Somthing went wrong.try again"
    }

  })
  const onChangeInput = (e: Event) =>{
    const target = (<HTMLInputElement>e.target)
    isListOpen.value =true;
    searchText.value = target.value
  }

  const onCloseList = ()=> {
    searchText.value = ""
    isListOpen.value = false;
  }
  const onArrowDown = ()=> {
    if(activeItemIndex.value < filteredItems.value.length -1) activeItemIndex.value++
  }
  const onArrowUp = () => {
    if(activeItemIndex.value > 0) activeItemIndex.value--
  }

  const onSelectActiveItem = ()=> {
    let newTag
    if(filteredItems.value.length === 0) {
      newTag = createNewTagByInput(searchText.value)
    } else {
      newTag = filteredItems.value[activeItemIndex.value]
    }
    selectedTags.value.push(newTag)
    onCloseList()
  }

  const onSelectWithComma = ()=> {
    if(searchText.value) {
      const newTag = createNewTagByInput(searchText.value.slice(0,-1))
      selectedTags.value.push(newTag);
      searchText.value = ''
    }
  }
  const onSelectWithClick = (item:Item)=> {
    selectedTags.value.push(item);
    onCloseList()
  }

  const onRemoveTag = (id: string) => {
    selectedTags.value = selectedTags.value.filter(item=> item.id !== id )
  }

</script>

<template>
  <p v-if="error">{{error}}</p>
  <div class="wrapper" v-if="!error">
    <input class="input"
           type="text"
           placeholder="Add tags..."
           @input="onChangeInput"
           @focus="isListOpen = true"
           @blur="onCloseList"
           @keyup.esc="onCloseList"
           @keyup.enter="onSelectActiveItem"
           @keyup.,="onSelectWithComma"
           @keyup.down="onArrowDown"
           @keyup.up="onArrowUp"
    />
    <SuggestionsList
        :items="filteredItems"
        :active-item-index="activeItemIndex"
        :is-open="isListOpen"
        @on-select="onSelectWithClick"
    />
    <TagsList
        :items="selectedTags"
        @removeTag="onRemoveTag"
    />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.input {
  width: 100%;
  height: 36px;
  background: #FFFFFF;
  padding: 8px;
  border: 1px solid #F8F8F8;
  border-radius: 8px;
  margin-bottom: 8px;
}
</style>