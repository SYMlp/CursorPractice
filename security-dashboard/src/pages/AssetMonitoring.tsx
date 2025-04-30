import React, { useState, useEffect } from 'react';
import { LineChart, TopRankingCard, EnhancedDonutChart } from '../components/charts';
import { RankingItem } from '../components/charts/TopRankingCard';
import AssetFlowChart from '../components/networks/AssetFlowChart';
import { AlertIcon, UserIcon, ApplicationIcon, LoadingIcon } from '../components/icons/AssetIcons';

 // 从 Service 层导入 TimeRange (以及其他类型和服务函数)
 import {
  getAppAssetMonitoringPageData,
  AppAssetMonitoringPageData,
  TimeRange // TimeRange 现在从 Service 导入
} from '../data/services/appAssetService';

/**
 * 应用资产监控页面
 * 
 * 此页面展示应用资产的监控数据，包括:
 * - 数据交互量TOP应用与频繁登录用户统计
 * - 关键监控指标统计：告警数、访问者数、应用数
 * - 风险业务应用排名与资产访问关系图
 * - 数据使用风险最多人员排名
 * - 业务应用访问量趋势与告警类型分布
 * 
 * 更新记录:
 * - 2024-07-12: 优化模拟数据管理，将模拟数据迁移到独立目录
 * - 2024-07-10: 使用统一导入方式优化组件引用，使用DonutChart替代PieChart展示告警分布
 * - 2024-07-01: 优化页面布局和交互体验，添加时间范围选择功能和加载状态
 * - 2024-06-30: 统一页面风格，与平台概览页保持一致
 */

