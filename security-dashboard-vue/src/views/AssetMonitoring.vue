<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- 页面标题区域 -->
      <div class="mb-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">应用资产监控</h1>
        <div class="text-sm text-gray-500">最后更新: {{ lastUpdatedTime }}</div>
      </div>

      <!-- 上部分内容 -->
      <div class="grid grid-cols-12 gap-4 mb-4">
        <!-- 左侧列 - 数据交互量应用TOP和频繁登录用户TOP -->
        <div class="col-span-3 grid grid-rows-2 gap-4">
          <!-- 数据交互量应用TOP - 使用进度条表格样式 -->
          <TopRankingCard
            title="数据交互量应用TOP"
            :data="dashboardRankingData.applicationInteraction || []"
            :max-items="5"
            chart-type="progress-bar"
            value-label="交互量"
            @click="handleTopItemClick"
            fit-container
            class="h-full"
          ></TopRankingCard>

          <!-- 频繁登录用户TOP - 使用柱状图样式 -->
          <TopRankingCard
            title="频繁登录用户TOP"
            :data="dashboardRankingData.frequentLoginUser || []"
            :max-items="5"
            chart-type="bar"
            value-label="登录次数"
            @click="handleTopItemClick"
            fit-container
            class="h-full"
          ></TopRankingCard>
        </div>

        <!-- 中间列 - 关键指标统计和关系图 -->
        <div class="col-span-6">
          <!-- 关键监控指标统计卡片 -->
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div
              v-for="(metric, index) in monitoringMetricsData.slice(0, 3)"
              :key="index"
              class="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
            >
              <div class="flex items-center mb-2">
                <!-- 使用实际 Icon 组件 -->
                <AlertIcon v-if="metric.icon === 'alert'" :size="20" class="text-red-500 mr-2" />
                <UserIcon v-if="metric.icon === 'user'" :size="20" class="text-green-500 mr-2" />
                <ApplicationIcon
                  v-if="metric.icon === 'application'"
                  :size="20"
                  class="text-blue-500 mr-2"
                />
                <h3 class="text-sm font-medium text-gray-700">{{ metric.name }}</h3>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-700">
                  {{ metric.value.toLocaleString() }}
                </div>
              </div>
            </div>
          </div>

          <!-- 资产访问关系图 -->
          <div class="bg-white rounded-lg shadow p-4 h-64">
            <AssetFlowChart
              :nodes="assetFlowChartData.nodes"
              :edges="assetFlowChartData.edges"
              @node-click="handleNodeClick"
              @edge-click="handleEdgeClick"
            ></AssetFlowChart>
          </div>
        </div>
        <!-- 右侧列 - 风险业务应用排名和数据使用风险最多人员排名 -->
        <div class="col-span-3 grid grid-rows-2 gap-4">
          <!-- 风险业务应用排名 -->
          <TopRankingCard
            title="风险业务应用排名"
            :data="dashboardRankingData.riskyBusinessApp || []"
            :max-items="5"
            value-label="风险评分"
            @click="handleTopItemClick"
            fit-container
            class="h-full"
            chart-type="progress-bar"
          ></TopRankingCard>
          <!-- 数据使用风险最多人员排名 -->
          <TopRankingCard
            title="数据使用风险最多人员排名"
            :data="dashboardRankingData.riskyDataUser || []"
            :max-items="5"
            value-label="风险事件数"
            @click="handleTopItemClick"
            fit-container
            class="h-full"
            chart-type="progress-bar"
          ></TopRankingCard>
        </div>
      </div>

      <!-- 下部分内容 -->
      <div class="grid grid-cols-2 gap-4">
        <!-- 业务应用访问量趋势 -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-700">业务应用访问量趋势</h2>
            <!-- TimeRangeSelector 实现 -->
            <div class="flex bg-gray-50 rounded-lg p-0.5 text-xs">
              <button
                v-for="range in ['day', 'week', 'month'] as TimeRange[]"
                :key="range"
                :class="[
                  'px-2 py-1 rounded-md transition-colors',
                  {
                    'bg-white text-blue-600 shadow-sm': businessTrendTimeRange === range,
                    'text-gray-600 hover:text-blue-600': businessTrendTimeRange !== range,
                  },
                ]"
                @click="handleBusinessTrendTimeRangeChange(range)"
              >
                {{ range === 'day' ? '一天' : range === 'week' ? '一周' : '一月' }}
              </button>
            </div>
          </div>
          <div v-if="businessTrendLoading" class="h-64 flex items-center justify-center">
            <!-- 使用 LoadingIcon -->
            <LoadingIcon size="24" class="animate-spin text-blue-500" />
          </div>
          <LineChart
            v-else
            :x-axis-data="businessTrendData?.xAxis || []"
            :series="businessTrendData?.series || []"
            class="h-64"
            @chart-click="handleChartClick"
          ></LineChart>
        </div>

        <!-- 告警类型分布 -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-700">告警类型分布</h2>
            <!-- TimeRangeSelector 实现 -->
            <div class="flex bg-gray-50 rounded-lg p-0.5 text-xs">
              <button
                v-for="range in ['day', 'week', 'month'] as TimeRange[]"
                :key="range"
                :class="[
                  'px-2 py-1 rounded-md transition-colors',
                  {
                    'bg-white text-blue-600 shadow-sm': alarmTypeTimeRange === range,
                    'text-gray-600 hover:text-blue-600': alarmTypeTimeRange !== range,
                  },
                ]"
                @click="handleAlarmTypeTimeRangeChange(range)"
              >
                {{ range === 'day' ? '一天' : range === 'week' ? '一周' : '一月' }}
              </button>
            </div>
          </div>
          <div v-if="alarmTypeLoading" class="h-64 flex items-center justify-center">
            <!-- 使用 LoadingIcon -->
            <LoadingIcon size="24" class="animate-spin text-blue-500" />
          </div>
          <DonutChart
            v-else
            :data="alarmTypeData || []"
            class="h-64"
            @click="handleChartClick"
            :rose-type="'area'"
            :inner-radius="0.1"
            :show-legend="true"
            legend-position="right"
            :label-position="'outside'"
            :show-values="false"
            :value-format="donutValueFormatter"
          ></DonutChart>
        </div>

        <!-- 新增: 风险业务类型分布 -->
        <div class="bg-white rounded-lg shadow p-4">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">风险业务类型分布</h2>
          <DonutChart
            :data="securityDistributionData || []"
            class="h-64"
            @click="handleChartClick"
            :show-legend="true"
            legend-position="right"
            :label-position="'outside'"
            :show-values="true"
            :value-format="donutValueFormatter"
          ></DonutChart>
        </div>

        <!-- 新增: 行业资产风险分布 -->
        <div class="bg-white rounded-lg shadow p-4">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">行业资产风险分布</h2>
          <BarChart
            :data="{
              categories: industryDistributionData.map((item) => item.name),
              series: [
                { name: '风险资产数', data: industryDistributionData.map((item) => item.value) },
              ],
            }"
            class="h-64"
            @click="handleChartClick"
            :show-legend="false"
          ></BarChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EdgeMouseEvent, NodeMouseEvent } from '@vue-flow/core' // Import Vue Flow event types
