# 应用资产模拟数据 (`mock/appAsset`)

本目录包含所有与资产监控相关的模拟数据，为资产监控页面 (`src/pages/AssetMonitoring.tsx`) 提供数据支持，已按照 API 和功能进行拆分。

## 文件结构

- `stats.ts`: 对应 `GET /asset/stats` API，提供资产概览统计数据 (`assetStatsData`)。
- `rankings.ts`: 对应 `GET /asset/interaction/rank` 和 `GET /asset/business/risk/rank` API，提供应用交互量 (`applicationInteractionRankData`) 和风险业务 (`riskBusinessRankData`) 的排名数据。
- `chart.ts`: 对应 `GET /asset/chart` API，提供获取图表数据的模拟函数 (`getChartData`)。
- `metrics.ts`: 提供资产监控页面可能用到的一些额外指标数据 (`monitoringMetricsData`)。
- `assetFlowData.ts`: 提供资产流图（React Flow）所需的节点 (`assetNodes`) 和边 (`assetEdges`) 数据。
- `additionalData.ts`: 包含一些在 API 文档中未明确定义，但原始 Mock 数据中存在的其他数据（如登录用户、风险用户、行业/安全分布等）。
- `index.ts`: 统一导出本目录下所有模块的数据和类型。
- `README.md`: 本文档。
- `assetMonitoringData.ts.bak`: (已备份) 原始聚合的模拟数据文件。
- `assetData.ts.bak`: (已备份) 另一个包含冗余或不一致数据的原始文件。

## 主要导出

请通过 `index.ts` 导入所需内容，主要包括：

*   `assetStatsData`: 资产统计对象。
*   `applicationInteractionRankData`: 应用交互排名数组。
*   `riskBusinessRankData`: 风险业务排名数组。
*   `getChartData(chartId, timeRange)`: 获取图表数据的异步函数。
*   `monitoringMetricsData`: 监控指标数组。
*   `assetNodes`, `assetEdges`: React Flow 节点和边数组。
*   `loginUserData`, `riskUserRankData`, etc.: 其他附加数据。
*   相关 TypeScript 类型 (如 `RankItem`, `MonitoringMetric`, `ChartId` 等)。

## 使用方式

在 `services/appAssetService.ts` 中，根据 `REACT_APP_USE_MOCK` 环境变量的值，决定是调用真实的 API 函数 (from `../api/appAsset`) 还是导入并使用本目录下的模拟数据/函数。

```typescript
// Example in services/appAssetService.ts
import {
  assetStatsData as mockAssetStatsData,
  getChartData as mockGetChartData,
  // ... other mock imports
} from '../mock/appAsset';
import {
  getAssetStats as apiGetAssetStats,
  getAssetChartData as apiGetAssetChartData,
  // ... other api imports
} from '../api/appAsset';

const useMock = process.env.REACT_APP_USE_MOCK === 'true';

export const getAssetStats = async () => {
  return useMock ? Promise.resolve(mockAssetStatsData) : apiGetAssetStats();
};

export const getAssetChartData = async (chartId: string, timeRange: string) => {
  // Assuming ChartId and TimeRange types are consistent or handled
  return useMock ? mockGetChartData(chartId, timeRange as any) : apiGetAssetChartData(chartId, timeRange as any);
};
```

## 注意事项

*   所有导出的类型定义（如 `RankItem`）应优先考虑是否能统一到 `src/data/api/types.ts` 中。
