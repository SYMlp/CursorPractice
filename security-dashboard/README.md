# 安全仪表盘（Security Dashboard）

基于 React 和 TypeScript 开发的安全仪表盘应用，提供平台概览、资产监控、接口监控和安全监控等功能。

## 项目结构

```
security-dashboard/
├── public/                    # 静态文件
│   ├── index.html             # 主HTML文件
│   └── assets/                # 静态资源
├── src/                       # 源代码
│   ├── components/            # 通用组件
│   │   ├── charts/            # 图表组件
│   │   ├── icons/             # 图标组件
│   │   ├── nodes/             # 节点组件
│   │   └── layout/            # 布局组件
│   ├── pages/                 # 页面组件
│   │   ├── PlatformOverview.tsx  # 平台概览
│   │   ├── AssetMonitoring.tsx   # 资产监控
│   │   ├── InterfaceMonitoring.tsx # 接口监控
│   │   └── SecurityMonitoring.tsx  # 安全监控
│   ├── data/                  # 数据层
│   │   ├── api/               # API接口层
│   │   ├── mock/              # 模拟数据层
│   │   ├── services/          # 服务层
│   │   └── utils/             # 数据工具
│   ├── styles/                # 样式文件
│   ├── utils/                 # 通用工具
│   ├── hooks/                 # 自定义钩子
│   ├── types/                 # 全局类型定义
│   ├── App.tsx                # 应用入口
│   └── index.tsx              # 渲染入口
├── .env                       # 开发环境变量
├── .env.production            # 生产环境变量
└── package.json               # 依赖管理
```

## 数据架构设计

安全仪表盘应用采用分层架构设计，数据流清晰，便于后期从模拟数据切换到真实 API。

### 数据层结构

```
data/
├── api/                # API接口层 - 处理与服务器的通信
│   ├── asset.ts        # 资产相关API
│   ├── platform.ts     # 平台概览相关API
│   ├── interface.ts    # 接口监控相关API
│   ├── security.ts     # 安全监控相关API
│   ├── types.ts        # API通用类型定义
│   └── index.ts        # 统一导出
├── mock/               # 模拟数据层 - 提供开发和测试用的模拟数据
│   ├── asset/          # 资产监控模拟数据
│   ├── platform/       # 平台概览模拟数据
│   ├── interface/      # 接口监控模拟数据
│   ├── security/       # 安全监控模拟数据
│   └── common/         # 公共模拟数据
├── services/           # 服务层 - 组合API调用，提供业务逻辑
│   ├── assetService.ts
│   ├── platformService.ts
│   ├── interfaceService.ts
│   └── securityService.ts
└── utils/              # 数据工具 - 提供数据处理工具函数
    ├── formatters.ts   # 数据格式化工具
    └── transformers.ts # 数据转换工具
```

### 分层职责

1. **API层**
   - 负责与后端API通信，处理请求和响应
   - 封装fetch/axios等HTTP请求
   - 根据环境变量决定是否使用模拟数据
   - 实现API调用失败时的降级策略

2. **模拟数据层**
   - 提供开发和测试阶段的数据支持
   - 按功能模块组织，结构清晰
   - 所有数据均有TypeScript类型定义
   - 提供静态数据和动态生成函数

3. **服务层**
   - 封装业务逻辑，组合API调用
   - 提供统一的数据访问接口
   - 处理错误和异常情况
   - 对UI组件屏蔽数据获取的复杂性

4. **工具层**
   - 提供通用的数据处理函数
   - 包括格式化、转换等功能
   - 避免代码重复，提高开发效率

### 数据流

1. **数据获取流程**
   ```
   UI组件 → 服务层 → API层 → (模拟数据/真实API) → API层 → 服务层 → UI组件
   ```

2. **错误处理流程**
   ```
   API层(出错) → 使用模拟数据降级 → 返回数据给服务层 → 服务层处理异常 → UI组件显示错误信息
   ```

## 环境变量配置

项目使用环境变量控制是否使用模拟数据：

1. `.env` - 开发环境配置
   ```
   REACT_APP_USE_MOCK=true
   REACT_APP_API_BASE_URL=http://localhost:3000/api
   ```

2. `.env.production` - 生产环境配置
   ```
   REACT_APP_USE_MOCK=false
   REACT_APP_API_BASE_URL=https://api.example.com
   ```

## 如何使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

## 模拟数据与真实API切换

