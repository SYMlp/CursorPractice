import * as api from '../api';
import { TimeRange, RequestOptions, ApiResponse } from '../api/commonTypes'; // Import necessary types
import {
    AssetStatsData,
    AssetInteractionRankData,
    RiskBusinessRankData,
    TimeSeriesChartData,
    DistributionChartData,
    MonitoringMetricsData,
    AssetFlowData,
    FrequentLoginUserRankData,
    RiskUserRankData,
    SecurityDistributionData,
    IndustryDistributionData,
    RiskTrendData
} from '../api'; // 从 api/index.ts 统一导入类型
// Import mock data and types
import * as appAssetMock from '../mock/appAsset';
import { ChartId } from '../mock/appAsset/chart'; // Import ChartId type

// Re-export TimeRange for page component usage
export type { TimeRange } from '../api/commonTypes';

/**
 * Service Layer - 应用资产监控页面
 * 遵循 refactoring_plan.md 实现，聚合 API 调用
 */

// Environment Variable for Mock Switching
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

/**
 * 定义应用资产监控页面所需聚合数据的类型
 */
export interface AppAssetMonitoringPageData {
    stats: AssetStatsData;
    interactionRank: AssetInteractionRankData;
    riskBusinessRank: RiskBusinessRankData;
    frequentLoginUserRank: FrequentLoginUserRankData;
    riskUserRank: RiskUserRankData;
    metrics: MonitoringMetricsData;
    flowData: AssetFlowData;
    securityDistribution: SecurityDistributionData;
    industryDistribution: IndustryDistributionData;
    businessTrendData: TimeSeriesChartData;
    alarmTypeData: DistributionChartData;
    riskTrendData: RiskTrendData;
}

/**
 * 获取资产统计数据
 */
export async function getAssetStats(options?: RequestOptions): Promise<AssetStatsData> {
  if (USE_MOCK) {
    console.log('[Service Mock] getAssetStats');
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
    try {
      return appAssetMock.assetStatsData; // Directly return mock data
    } catch (error: any) {
      console.error('[Service Mock] Error loading mock data for getAssetStats:', error);
      throw new Error(`加载资产统计模拟数据失败: ${error.message}`);
    }
  }
  // Call API if not using mock
  const response = await api.getAssetStatsApi(options);
  return processApiResponse(response, '资产统计数据');
}

/**
 * 获取资产交互量排行数据
 * @param limit 限制返回数量
 */
export async function getAssetInteractionRank(limit?: number, options?: RequestOptions): Promise<AssetInteractionRankData> {
  if (USE_MOCK) {
    console.log(`[Service Mock] getAssetInteractionRank (limit: ${limit})`);
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
      const data = appAssetMock.applicationInteractionRankData;
      return limit ? data.slice(0, limit) : data;
    } catch (error: any) {
      console.error('[Service Mock] Error loading mock data for getAssetInteractionRank:', error);
      throw new Error(`加载资产交互量排行模拟数据失败: ${error.message}`);
    }
  }
  // Call API
  const response = await api.getAssetInteractionRankApi(options);
  const data = processApiResponse(response, '资产交互量排行数据');
  // Apply limit after fetching from API as well
  return limit ? data.slice(0, limit) : data;
}

/**
 * 获取风险业务应用排行数据
 * @param limit 限制返回数量
 */
export async function getRiskBusinessRank(limit?: number, options?: RequestOptions): Promise<RiskBusinessRankData> {
  if (USE_MOCK) {
    console.log(`[Service Mock] getRiskBusinessRank (limit: ${limit})`);
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
      const data = appAssetMock.riskBusinessRankData;
      return limit ? data.slice(0, limit) : data;
    } catch (error: any) {
      console.error('[Service Mock] Error loading mock data for getRiskBusinessRank:', error);
      throw new Error(`加载风险业务应用排行模拟数据失败: ${error.message}`);
    }
  }
  // Call API
  const response = await api.getAssetRiskBusinessRankApi(options);
  const data = processApiResponse(response, '风险业务应用排行数据');
  return limit ? data.slice(0, limit) : data;
}

