# 卡片组件目录

本目录包含各种卡片类UI组件，用于展示结构化数据的不同展示形式。

## 组件列表

### StatisticCard

统计卡片组件，用于显示关键统计指标，如数据总量、数据分类数等。

**特性：**
- 简洁的卡片设计，展示标签和数值
- 支持可选图标
- 可自定义样式

**使用示例：**
```tsx
<StatisticCard
  label="数据总量"
  value="2,4324"
  className="bg-gray-50"
/>
```

### RankingCard

排行榜卡片组件，用于展示各类TOP数据，如风险最多数据资源、高风险用户等。

**特性：**
- 支持序号标记
- 可显示标签
- 支持自定义最大显示数量
- 提供"更多"链接
- 支持项目点击回调

**使用示例：**
```tsx
<RankingCard
  title="风险最多数据资源TOP"
  data={riskResourceData}
  totalCount={21}
  showTag={true}
  tagComponent={RiskTag}
  onItemClick={handleItemClick}
/>
```

### DetailPanel

详情面板组件，用于展示结构化的详细信息，如节点或连接的属性详情。

**特性：**
- 清晰的标题和内容分区
- 支持键值对列表展示
- 支持任何类型的值（文本、数字、节点等）
- 可自定义样式

**使用示例：**
```tsx
<DetailPanel
  title="节点详情"
  items={[
    { label: '节点类型', value: 'resource' },
    { label: '访问次数', value: '10,245' },
    { label: '风险等级', value: '高风险' }
  ]}
/>
```

## 使用指南

卡片组件设计用于数据展示，通常应放置在布局组件（如网格或弹性盒）内。每个组件都支持className属性以实现进一步的样式自定义。

## 开发规范

1. 卡片组件应专注于数据展示，避免复杂的业务逻辑
2. 优先使用Tailwind CSS实现样式
3. 使用TypeScript类型确保类型安全
4. 每个组件应有清晰的props接口定义
5. 提供合理的默认值，减少使用时的配置负担

## 设计风格统一

所有卡片组件遵循以下设计原则：

1. **一致的视觉风格**：白色背景、圆角边框、细微阴影
2. **响应式设计**：适应不同屏幕尺寸和布局
3. **简洁清晰**：关注数据展示，减少视觉干扰
4. **可定制性**：支持通过props定制颜色和样式

## 卡片布局规范

卡片组件内部元素布局遵循以下规范：

1. **标题区域**：左侧标题文本，右侧可放置额外操作或说明
2. **内容区域**：主要数据或图表展示
3. **底部区域**：辅助信息或额外操作按钮

## 使用示例

```tsx
// 资源卡片示例
<ResourceCard 
  icon={<DatabaseIcon />}
  title="资源总量"
  count={1234}
  metrics={[
    { label: "云服务器", count: 532 },
    { label: "数据库", count: 267 },
    { label: "存储空间", count: 435 }
  ]}
  growthItems={[
    { label: "周增长", count: 12, trend: "up" },
    { label: "月增长", count: 45, trend: "up" }
  ]}
/>

// 指标卡片示例
<MetricCard
  title="接口安全率"
  value="98.7%"
  color="green"
  icon={<ShieldIcon size={28} />}
/>
```

## 扩展卡片组件

如需创建新的卡片组件，建议：

1. 遵循现有组件的命名和结构规范
2. 使用TypeScript定义清晰的props接口
3. 使用Tailwind CSS实现样式
4. 保持组件内部结构简洁，专注于单一职责

## 更新记录

- 2024-06-25: 更新README，移除不存在的组件引用，保留当前使用的组件
- 2023-12-18: 优化所有卡片组件布局和间距，使其更加紧凑；添加文本溢出处理机制(text-overflow, truncate)；改进数值显示的响应式特性
- 2023-11-01: 初始版本 