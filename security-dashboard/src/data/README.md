# 数据层

本目录包含安全大屏项目的数据层，提供各个大屏页面所需的模拟数据和数据模型定义。

## 文件说明

- `mockData.ts`: 资源管理大屏的模拟数据
- `monitoringData.ts`: 接口监控大屏的模拟数据
- `assetData.ts`: 资产监测大屏的模拟数据
- `securityMonitoringData.ts`: 数据资产防护大屏的模拟数据

## 数据结构设计

项目采用TypeScript定义数据模型，保证类型安全和数据一致性。主要数据模型包括：

### 资源管理数据模型

```typescript
// 资源管理数据
interface ResourceManagementData {
  count: number;  // 资源总量
  metrics: {      // 资源分项指标
    label: string;
    count: number;
  }[];
  growthItems: {  // 增长指标
    label: string;
    count: number;
    trend: 'up' | 'down';
  }[];
}

// 资源类型数据
interface ResourceTypeData {
  title: string;     // 资源类型名称
  percentage: number; // 百分比
  color: string;     // 颜色
}

// 安全规则数据
interface SecurityRuleData {
  title: string;     // 规则名称
  count: number;     // 规则总数
  baseCount: number; // 基准数
  todayCount: number; // 今日新增
  color: string;     // 颜色
}

// 接口管理数据
interface InterfaceManagementData {
  count: number;      // 接口总数
  securityRate: number; // 安全率
  details: {          // 详情列表
    label: string;
    count: number;
  }[];
}
```

### 接口监控数据模型

```typescript
// 指标卡数据
interface MetricCardData {
  title: string;  // 指标名称
  value: string;  // 指标值
  color: string;  // 颜色
}

// 时间序列数据
interface TimeSeriesData {
  xAxis: string[];  // X轴时间点
  series: {
    name: string;   // 系列名称
    data: number[]; // 数据点
    type?: string;  // 图表类型
    areaStyle?: any; // 面积样式
  }[];
}
```

### 资产监测数据模型

```typescript
// 资产交互排名数据
interface AssetRankData {
  id: number;    // ID
  name: string;  // 名称
  value: string; // 数值
}

// 登录用户数据
interface LoginUserData {
  categories: string[];  // 用户类别
  data: number[];        // 数据值
}

// 分布数据
interface DistributionData {
  value: number;  // 值
  name: string;   // 名称
}
```

### 安全监控数据模型

```typescript
// 资产统计数据
interface AssetStatData {
  label: string;  // 标签
  value: string;  // 值
}

// 风险资源数据
interface RiskResourceData {
  id: number;    // ID
  name: string;  // 名称
  value: string; // 风险值
}

// 高风险用户数据
interface HighRiskUserData {
  id: number;    // ID
  name: string;  // 用户名
  value: string; // 风险值
}
```

## 数据组织原则

1. **模块化**: 按照不同大屏的功能需求组织数据
2. **类型化**: 所有数据结构使用TypeScript接口定义
3. **模拟真实**: 模拟数据尽量接近真实数据的分布和特征
4. **可替换性**: 设计便于未来替换为真实API数据

## 扩展数据层

当需要为新功能或新大屏添加数据时，请遵循以下步骤：

1. 在相应的数据文件中定义TypeScript接口
2. 创建符合接口的模拟数据
3. 导出数据，供组件使用
4. 更新本README文档，添加新数据结构说明

## 模拟数据替换为真实API指南

未来项目连接真实后端API时，可以：

1. 创建`api`目录，存放API调用相关代码
2. 保持数据结构不变，将模拟数据获取方式替换为API调用
3. 添加数据加载状态和错误处理
4. 实现数据缓存和更新策略

示例代码：
```typescript
// 从API获取资源管理数据
export const fetchResourceManagementData = async (): Promise<ResourceManagementData> => {
  try {
    const response = await fetch('/api/resources/management');
    if (!response.ok) {
      throw new Error('Failed to fetch resource management data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching resource management data:', error);
    // 发生错误时返回默认数据
    return defaultResourceManagementData;
  }
};
```

## 更新记录

- 2023-11-01: 初始版本 