<template>
  <div
    :class="[
      'bg-white rounded-lg shadow p-2 flex',
      layout === 'horizontal' ? 'items-center justify-between' : 'flex-col items-center',
    ]"
  >
    <!-- Text Area -->
    <div :class="[layout === 'horizontal' ? 'mr-2 text-left' : 'mb-1 text-center']">
      <div :class="['font-medium text-gray-700', size === 'small' ? 'text-xs' : 'text-sm']">
        {{ title }}
      </div>
      <!-- Description (optional) -->
      <!-- <div
        v-if="description"
        :class="[
          'text-gray-500',
          size === 'small' ? 'text-xxs' : 'text-xs'
        ]"
      >
        {{ description }}
      </div> -->
    </div>

    <!-- Chart Area -->
    <div class="relative" :style="chartStyle">
      <v-chart
        v-if="option"
        :option="option"
        autoresize
        :style="{ height: '100%', width: '100%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GaugeChart } from 'echarts/charts'
import { LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from 'vue'
import VChart from 'vue-echarts'

// Register necessary ECharts components
use([CanvasRenderer, GaugeChart, TitleComponent, TooltipComponent, LegendComponent])

interface CircularProgressProps {
  percentage: number
  title: string
  color?: string
  description?: string // Not used currently
  layout?: 'horizontal' | 'vertical'
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<CircularProgressProps>(), {
  color: '#3b82f6',
  layout: 'vertical',
  size: 'medium',
})

// Generate gradient color
const getGradientColor = (baseColor: string) => {
  return {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: baseColor }, // Lighter color can be adjusted if needed
      { offset: 1, color: baseColor },
    ],
  }
}

// Determine chart dimensions based on size
const chartStyle = computed(() => {
  switch (props.size) {
    case 'small':
      return { width: '50px', height: '50px', minWidth: '50px' } // Adjusted size slightly
    case 'large':
      return { width: '90px', height: '90px', minWidth: '90px' }
    case 'medium':
    default:
      return { width: '70px', height: '70px', minWidth: '70px' }
  }
})

// Calculate font size based on chart size
const detailFontSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 12
    case 'large':
      return 18
    case 'medium':
    default:
      return 14
  }
})

// Compute ECharts option
const option = computed(() => ({
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      radius: '95%', // Slightly larger radius for tighter look
      center: ['50%', '50%'],
      pointer: { show: false },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          color: getGradientColor(props.color),
        },
        width: props.size === 'small' ? 6 : props.size === 'large' ? 10 : 8, // Adjust thickness based on size
      },
      axisLine: {
        lineStyle: {
          width: props.size === 'small' ? 6 : props.size === 'large' ? 10 : 8, // Match progress width
          color: [[1, '#e6ebf8']],
        },
      },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      data: [
        {
          value: props.percentage,
          // name: `${props.percentage}%`, // Use detail formatter instead of name
          title: { show: false }, // Hide the default title
          detail: {
            valueAnimation: true,
            offsetCenter: [0, 0],
            fontSize: detailFontSize.value,
            fontWeight: 'bold',
            formatter: '{value}%',
            color: props.color,
          },
        },
      ],
      title: { show: false }, // Hide series title
      detail: {
        show: true, // Ensure detail (percentage text) is shown
        // Settings moved inside data.detail for better control
      },
    },
  ],
}))
</script>

<style scoped>
/* Add any component-specific styles here if needed */
/* Example for very small text if needed */
/* .text-xxs { font-size: 0.625rem; line-height: 0.875rem; } */
</style>
