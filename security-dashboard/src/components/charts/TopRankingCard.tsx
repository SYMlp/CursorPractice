import React, { useRef, useEffect, useState } from 'react';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import PieChart from './PieChart';

export type RankingItem = {
  id: string;
  name: string;
  value: number;
  percent?: number;
  color?: string;
  secondaryValue?: string | number;
  secondaryLabel?: string;
  trend?: 'up' | 'down' | 'stable';
  risk?: 'high' | 'medium' | 'low';
};

export type ChartType = 'bar' | 'horizontal-bar' | 'pie' | 'donut' | 'table' | 'progress-bar';

interface TopRankingCardProps {
  title: string;
  data: RankingItem[];
  total?: number;
  chartType?: ChartType;
  maxItems?: number;
  valueLabel?: string;
  valueFormatter?: (value: number) => string;
  height?: number | string;
  onClick?: (item: RankingItem) => void;
  moreLink?: string;
  loading?: boolean;
  valueKey?: string;
  nameKey?: string;
  className?: string;
  showRank?: boolean;
  showHeader?: boolean;
  showProgress?: boolean;
  fitContainer?: boolean;
}

/**
 * TopRankingCard - 通用排名展示组件
 * 
 * 支持多种展示方式：
 * - bar: 垂直柱状图
 * - horizontal-bar: 水平条形图
 * - pie: 饼图
 * - donut: 环形图
 * - table: 表格
 * - progress-bar: 进度条表格（默认）
 */
export const TopRankingCard: React.FC<TopRankingCardProps> = ({
  title,
  data,
  total,
  chartType = 'progress-bar',
  maxItems = 5,
  valueLabel = '值',
  valueFormatter = (value) => value.toLocaleString(),
  height = 280,
  onClick,
  moreLink,
  loading = false,
  valueKey = 'value',
  nameKey = 'name',
  className = '',
  showRank = true,
  showHeader = true,
  showProgress = true,
  fitContainer = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [showAllData, setShowAllData] = useState<boolean>(false);
  const displayData = data.slice(0, maxItems);
  const maxValue = Math.max(...displayData.map(item => item.value));
  
  // 真实数据总数
  const realTotal = data.length;

  // 监测容器大小变化
  useEffect(() => {
    if (!containerRef.current || !fitContainer) return;

    // 初始化容器高度
    updateContainerHeight();

    // 创建ResizeObserver监听容器大小变化
    const resizeObserver = new ResizeObserver(() => {
      updateContainerHeight();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [fitContainer]);

  // 更新容器高度
  const updateContainerHeight = () => {
    if (!containerRef.current) return;
    
    // 获取内容区域高度（总高度减去头部高度）
    const headerHeight = showHeader ? 40 : 0; // 估计头部高度
    const containerClientHeight = containerRef.current.clientHeight;
    
    if (containerClientHeight > 0) {
      setContainerHeight(containerClientHeight - headerHeight);
    }
  };

  // 计算实际使用的高度值
  const effectiveHeight = fitContainer ? containerHeight : height;

  // 处理"更多"按钮点击
  const handleMoreClick = () => {
    setShowAllData(true);
  };

  // 关闭模态框
  const handleCloseModal = () => {
    setShowAllData(false);
  };

  // 渲染模态框
  const renderModal = () => {
    if (!showAllData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-4/5 max-w-4xl max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}（共计{realTotal}个）</h3>
            <button 
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {showRank && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{valueLabel}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr 
                    key={item.id || index}
                    className="hover:bg-gray-50"
                  >
                    {showRank && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{valueFormatter(item.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 加载状态展示
  if (loading) {
    return (
      <div 
        ref={containerRef}
        className={`bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow flex flex-col ${className}`}
        style={fitContainer ? { height: '100%' } : {}}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-medium text-gray-700">{title}</h3>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // 根据图表类型渲染不同内容
  const renderChart = () => {
    // 使用动态高度或传入的固定高度
    const chartHeight = effectiveHeight || height;
    
    switch (chartType) {
      case 'bar':
        return (
          <div className="flex-grow flex flex-col justify-center">
            <BarChart
              title=""
              data={displayData.map(item => ({
                name: item.name,
                value: item.value,
                color: item.color
              }))}
              showLegend={false}
            />
          </div>
        );
      
      case 'horizontal-bar':
        // 水平条形图使用ECharts实现
        return (
          <div className="flex-grow flex flex-col justify-center">
            <BarChart
              title=""
              data={displayData.map(item => ({
                name: item.name,
                value: item.value,
                color: item.color
              }))}
              showLegend={false}
              horizontal={true}
            />
          </div>
        );
      
      case 'pie':
        return (
          <div className="flex-grow flex flex-col justify-center">
            <PieChart
              title=""
              data={displayData.map(item => ({
                name: item.name,
                value: item.value,
                itemStyle: item.color ? { color: item.color } : undefined
              }))}
            />
          </div>
        );
      
      case 'donut':
        return (
          <div className="flex-grow flex flex-col justify-center">
            <DonutChart
              title=""
              data={displayData.map(item => ({
                name: item.name,
                value: item.value,
                itemStyle: item.color ? { color: item.color } : undefined
              }))}
              showLegend={true}
              innerRadius={0.4}
              outerRadius={0.8}
            />
          </div>
        );
      
      case 'table':
        return (
          <div className="flex-grow overflow-y-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {showRank && <th className="px-3 py-2 text-xs font-medium text-gray-500 text-left">排名</th>}
                  <th className="px-3 py-2 text-xs font-medium text-gray-500 text-left">名称</th>
                  <th className="px-3 py-2 text-xs font-medium text-gray-500 text-right">{valueLabel}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayData.map((item, index) => (
                  <tr 
                    key={item.id || index}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onClick && onClick(item)}
                  >
                    {showRank && <td className="px-3 py-2 text-sm text-gray-500">{index + 1}</td>}
                    <td className="px-3 py-2 text-sm text-gray-900">{item.name}</td>
                    <td className="px-3 py-2 text-sm text-gray-500 text-right">{valueFormatter(item.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'progress-bar':
      default:
        return (
          <div className="flex-grow overflow-y-auto">
            {displayData.map((item, index) => (
              <div 
                key={item.id || index} 
                className="group hover:bg-gray-50 p-1 rounded-md transition-colors cursor-pointer"
                onClick={() => onClick && onClick(item)}
              >
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center">
                    {showRank && (
                      <span className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-xs mr-2">
                        {index + 1}
                      </span>
                    )}
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-gray-500 font-medium">{valueFormatter(item.value)}</span>
                </div>
                {showProgress && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full group-hover:bg-blue-600 transition-all" 
                      style={{ 
                        width: `${(item.value / maxValue) * 100}%`,
                        backgroundColor: item.color || undefined
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow flex flex-col ${className}`}
      style={fitContainer ? { height: '100%' } : {}}
    >
      {showHeader && (
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-medium text-gray-700">{title}</h3>
          <span className="text-xs text-gray-500 flex items-center">
            共计{realTotal}个
            <button 
              onClick={handleMoreClick}
              className="ml-1 text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
            >
              更多
            </button>
          </span>
        </div>
      )}
      {renderChart()}
      {renderModal()}
    </div>
  );
};

export default TopRankingCard; 