// Import ECElementEvent from echarts types
import type { ECElementEvent } from 'echarts/types/dist/shared'
import { onMounted, onUnmounted, ref, watch } from 'vue' // Import onUnmounted

// --- 已迁移组件导入 ---
import BarChart from '@/components/charts/BarChart.vue' // Import BarChart
import DonutChart from '@/components/charts/DonutChart.vue' // Import DonutChart
import type { LineChartSeries } from '@/components/charts/LineChart.vue' // Assuming LineChart exports its series type
import LineChart from '@/components/charts/LineChart.vue'
import type { RankingItem } from '@/components/charts/TopRankingCard.vue' // Import RankingItem type
import TopRankingCard from '@/components/charts/TopRankingCard.vue' // Import TopRankingCard
import {
  AlertIcon,
  ApplicationIcon,
  LoadingIcon,
  UserIcon,
} from '@/components/icons/AssetIcons.vue' // Import Icons
import AssetFlowChart from '@/components/networks/AssetFlowChart.vue' // Import AssetFlowChart

// --- 模拟数据导入 ---
import {
  assetFlowChartData,
  getChartData,
  industryDistributionData,
  monitoringMetricsData,
  securityDistributionData,
  type TimeRange,
} from '@/data/mock/asset'
// Import data needed by TopRankingCard
import { dashboardRankingData } from '@/data/mock/topRankingData'

// --- Define specific types for chart data ---
interface BusinessTrendData {
  xAxis: string[]
  series: LineChartSeries[] // Use the type exported from LineChart if available
}

