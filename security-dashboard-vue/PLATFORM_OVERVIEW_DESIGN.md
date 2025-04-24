# 平台概览页设计文档 (`src/views/PlatformOverview.vue`)

**1. 整体布局**

- 页面采用垂直流布局，主体内容区域背景色为灰色 (`bg-gray-100`)，内边距为 `p-4`。
- 内容区域使用 **CSS Grid** 进行网格化布局，通过 Tailwind CSS 类 (`grid`, `gap-4`, `mb-4`) 实现。
- 布局是响应式的，针对大屏幕 (`lg:`) 和小屏幕 (`sm:`, 默认) 有不同的列数配置。

**2. 页面区域划分 (行)**

- **第一行**: 包含两个卡片。

  - **左侧 (占 1/3 宽度，`lg:col-span-1`)**: **资源管理**卡片 (`ResourceCard`)。显示资源总览、关键指标（身份标识、标准化、安全防护率）和增长趋势。
  - **右侧 (占 2/3 宽度，`lg:col-span-2`)**: **资源类型分布**卡片。内部使用 Grid (`lg:grid-cols-5`) 横向排列 5 个**环形进度图** (`CircularProgress`)，分别代表核心资产、对外资产、内部资产、云上资产和 API。

- **第二行**: 包含五个等宽卡片 (`lg:grid-cols-5`)。

  - 展示不同类型的**安全规则**信息，使用 `RuleCard` 组件循环渲染。每张卡片显示规则标题、总数、已下发/已撤销数量等（当前代码只显示了标题、图标、总数和 `dailyNew`，与图片略有出入）。

- **第三行**: 包含三个等宽卡片 (`lg:grid-cols-3`)。

  - **左侧 (占 1/3 宽度，`lg:col-span-1`)**: **接口管理**卡片 (`InterfaceCard`)。显示接口总数和相关指标。
  - **中间 (占 1/3 宽度，`lg:col-span-1`)**: **南向接口数据量**图表卡片。包含标题、时间范围选择器 (`TimeRangeSelector`) 和折线图 (`LineChart`)，图表高度 `200px`，显示图例。
  - **右侧 (占 1/3 宽度，`lg:col-span-1`)**: **识别服务数据量**图表卡片。结构与南向接口卡片类似，包含标题、时间范围选择器和折线图，图表高度 `200px`，带有区域填充 (`areaStyle`)。

- **第四行**: 包含三个等宽卡片 (`lg:grid-cols-3`)。
  - 分别展示**防护服务数据量**、**检测服务数据量**、**响应服务数据量**的图表卡片。每个卡片包含标题、时间范围选择器和折线图 (`LineChart`)，图表高度 `150px`。检测服务图表带有区域填充。

**3. 主要组件**

- `ResourceCard`: 用于展示资源管理信息。
- `CircularProgress`: 用于展示百分比数据的环形图。
- `RuleCard`: 用于展示安全规则摘要信息。
- `InterfaceCard`: 用于展示接口管理信息。
- `LineChart`: 用于展示时间序列数据的折线图（支持区域填充和图例）。
- `TimeRangeSelector`: 用于切换图表时间范围（天/周/月）的公共组件。

**4. 数据与交互**

- 页面数据大部分来自 `@/data/mockData` 中的模拟数据。
- 图表数据通过 `generateMockData` 函数动态生成，并支持根据 `TimeRangeSelector` 的选择进行刷新。
- 图表卡片 (`.chart-container`) 具有点击交互效果 (`active` 状态)，点击时会放大并显示边框光晕。

**5. 注意事项/待办**

- 第二行 `RuleCard` 组件显示的内容（如图标、已下发/已撤销）与最新图片可能存在细微差异，需要根据最终需求确认。
- 部分图标路径写在组件内部 (`const resourceIcon = ...`)，未来可考虑统一管理或使用 SVG 图标库。

**6. 第一行卡片样式设计 (已验证)**

