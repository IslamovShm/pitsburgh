<script setup>
defineOptions({
    name: 'Mode'
})
defineProps({
    mode: String
})
</script>

<template>
    <span v-if="mode === 'admin'" class="admin mode">
        Режим администратора
    </span>
</template>

<style scoped>

.mode {
    padding: 3px 6px;
    border-radius: 6px;
    font-size: 12px;
    line-height: 18px;
}

.admin {
    background-color: var(--color-light-blue);
    color: var(--color-blue);
}

</style>