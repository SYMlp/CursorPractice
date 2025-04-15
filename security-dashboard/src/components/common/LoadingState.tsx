import React from 'react';

interface LoadingStateProps {
  /**
   * 加载图标的大小
   * @default 24
   */
  size?: number;
  
  /**
   * 加载提示文本
   */
  text?: string;
  
  /**
   * 自定义容器类名
   */
  className?: string;
  
  /**
   * 加载图标的颜色
   * @default 'text-blue-500'
   */
  iconColor?: string;
}

/**
 * 通用加载状态组件
 * 
 * 用于展示加载中的状态，支持自定义大小、文字和样式
 * 
 * @example
 * ```tsx
 * <LoadingState />
 * ```
 * 
 * @example
 * ```tsx
 * <LoadingState text="数据加载中..." size={32} />
 * ```
 */
const LoadingState: React.FC<LoadingStateProps> = ({
  size = 24,
  text,
  className = '',
  iconColor = 'text-blue-500'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center h-full ${className}`}>
      <svg 
        className={`w-${size} h-${size} animate-spin ${iconColor}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      
      {text && (
        <p className="mt-2 text-sm text-gray-500">{text}</p>
      )}
    </div>
  );
};

export default LoadingState; 