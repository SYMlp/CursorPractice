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
    color?: string;
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
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <div className="mr-4 text-blue-500 flex-shrink-0">{icon}</div>
        <div>
          <div className="text-sm text-gray-500 mb-1">{title}</div>
          <div className="text-3xl font-bold">{count.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm mb-3">
        <span className="text-gray-600">安全防护覆盖率</span>
        <span className="font-semibold text-blue-600">{securityRate.toFixed(1)}%</span>
      </div>
      
      {details && details.length > 0 && (
        <div className="text-xs space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: detail.color || '#3b82f6' }}
                ></div>
                <span>{detail.label}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{detail.count}</span>
                <span className="text-gray-500">{detail.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterfaceCard; 