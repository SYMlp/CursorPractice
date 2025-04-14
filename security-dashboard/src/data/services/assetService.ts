/**
 * 资产监控服务
 * 
 * 封装资产监控相关的业务逻辑，组合API调用，提供给组件使用
 */
import * as api from '../api';
import { TimeRange } from '../mock/asset';

/**
 * 获取资产统计数据
 * @returns 资产统计数据
 */
export async function getAssetStats() {
  const response = await api.getAssetStats();
  
  if (response.success) {
    return response.data;
  }
  
  throw new Error(`获取资产统计数据失败: ${response.message}`);
}

/**
 * 获取资产交互量排行数据
 * @param limit 限制返回数量
 * @returns 排行数据
 */
export async function getAssetInteractionRank(limit?: number) {
  const response = await api.getAssetInteractionRank();
  
  if (response.success) {
    const data = response.data;
    return limit ? data.slice(0, limit) : data;
  }
  
  throw new Error(`获取资产交互量排行数据失败: ${response.message}`);
}

/**
 * 获取风险业务应用排行数据
 * @param limit 限制返回数量
 * @returns 排行数据
 */
export async function getRiskBusinessRank(limit?: number) {
  const response = await api.getRiskBusinessRank();
  
  if (response.success) {
    const data = response.data;
    return limit ? data.slice(0, limit) : data;
  }
  
  throw new Error(`获取风险业务应用排行数据失败: ${response.message}`);
}

/**
 * 获取资产图表数据
 * @param timeRange 时间范围
 * @returns 图表数据
 */
export async function getAssetChartData(timeRange: TimeRange) {
  const response = await api.getAssetChartData(timeRange);
  
  if (response.success) {
    return response.data;
  }
  
  throw new Error(`获取资产图表数据失败: ${response.message}`);
}

/**
 * 获取资产页面所需的所有数据
 * @param timeRange 时间范围
 * @returns 资产页面所需的所有数据
 */
export async function getAssetPageData(timeRange: TimeRange = 'day') {
  try {
    // 并行请求所有数据
    const [stats, interactionRank, riskBusinessRank, chartData] = await Promise.all([
      getAssetStats(),
      getAssetInteractionRank(5),
      getRiskBusinessRank(5),
      getAssetChartData(timeRange)
    ]);
    
    return {
      stats,
      interactionRank,
      riskBusinessRank,
      chartData
    };
  } catch (error: any) {
    console.error('获取资产页面数据失败:', error);
    throw new Error(`获取资产页面数据失败: ${error.message}`);
  }
} 