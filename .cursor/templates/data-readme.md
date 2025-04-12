# [数据模块名称]

[简短模块描述]

## 数据模型定义

### [模型1名称]

```typescript
interface [模型1名称] {
  // 字段定义
  field1: string;    // [字段1说明]
  field2: number;    // [字段2说明]
  field3: boolean;   // [字段3说明]
  
  // 嵌套对象
  nestedObject?: {
    subField1: string;   // [子字段1说明]
    subField2: number;   // [子字段2说明]
  };
  
  // 数组类型
  items: Array<{
    id: number;          // [ID说明]
    name: string;        // [名称说明]
  }>;
}
```

### [模型2名称]

```typescript
interface [模型2名称] {
  // 字段定义
  // ...
}
```

## 模拟数据示例

```typescript
// [模型1]示例数据
export const sample[模型1名称]Data: [模型1名称] = {
  field1: "示例值",
  field2: 42,
  field3: true,
  items: [
    { id: 1, name: "项目1" },
    { id: 2, name: "项目2" }
  ]
};
```

## 使用场景

- **[场景1]**: [描述如何在该场景使用此数据模型]
- **[场景2]**: [描述如何在该场景使用此数据模型]

## 数据流向

描述数据在应用中的流向：

1. 数据来源: [描述数据来源]
2. 数据处理: [描述数据处理过程]
3. 数据展示: [描述数据如何被展示]

## API集成指南

当将模拟数据替换为真实API时：

```typescript
// 获取[模型1]数据的API函数
export const fetch[模型1名称]Data = async (): Promise<[模型1名称]> => {
  try {
    const response = await fetch('/api/endpoint');
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return default[模型1名称]Data; // 返回默认数据作为fallback
  }
};
```

## 注意事项

- [数据使用注意事项1]
- [数据使用注意事项2]

## 更新记录

- YYYY-MM-DD: [描述更新内容] 