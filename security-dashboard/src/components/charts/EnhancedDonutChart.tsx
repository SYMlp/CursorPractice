import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ECElementEvent } from 'echarts/types/src/util/types';

export interface DonutChartDataItem {
  name: string;
  value: number;
  color?: string;
}

interface EnhancedDonutChartProps {
  data: DonutChartDataItem[];
  title?: string;
  centerText?: string;
  height?: number | string;
  onClick?: (params: any) => void;
  className?: string;
  legendPosition?: 'outside' | 'none'; // 标签位置：外部或不显示
  animation?: boolean;
  fitContainer?: boolean;
  normalizeData?: boolean; // 是否对数据进行归一化处理
}

/**
 * 增强型环形图组件
 * 
 * 特点：
 * - 简洁美观的环形设计
 * - 外部标签配合引导线
 * - 扇区圆角效果
 * - 中心可显示标题或总计
 * - 柔和配色方案
 * - 支持数据归一化处理
 */
const EnhancedDonutChart: React.FC<EnhancedDonutChartProps> = ({
  data,
  title = '告警类型',
  centerText,
  height = 240,
  onClick,
  className = '',
  legendPosition = 'outside',
  animation = true,
  fitContainer = false,
  normalizeData = true // 默认开启归一化处理
}) => {
  // 预定义的颜色数组 - 明亮友好的配色
  const colorPalette = [
    '#e96c5b', // 红色
    '#a97adc', // 紫色
    '#60c060', // 绿色
    '#f6bc5f', // 橙黄色
    '#4e9fff', // 蓝色
    '#53c4ae', // 青绿色
    '#7ecef4'  // 浅蓝色
  ];

  // 计算总数用于百分比计算
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // 数据归一化处理：计算每项占比
  const normalizedData = normalizeData
    ? data.map(item => ({
        ...item,
        // 保留原始值，但将value转换为百分比
        originalValue: item.value,
        value: parseFloat(((item.value / total) * 100).toFixed(1))
      }))
    : data;
  
  // 为数据项分配颜色
  const dataWithColors = normalizedData.map((item, index) => ({
    ...item,
    itemStyle: {
      color: item.color || colorPalette[index % colorPalette.length],
      borderRadius: 7, // 扇区圆角
      borderWidth: 2,  // 扇区边框宽度
      borderColor: '#fff' // 扇区边框颜色
    },
    label: {
      show: legendPosition === 'outside',
      position: 'outside',
      formatter: (params: any) => {
        // 显示名称和数值，类似于图片中的效果
        const value = normalizeData 
          ? `${params.data.originalValue} (${params.percent}%)` 
          : params.value;
        
        return [
          '{name|' + params.name + '}',
          '{value|' + value + '}'
        ].join('\n');
      },
      rich: {
        name: {
          fontSize: 12,
          color: '#e96c5b',
          fontWeight: 'bold',
          padding: [0, 0, 3, 0]
        },
        value: {
          fontSize: 12,
          color: '#666',
          fontWeight: 'normal'
        }
      },
      fontSize: 12,
      color: '#e96c5b',
      fontWeight: 'bold'
    },
    labelLine: {
      show: legendPosition === 'outside',
      length: 15,
      length2: 10,
      smooth: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: '#aaa'
      }
    }
  }));

  // 计算总数用于中心文本
  const totalForDisplay = data.reduce((sum, item) => sum + item.value, 0);
  const centerTextValue = centerText || '告警事件数';

  // 图表配置
  const option = {
    backgroundColor: 'transparent',
    color: colorPalette,
    title: null,
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const item = params.data;
        const originalValue = normalizeData ? item.originalValue : item.value;
        const percentage = params.percent;
        
        return `${title}<br/>${params.name}: ${originalValue} (${percentage}%)`;
      },
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: '#e6e6e6',
      borderWidth: 1,
      padding: [5, 10],
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      show: false // 隐藏图例
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        stillShowZeroSum: false,
        animation: animation,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        emphasis: {
          scale: true,
          scaleSize: 10,
          focus: 'self',
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        },
        data: dataWithColors
      }
    ],
    // 中心文本
    graphic: centerTextValue ? [
      {
        type: 'text',
        left: 'center',
        top: 'top',
        style: {
          text: centerTextValue,
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'center',
          fill: '#666',
          y: 10
        }
      },
      {
        type: 'text',
        left: 'center',
        top: 'center',
        z: 2,
        style: {
          text: totalForDisplay.toString(),
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
          fill: '#333',
          textVerticalAlign: 'bottom',
          y: 25
        }
      }
    ] : []
  };

  // 事件处理
  const onChartClick = (params: ECElementEvent) => {
    if (onClick) {
      onClick(params);
    }
  };

  return (
    <div 
      className={`enhanced-donut-chart ${className}`} 
      style={fitContainer ? { height: '100%', width: '100%' } : {}}>
      <ReactECharts
        option={option}
        style={{ height: fitContainer ? '100%' : height, width: '100%' }}
        onEvents={{
          click: onChartClick
        }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default EnhancedDonutChart; 