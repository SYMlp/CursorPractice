import React from 'react';

interface InterfaceCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  securityRate: number;
  details?: {
    label: string;
    count: number;
    percentage: number;
    color: string;
  }[];
}

const InterfaceCard: React.FC<InterfaceCardProps> = ({ 
  icon, 
  title, 
  count, 
  securityRate,
  details 
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center mr-3">
          <div className="text-blue-500">
            {icon}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-gray-500 text-sm mb-1">
            {title}
          </div>
          <div className="text-3xl font-bold">
            {count.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-2 px-1">
        <div className="text-xs text-gray-500 mb-1">接口分布率</div>
        <div className="ml-auto text-blue-500 font-medium text-sm">
          {securityRate.toFixed(1)}%
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded overflow-hidden mb-4">
        <div 
          className="h-full bg-blue-500 rounded" 
          style={{ width: `${securityRate}%` }}
        ></div>
      </div>
      
      {details && details.length > 0 && (
        <div className="space-y-2 mt-auto">
          {details.map((detail, index) => (
            <div key={index} className="flex items-center text-xs">
              <div 
                className="w-2.5 h-2.5 mr-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: detail.color }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-600 truncate" title={detail.label}>
                  {detail.label}
                </div>
              </div>
              <div className="ml-2 whitespace-nowrap flex-shrink-0">
                <span className="text-gray-700 font-medium">
                  {detail.count}
                </span>
                <span className="text-gray-500 ml-1">
                  ({detail.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterfaceCard; 