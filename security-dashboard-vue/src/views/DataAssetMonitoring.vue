<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- 页面标题区域 -->
      <div class="mb-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">数据资产防护监测</h1>
        <div class="text-sm text-gray-500">最后更新: {{ currentTime }}</div>
      </div>

      <!-- 上部分内容 - 左右布局 -->
      <div class="grid grid-cols-12 gap-4 mb-4" style="height: 420px">
        <!-- 左侧 - 访问关系图及数据统计 -->
        <div class="col-span-8 flex flex-col h-full overflow-hidden">
          <div class="grid grid-cols-3 gap-4 mb-4 flex-none">
            <!-- StatisticCard: 待迁移 -->

            <StatisticCard
              v-for="(stat, index) in assetStats"
              :key="index"
              :label="stat.label"
              :value="stat.value"
              class="bg-white shadow-sm border border-gray-100 rounded-lg"
            />

            <!--
            <div
              v-for="(stat, index) in assetStats"
              :key="index"
              class="bg-white shadow-sm border border-gray-100 rounded-lg p-4"
            >
              <div class="text-sm text-gray-500">{{ stat.label }}</div>
              <div class="text-2xl font-semibold text-gray-800">{{ stat.value }}</div>
              <div class="text-red-500 text-xs">临时占位符: StatisticCard</div>
            </div>
            -->
          </div>

          <!-- 资源访问关系图 -->
          <div class="bg-white rounded-lg shadow flex-1 flex flex-col overflow-hidden min-h-0">
            <div class="p-3 flex flex-col h-full">
              <!-- 说明信息区域 -->
              <div class="flex-none border-b border-gray-100 pb-2 mb-2 flex items-center">
                <svg
                  class="w-4 h-4 text-blue-500 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-blue-500 font-medium text-xs ml-1">资源链路：</span>
                <span class="text-gray-600 text-xs ml-1">
                  涉及用户、任务、应用、服务、数据资源，区分风险/无风险连接，悬浮可查看详情
                </span>
              </div>

              <!-- 资源流程图: ResourceFlowChart 待迁移 -->
              <div class="flex-1 min-h-0 border border-gray-100 rounded-md">
                <ResourceFlowChart
                  :initialNodes="initialNodes"
                  :initialEdges="initialEdges"
                  @node-click="handleNodeClick"
                  @edge-click="handleEdgeClick"
                  :showControls="true"
                  :fitView="true"
                />
              </div>

              <!-- 图例说明: ResourceFlowLegend 待迁移 -->
              <div class="flex-none mt-2 pt-2 border-t border-gray-100">
                <!-- <ResourceFlowLegend /> -->
                <div class="text-center text-gray-400 text-sm">临时占位符: ResourceFlowLegend</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 - 排行榜区域 -->
        <div class="col-span-4 flex flex-col h-full overflow-hidden">
          <!-- 风险最多数据资源TOP: TableTopCard 待迁移 -->
          <TableTopCard
            title="风险最多数据资源TOP"
            :data="storageRiskResourceTableData"
            :columns="topRiskResourceColumns"
            progressBarField="riskValue"
            @itemClick="handleRankingItemClick"
            class="h-full flex-none"
            style="height: 45%"
            :maxItems="5"
          />

          <!-- 高风险数据使用风险最多人TOP: TableTopCard 待迁移 -->
          <TableTopCard
            title="高敏数据使用风险最多人TOP"
            :data="highRiskUserTableData"
            :columns="topRiskUserColumns"
            progressBarField="threatValue"
            @itemClick="handleRankingItemClick"
            class="h-full flex-none mt-4"
            style="height: 52%"
            :maxItems="8"
          />
        </div>
      </div>

      <!-- 下部分内容 - 左右布局 -->
      <div class="grid grid-cols-12 gap-4" style="height: 360px">
        <!-- 左侧 - 存储风险和防护能力缺失的TOP榜单 -->
        <div class="col-span-6 grid grid-cols-2 gap-4">
          <!-- 存在存储风险的数据资源TOP: TableTopCard, RiskTag 待迁移 -->
          <TableTopCard
            title="存在存储风险的数据资源TOP"
            :data="storageRiskResourceTableData"
            :columns="storageRiskColumns"
            :showProgressBar="false"
            @itemClick="handleRankingItemClick"
            class="h-full shadow"
            :maxItems="7"
          />

          <!-- 存在防护能力缺失的数据资源TOP: TableTopCard, CapabilityTag 待迁移 -->
          <TableTopCard
            title="存在防护能力缺失的数据资源TOP"
            :data="protectionLackResourceTableData"
            :columns="protectionLackColumns"
            :showProgressBar="false"
            @itemClick="handleRankingItemClick"
            class="h-full shadow"
            :maxItems="7"
          />
        </div>

        <!-- 右侧 - 风险类型趋势图 -->
        <div class="col-span-6 bg-white rounded-lg shadow p-4 flex flex-col h-full">
          <div class="border-b border-gray-200 pb-2 mb-3 flex justify-between items-center">
            <div class="text-base font-medium">最常发生的风险类型趋势</div>
            <div class="text-xs text-gray-500">时间范围: 今日</div>
          </div>
          <div class="flex-grow pb-6 h-full">
            <LineChart
              title=""
              :xAxisData="riskTrendData.xAxis"
              :series="riskTrendData.series"
              :showLegend="true"
              legendPosition="top"
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Fragment, h, onMounted, ref } from 'vue'
// 导入模拟数据 - 假设在 src/data 目录下，并配置了 @ 别名
// import resourceFlowData from '@/data/mock/network/resourceFlowData'; // 只导入当前需要的数据
import ResourceFlowChart from '@/components/networks/ResourceFlowChart.vue'
import { resourceFlowData } from '@/data/mock/network/resourceFlowData'
import { assetStats, riskTrendData } from '@/data/securityMonitoringData' // 只导入当前需要的数据

