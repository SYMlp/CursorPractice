# 图标组件

本目录包含安全大屏项目中使用的图标组件，采用SVG格式实现的可定制图标库。

## 文件说明

- `Icons.tsx`: 核心基础图标集合，包含常用通用图标
- `AssetIcons.tsx`: 资产相关图标，用于资产监测大屏
- `MonitoringIcons.tsx`: 监控相关图标，用于接口监控大屏

## 图标设计原则

1. **一致性**: 所有图标遵循统一的设计语言和比例
2. **简洁性**: 图标设计简洁明了，便于识别
3. **可扩展性**: 支持自定义大小和颜色
4. **无状态**: 图标组件是纯展示组件，不包含状态

## 图标组件通用Props

所有图标组件接收以下统一的参数：

- `size`: 图标尺寸，单位为像素(默认24)
- `color`: 图标颜色，可使用任何有效的CSS颜色值(默认当前字体颜色)
- `className`: 自定义CSS类名，用于额外样式定制
- `style`: 自定义内联样式对象

## 基础图标列表 (Icons.tsx)

基础图标集合包含以下图标：

- `DatabaseIcon`: 数据库图标
- `ShieldIcon`: 安全防护盾图标
- `AlertIcon`: 警告图标
- `DocumentIcon`: 文档图标
- `CheckListIcon`: 检查清单图标
- `LayersIcon`: 分层图标
- `InterfaceIcon`: 接口图标

## 资产图标列表 (AssetIcons.tsx)

资产相关图标包含：

- `SecurityIcon`: 安全图标
- `FilterIcon`: 筛选图标
- `SearchIcon`: 搜索图标
- `UserIcon`: 用户图标
- `ApplicationIcon`: 应用图标
- `DataIcon`: 数据图标

## 监控图标列表 (MonitoringIcons.tsx)

监控相关图标包含：

- `ServerIcon`: 服务器图标
- `ApiIcon`: API接口图标
- `ConnectionIcon`: 连接图标
- `RequestIcon`: 请求图标
- `ResponseIcon`: 响应图标
- `MonitorIcon`: 监控图标

## 使用示例

```tsx
// 基础用法
<DatabaseIcon />

// 自定义大小和颜色
<ShieldIcon size={32} color="#3B82F6" />

// 添加自定义样式
<AlertIcon className="mr-2 animate-pulse" />

// 在卡片组件中使用
<MetricCard
  title="数据库服务"
  value="42"
  icon={<DatabaseIcon size={28} color="#9333EA" />}
/>
```

## 扩展图标库

如需添加新图标，请遵循以下步骤：

1. 确定图标所属类别，添加到对应文件中
2. 使用SVG路径定义图标
3. 统一使用24x24的视口大小
4. 确保图标支持颜色自定义

示例：
```tsx
export const NewIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', ...rest }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M12 2v20M2 12h20" />
    </svg>
  );
};
```

## 图标最佳实践

1. **适当的大小**: 根据上下文选择合适的图标大小
2. **对比度**: 确保图标颜色与背景有足够对比度
3. **语义化使用**: 选择符合功能语义的图标
4. **有限使用**: 避免在界面中过度使用图标

## 更新记录

- 2023-11-01: 初始版本 