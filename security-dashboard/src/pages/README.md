# 页面组件

本目录包含安全大屏项目的主要页面组件，负责各个功能大屏的整体布局和组件组合。

**请参考 `../data/README.md` 了解详细的数据层架构和数据获取方式。**

## 文件说明

- `PlatformOverview.tsx`: 平台概览页面
- `InterfaceMonitoring.tsx`: 接口监测大屏
- `AssetMonitoring.tsx`: 应用资产监测大屏
- `DataAssetMonitoring.tsx`: 数据资产监测大屏

**注意**: 本目录不使用 `index.ts` 文件。页面组件通常由路由 (`src/App.tsx`) 直接按需导入。

## 页面组件设计原则

1. **职责聚焦**: 页面组件负责页面布局和组合，不包含复杂业务逻辑
2. **组件组合**: 通过组合复用性强的卡片和图表实现复杂页面
3. **服务层交互**: 页面组件 **应通过调用 `src/data/services` 层的服务函数** 来获取和提交数据，管理相关的加载 (loading) 和错误 (error) 状态。**推荐通过 `services` 的 `index.ts` 统一入口导入所需服务函数** (例如: `import { getPlatformOverviewPageData } from '../data/services';`)。 **禁止直接导入和使用 `src/data/mock` 或 `src/data/api` 层。**
4. **一致体验**: 所有页面保持一致的设计语言和交互模式

## 页面详细说明

### PlatformOverview.tsx (平台概览)

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
- `/cards` 目录下的组件:
  - `ResourceCard`: 展示资源总量信息，包括环比增长
  - `InterfaceCard`: 展示接口管理信息，包括总量和安全率
- `/charts` 目录下的组件:
  - `CircularProgress`: 展示资源类型百分比分布
  - `PieChart`: 展示接口安全分布占比
  - `LineChart`: 展示各类服务的时间序列数据
- `/icons` 目录下的图标组件:
  - 各类系统图标和业务图标

**组件交互关系**:
- 时间范围选择控制图表数据范围显示
- 图表之间保持一致的设计语言和交互方式
- 卡片组件统一采用带图标的样式，提供直观的数据表达

### InterfaceMonitoring.tsx (接口监测大屏)

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
- `/cards` 目录下的组件:
  - `StatisticCard`: 展示接口监控相关的各项指标数据
- `/charts` 或 `/networks` 目录下的组件:
  - `NetworkTopology`: 展示接口网络拓扑图及节点关系 (来自 /networks)
  - `LineChart`: 展示各类时间序列数据 (来自 /charts)
- `/icons` 目录下的组件:
  - `MonitoringIcons.tsx` 中的监控相关图标:
    - ServerIcon: 服务器图标
    - ApiIcon: API接口图标
    - ConnectionIcon: 连接图标
    - RequestIcon: 请求图标
    - ResponseIcon: 响应图标
    - MonitorIcon: 监控图标

**组件交互关系**:
- 网络拓扑图支持节点交互和展示详情
- 时间序列图表支持时间范围切换
- 统一的卡片设计和布局风格，确保界面一致性

### AssetMonitoring.tsx (应用资产监测大屏)

**功能描述**：
监控和展示应用资产状况，包括应用交互量、风险监控、用户行为分析等。

**主要区域**：
- 顶部搜索和筛选区域：用于资产筛选
- 统计数据卡片：展示告警数、访问者数和应用数
- 数据交互量应用TOP：展示交互量最高的应用
- 频繁登录用户TOP：展示登录用户排行
- 风险最多业务应用TOP：展示风险最多的应用
- 数据使用风险最多人员TOP：展示高风险用户
- 应用关系图：展示应用、用户和告警之间的关系及风险等级
- 业务应用访问量趋势：展示历史趋势
- 告警类型分布：展示告警类型占比

**使用的组件**：
- `/cards` 或 `/charts` 目录下的组件:
  - `TopRankingCard`: 展示各类 TOP 排行榜 (来自 /charts)
  - (统计指标卡片使用普通 div 结合图标实现)
- `/networks` 目录下的组件:
  - `AssetFlowChart`: 展示应用资产流程图，包括应用、用户和告警节点
- `/charts` 目录下的组件:
  - `LineChart`: 展示业务应用访问量趋势
  - `EnhancedDonutChart`: 展示告警类型分布、安全分布、行业分布
- `/icons/AssetIcons` 目录下的组件:
  - `AlertIcon`, `UserIcon`, `ApplicationIcon`, `LoadingIcon` 等用于统计卡片和加载状态

**组件交互关系**:
- 资产流程图展示应用与用户之间的关系，支持不同风险等级的可视化
- 各个TOP榜单使用统一的设计风格，展示排名数据
- 趋势图和分布图提供数据分析视图