// 待迁移组件占位符 - 实际迁移时需替换为真实组件导入
import StatisticCard from '@/components/cards/StatisticCard.vue'
// import ResourceFlowChart from '@/components/networks/ResourceFlowChart.vue';
// import ResourceFlowLegend from '@/components/networks/ResourceFlowLegend.vue';
import TableTopCard from '@/components/cards/TableTopCard.vue'
import CapabilityTag from '@/components/tags/CapabilityTag.vue'
import RiskTag from '@/components/tags/RiskTag.vue'

// 导入其他需要的组件
import {
  highRiskUserTableData,
  protectionLackResourceTableData,
  storageRiskResourceTableData,
} from '@/data/tableTopData'

// --- State ---
const currentTime = ref(new Date().toLocaleString())

// ResourceFlowChart Data - Uncomment
const { nodes: initialNodes, edges: initialEdges } = resourceFlowData.withAbnormal

// --- Lifecycle Hooks ---
onMounted(() => {
  // 可以设置定时器更新时间，如果需要实时更新的话
  // setInterval(() => {
  //   currentTime.value = new Date().toLocaleString();
  // }, 1000);
})

// --- Methods ---
// 假设从 @vue-flow/core 导入 Node 和 Edge 类型
import type { Edge, Node } from '@vue-flow/core'
// 假设我们定义或导入了 RankingItem 类型
// import type { RankingItem } from '@/types/ranking'; // 示例路径

// --- 假设的 RankingItem 类型定义 (如果不存在则需要创建) ---
interface RankingItem {
  id: number | string
  name: string
  // ... 其他属性
}
// ---

// Uncomment node/edge click handlers
// 使用导入的类型， Node/Edge 可以接受泛型参数指定具体数据类型，例如 Node<MyNodeData>
const handleNodeClick = (node: Node) => {
  console.log('Node clicked in Vue component:', node)
}

const handleEdgeClick = (edge: Edge) => {
  console.log('Edge clicked in Vue component:', edge)
}

const handleRankingItemClick = (item: RankingItem) => {
  // 使用具体的 RankingItem 类型
  console.log('Ranking item clicked:', item)
}

// --- Column Definitions with Vue Render Functions ---

const storageRiskColumns = [
  { key: 'name', title: '资源名称' },
  {
    key: 'risk',
    title: '风险',
    render: (value: unknown) => {
      // 使用类型守卫 Array.isArray 并检查元素类型
      if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
        // 显式创建一个 string[] 类型的变量
        const stringArray: string[] = value
        // 使用这个类型明确的变量
        return h(
          Fragment,
          stringArray.map(
            (
              tagText: string,
              idx: number, // 使用 stringArray
            ) => h(RiskTag, { key: idx, text: tagText, class: 'mr-1 mb-1' }),
          ),
        )
      }
      // Return an empty Fragment if not an array or no tags
      return h(Fragment)
    },
  },
]

const protectionLackColumns = [
  { key: 'name', title: '资源名称' },
  {
    key: 'protection',
    title: '防护能力',
    render: (value: unknown) => {
      // 检查 value 是否为 string，如果不是，提供一个默认值或进行转换
      const textValue = typeof value === 'string' ? value : '' // 如果不是字符串，则使用空字符串
      // 或者进行更复杂的处理，例如: const textValue = String(value);
      return h(CapabilityTag, { text: textValue }) // <--- 传递处理后的 textValue
    },
  },
]

const topRiskResourceColumns = [
  { key: 'name', title: '资源名称' },
  { key: 'riskValue', title: '风险', align: 'right' as const },
]

const topRiskUserColumns = [
  { key: 'name', title: '姓名' },
  { key: 'threatValue', title: '威胁数', align: 'right' as const },
]
</script>

<style scoped>
/* 如果需要添加特定于此组件的样式，可以在这里添加 */
/* Tailwind CSS 类名已在模板中直接使用 */
.h-full {
  height: 100%;
}
.min-h-screen {
  min-height: 100vh;
}
/* 可以根据需要覆盖或添加更多样式 */
</style>
