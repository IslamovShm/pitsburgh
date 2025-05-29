<script setup>
import ProfileMenu from './ProfileMenu.vue'
</script>

<template>
  <div class="main-header">
    <PageTitle title="Рецепты" mode="admin" />

    <ProfileMenu />
  </div>
</template>

<style scoped>
.main-header {
  padding: 10px 20px;
  background-color: var(--base-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
}
</style>
