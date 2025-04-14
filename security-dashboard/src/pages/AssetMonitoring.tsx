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

        {/* 第一行：两个TOP列表和统计卡片 */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* 数据交互量的应用TOP */}
          <div className="col-span-3 bg-white rounded-lg shadow p-2">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center space-x-1">
                <h3 className="text-xs font-medium text-gray-700 whitespace-nowrap">数据交互量的应用TOP</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">总计21个</span>
              </div>
              <a href="#" className="text-xs text-blue-500 hover:text-blue-600 whitespace-nowrap">更多</a>
            </div>
            <div className="space-y-1">
              {assetInteractionRankData.slice(0, 5).map((item: RankItem, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center min-w-0">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center flex-shrink-0 mr-1">
                      {index + 1}
                    </span>
                    <span className="text-xs text-gray-600 truncate">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1 flex-shrink-0">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 中间统计卡片 */}
          <div className="col-span-6 grid grid-cols-3 gap-4 h-12">
            <div className="bg-[#6366f1] rounded-lg shadow flex items-center px-3">
              <div className="mr-2">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-white">2,4324</div>
                <div className="text-xs text-white/80">告警数</div>
              </div>
            </div>
            <div className="bg-[#a855f7] rounded-lg shadow flex items-center px-3">
              <div className="mr-2">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-white">12</div>
                <div className="text-xs text-white/80">访问者数</div>
              </div>
            </div>
            <div className="bg-[#ec4899] rounded-lg shadow flex items-center px-3">
              <div className="mr-2">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15v2m0 0v2m0-2h2m-2 0H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 7L12 3L4 7v10l8 4l8-4V7z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-white">4</div>
                <div className="text-xs text-white/80">应用数</div>
              </div>
            </div>
          </div>

          {/* 探索登录用户TOP */}
          <div className="col-span-3 bg-white rounded-lg shadow p-2">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center space-x-1">
                <h3 className="text-xs font-medium text-gray-700 whitespace-nowrap">探索登录用户TOP</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">总计21个</span>
              </div>
              <a href="#" className="text-xs text-blue-500 hover:text-blue-600 whitespace-nowrap">更多</a>
            </div>
            <div className="space-y-1">
              {loginUserData.categories.slice(0, 5).map((category: string, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center min-w-0">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center flex-shrink-0 mr-1">
                      {index + 1}
                    </span>
                    <span className="text-xs text-gray-600 truncate">{category}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1 flex-shrink-0">{loginUserData.data[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 第二行：风险列表 */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* 风险最多业务应用TOP */}
          <div className="col-span-3 bg-white rounded-lg shadow p-2">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center space-x-1">
                <h3 className="text-xs font-medium text-gray-700 whitespace-nowrap">风险最多业务应用TOP</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">总计21个</span>
              </div>
              <a href="#" className="text-xs text-blue-500 hover:text-blue-600 whitespace-nowrap">更多</a>
            </div>
            <div className="space-y-1">
              {riskBusinessRankData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center min-w-0">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center flex-shrink-0 mr-1">
                      {index + 1}
                    </span>
                    <span className="text-xs text-gray-600 truncate">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1 flex-shrink-0">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 中间链路图区域 */}
          <div className="col-span-6 bg-white rounded-lg shadow">
            <div className="p-2">
              <div className="h-6 mb-1 flex items-center">
                <svg className="w-4 h-4 text-orange-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-orange-500 font-medium text-xs ml-1">实时告警：</span>
                <span className="text-gray-600 text-[11px]">张三 于2023年9月23日 12:34:56访问【智慧探平台】，风险类型：风险类型1、风险类型2...</span>
                <a href="#" className="text-blue-500 hover:text-blue-600 ml-2 text-[11px] whitespace-nowrap">查看详情 {`>`}</a>
              </div>
              <div className="h-[320px]">
                <AssetFlowChart />
              </div>
            </div>
          </div>

          {/* 数据使用风险最多人员TOP */}
          <div className="col-span-3 bg-white rounded-lg shadow p-2">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center space-x-1">
                <h3 className="text-xs font-medium text-gray-700 whitespace-nowrap">数据使用风险最多人员TOP</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">总计21个</span>
              </div>
              <a href="#" className="text-xs text-blue-500 hover:text-blue-600 whitespace-nowrap">更多</a>
            </div>
            <div className="space-y-1">
              {riskUserRankData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center min-w-0">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center flex-shrink-0 mr-1">
                      {index + 1}
                    </span>
                    <span className="text-xs text-gray-600 truncate">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1 flex-shrink-0">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 业务应用访问量趋势与告警类型分布 */}
        <div className="grid grid-cols-12 gap-4">
          {/* 业务应用访问量趋势 */}
          <div className="col-span-8 bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-medium text-gray-700">业务应用访问量趋势</h3>
            </div>
            <div className="p-4 h-[300px]">
              <LineChart
                title=""
                xAxisData={businessTrendData.xAxis}
                series={[{
                  name: '访问量',
                  data: businessTrendData.data,
                  color: '#3b82f6',
                  areaStyle: true
                }]}
              />
            </div>
          </div>

          {/* 告警类型分布 */}
          <div className="col-span-4 bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-medium text-gray-700">告警类型分布</h3>
            </div>
            <div className="p-4 h-[300px]">
              <PieChart
                data={securityDistributionData}
                showPercentage={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMonitoring; 