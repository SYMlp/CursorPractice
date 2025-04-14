import React, { useState, useEffect } from 'react';
import CircularProgress from '../components/charts/CircularProgress';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import ResourceCard from '../components/cards/ResourceCard';
import RuleCard from '../components/cards/RuleCard';
import InterfaceCard from '../components/cards/InterfaceCard';
import { 
  DatabaseIcon, 
  ShieldIcon, 
  AlertIcon, 
  DocumentIcon, 
  CheckListIcon, 
  LayersIcon, 
  InterfaceIcon,
  IdentityIcon,
  StandardIcon,
  ImageIcon,
  LoadingIcon
} from '../components/icons';
import { 
  resourceManagementData, 
  resourceTypesData, 
  securityRulesData, 
  interfaceManagementData,
  timeSeriesData,
  interfaceSecurityDistribution
} from '../data/mockData';

// 使用图标映射工具
import { getIcon } from '../utils/iconMapping';

// 直接导入图片图标
import resourceIcon from '../assets/icons/platform/resource.png';
import identityIcon from '../assets/icons/platform/identity.png';
import standardIcon from '../assets/icons/platform/standard.png';

// 规则图标
import identifyRuleIcon from '../assets/icons/rules/identify.png';
import protectionRuleIcon from '../assets/icons/rules/protection.png';
import detectRuleIcon from '../assets/icons/rules/detect.png';
import responseRuleIcon from '../assets/icons/rules/response.png';

// 添加时间范围类型定义
type TimeRange = 'day' | 'week' | 'month';

// 添加图表ID类型定义
type ChartId = 'south' | 'identify' | 'protection' | 'detection' | 'response';

