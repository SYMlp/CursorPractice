import React, { useState, useEffect, useCallback } from 'react';
import { AreaChart, DonutChart, Card, Title, Text, Grid, Col, Select, SelectItem, Icon } from '@tremor/react';
import { LoadingIcon, ImageIcon, ShieldIcon, InterfaceIcon } from '../components/icons';
// import { GrowthIndicator } from '../components/Indicators'; // Module not found, commented out
// import { TimeSeriesCard } from '../components/TimeSeriesCard'; // Module not found, commented out
import ResourceCard from '../components/cards/ResourceCard';
import RuleCard from '../components/cards/RuleCard';
import InterfaceCard from '../components/cards/InterfaceCard';
// import { ResourceTypeChart } from '../components/charts/ResourceTypeChart'; // Module not found, commented out
import { LineChart, BarChart, CircularProgress } from '../components/charts';
import { getInterfaceTimeSeriesApi } from '../data/api/interface';
import identityIcon from '../assets/icons/platform/identity.png';
import standardIcon from '../assets/icons/platform/standard.png';
import resourceIcon from '../assets/icons/platform/resource.png';
// 规则图标
import identifyRuleIcon from '../assets/icons/rules/identify.png';
import protectionRuleIcon from '../assets/icons/rules/protection.png';
import detectRuleIcon from '../assets/icons/rules/detect.png';
import responseRuleIcon from '../assets/icons/rules/response.png';
// 导入 Service 函数和类型
import {
  getPlatformOverviewPageData,
  PlatformOverviewPageData,
  TimeRange,
} from '../data/services/platformService';

// 添加图表ID类型定义
type ChartId = 'south' | 'identify' | 'protection' | 'detection' | 'response';

// 为 resourceTypesData 定义类型 (基于 mock/platform/resourceTypes.ts)
interface ResourceTypeItem {
  title: string;
  percentage: number;
  color: string;
}

// 为 securityRulesData 定义类型 (基于 mock/platform/securityRules.ts)
interface SecurityRuleItem {
  title: string;
  count: number;
  baseCount: number;
  todayCount: number;
  color: string;
}

/**
 * 平台概览页面
 * 
 * 此页面是安全防护系统的核心大屏，展示整个平台的总体运行状况和关键安全指标，包括：
 * - 资源管理：平台资源总量及增长趋势分析
 * - 资源类型：不同类型资源的占比分布情况
 * - 安全规则：各类安全防护规则的数量统计和当日新增情况
 * - 接口管理：系统接口总量和安全分布情况
 * - 服务数据量：各类服务接口的时间序列数据分析
 *   包括南向接口、识别服务、防护服务、检测服务和响应服务
 * 
 * 更新记录：
 * - 2024-06-04: 优化页面布局和交互体验，添加加载状态，增强图表展示效果
 * - 2024-06-03: 调整页面布局与其他大屏页面保持一致
 * - 2024-06-02: 优化内边距和间距，使布局更加紧凑
 * - 2024-06-01: 全面美化UI和交互，优化卡片样式，增强视觉层次感
 * - 2024-05-01: 统一文件名和组件名为PlatformOverview，完善注释和交互功能
 * - 2024-04-13: 优化平台概览页布局，更接近设计图，添加卡片边框和调整网格布局
 * - 2023-12-18: 优化页面布局，使其更加紧凑；修复内容溢出问题；启用图片图标
 * - 2023-11-28: 将ResourceMonitoring重命名为PlatformOverview
 */
