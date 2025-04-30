# API 接口层 (`src/data/api`)

本目录包含与后端 API 直接交互的代码，定义了数据获取和提交的接口契约。

## 核心职责

1.  **定义接口契约**: 定义与后端 API 交互的函数签名（参数和返回类型 `ApiResponse<T>`）以及相关的 **基础 TypeScript 类型**。这是保证类型安全和前后端协作顺畅的关键。
2.  **(未来) 实现真实调用**: API 函数旨在封装调用真实后端 HTTP 接口的逻辑（例如使用 `fetch` 或 `axios`）。**本层不包含 Mock/API 切换逻辑。**
3.  **返回标准响应**: API 函数（在实现真实调用后）应返回符合 `ApiResponse<T>` 结构的对象，包含明确的状态、消息和数据。

## 目录结构

API 按功能模块组织，与 `services` 和 `mock` 目录保持一致：

```
api/
├── README.md          # 本文档 - API 层说明
├── commonTypes.ts     # 定义跨模块共享的通用类型 (如 ApiResponse, PaginationParams)
├── platform.ts        # 平台概览相关的 API 函数及特定类型
├── interface.ts       # 接口监控相关的 API 函数及特定类型
├── dataAsset.ts       # 数据资产相关的 API 函数及特定类型
├── appAsset.ts        # 应用资产相关的 API 函数及特定类型
└── index.ts           # 统一导出所有 API 函数和类型
```

## 类型定义策略

遵循 `../README.md` 中定义的类型安全原则：

*   **通用类型**: 定义在 `commonTypes.ts` 中，并通过 `index.ts` 导出。
*   **模块特定类型**: 直接定义在对应的模块文件（如 `platform.ts`, `appAsset.ts`）**内部**，并使用 `export type` 或 `export interface` 导出，以便 `index.ts` 可以重新导出它们。
*   **统一导出**: `index.ts` 使用 `export * from './xxx'` 的方式，统一导出所有模块的 API 函数和 **所有需要被外部（主要是 Service 层）使用的类型**。

## 主要 API 模块

以下是主要的 API 模块文件及其提供的核心函数：

*   **`platform.ts`**: 提供获取平台概览数据的 API 函数。
    *   `getPlatformResourceOverviewApi(options?)`: 获取资源概览数据 (-> `GET /platform/resource/overview`)。
    *   `getPlatformResourceTypesApi(options?)`: 获取资源类型数据 (-> `GET /platform/resource/types`)。
    *   `getPlatformSecurityRulesApi(options?)`: 获取安全规则数据 (-> `GET /platform/security/rules`)。
    *   `getPlatformInterfaceOverviewApi(options?)`: 获取接口概览数据 (-> `GET /platform/interface/overview`)。
    *   `getPlatformServiceTimeSeriesApi(serviceId, timeRange, options?)`: 获取服务时序图数据 (-> `GET /platform/timeseries/{serviceId}?range={timeRange}`)。

*   **`interface.ts`**: 提供获取接口监控数据的 API 函数。
    *   `getInterfaceMetricsApi(options?)`: 获取指标卡数据 (-> `GET /interfaces/metrics`)。
    *   `getInterfaceTopologyApi(options?)`: 获取拓扑图数据 (-> `GET /interfaces/topology`)。
    *   `getInterfaceTimeSeriesApi(chartType, timeRange, options?)`: 获取时序图数据 (-> `GET /interfaces/timeseries/{chartType}?range={timeRange}`)。

*   **`dataAsset.ts`**: 提供获取数据资产监控数据的 API 函数。
    *   `getDataAssetStatsApi(options?)`: 获取统计数据 (-> `GET /assets/data/stats`)。
    *   `getDataAssetResourceFlowApi(options?)`: 获取资源流图数据 (-> `GET /assets/data/flow`)。
    *   `getDataAssetTopRankingApi(rankingType, limit?, options?)`: 获取 Top 榜单数据 (-> `GET /assets/data/ranking/{rankingType}?limit={limit}`)。
    *   `getDataAssetRiskTrendApi(timeRange?, options?)`: 获取风险趋势数据 (-> `GET /assets/data/risk/trend?range={timeRange}`)。

*   **`appAsset.ts`**: 提供获取应用资产监控数据的 API 函数。
    *   `getAssetStatsApi(options?)`: 获取统计数据 (-> `GET /assets/app/stats`)。
    *   `getAssetInteractionRankApi(options?)`: 获取交互量排行 (-> `GET /assets/app/rank/interaction`)。
    *   `getAssetRiskBusinessRankApi(options?)`: 获取风险业务排行 (-> `GET /assets/app/rank/risk`)。
    *   `getAssetChartDataApi(chartId, timeRange, options?)`: 获取图表数据 (-> `GET /assets/app/chart/{chartId}?range={timeRange}`)。
    *   `getAssetMonitoringMetricsApi(options?)`: 获取监控指标数据 (-> `GET /assets/app/metrics`)。
    *   `getAssetFlowDataApi(options?)`: 获取资产流图数据 (-> `GET /assets/app/flow`)。
    *   *(可能包含其他附加数据的 API，如此处的 TODO)*

(具体的参数和返回值类型请参考各 API 文件中的 TSDoc 注释或导入查看。端点路径为根据函数内注释推测，可能需要根据实际后端调整。)

## 开发规范


1.  **接口对应**: 每个导出的 `...Api` 函数原则上应对应一个后端 HTTP 接口。
2.  **命名约定**: API 调用函数使用 `get...Api`, `post...Api`, `fetch...` 等名称。
3.  **类型优先**:
    *   所有请求参数、响应数据都必须有明确的 TypeScript 类型定义。
    *   禁止使用 `any` 作为明确的类型替代。
4.  **Mock 无关**: API 函数**不应**包含任何 Mock 数据的逻辑或引用。
5.  **错误处理 (真实 API)**:
    *   函数内部应处理网络请求错误和检查 HTTP 响应状态码。
    *   对于调用失败的情况，应返回包含错误信息的标准 `ApiResponse` 结构 (`{ success: false, code: ..., data: null, message: '...' }`)，或根据情况向上抛出特定错误（如网络中断）。Service 层将依赖此标准响应进行处理。
6.  **参数处理**: 妥善处理可选参数 (`options?: RequestOptions`)。
7.  **导出同步**: 新增或修改的函数和类型需在模块文件 `export`，并确保 `index.ts` 包含 `export *`。
8.  **README 同步**: 新增或修改 API 函数后，**必须**同步更新本文档的“主要 API 模块”部分。

请参考 `../README.md` 获取更高层级的数据层设计原则和使用方式。