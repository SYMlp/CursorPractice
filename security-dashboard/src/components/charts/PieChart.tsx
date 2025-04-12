import React from 'react';
import ReactECharts from 'echarts-for-react';

interface PieDataItem {
  name: string;
  value: number;
  itemStyle?: {
    color: string;
  };
}

interface PieChartProps {
  data: PieDataItem[];
  title?: string;
  showPercentage?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  title,
  showPercentage = true 
}) => {
  const option = {
    title: title ? {
      text: title,
      left: 'center',
      top: 'top',
      textStyle: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#334155'
      }
    } : undefined,
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { name, value, percent } = params;
        return `${name}: ${value} (${percent}%)`;
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-center">
      <ReactECharts 
        option={option} 
        style={{ height: '200px', width: '100%' }} 
      />
      {showPercentage && (
        <div className="text-center text-2xl font-bold text-primary mt-2">
          {data.length > 0 ? `${data[0].value.toFixed(1)}%` : '0%'}
        </div>
      )}
    </div>
  );
};

export default PieChart; 