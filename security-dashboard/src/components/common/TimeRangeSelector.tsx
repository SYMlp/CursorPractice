import React from 'react';

// 时间范围类型
export type TimeRange = 'day' | 'week' | 'month';

interface TimeRangeSelectorProps {
  /**
   * 当前选中的时间范围
   */
  currentRange: TimeRange;
  
  /**
   * 时间范围变化时的回调函数
   */
  onChange: (range: TimeRange) => void;
  
  /**
   * 样式类型 - 'default': 默认样式，'compact': 紧凑样式
   * @default 'default'
   */
  variant?: 'default' | 'compact';
}

/**
 * 时间范围选择器组件
 * 
 * 用于选择时间范围（日/周/月）
 * 
 * @example
 * ```tsx
 * <TimeRangeSelector
 *   currentRange={timeRange}
 *   onChange={handleTimeRangeChange}
 * />
 * ```
 */
const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  currentRange,
  onChange,
  variant = 'default'
}) => {
  // 默认样式 - 适用于卡片标题栏
  if (variant === 'default') {
    return (
      <div className="flex bg-gray-50 rounded-lg p-0.5 text-xs">
        <button 
          className={`px-2 py-1 rounded-md transition-colors ${
            currentRange === 'day' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => onChange('day')}
        >
          一天
        </button>
        <button 
          className={`px-2 py-1 rounded-md transition-colors ${
            currentRange === 'week' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => onChange('week')}
        >
          一周
        </button>
        <button 
          className={`px-2 py-1 rounded-md transition-colors ${
            currentRange === 'month' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => onChange('month')}
        >
          一月
        </button>
      </div>
    );
  }
  
  // 紧凑样式 - 适用于小空间
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onChange('day')}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          currentRange === 'day'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        一天
      </button>
      <button
        onClick={() => onChange('week')}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          currentRange === 'week'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        一周
      </button>
      <button
        onClick={() => onChange('month')}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          currentRange === 'month'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        一月
      </button>
    </div>
  );
};

export default TimeRangeSelector; 