<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import ava from '@/assets/img/ava.png'

const store = useStore()
const profile = computed(() => store.getters['auth/profile'])
</script>

<template>
  <div class="profile-wrapper">
    <div class="profile-img">
      <img :src="ava" alt="avatar" />
    </div>
    <div class="profile-info">
      <p class="profile-name">{{ profile.name }}</p>
      <p class="profile-phone">{{ profile.phone }}</p>
    </div>
    <button type="button" class="profile-btn">
      <Icon name="drop_down" />
    </button>
  </div>
</template>

<style scoped>
.profile-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text);
}

.profile-phone {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: var(--graphite-300);
}
</style>
