<template>
  <div :class="['flex items-center p-4 rounded-lg shadow', color, className]">
    <div class="mr-4 text-white">
      <slot name="icon"></slot>
      <!-- 使用名为 'icon' 的插槽来接收图标 -->
    </div>
    <div>
      <div class="text-sm font-medium text-white/80">{{ title }}</div>
      <div class="text-2xl font-bold text-white">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

// --- Props 定义 ---
withDefaults(
  defineProps<{
    title: string
    value: string | number
    color?: string // 背景颜色类，例如 'bg-blue-500', 'bg-green-500'
    className?: string // 额外的 CSS 类
  }>(),
  {
    color: 'bg-blue-500', // 默认背景色
    className: '',
  },
)

// 注意：图标现在通过名为 'icon' 的插槽传递，而不是 prop
// 使用示例：
// <MetricCard title="示例" value="123" color="bg-green-500">
//   <template #icon>
//     <YourIconComponent /> // 或者 <svg>...</svg>
//   </template>
// </MetricCard>
</script>

<style scoped>
/* 如果需要，可以添加特定于此组件的样式 */
</style>
