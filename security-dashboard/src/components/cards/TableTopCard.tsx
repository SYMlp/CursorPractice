import React, { useState } from 'react';
import { CustomTooltip } from '../tags';
import { RankingItem } from './RankingCard';

interface ColumnConfig {
  key: string;
  title: string;
  align?: 'left' | 'right' | 'center';
  render?: (value: any, record: RankingItem) => React.ReactNode;
  width?: number | string;
}

interface TableTopCardProps {
  title: string;
  data: RankingItem[];
  columns: ColumnConfig[];
  showRankNumber?: boolean;
  showProgressBar?: boolean;
  progressBarField?: string;
  maxItems?: number;
  className?: string;
  onItemClick?: (item: RankingItem) => void;
  onMoreClick?: () => void;
}

/**
 * 表格式TOP排行榜组件
 * 
 * 以表格形式展示TOP数据，支持自定义列和条形图
 */
const TableTopCard: React.FC<TableTopCardProps> = ({
  title,
  data,
  columns,
  showRankNumber = true,
  showProgressBar = true,
  progressBarField = 'value',
  maxItems = 5,
  className = '',
  onItemClick,
  onMoreClick
}) => {
  const [showAllData, setShowAllData] = useState<boolean>(false);
  const displayData = data.slice(0, maxItems);
  
  // 计算最大值用于进度条显示
  const maxValue = showProgressBar ? Math.max(
    ...data.map(item => {
      const value = item[progressBarField];
      return typeof value === 'number' ? value : 
             typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : 0;
    })
  ) : 0;
  
  // 处理"更多"按钮点击
  const handleMoreClick = () => {
    if (onMoreClick) {
      onMoreClick();
    } else {
      setShowAllData(true);
    }
  };
  
  // 关闭模态框
  const handleCloseModal = () => {
    setShowAllData(false);
  };
  
  // 渲染模态框，展示全部数据
  const renderModal = () => {
    if (!showAllData) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-4/5 max-w-4xl max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}（共计{data.length}个）</h3>
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
                  {showRankNumber && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  )}
                  {columns.map((column, index) => (
                    <th 
                      key={index}
                      className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        column.align === 'right' ? 'text-right' : 
                        column.align === 'center' ? 'text-center' : 'text-left'
                      }`}
                      style={column.width ? { width: column.width } : {}}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onItemClick && onItemClick(item)}
                  >
                    {showRankNumber && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    )}
                    {columns.map((column, colIndex) => (
                      <td 
                        key={colIndex}
                        className={`px-4 py-3 whitespace-nowrap text-sm ${
                          column.align === 'right' ? 'text-right' : 
                          column.align === 'center' ? 'text-center' : 'text-left'
                        }`}
                      >
                        {column.render ? column.render(item[column.key], item) : item[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 渲染进度条
  const renderProgressBar = (value: string | number, maxValue: number) => {
    // 处理字符串格式的数值（如带逗号的数字）
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : (value || 0);
    const percentage = maxValue > 0 ? (numValue / maxValue) * 100 : 0;
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };
  
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <div className="text-sm font-medium flex items-center">
          <span>{title}</span>
          <span className="text-xs text-gray-500 ml-2">总计{data.length}个</span>
        </div>
        <button 
          className="text-xs text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded transition-colors"
          onClick={(e) => {
            e.preventDefault();
            handleMoreClick();
          }}
        >
          更多
        </button>
      </div>
      
      <div className="overflow-hidden">
        {/* 表头 */}
        <div className="px-4 py-2 border-b border-gray-100 flex text-xs font-medium text-gray-500">
          {showRankNumber && (
            <div className="w-8">#</div>
          )}
          {columns.map((column, index) => (
            <div 
              key={index}
              className={`flex-1 ${
                column.align === 'right' ? 'text-right' : 
                column.align === 'center' ? 'text-center' : 'text-left'
              }`}
              style={column.width ? { width: column.width } : {}}
            >
              {column.title}
            </div>
          ))}
        </div>
        
        {/* 表格内容 */}
        <div className="px-2">
          {displayData.map((item, index) => (
            <div 
              key={item.id} 
              className="py-2 px-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer flex items-center"
              onClick={() => onItemClick && onItemClick(item)}
            >
              {showRankNumber && (
                <div className="w-8 mr-2">
                  <span className={`
                    w-5 h-5 rounded-full text-xs flex items-center justify-center mr-2
                    ${index < 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                  `}>
                    {index + 1}
                  </span>
                </div>
              )}
              
              <div className="flex-1 flex">
                {columns.map((column, colIndex) => (
                  <div 
                    key={colIndex}
                    className={`flex-1 ${
                      column.align === 'right' ? 'text-right' : 
                      column.align === 'center' ? 'text-center' : 'text-left'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="text-sm">
                        {column.render ? column.render(item[column.key], item) : item[column.key]}
                      </div>
                      
                      {showProgressBar && column.key === progressBarField && (
                        <div className="mt-1">
                          {renderProgressBar(item[progressBarField], maxValue)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 模态框 */}
      {renderModal()}
    </div>
  );
};

export default TableTopCard; 