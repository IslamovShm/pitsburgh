<script setup>
defineOptions({ name: 'PageTitle' })
defineProps({ title: String, mode: String })
</script>

<template>
  <h1 class="base-title main-title">
    {{ title }}
    <Mode :mode="mode" />
  </h1>
</template>

<style scoped>
.main-title {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
