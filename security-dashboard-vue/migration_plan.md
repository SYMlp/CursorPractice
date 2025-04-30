# React 到 Vue 迁移计划

本文档记录了需要从 `source_project/security-dashboard` 迁移到当前 Vue 项目的具体内容清单。

## 迁移目标

将 React 项目中的 4 个大屏页面的静态展示迁移到 Vue 项目中。

## 迁移清单

- **大屏页面 (Screens/Pages):**
  - [x] 平台总览: `source_project/security-dashboard/src/pages/PlatformOverview.tsx` -> `src/views/PlatformOverview.vue` // 迁移完成，但依赖组件待完成
  - [x] 资产监测: `source_project/security-dashboard/src/pages/AssetMonitoring.tsx` -> `src/views/AssetMonitoring.vue` // 迁移完成
  - [x] 数据资产监测: `source_project/security-dashboard/src/pages/DataAssetMonitoring.tsx` -> `src/views/DataAssetMonitoring.vue` // **迁移完成** (静态展示部分)
  - [x] 接口监测: `source_project/security-dashboard/src/pages/InterfaceMonitoring.tsx` -> `src/views/InterfaceMonitoring.vue` // 迁移完成
- **依赖组件 (Components):**
  - Charts:
    - [x] `CircularProgress`: `s/s/s/components/charts/CircularProgress.tsx` -> `src/components/charts/CircularProgress.vue` (PlatformOverview, AssetMonitoring)
    - [x] `LineChart`: `s/s/s/components/charts/LineChart.tsx` -> `src/components/charts/LineChart.vue` (PlatformOverview, AssetMonitoring, DataAssetMonitoring)
    - [x] `BarChart`: `s/s/s/components/charts/BarChart.tsx` -> `src/components/charts/BarChart.vue` (AssetMonitoring)
    - [x] `DonutChart` / `EnhancedDonutChart`: `s/s/s/components/charts/DonutChart.tsx` -> `src/components/charts/DonutChart.vue` (AssetMonitoring) // Vue component created, includes roseType prop
    - [x] `TopRankingCard`: `s/s/s/components/charts/TopRankingCard.tsx` -> `src/components/charts/TopRankingCard.vue` (AssetMonitoring) // Basic structure and chart types (except Pie) migrated.
    - [x] `MultiLineChart`: `s/s/s/components/charts/MultiLineChart.tsx` -> `src/components/charts/MultiLineChart.vue` (InterfaceMonitoring) // 迁移完成
  - Cards:
    - [x] `ResourceCard`: `s/s/s/components/cards/ResourceCard.tsx` -> `src/components/cards/ResourceCard.vue` (PlatformOverview)
    - [x] `RuleCard`: `s/s/s/components/cards/RuleCard.tsx` -> `src/components/cards/RuleCard.vue` (PlatformOverview)
    - [x] `InterfaceCard`: `s/s/s/components/cards/InterfaceCard.tsx` -> `src/components/cards/InterfaceCard.vue` (PlatformOverview)
    - [x] `StatisticCard`: `s/s/s/components/cards/StatisticCard.tsx` -> `src/components/cards/StatisticCard.vue` (DataAssetMonitoring)
    - [x] `RankingCard`: `s/s/s/components/cards/RankingCard.tsx` -> `src/components/cards/RankingCard.vue` (DataAssetMonitoring)
    - [x] `TableTopCard`: `s/s/s/components/cards/TableTopCard.tsx` -> `src/components/cards/TableTopCard.vue` (DataAssetMonitoring)
    - [x] `MetricCard`: `s/s/s/components/cards/MetricCard.tsx` -> `src/components/cards/MetricCard.vue` (InterfaceMonitoring) // 迁移完成
  - Networks:
    - [x] `AssetFlowChart`: `s/s/s/components/networks/AssetFlowChart.tsx` -> `src/components/networks/AssetFlowChart.vue` (AssetMonitoring) // Migrated using @vue-flow/core
    - [x] `ResourceFlowChart`: `s/s/s/components/networks/ResourceFlowChart.tsx` -> `src/components/networks/ResourceFlowChart.vue` (DataAssetMonitoring)
    - [x] `ResourceFlowLegend`: `s/s/s/components/networks/ResourceFlowLegend.tsx` -> `src/components/networks/ResourceFlowLegend.vue` (DataAssetMonitoring)
    - [x] `NetworkTopology`: `s/s/s/components/networks/NetworkTopology.tsx` -> `src/components/networks/NetworkTopology.vue` (InterfaceMonitoring) // 迁移完成
  - Tags:
    - [x] `RiskTag`: `s/s/s/components/tags/RiskTag.tsx` -> `src/components/tags/RiskTag.vue` (DataAssetMonitoring)
    - [x] `CapabilityTag`: `s/s/s/components/tags/CapabilityTag.tsx` -> `src/components/tags/CapabilityTag.vue` (DataAssetMonitoring)
    - [x] `CustomTooltip`: `s/s/s/components/tags/CustomTooltip.tsx` -> `src/components/tags/CustomTooltip.vue` (DataAssetMonitoring)
  - Icons:
    - [x] `Icons` (通用): `s/s/s/components/icons/` -> `src/components/icons/` (PlatformOverview 等) // Migrated ShieldIcon, InterfaceIcon
    - [x] `AssetIcons`: `s/s/s/components/icons/AssetIcons.tsx` -> `src/components/icons/AssetIcons.vue` (AssetMonitoring) // Migrated icons to Vue functional components
    - [x] `MonitoringIcons`: `s/s/s/components/icons/MonitoringIcons.tsx` -> `src/components/icons/MonitoringIcons.vue` (InterfaceMonitoring) // 迁移完成
  - Custom Nodes (for ResourceFlowChart):
    - [x] `ResourceNode`: `s/s/s/components/networks/nodes/ResourceNode.tsx` -> `src/components/networks/nodes/ResourceNode.vue`
    - [x] `ServiceNode`: `s/s/s/components/networks/nodes/ServiceNode.tsx` -> `src/components/networks/nodes/ServiceNode.vue`
    - [x] `ApplicationNode`: `s/s/s/components/networks/nodes/ApplicationNode.tsx` -> `src/components/networks/nodes/ApplicationNode.vue`
    - [x] `TaskNode`: `s/s/s/components/networks/nodes/TaskNode.tsx` -> `src/components/networks/nodes/TaskNode.vue`
    - [x] `PersonNode`: `s/s/s/components/networks/nodes/PersonNode.tsx` -> `src/components/networks/nodes/PersonNode.vue`
  - [ ] ... (根据对其他页面的分析补充)
