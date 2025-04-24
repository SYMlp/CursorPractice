<template>
  <div class="flex h-full">
    <!-- ECharts 图表容器 -->
    <div class="flex-grow h-full">
      <v-chart class="chart h-full w-full" :option="chartOption" autoresize @click="onChartClick" />
    </div>
    <!-- 节点详情面板 -->
    <div
      v-if="selectedNode"
      class="w-64 flex-shrink-0 ml-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white overflow-y-auto"
    >
      <h3 class="text-lg font-semibold mb-3 border-b pb-2 text-gray-800">
        {{ selectedNode.name }}
      </h3>
      <div class="space-y-2 text-sm">
        <div>
          <strong class="text-gray-600">类型:</strong>
          <span class="ml-2 text-gray-700">{{ selectedNode.type }}</span>
        </div>
        <div>
          <strong class="text-gray-600">端口:</strong>
          <ul class="list-disc list-inside ml-2 mt-1">
            <li v-for="port in selectedNode.ports" :key="port" class="text-gray-700">{{ port }}</li>
          </ul>
        </div>
        <div>
          <strong class="text-gray-600">接口:</strong>
          <ul class="list-disc list-inside ml-2 mt-1">
            <li v-for="iface in selectedNode.interfaces" :key="iface" class="text-gray-700">
              {{ iface }}
            </li>
          </ul>
        </div>
      </div>
      <button
        @click="selectedNode = null"
        class="mt-4 w-full text-center px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
      >
        关闭
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GraphChart } from 'echarts/charts'
import { LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { use, type ECElementEvent } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ref } from 'vue'
import VChart from 'vue-echarts'

// 按需引入 ECharts 组件
use([CanvasRenderer, GraphChart, TitleComponent, TooltipComponent, LegendComponent])

// --- 类型定义 ---
interface NodeDetails {
  name: string
  type: string
  ports: string[]
  interfaces: string[]
}

interface EchartsNode {
  name: string
  value: number
  category: number
  symbol: string
  symbolSize: number
  itemStyle: { color: string }
  details: NodeDetails
}

interface EchartsLink {
  source: string
  target: string
  lineStyle: { color: string; width: number }
}

// --- 状态管理 ---
const selectedNode = ref<NodeDetails | null>(null)

// --- 图表数据 (从 React 迁移) ---
// !!! 注意：请手动从 source_project/security-dashboard/src/components/networks/NetworkTopology.tsx
// !!!       复制完整的 nodes 和 links 数组到下面对应位置
const nodes: EchartsNode[] = [
  // 根节点
  {
    name: '安全防护',
    value: 60,
    category: 0,
    symbol: 'circle',
    symbolSize: 70,
    itemStyle: { color: '#3B82F6' },
    details: {
      name: '安全防护',
      type: '系统',
      ports: ['45533'],
      interfaces: ['安全管理接口', '策略配置接口'],
    },
  },
  // 一级节点 - 四大服务
  {
    name: '识别服务',
    value: 50,
    category: 1,
    symbol: 'circle',
    symbolSize: 60,
    itemStyle: { color: '#F97316' },
    details: {
      name: '识别服务',
      type: '服务',
      ports: ['8080'],
      interfaces: ['资产识别接口', '服务管理接口'],
    },
  },
  {
    name: '防护服务',
    value: 50,
    category: 1,
    symbol: 'circle',
    symbolSize: 60,
    itemStyle: { color: '#F97316' },
    details: {
      name: '防护服务',
      type: '服务',
      ports: ['8081'],
      interfaces: ['防护策略接口', '规则配置接口'],
    },
  },
  {
    name: '检测服务',
    value: 50,
    category: 1,
    symbol: 'circle',
    symbolSize: 60,
    itemStyle: { color: '#F97316' },
    details: {
      name: '检测服务',
      type: '服务',
      ports: ['8082'],
      interfaces: ['威胁检测接口', '告警管理接口'],
    },
  },
  {
    name: '响应服务',
    value: 50,
    category: 1,
    symbol: 'circle',
    symbolSize: 60,
    itemStyle: { color: '#F97316' },
    details: {
      name: '响应服务',
      type: '服务',
      ports: ['8083'],
      interfaces: ['事件响应接口', '处置管理接口'],
    },
  },
  // 一级节点 - 四大类
  {
    name: '安全识别类',
    value: 45,
    category: 2,
    symbol: 'circle',
    symbolSize: 55,
    itemStyle: { color: '#8B5CF6' },
    details: { name: '安全识别类', type: '类别', ports: ['9001'], interfaces: ['识别能力接口'] },
  },
  {
    name: '安全防护类',
    value: 45,
    category: 2,
    symbol: 'circle',
    symbolSize: 55,
    itemStyle: { color: '#8B5CF6' },
    details: { name: '安全防护类', type: '类别', ports: ['9002'], interfaces: ['防护能力接口'] },
  },
  {
    name: '安全检测类',
    value: 45,
    category: 2,
    symbol: 'circle',
    symbolSize: 55,
    itemStyle: { color: '#8B5CF6' },
    details: { name: '安全检测类', type: '类别', ports: ['9003'], interfaces: ['检测能力接口'] },
  },
  {
    name: '安全响应类',
    value: 45,
    category: 2,
    symbol: 'circle',
    symbolSize: 55,
    itemStyle: { color: '#8B5CF6' },
    details: { name: '安全响应类', type: '类别', ports: ['9004'], interfaces: ['响应能力接口'] },
  },
  // 二级节点
  {
    name: '主机资产发现',
    value: 40,
    category: 3,
    symbol: 'circle',
    symbolSize: 50,
    itemStyle: { color: '#10B981' },
    details: {
      name: '主机资产发现',
      type: '功能',
      ports: ['7001'],
      interfaces: ['资产发现接口', '资产管理接口'],
    },
  },
  {
    name: '软件资产识别',
    value: 40,
    category: 3,
    symbol: 'circle',
    symbolSize: 50,
    itemStyle: { color: '#10B981' },
    details: {
      name: '软件资产识别',
      type: '功能',
      ports: ['7002'],
      interfaces: ['软件识别接口', '软件管理接口'],
    },
  },
  {
    name: '网络攻击抑制',
    value: 40,
    category: 3,
    symbol: 'circle',
    symbolSize: 50,
    itemStyle: { color: '#10B981' },
    details: {
      name: '网络攻击抑制',
      type: '功能',
      ports: ['7003'],
      interfaces: ['攻击抑制接口', '策略配置接口'],
    },
  },
  // ... 完整的 nodes 数据应在此处
]

