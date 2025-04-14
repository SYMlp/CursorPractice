import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

interface LineData {
  name: string;
  data: number[];
  color?: string;
  areaStyle?: boolean;
}

type TimeRange = 'day' | 'week';

interface MultiLineChartProps {
  title: string;
  timeData: {
    day: { xAxis: string[] };
    week: { xAxis: string[] };
  };
  series: {
    day: { series: LineData[] };
    week: { series: LineData[] };
  };
  showLegend?: boolean;
  className?: string;
}

const MultiLineChart: React.FC<MultiLineChartProps> = ({
  title,
  timeData,
  series,
  showLegend = true,
  className = '',
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');

  const option = {
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
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timeData[timeRange].xAxis,
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
    series: series[timeRange].series.map(s => ({
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
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('day')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                timeRange === 'day'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              一天
            </button>
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                timeRange === 'week'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              一周
            </button>
          </div>
        </div>
      </div>
      <ReactECharts 
        option={option} 
        style={{ height: '250px', width: '100%' }} 
      />
    </div>
  );
};

export default MultiLineChart; 