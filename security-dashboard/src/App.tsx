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
  InterfaceIcon,
  KeyIcon
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
import PlatformOverview from './pages/PlatformOverview';
import PasswordRules from './pages/PasswordRules';
import PasswordRuleDemo from './pages/PasswordRuleDemo';

// 导入安全图标
import securityLogo from './assets/icons/security-logo.png';

function App() {
  const [activePage, setActivePage] = useState<'resources' | 'monitoring' | 'asset' | 'security' | 'password' | 'passwordDemo' | 'blank'>('resources');

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 导航栏 - 使用深蓝色背景 */}
      <nav className="bg-blue-800 text-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-12">
            {/* 左侧 Logo 和系统名称 */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img src={securityLogo} alt="安全系统" className="h-6 w-6 mr-2" />
                <h1 className="text-lg font-bold">安全防护系统</h1>
              </div>
            </div>

            {/* 右侧用户信息和帮助入口 */}
            <div className="flex items-center space-x-4">
              <button className="text-white text-sm flex items-center">
                <span>帮助中心</span>
                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="flex items-center text-sm">
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>欢迎您，sunwukongNo1</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 二级导航 */}
      <div className="bg-white shadow-sm mb-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-6 text-sm">
            <button
              onClick={() => setActivePage('resources')}
              className={`py-2 px-3 ${
                activePage === 'resources'
                  ? 'text-blue-700 font-medium border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              平台概览
            </button>
            <button
              onClick={() => setActivePage('monitoring')}
              className={`py-2 px-3 ${
                activePage === 'monitoring'
                  ? 'text-blue-700 font-medium border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              防护检测
            </button>
            <button
              onClick={() => setActivePage('asset')}
              className={`py-2 px-3 ${
                activePage === 'asset'
                  ? 'text-blue-700 font-medium border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              资产监测
            </button>
            <button
              onClick={() => setActivePage('security')}
              className={`py-2 px-3 ${
                activePage === 'security'
                  ? 'text-blue-700 font-medium border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              数据资产防护
            </button>
            <button
              onClick={() => setActivePage('password')}
              className={`py-2 px-3 flex items-center ${
                activePage === 'password'
                  ? 'text-blue-700 font-medium border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <KeyIcon size={14} className="mr-1" /> 密码规则
            </button>
            <button
              onClick={() => setActivePage('passwordDemo')}
              className={`py-2 px-3 ${
                activePage === 'passwordDemo'
                  ? 'text-blue-700 font-medium border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              组件演示
            </button>
            <button
              onClick={() => setActivePage('blank')}
              className={`py-2 px-3 ${
                activePage === 'blank'
                  ? 'text-blue-700 font-medium border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              空白页面
            </button>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      {activePage === 'resources' && <PlatformOverview />}
      {activePage === 'monitoring' && <InterfaceMonitoring />}
      {activePage === 'asset' && <AssetMonitoring />}
      {activePage === 'security' && <SecurityMonitoring />}
      {activePage === 'password' && <PasswordRules />}
      {activePage === 'passwordDemo' && <PasswordRuleDemo />}
    </div>
  );
}

export default App;
