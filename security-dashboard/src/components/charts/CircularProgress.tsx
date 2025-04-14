import React from 'react';
import ReactECharts from 'echarts-for-react';

interface CircularProgressProps {
  percentage: number;
  title: string;
  color?: string;
  description?: string;
  layout?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
}

/**
 * 环形进度图组件
 * 
 * 可配置为水平布局（左侧文字，右侧图表）或垂直布局（上方文字，下方图表）
 * 支持不同尺寸的显示模式，百分比数字默认显示在环形图中间
 * 
 * 更新记录：
 * - 2024-05-01: 添加水平布局支持，增强样式定制能力
 */
const CircularProgress: React.FC<CircularProgressProps> = ({ 
  percentage, 
  title,
  color = '#3b82f6',
  description = '占比',
  layout = 'vertical',
  size = 'medium'
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

  // 根据size属性确定图表尺寸
  const getChartSize = () => {
    switch(size) {
      case 'small': return { width: '60px', height: '60px' };
      case 'large': return { width: '100px', height: '100px' };
      case 'medium':
      default: return { width: '80px', height: '80px' };
    }
  };

  const { width, height } = getChartSize();

  // 更新ECharts选项，添加中央显示百分比功能
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '90%', // 调整环形大小，为中央文字留出空间
        center: ['50%', '50%'],
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
            name: percentage + '%',
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              offsetCenter: [0, 0],
              fontSize: 16,
              fontWeight: 'bold',
              formatter: '{value}%',
              color: color
            }
          }
        ],
        title: {
          show: false
        },
        detail: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold',
          color: color
        }
      }
    ]
  };

  // 水平布局
  if (layout === 'horizontal') {
    return (
      <div className="p-4 bg-white border border-gray-100 rounded-lg flex items-center justify-between">
        <div className="flex flex-col mr-4">
          <div className="text-base font-medium text-gray-700">{title}</div>
          {/* <div className="text-xs text-gray-500 mt-1">{description}</div> */}
        </div>
        <div className="relative" style={{ width, height, minWidth: width }}>
          <ReactECharts 
            option={option} 
            style={{ height: '100%', width: '100%' }}
          />
          {/* 移除独立的百分比数字，已在图表内部显示 */}
        </div>
      </div>
    );
  }

  // 垂直布局（默认）
  return (
    <div className="p-4 bg-white border border-gray-100 rounded-lg flex flex-col items-center">
      <div className="text-sm text-gray-600 mb-2 text-center">{title}</div>
      {/* <div className="text-xs text-gray-400 mb-1">{description}</div> */}
      <div className="relative mb-2" style={{ width, height }}>
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
        />
        {/* 移除独立的百分比数字，已在图表内部显示 */}
      </div>
    </div>
  );
};

export default CircularProgress; 