/**
 * 获取资产图表数据
 * @param chartId 图表 ID
 * @param timeRange 时间范围
 */
export async function getAssetChartData(
    chartId: ChartId, // Use imported ChartId type
    timeRange: TimeRange,
    options?: RequestOptions
): Promise<TimeSeriesChartData | DistributionChartData> {
    if (USE_MOCK) {
        console.log(`[Service Mock] getAssetChartData (chartId: ${chartId}, timeRange: ${timeRange})`);
        await new Promise(resolve => setTimeout(resolve, 150));
        try {
            // Assume mock has a function to get chart data
            const mockResult = await appAssetMock.getChartData(chartId, timeRange);

            // Type narrowing before accessing properties
             if (chartId === 'businessTrend' || chartId === 'riskTrend') {
                 // Check if it's TimeSeriesChartData (has xAxisData)
                 if ('xAxisData' in mockResult) {
                    return { xAxisData: mockResult.xAxisData || [], series: mockResult.series || [] };
                 } else {
                     console.warn(`[Service Mock] Expected TimeSeriesChartData for ${chartId}, but received different structure.`);
                     return { xAxisData: [], series: [] }; // Return empty structure
                 }
            } else if (chartId === 'alarmType' || chartId === 'riskDistribution') {
                // Check if it's DistributionChartData (is an array)
                if (Array.isArray(mockResult)) {
                   return mockResult; // Return the array directly
                } else {
                    console.warn(`[Service Mock] Expected DistributionChartData for ${chartId}, but received different structure.`);
                    return []; // Return empty array
                }
            }
            // Fallback if chartId doesn't match expected types
            console.warn(`[Service Mock] Unhandled chartId ${chartId} in getAssetChartData service.`);
            return []; // Or appropriate empty structure

        } catch (error: any) {
            console.error(`[Service Mock] Error loading mock chart data for ${chartId}:`, error);
            throw new Error(`加载资产图表 (${chartId}) 模拟数据失败: ${error.message}`);
        }
    }
    // Call API
    const response = await api.getAssetChartDataApi(chartId, timeRange); // Pass options if API supports it
    return processApiResponse(response, `资产图表数据 (${chartId})`);
}

/**
 * 获取资产监控指标数据
 */
export async function getAssetMonitoringMetrics(options?: RequestOptions): Promise<MonitoringMetricsData> {
  if (USE_MOCK) {
    console.log('[Service Mock] getAssetMonitoringMetrics');
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
      return appAssetMock.monitoringMetricsData;
    } catch (error: any) {
      console.error('[Service Mock] Error loading mock data for getAssetMonitoringMetrics:', error);
      throw new Error(`加载资产监控指标模拟数据失败: ${error.message}`);
    }
  }
  // Call API
  const response = await api.getAssetMonitoringMetricsApi(options);
  return processApiResponse(response, '资产监控指标');
}

/**
 * 获取资产流图数据
 */
export async function getAssetFlowData(options?: RequestOptions): Promise<AssetFlowData> {
  if (USE_MOCK) {
    console.log('[Service Mock] getAssetFlowData');
    await new Promise(resolve => setTimeout(resolve, 180));
    try {
      // Ensure mock data structure matches AssetFlowData
      return { nodes: appAssetMock.assetNodes, edges: appAssetMock.assetEdges };
    } catch (error: any) {
      console.error('[Service Mock] Error loading mock data for getAssetFlowData:', error);
      throw new Error(`加载资产流图模拟数据失败: ${error.message}`);
    }
  }
  // Call API
  const response = await api.getAssetFlowDataApi(options);
  return processApiResponse(response, '资产流图数据');
}

/**
 * 获取频繁登录用户排行数据
 * @param limit 限制返回数量
 */
