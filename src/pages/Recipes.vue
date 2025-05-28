<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';


const store = useStore()

onMounted(() => {
    store.dispatch('recipes/fetchRecipes')
})

const recipes = computed(() => store.state.recipes.recipes)
const isLoading = computed(() => store.state.recipes.isLoading)
const totalPages = computed(() => store.state.recipes.totalPages)

</script>

<template>
    <div>Receipt</div>
</template>

<style scoped></style>