import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, CircularProgress, DonutChart, TopRankingCard, EnhancedDonutChart } from '../components/charts';
import { RankingItem } from '../components/charts/TopRankingCard';
import AssetFlowChart from '../components/networks/AssetFlowChart';
import { SecurityIcon, AlertIcon, UserIcon, ApplicationIcon, LoadingIcon } from '../components/icons/AssetIcons';
import {
  assetStatsData,
  applicationInteractionRankData,
  riskBusinessRankData,
  riskUserRankData,
  securityDistributionData,
  industryDistributionData,
  monitoringMetricsData,
  loginUserData,
  assetFlowChartData,
  getChartData,
  generateAlarmTypeData,
  TimeRange,
  ChartId
} from '../data/mock/asset';
import { riskTrendData } from '../data/securityMonitoringData';

// 引入新的排名数据
import {
  dashboardRankingData
} from '../data/mock/topRankingData';

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

// 生成综合图表数据的函数，结合所有需要的图表数据
const generateMockChartData = (timeRange: TimeRange) => {
  // 获取业务趋势数据
  const businessTrendData = getChartData('businessTrend', timeRange);
  // 获取告警类型数据
  const alarmTypeData = getChartData('alarmType', timeRange);
  // 获取风险分布数据
  const riskDistributionData = getChartData('riskDistribution', timeRange);

  // 确保返回的数据结构有效
  return {
    xAxisData: businessTrendData && 'xAxis' in businessTrendData ? businessTrendData.xAxis : [],
    series: {
      business: businessTrendData && 'series' in businessTrendData ? businessTrendData.series : [],
      alarmType: alarmTypeData || [],
      riskDistribution: riskDistributionData && 'series' in riskDistributionData ? riskDistributionData.series : []
    }
  };
};

