import React from 'react';

interface RuleCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  baseCount: number;
  todayCount: number;
  color?: string;
}

const RuleCard: React.FC<RuleCardProps> = ({ 
  icon, 
  title, 
  count, 
  baseCount, 
  todayCount,
  color = '#3b82f6'
}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex items-center mb-3">
        <div className="mr-4" style={{ color }}>
          {icon}
        </div>
        <div>
          <div className="text-lg font-semibold">{count}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>
      
      <div className="flex text-xs text-gray-500 mt-2 justify-between">
        <div>已下发 {baseCount}</div>
        <div>已替换 {todayCount}</div>
      </div>
    </div>
  );
};

export default RuleCard; 