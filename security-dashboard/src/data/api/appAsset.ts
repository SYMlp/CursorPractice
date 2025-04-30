/**
 * API Layer - Application Asset Monitoring
 */
import { ApiResponse, TimeRange, RequestOptions } from './commonTypes';

// Corrected mock imports - Use appAsset directory
import * as appAssetMock from '../mock/appAsset'; 
// Temporarily remove imports for uncertain sources
// import * as topRankingMock from '../mock/topRankingData'; 
// import { riskTrendData as mockRiskTrendData } from '../mock/securityMonitoringData'; 

// --- Type Definitions (Cleaned Up - Keep only one set) ---

// Base types that might be generally useful
export interface ChartSeriesDataItem { name: string; value: number; color?: string; }
export interface ChartLineSeriesItem { name: string; data: number[]; type?: string; color?: string; areaStyle?: boolean | object; }
export interface ChartSeriesItem { name: string; data: number[]; color?: string; }
export interface TimeSeriesChartData { xAxisData: string[]; series: ChartSeriesItem[]; }
export interface DonutChartDataItem { name: string; value: number; color?: string; }
export type DistributionChartData = DonutChartDataItem[];

// Types inferred/defined for appAsset
export type AssetStatsData = typeof appAssetMock.assetStatsData;
export type AssetInteractionRankData = typeof appAssetMock.applicationInteractionRankData;
export type RiskBusinessRankData = typeof appAssetMock.riskBusinessRankData;
export type MonitoringMetricsData = typeof appAssetMock.monitoringMetricsData;
export type AssetFlowNode = typeof appAssetMock.assetNodes[number]; 
export type AssetFlowEdge = typeof appAssetMock.assetEdges[number]; 
export interface AssetFlowData { nodes: AssetFlowNode[]; edges: AssetFlowEdge[]; }
export type SecurityDistributionData = DistributionChartData; // Use specific chart type
export type IndustryDistributionData = DistributionChartData; // Use specific chart type
export type RiskUserRankData = typeof appAssetMock.riskUserRankData; // Assuming this exists

// Define missing types with placeholders
export interface FrequentLoginUserItem { name: string; value: number; id?: string | number; }
export type FrequentLoginUserRankData = FrequentLoginUserItem[];
export type RiskTrendData = TimeSeriesChartData; // Alias for existing time series structure

// Specific chart data types used by the page service
export type AlarmTypeData = DistributionChartData;
export type BusinessTrendData = TimeSeriesChartData;

// --- Environment Variable ---
// const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true'; // 移除 USE_MOCK 检查逻辑，此逻辑应在 Service 层

// --- API Functions (Keep Implementations) ---

export async function getAssetStatsApi(options?: RequestOptions): Promise<ApiResponse<AssetStatsData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
    console.warn('getAssetStatsApi - Real API call not implemented');
    // Example: const response = await fetch(`${API_BASE_URL}/asset/stats`, options); ...
    return { code: 501, data: null as any, message: 'Real API not implemented', success: false };
}

export async function getAssetInteractionRankApi(options?: RequestOptions): Promise<ApiResponse<AssetInteractionRankData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
   console.warn('getAssetInteractionRankApi - Real API call not implemented');
   return { code: 501, data: null as any, message: 'Real API not implemented', success: false };
}

export async function getAssetRiskBusinessRankApi(options?: RequestOptions): Promise<ApiResponse<RiskBusinessRankData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
   console.warn('getAssetRiskBusinessRankApi - Real API call not implemented');
   return { code: 501, data: null as any, message: 'Real API not implemented', success: false };
}

export const getAssetChartDataApi = async (chartId: string, timeRange: TimeRange): Promise<ApiResponse<TimeSeriesChartData | DistributionChartData>> => {
    // if (USE_MOCK) { ... } // 移除 Mock 逻辑
    // else { ... }
    // TODO: Implement real API call
    console.warn(`Real API call for getAssetChartDataApi (${chartId}) not implemented.`);
    // 错误/占位符情况下的返回值
    const emptyData: DistributionChartData = []; // 或者根据 chartId 返回合适的空结构
    return { success: false, code: 501, message: 'Real API not implemented', data: emptyData };
};

export async function getAssetMonitoringMetricsApi(options?: RequestOptions): Promise<ApiResponse<MonitoringMetricsData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
  console.warn('getAssetMonitoringMetricsApi - Real API call not implemented');
  return { code: 501, data: null as any, message: 'Real API not implemented', success: false };
}

export async function getAssetFlowDataApi(options?: RequestOptions): Promise<ApiResponse<AssetFlowData>> {
    // if (USE_MOCK) { ... } // 移除 Mock 逻辑
    // else { ... }
        // TODO: Implement real API call
         console.warn('getAssetFlowDataApi - Real API call not implemented');
         const emptyData: AssetFlowData = { nodes: [], edges: [] };
         return { code: 501, data: emptyData, message: 'Real API not implemented', success: false };
}

export async function getSecurityDistributionApi(options?: RequestOptions): Promise<ApiResponse<SecurityDistributionData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
    console.warn('getSecurityDistributionApi - Real API call not implemented');
    const emptyData: SecurityDistributionData = [];
    return { code: 501, data: emptyData, message: 'Real API not implemented', success: false };
}

export async function getIndustryDistributionApi(options?: RequestOptions): Promise<ApiResponse<IndustryDistributionData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
    console.warn('getIndustryDistributionApi - Real API call not implemented');
    const emptyData: IndustryDistributionData = [];
    return { code: 501, data: emptyData, message: 'Real API not implemented', success: false };
}

export async function getRiskUserRankApi(limit?: number): Promise<ApiResponse<RiskUserRankData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
    console.warn('getRiskUserRankApi - Real API call not implemented');
    const emptyData: RiskUserRankData = [];
    return { code: 501, data: emptyData, message: 'Real API not implemented', success: false };
}

// 确保所有 API 函数都遵循这个模式

// Temporarily removed API functions for missing mocks - 如果要保留，也需要移除 Mock 逻辑
// export const getFrequentLoginUserRankApi = async (limit?: number): Promise<ApiResponse<FrequentLoginUserRankData>> => { /* TODO */ return { code: 501, ... }; };
// export const getRiskTrendApi = async (timeRange?: TimeRange): Promise<ApiResponse<RiskTrendData>> => { /* TODO */ return { code: 501, ... }; };

