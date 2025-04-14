import React, { useMemo, useState } from 'react';
import ImageIcon from '../icons/ImageIcon';

// 导入图标
import southIcon from '../../assets/icons/interface/south.png';
import northIcon from '../../assets/icons/interface/north.png';

interface InterfaceCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  securityRate: number;
  publishRate: number; // 接口发布率
  callbackRate?: number;
  metrics?: {
    value: number;
    label?: string;
    color?: string;
  }[];
  publishedInterfaces?: { // 已发布接口的分类数据
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
  publishRate = 82.5, // 接口发布率
  callbackRate = 82.5,
  metrics = [],
  publishedInterfaces = []
}) => {
  // 添加选中状态
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);

  // 格式化数字显示
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      const tenThousand = Math.floor(num / 10000);
      const remainder = num % 10000;
      return `${tenThousand}万${remainder}`;
    }
    return num.toString();
  };

  // 计算总百分比，确保加起来是100%
  const totalPercentage = useMemo(() => 
    publishedInterfaces.reduce((sum, item) => sum + item.percentage, 0), 
    [publishedInterfaces]
  );
  
  const scaleFactor = useMemo(() => 
    totalPercentage > 0 ? 100 / totalPercentage : 1, 
    [totalPercentage]
  );

  // 生成饼图扇区路径
  const createPieSegments = useMemo(() => {
    if (publishedInterfaces.length === 0) return [];
    
    const segments = [];
    let startAngle = 0;
    
    // 确保数据总和为100%
    const normalizedData = publishedInterfaces.map(item => ({
      ...item,
      normalizedPercentage: (item.percentage * scaleFactor)
    }));
    
    for (const item of normalizedData) {
      const angle = (item.normalizedPercentage / 100) * 360;
      const endAngle = startAngle + angle;
      
      // 计算SVG路径 - 调整半径使饼图更细致
      const radius = 14; // 减小半径
      const x1 = 18 + radius * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 18 + radius * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 18 + radius * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = 18 + radius * Math.sin((endAngle - 90) * Math.PI / 180);
      
      // 大弧标志(large-arc-flag)：如果角度大于180度则为1，否则为0
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // 创建路径
      const path = `M 18 18 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      segments.push({
        path,
        color: item.color,
        label: item.label,
        percentage: item.normalizedPercentage,
        startAngle,
        endAngle,
        count: item.count
      });
      
      startAngle += angle;
    }
    
    return segments;
  }, [publishedInterfaces, scaleFactor]);

  // 处理扇区点击
  const handleSegmentClick = (index: number) => {
    setSelectedSegment(selectedSegment === index ? null : index);
  };

  // 对接口列表按百分比从高到低排序
  const sortedInterfaces = useMemo(() => {
    return [...publishedInterfaces].sort((a, b) => 
      (b.percentage * scaleFactor) - (a.percentage * scaleFactor)
    );
  }, [publishedInterfaces, scaleFactor]);

  return (
    <div className="flex flex-col h-full">
      {/* 上部分 - 左右布局 */}
      <div className="flex mb-2">
        {/* 左侧 - 接口总数 */}
        <div className="flex-1 pr-3">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-2 bg-blue-50 rounded-lg">
              <div className="text-blue-500 scale-75">
                {icon}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-0.5">
                {title}
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {count.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧 - 南向接口流量和北向接口流量 */}
        <div className="flex-1 border-l border-gray-200 pl-3">
          {metrics.map((metric, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ImageIcon 
                    src={index === 0 ? southIcon : northIcon} 
                    width={16} 
                    height={16} 
                    className="mr-1.5"
                  />
                  <span className="text-xs font-medium" style={{ color: metric.color || '#8b5cf6' }}>
                    {metric.label || `接口${index + 1}`}
                  </span>
                </div>
                <span className="text-base font-semibold text-gray-700">
                  {formatNumber(metric.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 中部 - 接口发布率 */}
      <div className="mb-2">
        <div className="flex items-center mb-0.5">
          <div className="text-xs text-gray-500">接口发布率</div>
          <div className="ml-auto text-blue-500 font-medium text-xs">
            {publishRate.toFixed(1)}%
          </div>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-500" 
            style={{ width: `${publishRate}%` }}
          ></div>
        </div>
      </div>
      
      {/* 底部分割线 */}
      <div className="border-t border-gray-200 my-2"></div>
      
      {/* 下部分 - 接口类型分布饼图和详情列表 */}
      <div className="flex flex-1 min-h-0">
        {/* 左侧 - 饼图（显示已发布接口的类型分布） */}
        <div className="relative w-1/2 pr-2">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <span className="text-base font-bold text-blue-500">{publishRate.toFixed(1)}%</span>
              <div className="text-xs text-gray-500">已发布</div>
            </div>
          </div>
          <div className="relative h-full w-full">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              {/* 背景圆 */}
              <circle 
                cx="18" 
                cy="18" 
                r="14" 
                fill="#f3f4f6" 
                className="transition-all duration-300"
              />
              
              {/* 动态生成饼图扇区 */}
              {createPieSegments.map((segment, index) => (
                <g 
                  key={index}
                  onClick={() => handleSegmentClick(index)}
                  className="cursor-pointer"
                  style={{ 
                    transition: 'transform 0.3s ease',
                    transform: selectedSegment === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center'
                  }}
                >
                  <path 
                    d={segment.path}
                    fill={segment.color}
                    stroke="#fff"
                    strokeWidth="0.5"
                    className="transition-all duration-300"
                    style={{ 
                      opacity: selectedSegment === null || selectedSegment === index ? 1 : 0.6,
                      filter: selectedSegment === index 
                        ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' 
                        : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                  />
                </g>
              ))}
              
              {/* 中心白色圆圈 */}
              <circle 
                cx="18" 
                cy="18" 
                r="8" 
                fill="white" 
                className="transition-all duration-300"
              />
            </svg>
          </div>
        </div>
        
        {/* 右侧 - 接口类型详情列表 */}
        <div className="flex-1 ml-3 space-y-1 overflow-y-auto pr-1 text-xs" style={{ scrollbarWidth: 'thin' }}>
          {sortedInterfaces.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center py-1 px-2 rounded cursor-pointer transition-all duration-300 ${
                selectedSegment === index 
                  ? 'bg-blue-50 shadow-sm' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSegmentClick(index)}
            >
              <div 
                className={`w-2 h-2 mr-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                  selectedSegment === index ? 'scale-125' : ''
                }`}
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className={`truncate transition-colors duration-300 ${
                  selectedSegment === index ? 'text-blue-600 font-medium' : 'text-gray-600'
                }`} title={item.label}>
                  {item.label}
                </div>
              </div>
              <div className="ml-2 whitespace-nowrap flex-shrink-0">
                <span className={`font-medium transition-colors duration-300 ${
                  selectedSegment === index ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  {item.count.toLocaleString()}
                </span>
                <span className={`ml-1 transition-colors duration-300 ${
                  selectedSegment === index ? 'text-blue-500' : 'text-gray-500'
                }`}>
                  {(item.percentage * scaleFactor).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterfaceCard; 