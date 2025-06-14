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
    currentPage: (state) => Math.floor(state.skip / state.limit) + 1,
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
      state.query = ''
    },
    setQuery(state, query) {
      state.query = query
      state.tag = ''
    },
    toggleSort(state) {
      state.sort = state.sort === 'asc' ? 'desc' : 'asc'
    },

    setPage(state, page) {
      state.skip = (page - 1) * state.limit
    },
    resetSkip(state) {
      state.skip = 0
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
      const params = { limit: state.limit, skip: state.skip, sortBy: 'name', order: state.sort }

      if (state.tag.trim() && !state.query.trim()) {
        url = `/recipes/tag/${encodeURIComponent(state.tag)}`
      } else if (state.query.trim()) {
        url = '/recipes/search'
        params.q = state.query.trim()
      }

      try {
        const { data } = await api.get(url, { params })
        commit('setRecipes', data.recipes)
        commit('setTotal', data.total)
      } finally {
        commit('setBusyRecipes', false)
      }
    },

    async loadNextPage({ getters, commit, dispatch }) {
      if (!getters.hasMore) return
      commit('setPage', getters.currentPage + 1)
      await dispatch('fetchRecipes')
    },
  },
}
