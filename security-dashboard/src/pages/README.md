# 页面组件

本目录包含安全大屏项目的主要页面组件，负责各个功能大屏的整体布局和组件组合。

## 文件说明

- `ResourceMonitoring.tsx`: 平台概览页 (导出PlatformOverview组件)
- `SecurityMonitoring.tsx`: 数据资产防护大屏
- `AssetMonitoring.tsx`: 资产监测大屏
- `InterfaceMonitoring.tsx`: 接口监控大屏
- `PasswordRules.tsx`: 密码安全规则管理页面
- `PasswordRuleDemo.tsx`: 密码规则组件演示页面

## 页面组件设计原则

1. **职责聚焦**: 页面组件负责页面布局和组合，不包含复杂业务逻辑
2. **组件组合**: 通过组合复用性强的卡片和图表实现复杂页面
3. **数据分离**: 页面组件从数据层获取数据，但不直接处理数据
4. **一致体验**: 所有页面保持一致的设计语言和交互模式

## 页面详细说明

### ResourceMonitoring.tsx (平台概览页)

**功能描述**：
安全防护系统的平台概览页，展示系统整体运行状况和关键指标。

**主要区域**：
- 资源管理：展示资源总量及增长趋势
- 资源类型：展示不同类型资源的占比分布
- 安全规则：展示各类安全规则的数量统计
- 接口管理：展示接口总量和安全分布情况
- 服务数据量：展示各类服务接口的数据量趋势
  - 南向接口数据量
  - 识别服务接口数据量
  - 防护服务数据量
  - 检测服务接口数据量
  - 响应服务接口数据量

**使用的组件**：
- ResourceCard：展示资源总量信息
- CircularProgress：展示资源类型百分比
- RuleCard：展示安全规则信息
- InterfaceCard：展示接口管理信息
- PieChart：展示接口安全分布
- LineChart：展示时间序列数据

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

### PasswordRules.tsx (密码安全规则管理)

**功能描述**：
管理和展示系统密码安全规则，包括复杂度规则、更新周期规则、历史复用规则等。

**主要区域**：
- 顶部操作按钮：提供添加、导出规则功能
- 规则卡片概览：展示各类密码规则的统计数据
- 规则详情表格：展示具体规则内容和操作入口

**使用的组件**：
- RuleCard：展示规则统计数据
- 详情表格：展示规则详细信息
- KeyIcon、ClockIcon等：表示不同类型的规则

**特点**：
- 支持多种密码规则类型的分类管理
- 提供规则状态（启用/待审批）的直观展示
- 可扩展的规则管理功能入口

### PasswordRuleDemo.tsx (密码规则组件演示)

**功能描述**：
展示专用的PasswordRuleCard组件使用效果，演示如何利用passwordRule图标。

**主要区域**：
- 顶部说明：页面功能介绍
- 卡片网格：展示不同状态和严重程度的密码规则卡片
- 使用说明：组件使用方法和特点说明

**使用的组件**：
- PasswordRuleCard：专用密码规则卡片组件，使用passwordRule图标

**特点**：
- 展示不同严重程度（高/中/低）的规则样式
- 展示规则启用/禁用状态的视觉表现
- 演示getIcon('passwordRule')的图标映射机制

## 路由管理

项目使用简单的状态管理实现页面切换，在`App.tsx`中通过状态`activePage`控制显示哪个页面：

```tsx
const [activePage, setActivePage] = useState<'resources' | 'monitoring' | 'asset' | 'security' | 'password' | 'passwordDemo'>('resources');

// 根据状态显示不同页面
{activePage === 'resources' && <PlatformOverview />}
{activePage === 'monitoring' && <InterfaceMonitoring />}
{activePage === 'asset' && <AssetMonitoring />}
{activePage === 'security' && <SecurityMonitoring />}
{activePage === 'password' && <PasswordRules />}
{activePage === 'passwordDemo' && <PasswordRuleDemo />}
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

- 2024-05-01: 完成文件名和组件名的统一，将ResourceMonitoring.tsx重命名为PlatformOverview.tsx，增强页面交互功能
- 2024-04-13: 优化平台概览页布局，使其更接近设计图，包括添加卡片边框、调整网格布局、优化环形进度图和折线图样式
- 2023-12-18: 优化PlatformOverview页面布局，使其更加紧凑；修复内容溢出问题；启用真实图片图标替代SVG图标
- 2023-12-15: 添加密码规则相关页面（PasswordRules和PasswordRuleDemo）
- 2023-11-28: 将ResourceMonitoring重命名为PlatformOverview，更准确反映其作为平台概览页的功能
- 2023-11-25: 将ResourceDashboard从App.tsx移至pages目录，重命名为ResourceMonitoring
- 2023-11-01: 初始版本 