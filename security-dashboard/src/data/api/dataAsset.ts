/**
 * API Layer - Data Asset Monitoring Related APIs
 * Implemented based on refactoring_plan.md and mock data structure.
 */
import { ApiResponse, TimeRange } from './commonTypes';
import * as dataAssetMock from '../mock/dataAsset';

// --- Type Definitions (Inferring from Mock or Defining Placeholders) ---

// Assuming structure from mock/dataAsset/stats.ts
export type DataAssetStatsData = typeof dataAssetMock.statsData;

// Assuming structure from mock/dataAsset/riskTrend.ts
export type DataAssetRiskTrendData = typeof dataAssetMock.riskTrendData;

// Define explicit types for Resource Flow instead of inferring from empty mock
export interface ResourceFlowNode {
    id: string;
    name: string;
    // Add other potential properties based on actual data structure
    type?: string; 
}
export interface ResourceFlowEdge {
    source: string;
    target: string;
    // Add other potential properties
    label?: string;
}
// Update ResourceFlowData to use the explicit types
export interface ResourceFlowData {
    nodes: ResourceFlowNode[];
    edges: ResourceFlowEdge[];
}
// Ensure the old inferred type is removed or commented out
// export type ResourceFlowData = typeof dataAssetMock.resourceFlowData; 

// Assuming structure from mock/dataAsset/topRanking.ts
// Update RankingType to match actual mock/service usage
export type RankingType = 'riskResource' | 'highRiskUser' | 'storageRisk' | 'protectionLack'; 
export interface RankingItem {
    name: string;
    value: number | string; // Or more specific type
    // ... other properties like trend, id, etc.
    // Add properties from mock data if needed for components
    id?: number;
    visits?: string;
    risks?: string;
    sensitiveResources?: string;
    riskCount?: string;
    risk?: string[];
    riskTypeCount?: string;
    protection?: string;
}
// Use RankingItem[] as the specific type now
export type DataAssetTopRankingData = RankingItem[]; 


// --- Environment Variable ---
// const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true'; // 移除 USE_MOCK 检查逻辑

// --- API Functions ---

/**
 * API: Get Data Asset Statistics
 */
export const getDataAssetStatsApi = async (): Promise<ApiResponse<DataAssetStatsData>> => {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    console.warn('Real API call for getDataAssetStatsApi not implemented yet.');
    // TODO: Implement real API call
    return { success: false, code: 501, message: 'Real API not implemented', data: null as any };
};

/**
 * API: Get Data Asset Resource Flow
 */
export const getDataAssetResourceFlowApi = async (): Promise<ApiResponse<ResourceFlowData>> => {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    console.warn('Real API call for getDataAssetResourceFlowApi not implemented yet.');
    // TODO: Implement real API call
    const emptyData: ResourceFlowData = { nodes: [], edges: [] };
    return { success: false, code: 501, message: 'Real API not implemented', data: emptyData };
};

/**
 * API: Get Data Asset Top Rankings
 * @param rankingType Type of ranking (e.g., 'riskResource', 'highRiskUser')
 * @param limit Number of items to return
 */
export const getDataAssetTopRankingApi = async (
  rankingType: RankingType, // Uses the updated type
  limit: number = 5 // Default limit
): Promise<ApiResponse<DataAssetTopRankingData>> => {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    console.warn('Real API call for getDataAssetTopRankingApi not implemented yet.');
    // TODO: Implement real API call
    const emptyData: DataAssetTopRankingData = [];
    return { success: false, code: 501, message: 'Real API not implemented', data: emptyData };
};

/**
 * API: Get Data Asset Risk Trend
 * @param timeRange Time range ('day', 'week', 'month')
 */
export const getDataAssetRiskTrendApi = async (
  timeRange: TimeRange = 'day' // Default time range
): Promise<ApiResponse<DataAssetRiskTrendData>> => {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    console.warn('Real API call for getDataAssetRiskTrendApi not implemented yet.');
    // TODO: Implement real API call
    const emptyData: DataAssetRiskTrendData = { xAxisData: [], series: [] }; // 假设是这种结构
    return { success: false, code: 501, message: 'Real API not implemented', data: emptyData };
};
