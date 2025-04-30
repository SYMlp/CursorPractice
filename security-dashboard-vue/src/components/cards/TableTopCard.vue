<template>
  <div :class="[`bg-white rounded-lg shadow flex flex-col h-full`, className]">
    <!-- Header -->
    <div class="border-b border-gray-200 px-4 py-2 flex justify-between items-center flex-none">
      <div class="text-sm font-medium flex items-center">
        <span>{{ title }}</span>
        <span class="text-xs text-gray-500 ml-2">总计{{ data.length }}个</span>
      </div>
      <button
        class="text-xs text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded transition-colors"
        @click.prevent="handleMoreClick"
      >
        更多
      </button>
    </div>

    <!-- Body -->
    <div class="overflow-hidden flex-grow flex flex-col">
      <!-- Table Header (using divs) -->
      <div
        class="px-4 py-2 border-b border-gray-100 flex text-xs font-medium text-gray-500 flex-none"
      >
        <div v-if="showRankNumber" class="w-8">#</div>
        <div
          v-for="(column, index) in columns"
          :key="index"
          :class="['flex-1', getColumnAlignmentClass(column.align)]"
          :style="getColumnStyle(column)"
        >
          {{ column.title }}
        </div>
      </div>

      <!-- Table Content (using divs) -->
      <div class="px-2 overflow-auto flex-grow">
        <div
          v-for="(item, index) in displayedData"
          :key="item.id"
          class="py-1.5 px-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer flex items-center"
          @click="handleItemClick(item)"
        >
          <!-- Rank Number -->
          <div v-if="showRankNumber" class="w-8 mr-2">
            <span
              :class="[
                'w-5 h-5 rounded-full text-xs flex items-center justify-center',
                index < 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600',
              ]"
            >
              {{ index + 1 }}
            </span>
          </div>

          <!-- Row Content -->
          <div class="flex-1 flex">
            <div
              v-for="(column, colIndex) in columns"
              :key="colIndex"
              :class="['flex-1', getColumnAlignmentClass(column.align)]"
            >
              <div class="flex flex-col">
                <div class="text-sm">
                  <!-- Custom Render Logic -->
                  <component v-if="column.render" :is="column.render(item[column.key], item)" />
                  <span v-else>{{ item[column.key] }}</span>
                </div>

                <!-- Progress Bar -->
                <div v-if="showProgressBar && column.key === progressBarField" class="mt-1">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-blue-500 h-2 rounded-full"
                      :style="{ width: getProgressBarWidth(item[progressBarField]) }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for all data -->
    <Teleport to="body">
      <div
        v-if="showAllData"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="handleCloseModal"
      >
        <div class="bg-white rounded-lg shadow-xl p-6 w-4/5 max-w-4xl max-h-[80vh] flex flex-col">
          <!-- Modal Header -->
          <div class="flex justify-between items-center mb-4 flex-none">
            <h3 class="text-lg font-semibold">{{ title }}（共计{{ data.length }}个）</h3>
            <button @click="handleCloseModal" class="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Modal Content (actual table) -->
          <div class="overflow-y-auto flex-grow">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    v-if="showRankNumber"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    v-for="(column, index) in columns"
                    :key="index"
                    :class="[
                      'px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider',
                      getColumnAlignmentClass(column.align),
                    ]"
                    :style="getColumnStyle(column)"
                  >
                    {{ column.title }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(item, index) in data"
                  :key="item.id"
                  class="hover:bg-gray-50 cursor-pointer"
                  @click="onModalRowClick(item)"
                >
                  <td
                    v-if="showRankNumber"
                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500"
                  >
                    {{ index + 1 }}
                  </td>
                  <td
                    v-for="(column, colIndex) in columns"
                    :key="colIndex"
                    :class="[
                      'px-4 py-3 whitespace-nowrap text-sm',
                      getColumnAlignmentClass(column.align),
                    ]"
                  >
                    <!-- Custom Render Logic in Modal -->
                    <component v-if="column.render" :is="column.render(item[column.key], item)" />
                    <span v-else>{{ item[column.key] }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { RankingItem } from '@/types/ranking'
import { computed, ref, type FunctionalComponent, type VNode } from 'vue'

// Assume RankingItem has at least 'id' and the keys defined in columns/progressBarField
// It's better to define this type more concretely if possible.
/*
interface RankingItem {
  id: string | number
  [key: string]: any // Allow other properties
}
*/

// Type for the render function expected in ColumnConfig
// It should return a VNode or a component definition
type ColumnRenderFunc = (
  value: unknown,
  record: RankingItem,
) => VNode | FunctionalComponent | object

interface ColumnConfig {
  key: string
  title: string
  align?: 'left' | 'right' | 'center'
  render?: ColumnRenderFunc
  width?: number | string
}

interface TableTopCardProps {
  title: string
  data: RankingItem[]
  columns: ColumnConfig[]
  showRankNumber?: boolean
  showProgressBar?: boolean
  progressBarField?: string
  maxItems?: number
  className?: string
}

// Define Props with defaults
const props = withDefaults(defineProps<TableTopCardProps>(), {
  showRankNumber: true,
  showProgressBar: true,
  progressBarField: 'value',
  maxItems: 5,
  className: '',
})

// Define Emits
const emit = defineEmits<{
  (e: 'itemClick', item: RankingItem): void
  (e: 'moreClick'): void // If parent wants to handle 'more' differently
}>()

// --- State ---
const showAllData = ref<boolean>(false)

// --- Computed Properties ---
const displayedData = computed(() => {
  // In the main view, only show maxItems unless modal is explicitly requested by parent
  // The React version seemed to show all data in modal regardless of maxItems
  return props.data.slice(0, props.maxItems)
})

const maxValue = computed(() => {
  if (!props.showProgressBar || !props.progressBarField || props.data.length === 0) {
    return 0
  }
  return Math.max(
    ...props.data.map((item) => {
      const value = item[props.progressBarField!]
      // Improved parsing logic
      if (typeof value === 'number') return value
      if (typeof value === 'string') {
        const parsed = parseFloat(value.replace(/,/g, ''))
        return isNaN(parsed) ? 0 : parsed
      }
      return 0
    }),
  )
})

// --- Methods ---
const handleMoreClick = () => {
  // Emit an event first, let parent decide if they want to override
  emit('moreClick')
  // Default behavior: show the modal
  showAllData.value = true
}

const handleCloseModal = () => {
  showAllData.value = false
}

const handleItemClick = (item: RankingItem) => {
  emit('itemClick', item)
}

const getColumnAlignmentClass = (align?: 'left' | 'right' | 'center'): string => {
  switch (align) {
    case 'right':
      return 'text-right'
    case 'center':
      return 'text-center'
    default:
      return 'text-left'
  }
}

const getColumnStyle = (column: ColumnConfig): Record<string, string | number> => {
  const style: Record<string, string | number> = {}
  if (column.width) {
    style.width = typeof column.width === 'number' ? `${column.width}px` : column.width
    // Add flex properties if using flex layout for columns
    style.flex = 'none'
  }
  return style
}

const getProgressBarWidth = (value: string | number | undefined): string => {
  if (value === undefined || value === null || maxValue.value <= 0) {
    return '0%'
  }
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value
  if (isNaN(numValue)) return '0%'

  const percentage = Math.max(0, Math.min(100, (numValue / maxValue.value) * 100))
  return `${percentage}%`
}

// New method to handle combined actions on modal row click
const onModalRowClick = (item: RankingItem) => {
  handleItemClick(item) // First call the item click handler
  handleCloseModal() // Then close the modal
}
</script>

<style scoped>
/* Add any component-specific styles here */
/* Ensure modal styles work correctly */
.max-h-\[80vh\] {
  max-height: 80vh;
}
/* Sticky header for modal table */
thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
