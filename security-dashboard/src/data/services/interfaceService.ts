/**
 * Service 层 - 接口监控页面
 * 遵循 refactoring_plan.md 实现，聚合 API 调用
 */
import * as interfaceApi from '../api/interface';
import {
    InterfaceMetricsData,
    TopologyData,
    ChartInterfaceData,
    TimeRange,
    RequestOptions,
    ApiResponse // Import ApiResponse
} from '../api'; // 从 api/index.ts 统一导入类型

// Import mock data
import * as interfaceMock from '../mock/interface';

// Environment Variable for Mock Switching
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

// Re-export TimeRange
export type { TimeRange };

// Helper to process API response
function processApiResponse<T>(response: ApiResponse<T>, operationName: string): T {
    if (response.success) {
        return response.data;
    } else {
        console.error(`[Service Error] ${operationName} failed:`, response.message);
        throw new Error(`获取${operationName}数据失败: ${response.message}`);
    }
}

// --- 细粒度服务函数 (with Mock Logic) ---

/**
 * 获取接口监控指标卡数据
 */
export async function getInterfaceMetrics(options?: RequestOptions): Promise<InterfaceMetricsData> {
    if (USE_MOCK) {
        console.log('[Service Mock] getInterfaceMetrics');
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            return interfaceMock.metricsData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getInterfaceMetrics:', error);
            throw new Error(`加载接口指标模拟数据失败: ${error.message}`);
        }
    }
    const response = await interfaceApi.getInterfaceMetricsApi(/* options */); // Pass options if API supports it
    return processApiResponse(response, '接口指标');
}

/**
 * 获取接口监控拓扑图数据
 */
export async function getInterfaceTopology(options?: RequestOptions): Promise<TopologyData> {
    if (USE_MOCK) {
        console.log('[Service Mock] getInterfaceTopology');
        await new Promise(resolve => setTimeout(resolve, 180));
        try {
            // Now use the actual mock data exported from the mock index
            return interfaceMock.topologyData;
        } catch (error: any) {
            // Keep error handling in case mock data file itself has issues
            console.error('[Service Mock] Error loading mock data for getInterfaceTopology:', error);
            throw new Error(`加载接口拓扑模拟数据失败: ${error.message}`);
        }
    }
    const response = await interfaceApi.getInterfaceTopologyApi(/* options */);
    return processApiResponse(response, '接口拓扑');
}

/**
 * 获取接口监控时序图表数据
 */
export async function getInterfaceTimeSeries(
    chartType: string,
    timeRange: TimeRange,
    options?: RequestOptions
): Promise<ChartInterfaceData> {
    if (USE_MOCK) {
        console.log(`[Service Mock] getInterfaceTimeSeries (chartType: ${chartType}, timeRange: ${timeRange})`);
        await new Promise(resolve => setTimeout(resolve, 150));
        try {
            // Assume mock has a function getInterfaceTimeseriesMock
            return await interfaceMock.getInterfaceTimeseriesMock(chartType, timeRange);
        } catch (error: any) {
            console.error(`[Service Mock] Error loading mock time series data for ${chartType}:`, error);
            throw new Error(`加载接口时序 (${chartType}) 模拟数据失败: ${error.message}`);
        }
    }
    const response = await interfaceApi.getInterfaceTimeSeriesApi(chartType, timeRange /*, options */);
    return processApiResponse(response, `接口时序数据 (${chartType})`);
}

// --- 聚合服务函数 ---

/**
 * 定义接口监控页面所需聚合数据的类型
 */
export interface InterfaceMonitoringPageData {
    metrics: InterfaceMetricsData;
    topology: TopologyData;
    // 使用 Record<string, ChartInterfaceData> 来存储不同图表类型的数据
    timeSeriesData: Record<string, ChartInterfaceData>;
}

/**
 * 获取接口监控页面的所有聚合数据
 * (修改为调用本文件内的细粒度函数)
 * @param timeRangeMap 一个映射，键是图表类型ID，值是时间范围
 * @returns Promise<InterfaceMonitoringPageData>
 * @throws 如果任何一个底层调用失败，则抛出错误
 */
export async function getInterfaceMonitoringPageData(
    timeRangeMap: Record<string, TimeRange> = { 'callVolume': 'day', 'responseTime': 'day' }
): Promise<InterfaceMonitoringPageData> {
    console.log('[Service] Fetching interface monitoring page data...');

    try {
        // 1. 准备所有并行请求 (调用细粒度函数)
        const metricsPromise = getInterfaceMetrics();
        const topologyPromise = getInterfaceTopology(); // 注意 mock 数据是占位符

        const timeSeriesPromises = Object.entries(timeRangeMap).map(([chartType, timeRange]) => {
            return getInterfaceTimeSeries(chartType, timeRange)
                .then(data => ({ chartType, data })); // 直接获取数据
        });

        // 2. 执行所有请求
        const [
            metrics,
            topology,
            ...timeSeriesResults
        ] = await Promise.all([
            metricsPromise,
            topologyPromise,
            ...timeSeriesPromises
        ]);

        // 3. 处理时序数据结果
        const timeSeriesData: Record<string, ChartInterfaceData> = {};
        for (const result of timeSeriesResults) {
             if (typeof result === 'object' && result !== null && 'chartType' in result && 'data' in result) {
                timeSeriesData[result.chartType] = result.data;
            }
        }

        // 4. 组装最终结果
        const pageData: InterfaceMonitoringPageData = {
            metrics,
            topology,
            timeSeriesData,
        };

        console.log('[Service] Successfully fetched interface monitoring page data.');
        return pageData;

    } catch (error: any) {
        console.error('[Service] Error fetching interface monitoring page data:', error);
        throw error; // 向上抛出错误
    }
} 