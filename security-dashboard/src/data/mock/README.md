# 模拟数据层 (`src/data/mock`)

本目录包含安全仪表盘应用在开发和测试阶段使用的所有模拟（Mock）数据。

## 目的

*   提供独立于后端 API 的数据源，支持前端组件的并行开发与测试。
*   模拟各种 API 响应场景，包括正常数据、边界情况和空数据。

## 目录结构

模拟数据按**功能模块**组织存放，与 `src/data/api` 和 `src/data/services` 目录结构保持一致：

```
mock/
├── README.md                # 本文档 - Mock 数据层结构与规范
├── expansion_plan.md        # Mock 数据扩充计划与建议
├── refactor_plan.md         # (已完成) Mock 数据结构重构计划
├── platform/                # 平台概览模块的模拟数据
│   ├── interfaceOverview.ts # 接口概览相关
│   ├── resourceOverview.ts  # 资源概览相关
│   ├── resourceTypes.ts     # 资源类型分布
│   ├── securityRules.ts     # 安全规则（含密码规则）
│   ├── serviceTimeseries.ts # 服务时序数据（模拟函数）
│   └── index.ts             # 统一导出 platform 模块数据
├── interface/               # 接口监控模块的模拟数据
│   ├── metrics.ts           # 指标卡数据
│   ├── timeseries.ts        # 时序数据（模拟函数）
│   └── index.ts             # 统一导出 interface 模块数据
├── dataAsset/               # 数据资产模块的模拟数据
│   ├── resourceFlow.ts      # 资源流图数据（占位符）
│   ├── riskTrend.ts         # 风险趋势数据
│   ├── stats.ts             # 统计数据
│   ├── topRanking.ts        # Top榜单数据（模拟函数）
│   └── index.ts             # 统一导出 dataAsset 模块数据
└── appAsset/                # 应用资产模块的模拟数据
    ├── README.md            # 应用资产模块详细说明
    ├── additionalData.ts    # 其他附加数据 (API未明确定义)
    ├── assetFlowData.ts     # 资产流图数据
    ├── chart.ts             # 图表数据（模拟函数）
    ├── metrics.ts           # 监控指标数据
    ├── rankings.ts          # 排名数据
    ├── stats.ts             # 统计数据
    └── index.ts             # 统一导出 appAsset 模块数据
```

(注：`.bak` 文件为重构前的备份文件)

## 主要导出内容

以下是各模块通过其 `index.ts` 文件导出的主要模拟数据常量和模拟函数，供 `services` 层或其他测试代码导入使用。类型定义（Interfaces, Types）通常也会一并导出。

*   **`platform` 模块:**
    *   `resourceOverviewData`: 平台资源概览数据对象。
    *   `resourceTypesData`: 平台资源类型分布数组。
    *   `securityRulesData`: 通用安全规则数组。
    *   `passwordRulesData`: 密码安全规则数组。
    *   `interfaceOverviewData`: 平台接口概览数据对象。
    *   `interfaceSecurityDistributionData`: 接口安全分布数组。
    *   `getServiceTimeseriesMock(serviceId, timeRange)`: 获取平台服务时序数据的模拟函数。
*   **`interface` 模块:**
    *   `metricsData`: 接口监控指标卡数组。
    *   `getInterfaceTimeseriesMock(chartType, timeRange)`: 获取接口监控时序数据的模拟函数。
*   **`dataAsset` 模块:**
    *   `statsData`: 数据资产统计数组。
    *   `riskTrendData`: 数据资产风险趋势对象 (含 xAxisData 和 series)。
    *   `getDataAssetTopRankingMock(rankingType, limit)`: 获取数据资产 Top 榜单数据的模拟函数。
    *   `getResourceFlowMock()`: 获取资源流图数据的模拟函数 (当前为占位符，返回空数据)。
*   **`appAsset` 模块:** (详情可参考 `./appAsset/README.md`)
    *   `assetStatsData`: 应用资产统计对象。
    *   `applicationInteractionRankData`: 应用交互排名数组。
    *   `riskBusinessRankData`: 风险业务排名数组。
    *   `monitoringMetricsData`: 监控指标数组。
    *   `getChartData(chartId, timeRange)`: 获取图表数据的模拟函数。
    *   `assetNodes`, `assetEdges`: 资产流图的节点和边数组。
    *   `loginUserData`, `riskUserRankData`, `industryDistributionData`, `securityDistributionData`: 其他附加数据数组。

## 核心原则与规范

1.  **类型一致**: 所有 Mock 数据必须**严格遵守** `../api/types.ts` 中定义的 TypeScript 类型。这是确保 Mock 数据与真实 API 结构兼容的关键。
2.  **结构清晰**: 
    *   数据按模块存放。
    *   文件名应清晰描述其内容或对应的 API (e.g., `stats.ts`, `rankings.ts`, `getChartData.ts`)。
    *   优先将大型聚合文件拆分成更小的、职责单一的文件。
3.  **统一导出**: 每个模块子目录 (`platform/`, `interface/` 等) 都应包含一个 `index.ts` 文件，用于统一导出该模块下的所有模拟数据、模拟函数和相关类型。
4.  **质量提升**: 
    *   **重要**: 在添加或修改 Mock 数据前，请务必查阅根目录下的 `expansion_plan.md` 文件。该文件记录了提升 Mock 数据质量（如真实感、边界覆盖）的计划和建议。
    *   鼓励创建能模拟不同场景（如空数据、错误状态、不同参数返回不同结果）的模拟数据或函数。

## 如何添加新的 Mock 数据

1.  **确定模块**: 找到或创建对应的模块子目录 (e.g., `newModule/`)。
2.  **遵循类型**: 确保你要模拟的数据结构已经在 `../api/types.ts` 中定义。
3.  **创建文件**: 在模块目录下创建新的 `.ts` 文件 (e.g., `newFeatureData.ts`)。
4.  **编写数据**: 编写符合类型定义的 Mock 数据常量或模拟函数。
5.  **查阅计划**: 参考 `expansion_plan.md` 中的建议，考虑数据的真实感和边界情况。
6.  **导出**: 在模块目录的 `index.ts` 文件中导出新的数据或函数。

## 相关链接

*   [Mock 数据扩充计划](./expansion_plan.md)
*   [应用资产 Mock 数据说明](./appAsset/README.md) 