const AssetMonitoring: React.FC = () => {
  // 状态管理
  const [businessTrendTimeRange, setBusinessTrendTimeRange] = useState<TimeRange>('day');
  const [alarmTypeTimeRange, setAlarmTypeTimeRange] = useState<TimeRange>('day');
  const [businessTrendLoading, setBusinessTrendLoading] = useState<boolean>(false);
  const [alarmTypeLoading, setAlarmTypeLoading] = useState<boolean>(false);
  const [businessTrendData, setBusinessTrendData] = useState<any>(null);
  const [alarmTypeData, setAlarmTypeData] = useState<any>(null);
  
  // 获取业务趋势数据
  useEffect(() => {
    // 模拟获取数据的延迟
    setBusinessTrendLoading(true);
    
    setTimeout(() => {
      try {
        // 获取业务趋势数据
        const data = getChartData('businessTrend', businessTrendTimeRange);
        console.log('业务趋势数据已加载:', data);
        setBusinessTrendData(data);
      } catch (error) {
        console.error('加载业务趋势数据失败:', error);
      } finally {
        setBusinessTrendLoading(false);
      }
    }, 500);
  }, [businessTrendTimeRange]);

  // 获取告警类型数据
  useEffect(() => {
    setAlarmTypeLoading(true);
    
    setTimeout(() => {
      try {
        // 获取告警类型数据
        const data = getChartData('alarmType', alarmTypeTimeRange);
        console.log('告警类型数据已加载:', data);
        setAlarmTypeData(data);
      } catch (error) {
        console.error('加载告警类型数据失败:', error);
      } finally {
        setAlarmTypeLoading(false);
      }
    }, 500);
  }, [alarmTypeTimeRange]);

  // 调试输出告警类型数据
  useEffect(() => {
    if (alarmTypeData) {
      console.log('告警类型数据:', alarmTypeData);
    }
  }, [alarmTypeData]);

  // 输出资产流图数据日志
  useEffect(() => {
    console.log('资产流图数据:', assetFlowChartData.nodes.length, '节点,', assetFlowChartData.edges.length, '连线');
    console.log('节点示例:', assetFlowChartData.nodes[0]);
    console.log('连线示例:', assetFlowChartData.edges[0]);
  }, []);

  // 处理业务趋势时间范围变化
  const handleBusinessTrendTimeRangeChange = (range: TimeRange) => {
    setBusinessTrendTimeRange(range);
  };

  // 处理告警类型时间范围变化
  const handleAlarmTypeTimeRangeChange = (range: TimeRange) => {
    setAlarmTypeTimeRange(range);
  };

  // 处理图表点击
  const handleChartClick = (params: any) => {
    console.log('Chart clicked:', params);
  };

  // 处理TOP项点击
  const handleTopItemClick = (item: RankingItem) => {
    console.log('Top item clicked:', item);
    // 这里可以添加点击单个项的处理逻辑
  };

  // 时间范围切换按钮组
  const TimeRangeSelector = ({ 
    currentRange, 
    onChange 
  }: { 
    currentRange: TimeRange; 
    onChange: (range: TimeRange) => void;
  }) => (
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

  // 加载状态组件
  const LoadingState = () => (
    <div className="flex items-center justify-center h-full">
      <LoadingIcon size={24} className="animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题区域 */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">应用资产监控</h1>
          <div className="text-sm text-gray-500">
            最后更新: {new Date().toLocaleString()}
          </div>
        </div>

        {/* 上部分内容 */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* 左侧列 - 数据交互量应用TOP和频繁登录用户TOP */}
          <div className="col-span-3 grid grid-rows-2 gap-4">
            {/* 数据交互量应用TOP - 使用进度条表格样式 */}
            <TopRankingCard
              title="数据交互量应用TOP"
              data={dashboardRankingData.applicationInteraction}
              maxItems={5}
              chartType="progress-bar"
              valueLabel="交互量"
              onClick={handleTopItemClick}
              fitContainer={true}
            />

            {/* 频繁登录用户TOP - 使用柱状图样式 */}
            <TopRankingCard
              title="频繁登录用户TOP"
              data={dashboardRankingData.frequentLoginUser}
              maxItems={5}
              chartType="bar"
              valueLabel="登录次数"
              onClick={handleTopItemClick}
              fitContainer={true}
            />
          </div>
          
          {/* 中间列 - 关键指标统计和关系图 */}
          <div className="col-span-6">
            {/* 关键监控指标统计卡片 */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {monitoringMetricsData.slice(0, 3).map((metric, index) => (
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

            {/* 关系图 - 让关系图占满剩余空间 */}
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow h-[calc(100%-6.5rem)]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-medium text-gray-700">资产访问关系图</h3>
                <button className="text-xs text-blue-500 hover:text-blue-600 transition-colors">
                  查看全部
                </button>
              </div>
              <div className="h-[calc(100%-3.5rem)]">
                <AssetFlowChart 
                  nodes={assetFlowChartData.nodes}
                  edges={assetFlowChartData.edges}
                />
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">
                展示一段时间内，被访问应用的关系图，包含访问者（用户）通过什么IP访问业务应用（应用名称），留一个小区域，展示实时告警信息（实时滚动）、包含访问者、被访问应用、风险类型，点击可跳转到告警详情信息
              </div>
            </div>
          </div>
          
          {/* 右侧列 - 风险最多业务应用TOP和数据使用风险最多人员TOP */}
          <div className="col-span-3 grid grid-rows-2 gap-4">
            {/* 风险最多业务应用TOP - 使用水平条形图样式 */}
            <TopRankingCard
              title="风险最多业务应用TOP"
              data={dashboardRankingData.riskBusiness}
              maxItems={5}
              chartType="horizontal-bar"
              valueLabel="风险数"
              onClick={handleTopItemClick}
              fitContainer={true}
            />

            {/* 数据使用风险最多人员TOP - 使用表格样式 */}
            <TopRankingCard
              title="数据使用风险最多人员TOP"
              data={dashboardRankingData.riskUser}
              maxItems={5}
              chartType="table"
              valueLabel="风险数"
              onClick={handleTopItemClick}
              fitContainer={true}
            />
          </div>
        </div>

        {/* 下部分内容 */}
        <div className="grid grid-cols-12 gap-4" style={{ height: '320px' }}>
          {/* 左侧 - 业务应用访问趋势 */}
          <div className="col-span-8 h-full">
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">业务应用访问趋势</h3>
              <TimeRangeSelector 
                  currentRange={businessTrendTimeRange} 
                  onChange={handleBusinessTrendTimeRangeChange} 
              />
            </div>
              <div className="flex-grow">
                {businessTrendLoading ? <LoadingState /> : (
                <LineChart
                  title=""
                    xAxisData={businessTrendData?.xAxis || []}
                    series={businessTrendData?.series || []}
                  showLegend={false}
                  height="100%"
                />
              )}
              </div>
            </div>
          </div>

          {/* 右侧 - 告警类型分布 */}
          <div className="col-span-4 h-full">
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-medium text-gray-700">告警类型分布</h3>
              <TimeRangeSelector 
                  currentRange={alarmTypeTimeRange} 
                  onChange={handleAlarmTypeTimeRangeChange} 
              />
            </div>
              <div className="flex-grow">
                {alarmTypeLoading ? <LoadingState /> : (
                  <EnhancedDonutChart
                    data={alarmTypeData || dashboardRankingData.alarmTypeDistribution.map(item => ({
                      name: item.name,
                      value: item.value,
                      color: item.color
                    }))}
                    title=""
                    centerText="告警事件数"
                    legendPosition="outside"
                    fitContainer={true}
                    normalizeData={true}
                  onClick={handleChartClick}
                />
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMonitoring; 