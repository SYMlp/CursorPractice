<template>
  <div :class="className" :style="getHeightStyle()">
    <v-chart
      :option="chartOption"
      autoresize
      :style="{ height: '100%', width: '100%' }"
      @click="handleClick"
    />
    <!-- 如果需要在环心显示文字，可以用绝对定位实现 -->
    <div v-if="props.centerText" class="donut-center-text">
      <slot name="centerText">
        {{ props.centerText }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PieChart as EchartsPieChart, // 重命名
} from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import type { CallbackDataParams, ECElementEvent } from 'echarts/types/dist/shared' // Import ECharts types
import type { PropType, VNode } from 'vue'
import { computed } from 'vue'
import VChart from 'vue-echarts'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  EchartsPieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent, // 虽然是饼图，但 grid 可能影响布局
])

// --- 类型定义 ---
interface DonutDataItem {
  name: string
  value: number
  itemStyle?: {
    color: string
  }
  tooltip?: {
    formatter: string // ECharts tooltip formatter 更灵活，这里仅作示意
  }
  // description?: string; // Vue 中可以通过 slot 或其他方式传递描述
}

// --- Props 定义 ---
const props = defineProps({
  data: {
    type: Array as PropType<DonutDataItem[]>,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  centerText: {
    type: [String, Object] as PropType<string | VNode>,
    default: '',
  },
  showLegend: {
    type: Boolean,
    default: true,
  },
  className: {
    type: String,
    default: '',
  },
  height: {
    type: [Number, String] as PropType<number | string>,
    default: 250,
  },
  innerRadius: {
    type: Number,
    default: 0.35, // 内半径比例 (0-1)
  },
  outerRadius: {
    type: Number,
    default: 0.8, // 外半径比例 (0-1)
  },
  labelPosition: {
    type: String as PropType<'inside' | 'outside' | 'none'>,
    default: 'outside',
  },
  legendPosition: {
    type: String as PropType<'top' | 'bottom' | 'right' | 'left'>,
    default: 'bottom',
  },
  showValues: {
    type: Boolean,
    default: true,
  },
  valueFormat: {
    type: Function as PropType<(value: number, percent: number, name: string) => string>,
    default: (value: number, percent: number, name: string) => `${name}: ${percent.toFixed(1)}%`,
  },
  animation: {
    type: Boolean,
    default: true,
  },
  padAngle: {
    type: Number,
    default: 0, // 默认无间隙
  },
  cornerRadius: {
    type: Number,
    default: 0, // 默认无圆角
  },
  roseType: {
    type: [String, Boolean] as PropType<'radius' | 'area' | false>,
    default: false, // 默认非南丁格尔图
  },
  borderWidth: {
    type: Number,
    default: 1,
  },
  borderColor: {
    type: String,
    default: '#fff',
  },
})

const emit = defineEmits(['click'])

// --- 内部计算和方法 ---

// 预定义颜色
const colorPalette = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
]

// 为数据项分配颜色
const coloredData = computed(() => {
  return props.data.map((item, index) => ({
    ...item,
    itemStyle: {
      ...item.itemStyle,
      color: item.itemStyle?.color || colorPalette[index % colorPalette.length],
    },
  }))
})

// 计算总和
const total = computed(() => {
  return coloredData.value.reduce((sum, item) => sum + item.value, 0)
})

// 图例位置
const getLegendPosition = () => {
  let orient: 'horizontal' | 'vertical'
  let position: { top?: string; left?: string; bottom?: string; right?: string } = {}
  switch (props.legendPosition) {
    case 'top':
      orient = 'horizontal'
      position = { top: '5%', left: 'center' }
      break
    case 'bottom':
      orient = 'horizontal'
      position = { bottom: '5%', left: 'center' }
      break
    case 'left':
      orient = 'vertical'
      position = { left: '5%', top: 'center' }
      break
    case 'right':
    default:
      orient = 'vertical'
      position = { right: '5%', top: 'center' }
      break
  }
  return { orient, ...position }
}

