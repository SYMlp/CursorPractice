import React from 'react';

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  metrics: {
    label: string;
    value: number;
    color: string;
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
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <div className="mr-4 flex-shrink-0">{icon}</div>
        <div>
          <div className="text-sm text-gray-500 mb-1">{title}</div>
          <div className="text-3xl font-bold">{count.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{metric.label}</span>
            <span 
              className="font-semibold" 
              style={{ color: metric.color }}
            >
              {metric.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      {growthItems && growthItems.length > 0 && (
        <div className="flex mt-4 text-xs">
          {growthItems.map((item, index) => (
            <div key={index} className="flex items-center mr-4">
              <span className="mr-1">{item.label}</span>
              <span className={item.isUp ? 'text-green-500' : 'text-red-500'}>
                {item.isUp ? '↑' : '↓'}{item.value}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceCard; 