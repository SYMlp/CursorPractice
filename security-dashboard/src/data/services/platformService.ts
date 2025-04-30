/**
 * Service 层 - 平台概览页面
 * 遵循 refactoring_plan.md 实现，聚合 API 调用
 */
import * as platformApi from '../api/platform';
import {
    ResourceOverviewData,
    ResourceTypesData,
    SecurityRulesData,
    InterfaceOverviewData,
    ChartServiceData,
    TimeRange,
    RequestOptions,
    ApiResponse // Import ApiResponse
} from '../api'; // 从 api/index.ts 统一导入类型

// Import mock data
import * as platformMock from '../mock/platform';

// Environment Variable for Mock Switching
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

// 重新导出 TimeRange，以便页面组件可以导入
export type { TimeRange };

// Helper to process API response (can be shared or defined locally)
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
 * 获取平台资源概览数据
 */
export async function getPlatformResourceOverview(options?: RequestOptions): Promise<ResourceOverviewData> {
    if (USE_MOCK) {
        console.log('[Service Mock] getPlatformResourceOverview');
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            return platformMock.resourceOverviewData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getPlatformResourceOverview:', error);
            throw new Error(`加载平台资源概览模拟数据失败: ${error.message}`);
        }
    }
    const response = await platformApi.getPlatformResourceOverviewApi(options);
    return processApiResponse(response, '平台资源概览');
}

/**
 * 获取平台资源类型数据
 */
export async function getPlatformResourceTypes(options?: RequestOptions): Promise<ResourceTypesData> {
    if (USE_MOCK) {
        console.log('[Service Mock] getPlatformResourceTypes');
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            return platformMock.resourceTypesData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getPlatformResourceTypes:', error);
            throw new Error(`加载平台资源类型模拟数据失败: ${error.message}`);
        }
    }
    const response = await platformApi.getPlatformResourceTypesApi(options);
    return processApiResponse(response, '平台资源类型');
}

/**
 * 获取平台安全规则数据
 */
export async function getPlatformSecurityRules(options?: RequestOptions): Promise<SecurityRulesData> {
    if (USE_MOCK) {
        console.log('[Service Mock] getPlatformSecurityRules');
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            return platformMock.securityRulesData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getPlatformSecurityRules:', error);
            throw new Error(`加载平台安全规则模拟数据失败: ${error.message}`);
        }
    }
    const response = await platformApi.getPlatformSecurityRulesApi(options);
    return processApiResponse(response, '平台安全规则');
}

/**
 * 获取平台接口概览数据
 */
export async function getPlatformInterfaceOverview(options?: RequestOptions): Promise<InterfaceOverviewData> {
    if (USE_MOCK) {
        console.log('[Service Mock] getPlatformInterfaceOverview');
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            return platformMock.interfaceOverviewData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getPlatformInterfaceOverview:', error);
            throw new Error(`加载平台接口概览模拟数据失败: ${error.message}`);
        }
    }
    const response = await platformApi.getPlatformInterfaceOverviewApi(options);
    return processApiResponse(response, '平台接口概览');
}

/**
 * 获取平台服务时序图表数据
 */
export async function getPlatformServiceTimeSeries(
    serviceId: string,
    timeRange: TimeRange,
    options?: RequestOptions
): Promise<ChartServiceData> {
    if (USE_MOCK) {
        console.log(`[Service Mock] getPlatformServiceTimeSeries (serviceId: ${serviceId}, timeRange: ${timeRange})`);
        await new Promise(resolve => setTimeout(resolve, 150));
        try {
            // Assume mock has a function getServiceTimeseriesMock
            return await platformMock.getServiceTimeseriesMock(serviceId, timeRange);
        } catch (error: any) {
            console.error(`[Service Mock] Error loading mock time series data for ${serviceId}:`, error);
            throw new Error(`加载平台服务时序 (${serviceId}) 模拟数据失败: ${error.message}`);
        }
    }
    const response = await platformApi.getPlatformServiceTimeSeriesApi(serviceId, timeRange, options);
    return processApiResponse(response, `平台服务时序 (${serviceId})`);
}


// --- 聚合服务函数 ---

/**
 * 定义平台概览页面所需聚合数据的类型
 */
export interface PlatformOverviewPageData {
    resourceOverview: ResourceOverviewData;
    resourceTypes: ResourceTypesData;
    securityRules: SecurityRulesData;
    interfaceOverview: InterfaceOverviewData;
    // 使用 Record<string, ChartServiceData> 来存储不同服务 ID 的时序图数据
    timeSeriesData: Record<string, ChartServiceData>;
}

/**
 * 获取平台概览页面的所有聚合数据
 * (修改为调用本文件内的细粒度函数)
 * @param timeRangeMap 一个映射，键是服务/图表ID，值是时间范围
 * @returns Promise<PlatformOverviewPageData>
 * @throws 如果任何一个底层调用失败，则抛出错误
 */
export async function getPlatformOverviewPageData(
    timeRangeMap: Record<string, TimeRange> = { 'defaultTimeSeries': 'day' }
): Promise<PlatformOverviewPageData> {
    console.log('[Service] Fetching platform overview page data...');

    try {
        // 1. 准备所有并行请求 (调用细粒度函数)
        const overviewPromise = getPlatformResourceOverview();
        const typesPromise = getPlatformResourceTypes();
        const rulesPromise = getPlatformSecurityRules();
        const interfacePromise = getPlatformInterfaceOverview();

        const timeSeriesPromises = Object.entries(timeRangeMap).map(([serviceId, timeRange]) => {
            return getPlatformServiceTimeSeries(serviceId, timeRange)
                .then(data => ({ serviceId, data })); // 直接获取数据或错误已在细粒度函数处理
        });

        // 2. 执行所有请求
        const [
            resourceOverview,
            resourceTypes,
            securityRules,
            interfaceOverview,
            ...timeSeriesResults // 使用 rest 操作符收集图表结果
        ] = await Promise.all([
            overviewPromise,
            typesPromise,
            rulesPromise,
            interfacePromise,
            ...timeSeriesPromises
        ]);

        // 3. 处理时序数据结果
        const timeSeriesData: Record<string, ChartServiceData> = {};
        // timeSeriesResults 现在是 { serviceId: string, data: ChartServiceData }[]
        for (const result of timeSeriesResults) {
             // 类型守卫确保 result 是对象而不是其他 Promise.all 可能返回的东西
            if (typeof result === 'object' && result !== null && 'serviceId' in result && 'data' in result) {
                timeSeriesData[result.serviceId] = result.data;
            }
        }
        
        // 4. 组装最终结果 (因为细粒度函数已处理错误，这里直接用数据)
        const pageData: PlatformOverviewPageData = {
            resourceOverview,
            resourceTypes,
            securityRules,
            interfaceOverview,
            timeSeriesData,
        };

        console.log('[Service] Successfully fetched platform overview page data.');
        return pageData;

    } catch (error: any) {
        console.error('[Service] Error fetching platform overview page data:', error);
        throw error; // 向上抛出错误
    }
} 