# 组件库

本目录包含安全大屏项目的可复用UI组件。组件采用模块化设计，可在各个大屏页面中灵活组合使用。

## 目录结构

- `/cards`: 数据卡片组件
  - `ResourceCard.tsx`: 资源管理卡片，展示资源总量和增长情况 (用于平台概览页)
  - `RuleCard.tsx`: 安全规则卡片，展示规则统计数据 (用于平台概览页)
  - `InterfaceCard.tsx`: 接口管理卡片，展示接口数量和安全率 (用于平台概览页)
  - `MetricCard.tsx`: 通用指标卡片，展示单一指标 (用于接口监控页)
  
- `/charts`: 图表可视化组件
  - `BarChart.tsx`: 柱状图，用于比较不同类别的数量 (用于资产监测页)
  - `CircularProgress.tsx`: 环形进度图，显示百分比完成情况 (用于平台概览页)
  - `LineChart.tsx`: 折线图，展示时间序列数据 (用于多个页面)
  - `MultiLineChart.tsx`: 多线折线图，比较多组时间序列数据 (用于接口监控页)
  - `PieChart.tsx`: 饼图/环图，展示占比分布 (用于平台概览页和资产监测页)
  - `DonutChart.tsx`: 环形图，用于展示占比数据 (用于多个页面)
  - `EnhancedDonutChart.tsx`: 增强型环形图，展示告警类型分布等 (用于资产监测页)
  - `TopRankingCard.tsx`: 排名卡片组件，展示TOP数据 (用于资产监测页)
  
- `/networks`: 网络与流程图组件
  - `AssetFlowChart.tsx`: 资产流程图，展示应用、用户和告警之间的关系
  - `ResourceFlowChart.tsx`: 资源流程图，展示复杂资源关系和数据流
  - `NetworkTopology.tsx`: 网络拓扑图，展示网络连接关系 (用于接口监控页)
  - `/nodes`: 节点组件，用于流程图的自定义节点
     - `PersonNode.tsx`: 人员节点
     - `ApplicationNode.tsx`: 应用节点
     - `ServiceNode.tsx`: 服务节点
     - `ResourceNode.tsx`: 资源节点
     - `TaskNode.tsx`: 任务节点

- `/icons`: 图标组件
  - `Icons.tsx`: 基础图标集合
  - `AssetIcons.tsx`: 资产相关图标
  - `MonitoringIcons.tsx`: 监控相关图标

- `/tags`: 标签组件
  - `index.tsx`: 包含各类标签组件
    - `RiskTag`: 风险标签，展示风险类型和等级
    - `CapabilityTag`: 能力标签，展示防护能力类型
    - `CustomTooltip`: 提示组件，处理长文本的悬浮提示

## AssetFlowChart 组件详细说明

`AssetFlowChart` 组件是基于 ReactFlow 库开发的资产访问关系图组件，用于可视化展示应用系统、用户和告警事件之间的交互关系。该组件高度可定制，具有丰富的交互功能和美观的视觉效果。

### 组件特性

1. **多种节点类型**
   - 应用节点(application)：表示业务应用系统，如人力资源系统、客户关系管理系统等
   - 用户节点(user)：表示访问应用的用户，包含部门信息
   - 告警节点(alert)：表示系统检测到的安全告警事件

2. **差异化连线样式**
   - 正常访问关系：蓝色实线，表示用户对应用的常规访问
   - 告警关联关系：红色实线，表示用户与告警的直接关联
   - 告警溯源关系：红色虚线，表示应用与告警的间接关联

3. **丰富的交互功能**
   - 节点拖拽：支持节点自由移动，调整布局
   - 缩放平移：通过鼠标滚轮和拖拽调整视图
   - 细节查看：点击节点或连线显示详细信息
   - 小地图导航：提供整体视图，便于定位和导航
   - 图例说明：清晰标识不同类型节点的含义

4. **视觉美化**
   - 差异化颜色：不同类型节点使用不同颜色区分
   - 动画效果：连线动画、交互反馈
   - 悬停效果：鼠标悬停时显示阴影增强
   - 圆角设计：节点采用圆角矩形设计，更加柔和美观

### 使用示例

