<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
  tags: { type: Array, default: () => [] },
  modelValue: { type: String },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const box = ref(null)
const open = ref(false)

onClickOutside(box, () => (open.value = false))

function select(value) {
  emit('update:modelValue', value)
  open.value = false
}
</script>

<template>
  <div class="dropdown-block" ref="box">
    <div class="dropdown" @click="open = !open" :class="{ disabled }">
      <div class="dropdown-header">
        <Icon name="list" class="icon" />
        <span>{{ modelValue.length ? modelValue : 'Теги' }}</span>
      </div>
      <button type="button">
        <Icon name="chevron_down" class="icon" />
      </button>
    </div>
    <ul class="dropdown-content" :class="{ active: open }">
      <li @click="select(tag)" v-for="tag in tags" :key="tag" class="dropdown-item">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.icon {
  min-width: 20px;
}

.dropdown-block {
  position: relative;
  max-width: 230px;
  width: 100%;
}

.dropdown {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 14px;
  border-radius: 10px;
  background-color: var(--base-white);
  border: 1px solid var(--gray-300);
  cursor: pointer;
}

.dropdown.disabled {
  cursor: not-allowed;
  pointer-events: none;
}

.dropdown button {
  width: 20px;
  height: 20px;
}

.dropdown-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-header span {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: var(--icon-gray);
}

.dropdown-content {
  position: absolute;
  top: 100%;
  background-color: var(--base-white);
  width: 100%;
  max-width: 230px;
  border: 0px solid var(--gray-300);
  border-radius: 10px;
  height: fit-content;
  max-height: 0px;
  overflow-y: scroll;
  scrollbar-width: none;
  transition: all 0.3s ease-in-out;
}

.dropdown-content.active {
  top: 110%;
  height: fit-content;
  max-height: 135px;
  border: 1px solid var(--gray-300);
}

.dropdown-content::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.dropdown-item {
  padding: 5px 14px;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  cursor: pointer;
  border-bottom: 1px solid var(--gray-300);
}

.dropdown-item:last-child {
  border-bottom: none;
}
</style>