### DataAssetMonitoring.tsx (数据资产监测大屏)

**功能描述**：
监控和展示数据资产的安全防护情况，包括风险资源监控、防护能力评估等。

**主要区域**：
- 顶部统计卡片：展示数据总量、数据分类数和数据分级数
- 存在存储风险的数据资源TOP：展示存在存储风险的数据资源排行
- 存在防护能力缺失的数据资源TOP：展示防护能力不足的资源排行
- 风险最多数据资源TOP：展示风险资源水平条形图排行
- 高风险数据使用风险最多人TOP：展示高风险用户排行
- 中央资源访问链路图：展示各类资源之间的访问关系
- 风险类型趋势：展示不同风险类型的时间趋势

**使用的组件**：
- `/tags` 目录下的组件:
  - `RiskTag`: 展示风险类型和等级的标签
  - `CapabilityTag`: 展示防护能力类型的标签
  - `CustomTooltip`: 提供长文本的悬浮提示
- `/networks` 目录下的组件:
  - `ResourceFlowChart`: 展示资源访问链路图
  - `ResourceFlowLegend`: 展示资源访问链路图的图例
- `/charts` 目录下的组件:
  - `LineChart`: 展示风险趋势变化
- `/cards` 目录下的组件:
  - `StatisticCard`: 展示顶部统计数据
  - `TableTopCard`: 展示各类 TOP 排行榜 (表格形式，可带进度条)

**组件交互关系**:
- 中央资源链路图展示各类资源节点的关系，不同风险等级用不同颜色连线表示
- 风险等级图例说明，便于理解不同颜色连线的含义
- 各个TOP榜单使用统一的样式，确保界面一致性
- 条形图和趋势图提供直观的数据分析视图

## 路由管理

项目使用 `react-router-dom` v6 进行路由管理。主要的路由配置在 `src/App.tsx` 文件中定义。

- **路由定义**: 使用 `<Routes>` 和 `<Route>` 组件定义路径与页面组件的映射关系。
  ```tsx
  // 在 App.tsx 中
  import { Routes, Route } from 'react-router-dom';
  import PlatformOverview from './pages/PlatformOverview';
  // ... 其他页面导入

  <Routes>
    <Route path="/platform" element={<PlatformOverview />} />
    <Route path="/interface" element={<InterfaceMonitoring />} />
    <Route path="/asset" element={<AssetMonitoring />} />
    <Route path="/security" element={<DataAssetMonitoring />} />
    {/* 其他路由... */}
    <Route path="/" element={<PlatformOverview />} /> {/* 默认路由 */}
  </Routes>
  ```

- **导航**: 侧边栏菜单使用 `<Link>` 组件进行导航。
  ```tsx
  // 在 App.tsx 中
  import { Link, useLocation } from 'react-router-dom';

  const location = useLocation();

  // ... menuItems 定义 ...

  menuItems.map((item: MenuItem) => (
    <Link
      to={`/${item.id}`}
      className={`... ${location.pathname === `/${item.id}` ? 'active-style' : 'inactive-style'}`}
    >
      {/* ... icon and label ... */}
    </Link>
  ))
  ```

## 页面扩展指南

如需添加新的大屏页面，请遵循以下步骤：

1.  在本目录 (`src/pages`) 创建新的页面组件文件，例如 `NewDashboard.tsx`。
2.  按照现有页面的结构，实现新页面的布局和组件组合，并确保**从 `services` 层 (通过其 `index.ts` 入口) 获取数据**。
3.  在 `src/App.tsx` 文件中：
    *   导入你新创建的页面组件：`import NewDashboard from './pages/NewDashboard';`
    *   在 `<Routes>` 组件内部添加一个新的 `<Route>` 定义：
      ```tsx
      <Route path="/new-dashboard" element={<NewDashboard />} />
      ```
    *   (可选) 如果需要在侧边栏添加导航链接，更新 `App.tsx` 中的 `menuItems` 数组，添加新的菜单项定义。

## 更新记录

- 2024-06-25: 更新README，移除不存在的页面引用，简化项目结构，保留核心功能页面
- 2024-06-18: 规范化文件命名，将 SecurityMonitoring.tsx 更名为 DataAssetMonitoring.tsx，更新导航标签文本
- 2024-06-16: 优化数据资产防护监测大屏，使用ResourceFlowChart组件，增加标签组件，完善界面布局
- 2024-06-15: 优化应用资产监测大屏，使用优化后的AssetFlowChart组件，增强流程图展示效果
- 2024-06-10: 更新README，补充平台概览和接口监控页面的组件依赖关系描述
- 2024-05-01: 完成文件名和组件名的统一，将ResourceMonitoring.tsx重命名为PlatformOverview.tsx，增强页面交互功能
- 2024-04-13: 优化平台概览页布局，使其更接近设计图，包括添加卡片边框、调整网格布局、优化环形进度图和折线图样式
- 2023-12-18: 优化PlatformOverview页面布局，使其更加紧凑；修复内容溢出问题；启用真实图片图标替代SVG图标
- 2023-11-28: 将ResourceMonitoring重命名为PlatformOverview，更准确反映其作为平台概览页的功能
- 2023-11-25: 将ResourceDashboard从App.tsx移至pages目录，重命名为ResourceMonitoring
- 2023-11-01: 初始版本 