1. 开发阶段：默认使用模拟数据（REACT_APP_USE_MOCK=true）
2. 生产阶段：使用真实API（REACT_APP_USE_MOCK=false）
3. 测试阶段：可通过修改环境变量灵活切换

## 添加新功能流程

1. 在模拟数据层添加相应的模拟数据
2. 在API层添加相应的API接口
3. 在服务层添加业务逻辑处理
4. 在页面组件中通过服务层获取数据

## 更新记录

- 2024-07-13: 完成数据层架构设计，实现资产监控模块
- 2024-07-12: 完成资产监控模块的模拟数据迁移
- 2024-07-10: 应用资产监控页面优化，统一组件导入
- 2024-07-01: 优化页面布局和交互体验
- 2024-06-30: 统一页面风格
- 2024-06-26: 文件一致性调整
- 2024-06-25: 项目结构清理
- 2024-04-15: 文件结构优化

## 功能特点

- 资源管理概览
- 安全资源类型分布
- 安全规则跟踪
- 接口管理指标
- 各种服务的时间序列数据可视化
- 美观的UI设计与响应式布局

## 技术栈选择

### 核心框架
- **React 18 + TypeScript**：提供类型安全和组件化开发能力，有利于代码维护和团队协作
- **Tailwind CSS**：原子化CSS框架，加速UI开发，提供响应式设计支持
- **ECharts**：功能强大的图表库，支持丰富的可视化图表类型

### 技术选择理由
1. **React + TypeScript 优势**：
   - 强类型系统减少运行时错误
   - 组件化开发提高代码复用率
   - 庞大的生态系统和社区支持
   - 大厂广泛采用，有利于职业发展

2. **Tailwind CSS 优势**：
   - 减少CSS维护成本，无需编写自定义CSS
   - 内置响应式设计支持
   - 与React组件模型配合良好
   - 高度可定制的主题系统

3. **ECharts 优势**：
   - 国产图表库，中文文档和支持完善
   - 支持多种复杂图表和交互方式
   - 性能优化良好，适合大数据量展示
   - 提供丰富的配置选项

## 项目结构介绍

```
security-dashboard/
├── public/                  # 静态资源
├── src/                     # 源代码
│   ├── components/          # 组件目录
│   │   ├── cards/           # 数据卡片组件
│   │   │   ├── ResourceCard.tsx    # 资源卡片
│   │   │   ├── RuleCard.tsx        # 规则卡片
│   │   │   └── InterfaceCard.tsx   # 接口卡片
│   │   ├── charts/          # 图表组件
│   │   │   ├── CircularProgress.tsx # 环形进度图
│   │   │   ├── LineChart.tsx        # 折线图
│   │   │   └── PieChart.tsx         # 饼图/环图
│   │   └── icons/           # 图标组件
│   │       └── Icons.tsx            # SVG图标集合
│   ├── data/                # 数据层
│   │   └── mockData.ts      # 模拟数据
│   ├── App.tsx              # 主应用组件
│   ├── index.tsx            # 应用入口
│   └── index.css            # 全局样式
├── tailwind.config.js       # Tailwind配置
├── postcss.config.js        # PostCSS配置
├── tsconfig.json            # TypeScript配置
└── package.json             # 项目依赖
```

### 组件结构设计原则
1. **职责分离**：将UI组件、数据处理和图表逻辑分离
2. **组件复用**：设计高度可配置的通用组件
3. **类型安全**：所有组件和数据均有TypeScript类型定义

## 快速开始

### 前置条件

- Node.js 14.x 或更高版本
- npm 6.x 或更高版本

### 安装

1. 克隆此仓库
2. 进入项目目录:
```
cd security-dashboard
```
3. 安装依赖:
```
npm install
```

### 运行应用

#### 方法一：使用启动脚本（推荐）

项目提供了多种环境下的启动脚本，位于 `scripts` 目录：

- **Windows环境**：双击运行 `scripts/start-app.bat`
- **Linux/MacOS环境**：在终端中运行 `./scripts/start-app.sh`
- **Python环境(跨平台)**：运行 `python scripts/start-app.py`

所有脚本会自动：
- 检查并切换到正确的目录
- 安装依赖（如果需要）
- 启动应用程序

更多详细说明请查看 [scripts/README.md](./scripts/README.md)

#### 方法二：使用命令行

启动开发服务器:
```
npm start
```

这将在开发模式下运行应用。打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

### 构建生产版本

构建生产版本:
```
npm run build
```

