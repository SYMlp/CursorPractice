<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="props.class"
    role="img"
    aria-labelledby="interfaceTitle"
  >
    <title id="interfaceTitle">Interface Icon</title>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 20, // Default size
  class: '',
})
</script>
