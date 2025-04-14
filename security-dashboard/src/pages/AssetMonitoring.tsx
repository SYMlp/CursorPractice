import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, CircularProgress, DonutChart } from '../components/charts';
import AssetFlowChart from '../components/AssetFlowChart';
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
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any>(null);
  
  // 获取图表数据
  useEffect(() => {
    // 模拟获取数据的延迟
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        // 使用从模拟数据中导入的数据生成函数
        const data = generateMockChartData(timeRange);
        console.log('图表数据已加载:', data);
        setChartData(data);
      } catch (error) {
        console.error('加载图表数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, [timeRange]);

  // 调试输出告警类型数据
  useEffect(() => {
    if (chartData && chartData.series) {
      console.log('告警类型数据:', chartData.series.alarmType);
    }
  }, [chartData]);

  // 输出资产流图数据日志
  useEffect(() => {
    console.log('资产流图数据:', assetFlowChartData.nodes.length, '节点,', assetFlowChartData.edges.length, '连线');
    console.log('节点示例:', assetFlowChartData.nodes[0]);
    console.log('连线示例:', assetFlowChartData.edges[0]);
  }, []);

  // 处理时间范围变化
  const handleTimeRangeChange = (range: TimeRange, chartId: ChartId) => {
    setTimeRange(range);
  };

  // 处理图表点击
  const handleChartClick = (params: any) => {
    console.log('Chart clicked:', params);
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
          <div className="col-span-3">
            {/* 数据交互量应用TOP */}
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-medium text-gray-700">数据交互量应用TOP</h3>
                <span className="text-xs text-gray-500">共计21个 <a href="#" className="text-blue-500 hover:text-blue-600">更多</a></span>
              </div>
              <div className="space-y-2">
                {applicationInteractionRankData.slice(0, 5).map((item, index) => (
                  <div key={index} className="group hover:bg-gray-50 p-1 rounded-md transition-colors">
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center">
                        <span className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-xs mr-2">
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-gray-500 font-medium">{item.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full group-hover:bg-blue-600 transition-all" 
                        style={{ width: `${item.value / 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 频繁登录用户TOP */}
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-medium text-gray-700">频繁登录用户TOP</h3>
                <span className="text-xs text-gray-500">共计21个 <a href="#" className="text-blue-500 hover:text-blue-600">更多</a></span>
              </div>
              <div className="space-y-2">
                {loginUserData.slice(0, 5).map((item, index) => (
                  <div key={index} className="group hover:bg-gray-50 p-1 rounded-md transition-colors">
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center">
                        <span className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-xs mr-2">
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-gray-500 font-medium">{item.loginCount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full group-hover:bg-blue-600 transition-all" 
                        style={{ width: `${item.loginCount / 1.5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

            {/* 关系图 */}
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-medium text-gray-700">资产访问关系图</h3>
                <button className="text-xs text-blue-500 hover:text-blue-600 transition-colors">
                  查看全部
                </button>
              </div>
              <div className="h-[400px]">
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
          <div className="col-span-3">
            {/* 风险最多业务应用TOP */}
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-medium text-gray-700">风险最多业务应用TOP</h3>
                <span className="text-xs text-gray-500">共计21个 <a href="#" className="text-blue-500 hover:text-blue-600">更多</a></span>
              </div>
              <div className="space-y-2">
                {riskBusinessRankData.slice(0, 5).map((item, index) => (
                  <div key={index} className="group hover:bg-gray-50 p-1 rounded-md transition-colors">
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center">
                        <span className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-xs mr-2">
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-gray-500 font-medium">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full group-hover:bg-blue-600 transition-all" 
                        style={{ width: `${item.value / 70 * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 数据使用风险最多人员TOP */}
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-medium text-gray-700">数据使用风险最多人员TOP</h3>
                <span className="text-xs text-gray-500">共计21个 <a href="#" className="text-blue-500 hover:text-blue-600">更多</a></span>
              </div>
              <div className="space-y-2">
                {riskUserRankData.slice(0, 5).map((item, index) => (
                  <div key={index} className="group hover:bg-gray-50 p-1 rounded-md transition-colors">
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center">
                        <span className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-xs mr-2">
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-gray-500 font-medium">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full group-hover:bg-blue-600 transition-all" 
                        style={{ width: `${item.value / 50 * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 下部分内容 */}
        <div className="grid grid-cols-12 gap-4">
          {/* 左侧 - 业务应用访问趋势 */}
          <div className="col-span-8 bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">业务应用访问趋势</h3>
              <TimeRangeSelector 
                currentRange={timeRange} 
                onChange={(range) => handleTimeRangeChange(range, 'businessTrend')} 
              />
            </div>
            <div className="h-[240px]">
              {isLoading ? <LoadingState /> : (
                <LineChart
                  title=""
                  xAxisData={chartData?.xAxisData || []}
                  series={chartData?.series.business || []}
                  showLegend={false}
                  height="100%"
                />
              )}
            </div>
          </div>

          {/* 右侧 - 告警类型分布 */}
          <div className="col-span-4 bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-medium text-gray-700">告警类型分布</h3>
              <TimeRangeSelector 
                currentRange={timeRange} 
                onChange={(range) => handleTimeRangeChange(range, 'alarmType')} 
              />
            </div>
            <div className="h-[240px] flex items-center justify-center">
              {isLoading ? (
                <LoadingState />
              ) : (
                <DonutChart
                  data={
                    chartData && 
                    chartData.series && 
                    Array.isArray(chartData.series.alarmType) && 
                    chartData.series.alarmType.length > 0 ? 
                    chartData.series.alarmType.map((item: any, index: number) => ({
                      ...item,
                      name: item.name || `类型${index + 1}`,
                      value: typeof item.value === 'number' ? item.value : 0,
                      itemStyle: {
                        color: [
                          '#F5222D', // 红色 - 严重
                          '#FA541C', // 橙红色 - 高危
                          '#FA8C16', // 橙色 - 中危
                          '#FAAD14', // 黄色 - 低危
                          '#13C2C2', // 青色 - 信息
                          '#1890FF', // 蓝色 - 一般
                          '#722ED1'  // 紫色 - 其他
                        ][index % 7]
                      },
                      // 添加自定义提示信息
                      tooltip: {
                        formatter: `<div>
                          <strong>${item.name || `类型${index + 1}`}</strong><br/>
                          <span>数量: ${item.value}</span><br/>
                          ${item.description ? `<span>${item.description}</span>` : ''}
                        </div>`
                      }
                    })) : 
                    generateAlarmTypeData(timeRange).map((item: any, index: number) => ({
                      ...item,
                      itemStyle: {
                        color: [
                          '#F5222D', // 红色 - 严重
                          '#FA541C', // 橙红色 - 高危
                          '#FA8C16', // 橙色 - 中危
                          '#FAAD14', // 黄色 - 低危
                          '#13C2C2', // 青色 - 信息
                          '#1890FF', // 蓝色 - 一般
                          '#722ED1'  // 紫色 - 其他
                        ][index % 7]
                      },
                      tooltip: {
                        formatter: `<div>
                          <strong>${item.name || `类型${index + 1}`}</strong><br/>
                          <span>数量: ${item.value}</span><br/>
                          ${item.description ? `<span>${item.description}</span>` : ''}
                        </div>`
                      }
                    }))
                  }
                  height={240}
                  title="告警类型占比"
                  showLegend={true}
                  innerRadius={0.4}
                  outerRadius={0.8}
                  labelPosition="outside"
                  legendPosition="right"
                  showValues={true}
                  valueFormat={(value, percent, name) => `${percent}%`}
                  animation={true}
                  padAngle={0.02}
                  cornerRadius={6}
                  roseType={false}
                  borderWidth={2}
                  borderColor="#fff"
                  onClick={handleChartClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMonitoring; 