<script setup>
import Pagination from '@/components/Pagination.vue'
import selector from '@/assets/icons/selector.svg'

defineProps({
  recipes: Array,
  pages: Number,
  page: Number,
  busyRecipes: Boolean,
  toggleSort: Function,
})
const emit = defineEmits(['update:page'])
</script>

<template>
  <table class="recipe-table">
    <colgroup>
      <col style="width: 190px" />
      <col style="width: 190px" />
      <col style="width: 185px" />
      <col style="width: 233px" />
      <col style="width: 148px" />
      <col style="width: 217px" />
    </colgroup>

    <thead>
      <tr>
        <th class="name">
          Название
          <button type="button" class="sort-btn" @click="toggleSort">
            <img :src="selector" alt="selector" class="selector" />
          </button>
        </th>
        <th>Кухня</th>
        <th>Сложность</th>
        <th>Калории&nbsp;на&nbsp;порцию</th>
        <th>Время&nbsp;готовки</th>
        <th>Теги</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="recipe in recipes" :key="recipe.id">
        <td>{{ recipe.name }}</td>
        <td>{{ recipe.cuisine }}</td>
        <td><Difficulty :difficulty="recipe.difficulty.toLowerCase()" /></td>
        <td>{{ recipe.caloriesPerServing }}</td>
        <td>{{ recipe.prepTimeMinutes }} минут</td>
        <td class="tag-wrapper">
          <Tag v-for="tag in recipe.tags" :key="tag" :tag="tag" />
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination
    v-if="pages > 1"
    :model-value="page"
    @update:model-value="emit('update:page', $event)"
    :total="pages"
    :disabled="busyRecipes"
  />
</template>

<style scoped>
.recipe-table {
  width: 100%;
  text-align: left;
  background-color: var(--base-white);
}
.recipe-table th,
.recipe-table td {
  padding: 14px 11px 14px 16px;
}
.recipe-table th {
  font-weight: 500;
  color: var(--icon-gray);
}
.tag-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.pagination-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

.name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-btn {
  width: 20px;
  height: 20px;
}


</style>
