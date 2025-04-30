# 服务层 (`src/data/services`)

本目录包含应用的服务层代码，是 UI 层（页面组件）与数据获取逻辑（API 层）之间的桥梁。

## 核心职责

1.  **统一入口**: 为 UI 层提供稳定、统一的数据获取接口。**UI 组件应仅调用本目录下的服务函数**。
2.  **封装逻辑**: 封装具体的业务逻辑，可能包括组合调用多个 API、数据校验、简单的数据转换等。
3.  **调用 API 或 Mock**: **根据 `REACT_APP_USE_MOCK` 环境变量**，服务层函数决定是调用 `../api` 目录下的 API 函数，还是直接加载 `../mock` 目录下的模拟数据。
4.  **错误处理**: 统一处理来自 API 层或 Mock 层的响应或错误。通常在调用失败或加载 Mock 失败时向上层（UI）**抛出错误 (`throw new Error(...)`)**，由 UI 层负责捕获并展示错误状态。
5.  **数据聚合与适配**: 提供两种主要类型的服务函数：
    *   **细粒度函数**: 通常封装对单个数据源（API 或 Mock）的访问。
    *   **聚合函数** (通常命名为 `get...PageData`): 负责调用多个细粒度函数，将数据组装成特定页面所需的完整数据结构 (`ViewModel`)，简化页面组件的数据获取逻辑。

## 目录结构

服务按功能模块组织，与 `api` 和 `mock` 目录保持一致：

```
services/
├── README.md             # 本文档 - 服务层说明
├── platformService.ts    # 平台概览相关服务
├── interfaceService.ts   # 接口监控相关服务
├── dataAssetService.ts   # 数据资产相关服务
├── appAssetService.ts    # 应用资产相关服务
└── index.ts              # (可选) 统一导出所有服务函数
```

## 各模块服务导出 (主要函数)

以下是各 Service 文件实际导出的主要函数，供开发者参考和使用。
(具体参数和返回值类型请参考各 Service 文件中的 TSDoc 注释或导入查看。)

*   **`platformService.ts`**
    *   `getPlatformResourceOverview()`: 获取平台资源概览。
    *   `getPlatformResourceTypes()`: 获取平台资源类型分布。
    *   `getPlatformSecurityRules()`: 获取平台安全规则概览。
    *   `getPlatformInterfaceOverview()`: 获取平台接口概览。
    *   `getPlatformServiceTimeSeries(serviceId, timeRange)`: 获取指定服务的时序数据。
    *   `getPlatformOverviewPageData(timeRangeMap?)`: **[聚合]** 获取平台概览页面所需的全部聚合数据。

*   **`interfaceService.ts`**
    *   `getInterfaceMetrics()`: 获取接口关键指标。
    *   `getInterfaceTopology()`: 获取接口拓扑数据。
    *   `getInterfaceTimeSeries(chartType, timeRange)`: 获取指定类型的接口时序数据。
    *   `getInterfaceMonitoringPageData(timeRangeMap?)`: **[聚合]** 获取接口监控页面所需的全部聚合数据。

*   **`dataAssetService.ts`**
    *   `getDataAssetStats()`: 获取数据资产统计。
    *   `getDataAssetResourceFlow()`: 获取数据资产资源流图数据。
    *   `getDataAssetTopRanking(rankingType, limit?)`: 获取指定类型的数据资产 Top N 排名。
    *   `getDataAssetRiskTrend(timeRange?)`: 获取数据资产风险趋势。
    *   `getDataAssetMonitoringPageData(timeRange?, rankingLimits?)`: **[聚合]** 获取数据资产监控页面所需的全部聚合数据。

*   **`appAssetService.ts`**
    *   `getAssetStats()`: 获取应用资产统计数据。
    *   `getAssetInteractionRank(limit?)`: 获取应用资产交互量排行。
    *   `getRiskBusinessRank(limit?)`: 获取风险业务应用排行。
    *   `getAssetChartData(chartId, timeRange)`: 获取指定 ID 的应用资产图表数据。
    *   `getAssetMonitoringMetrics()`: 获取应用资产监控指标数据。
    *   `getAssetFlowData()`: 获取应用资产流图数据。
    *   `getAppAssetMonitoringPageData(timeRangeMap?, interactionRankLimit?, riskRankLimit?)`: **[聚合]** 获取应用资产监控页面所需的全部聚合数据。

## 开发规范 (核心要点)

1.  **调用方向**: **Service -> (API | Mock)**。Service 层根据 `USE_MOCK` 决定调用 API 函数还是加载 Mock 数据。禁止 Service 直接执行 HTTP 请求。
2.  **导出模式**: **推荐**同时提供**细粒度函数**（封装单个数据访问，包含 Mock/API 切换逻辑）和**聚合函数**（供页面一次性获取数据，调用细粒度函数）。
3.  **错误传递**: 遇到无法处理的错误时（如 API 调用失败且无法恢复，或 Mock 加载失败），**必须**将错误向上抛出 (`throw new Error(...)`)。
4.  **README 同步**: 新增或修改 Service 导出函数后，**必须**同步更新本文档的"各模块服务导出"部分。

## 使用示例 (页面组件中)

```typescript
import React, { useState, useEffect } from 'react';
import {
  getPlatformOverviewPageData, 
  PlatformOverviewPageData 
} from '../data/services/platformService';

const PlatformOverview: React.FC = () => {
  const [pageData, setPageData] = useState<PlatformOverviewPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 调用聚合服务函数获取页面数据
        const data = await getPlatformOverviewPageData(/* 可传递参数 */);
        setPageData(data);
      } catch (err: any) {
        console.error("Error fetching platform overview data:", err);
        setError(err.message || '获取数据失败');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pageData) return <div>No data available.</div>;

  return (
    <div>
      {/* 使用 pageData 渲染页面 */}
      {/* <h1>{pageData.resourceManagement.title}</h1> */}
      {/* ... */}
    </div>
  );
};

export default PlatformOverview;
```

请参考 `../README.md` 获取更高层级的数据层设计原则和使用方式。