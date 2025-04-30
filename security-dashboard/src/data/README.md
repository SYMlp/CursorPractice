# 安全仪表盘数据层

本目录 (`src/data`) 包含安全仪表盘应用的所有数据获取、处理和状态管理相关的代码。采用清晰的分层架构，旨在实现职责分离、类型安全和易于维护，同时支持开发阶段使用模拟数据和生产环境对接真实API。

## 目录结构

```
data/
├── README.md           # 本文档 - 数据层结构、原则与使用指南
├── api/                # API接口层 - 定义与后端或模拟服务器的通信接口
│   ├── appAsset.ts     # 应用资产相关API函数
│   ├── platform.ts     # 平台概览相关API函数 (可包含平台特定的类型定义)
│   ├── interface.ts    # 接口监控相关API函数 (可包含接口监控特定的类型定义)
│   ├── dataAsset.ts    # 数据资产相关API函数 (可包含数据资产特定的类型定义)
│   ├── commonTypes.ts  # **核心**: API 通用或跨模块共享的类型定义
│   └── index.ts        # **统一导出**: api/ 下所有公共 API 函数和类型 (外部应从此导入)
├── mock/               # 模拟数据层 - 提供开发/测试用的模拟数据 (无 index.ts)
│   ├── appAsset/       # 应用资产模拟数据 (需符合 api/appAsset.ts 中定义的类型)
│   ├── platform/       # 平台概览模拟数据
│   ├── interface/      # 接口监控模拟数据
│   ├── dataAsset/      # 数据资产模拟数据
│   ├── common/         # 公共或跨模块模拟数据 (如通用排名、枚举等)
│   └── index.ts        # (可选, 当前未使用)
├── services/           # 服务层 - 封装业务逻辑，供UI层调用
│   ├── appAssetService.ts # 应用资产相关服务
│   ├── platformService.ts # 平台概览相关服务
│   ├── interfaceService.ts # 接口监控相关服务
│   ├── dataAssetService.ts # 数据资产相关服务
│   └── index.ts        # **统一导出**: services/ 下所有服务函数 (UI层应从此导入)
├── utils/              # 数据工具 - 通用的、与业务无关的数据处理函数
│   ├── formatters.ts   # 数据格式化 (e.g., formatNumber, formatDate)
│   ├── transformers.ts # 通用数据转换 (e.g., arrayToMap)
│   └── index.ts        # **统一导出**: utils/ 下所有工具函数 (如需外部使用, 应从此导入)
└── components/         # (当前未使用或结构简单) 数据层内部可能使用的共享组件 (无 index.ts)
```

## 设计原则

遵循 `../../README_GUIDELINES.md` 中定义的规范。核心原则包括：

1.  **分层职责清晰**:
    *   `api/`: 定义与后端交互的 **接口函数契约** (函数签名和返回类型)。**基础数据结构类型** 也在此层定义。此层函数旨在（未来）实现对真实后端 API 的调用，不包含 Mock/API 切换逻辑。**通过 `api/index.ts` 统一导出**。
    *   `mock/`: 提供符合 `api` 层定义类型结构的模拟数据，按模块组织。**无统一导出入口，由 `services` 层按需加载**。
    *   `services/`: **负责根据 `.env` 中的 `REACT_APP_USE_MOCK` 环境变量决定调用 `api` 层函数还是加载 `mock` 层数据**。封装业务逻辑，是 **UI 层唯一交互的数据入口**。服务层函数 **可选择性地** 对获取的数据进行转换，定义自己面向 UI 的返回类型。**通过 `services/index.ts` 统一导出，UI 层应通过此入口导入服务函数**。
    *   `utils/`: 提供通用、无副作用的数据处理工具。**通过 `utils/index.ts` 统一导出**。
2.  **统一数据流**: UI ↔ `services` (`index.ts`) ↔ (`api` (`index.ts`) | `mock`)。
3.  **模拟数据切换**: 通过 `.env` 中的 `REACT_APP_USE_MOCK` 控制数据源，**切换逻辑由 `services` 层处理**。
4.  **类型安全**: **所有与后端 API 直接交互的基础数据结构必须在 `api` 层使用 TypeScript 严格定义** (分散在模块文件或 `commonTypes.ts`)。`mock` 层数据需符合这些类型。`services` 层 **应** 使用这些类型，并在必要时定义自己的转换后类型供 UI 使用。各层代码均需尽可能利用类型进行约束。**推荐从 `api/index.ts` 导入类型**。


## 使用方式

### 在组件中使用服务

UI 组件应仅从 `services` 层导入和调用函数来获取或操作数据。**推荐通过 `services` 目录的 `index.ts` 统一入口导入**。