// 图表中心位置 (需要考虑图例占据的空间)
const getChartCenter = () => {
  switch (props.legendPosition) {
    case 'left':
      return ['60%', '50%']
    case 'right':
      return ['40%', '50%']
    case 'top':
      return ['50%', '55%'] // 标题和图例在上方，中心下移
    case 'bottom':
      return ['50%', '45%'] // 图例在下方，中心上移
    default:
      return ['50%', '50%']
  }
}

// 标签配置
const getLabelConfig = () => {
  if (props.labelPosition === 'none') {
    return { show: false }
  }
  return {
    show: true,
    position: props.labelPosition,
    formatter: (params: CallbackDataParams) => {
      const name = params.name ?? ''
      const value = params.value
      const percent = params.percent
      if (props.showValues && typeof value === 'number' && typeof percent === 'number') {
        return props.valueFormat(value, percent, name)
      }
      return name
    },
    fontSize: 12,
    color: props.labelPosition === 'outside' ? '#666' : '#fff',
    lineHeight: 18,
  }
}

// 高度样式
const getHeightStyle = () => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
})

// 点击事件处理
const handleClick = (params: ECElementEvent) => {
  emit('click', params)
}

// --- ECharts Option 计算 ---
const chartOption = computed(() => {
  return {
    title: props.title
      ? {
          text: props.title,
          left: 'center',
          top: '0',
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
            color: '#334155',
          },
        }
      : undefined,
    tooltip: {
      trigger: 'item',
      formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
        if (Array.isArray(params)) {
          if (params.length === 0) return ''
          const firstParam = params[0]
          const seriesName = firstParam.seriesName ?? ''
          const dataName = firstParam.name ?? ''
          const value = firstParam.value
          const percent = firstParam.percent
          const percentStr = typeof percent === 'number' ? `${percent.toFixed(0)}%` : ''
          const valueStr = typeof value === 'number' || typeof value === 'string' ? value : ''
          return `${seriesName}<br/>${dataName}: ${valueStr} (${percentStr})`
        } else {
          const seriesName = params.seriesName ?? ''
          const dataName = params.name ?? ''
          const value = params.value
          const percent = params.percent
          const percentStr = typeof percent === 'number' ? `${percent.toFixed(0)}%` : ''
          const valueStr = typeof value === 'number' || typeof value === 'string' ? value : ''
          return `${seriesName}<br/>${dataName}: ${valueStr} (${percentStr})`
        }
      },
    },
    legend: {
      show: props.showLegend,
      ...getLegendPosition(),
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle',
      formatter: (name: string) => {
        const dataItem = coloredData.value.find((item) => item.name === name)
        if (dataItem && total.value > 0) {
          const percent = ((dataItem.value / total.value) * 100).toFixed(1)
          return `${name} ${percent}%`
        }
        return name
      },
      textStyle: {
        fontSize: 12,
        color: '#666',
      },
      // ECharts 5 支持滚动图例
      type: 'scroll',
    },
    series: [
      {
        name: props.title || '数据分布',
        type: 'pie',
        radius: [`${props.innerRadius * 100}%`, `${props.outerRadius * 100}%`],
        center: getChartCenter(),
        roseType: props.roseType,
        avoidLabelOverlap: true, // 开启防止标签重叠
        itemStyle: {
          borderRadius: props.cornerRadius,
          borderColor: props.borderColor,
          borderWidth: props.borderWidth,
        },
        label: getLabelConfig(),
        emphasis: {
          scale: true,
          scaleSize: 5,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
          },
          label: {
            show: true, // 强调时显示标签
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: props.labelPosition === 'outside',
          length: 8,
          length2: 12,
          smooth: 0.5, // 平滑过渡
        },
        data: coloredData.value,
        padAngle: (props.padAngle * Math.PI) / 180, // ECharts 需要弧度
        animation: props.animation,
        animationDuration: props.animation ? 800 : 0,
        animationEasing: 'cubicInOut',
        animationDelay: (idx: number) => (props.animation ? idx * 50 : 0),
      },
    ],
  }
})
</script>

<style scoped>
.donut-center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none; /* 允许点击穿透到图表 */
}
/* 可以根据需要调整中心文本样式 */
</style>
