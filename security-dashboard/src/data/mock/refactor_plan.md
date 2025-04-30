 # Mock 数据目录重构计划

本文档用于跟踪 `src/data/mock/` 目录的重构进度，目标是使模拟数据文件结构更清晰、命名更规范，并与 API 设计保持一致。

**总体目标:**

*   将聚合的 Mock 数据文件（如 `mockData.ts`, `monitoringData.ts`, `securityMonitoringData.ts`）拆分成更小的、按功能/API 命名的文件。
*   确保 Mock 文件名和导出的数据变量名具有描述性。
*   解决发现的路径不一致问题。
*   更新相关的 `index.ts` 导出文件。

**重构步骤:**

**模块: `platform` (源文件: `mock/platform/mockData.ts`)**

*   [x] 分析 `mockData.ts`，识别对应 API 的数据片段：
    *   `resourceManagementData` (`/platform/resource/overview`)
    *   `resourceTypesData` (`/platform/resource/types`)
    *   `securityRulesData` (`/platform/security/rules`)
    *   `interfaceManagementData` (`/platform/interface/overview`)
    *   `generateMockData` (`/platform/service/timeseries`)
*   [x] 创建新文件并将数据迁移：
    *   [x] `mock/platform/resourceOverview.ts` (导出 `resourceOverviewData`)
    *   [x] `mock/platform/resourceTypes.ts` (导出 `resourceTypesData`)
    *   [x] `mock/platform/securityRules.ts` (导出 `securityRulesData` 和 `passwordRulesData`)
    *   [x] `mock/platform/interfaceOverview.ts` (导出 `interfaceOverviewData` 和 `interfaceSecurityDistributionData`)
    *   [x] `mock/platform/serviceTimeseries.ts` (导出 `getServiceTimeseriesMock`)
*   [x] 处理 `generateMockData` 函数，可能需要将其移至新文件或调整导出方式。(已包含在 `serviceTimeseries.ts` 中)
*   [x] 重构或删除旧的 `mock/platform/mockData.ts` 文件。
*   [x] 更新 `mock/platform/index.ts` (如果需要)。

**模块: `interface` (源文件: `mock/interface/monitoringData.ts`)**

*   [x] 分析 `monitoringData.ts`，识别对应 API 的数据片段：
    *   `metricCardsData` (`/interface/metrics`)
    *   时序图数据 (`/interface/timeseries`)
    *   (注意: 拓扑图 `/interface/topology` 数据在 Mock 中缺失)
*   [x] 创建新文件并将数据迁移：
    *   [x] `mock/interface/metrics.ts` (导出 `metricsData`)
    *   [x] `mock/interface/timeseries.ts` (导出 `timeseriesData` 或生成函数)
*   [x] 重构或删除旧的 `mock/interface/monitoringData.ts` 文件。
*   [x] 更新 `mock/interface/index.ts` (如果需要)。

**模块: `dataAsset` (源文件: `mock/dataAsset/securityMonitoringData.ts`)**

*   [x] 分析 `securityMonitoringData.ts`，识别对应 API 的数据片段：
    *   `assetStats` (`/data-asset/stats`)
    *   `riskTrendData` (`/data-asset/risk-trend`)
    *   (注意: 资源流图 `/data-asset/resource-flow` 数据路径问题，源头可能是 `mock/network/resourceFlowData.ts` 但该目录不存在)
    *   (注意: TOP 榜单 `/data-asset/top-ranking` 数据在 `mock/common/topRankingData.ts`)
*   [x] 创建新文件并将数据迁移：
    *   [x] `mock/dataAsset/stats.ts` (导出 `statsData`)
    *   [x] `mock/dataAsset/riskTrend.ts` (导出 `riskTrendData`)
    *   [x] `mock/dataAsset/topRanking.ts` (导出 `getDataAssetTopRankingMock` 及相关数据)
*   [x] 调查并解决 `resource-flow` 的 Mock 数据来源问题。如果需要，创建 `mock/dataAsset/resourceFlow.ts`。(已创建占位文件 `resourceFlow.ts`)
*   [x] 确认 `topRankingData` 在 `common` 目录下是否合适，或者是否需要移到 `dataAsset` 下。(已决定将 dataAsset 特定榜单移至 `mock/dataAsset/topRanking.ts`)
*   [x] 重构或删除旧的 `mock/dataAsset/securityMonitoringData.ts` 文件。
*   [x] 更新 `mock/dataAsset/index.ts` (如果需要)。

**模块: `appAsset`**

*   [x] 检查 `mock/appAsset/` 下的文件 (`assetMonitoringData.ts`, `assetData.ts`, `assetFlowData.ts`) 是否足够清晰，或是否也需要进一步拆分。目前看尚可接受，但可复核。

**模块: `common`**

*   [x] 检查 `mock/common/topRankingData.ts`，确认其通用性。
    *   决定：该文件内容大多与 `appAsset` 模块重复或归属不清，并非真正通用，已删除。
    *   `mock/common/` 目录也已移除。

**收尾工作:**

*   [ ] 确保所有旧的、聚合的 Mock 文件已被安全移除或内容清空。
*   [ ] 确保所有新的 Mock 文件都被正确导出（如果需要）。
// ... existing code ...

---
**进度记录:**

*   YYYY-MM-DD: 创建重构计划。
*   2024-05-19: 完成 `platform` 模块 Mock 文件拆分和迁移。
*   2024-05-19: 完成 `interface` 模块 Mock 文件拆分和迁移。
*   2024-05-19: 完成 `dataAsset` 模块 Mock 文件拆分和迁移。
*   2024-05-19: 完成 `appAsset` 模块 Mock 文件拆分和迁移 (需手动验证 chart.ts 内部实现)。
*   2024-05-19: 完成 `common` 模块检查，删除冗余文件和目录。
*   ... (在此处添加完成条目的日期和简要说明) ...