<template>
  <span class="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
interface CapabilityTagProps {
  text: string
}

defineProps<CapabilityTagProps>()
</script>

<style scoped>
/* 可以添加特定样式 */
</style>
