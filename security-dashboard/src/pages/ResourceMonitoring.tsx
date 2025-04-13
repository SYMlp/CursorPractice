import React from 'react';
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
  ImageIcon
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

/**
 * 安全防护系统平台概览页
 * 展示系统整体运行状况和关键指标，包括：
 * - 资源管理：总量及增长趋势
 * - 资源类型：各类资源分布情况
 * - 安全规则：各类安全规则统计
 * - 接口管理：接口总量和安全分布
 * - 服务数据量：各类服务接口的数据量趋势
 *   (南向接口、识别服务、防护服务、检测服务、响应服务)
 */
const PlatformOverview: React.FC = () => {
  // 创建带有图标的指标数据
  const metricsWithIcons = [
    {
      ...resourceManagementData.metrics[0],
      // 使用图片图标
      icon: <ImageIcon src={identityIcon} width={20} height={20} />
    },
    {
      ...resourceManagementData.metrics[1],
      // 使用图片图标
      icon: <ImageIcon src={standardIcon} width={20} height={20} />
    },
    {
      ...resourceManagementData.metrics[2],
      // 使用内置图标
      icon: <ShieldIcon size={20} />
    }
  ];

  // 规则图标映射
  const ruleIcons = [
    identifyRuleIcon,
    protectionRuleIcon, 
    detectRuleIcon,
    responseRuleIcon,
    identifyRuleIcon // 默认使用识别规则图标作为第五个
  ];

  // 更新资源类型数据，添加卡片标题
  const resourceTypeLabels = ['核心资产', '对外资产', '内部资产', '云上资产', 'API'];

  return (
    <div className="p-3 bg-gray-100">
      <div className="max-w-full mx-auto">
        {/* 资源管理和类型区域 */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* 资源管理 */}
          <div className="col-span-3">
            <div className="bg-white border border-gray-200 h-full overflow-hidden">
              <div className="p-6">
                <ResourceCard 
                  icon={<ImageIcon src={resourceIcon} width={32} height={32} />}
                  title="资源管理"
                  count={resourceManagementData.count}
                  metrics={metricsWithIcons}
                  growthItems={resourceManagementData.growthItems}
                />
              </div>
            </div>
          </div>
          
          {/* 资源类型 */}
          <div className="col-span-9">
            <div className="bg-white border border-gray-200 h-full overflow-hidden">
              <div className="border-b border-gray-200 px-4 py-2">
                <h2 className="text-base font-medium text-gray-700">资源类型</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-5 gap-6">
                  {resourceTypesData.map((item, index) => (
                    <CircularProgress 
                      key={index}
                      percentage={item.percentage}
                      title={resourceTypeLabels[index] || item.title}
                      color={item.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 安全规则区域 */}
        <div className="mb-4">
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-2">
              <h2 className="text-base font-medium text-gray-700">安全规则</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-5 gap-4">
                {securityRulesData.map((rule, index) => (
                  <RuleCard 
                    key={index}
                    icon={<ImageIcon src={ruleIcons[index]} width={28} height={28} />}
                    title={rule.title}
                    count={rule.count}
                    baseCount={rule.baseCount}
                    todayCount={rule.todayCount}
                    color={rule.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 接口管理区域 */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-3">
            <div className="bg-white border border-gray-200 h-full overflow-hidden">
              <div className="border-b border-gray-200 px-4 py-2">
                <h2 className="text-base font-medium text-gray-700">接口管理</h2>
              </div>
              <div className="p-4">
                <InterfaceCard 
                  icon={<InterfaceIcon size={32} />}
                  title="接口数总量"
                  count={interfaceManagementData.count}
                  securityRate={interfaceManagementData.securityRate}
                  details={interfaceManagementData.details}
                />
              </div>
            </div>
          </div>
          
          {/* 面向接口和识别服务数据 */}
          <div className="col-span-9">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center border-b border-gray-200 px-4 py-2">
                  <h2 className="text-base font-medium text-gray-700">南向接口数据量</h2>
                  <div className="flex space-x-4 text-xs text-gray-500">
                    <button className="hover:text-blue-500">一天</button>
                    <button className="text-blue-500">一周</button>
                  </div>
                </div>
                <div className="p-4">
                  <LineChart 
                    title=""
                    xAxisData={timeSeriesData.xAxisData}
                    series={timeSeriesData.series.interfaceData}
                    showLegend={true}
                    height={180}
                  />
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center border-b border-gray-200 px-4 py-2">
                  <h2 className="text-base font-medium text-gray-700">识别服务接口数据量</h2>
                  <div className="flex space-x-4 text-xs text-gray-500">
                    <button className="hover:text-blue-500">一天</button>
                    <button className="text-blue-500">一周</button>
                  </div>
                </div>
                <div className="p-4">
                  <LineChart 
                    title=""
                    xAxisData={timeSeriesData.xAxisData}
                    series={timeSeriesData.series.identificationData}
                    height={180}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 各类服务数据量区域 */}
        <div className="grid grid-cols-3 gap-4">
          {/* 防护服务数据量 */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 px-4 py-2">
              <h2 className="text-base font-medium text-gray-700">防护服务数据量</h2>
              <div className="flex space-x-4 text-xs text-gray-500">
                <button className="hover:text-blue-500">一天</button>
                <button className="text-blue-500">一周</button>
              </div>
            </div>
            <div className="p-4">
              <LineChart 
                title=""
                xAxisData={timeSeriesData.xAxisData}
                series={timeSeriesData.series.protectionData}
                height={180}
              />
            </div>
          </div>
          
          {/* 检测服务接口数据量 */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 px-4 py-2">
              <h2 className="text-base font-medium text-gray-700">检测服务接口数据量</h2>
              <div className="flex space-x-4 text-xs text-gray-500">
                <button className="hover:text-blue-500">一天</button>
                <button className="text-blue-500">一周</button>
              </div>
            </div>
            <div className="p-4">
              <LineChart 
                title=""
                xAxisData={timeSeriesData.xAxisData}
                series={timeSeriesData.series.detectionData}
                height={180}
              />
            </div>
          </div>
          
          {/* 响应服务接口数据量 */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 px-4 py-2">
              <h2 className="text-base font-medium text-gray-700">响应服务接口数据量</h2>
              <div className="flex space-x-4 text-xs text-gray-500">
                <button className="hover:text-blue-500">一天</button>
                <button className="text-blue-500">一周</button>
              </div>
            </div>
            <div className="p-4">
              <LineChart 
                title=""
                xAxisData={timeSeriesData.xAxisData}
                series={timeSeriesData.series.responseData}
                height={180}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview; 