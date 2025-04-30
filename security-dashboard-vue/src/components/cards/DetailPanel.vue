<template>
  <div :class="[`bg-white rounded-lg shadow p-4`, className]">
    <h3 class="text-sm font-medium border-b border-gray-200 pb-2 mb-2">{{ title }}</h3>
    <div class="space-y-2">
      <div v-for="(item, index) in items" :key="index" class="flex justify-between text-sm">
        <span class="text-gray-600">{{ item.label }}：</span>
        <!-- Use slot or dynamic component for potentially complex value rendering -->
        <span class="font-medium">
          <component
            v-if="isVNode(item.value) || typeof item.value === 'object'"
            :is="item.value"
          />
          <template v-else>{{ item.value }}</template>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isVNode, type VNode } from 'vue'

interface DetailItem {
  label: string
  // Allow string, number, VNode or a component definition for value
  value: string | number | VNode | object | null | undefined
}

interface DetailPanelProps {
  title: string
  items: DetailItem[]
  className?: string
}

withDefaults(defineProps<DetailPanelProps>(), {
  className: '',
})
</script>

<style scoped>
/* Add specific styles if needed */
.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
</style>
