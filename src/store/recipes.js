import axios from 'axios'

export default {
  namespaced: true,

  state: () => ({
    recipes: [],
    isLoading: false,
    skip: 0,
    limit: 11,
    totalPages: 0,
  }),

  getters: {},

  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
  },

  actions: {
    async fetchRecipes({ state, commit }) {
        try {
            commit('setLoading', true)
            const { data } = await axios.get('https://dummyjson.com/recipes', {
                params: {
                    limit: state.limit,
                    skip: state.skip,
                }
            })

            commit('setTotalPages', Math.ceil(data.total / state.limit))
            commit('setRecipes', data.recipes)
        } catch (e) {
            console.log(e)
        } finally {
            commit('setLoading', false)
        }
    }
  }
}
