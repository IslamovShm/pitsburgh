import { useStore } from 'vuex'
import { computed, watch, onMounted } from 'vue'

export function useRecipes() {
  const store = useStore()
  const recipes = computed(() => store.state.recipes.recipes)
  const tags = computed(() => store.getters['recipes/sortedTags'])
  const busyRecipes = computed(() => store.state.recipes.busyRecipes)
  const busyTags = computed(() => store.state.recipes.busyTags)
  const hasMore = computed(() => store.getters['recipes/hasMore'])
  const pages = computed(() => store.getters['recipes/pages'])

  const tag = computed({
    get: () => store.state.recipes.tag,
    set: (value) => store.commit('recipes/setTag', value),
  })

  const query = computed({
    get: () => store.state.recipes.query,
    set: (value) => store.commit('recipes/setQuery', value),
  })

  const sort = computed({
    get: () => store.state.recipes.sort,
    set: (value) => store.commit('recipes/setSort', value),
  })

  const fetchRecipes = () => store.dispatch('recipes/fetchRecipes')
  const loadMore = () => store.dispatch('recipes/loadNextPage')

  watch([tag, query, sort], () => {
    store.commit('recipes/resetSkip')
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
    hasMore,
    pages,
    tag,
    query,
    sort,
    loadMore,
  }
}
