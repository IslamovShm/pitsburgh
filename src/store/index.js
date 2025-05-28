import { createStore } from 'vuex'
import auth from './auth'
import recipes from './recipes'

export default createStore({
  modules: {
    auth: auth,
    recipes: recipes,
  },
})
