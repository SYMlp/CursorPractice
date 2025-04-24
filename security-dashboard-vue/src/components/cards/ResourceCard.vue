<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col h-full">
    <!-- Title -->
    <div class="mb-4">
      <h3 class="text-base font-semibold text-gray-800">{{ title }}</h3>
    </div>

    <div class="flex-grow flex flex-col sm:flex-row">
      <!-- Icon and Total Count -->
      <div class="flex items-center mb-4 sm:mb-0 sm:border-r sm:pr-4">
        <div
          class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-3"
        >
          <img v-if="icon" :src="icon" alt="Icon" class="w-6 h-6" />
          <!-- Fallback or default icon can be added here -->
        </div>
        <div class="flex-1">
          <div class="text-sm text-gray-500 mb-1">资源总量</div>
          <div class="text-2xl font-bold text-gray-900">{{ total.toLocaleString() }}</div>
        </div>
      </div>

      <!-- Metrics -->
      <div class="flex-1 sm:pl-4 mb-4 sm:mb-0">
        <div
          v-for="(metric, index) in metrics"
          :key="index"
          class="flex items-center justify-between mb-1 last:mb-0"
        >
          <div class="flex items-center">
            <!-- Render component icon if provided -->
            <component
              v-if="metric.iconComponent"
              :is="metric.iconComponent"
              v-bind="metric.iconProps"
              class="w-4 h-4 mr-2"
            />
            <!-- Otherwise render image icon if path provided -->
            <img
              v-else-if="metric.iconPath"
              :src="metric.iconPath"
              alt="Metric Icon"
              class="w-4 h-4 mr-2"
            />
            <span class="text-gray-600 text-sm truncate" :title="metric.label">
              {{ metric.label }}
            </span>
          </div>
          <span class="font-medium text-sm" :style="{ color: metric.color }">
            {{ metric.value.toFixed(1) }}%
          </span>
        </div>
      </div>
    </div>

    <!-- Growth Items (Optional) -->
    <div
      v-if="growthItems && growthItems.length > 0"
      class="mt-auto pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2"
    >
      <div v-for="(item, index) in growthItems" :key="index" class="flex items-center">
        <span class="text-gray-500 text-sm mr-2">{{ item.label }}:</span>
        <div
          :class="[
            'flex items-center font-medium text-xs px-1.5 py-0.5 rounded-full',
            item.isUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
          ]"
        >
          {{ item.value }}%
          <span class="ml-0.5 font-bold text-lg leading-none">{{ item.isUp ? '↑' : '↓' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue' // Import Component type

interface Metric {
  label: string
  value: number
  color: string
  // Updated to accept component or path
  iconComponent?: Component
  iconProps?: Record<string, unknown>
  iconPath?: string
}

interface GrowthItem {
  label: string
  value: number
  isUp: boolean
}

// Define props directly without assigning to a variable if not needed in script
defineProps<{
  icon?: string // Main card icon remains path string
  title: string
  total: number
  metrics: Metric[]
  growthItems?: GrowthItem[]
}>()
</script>

<style scoped>
/* Add any component-specific styles here if needed */
.last\:mb-0:last-child {
  margin-bottom: 0;
}
</style>
