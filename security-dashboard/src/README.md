# 安全大屏源代码

本目录包含安全大屏项目的全部源代码，采用React + TypeScript技术栈实现。

## 目录结构

- `/components`: 可复用的UI组件
  - `/cards`: 各类数据卡片组件
  - `/charts`: 图表可视化组件
  - `/icons`: 图标组件
  - `/nodes`: 节点组件（用于资源流程图）
  - `/tags`: 标签组件（用于数据资产防护大屏）
  - `AssetFlowChart.tsx`: 资产流程图组件
- `/pages`: 大屏页面
  - `PlatformOverview.tsx`: 平台概览大屏
  - `InterfaceMonitoring.tsx`: 接口监控大屏
  - `AssetMonitoring.tsx`: 应用资产监测大屏
  - `DataAssetMonitoring.tsx`: 数据资产防护大屏
- `/data`: 数据层
  - `mockData.ts`: 平台概览模拟数据
  - `monitoringData.ts`: 接口监控模拟数据
  - `assetData.ts`: 应用资产监测模拟数据
  - `securityMonitoringData.ts`: 数据资产防护模拟数据
  - `assetFlowData.ts`: 资产流程图模拟数据
- `/utils`: 工具函数
  - `iconMapping.ts`: 图标资源映射工具
- `/assets`: 静态资源
  - `/icons`: 图标资源
- `/package`: 更新记录及文档
  - `readme.md`: 功能更新记录
- `App.tsx`: 应用主组件，包含路由和导航
- `index.tsx`: 应用入口
- `index.css`: 全局样式

## 架构说明

项目采用组件化架构，主要分为三层：

1. **页面层(pages)**: 各个大屏页面，负责布局和组合组件
2. **组件层(components)**: 可复用的UI组件，包括卡片、图表等
3. **数据层(data)**: 提供模拟数据和数据处理逻辑

## 开发规范

### 组件开发规范

- 组件使用TypeScript编写，确保类型安全
- 组件采用函数式组件和React Hooks
- 组件应设计为高度可配置，通过props传递配置参数
- 大型组件应拆分为小组件，保持组件职责单一

### 样式开发规范

- 使用Tailwind CSS的原子类进行样式开发
- 避免编写自定义CSS，尽量使用Tailwind提供的工具类
- 如需自定义样式，在组件内使用CSS-in-JS或模块化CSS

### 代码风格

- 使用ESLint检查代码质量
- 遵循项目已有的命名和文件组织方式
- 组件文件名采用大驼峰命名法(PascalCase)
- 辅助函数和工具采用小驼峰命名法(camelCase)

## 大屏页面说明

项目共有4个页面：

1. **平台概览(PlatformOverview)**: 显示平台资源管理概况和各类指标
2. **接口监测大屏(InterfaceMonitoring)**: 监控接口和服务安全情况
3. **应用资产监测大屏(AssetMonitoring)**: 监控资产和业务应用情况
4. **数据资产防护大屏(DataAssetMonitoring)**: 监控数据资产安全防护情况

## 开发流程

1. 理解需求和设计
2. 确定需要的组件和数据结构
3. 实现组件和布局
4. 集成数据
5. 测试和优化
6. 更新相关README文档

## 更新记录

- 2024-06-25: 修正项目结构，删除了未使用的组件和页面引用，统一README文档
- 2024-04-15: 增强资源流程图的节点连接关系，添加更多节点类型和连接
- 2024-01-10: 数据资产防护监测页面样式优化，统一统计卡片设计，改进配色方案
- 2023-12-18: 全面优化UI布局，使界面更加紧凑；添加全局内容溢出处理；优化导航栏样式；启用真实图片图标代替SVG图标
- 2023-11-01: 初始版本 