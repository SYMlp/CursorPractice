import React from 'react';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import AssetFlowChart from '../components/AssetFlowChart';
import { SecurityIcon } from '../components/icons/AssetIcons';
import {
  assetStatsData,
  assetInteractionRankData,
  riskBusinessRankData,
  loginUserData,
  riskUserRankData,
  industryDistributionData,
  securityDistributionData,
  businessTrendData,
} from '../data/assetData';
import { riskTrendData } from '../data/securityMonitoringData';

interface RankItem {
  id: number;
  name: string;
  value: string;
}

interface LoginUserData {
  categories: string[];
  data: number[];
}

const AssetMonitoring: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* 顶部搜索区域 */}
        <div className="mb-6">
          <div className="flex items-center">
            <div className="text-gray-700 font-medium mr-2">资产监测</div>
            <div className="relative flex-1 max-w-xs">
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                <option value="application">应用资产</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 统计数据卡片 */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="bg-emerald-500 rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="mr-4">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 9h16" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">2,4324</div>
                <div className="text-sm text-white/80">告警数</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="mr-4">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">322</div>
                <div className="text-sm text-white/80">访问者数</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="mr-4">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15v2m0 0v2m0-2h2m-2 0H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 7L12 3L4 7v10l8 4l8-4V7z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">322</div>
                <div className="text-sm text-white/80">应用数</div>
              </div>
            </div>
          </div>
        </div>

        {/* 四个列表区域 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* 数据交互量的应用TOP */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-700">数据交互量的应用TOP</h3>
                <span className="text-xs text-gray-500 ml-2">总计21个</span>
              </div>
              <a href="#" className="text-xs text-blue-500 hover:text-blue-600">更多</a>
            </div>
            <div className="space-y-2">
              {assetInteractionRankData.slice(0, 5).map((item: RankItem, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 探索登录用户TOP */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-700">探索登录用户TOP</h3>
                <span className="text-xs text-gray-500 ml-2">总计21个</span>
              </div>
              <a href="#" className="text-xs text-blue-500 hover:text-blue-600">更多</a>
            </div>
            <div className="space-y-2">
              {loginUserData.categories.slice(0, 5).map((category: string, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">{category}</span>
                  </div>
                  <span className="text-sm text-gray-500">{loginUserData.data[index]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 风险最多业务应用TOP */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-700">风险最多业务应用TOP</h3>
                <span className="text-xs text-gray-500 ml-2">总计21个</span>
              </div>
              <a href="#" className="text-xs text-blue-500 hover:text-blue-600">更多</a>
            </div>
            <div className="space-y-2">
              {riskBusinessRankData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 数据使用风险最多人员TOP */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-700">数据使用风险最多人员TOP</h3>
                <span className="text-xs text-gray-500 ml-2">总计21个</span>
              </div>
              <a href="#" className="text-xs text-blue-500 hover:text-blue-600">更多</a>
            </div>
            <div className="space-y-2">
              {riskUserRankData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMonitoring; 