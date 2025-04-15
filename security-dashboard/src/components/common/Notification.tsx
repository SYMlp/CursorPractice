import React, { useEffect, useState } from 'react';

export type NotificationType = 'success' | 'warning' | 'error' | 'info';

interface NotificationProps {
  /**
   * 通知类型
   * @default 'info'
   */
  type?: NotificationType;
  
  /**
   * 通知标题
   */
  title: string;
  
  /**
   * 通知内容
   */
  message?: string;
  
  /**
   * 通知显示时间（毫秒），设为0则不自动关闭
   * @default 3000
   */
  duration?: number;
  
  /**
   * 通知关闭回调
   */
  onClose?: () => void;
  
  /**
   * 是否显示通知
   * @default true
   */
  visible?: boolean;
}

/**
 * 通知组件
 * 
 * 用于展示操作成功、警告或错误的消息提示
 * 
 * @example
 * ```tsx
 * <Notification 
 *   type="success" 
 *   title="操作成功" 
 *   message="数据已成功保存"
 * />
 * ```
 */
const Notification: React.FC<NotificationProps> = ({
  type = 'info',
  title,
  message,
  duration = 3000,
  onClose,
  visible = true,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  
  // 背景颜色和图标颜色
  const typeStyles = {
    success: {
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      borderColor: 'border-green-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
    warning: {
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
      borderColor: 'border-yellow-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    error: {
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      borderColor: 'border-red-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
    },
    info: {
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
  };
  
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);
  
  useEffect(() => {
    if (duration && duration > 0 && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, isVisible]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };
  
  if (!isVisible) {
    return null;
  }
  
  const { bgColor, iconColor, borderColor, icon } = typeStyles[type];
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`${bgColor} border-l-4 ${borderColor} p-4 rounded shadow-lg max-w-sm`}>
        <div className="flex items-start">
          <div className={`${iconColor} flex-shrink-0 mr-3`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            {message && <p className="mt-1 text-sm text-gray-600">{message}</p>}
          </div>
          <button
            type="button"
            className="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={handleClose}
          >
            <span className="sr-only">关闭</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;

// 添加自定义的CSS动画
// 请确保在全局CSS中添加以下样式
/*
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
*/ 