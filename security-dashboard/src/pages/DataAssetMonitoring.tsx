import React from 'react';
import ResourceFlowChart from '../components/charts/ResourceFlowChart';
import LineChart from '../components/charts/LineChart';
import { RiskTag, CapabilityTag, CustomTooltip } from '../components/tags/index';
import { 
  assetStats, 
  riskResourceData, 
  highRiskUserData, 
  storageRiskResourceData, 
  lackProtectionResourceData,
  riskTrendData
} from '../data/securityMonitoringData';

/**
 * 数据资产监测页面
 * 
 * 此页面监控和展示数据资产的安全防护情况，包括风险资源监控、防护能力评估等。
 * 
 * 主要区域：
 * - 上部分：
 *   - 左侧：访问关系图及数据资源数、数据分类数、数据分级数统计
 *   - 右侧：上下布局
 *     - 上：风险最多数据资源TOP
 *     - 下：高敏数据使用风险最多人员TOP
 * - 下部分：
 *   - 左侧：左右布局
 *     - 左：存在存储风险的数据资源TOP
 *     - 右：存在防护能力缺失的数据资源TOP
 *   - 右侧：最常发生的风险类型趋势
 * 
 * 更新记录：
 * - 2024-07-18: 根据UI设计图优化页面布局，调整为上下分区，改善视觉效果和信息结构
 * - 2024-06-18: 规范文件名为 DataAssetMonitoring.tsx（原 SecurityMonitoring.tsx）
 * - 2024-06-16: 优化数据资产防护监测大屏，添加ResourceFlowChart组件，创建标签组件目录和相关组件
 */
const DataAssetMonitoring: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-2xl font-bold mb-4">数据资产防护监测</div>
        
        {/* 上部分内容 - 左右布局 */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* 左侧 - 访问关系图及数据统计 */}
          <div className="col-span-8 space-y-4">
            {/* 数据统计卡片 */}
            <div className="grid grid-cols-3 gap-4">
              {assetStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-gray-200 rounded-lg shadow p-4 flex flex-col"
                >
                  <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
            
            {/* 资源访问关系图 */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-2">
                <div className="flex flex-col h-full">
                  {/* 说明信息区域 */}
                  <div className="h-6 mb-1 flex items-center">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-blue-500 font-medium text-xs ml-1">资源链路：</span>
                    <span className="text-gray-600 text-[11px]">
                      该展示选择的时间内的各资源访问关系图，包含访问链路，链条涉及用户、任务、应用、服务、数据，链条区分有风险、没有风险信息，资源悬浮展示资源名称、访问次数、风险数
                    </span>
                  </div>
                  
                  {/* 资源流程图 */}
                  <div className="h-[350px]">
                    <ResourceFlowChart />
                  </div>
                  
                  {/* 图例说明 */}
                  <div className="flex justify-between text-xs mt-1 px-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                      <span>极高风险</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                      <span>高风险</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                      <span>中等风险</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-600 mr-1"></div>
                      <span>低风险</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                      <span>协作关系</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右侧 - 风险资源TOP和高风险人员TOP */}
          <div className="col-span-4 space-y-4">
            {/* 风险最多数据资源TOP */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
                <div className="text-sm font-medium flex items-center">
                  <span>风险最多数据资源TOP</span>
                  <span className="text-xs text-gray-500 ml-2">总计21个</span>
                </div>
                <a href="#" className="text-xs text-blue-500 hover:text-blue-600">更多</a>
              </div>
              <div className="p-3">
                {riskResourceData.slice(0, 5).map((row, index) => (
                  <div key={row.id} className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="text-xs">{row.name}</span>
                      </div>
                      <span className="text-xs">{row.risks}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (parseInt(row.risks) / parseInt(riskResourceData[0].risks)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 高风险数据使用风险最多人TOP */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
                <div className="text-sm font-medium flex items-center">
                  <span>高敏数据使用风险最多人员TOP</span>
                  <span className="text-xs text-gray-500 ml-2">总计21个</span>
                </div>
                <a href="#" className="text-xs text-blue-500 hover:text-blue-600">更多</a>
              </div>
              <div className="p-2 max-h-[260px] overflow-y-auto">
                {highRiskUserData.slice(0, 5).map((row, index) => (
                  <div key={row.id} className="mb-2 p-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                          {index + 1}
                        </span>
                        <span className="text-sm">{row.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{row.riskCount}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>敏感资源: {row.sensitiveResources}</span>
                      <span>访问量: {row.visits}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 下部分内容 - 左右布局 */}
        <div className="grid grid-cols-12 gap-4">
          {/* 左侧 - 存储风险和防护能力缺失的TOP榜单 */}
          <div className="col-span-6 grid grid-cols-2 gap-4">
            {/* 存在存储风险的数据资源TOP */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
                <div className="text-sm font-medium flex items-center">
                  <span>存在存储风险的数据资源TOP</span>
                  <span className="text-xs text-gray-500 ml-2">总计21个</span>
                </div>
                <a href="#" className="text-xs text-blue-500 hover:text-blue-600">更多</a>
              </div>
              <div className="p-2 max-h-[250px] overflow-y-auto">
                {storageRiskResourceData.slice(0, 5).map((row, index) => (
                  <div key={row.id} className="mb-2 p-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                          {index + 1}
                        </span>
                        <CustomTooltip title={row.name}>
                          <span className="text-sm font-medium truncate max-w-[170px] block">{row.name}</span>
                        </CustomTooltip>
                      </div>
                      <span className="text-xs text-gray-500">风险{row.riskCount}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {row.risk.map((risk, idx) => (
                        <RiskTag key={idx} text={risk} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 存在防护能力缺失的数据资源TOP */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
                <div className="text-sm font-medium flex items-center">
                  <span>存在防护能力缺失的数据资源TOP</span>
                  <span className="text-xs text-gray-500 ml-2">总计21个</span>
                </div>
                <a href="#" className="text-xs text-blue-500 hover:text-blue-600">更多</a>
              </div>
              <div className="p-2 max-h-[250px] overflow-y-auto">
                {lackProtectionResourceData.slice(0, 5).map((row, index) => (
                  <div key={row.id} className="mb-2 p-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                          {index + 1}
                        </span>
                        <CustomTooltip title={row.name}>
                          <span className="text-sm font-medium truncate max-w-[170px] block">{row.name}</span>
                        </CustomTooltip>
                      </div>
                      <span className="text-xs text-gray-500">访问量{row.visits}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {row.protection.split(', ').map((capability, idx) => (
                        <CapabilityTag key={idx} text={capability} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 右侧 - 风险类型趋势图 */}
          <div className="col-span-6 bg-white rounded-lg shadow p-4">
            <div className="border-b border-gray-200 pb-2 mb-4">
              <div className="text-base font-medium">最常发生的风险类型趋势</div>
            </div>
            <div className="h-[250px]">
              <LineChart
                title=""
                xAxisData={riskTrendData.xAxis}
                series={riskTrendData.series}
                showLegend={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAssetMonitoring; 