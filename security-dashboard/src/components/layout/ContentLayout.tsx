import React, { ReactNode } from 'react';

interface ContentLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  extra?: ReactNode;
}

/**
 * 内容布局组件
 * 用于主内容区域的布局，提供标题区域和内容区域的结构
 */
const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  title,
  subtitle,
  extra
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col">
      {/* 头部区域 */}
      {(title || extra) && (
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div>
            {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {extra && <div className="flex items-center">{extra}</div>}
        </div>
      )}
      
      {/* 内容区域 */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default ContentLayout; 