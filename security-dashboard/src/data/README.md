# 安全仪表盘数据层

本目录包含安全仪表盘应用的所有数据相关代码，采用分层架构设计，便于后期从模拟数据切换到真实API。

## 目录结构

```
data/
├── api/                # API接口层 - 处理与服务器的通信
│   ├── asset.ts        # 资产相关API
│   ├── platform.ts     # 平台概览相关API
│   ├── interface.ts    # 接口监控相关API
│   ├── security.ts     # 安全监控相关API
│   ├── types.ts        # API通用类型定义
│   └── index.ts        # 统一导出
├── mock/               # 模拟数据层 - 提供开发和测试用的模拟数据
│   ├── asset/          # 资产监控模拟数据
│   ├── platform/       # 平台概览模拟数据
│   ├── interface/      # 接口监控模拟数据
│   ├── security/       # 安全监控模拟数据
│   └── common/         # 公共模拟数据
├── services/           # 服务层 - 组合API调用，提供业务逻辑
│   ├── assetService.ts
│   ├── platformService.ts
│   ├── interfaceService.ts
│   └── securityService.ts
└── utils/              # 数据工具 - 提供数据处理工具函数
    ├── formatters.ts   # 数据格式化工具
    └── transformers.ts # 数据转换工具
```

## 设计原则

1. **分层职责清晰**
   - API层：负责与后端API通信，处理请求和响应
   - 模拟数据层：提供开发和测试阶段的数据支持
   - 服务层：封装业务逻辑，组合API调用
   - 工具层：提供通用的数据处理函数

2. **统一的数据流**
   - 组件 → 服务层 → API层 → 后端
   - 后端 → API层 → 服务层 → 组件

3. **模拟数据与真实API切换**
   - 通过环境变量控制是否使用模拟数据
   - API层负责判断并选择数据来源
   - 服务层和组件代码无需修改

4. **类型安全**
   - 所有数据结构都有明确的TypeScript类型定义
   - API响应有统一的类型包装
   - 模拟数据符合真实API的数据结构

## 使用方式

### 在组件中使用服务

```typescript
import { useEffect, useState } from 'react';
import { getAssetStats } from '../data/services/assetService';

function AssetStatsComponent() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getAssetStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 渲染组件...
}
```

### 环境变量配置

在项目根目录的 `.env` 文件中配置:

```
# 是否使用模拟数据
REACT_APP_USE_MOCK=true

# API基础URL
REACT_APP_API_BASE_URL=http://localhost:3000/api
```

在生产环境 `.env.production` 中可以修改为:

```
REACT_APP_USE_MOCK=false
REACT_APP_API_BASE_URL=https://api.example.com
```

## 添加新功能流程

1. 在 `api/types.ts` 中定义数据类型
2. 在对应模块的模拟数据目录中添加模拟数据
3. 在 API 层中添加相应的接口函数
4. 在服务层中添加业务逻辑处理函数
5. 在组件中通过服务层函数获取数据

## 更新记录

- 2024-07-13: 初始化数据层架构设计
- 2024-07-12: 完成资产监控模块的模拟数据迁移

## 数据层

本目录包含安全大屏项目的数据层，提供各个大屏页面所需的模拟数据和数据模型定义。

## 文件说明

- `mockData.ts`: 资源管理大屏的模拟数据
- `monitoringData.ts`: 接口监控大屏的模拟数据
- `assetData.ts`: 资产监测大屏的模拟数据
- `securityMonitoringData.ts`: 数据资产防护大屏的模拟数据
- `assetFlowData.ts`: 资产流程图的模拟数据，用于AssetFlowChart组件

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

### 资产流程图数据模型

