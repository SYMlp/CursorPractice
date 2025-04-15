import React from 'react';
import notificationService, { NotificationProvider, GlobalNotificationListener } from '../../services/NotificationService';

const NotificationServiceExample: React.FC = () => {
  const showSuccessNotification = () => {
    notificationService.success('操作成功', '数据已成功保存到数据库');
  };

  const showWarningNotification = () => {
    notificationService.warning('注意', '该操作可能导致数据丢失，请谨慎操作');
  };

  const showErrorNotification = () => {
    notificationService.error('操作失败', '连接服务器失败，请检查网络连接');
  };

  const showInfoNotification = () => {
    notificationService.info('提示信息', '系统将于今晚23:00进行维护');
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">通知服务示例</h2>
      <p className="mb-4">这个示例展示了如何使用全局通知服务。点击下方按钮触发不同类型的通知：</p>
      
      <div className="flex flex-wrap gap-4">
        <button
          onClick={showSuccessNotification}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          显示成功通知
        </button>
        
        <button
          onClick={showWarningNotification}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
        >
          显示警告通知
        </button>
        
        <button
          onClick={showErrorNotification}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          显示错误通知
        </button>
        
        <button
          onClick={showInfoNotification}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          显示信息通知
        </button>
      </div>
      
      {/* 在实际应用中，GlobalNotificationListener 应该放在应用的根组件中 */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-medium mb-2">使用说明：</h3>
        <p className="text-sm">
          1. 在应用根组件中包裹 <code className="bg-gray-200 px-1 rounded">NotificationProvider</code>
        </p>
        <p className="text-sm">
          2. 在根组件中添加 <code className="bg-gray-200 px-1 rounded">GlobalNotificationListener</code>
        </p>
        <p className="text-sm">
          3. 在任意组件中通过 <code className="bg-gray-200 px-1 rounded">notificationService</code> 显示通知
        </p>
        <p className="text-sm">
          4. 还可以通过 <code className="bg-gray-200 px-1 rounded">useNotification</code> Hook 在组件中直接使用
        </p>
      </div>
    </div>
  );
};

// 包装后的示例组件，包含 Provider 和 Listener
const WrappedNotificationServiceExample: React.FC = () => {
  return (
    <NotificationProvider>
      <GlobalNotificationListener />
      <NotificationServiceExample />
    </NotificationProvider>
  );
};

export default WrappedNotificationServiceExample; 