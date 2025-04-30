<template>
  <div class="bg-gray-100 min-h-screen p-4">
    <div class="max-w-7xl mx-auto space-y-4">
      <!-- 指标卡片区域 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          v-for="(card, index) in metricCardsData"
          :key="index"
          :title="card.title"
          :value="card.value"
          :color="card.color"
        >
          <template #icon>
            <!-- 使用动态组件 :is 来根据名称渲染图标 -->
            <component :is="getIconComponent(card.icon)" :size="28" />
          </template>
        </MetricCard>
      </div>

      <!-- 网络拓扑图 -->

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">网络拓扑</h2>
          <div class="text-sm text-gray-500">
            共 {{ topologyNodeCount }} 个节点 | {{ topologyLinkCount }} 个连接
          </div>
        </div>
        <div class="h-[60vh]">
          <NetworkTopology />
        </div>
      </div>

      <!-- 图表第一行 -->

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white rounded-lg shadow">
          <!-- 移除内层 p-4，因为 MultiLineChart 组件自己有内边距 -->
          <!-- 移除组件内部的标题和外部边距 -->
          <MultiLineChart
            title="每分钟平均TPS"
            :time-data="timeData"
            :series="tpsData"
            :show-legend="false"
            class-name=""
          />
        </div>
        <div class="bg-white rounded-lg shadow">
          <MultiLineChart
            title="每分钟网络连接数"
            :time-data="timeData"
            :series="connectionData"
            :show-legend="false"
            class-name=""
          />
        </div>
      </div>

      <!-- 图表第二行 -->

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded-lg shadow">
          <MultiLineChart
            title="每分钟应用层详情"
            :time-data="timeData"
            :series="applicationData"
            :show-legend="true"
            class-name=""
          />
        </div>
        <div class="bg-white rounded-lg shadow">
          <MultiLineChart
            title="每分钟服务安全检测点"
            :time-data="timeData"
            :series="securityCheckpointData"
            :show-legend="true"
            class-name=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MetricCard from '@/components/cards/MetricCard.vue'
import MultiLineChart from '@/components/charts/MultiLineChart.vue' // 可以暂时注释掉导入
import NetworkTopology from '@/components/networks/NetworkTopology.vue' // 可以暂时注释掉导入
import { shallowRef } from 'vue' // 使用 shallowRef 存储非响应式的组件引用
// 导入所有需要的图标
import {
  ApiIcon,
  ConnectionIcon,
  MonitorIcon,
  RequestIcon,
  ResponseIcon,
  ServerIcon,
} from '@/components/icons/MonitoringIcons.vue'
// 导入模拟数据
import {
  applicationData,
  connectionData,
  metricCardsData,
  securityCheckpointData,
  timeData,
  tpsData,
} from '@/data/monitoringData' // 假设路径正确

// 导入 NetworkTopology 内部数据（或其长度）以便显示计数
// 注意：理想情况下应由子组件emit或通过状态管理获取
// 这里暂时硬编码示例数据的长度，你需要根据实际数据修改
const topologyNodeCount = 13 // 这些可以暂时保留或注释
const topologyLinkCount = 15 // 这些可以暂时保留或注释

// 图标映射表
const iconMap = shallowRef({
  // 使用 shallowRef 因为映射关系本身不需要响应式
  server: ServerIcon,
  api: ApiIcon,
  connection: ConnectionIcon,
  request: RequestIcon,
  response: ResponseIcon,
  monitor: MonitorIcon,
})

// 根据名称获取图标组件的函数
const getIconComponent = (iconName: string) => {
  // 提供一个默认图标，以防 iconName 无效
  // 使用类型断言确保 key 的类型正确
  const iconComponent = iconMap.value[iconName as keyof typeof iconMap.value]
  return iconComponent || ServerIcon
}
</script>

<style scoped>
/* 页面特定样式 */
</style>
