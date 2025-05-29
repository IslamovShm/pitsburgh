<script setup>
import { useRecipes } from '@/hooks/useRecipes'
import MainHeader from '@/components/MainHeader.vue'
import SearchInput from '@/components/SearchInput.vue'
import DropDown from '@/components/DropDown.vue'
import RecipeList from '@/components/RecipeList.vue'

const { recipes, page, busyRecipes, tag, query, toggleSort, tags, busyTags, pages } = useRecipes()
</script>

<template>
  <main>
    <MainHeader />

    <div class="main-content">
      <div class="main-controllers">
        <DropDown :tags="tags" v-model="tag" :disabled="busyTags" />
        <SearchInput v-model="query" @search="query = $event" />
      </div>

      <RecipeList
        :recipes="recipes"
        :pages="pages"
        v-model:page="page"
        :busyRecipes="busyRecipes"
        :toggleSort="toggleSort"
      />
    </div>
  </main>
</template>

<style scoped>
.main-content {
  padding: 20px;
}
.main-controllers {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
