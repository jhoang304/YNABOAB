<template>
  <div class="loading-spinner" :class="sizeClass">
    <div class="spinner" :class="colorClass"></div>
    <span v-if="text" class="loading-text" :class="textSizeClass">{{ text }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'white', 'gray'].includes(value)
  },
  text: {
    type: String,
    default: ''
  }
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  }
  return sizes[props.size]
})

const colorClass = computed(() => {
  const colors = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600'
  }
  return colors[props.color]
})

const textSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})
</script>

<style scoped>
.loading-spinner {
  @apply flex items-center justify-center;
}

.spinner {
  @apply inline-block border-2 border-solid border-opacity-20 border-t-opacity-100 rounded-full animate-spin;
}

.spinner.border-primary-600 {
  width: 1.5rem;
  height: 1.5rem;
}

.loading-spinner.gap-2 .spinner {
  width: 1rem;
  height: 1rem;
}

.loading-spinner.gap-4 .spinner {
  width: 2rem;
  height: 2rem;
}

.loading-text {
  @apply text-gray-600 font-medium;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>