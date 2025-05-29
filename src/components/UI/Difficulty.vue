<script setup>
defineOptions({ name: 'Difficulty' })
defineProps({ difficulty: String })
</script>

<template>
    <span class="easy" v-if="difficulty === 'easy'">Легко</span>

    <span class="medium" v-else-if="difficulty === 'medium'">Средняя</span>

    <span class="hard" v-else>Сложно</span>
</template>

<style scoped>
span {
    padding: 2px 8px;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    border-radius: 100px;
}
.medium {
    border: 1px solid var(--color-light-orange);
    background-color: var(--color-very-light-orange);
    color: var(--color-orange);
}

.easy {
    border: 1px solid var(--color-light-green);
    background-color: var(--color-very-light-green);
    color: var(--color-green);
}

.hard {
    border: 1px solid var(--color-light-red);
    background-color: var(--color-very-light-red);
    color: var(--color-red);
}

</style>