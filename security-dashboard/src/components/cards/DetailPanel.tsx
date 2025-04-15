import React from 'react';

interface DetailItem {
  label: string;
  value: React.ReactNode;
}

interface DetailPanelProps {
  title: string;
  items: DetailItem[];
  className?: string;
}

/**
 * 详情面板组件
 * 
 * 用于显示选中节点或边的详细信息
 */
const DetailPanel: React.FC<DetailPanelProps> = ({
  title,
  items,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <h3 className="text-sm font-medium border-b border-gray-200 pb-2 mb-2">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.label}：</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPanel; 