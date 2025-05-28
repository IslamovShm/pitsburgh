<script setup>
import Aside from '@/components/Aside.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="main">
    <Aside v-if="!route.meta.hideAside" />
    <router-view></router-view>
  </div>
</template>

<style scoped>

.main {
    display: flex;
    height: 100vh;
}

</style>
