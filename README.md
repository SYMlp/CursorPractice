# Cursor练习项目

这是我用来练习Cursor编辑器的项目仓库。

## 项目结构

- `security-dashboard/` - 基于React的安全大屏项目，用于数据可视化展示
- `insurance-retention-predictor/` - 保险续保预测项目，基于Python和机器学习算法
- `projects-docs/` - 项目目标与收获记录
- `.cursor/` - Cursor配置和模板，用于规范开发流程

## 项目列表

### 安全大屏项目 (security-dashboard)

基于React和TypeScript开发的安全数据可视化大屏，使用Tailwind CSS和ECharts展示各类安全指标。

- **技术栈**: React 18、TypeScript、Tailwind CSS、ECharts
- **功能**: 资源管理概览、安全资源类型分布、安全规则跟踪、接口管理指标
- [查看项目详情](./security-dashboard/README.md)
- [查看项目目标与收获](./projects-docs/security-dashboard.md)

### 保险续保预测项目 (insurance-retention-predictor)

基于Python和机器学习算法开发的保险客户续保预测系统，通过分析客户特征识别潜在流失风险客户。

- **技术栈**: Python、Pandas、Scikit-learn、Matplotlib、Seaborn
- **功能**: 数据预处理、特征工程、逻辑回归模型、决策树模型、模型评估与解释
- **核心模型**: 
  - 逻辑回归模型 (准确率91%)
  - 决策树模型 (高可解释性)
- [查看项目详情](./insurance-retention-predictor/README.md)
- [查看决策树模型分析](./决策树结果分析.md)

## 文档规范

本项目采用"元编程"方式管理文档，通过详细的README体系记录项目结构和功能。规范如下：

1. **README优先**: 在查看代码前，先阅读相关README文件了解设计和功能
2. **同步更新**: 修改代码时必须同步更新相关README文件
3. **记录变更**: 在README的"更新记录"部分记录所有重要变更
4. **模板使用**: 创建新组件或模块时使用`.cursor/templates/`中的模板

每个目录都有对应的README文件，详细说明该目录的功能和设计原则：

- **根目录README**: 项目整体介绍
- **src目录README**: 源码架构和开发指南
- **组件目录README**: 组件库总览和使用指南
- **页面目录README**: 页面组件和路由说明
- **数据目录README**: 数据结构和模拟数据说明

## 关于此仓库

此仓库用于：

- 练习Cursor的各种功能
- 测试AI辅助编码
- 学习高效的开发工作流
- 积累前端项目开发经验
- 探索高效的项目文档管理方法

## 更新记录

- 2024-06-10: 添加保险续保预测项目和决策树分析报告
- 2023-11-20: 添加Cursor规则配置和文档模板
- 2023-11-15: 实现四个主要大屏页面
- 2023-11-12: 添加安全大屏项目
- 2023-11-10: 项目初始化 