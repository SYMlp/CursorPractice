import React, { useState } from 'react';
import { CustomTooltip } from '../tags';

export interface RankingItem {
  id: number;
  name: string;
  value?: string | number;
  risk?: string[];
  risks?: string | number;
  riskCount?: string | number;
  riskTypeCount?: string | number;
  visits?: string | number;
  protection?: string;
  sensitiveResources?: string | number;
  [key: string]: any;
}

interface RankingCardProps {
  title: string;
  data: RankingItem[];
  totalCount?: number;
  showMoreLink?: boolean;
  className?: string;
  maxItems?: number;
  showTag?: boolean;
  tagField?: string;
  tagComponent?: React.FC<{text: string}>;
  valueLabel?: string;
  onItemClick?: (item: RankingItem) => void;
  onMoreClick?: () => void;
}

/**
 * 排行榜卡片组件
 * 
 * 用于展示各类TOP数据，如风险最多数据资源、高敏数据使用风险最多人员等
 */
const RankingCard: React.FC<RankingCardProps> = ({
  title,
  data,
  totalCount,
  showMoreLink = true,
  className = '',
  maxItems = 5,
  showTag = false,
  tagField = 'risk',
  tagComponent: TagComponent,
  valueLabel = '风险',
  onItemClick,
  onMoreClick
}) => {
  const displayData = data.slice(0, maxItems);
  const [showAllData, setShowAllData] = useState<boolean>(false);
  
  // 使用实际数据长度作为总数
  const realTotal = data.length;
  
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{valueLabel}</th>
                  {data[0]?.visits && (
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">访问量</th>
                  )}
                  {showTag && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标签</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onItemClick && onItemClick(item)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {item.riskCount || item.risks || item.value}
                    </td>
                    {item.visits && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.visits}</td>
                    )}
                    {showTag && item[tagField] && TagComponent && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(item[tagField]) ? (
                            item[tagField].map((tag: string, idx: number) => (
                              <TagComponent key={idx} text={tag} />
                            ))
                          ) : (
                            <TagComponent text={item[tagField]} />
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <div className="text-sm font-medium flex items-center">
          <span>{title}</span>
          {(totalCount !== undefined || realTotal > 0) && (
            <span className="text-xs text-gray-500 ml-2">总计{totalCount || realTotal}个</span>
          )}
        </div>
        {showMoreLink && (
          <button 
            className="text-xs text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleMoreClick();
            }}
          >
            更多
          </button>
        )}
      </div>
      <div className="p-2 max-h-[250px] overflow-y-auto">
        {displayData.map((item, index) => (
          <div 
            key={item.id} 
            className="mb-2 p-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
            onClick={() => onItemClick && onItemClick(item)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                  {index + 1}
                </span>
                <CustomTooltip title={item.name}>
                  <span className="text-sm font-medium truncate max-w-[170px] block">{item.name}</span>
                </CustomTooltip>
              </div>
              <span className="text-xs text-gray-500">
                {valueLabel}{item.riskCount || item.risks || item.value}
              </span>
            </div>
            {showTag && item[tagField] && TagComponent && (
              <div className="mt-1 flex flex-wrap gap-1">
                {Array.isArray(item[tagField]) ? (
                  item[tagField].map((tag: string, idx: number) => (
                    <TagComponent key={idx} text={tag} />
                  ))
                ) : (
                  <TagComponent text={item[tagField]} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* 模态框 */}
      {renderModal()}
    </div>
  );
};

export default RankingCard; 