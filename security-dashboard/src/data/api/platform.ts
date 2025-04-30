/**
 * API 层 - 平台概览相关接口
 * 根据 refactoring_plan.md 和 mock/README.md 实现
 */
import { ApiResponse, RequestOptions, TimeRange } from './commonTypes';
import * as platformMock from '../mock/platform';

// 从 mock/platform/index.ts 导入导出的 mock 数据和函数
// import {
//   resourceOverviewData,
//   resourceTypesData,
//   securityRulesData, // 注意：mock/README 还有 passwordRulesData，暂不导入，按需添加
//   interfaceOverviewData,
//   // interfaceSecurityDistributionData, // 暂不导入，refactoring_plan 未提及
//   getServiceTimeseriesMock // 模拟时序数据的函数
// } from '../mock/platform';

// --- 类型定义 (基于 Mock 变量推断，后续应根据真实 API 调整) ---
// 使用 typeof 从导入的 mock 变量推断类型，如果 mock 数据本身有类型则更好
export type ResourceOverviewData = typeof platformMock.resourceOverviewData;
export type ResourceTypesData = typeof platformMock.resourceTypesData;
export type SecurityRulesData = typeof platformMock.securityRulesData;
export type InterfaceOverviewData = typeof platformMock.interfaceOverviewData;

// 显式定义 ChartServiceData (与 mock/serviceTimeseries.ts 或 LineChart/BarChart 兼容)
interface ChartSeriesItem { // 可能需要从 commonTypes 或 chart 组件导入
  name: string;
  data: number[];
  color?: string;
  areaStyle?: boolean;
}
export interface ChartServiceData {
  xAxisData: string[]; // ECharts/LineChart 通常用 xAxisData
  series: ChartSeriesItem[];
  // categories?: string[]; // BarChart 可能用 categories 而不是 xAxisData
}

// --- 环境变量 ---
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';
// const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true'; // 移除 USE_MOCK 检查逻辑

// --- API 函数实现 ---

/**
 * 获取平台资源概览数据
 */
export async function getPlatformResourceOverviewApi(options?: RequestOptions): Promise<ApiResponse<ResourceOverviewData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call to fetch resource overview data
    console.warn('getPlatformResourceOverviewApi - Real API call not implemented');
    // Example: const response = await fetch(`${API_BASE_URL}/platform/resource/overview`, options);
    // if (!response.ok) throw new Error(...); const data = await response.json(); return data;
    // 需要适配真实 API 返回的 ApiResponse 结构
    return { code: 501, data: null as any, message: 'Real API not implemented', success: false };
}

/**
 * 获取平台资源类型数据
 */
export async function getPlatformResourceTypesApi(options?: RequestOptions): Promise<ApiResponse<ResourceTypesData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
    console.warn('getPlatformResourceTypesApi - Real API call not implemented');
    return { code: 501, data: null as any, message: 'Real API not implemented', success: false };
}

/**
 * 获取平台安全规则数据
 */
export async function getPlatformSecurityRulesApi(options?: RequestOptions): Promise<ApiResponse<SecurityRulesData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
    console.warn('getPlatformSecurityRulesApi - Real API call not implemented');
    return { code: 501, data: null as any, message: 'Real API not implemented', success: false };
}

/**
 * 获取平台接口概览数据
 */
export async function getPlatformInterfaceOverviewApi(options?: RequestOptions): Promise<ApiResponse<InterfaceOverviewData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
    console.warn('getPlatformInterfaceOverviewApi - Real API call not implemented');
    return { code: 501, data: null as any, message: 'Real API not implemented', success: false };
}

/**
 * 获取平台服务时序图表数据
 * @param serviceId 服务/图表标识符
 * @param timeRange 时间范围 ('day', 'week', 'month')
 */
export async function getPlatformServiceTimeSeriesApi(
  serviceId: string,
  timeRange: TimeRange,
  options?: RequestOptions
): Promise<ApiResponse<ChartServiceData>> {
  // if (USE_MOCK) { ... } // 移除 Mock 逻辑
  // else { ... }
    // TODO: Implement real API call
    console.warn(`getPlatformServiceTimeSeriesApi - Real API call not implemented for ${serviceId}`);
    const emptyData: ChartServiceData = { xAxisData: [], series: [] };
    return { code: 501, data: emptyData, message: 'Real API not implemented', success: false };
} 