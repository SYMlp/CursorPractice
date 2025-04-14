/**
 * 资产监控API接口
 */
import { ApiResponse, RequestOptions } from './types';

// 导入资产相关的模拟数据和类型
import * as mockData from '../mock/asset/assetMonitoringData';
import { TimeRange, ChartId, getChartData } from '../mock/asset'; // 使用模拟数据中的类型

// 获取API基础URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

// 是否使用模拟数据
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

/**
 * 生成综合图表数据的函数，结合所有需要的图表数据
 */
const generateMockChartData = (timeRange: TimeRange) => {
  // 获取业务趋势数据
  const businessTrendData = getChartData('businessTrend', timeRange);
  // 获取告警类型数据
  const alarmTypeData = getChartData('alarmType', timeRange);
  // 获取风险分布数据
  const riskDistributionData = getChartData('riskDistribution', timeRange);

  // 确保返回的数据结构有效
  return {
    xAxisData: businessTrendData && 'xAxis' in businessTrendData ? businessTrendData.xAxis : [],
    series: {
      business: businessTrendData && 'series' in businessTrendData ? businessTrendData.series : [],
      alarmType: alarmTypeData || [],
      riskDistribution: riskDistributionData && 'series' in riskDistributionData ? riskDistributionData.series : []
    }
  };
};

/**
 * 获取资产概览统计数据
 */
export async function getAssetStats(options?: RequestOptions): Promise<ApiResponse<typeof mockData.assetStatsData>> {
  if (USE_MOCK) {
    // 使用模拟数据
    return {
      code: 200,
      data: mockData.assetStatsData,
      message: '获取成功',
      success: true
    };
  }

  // 实际API调用
  try {
    const response = await fetch(`${API_BASE_URL}/asset/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      signal: options?.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP错误 ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('获取资产统计数据失败:', error);
    
    // API调用失败时，仍返回模拟数据作为降级策略
    return {
      code: 500,
      data: mockData.assetStatsData,
      message: error.message || '网络请求失败',
      success: false
    };
  }
}

/**
 * 获取资产交互量排行数据
 */
export async function getAssetInteractionRank(options?: RequestOptions): Promise<ApiResponse<typeof mockData.applicationInteractionRankData>> {
  if (USE_MOCK) {
    return {
      code: 200,
      data: mockData.applicationInteractionRankData,
      message: '获取成功',
      success: true
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/asset/interaction/rank`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      signal: options?.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP错误 ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('获取资产交互量排行数据失败:', error);
    return {
      code: 500,
      data: mockData.applicationInteractionRankData,
      message: error.message || '网络请求失败',
      success: false
    };
  }
}

/**
 * 获取风险业务应用排行数据
 */
export async function getRiskBusinessRank(options?: RequestOptions): Promise<ApiResponse<typeof mockData.riskBusinessRankData>> {
  if (USE_MOCK) {
    return {
      code: 200,
      data: mockData.riskBusinessRankData,
      message: '获取成功',
      success: true
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/asset/business/risk/rank`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      signal: options?.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP错误 ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('获取风险业务应用排行数据失败:', error);
    return {
      code: 500,
      data: mockData.riskBusinessRankData,
      message: error.message || '网络请求失败',
      success: false
    };
  }
}

/**
 * 获取资产图表数据
 */
export async function getAssetChartData(timeRange: TimeRange, options?: RequestOptions): Promise<ApiResponse<ReturnType<typeof generateMockChartData>>> {
  if (USE_MOCK) {
    return {
      code: 200,
      data: generateMockChartData(timeRange),
      message: '获取成功',
      success: true
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/asset/chart?timeRange=${timeRange}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      signal: options?.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP错误 ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('获取资产图表数据失败:', error);
    return {
      code: 500,
      data: generateMockChartData(timeRange),
      message: error.message || '网络请求失败',
      success: false
    };
  }
} 