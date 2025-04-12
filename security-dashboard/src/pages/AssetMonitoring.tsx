import React from 'react';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import { SecurityIcon, FilterIcon, SearchIcon } from '../components/icons/AssetIcons';
import {
  assetStatsData,
  assetInteractionRankData,
  riskBusinessRankData,
  loginUserData,
  riskUserRankData,
  industryDistributionData,
  securityDistributionData,
  businessTrendData
} from '../data/assetData';

const AssetMonitoring: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* 顶部导航标签 */}
        <div className="mb-4 border-b border-gray-200">
          <div className="flex space-x-6">
            <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium">
              主页监控
            </button>
            <button className="px-4 py-2 text-gray-500 font-medium">
              资产统计图表
            </button>
            <button className="px-4 py-2 text-gray-500 font-medium">
              业务资产关系图
            </button>
          </div>
        </div>
        
        {/* 顶部搜索和筛选区域 */}
        <div className="mb-6">
          <div className="flex items-center">
            <div className="text-gray-700 font-medium mr-2">资产监测</div>
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="搜索资产..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <SearchIcon size={18} />
              </div>
            </div>
            <button className="ml-2 flex items-center px-3 py-2 bg-white rounded-lg border border-gray-300 text-gray-700 text-sm">
              <FilterIcon size={16} className="mr-2" />
              筛选资产
            </button>
          </div>
        </div>

        {/* 统计数据卡片 */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-800">2.4324</div>
            <div className="text-sm text-gray-500 mt-2">总资产数</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-800">322</div>
            <div className="text-sm text-gray-500 mt-2">应用资产</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-800">322</div>
            <div className="text-sm text-gray-500 mt-2">安全资产</div>
          </div>
        </div>

        {/* 中间描述文字 */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <p className="text-gray-700">
            展示一段说明词，检讨应用的关系图，包含访问者（用户）通过什么IP访问业务应用（应用名称），每一个小区域，展示实时告警信息（实时活动）》包含访问词、被访问应用、风险类型，点击可跳转到告警详情信息
          </p>
        </div>

        {/* 第一行卡片 */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {/* 左侧：数据交互量应用TOP */}
          <div className="col-span-1 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">数据交互量应用TOP</h3>
              <div className="flex items-center text-xs text-gray-500">
                <span>总计21个</span>
                <button className="ml-2 hover:text-blue-500">更多</button>
              </div>
            </div>
            <div className="space-y-2">
              {assetInteractionRankData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2">
                    {item.id}
                  </div>
                  <div className="flex-1">{item.name}</div>
                  <div className="text-right text-gray-500 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 中间：风险最多业务应用TOP */}
          <div className="col-span-1 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">风险最多业务应用TOP</h3>
              <div className="flex items-center text-xs text-gray-500">
                <span>总计21个</span>
                <button className="ml-2 hover:text-blue-500">更多</button>
              </div>
            </div>
            <div className="space-y-2">
              {riskBusinessRankData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2">
                    {item.id}
                  </div>
                  <div className="flex-1">{item.name}</div>
                  <div className="text-right text-gray-500 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 中间：探索登录用户TOP */}
          <div className="col-span-2 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">探索登录用户TOP</h3>
              <div className="flex items-center text-xs text-gray-500">
                <span>总计21个</span>
                <button className="ml-2 hover:text-blue-500">更多</button>
              </div>
            </div>
            <div className="h-[200px]">
              <BarChart
                data={{
                  categories: loginUserData.categories,
                  series: [{
                    name: '登录次数',
                    data: loginUserData.data
                  }]
                }}
              />
            </div>
          </div>

          {/* 右侧：数据使用风险最多人员TOP */}
          <div className="col-span-1 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">数据使用风险最多人员TOP</h3>
              <div className="flex items-center text-xs text-gray-500">
                <span>总计21个</span>
                <button className="ml-2 hover:text-blue-500">更多</button>
              </div>
            </div>
            <div className="space-y-2">
              {riskUserRankData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2">
                    {item.id}
                  </div>
                  <div className="flex-1">{item.name}</div>
                  <div className="text-right text-gray-500 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部图表区域 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* 左侧：业务行业分布 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">业务行业分布</h3>
            </div>
            <div className="h-64 flex justify-center items-center">
              <PieChart
                data={industryDistributionData}
                showPercentage={true}
              />
            </div>
          </div>

          {/* 右侧：告警类型分布 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">告警类型分布</h3>
            </div>
            <div className="h-64 flex justify-center items-center">
              <PieChart
                data={securityDistributionData}
                showPercentage={true}
              />
            </div>
          </div>
        </div>

        {/* 业务态势历史趋势 */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">业务态势历史趋势</h3>
            </div>
            <div className="h-[240px]">
              <LineChart
                title=""
                xAxisData={businessTrendData.xAxis}
                series={[
                  {
                    name: '业务态势',
                    data: businessTrendData.data,
                    color: '#3B82F6',
                    areaStyle: true
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMonitoring; 