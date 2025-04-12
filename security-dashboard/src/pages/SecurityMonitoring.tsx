import React from 'react';
import LineChart from '../components/charts/LineChart';
import { FilterIcon, SearchIcon } from '../components/icons/AssetIcons';
import {
  assetStats,
  riskResourceData,
  highRiskUserData,
  storageRiskResourceData,
  lackProtectionResourceData,
  riskTrendData
} from '../data/securityMonitoringData';

// 风险标签组件
const RiskTag: React.FC<{ text: string, color?: string }> = ({ text, color = 'red' }) => {
  return (
    <span className={`inline-block px-2 py-0.5 text-xs text-white rounded bg-${color}-500`}>
      {text}
    </span>
  );
};

// 能力标签组件
const CapabilityTag: React.FC<{ text: string, color?: string }> = ({ text, color = 'blue' }) => {
  return (
    <span className={`inline-block px-2 py-0.5 text-xs text-white rounded bg-${color}-500 mr-1 mb-1`}>
      {text}
    </span>
  );
};

const SecurityMonitoring: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">数据资产防护监测</h1>
        
        {/* 顶部统计数据卡片 */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {assetStats.map((stat, index) => (
            <div key={index} className="bg-gray-200 rounded-lg shadow p-6">
              <div className="text-4xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 中间说明文字区域 */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <p className="text-gray-700">
            该展示选择时间内的各资源访问关系图，包含访问链路、链条涉及用户、任务、应用、服务、数据，链条区分有风险、没有风险信息，资源链接展示资源名称、访问次数、风险数
          </p>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* 左侧三个区域的网格布局 */}
          <div className="col-span-3 grid grid-rows-2 gap-4">
            {/* 上面一行：存在存储风险的数据资源TOP */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium text-gray-700">存在存储风险的数据资源TOP</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>总计21个</span>
                  <button className="ml-2 text-blue-500 hover:underline">更多</button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500">
                    <th className="pb-2 font-normal">资源名称</th>
                    <th className="pb-2 font-normal">风险</th>
                  </tr>
                </thead>
                <tbody>
                  {storageRiskResourceData.map((item, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="py-2 flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2">
                          {item.id}
                        </div>
                        {item.name}
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <RiskTag text={item.risk} />
                          <button className="ml-auto text-xs text-blue-500 hover:underline">
                            {item.action}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 下面一行：存在防护能力缺失的数据资源TOP */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium text-gray-700">存在防护能力缺失的数据资源TOP</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>总计21个</span>
                  <button className="ml-2 text-blue-500 hover:underline">更多</button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500">
                    <th className="pb-2 font-normal">资源名称</th>
                    <th className="pb-2 font-normal">防护能力</th>
                  </tr>
                </thead>
                <tbody>
                  {lackProtectionResourceData.map((item, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="py-2 flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2">
                          {item.id}
                        </div>
                        {item.name}
                      </td>
                      <td className="py-2">
                        <div className="flex flex-wrap">
                          {item.protection.split(',').map((cap, i) => (
                            <CapabilityTag key={i} text={cap.trim()} color={i % 2 === 0 ? 'blue' : 'cyan'} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 右侧排行榜区域 */}
          <div className="col-span-1 grid grid-rows-2 gap-4">
            {/* 风险最多业务资源TOP */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium text-gray-700">风险最多业务资源TOP</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>总计21个</span>
                  <button className="ml-2 text-blue-500 hover:underline">更多</button>
                </div>
              </div>
              
              {/* 水平柱状图 */}
              <div className="space-y-2">
                {riskResourceData.map((item, index) => (
                  <div key={index} className="relative pt-2">
                    <div className="flex items-center mb-1">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2">
                        {item.id}
                      </div>
                      <span className="text-sm">{item.name}</span>
                      <span className="ml-auto text-sm">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${parseInt(item.value)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 高风险数据使用风险最多人TOP */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium text-gray-700">高数据使用风险最多人TOP</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>总计21个</span>
                  <button className="ml-2 text-blue-500 hover:underline">更多</button>
                </div>
              </div>
              <div className="space-y-2">
                {highRiskUserData.map((item, index) => (
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
        </div>
        
        {/* 底部图表区域 */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">最常发生的风险类型趋势</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span className="text-xs text-gray-600">风险类型1</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs text-gray-600">风险类型2</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                  <span className="text-xs text-gray-600">风险类型3</span>
                </div>
              </div>
            </div>
            <div className="h-[240px]">
              <LineChart
                title=""
                xAxisData={riskTrendData.xAxis}
                series={riskTrendData.series}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityMonitoring; 