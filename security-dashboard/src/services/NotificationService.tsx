import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import Notification from '../components/common/Notification';

type NotificationType = 'success' | 'warning' | 'error' | 'info';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (props: NotificationProps) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [visible, setVisible] = useState(false);

  const showNotification = (props: NotificationProps) => {
    setNotification(props);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration || 3000}
          visible={visible}
          onClose={handleClose}
        />
      )}
    </NotificationContext.Provider>
  );
};

// 便捷函数，用于直接调用通知
const notificationService = {
  success: (title: string, message: string, duration = 3000) => {
    const event = new CustomEvent('show-notification', {
      detail: { type: 'success', title, message, duration }
    });
    window.dispatchEvent(event);
  },
  
  warning: (title: string, message: string, duration = 4000) => {
    const event = new CustomEvent('show-notification', {
      detail: { type: 'warning', title, message, duration }
    });
    window.dispatchEvent(event);
  },
  
  error: (title: string, message: string, duration = 5000) => {
    const event = new CustomEvent('show-notification', {
      detail: { type: 'error', title, message, duration }
    });
    window.dispatchEvent(event);
  },
  
  info: (title: string, message: string, duration = 3000) => {
    const event = new CustomEvent('show-notification', {
      detail: { type: 'info', title, message, duration }
    });
    window.dispatchEvent(event);
  }
};

// 全局事件监听器组件，用于在未使用React上下文的地方调用通知
export const GlobalNotificationListener: React.FC = () => {
  const { showNotification } = useNotification();
  
  useEffect(() => {
    const handleShowNotification = (event: Event) => {
      const { type, title, message, duration } = (event as CustomEvent).detail;
      showNotification({ type, title, message, duration });
    };
    
    window.addEventListener('show-notification', handleShowNotification);
    
    return () => {
      window.removeEventListener('show-notification', handleShowNotification);
    };
  }, [showNotification]);
  
  return null;
};

export default notificationService; 