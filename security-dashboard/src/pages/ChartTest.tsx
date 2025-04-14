import React from 'react';
import { DonutChart } from '../components/charts';

/**
 * 图表测试页面
 * 
 * 此页面用于展示和测试各种图表组件
 */
const ChartTest: React.FC = () => {
  // 用户提供的原始数据
  const originalData = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' }
  ];

  // 处理点击事件
  const handleChartClick = (params: any) => {
    console.log('Chart clicked:', params);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">图表测试</h1>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="h-[400px]">
              <DonutChart
                data={originalData}
                title="Referer of a Website"
                centerText="访问来源"
                height={400}
                showLegend={true}
                innerRadius={0.4}
                outerRadius={0.8}
                labelPosition="outside"
                legendPosition="left"
                showValues={true}
                valueFormat={(value, percent, name) => `${name}: ${percent}%`}
                animation={true}
                padAngle={0.02}
                cornerRadius={6}
                roseType={false}
                borderWidth={1}
                borderColor="#fff"
                onClick={handleChartClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTest; 