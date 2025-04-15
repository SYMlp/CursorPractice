import React from 'react';

interface StatisticCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * 统计卡片组件
 * 
 * 用于展示关键统计指标，如数据总量、数据分类数、数据分级数等
 */
const StatisticCard: React.FC<StatisticCardProps> = ({ 
  label, 
  value, 
  icon, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 flex flex-col ${className}`}>
      <div className="flex items-center mb-1">
        {icon && <div className="mr-2">{icon}</div>}
        <div className="text-gray-600 text-sm">{label}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

export default StatisticCard; 