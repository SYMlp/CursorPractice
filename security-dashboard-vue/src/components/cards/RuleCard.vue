<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col text-center h-full">
    <!-- Icon -->
    <div class="mb-2">
      <img v-if="icon" :src="icon" :alt="title" class="w-8 h-8 mx-auto" />
      <!-- Placeholder icon can go here -->
    </div>

    <!-- Title -->
    <div class="mb-3">
      <h3 class="text-sm font-medium text-gray-700">{{ title }}</h3>
    </div>

    <!-- Total Count -->
    <div class="mb-4">
      <div class="text-3xl font-bold text-gray-900">{{ total.toLocaleString() }}</div>
    </div>

    <!-- Issued/Revoked Counts -->
    <div class="flex justify-between w-full mt-auto pt-3 border-t border-gray-200">
      <div>
        <span class="text-xs text-gray-500 mb-1 block">已下发</span>
        <span class="text-base font-semibold text-green-600">{{
          issuedCount?.toLocaleString() ?? '-'
        }}</span>
      </div>
      <div class="text-right">
        <span class="text-xs text-gray-500 mb-1 block">已撤销</span>
        <span class="text-base font-semibold text-red-600">{{
          revokedCount?.toLocaleString() ?? '-'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RuleCardProps {
  icon?: string // Expecting icon path as string
  title: string
  total: number
  issuedCount?: number // Renamed from dailyNew/baseCount
  revokedCount?: number // Added prop for revoked count
}

defineProps<RuleCardProps>()
</script>

<style scoped>
/* Ensure consistent minimum height for cards */
.bg-white {
  min-height: 160px; /* Adjusted min-height slightly */
}
</style>