```jsx
import AssetFlowChart from '../components/networks/AssetFlowChart';

// 组件中使用
<div className="h-[calc(100%-3.5rem)]">
  <AssetFlowChart 
    nodes={assetFlowChartData.nodes}
    edges={assetFlowChartData.edges}
    onNodeClick={handleNodeClick}
    onEdgeClick={handleEdgeClick}
  />
</div>
```

### 数据格式

**节点数据格式**:
```typescript
{
  id: string,            // 节点唯一标识
  type: 'application' | 'user' | 'alert', // 节点类型
  position: { x: number, y: number }, // 节点位置
  data: {                // 节点数据
    label: string,       // 节点标签文本
    details: string,     // 节点详细信息
    type: string         // 节点类型(冗余)
  }
}
```

**连线数据格式**:
```typescript
{
  id: string,            // 连线唯一标识
  source: string,        // 源节点ID
  target: string,        // 目标节点ID
  animated: boolean,     // 是否启用动画
  type: string,          // 连线类型
  style: {               // 连线样式
    stroke: string,      // 线条颜色
    strokeWidth: number, // 线条宽度
    strokeDasharray?: string // 虚线样式
  },
  label?: string,        // 连线标签
  data?: {               // 连线额外数据
    accessCount?: number, // 访问次数
    risk?: string,        // 风险等级
    alertType?: string,   // 告警类型
    severity?: string,    // 严重程度
    relationType?: string // 关联类型
  }
}
```

## 各页面使用组件列表

### 平台概览页面 (PlatformOverview.tsx)

**基础统计卡片区域**:
- `ResourceCard`: 展示资源总量和增长情况
- `RuleCard`: 展示安全规则统计数据
- `InterfaceCard`: 展示接口管理信息

**可视化图表区域**:
- `CircularProgress`: 展示资源类型百分比
- `PieChart`: 展示接口安全分布
- `LineChart`: 展示各类服务时间序列数据（南向接口、识别服务、防护服务等）

**其他组件**:
- 各类图标组件（如资源图标、身份图标、规则图标等）
- 时间范围选择器（内嵌组件）
- 加载状态指示器（内嵌组件）

### 接口监控页面 (InterfaceMonitoring.tsx)

**基础统计卡片区域**:
- `MetricCard`: 展示各类接口指标数据

**可视化图表区域**:
- `NetworkTopology`: 展示接口网络拓扑关系
- `MultiLineChart`: 展示各类时间序列数据
  - 每分钟平均TPS
  - 每分钟网络连接数
  - 每分钟应用层详情
  - 每分钟服务安全检测点

**图标组件**:
- `MonitoringIcons`: 提供各种监控相关图标
  - ServerIcon: 服务器图标
  - ApiIcon: API接口图标
  - ConnectionIcon: 连接图标
  - RequestIcon: 请求图标
  - ResponseIcon: 响应图标
  - MonitorIcon: 监控图标

### 应用资产监测页面 (AssetMonitoring.tsx)

**基础统计卡片区域**:
- 自定义卡片: 展示告警数、访问者数、应用数等指标

**可视化图表区域**:
- `AssetFlowChart`: 展示应用、用户和告警之间的关系，包含风险等级连线
- `LineChart`: 展示业务应用访问量趋势
- `PieChart`: 展示告警类型分布
- `BarChart`: 用于展示图表数据

**排行榜区域**:
- 自定义卡片: 展示各类TOP榜单
  - 数据交互量应用TOP
  - 频繁登录用户TOP
  - 风险最多业务应用TOP
  - 数据使用风险最多人员TOP

### 数据资产防护监测页面 (DataAssetMonitoring.tsx)

**基础统计卡片区域**:
- 自定义卡片: 展示数据总量、数据分类数、数据分级数等指标

**可视化图表区域**:
- `ResourceFlowChart`: 展示资源访问链路图，包含用户、任务、应用、服务、数据等节点
- `LineChart`: 展示风险类型趋势

**标签和提示组件**:
- `/tags` 目录下的组件:
  - `RiskTag`: 展示风险类型标签，如"存储空间不足"、"备份文件损坏"等
  - `CapabilityTag`: 展示防护能力标签，如"权限管控"、"多维认证"等
  - `CustomTooltip`: 提供长文本的悬浮提示

