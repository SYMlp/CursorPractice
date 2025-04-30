<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <!-- 第一行：资源管理和资源类型 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      <!-- 资源管理 -->
      <ResourceCard
        v-if="resourceManagementData"
        :title="resourceManagementData.title"
        :icon="resourceIcon"
        :total="resourceManagementData.total"
        :metrics="metricsWithIcons"
        :growthItems="resourceManagementData.growthItems"
      />

      <!-- 资源类型 -->
      <div
        class="bg-white rounded-lg shadow p-4 col-span-1 lg:col-span-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 items-center"
      >
        <template v-for="(type, index) in resourceTypesData" :key="index">
          <CircularProgress
            :percentage="type.percentage"
            :title="resourceTypeLabels[index] || type.title"
            :color="type.color || '#3b82f6'"
            size="small"
            layout="vertical"
          />
        </template>
      </div>
    </div>

    <!-- 第二行：安全规则 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      <!-- 安全规则 -->
      <template v-for="(rule, index) in securityRulesData" :key="index">
        <RuleCard
          :title="rule.title"
          :icon="ruleIcons[index]"
          :total="rule.total"
          :issuedCount="rule.issuedCount"
          :revokedCount="rule.revokedCount"
        />
      </template>
    </div>

    <!-- 第三行：接口管理和南向接口 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      <!-- 接口管理 -->
      <InterfaceCard
        v-if="interfaceManagementData"
        :title="interfaceManagementData.title"
        :total="interfaceManagementData.total"
        :metrics="interfaceManagementData.metrics"
        :publishRate="interfaceManagementData.publishRate"
        icon="/src/assets/icons/platform/interface.png"
      />

      <!-- 南向接口 -->
      <div class="bg-white rounded-lg shadow p-4 lg:col-span-1 flex flex-col h-full">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-base font-semibold text-gray-800">南向接口数据量</h3>
          <TimeRangeSelector
            chartId="south"
            :currentRange="timeRanges.south"
            @change="(range: TimeRange) => handleTimeRangeChange('south', range)"
          />
        </div>
        <div
          :class="['chart-container', { active: activeChart === 'south' }]"
          @click="() => handleChartClick('south')"
          class="flex-grow relative"
        >
          <div v-if="isLoading.south" class="flex justify-center items-center h-full text-gray-500">
            加载中...
          </div>
          <LineChart
            v-else-if="chartData.south"
            :xAxisData="chartData.south.xAxisData"
            :series="chartData.south.series.interfaceData"
            :smooth="true"
            :showLegend="true"
            class="h-full w-full"
          />
        </div>
      </div>
      <!-- Moved Identify Service Chart Here -->
      <div class="bg-white rounded-lg shadow p-4 lg:col-span-1 flex flex-col h-full">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-base font-semibold text-gray-800">识别服务数据量</h3>
          <TimeRangeSelector
            chartId="identify"
            :currentRange="timeRanges.identify"
            @change="(range: TimeRange) => handleTimeRangeChange('identify', range)"
          />
        </div>
        <div
          :class="['chart-container', { active: activeChart === 'identify' }]"
          @click="() => handleChartClick('identify')"
          class="flex-grow relative"
        >
          <div
            v-if="isLoading.identify"
            class="flex justify-center items-center h-full text-gray-500"
          >
            加载中...
          </div>
          <LineChart
            v-else-if="chartData.identify"
            :xAxisData="chartData.identify!.xAxisData"
            :series="chartData.identify!.series.identificationData"
            :areaStyle="true"
            :smooth="true"
            class="h-full w-full"
          />
        </div>
      </div>
    </div>

    <!-- 第四行：防护/检测/响应服务 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- 防护/检测/响应 服务 -->
      <template v-for="chart in serviceCharts" :key="chart.id">
        <div class="bg-white rounded-lg shadow p-4 flex flex-col h-full">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-base font-semibold text-gray-800">{{ chart.title }}</h3>
            <TimeRangeSelector
              :chartId="chart.id"
              :currentRange="timeRanges[chart.id]"
              @change="(range: TimeRange) => handleTimeRangeChange(chart.id, range)"
            />
          </div>
          <div
            :class="['chart-container', { active: activeChart === chart.id }]"
            @click="() => handleChartClick(chart.id)"
            class="flex-grow relative"
          >
            <div
              v-if="isLoading[chart.id]"
              class="flex justify-center items-center h-full text-gray-500"
            >
              加载中...
            </div>
            <LineChart
              v-else-if="chartData[chart.id]"
              :xAxisData="chartData[chart.id]!.xAxisData"
              :series="chartData[chart.id]!.series[chart.seriesKey]"
              :areaStyle="chart.areaStyle"
              :smooth="true"
              class="h-full w-full"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import InterfaceCard from '@/components/cards/InterfaceCard.vue'
