# 页面组件

本目录包含安全大屏项目的主要页面组件，负责各个功能大屏的整体布局和组件组合。

## 文件说明

- `SecurityMonitoring.tsx`: 数据资产防护大屏
- `AssetMonitoring.tsx`: 资产监测大屏
- `InterfaceMonitoring.tsx`: 接口监控大屏

> 注意：资源管理大屏组件在根目录的`App.tsx`中作为内部组件实现。

## 页面组件设计原则

1. **职责聚焦**: 页面组件负责页面布局和组合，不包含复杂业务逻辑
2. **组件组合**: 通过组合复用性强的卡片和图表实现复杂页面
3. **数据分离**: 页面组件从数据层获取数据，但不直接处理数据
4. **一致体验**: 所有页面保持一致的设计语言和交互模式

## 页面详细说明

### SecurityMonitoring.tsx (数据资产防护大屏)

**功能描述**：
监控和展示数据资产的安全防护情况，包括风险资源监控、防护能力评估等。

**主要区域**：
- 顶部统计数据卡片：展示总体安全指标
- 存在存储风险的数据资源TOP：展示高风险资源列表
- 存在防护能力缺失的数据资源TOP：展示防护能力不足的资源
- 风险最多业务资源TOP：展示风险资源排行
- 高风险数据使用风险最多人TOP：展示高风险用户排行
- 风险类型趋势：展示风险趋势变化

**使用的组件**：
- 自定义标签组件：RiskTag、CapabilityTag
- 表格和排行组件
- LineChart：展示趋势图表

### AssetMonitoring.tsx (资产监测大屏)

**功能描述**：
监控和展示资产状况，包括资产交互量、风险监控、用户行为分析等。

**主要区域**：
- 顶部导航标签：提供页面内导航
- 搜索和筛选区域：用于资产筛选
- 统计数据卡片：展示资产总数和分类数据
- 数据交互量应用TOP：展示交互量最高的应用
- 风险最多业务应用TOP：展示风险最多的应用
- 探索登录用户TOP：展示登录用户柱状图
- 数据使用风险最多人员TOP：展示高风险用户
- 业务行业分布：展示行业占比
- 告警类型分布：展示告警类型分布
- 业务态势趋势：展示历史趋势

**使用的组件**：
- BarChart：展示登录用户排行
- PieChart：展示分布情况
- 各种排行卡片

### InterfaceMonitoring.tsx (接口监控大屏)

**功能描述**：
监控和展示接口安全状况和性能指标，包括网络拓扑、TPS、连接数等。

**主要区域**：
- 顶部指标卡：展示关键接口指标
- 接口网络拓扑：展示接口网络关系
- 每分钟平均TPS：展示TPS时间趋势
- 每分钟网络连接数：展示连接数趋势
- 每分钟应用层详情：展示应用层数据
- 每分钟服务安全检测点：展示安全检测数据

**使用的组件**：
- MetricCard：展示指标数据
- NetworkTopology：展示网络拓扑图
- MultiLineChart：展示多维时间序列数据

## 路由管理

项目使用简单的状态管理实现页面切换，在`App.tsx`中通过状态`activePage`控制显示哪个页面：

```tsx
const [activePage, setActivePage] = useState<'resources' | 'monitoring' | 'asset' | 'security'>('resources');

// 根据状态显示不同页面
{activePage === 'resources' && <ResourceDashboard />}
{activePage === 'monitoring' && <InterfaceMonitoring />}
{activePage === 'asset' && <AssetMonitoring />}
{activePage === 'security' && <SecurityMonitoring />}
```

## 页面扩展指南

如需添加新的大屏页面，请遵循以下步骤：

1. 在本目录创建新的页面组件文件，如`NewDashboard.tsx`
2. 按照现有页面的结构，实现新页面的布局和组件组合
3. 在`App.tsx`中添加状态和导航按钮
4. 在路由判断中添加新页面的渲染条件

示例：
```tsx
// 在App.tsx中
const [activePage, setActivePage] = useState<'resources' | 'monitoring' | 'asset' | 'security' | 'new'>('resources');

// 添加导航按钮
<button onClick={() => setActivePage('new')}>新大屏</button>

// 添加路由判断
{activePage === 'new' && <NewDashboard />}
```

## 更新记录

- 2023-11-01: 初始版本 