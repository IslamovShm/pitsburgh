<script setup>
import { ref, watch } from 'vue'


const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'], 'search')

const text = ref(props.modelValue ?? '')
watch(() => props.modelValue, value => {
    text.value = value
})

function runSearch() {
    const query = text.value.trim()
    emit('update:modelValue', query)
    emit('search', query)
}

</script>

<template>
  <div class="search-input">
    <button type="button" @click="runSearch">
      <Icon name="search" />
    </button>
    <input type="text" placeholder="Найти рецепт" v-model="text" @keyup.enter="runSearch" />
  </div>
</template>

<style scoped>
.search-input {
  padding: 11px 9px;
  background-color: var(--base-white);
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 314px;
  width: 100%;
}

.search-input button {
  width: 22px;
  height: 22px;
}
</style>
