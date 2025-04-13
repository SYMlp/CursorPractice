# 卡片组件

本目录包含安全大屏项目中使用的各类数据卡片组件，用于展示各种指标和统计数据。

## 组件列表

### ResourceCard.tsx
资源管理卡片，展示资源总量、增长情况和分项指标。

**参数说明：**
- `icon`: 卡片图标
- `title`: 卡片标题
- `count`: 资源总数
- `metrics`: 资源各项指标
- `growthItems`: 增长指标数组

**使用场景：**
- 资源管理大屏
- 资源总览模块
- 资源增长情况展示

### RuleCard.tsx
安全规则卡片，展示安全规则数据和今日增量。

**参数说明：**
- `icon`: 规则图标
- `title`: 规则名称
- `count`: 规则总数
- `baseCount`: 基准数
- `todayCount`: 今日新增
- `color`: 主题颜色

**使用场景：**
- 安全规则展示
- 风险规则统计
- 策略规则管理

### PasswordRuleCard.tsx
密码规则专用卡片，展示密码安全规则详情和状态。使用专门的密码规则图标。

**参数说明：**
- `title`: 规则名称
- `description`: 规则描述
- `isActive`: 是否启用
- `severity`: 规则严重程度（'low' | 'medium' | 'high'）

**使用场景：**
- 密码安全规则页面
- 安全策略配置
- 密码规则详情展示

**特点：**
- 使用 passwordRule 图标
- 支持规则严重程度区分
- 显示规则启用/禁用状态

### InterfaceCard.tsx
接口管理卡片，展示接口数量和安全指标。

**参数说明：**
- `icon`: 接口图标
- `title`: 卡片标题
- `count`: 接口总数
- `securityRate`: 安全率百分比
- `details`: 接口详情列表

**使用场景：**
- 接口管理大屏
- API安全监控
- 接口健康状况展示

### MetricCard.tsx
通用指标卡片，用于展示单一指标数据。

**参数说明：**
- `title`: 指标名称
- `value`: 指标值
- `color`: 主题颜色
- `icon`: 指标图标

**使用场景：**
- 顶部指标展示
- 关键数据一览
- 简洁数据展示

### RankingCard.tsx
排名卡片，用于展示TOP数据排行。

**参数说明：**
- `title`: 排行标题
- `items`: 排行项目数组
- `valueLabel`: 值标签文本(可选)
- `maxItems`: 最大显示条数(可选)

**使用场景：**
- TOP数据展示
- 排行榜展示
- 业务数据优先级展示

### StatsCard.tsx
统计卡片，展示多项相关指标。

**参数说明：**
- `title`: 卡片标题
- `icon`: 卡片图标(可选)
- `mainValue`: 主要数值
- `mainLabel`: 主要标签
- `stats`: 统计项数组

**使用场景：**
- 综合数据展示
- 多维度指标展示
- 数据分组统计

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

// 排名卡片示例
<RankingCard
  title="热门接口TOP5"
  items={[
    { id: 1, name: "用户认证接口", value: "12,456" },
    { id: 2, name: "数据查询接口", value: "8,302" },
    { id: 3, name: "日志记录接口", value: "6,157" },
    { id: 4, name: "文件上传接口", value: "5,891" },
    { id: 5, name: "消息推送接口", value: "4,502" }
  ]}
  valueLabel="调用次数"
/>
```

## 扩展卡片组件

如需创建新的卡片组件，建议：

1. 遵循现有组件的命名和结构规范
2. 使用TypeScript定义清晰的props接口
3. 使用Tailwind CSS实现样式
4. 保持组件内部结构简洁，专注于单一职责

## 更新记录

- 2023-11-01: 初始版本
- 2023-12-15: 添加 PasswordRuleCard 组件，用于密码规则展示
- 2023-12-18: 优化所有卡片组件布局和间距，使其更加紧凑；添加文本溢出处理机制(text-overflow, truncate)；改进数值显示的响应式特性 