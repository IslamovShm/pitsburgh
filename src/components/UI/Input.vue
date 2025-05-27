<script setup>
import { computed } from 'vue'
defineOptions({ name: 'Input' })

const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  placeholder: String,
  label: String,
  id: String,
  error: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const uid = computed(() => props.id ?? `i-${Math.random().toString(36).slice(2)}`)
</script>

<template>
  <div>
    <div class="input-block">
      <label class="label" v-if="label" :for="uid">{{ label }}</label>

      <input
        class="input"
        :id="uid"
        :type="type"
        :class="{ invalid: error }"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(e) => emit('update:modelValue', e.target.value)"
        v-bind="$attrs"
      />
      <slot name="suffix" />
    </div>
    <p v-if="error" class="err">{{ error }}</p>
  </div>
</template>

<style scoped>
.input-block {
  position: relative;
  width: 100%;
}

.input {
  padding: 12px 42px 12px 14px;
  color: var(--graphite-300);
  font-size: 16px;
  line-height: 24px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  color: var(--graphite-800);
}

.input::placeholder {
  color: var(--graphite-300);
  opacity: 1;
}

.label {
  display: block;
  text-align: left;
  margin-bottom: 6px;
}

.err {
  text-align: left;
  color: var(--error-500);
  margin-top: 6px;
}

.input.invalid {
  border-color: var(--error-500);
}
</style>
