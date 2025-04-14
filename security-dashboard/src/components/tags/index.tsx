import React, { ReactNode } from 'react';

interface TagProps {
  text: string;
}

interface TooltipProps {
  title: string;
  children: ReactNode;
}

/**
 * 风险标签组件
 * 用于展示风险类型，如"存储空间不足"、"备份文件损坏"等
 */
export const RiskTag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="inline-block bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full">
      {text}
    </span>
  );
};

/**
 * 能力标签组件
 * 用于展示防护能力类型，如"权限管控"、"多维认证"等
 */
export const CapabilityTag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
      {text}
    </span>
  );
};

/**
 * 自定义提示组件
 * 用于展示长文本的悬浮提示
 */
export const CustomTooltip: React.FC<TooltipProps> = ({ title, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 w-auto max-w-xs whitespace-normal -translate-y-full left-0 top-0 mt-0 mb-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {title}
        <div className="absolute top-full left-3 h-2 w-2 bg-gray-900 transform rotate-45 pointer-events-none"></div>
      </div>
    </div>
  );
}; 