**排行榜区域**:
- 自定义卡片: 展示各类TOP榜单
  - 存在存储风险的数据资源TOP
  - 存在防护能力缺失的数据资源TOP
  - 风险最多数据资源TOP
  - 高风险数据使用风险最多人TOP

## 组件设计原则

1. **可重用性**: 组件设计为可重用的独立单元，可在多个页面中使用
2. **可配置性**: 组件提供丰富的配置选项，通过props传递
3. **类型安全**: 所有组件均使用TypeScript接口定义props类型
4. **响应式**: 组件支持响应式布局，适应不同屏幕尺寸

## 组件使用指南

### 卡片组件使用

卡片组件用于展示关键指标和数据，一般接收以下props：

- `title`: 卡片标题
- `icon`: 卡片图标(可选)
- `data`/`count`/`metrics`: 要展示的数据
- `color`: 主题颜色(可选)

示例：
```tsx
<MetricCard
  title="接口总数"
  value="1,234"
  color="blue"
  icon={<ApiIcon size={28} />}
/>
```

### 图表组件使用

图表组件基于ECharts封装，通常接收以下props：

- `data`/`series`: 图表数据
- `xAxisData`: X轴数据(适用于折线图、柱状图)
- `title`: 图表标题(可选)
- `showLegend`: 是否显示图例(默认false)
- `height`: 图表高度(可选)

示例：
```tsx
<LineChart 
  title="接口调用趋势"
  xAxisData={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
  series={[{name: '调用次数', data: [150, 230, 224, 218, 135]}]}
  showLegend={true}
/>
```

### 资产流程图使用

`AssetFlowChart` 组件基于ReactFlow开发，展示应用、用户和告警之间的关系：

```tsx
<AssetFlowChart />
```

组件内置了示例数据，也可以通过props传入自定义数据：

```tsx
<AssetFlowChart 
  nodes={customNodes}
  edges={customEdges}
/>
```

### 标签组件使用

标签组件用于展示风险类型、防护能力等信息，使用方式：

```tsx
<RiskTag text="存储空间不足" />
<CapabilityTag text="权限管控" />
<CustomTooltip title="这是一段很长的文字描述，需要通过悬浮提示展示">
  <span>短文本</span>
</CustomTooltip>
```

## 图标使用指南

图标组件通常接收以下props：

- `size`: 图标大小(默认24)
- `color`: 图标颜色(可选)
- `className`: 自定义CSS类名(可选)

示例：
```tsx
<DatabaseIcon size={20} color="#3B82F6" />
```

## 更新记录

- 2024-06-25: 更新README，将引用的SecurityMonitoring.tsx改为DataAssetMonitoring.tsx，与实际文件结构保持一致
- 2024-06-17: 清理了未被四个大屏页面使用的组件，包括PasswordRuleCard、RankingCard、StatsCard和ResourceFlowChart_old组件
- 2024-06-16: 优化数据资产防护监测大屏，添加ResourceFlowChart组件，创建标签组件目录和相关组件
- 2024-06-15: 优化AssetFlowChart组件，增强展示效果，支持更多节点类型和风险等级标识
- 2024-06-10: 更新组件库README，加入平台概览和接口监控页面使用的组件列表和详细描述
- 2023-11-01: 初始版本 

## 组件开发规范总结

### 组件设计基本原则
1. **单一职责**: 
   - 每个组件应专注于单一的功能职责
   - 避免"大而全"的组件，倾向于拆分为多个小组件
   - 遵循"关注点分离"的原则设计组件

2. **可复用性优先**:
   - 组件设计时考虑复用场景，不针对单一使用场景设计
   - 通过props提供灵活的配置选项，增强适用性
   - 避免硬编码，尽量参数化可变内容

3. **类型安全**:
   - 所有组件的props使用TypeScript接口明确定义
   - 为复杂对象提供明确的类型定义
   - 使用可选属性(?)标记非必需的props

4. **一致性**:
   - 保持组件API设计的一致性，如命名风格、参数传递方式等
   - 视觉风格和交互方式保持一致
   - 错误处理和加载状态处理方式一致

