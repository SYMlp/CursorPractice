<template>
  <div
    ref="containerRef"
    :class="[
      'bg-white rounded-lg shadow p-4 flex flex-col',
      props.className,
      { 'overflow-hidden': props.fitContainer },
    ]"
    :style="fitContainerStyle"
  >
    <!-- Header -->
    <div v-if="showHeader" class="flex justify-between items-center mb-3">
      <h3 class="text-base font-medium text-gray-700">{{ title }}</h3>
      <!-- Optional: More link/button placeholder -->
      <button
        v-if="(data.length > maxItems && chartType === 'progress-bar') || chartType === 'table'"
        @click="handleMoreClick"
        class="text-xs text-blue-600 hover:text-blue-800"
      >
        查看全部
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex-grow flex items-center justify-center">
      <div
        class="animate-spin h-6 w-6 border-4 border-blue-500 rounded-full border-t-transparent"
      ></div>
    </div>

    <!-- Content Area -->
    <div v-else class="flex-grow" :style="contentAreaStyle">
      <!-- Chart Types -->
      <template v-if="chartType === 'bar'">
        <BarChart :data="chartDisplayData" :show-legend="false" class="h-full w-full" />
      </template>
      <template v-else-if="chartType === 'horizontal-bar'">
        <BarChart
          :data="chartDisplayData"
          :show-legend="false"
          :horizontal="true"
          class="h-full w-full"
        />
      </template>
      <template v-else-if="chartType === 'donut'">
        <DonutChart
          :data="chartDisplayData"
          :show-legend="false"
          :inner-radius="0.5"
          :outer-radius="0.8"
          class="h-full w-full"
        />
      </template>
      <template v-else-if="chartType === 'pie'">
        <!-- TODO: Migrate PieChart component -->
        <div class="flex items-center justify-center h-full text-gray-400">占位符: PieChart</div>
      </template>

      <!-- List / Progress Bar Type -->
      <template v-else>
        <ul class="space-y-2 overflow-y-auto h-full">
          <li
            v-for="(item, index) in displayData"
            :key="item.id || index"
            :class="[
              'flex items-center text-sm',
              { 'cursor-pointer hover:bg-gray-50 p-1 rounded': !!onClick },
            ]"
            @click="handleItemClick(item)"
          >
            <span v-if="showRank" class="w-6 text-center text-gray-500 mr-2">{{ index + 1 }}</span>
            <span class="flex-1 truncate mr-2 text-gray-800">{{ item[nameKey] || item.name }}</span>
            <div v-if="showProgress && chartType === 'progress-bar'" class="w-1/4 mx-2">
              <div class="bg-gray-200 rounded-full h-1.5">
                <div
                  class="bg-blue-500 h-1.5 rounded-full"
                  :style="{ width: `${(item.value / (maxValue || 1)) * 100}%` }"
                ></div>
              </div>
            </div>
            <span class="w-16 text-right text-gray-600 font-medium">{{
              valueFormatter(item[valueKey] || item.value)
            }}</span>
            <!-- Optional: Secondary value or trend icon -->
          </li>
        </ul>
      </template>
    </div>

    <!-- Modal for full data (Simplified) -->
    <div
      v-if="showAllData"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl p-4 w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div class="flex justify-between items-center mb-3 border-b pb-2">
          <h3 class="text-lg font-semibold">{{ title }} ({{ data.length }})</h3>
          <button @click="handleCloseModal" class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div class="overflow-y-auto flex-grow">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 sticky top-0">
              <tr>
                <th
                  v-if="showRank"
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  排名
                </th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  名称
                </th>
                <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                  {{ valueLabel }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, index) in data" :key="item.id || index">
                <td v-if="showRank" class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ index + 1 }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item[nameKey] || item.name }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                  {{ valueFormatter(item[valueKey] || item.value) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import BarChart from './BarChart.vue'
import DonutChart from './DonutChart.vue'
// import PieChart from './PieChart.vue'; // TODO: Import when migrated

// --- Types --- (Copied from React component)
export interface RankingItem {
  id: string | number // Allow number for id
  name: string
  value: number
  percent?: number
  color?: string
  secondaryValue?: string | number
  secondaryLabel?: string
  trend?: 'up' | 'down' | 'stable'
  risk?: 'high' | 'medium' | 'low'
  [key: string]: any // Allow dynamic keys via valueKey/nameKey
}

export type ChartType = 'bar' | 'horizontal-bar' | 'pie' | 'donut' | 'table' | 'progress-bar'

// --- Props --- (Adapted from React component)
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array as PropType<RankingItem[]>,
    required: true,
  },
  // total: Number, // Not used in current implementation
  chartType: {
    type: String as PropType<ChartType>,
    default: 'progress-bar',
  },
  maxItems: {
    type: Number,
    default: 5,
  },
  valueLabel: {
    type: String,
    default: '值',
  },
  valueFormatter: {
    type: Function as PropType<(value: number) => string>,
    default: (value: number) => value.toLocaleString(),
  },
  height: {
    type: [Number, String] as PropType<number | string>,
    default: 'auto', // Default to auto height
  },
  // onClick is handled by emit
  // moreLink: String, // TODO: Implement if needed
  loading: {
    type: Boolean,
    default: false,
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  nameKey: {
    type: String,
    default: 'name',
  },
  className: {
    type: String,
    default: '',
  },
  showRank: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
  fitContainer: {
    // TODO: Fully implement ResizeObserver logic if needed
    type: Boolean,
    default: false,
  },
})

