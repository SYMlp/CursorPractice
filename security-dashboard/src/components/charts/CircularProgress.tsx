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
            color: color
          }
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, '#e5e7eb']]
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
              offsetCenter: ['0%', '0%']
            }
          }
        ],
        title: {
          show: false
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 20,
          color: '#334155',
          formatter: '{value}%'
        }
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="text-center text-gray-500 text-sm mb-2">{title}</div>
      <div className="flex justify-center items-center">
        <ReactECharts 
          option={option} 
          style={{ height: '120px', width: '120px' }} 
        />
      </div>
    </div>
  );
};

export default CircularProgress; 