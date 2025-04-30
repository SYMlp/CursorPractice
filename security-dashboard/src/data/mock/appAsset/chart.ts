import type { 
    TimeRange, 
    TimeSeriesChartData,
    DistributionChartData,
    ChartLineSeriesItem, 
    ChartSeriesDataItem 
} from '../../api';

// ChartId seems specific to the mock logic for selecting which data to generate
export type ChartId = 'businessTrend' | 'alarmType' | 'riskTrend' | 'riskDistribution';

// --- Helper functions (Should NOT be exported) ---

// NOTE: The bodies of these generate functions might still need verification 
// against the original assetMonitoringData.ts file.

const generateRandomData = (length: number, base: number, rangeVal: number): number[] => {
    return Array(length).fill(0).map(() => 
        Math.floor(base + Math.random() * rangeVal)
    );
};

const generateBusinessTrendData = (timeRange: TimeRange): ChartLineSeriesItem[] => {
    let days = 0;
    switch (timeRange) {
        case 'day': days = 24; break;
        case 'week': days = 7; break;
        case 'month': days = 30; break;
    }
    const data = generateRandomData(days, 50, 100);
    // Example adjustment based on potential original logic
    if (timeRange === 'day' && data.length > 0) data[0] = Math.min(data[0], -10); 
    return [{
        name: '业务趋势',
        data: data,
        type: 'line',
        areaStyle: true
    }];
};

const generateAlarmTypeData = (timeRange: TimeRange): ChartSeriesDataItem[] => {
    console.log("Generating mock Alarm Type data for", timeRange);
    // Example: Generate values based on timeRange for slight variation
    const multiplier = timeRange === 'day' ? 1 : (timeRange === 'week' ? 7 : 30);
    return [
        { name: 'SQL注入', value: generateRandomData(1, 5, 10)[0] * multiplier },
        { name: 'XSS攻击', value: generateRandomData(1, 4, 8)[0] * multiplier },
        { name: '暴力破解', value: generateRandomData(1, 3, 6)[0] * multiplier },
        { name: '权限提升', value: generateRandomData(1, 2, 4)[0] * multiplier },
        { name: '其他', value: generateRandomData(1, 1, 3)[0] * multiplier },
    ].sort((a, b) => b.value - a.value); // Sort descending
};

const generateRiskDistributionData = (timeRange: TimeRange): ChartSeriesDataItem[] => {
    console.log("Generating mock Risk Distribution data for", timeRange);
    // Example: Generate values ensuring sum is roughly consistent (e.g., ~100)
    const high = generateRandomData(1, 15, 10)[0];
    const medium = generateRandomData(1, 30, 15)[0];
    const low = 100 - high - medium; // Adjust low to make sum ~100
     return [
        { name: '高风险', value: high, color: '#FF4D4F' }, 
        { name: '中风险', value: medium, color: '#FAAD14' },
        { name: '低风险', value: Math.max(0, low), color: '#52C41A' }, // Ensure low is not negative
    ];
};

// --- Main Exported Function --- 

/**
 * 模拟获取图表数据的函数
 * @param chartId 图表ID
 * @param timeRange 时间范围
 * @returns 模拟的图表数据 (TimeSeries or Distribution)
 */
export const getChartData = async (
    chartId: ChartId, 
    timeRange: TimeRange
): Promise<TimeSeriesChartData | DistributionChartData> => {
    console.log(`[Mock] Getting chart data for ${chartId} with time range ${timeRange}`);
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200)); // Simulate network delay

    // Generate mock data based on chartId and timeRange
    const numPoints = timeRange === 'day' ? 24 : (timeRange === 'week' ? 7 : 30);
    const baseValue = chartId === 'businessTrend' ? 1000 : (chartId === 'alarmType' ? 50 : 20);
    const variation = baseValue * 0.3;

    // Mock Time Series Data (for businessTrend and riskTrend)
    if (chartId === 'businessTrend' || chartId === 'riskTrend') {
        const xAxisData = Array.from({ length: numPoints }, (_, i) => {
            if (timeRange === 'day') return `${i}:00`;
            if (timeRange === 'week') return `Day ${i + 1}`;
            return `Day ${i + 1}`;
        });
        
        let series: ChartLineSeriesItem[];
        if (chartId === 'businessTrend') {
          series = [
            { name: 'App A', data: Array.from({ length: numPoints }, () => Math.floor(baseValue + (Math.random() - 0.5) * 2 * variation)), type: 'line', color: '#5B8FF9', areaStyle: true },
            { name: 'App B', data: Array.from({ length: numPoints }, () => Math.floor(baseValue * 0.8 + (Math.random() - 0.5) * 2 * variation * 0.8)), type: 'line', color: '#5AD8A6', areaStyle: true },
            { name: 'App C', data: Array.from({ length: numPoints }, () => Math.floor(baseValue * 0.6 + (Math.random() - 0.5) * 2 * variation * 0.6)), type: 'line', color: '#F6BD16', areaStyle: true },
          ];
        } else { // riskTrend
           series = [
            { name: 'High Risk', data: Array.from({ length: numPoints }, () => Math.floor(baseValue * 0.5 + (Math.random() - 0.3) * variation)), type: 'line', color: '#FF4D4F' },
            { name: 'Medium Risk', data: Array.from({ length: numPoints }, () => Math.floor(baseValue + (Math.random() - 0.5) * variation)), type: 'line', color: '#FAAD14' },
          ];
        }
        
        return { xAxisData, series };
    }

    // Mock Distribution Data (for alarmType and riskDistribution)
    if (chartId === 'alarmType' || chartId === 'riskDistribution') {
        let data: ChartSeriesDataItem[];
        if (chartId === 'alarmType') {
           data = [
            { name: 'Login Failures', value: Math.floor(baseValue + Math.random() * variation) },
            { name: 'SQL Injection Attempts', value: Math.floor(baseValue * 0.7 + Math.random() * variation * 0.7) },
            { name: 'XSS Attempts', value: Math.floor(baseValue * 0.5 + Math.random() * variation * 0.5) },
            { name: 'Malware Detected', value: Math.floor(baseValue * 0.3 + Math.random() * variation * 0.3) },
            { name: 'Other', value: Math.floor(baseValue * 0.2 + Math.random() * variation * 0.2) },
           ];
        } else { // riskDistribution (Example)
          data = [
             { name: 'High', value: 30 },
             { name: 'Medium', value: 45 },
             { name: 'Low', value: 25 },
          ];
        }
        return data;
    }
    
    // Fallback for unknown chartId
    console.warn(`[Mock] Unknown chartId: ${chartId}. Returning empty data.`);
    return { xAxisData: [], series: [] }; // Or return empty Distribution data based on expectation
};