// --- Emits ---
defineEmits<{
  (e: 'click', item: RankingItem): void
}>()

// --- Refs ---
const containerRef = ref<HTMLDivElement | null>(null)

// --- State ---
const showAllData = ref(false)
// const containerHeight = ref<number | undefined>(undefined); // For fitContainer

// --- Computed Properties ---
const displayData = computed(() => {
  // Sort data descending by value before slicing
  return [...props.data]
    .sort((a, b) => (b[props.valueKey] || b.value) - (a[props.valueKey] || a.value))
    .slice(0, props.maxItems)
})

const maxValue = computed(() => {
  if (displayData.value.length === 0) return 0
  return Math.max(...displayData.value.map((item) => item[props.valueKey] || item.value))
})

// Data formatted for chart components (simple name/value)
const chartDisplayData = computed(() => {
  return displayData.value.map((item) => ({
    name: item[props.nameKey] || item.name,
    value: item[props.valueKey] || item.value,
    itemStyle: item.color ? { color: item.color } : undefined,
  }))
})

const fitContainerStyle = computed(() => {
  return props.fitContainer
    ? { height: '100%', overflow: 'hidden' }
    : {
        height:
          props.height === 'auto'
            ? undefined
            : typeof props.height === 'number'
              ? `${props.height}px`
              : props.height,
      }
})

const contentAreaStyle = computed(() => {
  // If fitContainer, let flex-grow handle height;
  // otherwise, calculate based on header
  if (props.fitContainer) return {}
  const headerHeight = props.showHeader ? 40 : 0 // Estimate header height
  const totalHeight =
    typeof props.height === 'number'
      ? props.height
      : props.height === 'auto'
        ? undefined
        : parseInt(props.height)
  const contentHeight = totalHeight ? totalHeight - headerHeight : undefined
  return contentHeight ? { height: `${contentHeight}px` } : {}
})

// --- Methods ---
const handleItemClick = (item: RankingItem) => {
  if (props.onClick) {
    console.warn('`onClick` prop is deprecated. Use `@click` event instead.')
    // For backward compatibility, call the prop if exists
    props.onClick(item)
  } else {
    emit('click', item)
  }
}

const handleMoreClick = () => {
  showAllData.value = true
}

const handleCloseModal = () => {
  showAllData.value = false
}

// --- Lifecycle Hooks & Watchers --- (ResizeObserver logic omitted for simplicity)
/*
let resizeObserver: ResizeObserver | null = null;

const updateContainerHeight = () => {
  if (!containerRef.value) return;
  // Simplified height calculation
  // const headerHeight = props.showHeader ? containerRef.value.querySelector('.header-class')?.clientHeight ?? 40 : 0;
  // containerHeight.value = containerRef.value.clientHeight - headerHeight;
};

onMounted(() => {
  if (props.fitContainer && containerRef.value) {
    updateContainerHeight();
    resizeObserver = new ResizeObserver(updateContainerHeight);
    resizeObserver.observe(containerRef.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

watch(() => props.fitContainer, (newVal) => {
  if (newVal && containerRef.value && !resizeObserver) {
     updateContainerHeight();
     resizeObserver = new ResizeObserver(updateContainerHeight);
     resizeObserver.observe(containerRef.value);
  } else if (!newVal && resizeObserver) {
     resizeObserver.disconnect();
     resizeObserver = null;
     // containerHeight.value = undefined; // Reset height?
  }
});
*/
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
