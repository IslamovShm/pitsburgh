import { ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export function useLogin() {
  const email = ref('')
  const password = ref('')

  const loading = ref(false)
  const errors = reactive({ email: '', password: '' })

  watch([email, password], () => {
    errors.email = ''
    errors.password = ''
  })

  const validate = () => {
    let ok = true
    if (!email.value.trim()) {
      errors.email = 'Укажите e-mail'
      ok = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      errors.email = 'Некорректный e-mail'
      ok = false
    }
    if (!password.value) {
      errors.password = 'Введите пароль'
      ok = false
    }
    return ok
  }

  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const submit = async () => {
    if (!validate() || loading.value) return
    loading.value = true

    try {
      await store.dispatch('auth/login', {
        email: email.value.trim(),
        password: password.value,
      })
      router.push(route.query.redirect ?? '/')
    } catch (e) {
      if (e.code === 'email') errors.email = e.message
      else if (e.code === 'password') errors.password = e.message
      else {
        errors.email = errors.password = e.message
      }
    } finally {
      loading.value = false
    }
  }

  return { email, password, loading, errors, submit }
}