### 组件开发流程
1. **需求分析**:
   - 明确组件的功能需求和使用场景
   - 确定组件的输入(props)和输出(渲染结果/事件)
   - 确定组件的状态和行为

2. **接口设计**:
   - 设计清晰的props接口，明确必需和可选属性
   - 设计回调函数接口，用于组件与外部的通信
   - 考虑组件的扩展点，为未来需求预留空间

3. **实现**:
   - 按照设计的接口实现组件功能
   - 注重代码可读性和维护性
   - 实现适当的错误处理和边界情况处理

4. **测试和文档**:
   - 编写单元测试确保组件功能正确
   - 为组件提供使用示例和文档
   - 记录组件的更新历史和变更

### 组件结构规范
1. **文件组织**:
   - 相关组件放在同一目录下
   - 使用index.ts文件统一导出目录下的组件
   - 复杂组件可拆分为多个子文件

2. **代码结构**:
   ```tsx
   // 1. 导入
   import React, { useState, useEffect } from 'react';
   import './component.css'; // 如果有独立样式文件
   
   // 2. 类型定义
   interface ComponentProps {
     title: string;
     data: DataType[];
     onAction?: (item: DataType) => void;
   }
   
   interface DataType {
     id: string;
     name: string;
   }
   
   // 3. 组件定义
   const MyComponent: React.FC<ComponentProps> = ({ 
     title, 
     data,
     onAction
   }) => {
     // 3.1 状态管理
     const [activeItem, setActiveItem] = useState<string | null>(null);
     
     // 3.2 副作用
     useEffect(() => {
       // 处理副作用
     }, [data]);
     
     // 3.3 事件处理
     const handleItemClick = (item: DataType) => {
       setActiveItem(item.id);
       if (onAction) {
         onAction(item);
       }
     };
     
     // 3.4 辅助渲染函数
     const renderItems = () => {
       return data.map(item => (
         <div 
           key={item.id} 
           onClick={() => handleItemClick(item)}
         >
           {item.name}
         </div>
       ));
     };
     
     // 3.5 主渲染
     return (
       <div className="my-component">
         <h2>{title}</h2>
         <div className="items-container">
           {renderItems()}
         </div>
       </div>
     );
   };
   
   // 4. 导出
   export default MyComponent;
   ```

3. **样式处理**:
   - 优先使用Tailwind CSS类名管理样式
   - 复杂组件可使用CSS Module或styled-components
   - 避免内联样式，除非是动态计算的值

### 组件开发最佳实践
1. **状态管理**:
   - 最小化组件内部状态，只保留UI状态
   - 使用props传递数据和回调函数
   - 复杂状态逻辑考虑使用useReducer

2. **性能优化**:
   - 使用React.memo避免不必要的重渲染
   - 使用useCallback缓存回调函数
   - 使用useMemo缓存计算结果
   - 大列表考虑虚拟化技术

3. **错误处理**:
   - 实现合理的错误边界
   - 优雅处理空数据和加载状态
   - 为用户提供清晰的错误反馈

4. **组件通信**:
   - 父子组件通过props和回调函数通信
   - 远亲组件可考虑使用Context API
   - 复杂应用考虑状态管理库(Redux、MobX等)

5. **可访问性**:
   - 合理使用HTML语义化标签
   - 提供适当的ARIA标签和角色
   - 确保键盘可访问性
   - 考虑颜色对比度和屏幕阅读器支持

### 特定类型组件的开发指南
1. **图表组件**:
   - 基于ECharts封装，提供统一的配置接口
   - 处理响应式调整和主题切换
   - 优化交互性能，特别是大数据量场景

2. **表单组件**:
   - 支持受控和非受控两种使用方式
   - 提供表单验证能力
   - 统一的错误提示和样式

3. **列表/表格组件**:
   - 支持排序、筛选、分页等基本功能
   - 大数据量时考虑虚拟滚动
   - 统一的空状态和加载状态处理

4. **布局组件**:
   - 灵活的网格系统
   - 响应式设计，适应不同屏幕尺寸
   - 支持嵌套和组合

遵循以上规范和最佳实践，可以确保组件的质量、可维护性和可复用性，减少开发和维护成本，提高团队协作效率。 