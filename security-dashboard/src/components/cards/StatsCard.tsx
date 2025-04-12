import React from 'react';

interface StatItem {
  label: string;
  value: string | number;
}

interface StatsCardProps {
  title?: string;
  stats: StatItem[];
  description?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  stats,
  description,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-5 ${className}`}>
      {title && (
        <h3 className="text-base font-medium text-gray-700 mb-4">{title}</h3>
      )}
      
      <div className="flex justify-around">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-800">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {description && (
        <div className="mt-4 text-sm text-gray-600 px-4 py-3 bg-gray-50 rounded">
          {description}
        </div>
      )}
    </div>
  );
};

export default StatsCard; 