/**
 * 数据转换工具
 * 
 * 提供各种数据转换函数，用于将API返回的数据转换为组件需要的格式
 */
import { RankItem } from '../mock/asset';

/**
 * 转换排行榜数据
 * @param data API返回的原始数据
 * @returns 转换后的排行榜数据
 */
export function transformRankData(data: any[]): RankItem[] {
  return data.map((item, index) => ({
    id: item.id || index + 1,
    name: item.name || `未命名${index + 1}`,
    value: item.value?.toString() || '0'
  }));
}

/**
 * 转换图表数据为ECharts配置
 * @param data 原始数据
 * @param options 配置选项
 * @returns ECharts配置对象
 */
export function transformToEChartsOption(
  data: any,
  options: {
    title?: string;
    type?: 'line' | 'bar' | 'pie' | 'scatter';
    showLegend?: boolean;
    smooth?: boolean;
    areaStyle?: boolean;
  } = {}
) {
  const { 
    title = '',
    type = 'line',
    showLegend = true,
    smooth = true,
    areaStyle = false
  } = options;

  // 基本配置
  const result: any = {
    title: title ? { text: title } : undefined,
    tooltip: { trigger: 'axis' },
    legend: showLegend ? { data: [] } : undefined,
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: [] },
    yAxis: { type: 'value' },
    series: []
  };

  // 根据数据类型进行转换
  if (data.xAxis && Array.isArray(data.xAxis)) {
    result.xAxis.data = data.xAxis;
  }

  if (data.series && Array.isArray(data.series)) {
    result.series = data.series.map((item: any) => {
      const seriesItem: any = {
        name: item.name,
        type,
        data: item.data,
        smooth,
      };

      // 设置颜色
      if (item.color) {
        seriesItem.itemStyle = { color: item.color };
        seriesItem.lineStyle = { color: item.color };
      }

      // 设置区域样式
      if (areaStyle || item.areaStyle) {
        seriesItem.areaStyle = {};
      }

      return seriesItem;
    });

    // 添加图例数据
    if (showLegend) {
      result.legend.data = data.series.map((item: any) => item.name);
    }
  }

  return result;
}

/**
 * 转换饼图数据为ECharts配置
 * @param data 原始数据
 * @param options 配置选项
 * @returns ECharts饼图配置
 */
export function transformToPieChartOption(
  data: Array<{ name: string; value: number; itemStyle?: any }>,
  options: {
    title?: string;
    showLegend?: boolean;
    radius?: string | string[];
    center?: string[];
  } = {}
) {
  const {
    title = '',
    showLegend = true,
    radius = '50%',
    center = ['50%', '50%']
  } = options;

  return {
    title: title ? { text: title } : undefined,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: showLegend ? {
      orient: 'vertical',
      left: 10,
      data: data.map(item => item.name)
    } : undefined,
    series: [
      {
        name: title || '数据分布',
        type: 'pie',
        radius,
        center,
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
} 