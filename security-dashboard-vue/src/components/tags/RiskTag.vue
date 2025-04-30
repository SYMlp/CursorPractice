<template>
  <span class="inline-block bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
interface RiskTagProps {
  text: string
}

defineProps<RiskTagProps>()
</script>

<style scoped>
/* 可以添加特定样式 */
</style>
