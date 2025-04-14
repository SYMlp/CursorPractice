# 资产模拟数据

本目录包含所有与资产监控相关的模拟数据，为资产监控页面提供数据支持。

## 文件结构

- `assetMonitoringData.ts` - 应用资产监控页面所需的所有模拟数据
  - 包含资产统计数据、TOP排行榜数据、图表数据等
  - 定义了数据类型和生成函数
- `index.ts` - 导出所有资产相关的模拟数据和类型

## 数据类型

### 主要类型定义

```typescript
// 时间范围类型
export type TimeRange = 'day' | 'week' | 'month';

// 图表ID类型
export type ChartId = 'businessTrend' | 'alarmType' | 'riskDistribution';

// 排名项接口
export interface RankItem {
  id: string;
  name: string;
  value: number;
  percent?: number;
  trend?: 'up' | 'down' | 'stable';
  risk?: 'high' | 'medium' | 'low';
}

// 登录用户数据接口
export interface LoginUserData {
  id: string;
  name: string;
  department: string;
  lastLoginTime: string;
  loginCount: number;
  risk?: 'high' | 'medium' | 'low';
}

// 资产流图的节点接口
export interface AssetFlowNode {
  id: string;
  name: string;
  type: 'application' | 'user' | 'service' | 'resource';
  risk?: 'high' | 'medium' | 'low';
  x?: number;
  y?: number;
}

// 资产流图的连接接口
export interface AssetFlowLink {
  source: string;
  target: string;
  value: number;
  risk?: 'high' | 'medium' | 'low';
}
```

### 主要数据结构

- `assetStatsData` - 资产统计数据
- `monitoringMetricsData` - 监控指标数据
- `applicationInteractionRankData` - 应用交互排名数据
- `riskBusinessRankData` - 风险业务排名数据
- `loginUserData` - 登录用户数据
- `riskUserRankData` - 风险用户排名数据
- `industryDistributionData` - 行业分布数据
- `securityDistributionData` - 安全分布数据
- `assetFlowData` - 资产流图数据

## 数据生成函数

- `generateBusinessTrendData(timeRange: TimeRange)` - 生成业务趋势图数据
- `generateAlarmTypeData(timeRange: TimeRange)` - 生成告警类型数据
- `generateRiskDistributionData(timeRange: TimeRange)` - 生成风险分布数据
- `getChartData(chartId: ChartId, timeRange: TimeRange)` - 获取指定图表的数据

## 使用示例

```typescript
import {
  assetStatsData,
  applicationInteractionRankData,
  getChartData,
  TimeRange,
  ChartId
} from '../data/mock/asset';

// 使用静态数据
const totalAssets = assetStatsData.totalAssets;
const topApps = applicationInteractionRankData.slice(0, 5);

// 使用数据生成函数
const timeRange: TimeRange = 'day';
const chartId: ChartId = 'businessTrend';
const chartData = getChartData(chartId, timeRange);
```

## 更新记录

- 2024-07-15: 更新README文档，使其与实际代码结构一致
- 2024-07-15: 移除了过时的数据结构描述，添加新的函数说明
- 2024-07-12: 创建资产模拟数据目录，迁移资产监控相关模拟数据
- 2024-07-12: 添加类型定义和数据生成函数 