const AssetMonitoring: React.FC = () => {
  // State variables
  const [pageData, setPageData] = useState<AppAssetMonitoringPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [businessTrendTimeRange, setBusinessTrendTimeRange] = useState<TimeRange>('day');
  const [riskTrendTimeRange, setRiskTrendTimeRange] = useState<TimeRange>('day');

  // Fetch data using service
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAppAssetMonitoringPageData(
          businessTrendTimeRange, 
          riskTrendTimeRange
        );
        setPageData(data);
        console.log('App Asset Monitoring data loaded:', data);
      } catch (err: any) {
        console.error('Failed to fetch App Asset Monitoring data:', err);
        setError(err.message || '获取应用资产监控数据失败');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [businessTrendTimeRange, riskTrendTimeRange]);

  // Handlers
  const handleBusinessTrendTimeRangeChange = (range: TimeRange) => setBusinessTrendTimeRange(range);
  const handleRiskTrendTimeRangeChange = (range: TimeRange) => setRiskTrendTimeRange(range);
  const handleTopItemClick = (item: RankingItem) => console.log('Top item clicked:', item);

  // TimeRangeSelector component
  const TimeRangeSelector = ({ currentRange, onChange }: { currentRange: TimeRange; onChange: (range: TimeRange) => void; }) => (
    <div className="flex bg-gray-50 rounded-lg p-0.5 text-xs">
      <button 
        className={`px-2 py-1 rounded-md transition-colors ${
          currentRange === 'day' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-blue-600'
        }`}
        onClick={() => onChange('day')}
      >
        一天
      </button>
      <button 
        className={`px-2 py-1 rounded-md transition-colors ${
          currentRange === 'week' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-blue-600'
        }`}
        onClick={() => onChange('week')}
      >
        一周
      </button>
      <button 
        className={`px-2 py-1 rounded-md transition-colors ${
          currentRange === 'month' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-blue-600'
        }`}
        onClick={() => onChange('month')}
      >
        一月
      </button>
    </div>
  );

  // LoadingState component
  const LoadingState = () => (
    <div className="flex items-center justify-center h-full">
      <LoadingIcon size={24} className="animate-spin text-blue-500" />
    </div>
  );

  // Conditional Rendering
  if (loading) return <div className="p-4 text-center"><LoadingState /> 正在加载应用资产监控数据...</div>;
  if (error) return <div className="p-4 text-center text-red-500">加载数据出错: {error}</div>;
  if (!pageData) return <div className="p-4 text-center">没有可显示的应用资产监控数据。</div>;

  // Destructure data from pageData
  const { 
    interactionRank, riskBusinessRank, frequentLoginUserRank, riskUserRank,
    metrics, flowData, securityDistribution, industryDistribution,
    businessTrendData, alarmTypeData, riskTrendData 
  } = pageData;

  // JSX Rendering
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">应用资产监控</h1>
          <div className="text-sm text-gray-500">最后更新: {new Date().toLocaleString()}</div>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* Left Column */}
          <div className="col-span-3 grid grid-rows-2 gap-4">
            <TopRankingCard title="数据交互量应用TOP" data={interactionRank} maxItems={5} chartType="progress-bar" valueLabel="交互量" onClick={handleTopItemClick} fitContainer={true}/>
            <TopRankingCard title="频繁登录用户TOP" data={frequentLoginUserRank.filter(item => item.id !== undefined).map(item => ({ ...item, id: String(item.id) }))} maxItems={5} chartType="bar" valueLabel="登录次数" onClick={handleTopItemClick} fitContainer={true}/>
          </div>
          {/* Middle Column */}
          <div className="col-span-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {metrics.map((metric: { name: string; value: number; icon?: string }, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-2">
                    {metric.icon === 'alert' && <AlertIcon size={20} className="text-red-500 mr-2" />}
                    {metric.icon === 'user' && <UserIcon size={20} className="text-green-500 mr-2" />}
                    {metric.icon === 'application' && <ApplicationIcon size={20} className="text-blue-500 mr-2" />}
                    <h3 className="text-sm font-medium text-gray-700">{metric.name}</h3>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-700">{metric.value.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow h-[calc(100%-80px)] flex flex-col">
              <div className="p-3 flex-grow flex flex-col">
                <h3 className="text-base font-semibold mb-2 flex-none">资产访问关系图</h3>
                <div className="flex-grow min-h-0">
                  {flowData && flowData.nodes && flowData.edges ? (
                    <AssetFlowChart nodes={flowData.nodes} edges={flowData.edges} />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">无资产流图数据</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="col-span-3 grid grid-rows-2 gap-4">
            <TopRankingCard title="风险业务应用TOP" data={riskBusinessRank} maxItems={5} chartType="bar" valueLabel="风险指数" onClick={handleTopItemClick} fitContainer={true}/>
            <TopRankingCard title="数据使用风险最多人员TOP" data={riskUserRank} maxItems={5} chartType="bar" valueLabel="风险评分" onClick={handleTopItemClick} fitContainer={true}/>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="col-span-3 grid grid-rows-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-medium mb-2">安全分布</h3>
              {securityDistribution ? (
                  <EnhancedDonutChart data={securityDistribution} height={120} />
              ) : <LoadingState />}
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-medium mb-2">行业分布</h3>
              {industryDistribution ? (
                  <EnhancedDonutChart data={industryDistribution} height={120} />
              ) : <LoadingState />}
            </div>
          </div>
          {/* Middle Column */}
          <div className="col-span-6 bg-white rounded-lg shadow p-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium">业务应用访问量趋势</h3>
              <TimeRangeSelector currentRange={businessTrendTimeRange} onChange={handleBusinessTrendTimeRangeChange} />
            </div>
            <div className="flex-grow">
              {businessTrendData && businessTrendData.xAxisData && businessTrendData.series ? (
                <LineChart title="" xAxisData={businessTrendData.xAxisData} series={businessTrendData.series} height="100%" showLegend={true} />
              ) : <LoadingState />}
            </div>
          </div>
          {/* Right Column */}
          <div className="col-span-3 grid grid-rows-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-medium mb-2">告警类型分布</h3>
              {alarmTypeData ? (
                  <EnhancedDonutChart data={alarmTypeData} height={120} />
              ) : <LoadingState />}
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium">风险趋势</h3>
                 <TimeRangeSelector currentRange={riskTrendTimeRange} onChange={handleRiskTrendTimeRangeChange} />
              </div>
              <div className="flex-grow">
                {riskTrendData && riskTrendData.xAxisData && riskTrendData.series ? (
                  <LineChart title="" xAxisData={riskTrendData.xAxisData} series={riskTrendData.series} height="100%" />
                ) : <LoadingState />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMonitoring; 