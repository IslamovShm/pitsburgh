<script setup>
import { buildPages } from '@/utils/pagination'
import { computed, toRefs } from 'vue'

const props = defineProps({
  total: { type: Number, required: true },
  modelValue: { type: Number, required: true },
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue'])
const { total, modelValue, disabled } = toRefs(props)

const pages = computed(() => buildPages(total.value, modelValue.value))

const prevDisabled = computed(() => disabled.value || modelValue.value === 1)
const nextDisabled = computed(() => disabled.value || modelValue.value === total.value)

function go(page) {
  if (props.disabled) return
  if (page < 1 || page > props.total || page === props.modelValue) return
  emit('update:modelValue', page)
}

function jumpEllipsis(idx) {
  const arr = pages.value
  const prev = arr[idx - 1]
  if (prev && prev > 0) go(Math.min(prev + 1, props.total))
}
</script>

<template>
  <nav class="pager">
    <button class="arrow" :disabled="prevDisabled" @click="go(modelValue - 1)">
      <Icon name="chevron-left" class="icon" />
    </button>

    <button
      v-for="(p, i) in pages"
      :key="i + '-' + p"
      class="page"
      :class="{ active: p === modelValue, dots: p === -1 }"
      :disabled="disabled || p === -1"
      @click="p === -1 ? jumpEllipsis(i) : go(p)"
    >
      {{ p === -1 ? '…' : p }}
    </button>

    <button class="arrow" :disabled="nextDisabled" @click="go(modelValue + 1)">
      <Icon name="chevron-right" class="icon" />
    </button>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 8px 20px 12px 20px;
  background-color: var(--base-white);
  border: 1px solid var(--border-color);
  border-top: none;
}

.page {
  padding: 4px 12.5px;
  line-height: 24px;
  color: var(--graphite-900);
  border-radius: 8px;
}

.page.active {
  color: var(--base-white);
  background-color: var(--color-purple);
}

.arrow {
  padding: 6px;
  width: 32px;
  height: 32px;
}
</style>