// 添加mock数据生成函数
const generateMockData = (range: TimeRange) => {
  const baseData = {
    day: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    month: ['1日', '5日', '10日', '15日', '20日', '25日', '30日']
  };

  const generateRandomData = (base: number, range: number) => {
    return Array(7).fill(0).map(() => 
      Math.floor(base + Math.random() * range)
    );
  };

  return {
    xAxisData: baseData[range],
    series: {
      interfaceData: [
        {
          name: '授权接口数量',
          data: generateRandomData(2000, 6000),
          color: '#3b82f6'
        },
        {
          name: '敏感资源接口',
          data: generateRandomData(4000, 4000),
          color: '#10b981'
        },
        {
          name: '未知安全接口',
          data: generateRandomData(1000, 3000),
          color: '#f59e0b'
        }
      ],
      identificationData: [
        {
          name: '识别服务',
          data: generateRandomData(2000, 5000),
          color: '#f59e0b',
          areaStyle: true
        }
      ],
      protectionData: [
        {
          name: '防护服务',
          data: generateRandomData(2000, 6000),
          color: '#3b82f6'
        }
      ],
      detectionData: [
        {
          name: '检测服务',
          data: generateRandomData(1000, 5000),
          color: '#f97316',
          areaStyle: true
        }
      ],
      responseData: [
        {
          name: '响应服务',
          data: generateRandomData(2000, 6000),
          color: '#10b981'
        }
      ]
    }
  };
};

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
  // 状态管理
  const [timeRanges, setTimeRanges] = useState<Record<ChartId, TimeRange>>({
    south: 'week',
    identify: 'week',
    protection: 'week',
    detection: 'week',
    response: 'week'
  });
  const [isLoading, setIsLoading] = useState<Record<ChartId, boolean>>({
    south: false,
    identify: false,
    protection: false,
    detection: false,
    response: false
  });
  const [activeChart, setActiveChart] = useState<ChartId | null>(null);
  const [chartData, setChartData] = useState<Record<ChartId, any>>({
    south: generateMockData('week'),
    identify: generateMockData('week'),
    protection: generateMockData('week'),
    detection: generateMockData('week'),
    response: generateMockData('week')
  });
  
  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(prev => ({ ...prev, south: false, identify: false, protection: false, detection: false, response: false }));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 创建带有图标的指标数据
  const metricsWithIcons = [
    {
      ...resourceManagementData.metrics[0],
      icon: <ImageIcon src={identityIcon} width={20} height={20} />
    },
    {
      ...resourceManagementData.metrics[1],
      icon: <ImageIcon src={standardIcon} width={20} height={20} />
    },
    {
      ...resourceManagementData.metrics[2],
      icon: <ShieldIcon size={20} />
    }
  ];

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
  const handleTimeRangeChange = (chartId: ChartId, range: TimeRange) => {
    setTimeRanges(prev => ({ ...prev, [chartId]: range }));
    setIsLoading(prev => ({ ...prev, [chartId]: true }));
    
    // 模拟数据加载
    setTimeout(() => {
      setChartData(prev => ({
        ...prev,
        [chartId]: generateMockData(range)
      }));
      setIsLoading(prev => ({ ...prev, [chartId]: false }));
    }, 500);
  };

  // 处理图表点击
  const handleChartClick = (chartId: ChartId) => {
    setActiveChart(activeChart === chartId ? null : chartId);
  };

  // 时间范围切换按钮组
  const TimeRangeSelector = ({ 
    chartId, 
    currentRange, 
    onChange 
  }: { 
    chartId: ChartId;
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
              count={resourceManagementData.count}
              metrics={metricsWithIcons}
              growthItems={resourceManagementData.growthItems}
            />
          </div>
        
          {/* 资源类型统计卡片 */}
          <div className="col-span-2 bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <h3 className="text-base font-medium text-gray-700 mb-4">资源类型分布</h3>
            <div className="grid grid-cols-5 gap-4">
              {resourceTypesData.map((item, index) => (
                <CircularProgress 
                  key={index}
                  percentage={item.percentage}
                  title={resourceTypeLabels[index] || item.title}
                  color={index === 0 ? '#3b82f6' : 
                         index === 1 ? '#f59e0b' : 
                         index === 2 ? '#10b981' : 
                         index === 3 ? '#8b5cf6' : 
                         '#f97316'}
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
              {securityRulesData.map((rule, index) => (
                <div key={index} className="hover:scale-105 transition-transform">
                  <RuleCard 
                    icon={<ImageIcon src={ruleIcons[index]} width={28} height={28} />}
                    title={rule.title}
                    count={rule.count}
                    baseCount={rule.baseCount}
                    todayCount={rule.todayCount}
                    color={index === 0 ? '#3b82f6' : 
                           index === 1 ? '#ef4444' : 
                           index === 2 ? '#8b5cf6' : 
                           index === 3 ? '#f59e0b' : 
                           '#10b981'}
                  />
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
                count={interfaceManagementData.count}
                securityRate={interfaceManagementData.securityRate}
                publishRate={interfaceManagementData.publishRate}
                callbackRate={interfaceManagementData.callbackRate}
                metrics={interfaceManagementData.metrics}
                publishedInterfaces={interfaceManagementData.publishedInterfaces}
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
                chartId="south"
                currentRange={timeRanges.south} 
                onChange={(range) => handleTimeRangeChange('south', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.south ? <LoadingState /> : (
                <LineChart 
                  title=""
                  xAxisData={chartData.south.xAxisData}
                  series={chartData.south.series.interfaceData}
                  showLegend={true}
                  height="100%"
                />
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
                chartId="identify"
                currentRange={timeRanges.identify} 
                onChange={(range) => handleTimeRangeChange('identify', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.identify ? <LoadingState /> : (
                <LineChart 
                  title=""
                  xAxisData={chartData.identify.xAxisData}
                  series={chartData.identify.series.identificationData}
                  showLegend={false}
                  height="100%"
                />
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
                chartId="protection"
                currentRange={timeRanges.protection} 
                onChange={(range) => handleTimeRangeChange('protection', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.protection ? <LoadingState /> : (
                <LineChart 
                  title=""
                  xAxisData={chartData.protection.xAxisData}
                  series={chartData.protection.series.protectionData}
                  showLegend={false}
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
                chartId="detection"
                currentRange={timeRanges.detection} 
                onChange={(range) => handleTimeRangeChange('detection', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.detection ? <LoadingState /> : (
                <LineChart 
                  title=""
                  xAxisData={chartData.detection.xAxisData}
                  series={chartData.detection.series.detectionData}
                  showLegend={false}
                  height="100%"
                />
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
                chartId="response"
                currentRange={timeRanges.response} 
                onChange={(range) => handleTimeRangeChange('response', range)} 
              />
            </div>
            <div className="flex-1 flex items-center">
              {isLoading.response ? <LoadingState /> : (
                <LineChart 
                  title=""
                  xAxisData={chartData.response.xAxisData}
                  series={chartData.response.series.responseData}
                  showLegend={false}
                  height="100%"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview; 