import ResourceCard from '@/components/cards/ResourceCard.vue'
import RuleCard from '@/components/cards/RuleCard.vue'
import CircularProgress from '@/components/charts/CircularProgress.vue'
import LineChart from '@/components/charts/LineChart.vue'
import TimeRangeSelector from '@/components/common/TimeRangeSelector.vue'
import { ShieldIcon } from '@/components/icons'
import type { Component } from 'vue'
import { computed, onMounted, reactive, ref } from 'vue'

// 导入已迁移的数据和工具函数
import {
  interfaceManagementData,
  resourceManagementData,
  resourceTypesData,
  securityRulesData,
} from '@/data/mockData'

// --- 图片资源导入 ---
// 注意：在 Vue 中，通常将静态资源放在 public 目录下，或使用构建工具处理 src 下的资源。
// 这里我们暂时用字符串路径，假设构建配置能正确处理。
// 或者，如果图片不多，也可以考虑直接 base64 嵌入或使用 SVG 图标库。
const resourceIcon = '/src/assets/icons/platform/resource.png' // 调整路径
const identityIcon = '/src/assets/icons/platform/identity.png'
const standardIcon = '/src/assets/icons/platform/standard.png'
const identifyRuleIcon = '/src/assets/icons/rules/identify.png'
const protectionRuleIcon = '/src/assets/icons/rules/protection.png'
const detectRuleIcon = '/src/assets/icons/rules/detect.png'
const responseRuleIcon = '/src/assets/icons/rules/response.png'

// --- 类型定义 ---
type TimeRange = 'day' | 'week' | 'month'
type ChartId = 'south' | 'identify' | 'protection' | 'detection' | 'response'

interface ChartData {
  xAxisData: string[]
  series: Record<string, { name: string; data: number[]; color: string; areaStyle?: boolean }[]>
}

// --- 模拟数据生成函数 (与 React 版本一致) ---
const generateMockData = (range: TimeRange): ChartData => {
  const baseData = {
    day: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    month: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
  }

  const generateRandomData = (base: number, range: number) => {
    return Array(7)
      .fill(0)
      .map(() => Math.floor(base + Math.random() * range))
  }

  return {
    xAxisData: baseData[range],
    series: {
      interfaceData: [
        { name: '授权接口数量', data: generateRandomData(2000, 6000), color: '#3b82f6' },
        { name: '敏感资源接口', data: generateRandomData(4000, 4000), color: '#10b981' },
        { name: '未知安全接口', data: generateRandomData(1000, 3000), color: '#f59e0b' },
      ],
      identificationData: [
        {
          name: '识别服务',
          data: generateRandomData(2000, 5000),
          color: '#f59e0b',
          areaStyle: true,
        },
      ],
      protectionData: [
        { name: '防护服务', data: generateRandomData(2000, 6000), color: '#3b82f6' },
      ],
      detectionData: [
        {
          name: '检测服务',
          data: generateRandomData(1000, 5000),
          color: '#f97316',
          areaStyle: true,
        },
      ],
      responseData: [{ name: '响应服务', data: generateRandomData(2000, 6000), color: '#10b981' }],
    },
  }
}

// --- 状态管理 ---
const timeRanges = reactive<Record<ChartId, TimeRange>>({
  south: 'week',
  identify: 'week',
  protection: 'week',
  detection: 'week',
  response: 'week',
})

const isLoading = reactive<Record<ChartId, boolean>>({
  south: true, // 初始设为 true
  identify: true,
  protection: true,
  detection: true,
  response: true,
})