- **资源管理卡片 (`src/components/cards/ResourceCard.vue`)**

  - **容器**: 白色背景 (`bg-white`), 圆角 (`rounded-lg`), 阴影 (`shadow`), 内边距 (`p-4`), Flex 垂直布局 (`flex flex-col`), 占满高度 (`h-full`)。
  - **标题**: 基础字体大小 (`text-base`), 中等粗细 (`font-semibold`), 深灰文字 (`text-gray-800`), 下边距 (`mb-4`)。
  - **主内容区域**: Flex 布局 (`flex`), 自动增长 (`flex-grow`), 响应式布局 (`flex-col sm:flex-row`)。
    - **左侧 (图标+总数)**: 在 `sm` 及以上为左列 (`sm:border-r sm:pr-4`)。
      - 图标: `w-6 h-6` 在 `w-12 h-12 rounded-full bg-blue-50` 背景中, `mr-3`。
      - 总数标签: `text-sm text-gray-500 mb-1`。
      - 总数: `text-2xl font-bold text-gray-900`。
    - **右侧 (指标列表)**: 在 `sm` 及以上为右列 (`sm:pl-4`)。
      - 指标项: `flex items-center justify-between` (标签居左，数值居右)。
      - 指标图标: `w-4 h-4 mr-1.5`。
      - 指标标签: `text-sm text-gray-600 truncate`。
      - 指标数值: `text-sm font-medium text-gray-700` (右对齐)。
  - **底部增长区域**: Grid 布局 (`grid grid-cols-1 sm:grid-cols-2`), 上边框 (`mt-auto pt-4 border-t`)。
    - 增长项: Flex 布局 (`flex items-center`)。
    - 标签: `text-sm text-gray-500 mr-2`。
    - 数值+箭头: 胶囊样式 (`bg-green-100/bg-red-100 rounded-full px-1.5 py-0.5 text-xs font-medium`)，使用文字箭头 `↑`/`↓`。

