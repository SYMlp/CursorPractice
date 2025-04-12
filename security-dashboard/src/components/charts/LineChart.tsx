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
}

const LineChart: React.FC<LineChartProps> = ({ 
  title, 
  xAxisData, 
  series, 
  showLegend = false 
}) => {
  const option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#334155'
      },
      padding: [10, 10]
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
        color: '#6b7280'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: showLegend ? '10%' : '3%',
      top: '15%',
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
        color: '#6b7280'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#6b7280'
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      }
    },
    series: series.map(s => ({
      name: s.name,
      type: 'line',
      data: s.data,
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        color: s.color
      },
      lineStyle: {
        width: 2,
        color: s.color
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
            color: s.color ? s.color.replace(')', ', 0.3)').replace('rgb', 'rgba') : 'rgba(59, 130, 246, 0.3)'
          }, {
            offset: 1, 
            color: s.color ? s.color.replace(')', ', 0.05)').replace('rgb', 'rgba') : 'rgba(59, 130, 246, 0.05)'
          }]
        }
      } : undefined
    }))
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <ReactECharts 
        option={option} 
        style={{ height: '250px', width: '100%' }} 
      />
    </div>
  );
};

export default LineChart; 