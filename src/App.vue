<script setup>
import Aside from '@/components/Aside.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
    <Aside v-if="!route.meta.hideAside" />
    <router-view></router-view>
</template>

<style></style>