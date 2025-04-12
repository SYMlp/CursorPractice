# 组件库

本目录包含安全大屏项目的可复用UI组件。组件采用模块化设计，可在各个大屏页面中灵活组合使用。

## 目录结构

- `/cards`: 数据卡片组件
  - `ResourceCard.tsx`: 资源管理卡片，展示资源总量和增长情况
  - `RuleCard.tsx`: 安全规则卡片，展示规则统计数据
  - `InterfaceCard.tsx`: 接口管理卡片，展示接口数量和安全率
  - `MetricCard.tsx`: 通用指标卡片，展示单一指标
  - `RankingCard.tsx`: 排名卡片，展示TOP数据
  - `StatsCard.tsx`: 统计卡片，展示多项指标
  
- `/charts`: 图表可视化组件
  - `BarChart.tsx`: 柱状图，用于比较不同类别的数量
  - `CircularProgress.tsx`: 环形进度图，显示百分比完成情况
  - `LineChart.tsx`: 折线图，展示时间序列数据
  - `MultiLineChart.tsx`: 多线折线图，比较多组时间序列数据
  - `NetworkTopology.tsx`: 网络拓扑图，展示网络连接关系
  - `PieChart.tsx`: 饼图/环图，展示占比分布
  
- `/icons`: 图标组件
  - `Icons.tsx`: 基础图标集合
  - `AssetIcons.tsx`: 资产相关图标
  - `MonitoringIcons.tsx`: 监控相关图标

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

- 2023-11-01: 初始版本 