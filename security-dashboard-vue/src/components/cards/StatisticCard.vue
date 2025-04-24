<template>
  <div :class="[`bg-white rounded-lg shadow p-4 flex flex-col`, className]">
    <div class="flex items-center mb-1">
      <div v-if="icon" class="mr-2">
        <!-- 假设 icon 是一个组件或 VNode。如果 icon 是 URL 或 SVG 字符串，需要调整 -->
        <component :is="icon" v-if="typeof icon === 'object' || typeof icon === 'function'" />
        <!-- 或者，如果 icon 是一个简单的 HTML 元素 -->
        <div v-else v-html="icon"></div>
      </div>
      <div class="text-gray-600 text-sm">{{ label }}</div>
    </div>
    <div class="text-3xl font-bold">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

// 定义 Props
interface StatisticCardProps {
  label: string
  value: string | number
  // Vue 中 icon 通常是 FunctionalComponent 或字符串 (如 SVG)。React.ReactNode 比较宽泛。
  // 我们先用 FunctionalComponent | string | null 替代，具体根据实际 icon 类型调整。
  icon?: FunctionalComponent<HTMLAttributes & VNodeProps> | string | null
  className?: string
}

// 使用 defineProps 接收 props
// 使用 withDefaults 为可选 props 设置默认值 (虽然这里 React 也没显式设置 icon 默认值，但 className 有)
const props = withDefaults(defineProps<StatisticCardProps>(), {
  icon: null,
  className: '',
})
</script>

<style scoped>
/* 如果需要特定的 scoped 样式可以加在这里 */
</style>
