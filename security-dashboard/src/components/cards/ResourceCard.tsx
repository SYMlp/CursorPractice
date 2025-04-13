import React from 'react';

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  metrics: {
    label: string;
    value: number;
    color: string;
    icon?: React.ReactNode;
  }[];
  growthItems?: {
    label: string;
    value: number;
    isUp: boolean;
  }[];
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  icon, 
  title, 
  count, 
  metrics,
  growthItems 
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-5">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      
      <div className="flex flex-col md:flex-row mb-6">
        <div className="flex-shrink-0 w-16 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <div className="text-blue-500">
              {icon}
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center px-4">
          <div className="text-sm text-gray-500 mb-1">资源总量</div>
          <div className="text-3xl font-bold text-gray-900">{count.toLocaleString()}</div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {metric.icon && (
                  <div 
                    className="mr-2 flex items-center justify-center w-5 h-5 rounded-full" 
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <div style={{ color: metric.color }}>
                      {metric.icon}
                    </div>
                  </div>
                )}
                <span className="text-gray-600 text-sm" title={metric.label}>
                  {metric.label}
                </span>
              </div>
              <span className="font-medium text-sm" style={{ color: metric.color }}>
                {metric.value.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {growthItems && growthItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {growthItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">{item.label}:</span>
              <div className={`flex items-center font-medium text-sm px-2 py-1 rounded-full ${
                item.isUp ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
              }`}>
                {item.value}%
                <span className="ml-1 font-bold">{item.isUp ? '↑' : '↓'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceCard; 