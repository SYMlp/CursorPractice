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
  color = '#4096ff',
}) => {
  return (
    <div className="h-full bg-white border border-gray-100 rounded-lg p-4">
      <div className="flex">
        <div className="flex-shrink-0 text-blue-500 flex items-center mr-4">
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">{title}</div>
          <div className="text-3xl font-bold mb-3">{count}</div>
          
          <div className="flex justify-between mt-2 text-sm">
            <div>
              <div >已下发</div>
              <div className="text-green-500">{baseCount}</div>
            </div>
            <div>
              <div>已撤销</div>
              <div className="text-red-500">{todayCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleCard; 