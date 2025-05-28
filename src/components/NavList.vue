<script setup>
import NavItem from '@/components/NavItem.vue'
defineProps({ items: Array })
</script>

<template>
  <ul class="nav">
    <li v-for="item in items" :key="item.title" class="nav__item">
      <NavItem :item="item" />
    </li>
  </ul>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav__item {
  width: 100%;
}
</style>
