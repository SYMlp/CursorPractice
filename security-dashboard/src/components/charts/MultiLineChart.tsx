import React from 'react';
import ReactECharts from 'echarts-for-react';

interface LineData {
  name: string;
  data: number[];
  color?: string;
  areaStyle?: boolean;
}

interface MultiLineChartProps {
  title: string;
  xAxisData: string[];
  series: LineData[];
  showLegend?: boolean;
  showTimeSwitch?: boolean;
  className?: string;
}

const MultiLineChart: React.FC<MultiLineChartProps> = ({
  title,
  xAxisData,
  series,
  showLegend = true,
  showTimeSwitch = true,
  className = '',
}) => {
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
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          {showTimeSwitch && (
            <div className="flex space-x-3 text-xs">
              <button className="px-2 py-1 rounded text-gray-500 hover:text-blue-500">一天</button>
              <button className="px-2 py-1 rounded bg-blue-50 text-blue-500">一周</button>
            </div>
          )}
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