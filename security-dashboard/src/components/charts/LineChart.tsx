import React from 'react';
import ReactECharts from 'echarts-for-react';

interface DataSeries {
  name: string;
  data: number[];
  color?: string;
  areaStyle?: boolean;
}

interface LineChartProps {
  title: string;
  xAxisData: string[];
  series: DataSeries[];
  showLegend?: boolean;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ 
  title, 
  xAxisData, 
  series, 
  showLegend = false,
  height = 250
}) => {
  // 预定义的颜色数组，用于没有指定颜色的系列
  const colorPalette = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#334155'
      },
      padding: [5, 5]
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e5e7eb',
      textStyle: {
        color: '#334155'
      }
    },
    legend: {
      show: showLegend,
      bottom: 0,
      textStyle: {
        color: '#6b7280',
        fontSize: 10
      },
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      padding: [2, 5]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: showLegend ? '8%' : '3%',
      top: title ? '12%' : '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 10,
        margin: 6,
        align: 'center'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 10,
        margin: 6
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb',
          type: 'dashed'
        }
      }
    },
    series: series.map((s, index) => ({
      name: s.name,
      type: 'line',
      data: s.data,
      symbol: 'circle',
      symbolSize: 6,
      smooth: true,
      showSymbol: false,
      emphasis: {
        scale: 1.5,
        itemStyle: {
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.2)'
        }
      },
      itemStyle: {
        color: s.color || colorPalette[index % colorPalette.length]
      },
      lineStyle: {
        width: 2,
        color: s.color || colorPalette[index % colorPalette.length]
      },
      areaStyle: s.areaStyle ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, 
            color: (s.color || colorPalette[index % colorPalette.length]).replace(')', ', 0.3)').replace('rgb', 'rgba')
          }, {
            offset: 1, 
            color: (s.color || colorPalette[index % colorPalette.length]).replace(')', ', 0.05)').replace('rgb', 'rgba')
          }]
        }
      } : undefined
    }))
  };

  return (
    <ReactECharts 
      option={option} 
      style={{ height: `${height}px`, width: '100%' }} 
    />
  );
};

export default LineChart; 