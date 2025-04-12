import React, { useState } from 'react';
import './App.css';
import CircularProgress from './components/charts/CircularProgress';
import LineChart from './components/charts/LineChart';
import PieChart from './components/charts/PieChart';
import ResourceCard from './components/cards/ResourceCard';
import RuleCard from './components/cards/RuleCard';
import InterfaceCard from './components/cards/InterfaceCard';
import { 
  DatabaseIcon, 
  ShieldIcon, 
  AlertIcon, 
  DocumentIcon, 
  CheckListIcon, 
  LayersIcon, 
  InterfaceIcon 
} from './components/icons/Icons';
import { 
  resourceManagementData, 
  resourceTypesData, 
  securityRulesData, 
  interfaceManagementData,
  timeSeriesData,
  interfaceSecurityDistribution
} from './data/mockData';
import InterfaceMonitoring from './pages/InterfaceMonitoring';
import AssetMonitoring from './pages/AssetMonitoring';
import SecurityMonitoring from './pages/SecurityMonitoring';

function App() {
  const [activePage, setActivePage] = useState<'resources' | 'monitoring' | 'asset' | 'security'>('resources');

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">安全防护大屏</h1>
              </div>
              <div className="ml-6 flex space-x-8">
                <button
                  onClick={() => setActivePage('resources')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activePage === 'resources'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  平台资源
                </button>
                <button
                  onClick={() => setActivePage('monitoring')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activePage === 'monitoring'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  防护检测
                </button>
                <button
                  onClick={() => setActivePage('asset')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activePage === 'asset'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  资产监测
                </button>
                <button
                  onClick={() => setActivePage('security')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activePage === 'security'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  数据资产防护
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 内容区域 */}
      {activePage === 'resources' && <ResourceDashboard />}
      {activePage === 'monitoring' && <InterfaceMonitoring />}
      {activePage === 'asset' && <AssetMonitoring />}
      {activePage === 'security' && <SecurityMonitoring />}
    </div>
  );
}

// 资源管理大屏组件
const ResourceDashboard: React.FC = () => {
  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          {/* 资源管理 */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-medium mb-2 text-gray-700">资源管理</h2>
            <ResourceCard 
              icon={<DatabaseIcon />}
              title="资源总量"
              count={resourceManagementData.count}
              metrics={resourceManagementData.metrics}
              growthItems={resourceManagementData.growthItems}
            />
          </div>
          
          {/* 资源类型 */}
          <div className="md:col-span-5">
            <h2 className="text-lg font-medium mb-2 text-gray-700">资源类型</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {resourceTypesData.map((item, index) => (
                <CircularProgress 
                  key={index}
                  percentage={item.percentage}
                  title={item.title}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* 安全规则 */}
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2 text-gray-700">安全规则</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {securityRulesData.map((rule, index) => (
              <RuleCard 
                key={index}
                icon={
                  index === 0 ? <ShieldIcon color={rule.color} /> :
                  index === 1 ? <AlertIcon color={rule.color} /> :
                  index === 2 ? <DocumentIcon color={rule.color} /> :
                  index === 3 ? <CheckListIcon color={rule.color} /> :
                  <LayersIcon color={rule.color} />
                }
                title={rule.title}
                count={rule.count}
                baseCount={rule.baseCount}
                todayCount={rule.todayCount}
                color={rule.color}
              />
            ))}
          </div>
        </div>
        
        {/* 接口管理 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-1">
            <h2 className="text-lg font-medium mb-2 text-gray-700">接口管理</h2>
            <div className="grid grid-cols-1 gap-4">
              <InterfaceCard 
                icon={<InterfaceIcon />}
                title="接口数总量"
                count={interfaceManagementData.count}
                securityRate={interfaceManagementData.securityRate}
                details={interfaceManagementData.details}
              />
              <PieChart 
                data={interfaceSecurityDistribution}
                showPercentage={true}
              />
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium text-gray-700">面向接口数据量</h2>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <button className="hover:text-blue-500">一天</button>
                    <button className="text-blue-500">一周</button>
                  </div>
                </div>
                <LineChart 
                  title=""
                  xAxisData={timeSeriesData.xAxisData}
                  series={timeSeriesData.series.interfaceData}
                  showLegend={true}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium text-gray-700">识别服务接口数据量</h2>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <button className="hover:text-blue-500">一天</button>
                    <button className="text-blue-500">一周</button>
                  </div>
                </div>
                <LineChart 
                  title=""
                  xAxisData={timeSeriesData.xAxisData}
                  series={timeSeriesData.series.identificationData}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* 服务数据量 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-700">防护服务数据量</h2>
              <div className="flex space-x-4 text-sm text-gray-500">
                <button className="hover:text-blue-500">一天</button>
                <button className="text-blue-500">一周</button>
              </div>
            </div>
            <LineChart 
              title=""
              xAxisData={timeSeriesData.xAxisData}
              series={timeSeriesData.series.protectionData}
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-700">检测服务接口数据量</h2>
              <div className="flex space-x-4 text-sm text-gray-500">
                <button className="hover:text-blue-500">一天</button>
                <button className="text-blue-500">一周</button>
              </div>
            </div>
            <LineChart 
              title=""
              xAxisData={timeSeriesData.xAxisData}
              series={timeSeriesData.series.detectionData}
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-700">响应服务接口数据量</h2>
              <div className="flex space-x-4 text-sm text-gray-500">
                <button className="hover:text-blue-500">一天</button>
                <button className="text-blue-500">一周</button>
              </div>
            </div>
            <LineChart 
              title=""
              xAxisData={timeSeriesData.xAxisData}
              series={timeSeriesData.series.responseData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
