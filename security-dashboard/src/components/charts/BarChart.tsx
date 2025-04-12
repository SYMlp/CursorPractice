import React from 'react';
import ReactECharts from 'echarts-for-react';

interface BarItem {
  name: string;
  value: number;
  color?: string;
}

interface SeriesItem {
  name: string;
  data: number[];
  color?: string;
}

interface CategoryBarChartData {
  categories: string[];
  series: SeriesItem[];
}

interface BarChartProps {
  title?: string;
  data: BarItem[] | CategoryBarChartData;
  className?: string;
  horizontal?: boolean;
  showLegend?: boolean;
}

const isBarItemArray = (data: BarItem[] | CategoryBarChartData): data is BarItem[] => {
  return Array.isArray(data) && data.length > 0 && 'name' in data[0];
};

const BarChart: React.FC<BarChartProps> = ({
  title = '',
  data,
  className = '',
  horizontal = false,
  showLegend = false
}) => {
  let chartOption;

  if (isBarItemArray(data)) {
    // 处理简单柱状图数据
    chartOption = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#333'
        },
        show: !!title
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: showLegend,
        bottom: 0,
        data: data.map(item => item.name)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '3%',
        containLabel: true
      },
      [horizontal ? 'yAxis' : 'xAxis']: {
        type: 'category',
        data: data.map(item => item.name),
        axisLabel: {
          color: '#666',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      [horizontal ? 'xAxis' : 'yAxis']: {
        type: 'value',
        axisLabel: {
          color: '#666',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      },
      series: [
        {
          name: title,
          type: 'bar',
          data: data.map(item => ({
            value: item.value,
            itemStyle: {
              color: item.color || '#3B82F6'
            }
          })),
          barWidth: horizontal ? 15 : 30,
          label: {
            show: true,
            position: horizontal ? 'right' : 'top',
            fontSize: 12,
            color: '#666'
          }
        }
      ]
    };
  } else {
    // 处理分类柱状图数据
    chartOption = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#333'
        },
        show: !!title
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: showLegend,
        bottom: 0,
        data: data.series.map(item => item.name)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: showLegend ? '15%' : '3%',
        top: '3%',
        containLabel: true
      },
      [horizontal ? 'yAxis' : 'xAxis']: {
        type: 'category',
        data: data.categories,
        axisLabel: {
          color: '#666',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      [horizontal ? 'xAxis' : 'yAxis']: {
        type: 'value',
        axisLabel: {
          color: '#666',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      },
      series: data.series.map(serie => ({
        name: serie.name,
        type: 'bar',
        data: serie.data.map(value => ({
          value,
          itemStyle: {
            color: serie.color || '#3B82F6'
          }
        })),
        barWidth: horizontal ? 15 : 30,
        label: {
          show: true,
          position: horizontal ? 'right' : 'top',
          fontSize: 12,
          color: '#666'
        }
      }))
    };
  }

  return (
    <div className={`${className}`}>
      {title && (
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-medium text-gray-700">{title}</h3>
        </div>
      )}
      <ReactECharts 
        option={chartOption} 
        style={{ height: '100%', width: '100%', minHeight: '200px' }} 
      />
    </div>
  );
};

export default BarChart; 