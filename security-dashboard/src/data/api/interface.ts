/**
 * API 层 - 接口监控相关接口
 * 根据 refactoring_plan.md 和 mock/README.md 实现
 */
import { TimeRange, /* RequestOptions, */ ApiResponse } from './commonTypes'; // Comment out unused RequestOptions
import * as interfaceMock from '../mock/interface';

// 从 mock/interface/index.ts 导入导出的 mock 数据和函数
/* Remove unused mock imports
import {
    metricsData,
    getInterfaceTimeseriesMock,
    // topologyData, // 假设 mock/interface/index.ts 导出了拓扑图数据
    // 需要确认 topologyData 的实际导出名和结构
} from '../mock/interface';
*/

// --- 类型定义 (基于 Mock 或占位符) ---

// 指标数据类型 - 从 mock 推断
export interface InterfaceMetric {
    name: string;
    value: number;
    unit?: string;
    change?: number; // Optional change indicator
}
export type InterfaceMetricsData = typeof interfaceMock.metricsData;

// 拓扑图数据类型 - 占位符，需要根据 NetworkTopology 组件或实际 API 调整
// 常见的拓扑图数据结构包含节点和边
export interface TopologyNode {
    id: string;
    label: string;
    type?: 'service' | 'database' | 'external' | 'unknown'; // Example node types
    status?: 'normal' | 'warning' | 'error';
}
export interface TopologyEdge {
    source: string;
    target: string;
    label?: string; // e.g., protocol or data flow count
    status?: 'normal' | 'warning' | 'error';
}
export interface TopologyData {
    nodes: TopologyNode[];
    edges: TopologyEdge[];
}

// 显式定义 ChartInterfaceData (与 mock/interface/timeseries.ts 或 LineChart 期望一致)
// 需要确认 getInterfaceTimeseriesMock 的实际返回值结构
interface ChartSeriesItem { // 复用或定义通用的 SeriesItem 类型
  name: string;
  data: number[];
  color?: string;
  areaStyle?: boolean | object;
}
export interface ChartInterfaceData {
  xAxisData: string[];
  series: ChartSeriesItem[];
}

// --- 环境变量 ---
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';
// const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true'; // 移除 USE_MOCK 检查逻辑

// --- API 函数实现 ---

/**
 * 获取接口监控指标卡数据
 */
export const getInterfaceMetricsApi = async (/* options?: RequestOptions */): Promise<ApiResponse<InterfaceMetricsData>> => {
    // if (USE_MOCK) { ... } // 移除 Mock 逻辑
    // else { ... }
        console.warn('Real API call for getInterfaceMetricsApi not implemented yet.');
        // TODO: Implement real API call
        const placeholderData: InterfaceMetricsData = [];
        return { success: false, code: 501, message: 'Real API not implemented', data: placeholderData };
};

/**
 * 获取接口监控拓扑图数据
 */
export const getInterfaceTopologyApi = async (/* options?: RequestOptions */): Promise<ApiResponse<TopologyData>> => {
    // if (USE_MOCK) { ... } // 移除 Mock 逻辑
    // else { ... }
        console.warn('Real API call for getInterfaceTopologyApi not implemented yet.');
        // TODO: Implement real API call
        const placeholderTopologyData: TopologyData = { nodes: [], edges: [] };
        return { success: false, code: 501, message: 'Real API not implemented', data: placeholderTopologyData };
};

/**
 * 获取接口监控时序图表数据
 */
export const getInterfaceTimeSeriesApi = async (
    chartType: string,
    timeRange: TimeRange,
    /* options?: RequestOptions */
): Promise<ApiResponse<ChartInterfaceData>> => {
    // if (USE_MOCK) { ... } // 移除 Mock 逻辑
    // else { ... }
        console.warn('Real API call for getInterfaceTimeSeriesApi not implemented yet.');
        // TODO: Implement real API call
        const placeholderData: ChartInterfaceData = { xAxisData: [], series: [] };
        return { success: false, code: 501, message: 'Real API not implemented', data: placeholderData };
}; 