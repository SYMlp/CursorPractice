# [组件名称]

[简短组件描述]

## 功能说明

[详细描述组件的功能和用途]

## 参数说明

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|-------|------|------|-------|------|
| `prop1` | `string` | 是 | - | [参数说明] |
| `prop2` | `number` | 否 | `0` | [参数说明] |
| `prop3` | `() => void` | 否 | - | [参数说明] |

## 使用示例

```tsx
import { ComponentName } from './path/to/component';

// 基础用法
<ComponentName prop1="value" />

// 高级用法
<ComponentName 
  prop1="value"
  prop2={42}
  prop3={() => console.log('Callback triggered')}
/>
```

## 注意事项

- [使用注意事项1]
- [使用注意事项2]

## 与其他组件的关系

- 常与[组件A]一起使用
- 可被[组件B]包含
- 基于[基础组件C]开发

## 更新记录

- YYYY-MM-DD: [描述更新内容] 