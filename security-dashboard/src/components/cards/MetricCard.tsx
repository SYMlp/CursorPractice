import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color = 'bg-blue-500',
  className = '',
}) => {
  return (
    <div className={`flex items-center p-4 rounded-lg shadow ${color} ${className}`}>
      <div className="mr-4 text-white">{icon}</div>
      <div>
        <div className="text-sm font-medium text-white/80">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
};

export default MetricCard; 