- **资源类型分布卡片 (容器在 `src/views/PlatformOverview.vue`, 环形图在 `src/components/charts/CircularProgress.vue`)**
  - **容器 (View 层)**:
    - 样式: `bg-white rounded-lg shadow p-4 col-span-1 lg:col-span-2`。
    - 标题: `h3` 标签, `text-base font-semibold text-gray-800 mb-4` (需要添加)。
    - 内部 Grid 布局: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 items-center`。
  - **环形进度图组件 (`CircularProgress.vue`)** (针对 `size='small'`, `layout='vertical'`):
    - **实现技术**: ECharts Gauge。
    - **容器**: `p-2 flex flex-col items-center`。
    - **图表区域**: ECharts 容器 `width: 50px; height: 50px;`。
      - Gauge 宽度 (`width`): 6px。
      - 百分比 (Detail): 居中显示, `fontSize: 12`, `fontWeight: bold`。
    - **文本区域**: 图表**上方** (`mb-1 text-center`)。
      - 标题: `text-xs font-medium text-gray-700`。

**7. 第二行卡片样式设计 (安全规则 - 已修改)**

- **安全规则卡片 (`src/components/cards/RuleCard.vue`)**
  - **容器**: 白色背景 (`bg-white`), 圆角 (`rounded-lg`), 阴影 (`shadow`), 内边距 (`p-4`), Flex 垂直布局 (`flex flex-col`), 文本居中 (`text-center`), 占满高度 (`h-full`)。
  - **图标区域**: 上边距 (`mb-2`)。
    - 图标: `w-8 h-8 mx-auto`。
  - **标题区域**: 上边距 (`mb-3`)。
    - 标题: `text-sm font-medium text-gray-700`。
  - **总数区域**: 上边距 (`mb-4`)。
    - 总数: `text-3xl font-bold text-gray-900`。
  - **底部区域 (已下发/已撤销)**: Flex 布局 (`flex`), 两端对齐 (`justify-between`), 占满宽度 (`w-full`), 自动上外边距 (`mt-auto`), 上内边距 (`pt-3`), 上边框 (`border-t border-gray-200`)。
    - **已下发 (左侧)**:
      - 标签: `text-xs text-gray-500 mb-1 block`。
      - 数值 (prop: `issuedCount`): `text-base font-semibold text-green-600`。
    - **已撤销 (右侧)**:
      - 标签: `text-xs text-gray-500 mb-1 block text-right`。
      - 数值 (prop: `revokedCount`): `text-base font-semibold text-red-600 text-right`。
  - **Props 注意**: 需要确认或添加 `issuedCount` 和 `revokedCount` props，并更新数据源。

**8. 第三行卡片样式设计**

- **接口管理卡片 (`src/components/cards/InterfaceCard.vue`)**

  - **容器**: 白色背景 (`bg-white`), 圆角 (`rounded-lg`), 阴影 (`shadow`), 内边距 (`p-4`), Flex 垂直布局 (`flex flex-col`), 占满高度 (`h-full`)。
  - **标题**: `text-base font-semibold text-gray-800 mb-4`。
  - **主内容区域**:
    - **上方 (图标/标签 + 总数)**:
      - 图标和标签: `flex items-center mb-1`。
        - 图标: `w-7 h-7 mr-2`。
        - 标签: "接口总数" - `text-sm text-gray-500`。
      - 总数: `text-3xl font-bold text-gray-900 mb-4`。
    - **下方 (指标列表)**: `flex flex-col space-y-1.5`。
      - 指标项: `flex items-center`。
        - 图标: `w-4 h-4 mr-2`。
        - 标签: `text-sm text-gray-600`。
        - 数值: `text-sm font-semibold text-gray-900 ml-auto` (右对齐)。
  - **底部区域 (接口发布率)**:
    - 容器: `mt-auto pt-3 border-t border-gray-200`。
    - 标签行: `flex justify-between items-center mb-1`。
      - 标签: "接口发布率" - `text-xs text-gray-500`。
      - 百分比 (prop: `publishRate`): `text-xs font-semibold text-blue-600`。
    - 进度条:
      - 背景: `w-full bg-gray-200 rounded-full h-1.5`。
      - 前景: `bg-blue-600 h-1.5 rounded-full` (宽度由 `:style` 控制)。
  - **Props**: 需要 `title`, `total`, `metrics` (含 `iconPath`), `publishRate`。

- **图表卡片 (南向接口 / 识别服务 - 在 `src/views/PlatformOverview.vue` 中)**
  - **容器 (`div`)**: `bg-white rounded-lg shadow p-4 flex flex-col h-full lg:col-span-1`。
  - **头部 (标题 + 时间选择器)**: `flex justify-between items-center mb-2` (已有)。
    - 标题 (`h3`): `text-base font-semibold text-gray-800` (已有)。
    - 时间选择器 (`TimeRangeSelector`): (已有)。
  - **图表容器 (`div.chart-container`)**: `flex-grow relative`。
    - 加载状态: `flex justify-center items-center h-full text-gray-500`。
    - 图表 (`LineChart`): 移除 `height` prop，使其自适应父容器。

**9. 第四行卡片样式设计 (服务数据量图表)**

- **卡片容器 (`div` in `v-for` loop in `src/views/PlatformOverview.vue`)**:
  - 样式与第三行图表卡片容器一致: `bg-white rounded-lg shadow p-4 flex flex-col h-full`。
- **头部 (标题 + 时间选择器)**:
  - 样式与第三行图表卡片头部一致: `flex justify-between items-center mb-2`。
  - 标题 (`h3`): `text-base font-semibold text-gray-800`。
  - 时间选择器 (`TimeRangeSelector`)。
- **图表容器 (`div.chart-container`)**:
  - 样式与第三行图表卡片容器一致: `flex-grow relative`。
  - 加载状态: `flex justify-center items-center h-full text-gray-500`。
  - 图表 (`LineChart`):
    - 通过 `class="h-full w-full"` 自适应父容器高度。
    - 区域填充 (`areaStyle`) 由 `serviceCharts` 数据配置决定。
    - _设计说明_: 虽然布局上让图表填充剩余空间，但如果需要刻意减小第四行图表的高度以匹配原始图片视觉效果，可以考虑为 `.chart-container` 添加 `max-h-[...]` 限制或调整卡片内边距。当前实现为填充高度。
