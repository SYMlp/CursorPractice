# 网络与流程图组件

该目录包含各种用于展示网络关系、流程图、拓扑图和关系图的复杂可视化组件。这些组件通常比简单的图表组件更为复杂，具有更多的交互特性和自定义逻辑。

## 组件列表

- `NetworkTopology.tsx`: 网络拓扑图组件，基于ECharts实现，用于展示网络节点和连接关系
- `AssetFlowChart.tsx`: 资产访问关系图组件，基于ReactFlow实现，用于展示应用、用户和告警之间的关系
- `ResourceFlowChart.tsx`: 资源流程图组件，基于ReactFlow实现，用于展示数据资源、服务、应用、任务和人员之间的复杂访问关系和风险状况
- `ResourceFlowLegend.tsx`: 资源流程图图例组件，用于解释ResourceFlowChart中各类节点和连线的含义
- `nodes/`: 节点组件子目录，包含用于ReactFlow的自定义节点组件
  - `ResourceNode`: 资源节点组件
  - `ServiceNode`: 服务节点组件
  - `ApplicationNode`: 应用节点组件
  - `TaskNode`: 任务节点组件
  - `PersonNode`: 人员节点组件

## 使用技术

目录中的组件主要基于以下两种技术实现：

1. **基于ECharts的组件**：
   - 使用ReactECharts封装
   - 适合静态展示和简单交互
   - 自带力导向图等布局算法
   - 示例：NetworkTopology

2. **基于ReactFlow的组件**：
   - 使用ReactFlow库
   - 支持复杂交互，如拖拽、连线等
   - 需要手动指定节点位置
   - 使用自定义节点组件，位于`nodes/`子目录
   - 示例：ResourceFlowChart, AssetFlowChart

## 使用指南

### ECharts类组件

```tsx
import NetworkTopology from '../components/networks/NetworkTopology';

// 在组件中使用
<div className="h-[400px]">
  <NetworkTopology />
</div>
```

### ReactFlow类组件

```tsx
import AssetFlowChart from '../components/networks/AssetFlowChart';

// 在组件中使用
<div className="h-[calc(100%-3.5rem)]">
  <AssetFlowChart 
    nodes={assetFlowChartData.nodes}
    edges={assetFlowChartData.edges}
    onNodeClick={handleNodeClick}
  />
</div>
```

### ResourceFlowChart组件

`ResourceFlowChart`是一个用于展示资源访问关系的高级流程图组件，基于ReactFlow实现。

特点：
- 展示数据资源、服务、应用、任务和人员之间的复杂访问关系
- 自动根据风险等级设置连线颜色和样式
- 内置节点详情展示面板，点击节点或连线即可查看详情
- 集成了ReactFlowProvider，可直接在页面中使用

用法示例：
```tsx
import { ResourceFlowChart, ResourceFlowLegend } from '../components/networks';

// 在组件中使用
<div className="h-[350px]">
  <ResourceFlowChart 
    onNodeClick={handleNodeClick}
    onEdgeClick={handleEdgeClick}
  />
  
  {/* 可选：添加图例说明 */}
  <ResourceFlowLegend />
</div>
```

组件的主要props：
- `onNodeClick`: 节点点击回调函数，接收被点击的节点作为参数
- `onEdgeClick`: 连线点击回调函数，接收被点击的连线作为参数

数据结构：
- 节点数据包含：标签、访问次数、访问频率、风险级别、风险评分和描述信息
- 连线数据包含：访问频率、访问次数、最后访问时间、风险级别和风险评分

风险级别与颜色对应：
- 极高风险：红色 (#ff4500)
- 高风险：橙色 (#ff8c00)
- 中风险：黄色 (#ffa500)
- 低风险：绿色 (#32cd32)

### ResourceFlowLegend组件

`ResourceFlowLegend`是配合`ResourceFlowChart`使用的图例说明组件，展示各类节点和连线的含义。

用法示例：
```tsx
import { ResourceFlowLegend } from '../components/networks';

// 通常与ResourceFlowChart组件一起使用
<div>
  <ResourceFlowChart />
  <ResourceFlowLegend />
</div>
```

图例包含以下内容：
- 节点类型说明：资源、服务、应用、任务、人员
- 连线风险等级说明：低风险、中风险、高风险、极高风险
- 特殊连接类型：异常连接（虚线表示）

该组件无需传入props，直接使用即可。推荐放置在`ResourceFlowChart`组件下方，形成完整的可视化展示区域。

## 目录结构

```
networks/
├── AssetFlowChart.tsx      # 资产访问关系图组件
├── ResourceFlowChart.tsx   # 资源流程图组件
├── NetworkTopology.tsx     # 网络拓扑图组件
├── index.ts                # 导出所有组件
├── README.md               # 本文档
└── nodes/                  # 节点组件子目录
    ├── ResourceNode.tsx    # 资源节点组件
    ├── ServiceNode.tsx     # 服务节点组件
    ├── ApplicationNode.tsx # 应用节点组件
    ├── TaskNode.tsx        # 任务节点组件
    ├── PersonNode.tsx      # 人员节点组件
    ├── nodes.css           # 节点样式
    ├── index.ts            # 导出所有节点组件
    └── README.md           # 节点组件文档
```

## 开发规范

1. **容器尺寸**：所有网络图组件应该在一个具有明确高度的容器中使用。
2. **响应式**：组件应支持容器尺寸变化并相应调整。
3. **交互处理**：对于交互事件，应提供合适的回调函数接口。
4. **性能优化**：对于大量节点的场景，应考虑性能优化措施。
5. **样式一致性**：保持项目内所有网络图组件的视觉风格一致。
6. **节点组件化**：使用`nodes/`子目录中的节点组件来创建自定义节点，保持代码结构统一。 