const activeChart = ref<ChartId | null>(null)

const chartData = reactive<Record<ChartId, ChartData | null>>({
  south: null,
  identify: null,
  protection: null,
  detection: null,
  response: null,
})

// --- 数据处理 ---
// Updated metricsWithIcons to use ShieldIcon component for the third metric
const metricsWithIcons = computed(() =>
  resourceManagementData.metrics.map((metric, index) => {
    // Specify Component type for the component field
    let iconInfo: { component?: Component; props?: Record<string, unknown>; path?: string } = {}
    if (index === 0) iconInfo = { path: identityIcon }
    if (index === 1) iconInfo = { path: standardIcon }
    if (index === 2)
      iconInfo = { component: ShieldIcon, props: { size: 16, class: 'text-red-500' } } // Use ShieldIcon component

    return {
      ...metric,
      // ResourceCard needs to be updated to handle component icons passed this way
      // For now, let's just pass the component itself if available, path otherwise
      iconComponent: iconInfo.component,
      iconProps: iconInfo.props,
      iconPath: iconInfo.path,
    }
  }),
)

// 规则图标数组 (直接使用导入的路径)
const ruleIcons = [
  identifyRuleIcon,
  protectionRuleIcon,
  detectRuleIcon,
  responseRuleIcon,
  identifyRuleIcon, // 注意：React 代码中这里也用了 identifyRuleIcon
]

// 资源类型标签
const resourceTypeLabels = ['核心资产', '对外资产', '内部资产', '云上资产', 'API']

// 服务图表配置
const serviceCharts: {
  id: ChartId
  title: string
  seriesKey: keyof ChartData['series']
  areaStyle?: boolean
}[] = [
  { id: 'protection', title: '防护服务数据量', seriesKey: 'protectionData' },
  { id: 'detection', title: '检测服务数据量', seriesKey: 'detectionData', areaStyle: true },
  { id: 'response', title: '响应服务数据量', seriesKey: 'responseData' },
]

// --- 生命周期钩子 ---
onMounted(() => {
  // 初始加载所有图表数据
  ;(Object.keys(chartData) as ChartId[]).forEach((id) => {
    chartData[id] = generateMockData(timeRanges[id])
  })

  // 模拟加载延迟
  setTimeout(() => {
    ;(Object.keys(isLoading) as ChartId[]).forEach((id) => {
      isLoading[id] = false
    })
  }, 500) // 稍微缩短延迟以便观察
})

// --- 事件处理 ---
const handleTimeRangeChange = (chartId: ChartId, range: TimeRange) => {
  if (timeRanges[chartId] === range) return // 避免重复加载

  timeRanges[chartId] = range
  isLoading[chartId] = true

  // 模拟异步数据加载
  setTimeout(() => {
    chartData[chartId] = generateMockData(range)
    isLoading[chartId] = false
  }, 500)
}

const handleChartClick = (chartId: ChartId) => {
  activeChart.value = activeChart.value === chartId ? null : chartId
}

// --- 内部组件定义 (Vue 3 <script setup> 中直接在 <template> 使用或提取为单独组件) ---

// TimeRangeSelector 组件 (提取为单独组件更佳，但暂时放在这里)
// 注意：在 Vue 中，子组件向父组件通信通常使用 defineEmits
// 为了简单起见，这里直接定义在父组件中，但在模板中作为一个概念上的组件使用

// LoadingState 组件 (同上，提取为单独组件更佳)
// const LoadingState = () => // Commented out unused variable
//  h('div', { class: 'flex justify-center items-center h-full text-gray-500' }, '加载中...')
// 注意：直接在模板中使用 <div v-if="isLoading...">...</div> 更常见
// 如果需要复用，应创建 LoadingState.vue 文件
</script>

<style scoped>
/* 添加一些特定于此页面的样式 */
.chart-container {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid transparent; /* 占位边框 */
}

.chart-container.active {
  transform: scale(1.02);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); /* 蓝色光晕效果 */
  border: 1px solid #3b82f6; /* 蓝色边框 */
}

/* 可以添加其他需要的样式 */
</style>