## 页面开发规范总结

### 基本架构模式
1. **职责分离**: 
   - `pages`目录: 定义页面布局和结构，负责组织各组件的排列方式，**调用 Service 获取数据 (通过 `src/data/services` 的 `index.ts` 入口)**。
   - `components`目录: 定义可复用的UI组件，负责实现具体功能，接收来自 Page 的 Props。
   - `src/data`目录: 负责数据获取和处理 (详见 `../data/README.md`)。
   - 样式: 使用Tailwind CSS在组件内部定义

2. **数据流向**:
   - 数据获取由 `pages` 组件发起，**调用 `src/data/services` 层的函数**。
   - `services` 层负责与 `api` 层 (或 `mock` 层) 交互，并可能进行数据处理。
   - `services` 层将最终数据返回给 `pages` 组件。
   - `pages` 组件将所需数据通过 Props 传递给子 `components` 组件进行渲染。
   - `components` 组件接收 props 数据并渲染，保持数据与UI的分离。

3. **组件层次结构**:
   - 页面级组件: 在`pages`目录中，负责整体布局和状态管理
   - 功能级组件: 在`components`目录中，负责特定功能的实现
   - 可复用UI组件: 在`components`的子目录中，如`charts`、`cards`等

### 页面开发流程
1. **规划阶段**:
   - 确定页面的整体布局和主要功能区域
   - 识别可以复用的组件
   - **确定所需数据，并检查 `src/data/services` (通过其 `index.ts` 导出) 是否已有对应的服务函数，若无则需先在数据层实现**。

2. **实现阶段**:
   - 创建页面的基本结构和布局
   - 集成所需的组件
   - **从 `src/data/services` (通过其 `index.ts` 入口) 导入并调用服务函数获取数据**。
   - 将获取的数据通过 Props 传递给子组件。
   - 实现组件间的交互逻辑 (如时间范围切换触发重新获取数据)。

3. **优化阶段**:
   - 优化组件的重用
   - 确保页面在不同设备上的响应式表现
   - 添加加载状态和错误处理
   - 优化性能

### 代码风格规范
1. **命名规范**:
   - 文件名采用PascalCase: `PlatformOverview.tsx`
   - 组件名采用PascalCase: `const PlatformOverview: React.FC = () => {...}`
   - 变量和函数名采用camelCase: `const handleTimeRangeChange = () => {...}`

2. **注释规范**:
   - 文件顶部添加组件说明注释，描述功能和更新记录
   - 复杂函数添加功能说明
   - 使用JSDoc风格的注释，便于生成文档

3. **代码组织**:
   - 导入语句集中在文件顶部
   - 类型定义紧随导入语句
   - 功能函数和组件函数分开定义
   - 相关功能的代码放在一起

### 状态管理
1. **页面级状态**:
   - 使用`useState`管理页面级的状态
   - 对于多个子组件共享的状态，在页面级维护
   - 定义合理的状态结构，避免状态冗余

2. **组件交互**:
   - 通过props传递回调函数实现子组件向父组件的通信
   - 使用自定义hooks抽取复杂的状态逻辑
   - 对于复杂的状态逻辑，考虑使用useReducer

### 性能优化
1. **代码分割**:
   - 大型组件拆分为多个小组件，便于维护和优化
   - 使用React.memo减少不必要的重渲染

2. **条件渲染**:
   - 使用条件渲染显示/隐藏组件
   - 大量数据的列表考虑使用虚拟滚动

3. **数据加载**:
   - 实现数据加载状态显示
   - 大量数据考虑分页加载
   - 实现数据缓存，避免重复请求

### 扩展建议
1. **新页面创建**:
   - 参考现有页面的结构和组织方式
   - 优先使用已有组件，保持UI一致性
   - 需要新组件时，遵循现有组件的设计风格

2. **组件重用**:
   - 提取通用逻辑为可复用组件
   - 设计灵活的props接口，增强组件适用性
   - 文档化组件的用法和配置选项

3. **测试与维护**:
   - 编写单元测试确保组件功能正确
   - 定期更新依赖包
   - 保持代码的整洁和一致性

遵循以上规范，可以确保项目代码的一致性、可维护性和可扩展性，便于团队协作开发和后续功能迭代。 