这将构建生产版应用到 `build` 文件夹。它打包优化后的React，并优化构建以获得最佳性能。

## 未来规划与扩展

### 短期规划
1. **数据集成**
   - 替换模拟数据，接入真实后端API
   - 添加数据加载状态和错误处理
   - 实现数据刷新机制

2. **功能增强**
   - 添加用户交互功能（筛选、排序、下钻）
   - 实现数据导出功能
   - 增加更多图表类型（地图、关系图、桑基图）

3. **性能优化**
   - 实现图表按需加载
   - 大数据量下的性能优化
   - 移动端适配优化

### 中长期规划

1. **架构升级**
   - 考虑引入状态管理库（Redux/MobX）
   - 服务端渲染支持（Next.js）
   - 微前端架构探索

2. **技术探索**
   - WebGL/Three.js 3D可视化
   - 实时数据推送（WebSocket）
   - AI辅助数据分析与展示

3. **生态建设**
   - 提取组件库，形成独立NPM包
   - 开发主题系统，支持多种风格切换
   - 低代码配置平台，支持拖拽式大屏设计

## 自定义

你可以通过修改 `tailwind.config.js` 文件来自定义颜色和主题。

## 更新记录

- 2023-11-01: 初始版本，完成基础组件和页面开发
- 2023-12-15: 添加密码规则管理功能，包括专用组件和页面
- 2023-12-18: UI优化：紧凑型布局、内容溢出处理、导航栏样式优化、图标系统改进
- 2024-01-10: 数据资产防护监测页面样式优化，统一统计卡片设计，改进配色方案
- 2024-04-15: 增强资源流程图的节点连接关系，添加更多节点类型和连接

## 最近更新

### 资源流程图节点关系增强 (2024-04-15)
- 新增节点类型组件化
  - 创建独立的节点组件：`ResourceNode`, `ServiceNode`, `ApplicationNode`, `TaskNode`, `PersonNode`
  - 统一节点样式和交互行为
  - 添加节点类型特定样式，提高可识别性

- 增加节点间连接关系
  - 应用到资源的直接访问关系
  - 应用到服务的调用关系
  - 应用到人员的操作关系
  - 资源与任务的关联关系
  - 服务与人员的授权关系
  - 人员间的协作关系

- 连接关系属性增强
  - 访问频率 (accessFrequency)
  - 访问次数 (accessCount)
  - 最后访问时间 (lastAccessTime)
  - 风险等级 (riskLevel)
  - 风险评分 (riskScore)

- 样式规范
  - 节点样式：圆角边框、特定边框颜色、标题栏颜色区分
  - 连接样式：不同类型连接有不同的线条颜色和样式
  - 高风险连接使用动画效果突出显示

### 数据资产防护监测页面更新 (2024-01-10)
- 统计卡片样式优化
  - 调整了数据总量、数据分类数、数据分级数三个统计卡片的样式
  - 采用新的配色方案：
    - 数据总量：靛蓝色背景 (bg-indigo-500)
    - 数据分类数：紫色背景 (bg-purple-500)
    - 数据分级数：玫红色背景 (bg-fuchsia-500)
  - 统一的卡片布局：
    - 左侧添加对应的白色图标
    - 右侧显示数据和标题
    - 文字采用白色，标题加粗
  - 保持原有数据不变：
    - 数据总量：2,4324
    - 数据分类数：322
    - 数据分级数：8

### 样式规范
- 统计卡片通用样式：
  ```css
  - 卡片容器：rounded-lg shadow p-4
  - 内容布局：flex items-center
  - 图标样式：w-8 h-8 text-white mr-4
  - 数据文字：text-2xl font-bold text-white
  - 说明文字：text-sm text-white/80
  ```

### 组件结构
```jsx
<div className="mb-6 grid grid-cols-3 gap-4">
  <div className="bg-[color] rounded-lg shadow p-4">
    <div className="flex items-center">
      <div className="mr-4">
        <svg className="w-8 h-8 text-white">
          <!-- 图标内容 -->
        </svg>
      </div>
      <div>
        <div className="text-2xl font-bold text-white">[数据]</div>
        <div className="text-sm text-white/80">[标题]</div>
      </div>
    </div>
  </div>
  <!-- 其他卡片 -->
</div>
```

## 开发注意事项
1. 保持统一的样式规范，确保视觉一致性
2. 图标选择要贴合数据含义
3. 颜色搭配要协调，提高可读性
4. 保持原有数据的准确性
