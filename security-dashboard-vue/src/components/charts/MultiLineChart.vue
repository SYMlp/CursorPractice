<template>
  <div :class="['bg-white rounded-lg shadow overflow-hidden', className]">
    <div class="p-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-700">{{ title }}</h3>
        <div class="flex space-x-2">
          <button
            @click="setTimeRange('day')"
            :class="[
              'px-3 py-1 text-sm rounded transition-colors',
              timeRange === 'day'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            一天
          </button>
          <button
            @click="setTimeRange('week')"
            :class="[
              'px-3 py-1 text-sm rounded transition-colors',
              timeRange === 'week'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            一周
          </button>
        </div>
      </div>
    </div>
    <v-chart
      class="chart"
      :option="chartOption"
      :autoresize="true"
      style="height: 250px; width: 100%"
    />
  </div>
</template>

<script setup lang="ts">
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { computed, defineProps, ref, withDefaults } from 'vue' // Corrected import
import VChart from 'vue-echarts'

// 按需引入 ECharts 组件
use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

// --- 类型定义 (从 React 迁移) ---
interface LineData {
  name: string
  data: (number | null)[] // Allow null for potentially missing data points
  color?: string
  areaStyle?: boolean
}

type TimeRangeType = 'day' | 'week'

interface TimeData {
  day: { xAxis: string[] }
  week: { xAxis: string[] }
}

interface SeriesData {
  day: { series: LineData[] }
  week: { series: LineData[] }
}

// --- Props 定义 ---
const props = withDefaults(
  defineProps<{
    title: string
    timeData: TimeData
    series: SeriesData
    showLegend?: boolean
    className?: string
  }>(),
  {
    showLegend: true,
    className: '',
  },
)

// --- 状态管理 ---
const timeRange = ref<TimeRangeType>('day')

// --- 方法 ---
const setTimeRange = (range: TimeRangeType) => {
  timeRange.value = range
}

// --- 计算属性 (ECharts Option) ---
const chartOption = computed(() => {
  // 检查 timeData 和 series 是否有效，以及所选 timeRange 是否存在
  const currentXAxis = props.timeData?.[timeRange.value]?.xAxis
  const currentSeriesData = props.series?.[timeRange.value]?.series

  if (!currentXAxis || !currentSeriesData) {
    console.warn(`Data for time range '${timeRange.value}' not found.`)
    // 返回一个空的或默认的配置，避免 ECharts 报错
    return {
      title: { text: '数据加载中或无数据...' },
      xAxis: { type: 'category', data: [] },
      yAxis: { type: 'value' },
      series: [],
    }
  }

  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e5e7eb',
      textStyle: {
        color: '#334155',
      },
    },
    legend: {
      show: props.showLegend,
      bottom: 0,
      textStyle: {
        color: '#6b7280',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: props.showLegend ? '10%' : '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: currentXAxis,
      axisLine: {
        lineStyle: {
          color: '#e5e7eb',
        },
      },
      axisLabel: {
        color: '#6b7280',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#6b7280',
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb',
        },
      },
    },
    series: currentSeriesData.map((s: LineData) => ({
      name: s.name,
      type: 'line',
      data: s.data,
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        color: s.color,
      },
      lineStyle: {
        width: 2,
        color: s.color,
      },
      // areaStyle 的逻辑迁移
      areaStyle: s.areaStyle
        ? {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  // 简化颜色处理，假设 s.color 总是存在且格式正确
                  // 添加了对 undefined color 的处理，以防万一
                  color: s.color
                    ? s.color.replace(')', ', 0.3)').replace('rgb', 'rgba')
                    : 'rgba(59, 130, 246, 0.3)',
                },
                {
                  offset: 1,
                  color: s.color
                    ? s.color.replace(')', ', 0.05)').replace('rgb', 'rgba')
                    : 'rgba(59, 130, 246, 0.05)',
                },
              ],
            },
          }
        : undefined,
    })),
  }
})
</script>

<style scoped>
/* 如果需要，可以在这里添加特定于此组件的样式 */
/* .chart { ... } */
</style>