const links: EchartsLink[] = [
  { source: '安全防护', target: '识别服务', lineStyle: { color: '#94A3B8', width: 2 } },
  { source: '安全防护', target: '防护服务', lineStyle: { color: '#94A3B8', width: 2 } },
  { source: '安全防护', target: '检测服务', lineStyle: { color: '#94A3B8', width: 2 } },
  { source: '安全防护', target: '响应服务', lineStyle: { color: '#94A3B8', width: 2 } },
  { source: '安全防护', target: '安全识别类', lineStyle: { color: '#94A3B8', width: 2 } },
  { source: '安全防护', target: '安全防护类', lineStyle: { color: '#94A3B8', width: 2 } },
  { source: '安全防护', target: '安全检测类', lineStyle: { color: '#94A3B8', width: 2 } },
  { source: '安全防护', target: '安全响应类', lineStyle: { color: '#94A3B8', width: 2 } },
  // 服务到类别
  { source: '识别服务', target: '安全识别类', lineStyle: { color: '#94A3B8', width: 1.5 } },
  { source: '防护服务', target: '安全防护类', lineStyle: { color: '#94A3B8', width: 1.5 } },
  { source: '检测服务', target: '安全检测类', lineStyle: { color: '#94A3B8', width: 1.5 } },
  { source: '响应服务', target: '安全响应类', lineStyle: { color: '#94A3B8', width: 1.5 } },
  // 类别到功能
  { source: '安全识别类', target: '主机资产发现', lineStyle: { color: '#94A3B8', width: 1 } },
  { source: '安全识别类', target: '软件资产识别', lineStyle: { color: '#94A3B8', width: 1 } },
  { source: '安全防护类', target: '网络攻击抑制', lineStyle: { color: '#94A3B8', width: 1 } },
  // ... 完整的 links 数据应在此处
]

const categories = [
  { name: '系统' }, // 对应 根节点 (蓝色)
  { name: '服务' }, // 对应 服务节点 (橙色)
  { name: '类别' }, // 对应 类别节点 (紫色)
  { name: '功能' }, // 对应 功能节点 (绿色)
]

// --- ECharts Option ---
const chartOption = ref({
  tooltip: {},
  legend: [
    {
      // 修改图例配置
      orient: 'vertical', // 垂直布局
      right: '5%', // 靠右显示，留点边距
      top: 'center', // 垂直居中
      data: categories.map((a) => a.name),
      textStyle: { color: '#333' }, // 调整文字颜色以便看清
      itemGap: 10, // 调整间距
    },
  ],
  series: [
    {
      name: '网络拓扑',
      type: 'graph',
      layout: 'force',
      data: nodes,
      links: links,
      categories: categories,
      roam: true, // 允许缩放和平移
      label: {
        show: true,
        position: 'right',
        formatter: '{b}', // 显示节点名称
      },
      labelLayout: {
        hideOverlap: true, // 隐藏重叠标签
      },
      scaleLimit: {
        // 缩放限制
        min: 0.4,
        max: 2,
      },
      lineStyle: {
        color: 'source', // 边的颜色跟随源节点
        curveness: 0.1, // 边的曲度
      },
      emphasis: {
        // 高亮状态
        focus: 'adjacency', // 高亮相邻节点和边
        lineStyle: {
          width: 4,
        },
      },
      force: {
        repulsion: 150, // 节点之间的斥力因子
        edgeLength: [80, 120], // 边的两个节点之间的距离，值越小越密集
        gravity: 0.1, // 节点受到的向中心的引力因子
        layoutAnimation: true,
      },
    },
  ],
})

// --- 事件处理 ---

// 类型守卫：检查数据是否是包含 details 的 EchartsNode
function isEchartsNodeWithDetails(data: unknown): data is EchartsNode {
  return typeof data === 'object' && data !== null && 'details' in data
}

const onChartClick = (params: ECElementEvent) => {
  // 使用类型守卫检查 params.data
  if (params.dataType === 'node' && isEchartsNodeWithDetails(params.data)) {
    // 现在可以安全地访问 params.data.details
    selectedNode.value = params.data.details
  } else {
    // 如果点击的不是有效节点，可以取消选中
    // selectedNode.value = null; // 或者保持当前选中状态不变
  }
}
</script>

<style scoped>
.chart {
  min-height: 300px; /* 保证图表有最小高度 */
}
/* 可以添加滚动条样式等 */
</style>
