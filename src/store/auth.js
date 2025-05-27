import { USERS_KEY, AUTH_KEY } from '@/constants/storageKeys'
import { SEED_USERS } from '@/data/seedUsers'

if (!localStorage.getItem(USERS_KEY)) {
  localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS))
}

function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || []
}

export default {
  namespaced: true,
  state: () => ({
    user: JSON.parse(localStorage.getItem(AUTH_KEY)),
  }),

  getters: {
    isAuth: (state) => !!state.user,
    profile: (state) => state.user ?? {},
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    },
  },

  actions: {
  login({ commit }, { email, password }) {
    const users = loadUsers()
    console.log(users)

    const user = users.find(u => u.email === email)
    if (!user) {
      throw { code: 'email', message: 'Пользователь не найден' }
    }

    if (user.password !== password) {
      throw { code: 'password', message: 'Неверный пароль' }
    }

    const payload = { email: user.email, phone: user.phone, name: user.name }
    commit('setUser', payload)
    localStorage.setItem(AUTH_KEY, JSON.stringify(payload))
  },

    logout({ commit }) {
      commit('clearUser')
      localStorage.removeItem(AUTH_KEY)
    },
  },
}