export async function getFrequentLoginUserRank(limit?: number, options?: RequestOptions): Promise<FrequentLoginUserRankData> {
    if (USE_MOCK) {
        console.log(`[Service Mock] getFrequentLoginUserRank (limit: ${limit})`);
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            // Fix: Use the correct exported mock data name
            const mockLoginData = appAssetMock.loginUserData || []; // Use loginUserData
            // Fix: Transform LoginUserData to FrequentLoginUserRankData
            const transformedData: FrequentLoginUserRankData = mockLoginData.map(user => ({
                id: user.id, // Assuming FrequentLoginUserItem also has id
                name: user.name,
                value: user.loginCount, // Map loginCount to value
                // Add other required fields if FrequentLoginUserItem has them, e.g., percent
                // percent: calculatePercent(user.loginCount, totalLoginCount) // Example
            }));
            return limit ? transformedData.slice(0, limit) : transformedData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading/transforming mock data for getFrequentLoginUserRank:', error);
            throw new Error(`加载频繁登录用户排行模拟数据失败: ${error.message}`);
        }
    }
    // Call API - Assuming API function exists
    // const response = await api.getFrequentLoginUserRankApi(limit); // Pass options if API supports it
    // return processApiResponse(response, '频繁登录用户排行');
    console.warn('getFrequentLoginUserRankApi call is commented out in service');
    return []; // Placeholder
}

/**
 * 获取风险用户排行数据
 * @param limit 限制返回数量
 */
export async function getRiskUserRank(limit?: number, options?: RequestOptions): Promise<RiskUserRankData> {
    if (USE_MOCK) {
        console.log(`[Service Mock] getRiskUserRank (limit: ${limit})`);
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            const data = appAssetMock.riskUserRankData;
            return limit ? data.slice(0, limit) : data;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getRiskUserRank:', error);
            throw new Error(`加载风险用户排行模拟数据失败: ${error.message}`);
        }
    }
    // Call API
    const response = await api.getRiskUserRankApi(limit); // Pass options if API supports it
    const data = processApiResponse(response, '风险用户排行');
    return limit ? data.slice(0, limit) : data;
}

/**
 * 获取安全分布数据
 */
export async function getSecurityDistribution(options?: RequestOptions): Promise<SecurityDistributionData> {
    if (USE_MOCK) {
        console.log('[Service Mock] getSecurityDistribution');
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            return appAssetMock.securityDistributionData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getSecurityDistribution:', error);
            throw new Error(`加载安全分布模拟数据失败: ${error.message}`);
        }
    }
    // Call API
    const response = await api.getSecurityDistributionApi(options);
    return processApiResponse(response, '安全分布数据');
}

/**
 * 获取行业分布数据
 */
export async function getIndustryDistribution(options?: RequestOptions): Promise<IndustryDistributionData> {
    if (USE_MOCK) {
        console.log('[Service Mock] getIndustryDistribution');
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            return appAssetMock.industryDistributionData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getIndustryDistribution:', error);
            throw new Error(`加载行业分布模拟数据失败: ${error.message}`);
        }
    }
    // Call API
    const response = await api.getIndustryDistributionApi(options);
    return processApiResponse(response, '行业分布数据');
}

/**
 * 获取风险趋势数据
 * @param timeRange 时间范围
 */
export async function getRiskTrend(timeRange?: TimeRange, options?: RequestOptions): Promise<RiskTrendData> {
    if (USE_MOCK) {
        console.log(`[Service Mock] getRiskTrend (timeRange: ${timeRange})`);
        await new Promise(resolve => setTimeout(resolve, 120));
        try {
            // Fix: Use getAssetChartData for risk trend mock data
            const mockResult = await appAssetMock.getChartData('riskTrend', timeRange || 'day');
            // Assuming RiskTrendData structure is compatible with TimeSeriesChartData
            // If not, specific transformation would be needed here.
            return mockResult as RiskTrendData; // Use type assertion
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getRiskTrend:', error);
            throw new Error(`加载风险趋势模拟数据失败: ${error.message}`);
        }
    }
    // Call API - Assuming API function exists
    // const response = await api.getRiskTrendApi(timeRange); // Pass options if API supports it
    // return processApiResponse(response, '风险趋势数据');
    console.warn('getRiskTrendApi call is commented out in service');
    return { xAxisData: [], series: [] }; // Placeholder
}

