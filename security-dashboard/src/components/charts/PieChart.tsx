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
  // 预定义的颜色数组，确保多彩的环图
  const colorPalette = [
    '#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
    '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
  ];

  // 为没有指定颜色的数据项分配颜色
  const coloredData = data.map((item, index) => {
    if (!item.itemStyle) {
      return {
        ...item,
        itemStyle: {
          color: colorPalette[index % colorPalette.length]
        }
      };
    }
    return item;
  });

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
    legend: {
      orient: 'vertical',
      right: '0%',
      top: 'middle',
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle',
      formatter: (name: string) => {
        // 查找对应的数据项
        const dataItem = coloredData.find(item => item.name === name);
        if (dataItem) {
          // 展示名称和百分比
          const percent = (dataItem.value / coloredData.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1);
          return `${name} ${percent}%`;
        }
        return name;
      },
      textStyle: {
        fontSize: 10,
        color: '#666'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
        },
        emphasis: {
          scale: true,
          scaleSize: 5,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        },
        labelLine: {
          show: false
        },
        data: coloredData
      }
    ]
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <ReactECharts 
        option={option} 
        style={{ height: '200px', width: '100%' }} 
      />
      {showPercentage && (
        <div className="text-center">
          <div className="text-xl font-bold text-blue-600">
            {coloredData.length > 0 ? `${coloredData[0].value.toFixed(1)}%` : '0%'}
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChart; 