- **样式文件 (Styles):**
  - [x] 全局样式: 检查 `s/s/s/index.css`, `s/s/s/App.css` -> 已合并到 `src/style.css`
  - [x] Tailwind CSS: React 项目使用 Tailwind，Vue 项目也配置了 Tailwind。类名已在组件中迁移，后续需验证。
  - [ ] ... (根据分析补充)
- **静态数据 (Data/Mock):**
  - [x] `mockData.ts`: `s/s/s/data/mockData.ts` -> `src/data/mockData.ts` (PlatformOverview)
  - [x] `data/mock/asset.ts`: `s/s/s/data/mock/asset.ts` -> `src/data/mock/asset.ts` (AssetMonitoring)
  - [x] `securityMonitoringData.ts`: `s/s/s/data/securityMonitoringData.ts` -> `src/data/securityMonitoringData.ts` (AssetMonitoring, DataAssetMonitoring)
  - [x] `data/mock/topRankingData.ts`: `s/s/s/data/mock/topRankingData.ts` -> `src/data/mock/topRankingData.ts` (AssetMonitoring)
  - [x] `tableTopData.ts`: `s/s/s/data/tableTopData.ts` -> `src/data/tableTopData.ts` (DataAssetMonitoring)
  - [x] `data/mock/network/resourceFlowData.ts`: `s/s/s/data/mock/network/resourceFlowData.ts` -> `src/data/mock/network/resourceFlowData.ts` (DataAssetMonitoring)
  - [x] `monitoringData.ts`: `s/s/s/data/monitoringData.ts` -> `src/data/monitoringData.ts` (InterfaceMonitoring) // 迁移完成
  - [x] 页面内数据生成函数 (`generateMockData`, `generateAssetChartData`): 已迁移到页面或 `src/data/mock/asset.ts`
