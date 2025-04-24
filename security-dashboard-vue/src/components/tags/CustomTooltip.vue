<template>
  <div class="relative group">
    <slot></slot>
    <div
      class="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 w-auto max-w-xs whitespace-normal -translate-y-full left-0 top-0 mt-0 mb-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      {{ title }}
      <div
        class="absolute top-full left-3 h-2 w-2 bg-gray-900 transform rotate-45 pointer-events-none"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TooltipProps {
  title: string
}

defineProps<TooltipProps>()
</script>

<style scoped>
/* group-hover 功能依赖于 Tailwind，不需要额外样式 */
</style>
