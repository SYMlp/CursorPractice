# 图表组件

本目录包含安全大屏项目中使用的图表可视化组件，基于ECharts封装实现。

## 组件列表

### BarChart.tsx
柱状图组件，用于比较不同类别之间的数量关系。

**参数说明：**
- `data`: 柱状图数据，包含类别和值
- `color`: 柱状图颜色(可选)
- `showLabel`: 是否显示数据标签(默认false)

**使用场景：**
- 登录用户TOP排行
- 各类资源数量比较
- 不同时间段的数量对比

### CircularProgress.tsx
环形进度图，用于直观展示完成度或占比情况。

**参数说明：**
- `percentage`: 百分比值(0-100)
- `title`: 标题文本
- `color`: 进度条颜色
- `size`: 图表大小(可选)

**使用场景：**
- 资源类型分布
- 任务完成情况
- 安全评分展示

### LineChart.tsx
折线图组件，用于展示时间序列数据，观察趋势变化。

**参数说明：**
- `title`: 图表标题
- `xAxisData`: X轴数据，通常为时间点
- `series`: 数据系列，包含名称和数据点
- `showLegend`: 是否显示图例(默认false)
- `areaStyle`: 是否显示面积填充(默认false)
- `height`: 图表高度(像素值，默认250)

**使用场景：**
- 接口调用量趋势
- 资源使用情况变化
- 安全事件时间分布

### MultiLineChart.tsx
多线折线图组件，用于比较多组时间序列数据。

**参数说明：**
- `title`: 图表标题
- `xAxisData`: X轴数据，通常为时间点
- `series`: 多组数据系列
- `showLegend`: 是否显示图例(默认true)
- `colors`: 自定义线条颜色(可选)

**使用场景：**
- 多种指标对比
- 不同服务性能比较
- 多维度数据对比分析

### NetworkTopology.tsx
网络拓扑图组件，用于展示网络节点之间的连接关系。

**参数说明：**
- `data`: 节点和连接数据
- `layout`: 布局类型，如'force'或'circular'(默认'force')
- `height`: 图表高度(可选)

**使用场景：**
- 网络架构展示
- 接口调用关系可视化
- 资源依赖关系展示

### PieChart.tsx
饼图/环图组件，用于展示数据的占比分布。

**参数说明：**
- `data`: 饼图数据，包含名称和值
- `showPercentage`: 是否显示百分比(默认true)
- `donut`: 是否为环形图(默认true)
- `colors`: 自定义颜色(可选)

**使用场景：**
- 接口安全分布
- 资源类型占比
- 业务行业分布

## TopRankingCard

通用排名展示组件，支持多种展示方式（表格、柱状图、条形图、饼图、环形图等）。

### 特性

- 支持多种展示形式：表格、柱状图、水平条形图、饼图、环形图、进度条
- 统一的标题和数据展示风格
- 灵活的配置选项
- 支持点击交互
- 响应式布局
- 支持自适应容器高度

### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 排名卡片标题 |
| data | RankingItem[] | [] | 排名数据 |
| total | number | - | 数据总数（用于显示"共计X个"） |
| chartType | 'bar' \| 'horizontal-bar' \| 'pie' \| 'donut' \| 'table' \| 'progress-bar' | 'progress-bar' | 图表类型 |
| maxItems | number | 5 | 最多显示项目数 |
| valueLabel | string | '值' | 值的标签名 |
| valueFormatter | function | (value) => value.toLocaleString() | 值的格式化函数 |
| height | number \| string | 280 | 图表高度（当fitContainer为false时使用） |
| onClick | function | - | 点击项目时的回调函数 |
| moreLink | string | - | "更多"链接地址 |
| loading | boolean | false | 是否显示加载状态 |
| className | string | '' | 额外的CSS类名 |
| showRank | boolean | true | 是否显示排名 |
| showHeader | boolean | true | 是否显示标题栏 |
| showProgress | boolean | true | 是否显示进度条（进度条模式下） |
| fitContainer | boolean | false | 是否自适应容器高度，设置为true时会自动填充父容器空间 |

### 使用示例

```tsx
// 进度条样式（自适应容器高度）
<TopRankingCard
  title="数据交互量应用TOP"
  data={applicationInteractionRankData}
  total={21}
  maxItems={5}
  chartType="progress-bar"
  valueLabel="交互量"
  moreLink="#"
  fitContainer={true}
/>

// 柱状图样式（固定高度）
<TopRankingCard
  title="频繁登录用户TOP"
  data={frequentLoginUserRankData}
  total={21}
  maxItems={5}
  chartType="bar"
  valueLabel="登录次数"
  height={280}
  moreLink="#"
/>

// 水平条形图样式
<TopRankingCard
  title="风险最多业务应用TOP"
  data={riskBusinessRankData}
  total={21}
  maxItems={5}
  chartType="horizontal-bar"
  valueLabel="风险数"
  moreLink="#"
  fitContainer={true}
/>

// 表格样式
<TopRankingCard
  title="数据使用风险最多人员TOP"
  data={riskUserRankData}
  total={21}
  maxItems={5}
  chartType="table"
  valueLabel="风险数"
  moreLink="#"
  fitContainer={true}
/>

// 环形图样式（作为嵌套组件使用）
<div className="h-full flex flex-col">
  <div className="flex justify-between items-center mb-3">
    <h3 className="text-base font-medium text-gray-700">告警类型分布</h3>
    <TimeRangeSelector currentRange={timeRange} onChange={handleChange} />
  </div>
  <div className="flex-grow">
    <TopRankingCard
      title=""
      data={alarmTypeDistributionData}
      chartType="donut"
      showHeader={false}
      fitContainer={true}
    />
  </div>
</div>
```

## 使用注意事项

1. **响应式设计**：所有图表组件均支持容器大小变化，会自动调整尺寸
2. **数据格式**：请确保提供的数据符合组件要求的格式
3. **性能考虑**：图表数据量较大时，考虑使用分页或数据抽样
4. **主题适配**：图表颜色可通过props自定义，以适应不同主题

## 扩展与定制

如需扩展或定制图表，可以：

1. 扩展现有组件，添加新的配置选项
2. 基于ECharts创建新的图表组件
3. 修改图表样式，使用自定义主题

## 示例代码

```tsx
// 使用折线图展示时间趋势
<LineChart 
  title="接口调用趋势"
  xAxisData={['8:00', '10:00', '12:00', '14:00', '16:00', '18:00']}
  series={[{
    name: '调用次数', 
    data: [120, 180, 150, 220, 190, 210]
  }]}
  showLegend={true}
  areaStyle={true}
/>

// 使用饼图展示分布情况
<PieChart 
  data={[
    { value: 40, name: '正常' },
    { value: 25, name: '警告' },
    { value: 15, name: '错误' },
    { value: 20, name: '未知' }
  ]}
  showPercentage={true}
  donut={true}
/>
```

## 更新记录

- 2024-05-01: 增强CircularProgress组件，添加水平布局支持，百分比字体加粗和显示在环形图内部
- 2023-12-18: 优化图表样式，统一配色方案
- 2023-11-01: 初始版本 