```typescript
import { useEffect, useState } from 'react';
// 1. 从服务层统一入口导入所需函数
import { getAppAssetStats } from '../data/services'; // 或使用路径别名如 '@/data/services'
// 2. 从 API 层统一入口导入所需的数据类型进行标注
import { AppAssetStatsData } from '../data/api'; // 或使用路径别名如 '@/data/api'

function AppAssetStatsComponent() {
  // 推荐使用 service 层明确定义的返回类型（如果 service 做了转换）
  // 或者直接使用 api 层的原始类型（如果 service 直接透传）
  const [stats, setStats] = useState<AppAssetStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // 3. 调用服务函数
        const data = await getAppAssetStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('获取数据失败'));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ... 处理 loading 和 error 状态 ...

  return stats ? (
    <div>{/* 使用 stats 数据渲染 */}</div>
  ) : null;
}
```

### 可用服务概览

UI 层应通过以下服务层函数获取各页面所需的聚合数据：

*   **`src/data/services/platformService.ts`**
    *   `getPlatformOverviewPageData(timeRangeMap?)`: 获取平台概览页面所需的聚合数据（资源概览、类型、规则、接口概览、时序图）。
*   **`src/data/services/interfaceService.ts`**
    *   `getInterfaceMonitoringPageData(timeRangeMap?)`: 获取接口监控页面所需的聚合数据（指标、拓扑图、时序图）。
*   **`src/data/services/dataAssetService.ts`**
    *   `getDataAssetMonitoringPageData(timeRange?, rankingLimits?)`: 获取数据资产监控页面所需的聚合数据（统计、流图、风险趋势、Top榜单）。
*   **`src/data/services/appAssetService.ts`**
    *   `getAppAssetMonitoringPageData(timeRangeMap?, interactionRankLimit?, riskRankLimit?)`: 获取应用资产监控页面所需的聚合数据（统计、排名、指标、流图、图表）。

(具体参数和返回值类型请参考各 Service 文件中的 TSDoc 注释或导入查看。)

### 环境变量配置

在项目根目录 `.env` 文件中配置：

```
# 控制是否使用模拟数据 (true: 使用 mock/, false: 使用 api/)
REACT_APP_USE_MOCK=true

# 真实 API 的基础 URL (仅在 REACT_APP_USE_MOCK=false 时生效)
REACT_APP_API_BASE_URL=http://localhost:3000/api
```

## 添加新功能模块流程

（以添加新的 "告警 (alert)" 模块为例）

1.  **定义类型**:
    *   在 `api/` 下创建 `alert.ts` 文件（如果尚不存在）。
    *   在 `api/alert.ts` 内部定义 **仅与告警模块相关的** 接口类型，如 `Alert`, `AlertSpecificParams`。
    *   如果需要定义 **跨模块共享的** 类型（如通用的 `ApiResponse` 或 `UserInfo`），请在 `api/commonTypes.ts` 中添加或修改。
    *   确保在 **`api/index.ts`** 中重新导出 `alert.ts` 和 `commonTypes.ts` (或其内容)。
2.  **添加模拟数据**: 在 `mock/` 下创建 `alert/` 目录及相关模拟数据文件 (e.g., `mock/alert/alerts.ts`)，确保数据符合 `api` 层定义的类型 (`Alert` 等)。
3.  **添加API接口**: 在 `api/alert.ts` 中，实现 `fetchAlerts`, `fetchAlertById` 等调用后端 API 的函数。确保它们被 **`api/index.ts`** 导出。
4.  **添加服务**: 在 `services/` 下创建 `alertService.ts`，实现 `getAlerts`, `getAlertDetails` 等服务函数。
    *   这些函数内部 **根据 `REACT_APP_USE_MOCK` 环境变量判断**，决定是调用 `api/alert.ts` 中的函数，还是直接加载 `mock/alert/` 下对应的模拟数据。
    *   **按需**：如果服务层需要对从 `api` 获取的数据进行转换后再提供给 UI，可以在 `alertService.ts` 中定义 **服务特定的返回类型** (e.g., `AlertViewModel`)。
    *   在 **`services/index.ts`** 中导出新的服务函数。
5.  **UI 调用**: 在需要告警数据的组件中，从 `services` (**通过 `index.ts` 入口**) 导入并使用服务函数。同时，根据 `service` 函数的返回类型，从 `api` (**通过 `index.ts` 入口**) 导入相应的类型进行标注。

## 更新记录

-   2025-04-28: 根据四大屏功能重构数据层目录结构和命名，统一架构描述，创建此 README 文件。
-   2025-04-28: 更新类型定义策略，推荐将类型分散到模块文件和公共类型文件，而非集中在 `types.ts`。