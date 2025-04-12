import React from 'react';

interface RankItem {
  id: number;
  name: string;
  value: string | number;
  percent?: number;
}

interface RankingCardProps {
  title: string;
  data: RankItem[];
  showPercent?: boolean;
  className?: string;
  moreText?: string;
  moreLink?: string;
}

const RankingCard: React.FC<RankingCardProps> = ({
  title,
  data,
  showPercent = false,
  className = '',
  moreText = '查看更多',
  moreLink = '#'
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-gray-700">{title}</h3>
        <div className="flex items-center text-xs">
          <a href={moreLink} className="text-blue-500 hover:underline mr-2">{moreText}</a>
          <a href={moreLink} className="text-blue-500 hover:underline">更多</a>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.id} className="flex items-center">
            <div className={`w-5 h-5 flex items-center justify-center rounded-full mr-2 ${
              item.id === 1 ? 'bg-red-500' : 
              item.id === 2 ? 'bg-orange-500' : 
              item.id === 3 ? 'bg-yellow-500' : 'bg-gray-300'
            } text-white text-xs font-bold`}>
              {item.id}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-900 font-medium">{item.value}</span>
              </div>
              
              {showPercent && item.percent !== undefined && (
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingCard; 