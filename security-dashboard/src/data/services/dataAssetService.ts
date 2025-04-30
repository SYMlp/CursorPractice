/**
 * Service Layer - Data Asset Monitoring
 */
import * as dataAssetApi from '../api/dataAsset';
import { ApiResponse, TimeRange, RequestOptions } from '../api/commonTypes';

// Import mock data
import * as dataAssetMock from '../mock/dataAsset';

// --- Re-export API Types or Define Page-Specific ViewModels ---

export type { 
    DataAssetStatsData,
    DataAssetRiskTrendData,
    ResourceFlowData,
    RankingItem,
    RankingType,
    DataAssetTopRankingData 
} from '../api/dataAsset';

// --- Define Aggregated Page Data Structure (Align with Page Component Usage) ---

// Define limits for different ranking types (using keys expected by API/mock)
export interface RankingLimits {
    riskResource?: number;
    highRiskUser?: number;
    storageRisk?: number;
    protectionLack?: number;
    // Add other ranking types used by the page, matching API keys
}

// Structure returned by the aggregated service function
// Use 'topRankings' key and page-expected keys ('byRisk', etc.)
export interface DataAssetMonitoringPageData {
    stats: dataAssetApi.DataAssetStatsData;
    resourceFlow: dataAssetApi.ResourceFlowData;
    riskTrend: dataAssetApi.DataAssetRiskTrendData;
    // Use topRankings key, matching the page component's expectation
    topRankings: { // Keys match those used in the page JSX
        byRisk?: dataAssetApi.RankingItem[];
        bySensitiveDataUser?: dataAssetApi.RankingItem[];
        byStorageRisk?: dataAssetApi.RankingItem[];
        byProtectionLack?: dataAssetApi.RankingItem[];
        // Add other rankings as needed, with page-expected keys
    };
}

// Environment Variable for Mock Switching
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

// --- Service Functions ---

// Helper to process API response and extract data or throw error
function processApiResponse<T>(response: ApiResponse<T>, operationName: string): T {
    if (response.success) {
        return response.data;
    } else {
        console.error(`[Service Error] ${operationName} failed:`, response.message);
        throw new Error(`获取${operationName}数据失败: ${response.message}`);
    }
}

// --- Fine-grained Service Functions (with Mock Logic) ---

export const getDataAssetStats = async (options?: RequestOptions): Promise<dataAssetApi.DataAssetStatsData> => {
    if (USE_MOCK) {
        console.log('[Service Mock] getDataAssetStats');
        await new Promise(resolve => setTimeout(resolve, 50));
        try {
            return dataAssetMock.statsData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getDataAssetStats:', error);
            throw new Error(`加载数据资产统计模拟数据失败: ${error.message}`);
        }
    }
    const response = await dataAssetApi.getDataAssetStatsApi(/* options */);
    return processApiResponse(response, '数据资产统计');
};

export const getDataAssetResourceFlow = async (options?: RequestOptions): Promise<dataAssetApi.ResourceFlowData> => {
    if (USE_MOCK) {
        console.log('[Service Mock] getDataAssetResourceFlow');
        await new Promise(resolve => setTimeout(resolve, 150));
        try {
            return dataAssetMock.resourceFlowData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getDataAssetResourceFlow:', error);
            throw new Error(`加载数据资产资源流模拟数据失败: ${error.message}`);
        }
    }
    const response = await dataAssetApi.getDataAssetResourceFlowApi(/* options */);
    return processApiResponse(response, '数据资产资源流');
};

export const getDataAssetTopRanking = async (
    rankingType: dataAssetApi.RankingType,
    limit?: number,
    options?: RequestOptions
): Promise<dataAssetApi.DataAssetTopRankingData> => {
    if (USE_MOCK) {
        console.log(`[Service Mock] getDataAssetTopRanking (type: ${rankingType}, limit: ${limit})`);
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            // Assume mock has a function getDataAssetTopRankingMock
            const data = await dataAssetMock.getDataAssetTopRankingMock(rankingType, limit);
            // Service layer can still apply limit if needed, though mock might handle it
            return data;
        } catch (error: any) {
            console.error(`[Service Mock] Error loading mock ranking data for ${rankingType}:`, error);
            throw new Error(`加载数据资产排名 (${rankingType}) 模拟数据失败: ${error.message}`);
        }
    }
    const response = await dataAssetApi.getDataAssetTopRankingApi(rankingType, limit /*, options */);
    return processApiResponse(response, `数据资产排名 (${rankingType})`);
};

