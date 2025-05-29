<script setup>
defineOptions({ name: 'Tag' })
defineProps({ tag: String })
</script>

<template>
    <span class="tag">{{ tag }}</span>
</template>

<style scoped>
.tag {
    padding: 2px 8px;
    font-weight: 500;
    font-size: 10px;
    line-height: 18px;
    color: var(--icon-gray);
    background-color: var(--gray-300);
    border: 1px solid var(--light-gray);
    border-radius: 100px;
    white-space: nowrap;
}
</style>