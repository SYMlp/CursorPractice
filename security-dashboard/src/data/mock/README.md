# 模拟数据开发指南

## 模拟数据架构

模拟数据结构按照应用模块组织，确保与真实API响应保持一致的数据结构。整体架构设计遵循以下原则：

1. **分模块管理** - 按功能模块分类组织模拟数据
2. **类型一致性** - 确保模拟数据的类型结构与API返回一致
3. **数据真实性** - 模拟数据应尽量接近真实数据场景
4. **可扩展性** - 便于添加新的模拟数据集合和扩展现有数据

## 目录结构

```
src/data/mock/
├── README.md              # 模拟数据开发指南
├── index.ts               # 统一导出所有模拟数据
├── asset/                 # 资产管理相关数据
│   ├── assetMonitoringData.ts   # 资产监控数据
│   └── assetManagementData.ts   # 资产管理数据
├── security/              # 安全监控相关数据
│   ├── securityMetricsData.ts   # 安全指标数据
│   └── securityAlertsData.ts    # 安全告警数据
└── platform/              # 平台概览相关数据
    ├── platformStatsData.ts     # 平台统计数据
    └── platformTrendsData.ts    # 平台趋势数据
```

## 模拟数据开发规范

### 类型定义

为所有模拟数据创建明确的TypeScript接口和类型定义：

```typescript
// 定义数据结构接口
export interface DataItem {
  id: string;
  name: string;
  value: number;
  category: string;
}

// 定义枚举类型
export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}
```

### 数据生成规则

1. **静态数据** - 用于展示固定的数据集合，适用于下拉菜单、配置项等
2. **动态数据** - 包含生成函数，可根据参数返回不同的数据集合
   
```typescript
// 静态数据示例
export const staticDataItems: DataItem[] = [
  { id: '1', name: '项目A', value: 100, category: 'typeA' },
  { id: '2', name: '项目B', value: 200, category: 'typeB' }
];

// 动态数据生成函数示例
export const generateDynamicData = (timeRange: TimeRange): DataItem[] => {
  // 基于时间范围生成不同的数据集合
  if (timeRange === 'day') {
    return [...]; // 返回日数据
  } else if (timeRange === 'week') {
    return [...]; // 返回周数据
  } else {
    return [...]; // 返回月数据
  }
};
```

### 扩展数据规则

对于需要扩展的数据集合（如分页数据），应提供基础版本和扩展版本：

```typescript
// 基础版本（前5项）
export const topItems: Item[] = [...];

// 扩展版本（完整列表）
export const allItems: Item[] = [...];
```

## 使用指南

### 在组件中使用模拟数据

```typescript
import { assetStatsData, getChartData } from '@/data/mock/asset/assetMonitoringData';
import { TimeRange, ChartId } from '@/data/mock/asset/assetMonitoringData';

// 使用静态数据
const stats = assetStatsData;

// 使用动态生成的数据
const businessTrendData = getChartData('businessTrend', 'day');
```

### 添加新的模拟数据

1. 在对应模块目录下创建新的数据文件
2. 定义数据结构接口和类型
3. 创建静态数据集合和/或动态数据生成函数
4. 在模块的index.ts中导出新增数据
5. 如有必要，在总的src/data/mock/index.ts中重新导出

```typescript
// 1. 新建文件 src/data/mock/asset/newAssetData.ts
export interface NewAssetItem {
  // 定义接口...
}

export const newAssetData: NewAssetItem[] = [
  // 添加数据...
];

// 2. 在 src/data/mock/asset/index.ts 中导出
export * from './newAssetData';

// 3. 在总的 index.ts 中导出（如需要）
export * from './asset';
```

## 切换到真实API数据

模拟数据结构应与API响应保持一致，便于后期切换为真实API数据：

```typescript
// 数据服务示例
import { assetStatsData as mockAssetStatsData } from '@/data/mock/asset/assetMonitoringData';
import { fetchAssetStats } from '@/api/assetApi';

// 是否使用模拟数据的环境变量或配置开关
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

// 获取资产统计数据
export const getAssetStats = async () => {
  if (USE_MOCK_DATA) {
    return mockAssetStatsData;
  } else {
    return await fetchAssetStats();
  }
};
```

## 重要说明

1. 模拟数据仅用于开发和测试环境，生产环境应使用真实API数据
2. 定期更新模拟数据以匹配API变更
3. 确保模拟数据覆盖各种场景（空数据、异常情况等）
4. 保持数据质量和多样性，使界面测试更加全面 