export const getDataAssetRiskTrend = async (
    timeRange?: TimeRange,
    options?: RequestOptions
): Promise<dataAssetApi.DataAssetRiskTrendData> => {
    if (USE_MOCK) {
        console.log(`[Service Mock] getDataAssetRiskTrend (timeRange: ${timeRange})`);
        await new Promise(resolve => setTimeout(resolve, 120));
        try {
            // Assume mock data exists
            return dataAssetMock.riskTrendData;
        } catch (error: any) {
            console.error('[Service Mock] Error loading mock data for getDataAssetRiskTrend:', error);
            throw new Error(`加载数据资产风险趋势模拟数据失败: ${error.message}`);
        }
    }
    const response = await dataAssetApi.getDataAssetRiskTrendApi(timeRange /*, options */);
    return processApiResponse(response, '数据资产风险趋势');
};

// --- Aggregated Service Function for the Page ---

// Mapping from internal RankingType (API/Mock keys) to Page keys
const rankingTypeToPageKeyMap: Record<dataAssetApi.RankingType, keyof DataAssetMonitoringPageData['topRankings']> = {
    riskResource: 'byRisk',
    highRiskUser: 'bySensitiveDataUser',
    storageRisk: 'byStorageRisk',
    protectionLack: 'byProtectionLack'
};

/**
 * Fetches all necessary data for the Data Asset Monitoring page.
 * @param timeRange Optional time range for risk trend data.
 * @param rankingLimits Optional object specifying limits for different rankings (uses API keys like 'riskResource').
 */
export const getDataAssetMonitoringPageData = async (
    timeRange: TimeRange = 'day',
    // Default limits use API keys
    rankingLimits: RankingLimits = { riskResource: 5, highRiskUser: 10, storageRisk: 7, protectionLack: 7 } 
): Promise<DataAssetMonitoringPageData> => {
    console.log(`[Service] Fetching Data Asset Monitoring Page Data - TimeRange: ${timeRange}`);

    // Prepare promises for all required data (stats, flow, trend)
    const statsPromise = getDataAssetStats();
    const resourceFlowPromise = getDataAssetResourceFlow();
    const riskTrendPromise = getDataAssetRiskTrend(timeRange);

    // Prepare ranking promises based on limits provided (using API keys)
    const rankingPromises = [];
    const apiRankingTypes: dataAssetApi.RankingType[] = ['riskResource', 'highRiskUser', 'storageRisk', 'protectionLack'];
    
    for (const type of apiRankingTypes) {
        const limit = rankingLimits[type as keyof RankingLimits];
        if (limit !== undefined) {
            rankingPromises.push(
                // Pass the API type to the fetch function
                getDataAssetTopRanking(type, limit).then(data => ({ 
                    apiKey: type, // Keep track of the original API key
                    data 
                }))
            );
        }
    }

    try {
        // Execute all promises concurrently
        const [stats, resourceFlow, riskTrend, ...rankingResults] = await Promise.all([
            statsPromise,
            resourceFlowPromise,
            riskTrendPromise,
            ...rankingPromises
        ]);

        // Structure the ranking results into the topRankings object using page keys
        const topRankings: DataAssetMonitoringPageData['topRankings'] = {};
        for (const result of rankingResults) {
            // Map the API key (e.g., 'riskResource') to the Page key (e.g., 'byRisk')
            const pageKey = rankingTypeToPageKeyMap[result.apiKey];
            if (pageKey) {
                topRankings[pageKey] = result.data;
            }
        }

        // Assemble the final page data object
        const pageData: DataAssetMonitoringPageData = {
            stats,
            resourceFlow,
            riskTrend,
            topRankings // Use the correctly keyed object
        };

        return pageData;

    } catch (error: any) {
        console.error('[Service Error] Failed to get Data Asset Monitoring page data:', error);
        throw new Error(`加载数据资产监控页面数据失败: ${error.message}`);
    }
}; 