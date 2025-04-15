# 服务目录

本目录包含应用中的各种服务层代码，主要负责处理业务逻辑、数据处理和全局功能。

## 服务列表

### NotificationService

全局通知服务，用于在应用的任何位置触发通知消息。

**特性：**
- 提供简单API用于显示四种类型的通知：成功、警告、错误和信息
- 基于React Context实现，支持在组件树中任何位置使用
- 提供全局事件系统，支持在非React代码中触发通知
- 通知自动处理显示和关闭逻辑

**使用方式一：通过服务API直接调用**

```tsx
import notificationService from '../services/NotificationService';

// 显示成功通知
notificationService.success('操作成功', '数据已成功保存');

// 显示警告通知
notificationService.warning('注意', '该操作可能导致数据丢失');

// 显示错误通知
notificationService.error('操作失败', '连接服务器失败');

// 显示信息通知
notificationService.info('提示信息', '系统将于今晚维护');
```

**使用方式二：通过React Hook在组件中使用**

```tsx
import { useNotification } from '../services/NotificationService';

function MyComponent() {
  const { showNotification } = useNotification();
  
  const handleAction = () => {
    // 执行某些操作后显示通知
    showNotification({
      type: 'success',
      title: '操作成功',
      message: '数据已保存',
      duration: 3000
    });
  };
  
  return (
    <button onClick={handleAction}>保存</button>
  );
}
```

**全局配置：**

在应用根组件中配置通知服务提供者和监听器：

```tsx
import { NotificationProvider, GlobalNotificationListener } from '../services/NotificationService';

function App() {
  return (
    <NotificationProvider>
      <GlobalNotificationListener />
      {/* 应用其他组件 */}
    </NotificationProvider>
  );
}
```

## 开发规范

1. 服务应该关注点分离，每个服务负责一个特定的功能领域
2. 使用TypeScript类型定义增强代码安全性和可读性
3. 服务应该提供简洁明了的API接口
4. 避免在服务中引入UI组件的直接依赖，保持逻辑和视图的分离
5. 服务应该处理异常情况和边缘情况
6. 对于全局状态管理，优先使用React Context
7. 提供详细的文档和使用示例 