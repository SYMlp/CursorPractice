import React from 'react';
import ReactECharts from 'echarts-for-react';

interface CircularProgressProps {
  percentage: number;
  title: string;
  color?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  percentage, 
  title,
  color = '#3b82f6' 
}) => {
  // 生成渐变色
  const getGradientColor = () => {
    // 基于传入的color创建渐变色
    const baseColor = color;
    const lighterColor = color; // 如果需要可以调整为更亮的颜色
    
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: lighterColor
      }, {
        offset: 1, color: baseColor
      }]
    };
  };

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: getGradientColor()
          }
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, '#e6ebf8']]
          }
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: [
          {
            value: percentage,
            name: '',
            title: {
              show: false
            },
            detail: {
              show: false
            }
          }
        ],
        title: {
          show: false
        },
        detail: {
          show: false
        }
      }
    ]
  };

  return (
    <div className="p-4 bg-white border border-gray-100 rounded-lg flex flex-col items-center">
      <div className="text-sm text-gray-600 mb-2 text-center">{title}</div>
      <div className="text-xs text-gray-400 mb-1">占比</div>
      <div className="w-20 h-20 relative mb-2">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <div className="text-2xl font-bold text-center" style={{ color: color }}>
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgress; 