const PlatformOverview: React.FC = () => {
  // 添加状态管理
  const [pageData, setPageData] = useState<PlatformOverviewPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // 时间范围状态管理保持不变，因为聚合函数会根据这个来获取数据
  const [timeRanges, setTimeRanges] = useState<Record<string, TimeRange>>({
    serviceCalls: 'day',
    failedCalls: 'day',
    responseTime: 'day'
  });
  const [isLoading, setIsLoading] = useState<Record<ChartId, boolean>>({
    south: false,
    identify: false,
    protection: false,
    detection: false,
    response: false
  });
  const [activeChart, setActiveChart] = useState<ChartId | null>(null);
  
  // 使用 useEffect 获取数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 传递给聚合函数的 timeRangeMap 的 key 需要与 Service 中处理的一致
        // service 定义的 key 是 timeSeriesData，内部处理了不同的 serviceId
        // 页面中使用 serviceCalls, failedCalls 等作为 map key
        // 这里假设 service 的 getPlatformOverviewPageData 期望的 map key 与页面状态一致
        const data = await getPlatformOverviewPageData(timeRanges); 
        setPageData(data);
      } catch (err: any) {
        console.error("Error fetching platform overview data:", err);
        setError(err.message || '获取平台概览数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // 当 timeRanges 变化时重新获取数据
  }, [timeRanges]); 

  // 创建带有图标的指标数据
  // const metricsWithIcons = [ ... ]; // 如果这个也依赖旧数据，需要适配或移除
  const adaptedGrowthItems = pageData?.resourceOverview.growthItems.map(item => ({
    label: item.label,
    value: item.value,
    isUp: item.isUp
  }));
  
  // 处理 metrics 的 undefined 和 icon 问题 (假设 ResourceCard 需要 icon)
  const adaptedMetrics = (pageData?.resourceOverview.metrics || []).map((metric, index) => ({
    ...metric,
    // 尝试从某个地方获取图标，如果 resourceOverview.metrics 不包含 icon
    // 这里用一个占位符，实际需要根据逻辑填充
    icon: index === 0 ? <ImageIcon src={identityIcon} width={20} height={20} /> : 
          index === 1 ? <ImageIcon src={standardIcon} width={20} height={20} /> : 
          <ShieldIcon size={20} /> 
  }));

  // 规则图标映射
  const ruleIcons = [
    identifyRuleIcon,
    protectionRuleIcon,
    detectRuleIcon,
    responseRuleIcon,
    identifyRuleIcon
  ];

  // 更新资源类型数据，添加卡片标题
  const resourceTypeLabels = ['核心资产', '对外资产', '内部资产', '云上资产', 'API'];
  
  // 处理时间范围切换
  const handleTimeRangeChange = useCallback((chartId: string, value: TimeRange) => {
    setTimeRanges(prev => ({ ...prev, [chartId]: value }));
  }, []);

  // 处理图表点击
  const handleChartClick = (chartId: ChartId) => {
    setActiveChart(activeChart === chartId ? null : chartId);
  };

  // 时间范围切换按钮组
  const TimeRangeSelector: React.FC<{ 
    chartId: string; 
    currentRange: TimeRange; 
    onChange: (range: TimeRange) => void; 
  }> = ({ chartId, currentRange, onChange }) => {
    const timeOptions = [
      { value: 'day', label: '今日' },
      { value: 'week', label: '本周' },
      { value: 'month', label: '本月' },
    ];
    return (
      <select 
        value={currentRange}
        onChange={(e) => onChange(e.target.value as TimeRange)}
        className="text-xs p-1 border rounded bg-gray-50"
      >
        {timeOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  };

  // 加载状态组件
  const LoadingState = () => (
    <div className="flex items-center justify-center h-full">
      <LoadingIcon size={24} className="animate-spin text-blue-500" />
    </div>
  );

  // 添加加载和错误状态处理
  if (loading) {
    return <div className="p-4 text-center">正在加载平台概览数据...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">加载数据出错: {error}</div>;
  }

  if (!pageData) {
    return <div className="p-4 text-center">没有可显示的平台概览数据。</div>;
  }

  // 从 pageData 解构数据，简化 JSX 访问
  const { 
    resourceOverview,
    resourceTypes,
    securityRules,
    interfaceOverview,
    timeSeriesData
  } = pageData;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题区域 */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">平台概览</h1>
          <div className="text-sm text-gray-500">
            最后更新: {new Date().toLocaleString()}
          </div>
        </div>
        
        {/* 资源管理区域 */}
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <ResourceCard 
              icon={<ImageIcon src={resourceIcon} width={32} height={32} />}
              title="资源管理"
              count={resourceOverview.count}
              metrics={adaptedMetrics}
              growthItems={adaptedGrowthItems}
            />
          </div>
        
          {/* 资源类型统计卡片 */}
          <div className="col-span-2 bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <h3 className="text-base font-medium text-gray-700 mb-4">资源类型分布</h3>
            <div className="grid grid-cols-5 gap-4">
              {resourceTypes.map((item: ResourceTypeItem, index: number) => (
                <CircularProgress 
                  key={index}
                  percentage={item.percentage}
                  title={item.title}
                  color={item.color}
                  layout="vertical"
                  size="medium"
                  description="占比"
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* 安全规则区域 */}
        <div className="mb-4">
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">安全规则</h3>
              <button className="text-xs text-blue-500 hover:text-blue-600 transition-colors">
                查看全部
              </button>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {securityRules.map((rule: SecurityRuleItem, index: number) => (
                <div key={index} className="hover:scale-105 transition-transform p-3 border rounded bg-gray-50 text-center">
                  <img src={ruleIcons[index]} alt={rule.title} className="w-7 h-7 mx-auto mb-1" />
                  <p className="text-sm font-medium truncate">{rule.title}</p>
                  <p className="text-lg font-bold" style={{ color: rule.color }}>{rule.count}</p>
                  <p className="text-xs text-gray-500">今日新增: {rule.todayCount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 接口管理和各类接口数据量区域 */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* 接口管理 */}
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col h-[320px] hover:shadow-xl transition-shadow">
            <h3 className="text-base font-medium text-gray-700 mb-4">接口管理</h3>
            <div className="flex-1 flex flex-col overflow-auto">
              <InterfaceCard 
                icon={<InterfaceIcon size={32} />}
                title="接口数总量"
                count={interfaceOverview.count}
                securityRate={interfaceOverview.securityRate}
                publishRate={interfaceOverview.publishRate}
                callbackRate={interfaceOverview.callbackRate}
                metrics={interfaceOverview.metrics}
                publishedInterfaces={interfaceOverview.publishedInterfaces}
              />
            </div>
          </div>
          
          {/* 南向接口数据量 */}
          <div 
            className={`bg-white rounded-lg shadow-lg p-4 flex flex-col h-[320px] hover:shadow-xl transition-shadow ${
              activeChart === 'south' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleChartClick('south')}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">南向接口数据量</h3>
              <TimeRangeSelector 
                chartId="serviceCalls"
                currentRange={timeRanges.serviceCalls} 
                onChange={(range) => handleTimeRangeChange('serviceCalls', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.south ? <LoadingState /> : (
                timeSeriesData.serviceCalls?.xAxisData && timeSeriesData.serviceCalls?.series ? (
                  <LineChart 
                    title=""
                    xAxisData={timeSeriesData.serviceCalls.xAxisData}
                    series={timeSeriesData.serviceCalls.series}
                    showLegend={true}
                    height="100%"
                  />
                ) : <div className="text-center text-gray-500 text-sm">无南向接口数据</div>
              )}
            </div>
          </div>
          
          {/* 识别服务接口数据量 */}
          <div 
            className={`bg-white rounded-lg shadow-lg p-4 flex flex-col h-[320px] hover:shadow-xl transition-shadow ${
              activeChart === 'identify' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleChartClick('identify')}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">识别服务接口数据量</h3>
              <TimeRangeSelector 
                chartId="failedCalls"
                currentRange={timeRanges.failedCalls} 
                onChange={(range) => handleTimeRangeChange('failedCalls', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.identify ? <LoadingState /> : (
                timeSeriesData.failedCalls?.xAxisData && timeSeriesData.failedCalls?.series ? (
                  <BarChart 
                    data={{
                      categories: timeSeriesData.failedCalls.xAxisData,
                      series: timeSeriesData.failedCalls.series
                    }}
                    showLegend={false}
                  />
                ) : <div className="text-center text-gray-500 text-sm">无识别服务数据</div>
              )}
            </div>
          </div>
        </div>
        
        {/* 第二行 - 各类服务数据量区域 */}
        <div className="grid grid-cols-3 gap-4">
          {/* 防护服务数据量 */}
          <div 
            className={`bg-white rounded-lg shadow-lg p-4 flex flex-col h-[320px] hover:shadow-xl transition-shadow ${
              activeChart === 'protection' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleChartClick('protection')}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">防护服务数据量</h3>
              <TimeRangeSelector 
                chartId="responseTime"
                currentRange={timeRanges.responseTime} 
                onChange={(range) => handleTimeRangeChange('responseTime', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.protection ? <LoadingState /> : (
                <LineChart 
                  title=""
                  xAxisData={timeSeriesData.responseTime.xAxisData}
                  series={timeSeriesData.responseTime.series}
                  showLegend={true}
                  height="100%"
                />
              )}
            </div>
          </div>
          
          {/* 检测服务接口数据量 */}
          <div 
            className={`bg-white rounded-lg shadow-lg p-4 flex flex-col h-[320px] hover:shadow-xl transition-shadow ${
              activeChart === 'detection' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleChartClick('detection')}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">检测服务接口数据量</h3>
              <TimeRangeSelector 
                chartId="serviceCalls"
                currentRange={timeRanges.serviceCalls} 
                onChange={(range) => handleTimeRangeChange('serviceCalls', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.detection ? <LoadingState /> : (
                timeSeriesData.serviceCalls ? (
                  <LineChart 
                    title=""
                    xAxisData={timeSeriesData.serviceCalls.xAxisData}
                    series={timeSeriesData.serviceCalls.series}
                    height={100}
                  />
                 ) : <div className="text-center text-gray-500 text-sm">无检测服务数据</div>
              )}
            </div>
          </div>
          
          {/* 响应服务接口数据量 */}
          <div 
            className={`bg-white rounded-lg shadow-lg p-4 flex flex-col h-[320px] hover:shadow-xl transition-shadow ${
              activeChart === 'response' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleChartClick('response')}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">响应服务接口数据量</h3>
              <TimeRangeSelector 
                chartId="failedCalls"
                currentRange={timeRanges.failedCalls} 
                onChange={(range) => handleTimeRangeChange('failedCalls', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.response ? <LoadingState /> : (
                timeSeriesData.failedCalls?.xAxisData && timeSeriesData.failedCalls?.series ? (
                  <BarChart 
                    data={{
                      categories: timeSeriesData.failedCalls.xAxisData,
                      series: timeSeriesData.failedCalls.series
                    }}
                    showLegend={false}
                  />
                ) : <div className="text-center text-gray-500 text-sm">无响应服务数据</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview;