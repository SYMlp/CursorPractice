<template>
  <div :class="className">
    <!-- 可以在组件内部处理标题，或者让父组件处理 -->
    <!-- <h3 v-if="props.title" class="text-base font-medium text-gray-700 mb-2">{{ props.title }}</h3> -->
    <v-chart
      :option="chartOption"
      autoresize
      :style="{ height: '100%', width: '100%', minHeight: '200px' }"
    />
  </div>
</template>

<script setup lang="ts">
import {
  BarChart as EchartsBarChart, // 重命名以避免与组件名冲突
} from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import type { PropType } from 'vue'
import { computed } from 'vue'
import VChart from 'vue-echarts'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  EchartsBarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

// --- 类型定义 ---
interface BarItem {
  name: string
  value: number
  color?: string
}

interface SeriesItem {
  name: string
  data: number[]
  color?: string
  // ECharts series item 支持更多配置，可以按需添加
}

interface CategoryBarChartData {
  categories: string[]
  series: SeriesItem[]
}

// 类型守卫，判断 data 是 BarItem[] 还是 CategoryBarChartData
const isBarItemArray = (data: BarItem[] | CategoryBarChartData): data is BarItem[] => {
  return Array.isArray(data) && (data.length === 0 || (data.length > 0 && 'name' in data[0]))
}

// --- Props 定义 ---
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Object as PropType<BarItem[] | CategoryBarChartData>,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
  showLegend: {
    type: Boolean,
    default: false,
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
})

// --- 导入 ECharts 类型 ---
import type {
  // 系列类型的 Option
  BarSeriesOption,
} from 'echarts/charts'
import type {
  GridComponentOption,
  LegendComponentOption,
  // 组件类型的 Option
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type {
  ComposeOption, // 用于组合类型
} from 'echarts/core'

// 通过 ComposeOption 把你需要用到的 Option 类型都组合起来
type ECOption = ComposeOption<
  | BarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | GridComponentOption
>
// --- END: 导入 ECharts 类型 ---

// --- 计算 ECharts Option ---
const chartOption = computed<ECOption>(() => {
  const { data, title, horizontal, showLegend, showLabel } = props
  let option: ECOption = {}

  if (isBarItemArray(data)) {
    // 简单柱状图配置
    option = {
      title: {
        text: title,
        left: 'center',
        show: !!title,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        show: showLegend,
        bottom: 0,
        data: data.map((item) => item.name), // 图例数据
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: showLegend ? '10%' : '3%', // 调整 bottom 以免图例遮挡
        top: title ? '15%' : '5%', // 调整 top 以免标题遮挡
        containLabel: true,
      },
      [horizontal ? 'yAxis' : 'xAxis']: {
        type: 'category',
        data: data.map((item) => item.name),
        axisLabel: { color: '#666', fontSize: 12 },
        axisLine: { lineStyle: { color: '#ddd' } },
      },
      [horizontal ? 'xAxis' : 'yAxis']: {
        type: 'value',
        axisLabel: { color: '#666', fontSize: 12 },
        splitLine: { lineStyle: { color: '#eee' } },
      },
      series: [
        {
          // name: title, // 单系列时 name 通常不需要，除非图例需要
          type: 'bar',
          data: data.map((item) => ({
            value: item.value,
            itemStyle: {
              color: item.color || '#3B82F6', // 默认颜色
            },
          })),
          barWidth: horizontal ? undefined : '60%', // 调整宽度设置
          label: {
            show: showLabel,
            position: horizontal ? 'right' : 'top',
            fontSize: 12,
            color: '#666',
          },
        },
      ],
    }
  } else if (data && data.categories && data.series) {
    // 分类/分组柱状图配置
    option = {
      title: {
        text: title,
        left: 'center',
        show: !!title,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        show: showLegend,
        bottom: 0,
        data: data.series.map((item) => item.name),
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: showLegend ? '10%' : '3%',
        top: title ? '15%' : '5%',
        containLabel: true,
      },
      [horizontal ? 'yAxis' : 'xAxis']: {
        type: 'category',
        data: data.categories,
        axisLabel: { color: '#666', fontSize: 12 },
        axisLine: { lineStyle: { color: '#ddd' } },
      },
      [horizontal ? 'xAxis' : 'yAxis']: {
        type: 'value',
        axisLabel: { color: '#666', fontSize: 12 },
        splitLine: { lineStyle: { color: '#eee' } },
      },
      series: data.series.map((serie) => ({
        name: serie.name,
        type: 'bar',
        // stack: 'total', // 如果需要堆叠，取消注释
        data: serie.data.map((value) => ({
          value,
          itemStyle: {
            color: serie.color, // 使用系列指定的颜色，若无则 ECharts 会自动分配
          },
        })),
        barWidth: horizontal ? undefined : '40%', // 分组时通常窄一些
        label: {
          show: showLabel,
          position: horizontal ? 'right' : 'top',
          fontSize: 12,
          color: '#666',
        },
      })),
    }
  }

  // 可以添加更多通用配置，例如响应式调整等
  return option
})

// 如果需要提供主题切换等，可以在这里注入
// import { provide } from 'vue';
// provide(THEME_KEY, 'dark');
</script>

<style scoped>
/* 可以添加一些 scoped 样式 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>
