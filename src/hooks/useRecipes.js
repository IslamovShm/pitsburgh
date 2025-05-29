import { useStore } from 'vuex'
import { computed, watch, onMounted } from 'vue'

export function useRecipes() {
  const store = useStore()
  const recipes = computed(() => store.state.recipes.recipes)
  const tags = computed(() => store.getters['recipes/sortedTags'])
  const busyRecipes = computed(() => store.state.recipes.busyRecipes)
  const busyTags = computed(() => store.state.recipes.busyTags)
  const pages = computed(() => store.getters['recipes/pages'])
  const sort = computed(() => store.state.recipes.sort)

  const tag = computed({
    get: () => store.state.recipes.tag,
    set: (value) => store.commit('recipes/setTag', value),
  })

  const query = computed({
    get: () => store.state.recipes.query,
    set: (value) => store.commit('recipes/setQuery', value),
  })

  const page = computed({
    get: () => store.getters['recipes/currentPage'],
    set: (value) => store.commit('recipes/setPage', value),
  })

  const fetchRecipes = () => store.dispatch('recipes/fetchRecipes')
  function toggleSort() {
    store.commit('recipes/toggleSort')
    fetchRecipes()
  }

  watch([tag, query], () => {
    store.commit('recipes/resetSkip')
    fetchRecipes()
  })

  watch([page, sort], () => {
    fetchRecipes()
  })

  onMounted(() => {
    store.dispatch('recipes/fetchTags')
    fetchRecipes()
  })

  return {
    recipes,
    tags,
    busyRecipes,
    busyTags,
    pages,
    tag,
    query,
    sort,
    page,
    toggleSort
  }
}
