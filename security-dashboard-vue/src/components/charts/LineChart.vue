<template>
  <v-chart v-if="chartOption" :option="chartOption" :style="chartStyle" autoresize />
</template>

<script setup lang="ts">
import {
  LineChart as EChartsLineChart, // Rename to avoid conflict with component name
} from 'echarts/charts'
import {
  DataZoomComponent, // Added for potential future use
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from 'vue'
import VChart from 'vue-echarts'

// Register necessary ECharts components
use([
  CanvasRenderer,
  EChartsLineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
])

// --- Type Definitions ---
// Export the series item type
export interface LineChartSeries {
  name: string
  data: (number | null | undefined)[]
  color?: string
  areaStyle?: boolean // Define areaStyle as boolean
  type?: 'line' // Explicitly type as line
  smooth?: boolean
  itemStyle?: { color?: string }
  // Add other relevant ECharts line series properties used internally or externally
}

// --- Props Definition ---
interface LineChartProps {
  title?: string // Make title optional
  xAxisData: string[]
  series: LineChartSeries[]
  showLegend?: boolean
  height?: number | string
  legendPosition?: 'top' | 'bottom'
  yAxisFormatter?: (value: number) => string // Optional custom Y-axis formatter
  gridTop?: string | number
  gridBottom?: string | number
  gridLeft?: string | number
  gridRight?: string | number
  smooth?: boolean
}

const props = withDefaults(defineProps<LineChartProps>(), {
  showLegend: false,
  height: 250,
  legendPosition: 'bottom',
  smooth: true,
  gridLeft: '3%',
  gridRight: '4%',
  // Default top/bottom adjusted dynamically later
})

// --- Color Palette ---
const colorPalette = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']

// --- Computed Properties ---

// Calculate dynamic grid values
const dynamicGrid = computed(() => {
  let top = props.gridTop
  let bottom = props.gridBottom

  if (top === undefined) {
    top = props.title || (props.showLegend && props.legendPosition === 'top') ? '12%' : '8%'
  }
  if (bottom === undefined) {
    bottom = props.showLegend && props.legendPosition === 'bottom' ? '12%' : '8%'
  }
  return { top, bottom }
})

// Default Y-axis formatter
const defaultYAxisFormatter = (value: number): string => {
  if (value >= 10000) return value / 10000 + 'w'
  if (value >= 1000) return value / 1000 + 'k'
  return value.toString()
}

// ECharts Option Configuration
const chartOption = computed(() => ({
  title: {
    show: !!props.title,
    text: props.title,
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#334155',
    },
    padding: 5, // Reduced padding
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.98)', // Slightly more opaque
    borderColor: '#e5e7eb',
    borderWidth: 1,
    textStyle: {
      color: '#334155',
      fontSize: 12,
    },
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.1)', // Lighter pointer
        width: 1,
        type: 'dashed',
      },
    },
    // Optional: Custom formatter if needed
    // formatter: (params) => { ... }
  },
  legend: {
    show: props.showLegend,
    [props.legendPosition]: props.legendPosition === 'bottom' ? 0 : 5,
    top: props.legendPosition === 'top' ? (props.title ? 25 : 5) : undefined,
    bottom: props.legendPosition === 'bottom' ? 0 : undefined,
    textStyle: {
      color: '#6b7280',
      fontSize: 10,
    },
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    padding: [0, 10], // Add horizontal padding
  },
  grid: {
    left: props.gridLeft,
    right: props.gridRight,
    top: dynamicGrid.value.top,
    bottom: dynamicGrid.value.bottom,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.xAxisData,
    axisLine: {
      lineStyle: {
        color: '#e5e7eb',
      },
    },
    axisLabel: {
      color: '#6b7280',
      fontSize: 9,
      margin: 8,
      hideOverlap: true, // Hide labels if they overlap
      // rotate: xAxisData.length > 10 ? 30 : 0 // Example: rotate if too many labels
    },
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisLabel: {
      color: '#6b7280',
      fontSize: 9,
      margin: 6,
      formatter: props.yAxisFormatter || defaultYAxisFormatter,
    },
    splitLine: {
      lineStyle: {
        color: ['#f3f4f6'], // Lighter split line
      },
    },
  },
  series: props.series.map((s, index) => ({
    name: s.name,
    type: 'line' as const, // Ensure type is literal 'line'
    data: s.data,
    smooth: s.smooth ?? props.smooth, // Allow series-specific smooth override
    symbol: 'circle',
    symbolSize: 4,
    showSymbol: false,
    emphasis: {
      focus: 'series' as const,
      scale: 1.5,
    },
    itemStyle: {
      color: s.color || colorPalette[index % colorPalette.length],
    },
    lineStyle: {
      width: 2,
      color: s.color || colorPalette[index % colorPalette.length],
    },
    areaStyle: s.areaStyle
      ? {
          color: {
            type: 'linear' as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: `${s.color || colorPalette[index % colorPalette.length]}4D`, // Opacity
              },
              {
                offset: 1,
                color: `${s.color || colorPalette[index % colorPalette.length]}0D`, // Opacity
              },
            ],
          },
          origin: 'auto' as const,
        }
      : undefined,
  })),
}))

// Calculate chart style (height)
const chartStyle = computed(() => {
  const h = props.height
  return {
    height: typeof h === 'number' ? `${h}px` : h,
    width: '100%',
  }
})
</script>
