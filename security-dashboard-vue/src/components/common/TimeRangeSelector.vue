<template>
  <div class="flex bg-gray-50 rounded-lg p-0.5 text-xs">
    <button
      class="px-2 py-1 rounded-md transition-colors"
      :class="
        currentRange === 'day'
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-600 hover:text-blue-600'
      "
      @click="handleChange('day')"
    >
      一天
    </button>
    <button
      class="px-2 py-1 rounded-md transition-colors"
      :class="
        currentRange === 'week'
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-600 hover:text-blue-600'
      "
      @click="handleChange('week')"
    >
      一周
    </button>
    <button
      class="px-2 py-1 rounded-md transition-colors"
      :class="
        currentRange === 'month'
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-600 hover:text-blue-600'
      "
      @click="handleChange('month')"
    >
      一月
    </button>
  </div>
</template>

<script setup lang="ts">
// 时间范围类型
type TimeRange = 'day' | 'week' | 'month'

// 定义组件props
const props = defineProps<{
  chartId?: string // 与图表关联的ID
  currentRange: TimeRange
}>()

// 定义事件
const emit = defineEmits<{
  (e: 'change', range: TimeRange): void
}>()

// 处理时间范围变化
const handleChange = (range: TimeRange) => {
  emit('change', range)
}
</script>
