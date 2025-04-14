import React from 'react';
import ReactECharts from 'echarts-for-react';

interface DonutDataItem {
  name: string;
  value: number;
  itemStyle?: {
    color: string;
  };
  tooltip?: {
    formatter: string;
  };
  description?: string;
}

interface DonutChartProps {
  data: DonutDataItem[];
  title?: string;
  centerText?: string | React.ReactNode;
  showLegend?: boolean;
  className?: string;
  height?: number | string;
  innerRadius?: number; // 内圆半径比例 (0-1)，默认0.35
  outerRadius?: number; // 外圆半径比例 (0-1)，默认0.8
  labelPosition?: 'inside' | 'outside' | 'none'; // 标签位置
  legendPosition?: 'top' | 'bottom' | 'right' | 'left'; // 图例位置
  showValues?: boolean; // 是否在图表上显示数值
  valueFormat?: (value: number, percent: number, name: string) => string; // 数值格式化函数
  animation?: boolean; // 是否启用动画效果
  padAngle?: number; // 扇区间隙角度
  cornerRadius?: number; // 扇区圆角半径
  roseType?: 'radius' | 'area' | false; // 南丁格尔玫瑰图类型：radius半径模式，area面积模式，false关闭
  borderWidth?: number; // 边框宽度
  borderColor?: string; // 边框颜色
  onClick?: (params: any) => void; // 点击事件回调函数
}

/**
 * 环形图/南丁格尔玫瑰图组件
 * 
 * 用于展示数据占比情况，支持多种展示模式：
 * - 传统环形图：roseType为false时
 * - 南丁格尔玫瑰图：roseType为'radius'或'area'时
 * 
 * 默认为南丁格尔玫瑰图的面积模式('area')，展示效果更加明显
 * 
 * @param data 图表数据项集合，每项包含名称和数值
 * @param title 图表标题
 * @param centerText 显示在环形图中心的文本内容
 * @param showLegend 是否显示图例
 * @param className 自定义CSS类名
 * @param height 图表高度
 * @param innerRadius 内圆半径比例 (0-1)，默认0.35
 * @param outerRadius 外圆半径比例 (0-1)，默认0.8
 * @param labelPosition 标签位置：inside(内部)、outside(外部)、none(不显示)
 * @param legendPosition 图例位置：top、bottom、right、left
 * @param showValues 是否在图表上显示数值
 * @param valueFormat 数值格式化函数
 * @param animation 是否启用动画效果
 * @param padAngle 扇区间隙角度
 * @param cornerRadius 扇区圆角半径
 * @param roseType 南丁格尔玫瑰图类型，可选值：'radius'、'area'、false
 * @param borderWidth 边框宽度
 * @param borderColor 边框颜色
 * @param onClick 点击事件回调函数
 */
const DonutChart: React.FC<DonutChartProps> = ({
  data,
  title,
  centerText,
  showLegend = true,
  className = '',
  height = 250,
  innerRadius = 0.1,  // 南丁格尔玫瑰图内圆更小
  outerRadius = 0.8,  
  labelPosition = 'outside', 
  legendPosition = 'bottom', 
  showValues = true,  
  valueFormat = (value, percent, name = '') => `${name}: ${percent}%`,
  animation = true,
  padAngle = 0.02, 
  cornerRadius = 3,
  roseType = 'area', // 默认是南丁格尔玫瑰图的面积模式
  borderWidth = 2,    // 默认边框宽度
  borderColor = '#fff', // 默认边框颜色
  onClick
}) => {
  // 预定义的颜色数组
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

  // 计算总和用于百分比显示
  const total = coloredData.reduce((sum, item) => sum + item.value, 0);

  // 根据legendPosition设置图例位置
  const getLegendPosition = () => {
    switch (legendPosition) {
      case 'top': return { orient: 'horizontal', top: '0', left: 'center' };
      case 'bottom': return { orient: 'horizontal', bottom: '0', left: 'center' };
      case 'left': return { orient: 'vertical', left: '0', top: 'center' };
      case 'right':
      default: return { orient: 'vertical', right: '0', top: 'center' };
    }
  };

  // 根据legendPosition调整图表中心位置
  const getChartCenter = () => {
    switch (legendPosition) {
      case 'left': return ['60%', '50%'];
      case 'right': return ['40%', '50%'];
      case 'top':
      case 'bottom':
      default: return ['50%', '50%'];
    }
  };


  // 设置标签显示
  const getLabelConfig = () => {
    if (labelPosition === 'none') {
      return { show: false };
    }
    
    return {
      show: true,
      position: labelPosition = 'outside',
      formatter: (params: any) => {
        const { name = '', value, percent } = params;
        if (showValues) {
          return valueFormat(value, percent, name);
        }
        return name;
      },
      fontSize: 12,
      color: labelPosition === 'outside' ? '#fff' : '#666',
      lineHeight: 18,
      rich: {
        name: {
          fontSize: 12,
          lineHeight: 18
        },
        value: {
          fontSize: 12,
          fontWeight: 'bold',
          lineHeight: 18
        }
      }
    };
  };

  const option = {
    title: title ? {
      text: title,
      left: 'center',
      top: '0',
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
      show: showLegend,
      ...getLegendPosition(),
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle',
      formatter: (name: string) => {
        // 查找对应的数据项
        const dataItem = coloredData.find(item => item.name === name);
        if (dataItem) {
          // 展示名称和百分比
          const percent = (dataItem.value / total * 100).toFixed(1);
          return `${name} ${percent}%`;
        }
        return name;
      },
      textStyle: {
        fontSize: 12,
        color: '#666'
      }
    },
    series: [
      {
        name: '数据分布',
        type: 'pie',
        radius: [`${innerRadius * 100}%`, `${outerRadius * 100}%`],
        center: getChartCenter(),
        roseType: roseType, // 应用南丁格尔玫瑰图设置
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: cornerRadius,
          borderColor: borderColor,
          borderWidth: borderWidth
        },
        label: getLabelConfig(),
        emphasis: {
          scale: true,
          scaleSize: 10,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        },
        labelLine: {
          show: labelPosition === 'outside',
          length: 10,
          length2: 15,
          smooth: true,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        data: coloredData,
        padAngle: padAngle,
        animation: animation,
        animationDuration: animation ? 1000 : 0,
        animationEasing: 'cubicOut',
        animationDelay: (idx: number) => animation ? idx * 100 : 0
      }
    ]
  };

  // 处理高度样式
  const getHeightStyle = () => {
    if (typeof height === 'number') {
      return { height: `${height}px`, width: '100%' };
    }
    return { height, width: '100%' };
  };

  // 处理图表点击事件
  const onChartEvents = onClick ? {
    'click': onClick
  } : undefined;

  return (
    <div className={`relative ${className}`}>
      <ReactECharts
        option={option}
        style={getHeightStyle()}
        notMerge={true}
        lazyUpdate={true}
        onEvents={onChartEvents}
      />
      {centerText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {typeof centerText === 'string' ? (
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-700">{centerText}</div>
            </div>
          ) : (
            centerText
          )}
        </div>
      )}
    </div>
  );
};

export default DonutChart; 