<template>
  <div
    :class="[
      'px-3 py-2 rounded-lg border-2 shadow-md hover:shadow-lg transition-shadow',
      nodeStyle,
    ]"
  >
    <div class="flex items-center text-sm font-medium">
      <!-- Slot for icon or render dynamically -->
      <component :is="iconComponent" v-if="iconComponent" class="w-4 h-4 mr-1" />
      <span>{{ data.label }}</span>
    </div>
    <div v-if="data.details" class="text-xs mt-1 text-gray-600">
      {{ data.details }}
    </div>
    <!-- Vue Flow requires Handle component for connections -->
    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { PropType } from 'vue'
import { computed } from 'vue'

// --- Icons (Example using simple components or SVGs directly) ---
const ApplicationIcon = {
  template: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 9h16" stroke="currentColor" strokeWidth="2"/>
  </svg>`,
}
const UserIcon = {
  template: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2"/>
  </svg>`,
}
const AlertIcon = {
  template: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>`,
}

// --- Props ---
// Vue Flow passes node data via `data` prop, and other info like id, type
const props = defineProps({
  data: {
    type: Object as PropType<{ label: string; type?: string; details?: string }>, // Adjust based on actual data structure
    required: true,
  },
  // You can add other props passed by Vue Flow if needed (id, type, selected, etc.)
  // id: String,
  // type: String
})

// --- Computed Styles and Icons ---
const nodeStyle = computed(() => {
  switch (props.data?.type) {
    case 'application':
      return 'bg-blue-50 border-blue-500 text-blue-700'
    case 'user':
      return 'bg-green-50 border-green-500 text-green-700'
    case 'alert':
      return 'bg-red-50 border-red-500 text-red-700'
    default:
      return 'bg-gray-50 border-gray-500 text-gray-700'
  }
})

const iconComponent = computed(() => {
  switch (props.data?.type) {
    case 'application':
      return ApplicationIcon
    case 'user':
      return UserIcon
    case 'alert':
      return AlertIcon
    default:
      return null
  }
})
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
