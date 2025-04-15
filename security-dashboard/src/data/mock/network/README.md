# 网络关系图模拟数据

本目录包含用于网络和关系图组件的模拟数据，这些数据遵循项目的模拟数据开发规范，提供了一套完整的数据结构和示例数据。

## 数据文件

- **resourceFlowData.ts**: 资源流程图的模拟数据，包含节点和边的完整数据结构

## 数据结构

### 资源流程图数据结构

资源流程图使用ReactFlow库的核心数据结构，包括节点(Node)和边(Edge)，并进行了业务相关的扩展：

#### 节点数据 (NodeData)

```typescript
interface NodeData {
  label: string;                // 节点标签
  accessCount?: number;         // 访问次数
  frequency?: AccessFrequency;  // 访问频率
  riskLevel?: RiskLevel;        // 风险级别
  riskScore?: number;           // 风险评分(0-100)
  description?: string;         // 描述信息
}
```

#### 边数据 (EdgeData)

```typescript
interface EdgeData {
  frequency?: AccessFrequency;  // 访问频率
  accessCount?: number;         // 访问次数
  lastAccess?: string;          // 最后访问时间
  riskLevel?: RiskLevel;        // 风险级别
  riskScore?: number;           // 风险评分(0-100)
}
```

#### 枚举类型

- **AccessFrequency**: 访问频率枚举（低频、中频、高频、超高频）
- **RiskLevel**: 风险级别枚举（低风险、中风险、高风险、极高风险）

## 节点类型

资源流程图支持以下几种节点类型：

1. **资源节点 (resource)**: 代表数据资源
2. **服务节点 (service)**: 代表服务
3. **应用节点 (application)**: 代表应用系统
4. **任务节点 (task)**: 代表定时任务或批处理任务
5. **人员节点 (person)**: 代表用户或角色

## 数据集

模拟数据提供了两个主要数据集：

1. **基础数据集 (basic)**: 包含常规的节点和边数据
2. **异常数据集 (withAbnormal)**: 在基础数据集基础上增加了异常连接，用于测试异常场景

## 使用示例

```typescript
import resourceFlowData from '@/data/mock/network/resourceFlowData';

// 使用基础数据集
const { nodes, edges } = resourceFlowData.basic;

// 使用带异常连接的数据集
const { nodes: nodesWithAbnormal, edges: edgesWithAbnormal } = resourceFlowData.withAbnormal;

// 在组件中使用
const MyComponent = () => {
  const [nodes, setNodes] = useNodesState(resourceFlowData.basic.nodes);
  const [edges, setEdges] = useEdgesState(resourceFlowData.basic.edges);
  
  // 组件代码...
}
```

## 自定义数据扩展

如需扩展或修改模拟数据，可以在现有数据基础上进行调整：

```typescript
import { mockNodes, mockEdges } from '@/data/mock/network/resourceFlowData';

// 创建自定义数据集
const customNodes = [
  ...mockNodes,
  // 添加自定义节点
  {
    id: 'custom1',
    type: 'resource',
    data: { 
      label: '自定义数据资源', 
      // 其他属性...
    },
    position: { x: 700, y: 50 },
  }
];

// 使用自定义数据集
// ...
``` 