```typescript
// 节点数据
interface FlowNode {
  id: string;         // 节点ID
  type: string;       // 节点类型（'application'|'user'|'alert'）
  data: {             // 节点数据
    label: string;    // 节点标签
    details?: string; // 节点详情
  };
  position: {         // 节点位置
    x: number;
    y: number;
  };
}

// 连接数据
interface FlowEdge {
  id: string;                // 连接ID
  source: string;            // 源节点ID
  target: string;            // 目标节点ID
  label?: string;            // 连接标签
  type?: string;             // 连接类型
  riskLevel?: string;        // 风险等级
  animated?: boolean;        // 是否动画
  style?: React.CSSProperties; // 样式
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

- 2024-06-25: 更新README，添加assetFlowData.ts文件说明
- 2023-11-01: 初始版本 

## 数据层开发规范总结

### 数据设计基本原则
1. **类型安全**:
   - 所有数据结构使用TypeScript接口明确定义
   - 避免使用any类型，优先选择明确的类型
   - 为复杂嵌套数据提供清晰的类型定义

2. **数据分层**:
   - 按功能模块组织数据文件
   - 相关数据放在同一文件中
   - 复杂数据可以拆分为多个相关文件

3. **一致性**:
   - 保持数据命名的一致性，如xxxData命名模式
   - 相似数据使用相似的数据结构
   - 保持数据格式的一致性，如日期格式、数值精度等

4. **可扩展性**:
   - 设计便于扩展的数据结构
   - 预留适当的字段，考虑未来需求
   - 模块化组织，方便新增功能时添加数据

### 数据文件组织规范
1. **文件结构**:
   ```typescript
   // 1. 类型定义
   export interface ResourceType {
     id: string;
     name: string;
     count: number;
     status: 'active' | 'inactive';
     details?: {
       createTime: string;
       updateTime: string;
       owner: string;
     };
   }
   
   // 2. 常量/枚举定义
   export enum ResourceStatus {
     ACTIVE = 'active',
     INACTIVE = 'inactive'
   }
   
   // 3. 模拟数据
   export const resourcesData: ResourceType[] = [
     {
       id: 'r001',
       name: '资源1',
       count: 100,
       status: 'active',
       details: {
         createTime: '2023-10-01',
         updateTime: '2023-11-15',
         owner: '系统管理员'
       }
     },
     // 更多数据...
   ];
   
   // 4. 辅助函数（如有需要）
   export const getActiveResources = () => {
     return resourcesData.filter(res => res.status === 'active');
   };
   ```

2. **命名规范**:
   - 文件名使用camelCase: `resourceData.ts`
   - 类型名使用PascalCase: `ResourceType`
   - 常量使用UPPER_SNAKE_CASE: `DEFAULT_COUNT`
   - 变量和函数名使用camelCase: `resourcesData`

3. **导出规范**:
   - 所有需要共享的类型和数据使用named export导出
   - 避免使用default export，除非整个文件只有一个导出项
   - 相关的类型和数据一起导出，保持内聚性

### 数据模拟最佳实践
1. **数据真实性**:
   - 模拟数据应尽可能接近真实数据
   - 数值范围应合理，避免超出实际场景的极值
   - 使用真实的分类名称和标签

2. **数据多样性**:
   - 提供不同类型和状态的数据样本
   - 覆盖各种边界情况和特殊场景
   - 包含一定数量的数据，足以测试分页和性能

3. **数据一致性**:
   - 相关数据之间保持逻辑一致性
   - ID和引用关系正确
   - 统计数据和明细数据匹配

4. **动态数据生成**:
   - 为不同场景提供数据生成函数
   - 支持参数化生成不同规模和特性的数据
   - 支持随机性，但可控的随机性

### 数据使用指南
1. **数据获取方式**:
   ```typescript
   // 从data层导入数据
   import { resourcesData, ResourceType } from '../data/resourceData';
   
   // 在组件中使用
   const ResourceList: React.FC = () => {
     // 可以直接使用静态数据
     const resources = resourcesData;
     
     // 或者使用useState进行状态管理
     const [resources, setResources] = useState<ResourceType[]>(resourcesData);
     
     return (
       <div>
         {resources.map(resource => (
           <div key={resource.id}>{resource.name}</div>
         ))}
       </div>
     );
   };
   ```

2. **数据处理**:
   - 数据的处理逻辑应集中在hooks或辅助函数中
   - 避免在组件渲染函数中进行复杂的数据处理
   - 使用useMemo缓存计算结果

3. **数据过滤和转换**:
   - 使用Array的map、filter、reduce等方法处理数据
   - 复杂的数据转换逻辑封装为单独的函数
   - 保持原始数据不变，返回新数据

### 数据模拟到实际API的过渡
1. **接口兼容设计**:
   - 模拟数据的结构应与后端API的响应结构一致
   - 预留分页、排序、筛选的参数
   - 考虑错误处理和异常场景

2. **API封装**:
   ```typescript
   // api/resources.ts
   import { resourcesData, ResourceType } from '../data/resourceData';
   
   // 模拟API调用延迟
   const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
   
   // 获取资源列表
   export const fetchResources = async (): Promise<ResourceType[]> => {
     try {
       // 模拟网络延迟
       await delay(300);
       
       // 在实际项目中，这里将替换为真实的API调用
       // const response = await fetch('/api/resources');
       // return await response.json();
       
       // 目前使用模拟数据
       return resourcesData;
     } catch (error) {
       console.error('Error fetching resources:', error);
       throw error;
     }
   };
   
   // 获取单个资源
   export const fetchResourceById = async (id: string): Promise<ResourceType | null> => {
     await delay(200);
     const resource = resourcesData.find(r => r.id === id);
     return resource || null;
   };
   ```

3. **使用API封装**:
   ```typescript
   import { useState, useEffect } from 'react';
   import { fetchResources, ResourceType } from '../api/resources';
   
   const ResourceList: React.FC = () => {
     const [resources, setResources] = useState<ResourceType[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<Error | null>(null);
     
     useEffect(() => {
       const loadResources = async () => {
         try {
           setLoading(true);
           const data = await fetchResources();
           setResources(data);
           setError(null);
         } catch (err) {
           setError(err as Error);
         } finally {
           setLoading(false);
         }
       };
       
       loadResources();
     }, []);
     
     if (loading) return <div>Loading...</div>;
     if (error) return <div>Error: {error.message}</div>;
     
     return (
       <div>
         {resources.map(resource => (
           <div key={resource.id}>{resource.name}</div>
         ))}
       </div>
     );
   };
   ```

### 性能考虑
1. **大数据集处理**:
   - 对于大量数据，考虑分页或虚拟滚动
   - 避免在组件中进行大量数据的计算和处理
   - 使用缓存减少重复计算

2. **数据缓存**:
   - 考虑使用React Query或SWR等库进行数据缓存
   - 实现本地缓存，减少不必要的数据请求
   - 合理设置缓存失效时间

3. **数据预处理**:
   - 数据提前处理成组件需要的格式，减少渲染时的计算
   - 复杂统计数据在数据层提前计算
   - 优化数据结构，便于查找和访问

遵循以上规范和最佳实践，可以确保数据层的整洁、类型安全和可维护性，同时为将来接入真实API提供平滑的过渡路径。 