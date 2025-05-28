<script setup>
import { ref } from 'vue'
import { useLogin } from '@/hooks/useLogin'
import eyeSlash from '@/assets/icons/eye-slash.svg'

const { email, password, loading, errors, submit } = useLogin()
const showPwd = ref(false)
</script>

<template>
  <div class="login">
    <div class="login-container">
      <Logo class="logo" />

      <form @submit.prevent="submit" class="login-form">
        <Input
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="Эл. почта"
          label="Email"
          :error="errors.email"
        />

        <Input
          v-model="password"
          :type="showPwd ? 'text' : 'password'"
          autocomplete="current-password"
          placeholder="Пароль"
          label="Пароль"
          :error="errors.password"
        >
          <template #suffix>
            <button
              class="eye"
              type="button"
              :aria-label="showPwd ? 'Скрыть' : 'Показать'"
              @click="showPwd = !showPwd"
            >
              <img :src="eyeSlash" alt="" />
            </button>
          </template>
        </Input>

        <button :disabled="loading" class="form-btn">Войти</button>
        <router-link to="#" class="forgot-pass">Забыли пароль?</router-link>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  max-width: 449px;
  width: 100%;
  padding: 40px 50px;
  background-color: var(--base-white);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
}

.logo {
  font-size: 30px;
  line-height: 38px;
}

.login-form {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 24px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.eye {
  position: absolute;
  top: 50%;
  right: 14px;
}

.form-btn {
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  color: var(--base-white);
  background-color: var(--color-purple);
  border-radius: 8px;
}

.forgot-pass {
  color: var(--color-black);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}
</style>
