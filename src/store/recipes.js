import api from '@/utils/api'

export default {
  namespaced: true,

  state: () => ({
    recipes: [],
    tags: [],

    tag: '',
    query: '',
    sort: 'asc',

    skip: 0,
    limit: 11,
    total: 0,

    busyRecipes: false,
    busyTags: false,
  }),

  getters: {
    pages: (state) => Math.ceil(state.total / state.limit),
    hasMore: (state) => state.total > state.skip + state.limit,
    sortedTags: (state) => [...state.tags].sort((a, b) => a.localeCompare(b)),
  },

  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes
    },
    setTags(state, tags) {
      state.tags = tags
    },
    setTotal(state, total) {
      state.total = total
    },

    setTag(state, tag) {
      state.tag = tag
    },
    setQuery(state, query) {
      state.query = query
    },
    setSort(state, sort) {
      state.sort = sort
    },

    resetSkip(state) {
      state.skip = 0
    },
    nextPage(state) {
      state.skip += state.limit
    },

    setBusyRecipes(state, busy) {
      state.busyRecipes = busy
    },
    setBusyTags(state, busy) {
      state.busyTags = busy
    },
  },

  actions: {
    async fetchTags({ state, commit }) {
      if (state.tags.length) return
      commit('setBusyTags', true)
      try {
        const { data } = await api.get('/recipes/tags')
        commit('setTags', data)
      } catch (e) {
        console.error(e)
      } finally {
        commit('setBusyTags', false)
      }
    },

    async fetchRecipes({ state, commit }) {
      commit('setBusyRecipes', true)

      let url = '/recipes'
      const params = {
        limit: state.limit,
        skip: state.skip,
        sortBy: 'name',
        order: state.sort,
      }

      if (state.query.trim()) {
        url = '/recipes/search'
        params.q = state.query
      }

      if (state.tag.trim()) {
        url = `/recipes/tag/${encodeURIComponent(state.tag)}`
      }

      try {
        const { data } = await api.get(url, { params })
        commit('setRecipes', data)
        commit('setTotal', data.total)
      } catch (e) {
        console.error(e)
      } finally {
        commit('setBusyRecipes', false)
      }
    },

    async loadNextPage({ getters, commit, dispatch }) {
      if(!getters.hasMore) return
      commit('nextPage')
      await dispatch('fetchRecipes')
    }
  },
}
