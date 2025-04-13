# 安全大屏源代码

本目录包含安全大屏项目的全部源代码，采用React + TypeScript技术栈实现。

## 目录结构

- `/components`: 可复用的UI组件
  - `/cards`: 各类数据卡片组件
  - `/charts`: 图表可视化组件
  - `/icons`: 图标组件
- `/pages`: 大屏页面
  - `SecurityMonitoring.tsx`: 数据资产防护大屏
  - `AssetMonitoring.tsx`: 资产监测大屏
  - `InterfaceMonitoring.tsx`: 接口监控大屏
  - `PasswordRules.tsx`: 密码安全规则管理
  - `PasswordRuleDemo.tsx`: 密码规则组件演示
- `/data`: 数据层
  - 各类模拟数据和数据处理逻辑
- `/utils`: 工具函数
  - `iconMapping.ts`: 图标资源映射工具
- `/assets`: 静态资源
  - `/icons`: 图标资源
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

项目共有6个页面：

1. **平台概览(ResourceMonitoring)**: 显示平台资源管理概况和各类指标
2. **防护检测大屏(InterfaceMonitoring)**: 监控接口和服务安全情况
3. **资产监测大屏(AssetMonitoring)**: 监控资产和业务应用情况
4. **数据资产防护大屏(SecurityMonitoring)**: 监控数据资产安全防护情况
5. **密码安全规则管理(PasswordRules)**: 管理密码安全策略和规则
6. **密码规则组件演示(PasswordRuleDemo)**: 展示密码规则卡片组件的使用

## 开发流程

1. 理解需求和设计
2. 确定需要的组件和数据结构
3. 实现组件和布局
4. 集成数据
5. 测试和优化
6. 更新相关README文档

## 更新记录

- 2023-11-01: 初始版本
- 2023-12-15: 添加密码规则管理模块，包括密码规则页面、专用卡片组件和演示页面
- 2023-12-18: 全面优化UI布局，使界面更加紧凑；添加全局内容溢出处理；优化导航栏样式；启用真实图片图标代替SVG图标 