interface AlarmTypeDataItem {
  name: string
  value: number
  description?: string // Add optional description field
}

// --- 响应式状态定义 (with specific types) ---
const businessTrendTimeRange = ref<TimeRange>('day')
const alarmTypeTimeRange = ref<TimeRange>('day')
const businessTrendLoading = ref<boolean>(false)
const alarmTypeLoading = ref<boolean>(false)
const businessTrendData = ref<BusinessTrendData | null>(null)
const alarmTypeData = ref<AlarmTypeDataItem[] | null>(null)

const lastUpdatedTime = ref(new Date().toLocaleString())

// --- 数据获取逻辑 (保持不变) ---
const fetchBusinessTrendData = async (range: TimeRange) => {
  businessTrendLoading.value = true
  console.log(`Fetching business trend data for range: ${range}`)
  await new Promise((resolve) => setTimeout(resolve, 500))
  try {
    const data = getChartData('businessTrend', range)
    // Add type assertion to ensure data matches BusinessTrendData
    if (data && 'xAxis' in data && 'series' in data) {
      businessTrendData.value = data as BusinessTrendData
    } else {
      console.error('Invalid data format for business trend:', data)
      businessTrendData.value = null
    }
    console.log('Business trend data loaded:', businessTrendData.value)
  } catch (error) {
    console.error('Failed to load business trend data:', error)
    businessTrendData.value = null
  } finally {
    businessTrendLoading.value = false
  }
}

const fetchAlarmTypeData = async (range: TimeRange) => {
  alarmTypeLoading.value = true
  console.log(`Fetching alarm type data for range: ${range}`)
  await new Promise((resolve) => setTimeout(resolve, 500))
  try {
    // getChartData for alarmType returns AlarmTypeDataItem[] which is compatible now
    const data = getChartData('alarmType', range)
    if (Array.isArray(data)) {
      alarmTypeData.value = data as AlarmTypeDataItem[]
    } else {
      console.error('Invalid data format for alarm type:', data)
      alarmTypeData.value = null
    }
    console.log('Alarm type data loaded:', alarmTypeData.value)
  } catch (error) {
    console.error('Failed to load alarm type data:', error)
    alarmTypeData.value = null
  } finally {
    alarmTypeLoading.value = false
  }
}

// --- 生命周期钩子 ---
let intervalId: number | undefined
onMounted(() => {
  fetchBusinessTrendData(businessTrendTimeRange.value)
  fetchAlarmTypeData(alarmTypeTimeRange.value)

  intervalId = setInterval(() => {
    lastUpdatedTime.value = new Date().toLocaleString()
  }, 60000)

  console.log(
    'AssetFlowChart data:',
    assetFlowChartData.nodes.length,
    'nodes,',
    assetFlowChartData.edges.length,
    'edges',
  )
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

// --- 监听器 (保持不变) ---
watch(businessTrendTimeRange, (newRange) => {
  fetchBusinessTrendData(newRange)
})

watch(alarmTypeTimeRange, (newRange) => {
  fetchAlarmTypeData(newRange)
})

watch(alarmTypeData, (newData) => {
  if (newData) {
    console.log('Alarm type data updated in watcher:', newData)
  }
})

// --- 事件处理函数 ---
const handleBusinessTrendTimeRangeChange = (range: TimeRange) => {
  businessTrendTimeRange.value = range
}

const handleAlarmTypeTimeRangeChange = (range: TimeRange) => {
  alarmTypeTimeRange.value = range
}

const handleChartClick = (params: ECElementEvent) => {
  console.log('Chart clicked:', params)
}

const handleTopItemClick = (item: RankingItem) => {
  console.log('Top item clicked:', item)
}

// Event handlers for AssetFlowChart
const handleNodeClick = (event: NodeMouseEvent) => {
  console.log('Node clicked in AssetMonitoring:', event.node)
  // Add specific logic for node clicks if needed
}

const handleEdgeClick = (event: EdgeMouseEvent) => {
  console.log('Edge clicked in AssetMonitoring:', event.edge)
  // Add specific logic for edge clicks if needed
}

// --- Helper Functions ---
const donutValueFormatter = (value: number, percent: number, name: string): string => {
  return `${name} (${percent.toFixed(1)}%)`
}
</script>

<style scoped>
.h-64 {
  height: 16rem; /* 256px */
}
.h-full {
  height: 100%;
}
</style>
