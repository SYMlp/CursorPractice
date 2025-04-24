<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col h-full">
    <!-- Title -->
    <h3 class="text-base font-semibold text-gray-800 mb-4">{{ title }}</h3>

    <!-- Top Section: Icon, Label, Total -->
    <div class="mb-4">
      <div class="flex items-center mb-1">
        <img v-if="icon" :src="icon" alt="Interface Icon" class="w-7 h-7 mr-2" aria-hidden="true" />
        <span class="text-sm text-gray-500">接口总数</span>
      </div>
      <div class="text-3xl font-bold text-gray-900">{{ total.toLocaleString() }}</div>
    </div>

    <!-- Middle Section: Metrics List -->
    <div class="flex flex-col space-y-1.5 mb-4">
      <div v-for="(metric, index) in metrics" :key="index" class="flex items-center">
        <img
          v-if="metric.iconPath"
          :src="metric.iconPath"
          alt=""
          class="w-4 h-4 mr-2"
          aria-hidden="true"
        />
        <span class="text-sm text-gray-600 truncate" :title="metric.label">
          {{ metric.label }}
        </span>
        <span class="text-sm font-semibold text-gray-900 ml-auto">
          {{ formatNumber(metric.value) }}
        </span>
      </div>
    </div>

    <!-- Bottom Section: Publish Rate Progress Bar -->
    <div class="mt-auto pt-3 border-t border-gray-200">
      <div class="flex justify-between items-center mb-1">
        <span class="text-xs text-gray-500">接口发布率</span>
        <span class="text-xs font-semibold text-blue-600">{{ publishRate.toFixed(1) }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          class="bg-blue-600 h-1.5 rounded-full transition-width duration-300 ease-in-out"
          :style="{ width: publishRate + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Assuming icons are provided via props or imported if static
// import mainInterfaceIcon from '@/assets/icons/platform/interface.png'; // Example import

interface Metric {
  value: number
  label: string // Label is essential for display
  color?: string // Optional color, not currently used in template
  iconPath: string // Path to the metric icon
}

interface InterfaceCardProps {
  title: string
  total: number
  metrics: Metric[] // Metrics array is expected
  publishRate: number // Publish rate percentage
  icon?: string // Optional main icon path (e.g., platform/interface.png)
}

defineProps<InterfaceCardProps>()

// Helper function to format large numbers with '万'
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    const tenThousand = Math.floor(num / 10000)
    const remainder = num % 10000
    // Avoid showing '.0万' or '万0'
    if (remainder === 0) {
      return `${tenThousand}万`
    }
    // Format remainder for clarity if needed, e.g., 12万345
    // Currently just appends non-zero remainder
    return `${tenThousand}万${remainder}`
  }
  return num.toString()
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