/**
 * Helper to process API response
 * @param response API response
 * @param operationName Name of the operation
 * @returns Processed data
 * @throws Error if the operation fails
 */
function processApiResponse<T>(response: api.ApiResponse<T>, operationName: string): T {
    if (response.success) {
        return response.data;
    } else {
        console.error(`[Service Error] ${operationName} failed:`, response.message);
        throw new Error(`获取${operationName}数据失败: ${response.message}`);
    }
}

/**
 * 获取应用资产监控页面所需的所有聚合数据 (重命名并补充)
 * @param timeRangeMap 一个映射，键是图表ID (e.g., 'mainChart')，值是时间范围
 * @returns Promise<AppAssetMonitoringPageData> 包含页面所有数据的 Promise
 * @throws 如果任何一个底层 API 调用失败，则抛出错误
 */
export async function getAppAssetMonitoringPageData(
    // Define params based on page needs (time ranges, limits)
    businessTrendTimeRange: TimeRange = 'day',
    alarmTypeTimeRange: TimeRange = 'day',
    riskTrendTimeRange: TimeRange = 'day',
    interactionRankLimit: number = 5,
    riskBusinessRankLimit: number = 5,
    frequentLoginUserRankLimit: number = 5,
    riskUserRankLimit: number = 5 // Example limit
): Promise<AppAssetMonitoringPageData> {
    console.log('[Service] Fetching app asset monitoring page data...');

    try {
        // Prepare promises for parallel execution
        const statsPromise = getAssetStats();
        const interactionRankPromise = getAssetInteractionRank(interactionRankLimit);
        const riskBusinessRankPromise = getRiskBusinessRank(riskBusinessRankLimit);
        const frequentLoginUserRankPromise = getFrequentLoginUserRank(frequentLoginUserRankLimit);
        const riskUserRankPromise = getRiskUserRank(riskUserRankLimit);
        const metricsPromise = getAssetMonitoringMetrics();
        const flowDataPromise = getAssetFlowData();
        const securityDistributionPromise = getSecurityDistribution();
        const industryDistributionPromise = getIndustryDistribution();
        // Use getAssetChartData for chart-related data
        const businessTrendPromise = getAssetChartData('businessTrend', businessTrendTimeRange);
        const alarmTypePromise = getAssetChartData('alarmType', alarmTypeTimeRange);
        const riskTrendPromise = getAssetChartData('riskTrend', riskTrendTimeRange);

        // Execute all promises in parallel
        const [
            stats,
            interactionRank,
            riskBusinessRank,
            frequentLoginUserRank,
            riskUserRank,
            metrics,
            flowData,
            securityDistribution,
            industryDistribution,
            businessTrendDataResult,
            alarmTypeDataResult,
            riskTrendDataResult
        ] = await Promise.all([
            statsPromise,
            interactionRankPromise,
            riskBusinessRankPromise,
            frequentLoginUserRankPromise,
            riskUserRankPromise,
            metricsPromise,
            flowDataPromise,
            securityDistributionPromise,
            industryDistributionPromise,
            businessTrendPromise,
            alarmTypePromise,
            riskTrendPromise
        ]);

        // Assemble the final page data, ensure chart data types are correct
        const pageData: AppAssetMonitoringPageData = {
            stats,
            interactionRank,
            riskBusinessRank,
            frequentLoginUserRank,
            riskUserRank,
            metrics,
            flowData,
            securityDistribution,
            industryDistribution,
            // Perform type assertion cautiously or add type checks
            businessTrendData: businessTrendDataResult as TimeSeriesChartData,
            alarmTypeData: alarmTypeDataResult as DistributionChartData,
            // Assuming getAssetChartData returns data compatible with RiskTrendData for 'riskTrend'
            // If not, transformation or a dedicated getRiskTrend function might be needed.
            riskTrendData: riskTrendDataResult as RiskTrendData
        };

        console.log('[Service] Successfully fetched app asset monitoring page data.');
        return pageData;

    } catch (error: any) {
        console.error('[Service] Error fetching app asset monitoring page data:', error);
        // Rethrow or handle error appropriately
        throw error;
    }
} 