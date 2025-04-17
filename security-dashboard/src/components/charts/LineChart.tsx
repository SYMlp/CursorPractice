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
  height?: number | string;
  legendPosition?: 'top' | 'bottom';
}

const LineChart: React.FC<LineChartProps> = ({ 
  title, 
  xAxisData, 
  series, 
  showLegend = false,
  height = 250,
  legendPosition = 'bottom'
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
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      textStyle: {
        color: '#334155'
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.2)',
          width: 1,
          type: 'dashed'
        }
      }
    },
    legend: {
      show: showLegend,
      [legendPosition]: legendPosition === 'bottom' ? 0 : 5,
      textStyle: {
        color: '#6b7280',
        fontSize: 10
      },
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      padding: [0, 5]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: showLegend && legendPosition === 'bottom' ? '12%' : '8%',
      top: (title || (showLegend && legendPosition === 'top')) ? '12%' : '8%',
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
        fontSize: 9,
        margin: 10,
        align: 'center',
        rotate: 0,
        hideOverlap: false,
        interval: 0,
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 9,
        margin: 6,
        formatter: (value: number) => {
          if (value >= 1000) {
            return (value / 1000) + 'k';
          }
          return value;
        }
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
      symbolSize: 5,
      smooth: true,
      showSymbol: false,
      emphasis: {
        scale: 1.2,
        itemStyle: {
          shadowBlur: 3,
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

  // 处理高度样式，支持数字或百分比字符串
  const getHeightStyle = () => {
    if (typeof height === 'number') {
      return { height: `${height}px`, width: '100%' };
    }
    return { height: height, width: '100%' };
  };

  return (
    <ReactECharts 
      option={option} 
      style={getHeightStyle()} 
      opts={{ 
        renderer: 'canvas',
        devicePixelRatio: 2
      }}
      notMerge={true}
    />
  );
};

export default LineChart; 