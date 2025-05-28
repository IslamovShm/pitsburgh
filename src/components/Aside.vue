<script setup>
import { ref } from 'vue'

import NavList from '@/components/NavList.vue'
import { navItems } from '@/constants/navItems'
import chevronsLeft from '@/assets/icons/chevrons-left.svg'


const collapsed = ref(false)
</script>

<template>
  <aside class="aside" :class="{ collapsed }">
    <header class="aside-header">
      <Logo class="logo" />
      <button @click="collapsed = !collapsed" type="button">
        <img :src="chevronsLeft" alt="chevrons-left" />
      </button>
    </header>

    <nav class="aside-nav">
      <NavList :items="navItems" />
    </nav>
  </aside>
</template>

<style scoped>

.aside {
    border-right: 1px solid var(--border-color);
    max-width: 236px;
    width: 100%;
}

.aside-header {
    padding: 13px 12px 16px 13px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}

.logo {
    font-size: 24px;
}

.aside-header button {
    padding: 4px;
    border-radius: 6px;
    background-color: var(--btn-bg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.aside-nav {
  padding: 0 12px;
}

.collapsed {
  max-width: fit-content;
}

.collapsed .aside-header .logo,
.collapsed .aside-nav {
  display: none;
}

</style>
