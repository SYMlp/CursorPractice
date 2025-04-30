import React, { useState, useEffect } from 'react';
import { StatisticCard } from '../components/cards';
import { NetworkTopology } from '../components/networks';
import LineChart from '../components/charts/LineChart';
import { 
  getInterfaceMonitoringPageData,
  InterfaceMonitoringPageData,
  TimeRange
} from '../data/services/interfaceService';

interface MetricItem {
  title: string; 
  value: string; 
  color?: string; 
  icon?: string; 
}

// 定义 LineChart series 兼容的类型 (或者使用 any)
interface CompatibleDataSeries {
  name: string;
  data: number[];
  color?: string;
  areaStyle?: boolean; // 确保 areaStyle 是 boolean 或 undefined
}

const InterfaceMonitoring: React.FC = () => {
  const [pageData, setPageData] = useState<InterfaceMonitoringPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRanges, setTimeRanges] = useState<Record<string, TimeRange>>({
    callVolume: 'day',
    errorRate: 'day' 
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getInterfaceMonitoringPageData(timeRanges);
        setPageData(data);
      } catch (err: any) {
        console.error("Error fetching interface monitoring data:", err);
        setError(err.message || '获取接口监控数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRanges]);

  const handleTimeRangeChange = (chartId: string, value: TimeRange) => {
    setTimeRanges(prev => ({ ...prev, [chartId]: value }));
  };

  if (loading) {
    return <div className="p-4 text-center">正在加载接口监控数据...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">加载数据出错: {error}</div>;
  }

  if (!pageData) {
    return <div className="p-4 text-center">没有可显示的接口监控数据。</div>;
  }

  const { metrics, topology, timeSeriesData } = pageData;

  const TimeRangeSelector: React.FC<{ value: TimeRange; onChange: (range: TimeRange) => void }> = ({ value, onChange }) => {
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => onChange('day')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            value === 'day'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          一天
        </button>
        <button
          onClick={() => onChange('week')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            value === 'week'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          一周
        </button>
      </div>
    );
  };

  // -- 数据转换 for LineChart --
  const transformChartSeries = (series: any[] | undefined): CompatibleDataSeries[] => {
    if (!series) return [];
    return series.map(s => ({
      ...s,
      // 将 areaStyle 转换为 boolean | undefined
      areaStyle: typeof s.areaStyle === 'object' ? true : (typeof s.areaStyle === 'boolean' ? s.areaStyle : undefined)
    }));
  };

  const callVolumeSeries = transformChartSeries(timeSeriesData.callVolume?.series);
  const errorRateSeries = transformChartSeries(timeSeriesData.errorRate?.series);
  // -- 结束数据转换 --

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">接口运行监控</h1>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          {(metrics as MetricItem[]).map((metric, index) => (
            <StatisticCard 
              key={index} 
              label={metric.title} 
              value={metric.value} 
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-lg shadow p-4 h-[400px]">
            <h3 className="text-lg font-semibold mb-2">接口调用拓扑</h3>
            {topology && topology.nodes && topology.edges ? (
              <NetworkTopology nodes={topology.nodes} edges={topology.edges} />
            ) : (
              <div className="text-sm text-gray-500">无拓扑数据</div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4 h-[200px]">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-base font-medium">调用量趋势</h3>
              </div>
              {timeSeriesData.callVolume?.xAxisData && callVolumeSeries.length > 0 ? (
                <LineChart 
                  title="" 
                  xAxisData={timeSeriesData.callVolume.xAxisData} 
                  series={callVolumeSeries} // 使用转换后的 series
                  height="100%" 
                />
              ) : <div className="text-sm text-gray-500">无调用量数据</div>}
            </div>
            <div className="bg-white rounded-lg shadow p-4 h-[200px]">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-base font-medium">错误率趋势 (%)</h3>
              </div>
              {timeSeriesData.errorRate?.xAxisData && errorRateSeries.length > 0 ? (
                <LineChart 
                  title="" 
                  xAxisData={timeSeriesData.errorRate.xAxisData} 
                  series={errorRateSeries} // 使用转换后的 series
                  height="100%" 
                />
              ) : <div className="text-sm text-gray-500">无错误率数据</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceMonitoring; 