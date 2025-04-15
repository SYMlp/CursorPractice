import React, { useState } from 'react';
import Notification from '../common/Notification';

const NotificationExample: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleShowSuccess = () => {
    setShowSuccess(true);
  };

  const handleShowWarning = () => {
    setShowWarning(true);
  };

  const handleShowError = () => {
    setShowError(true);
  };

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">通知组件示例</h2>
      
      <div className="flex space-x-4 mb-8">
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleShowSuccess}
        >
          显示成功通知
        </button>
        
        <button 
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={handleShowWarning}
        >
          显示警告通知
        </button>
        
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleShowError}
        >
          显示错误通知
        </button>
        
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleShowInfo}
        >
          显示信息通知
        </button>
      </div>

      <Notification
        type="success"
        title="操作成功"
        message="数据已成功保存到数据库"
        duration={3000}
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <Notification
        type="warning"
        title="注意"
        message="该操作可能导致数据丢失，请谨慎操作"
        duration={4000}
        visible={showWarning}
        onClose={() => setShowWarning(false)}
      />

      <Notification
        type="error"
        title="操作失败"
        message="连接服务器失败，请检查网络连接"
        duration={5000}
        visible={showError}
        onClose={() => setShowError(false)}
      />

      <Notification
        type="info"
        title="提示信息"
        message="系统将于今晚23:00进行维护"
        duration={3000}
        visible={showInfo}
        onClose={() => setShowInfo(false)}
      />
    </div>
  );
};

export default NotificationExample; 