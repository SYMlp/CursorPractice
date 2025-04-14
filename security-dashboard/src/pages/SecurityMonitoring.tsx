import React, { useState } from 'react';
import { DataIcon } from '../components/icons/AssetIcons';
import ResourceFlowChart from '../components/ResourceFlowChart';
import {
  storageRiskResourceData,
  lackProtectionResourceData,
  riskTrendData,
  highRiskUserData
} from '../data/securityMonitoringData';
import LineChart from '../components/charts/LineChart';

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

// 自定义提示组件
const Tooltip: React.FC<{ 
  children: React.ReactNode, 
  content: React.ReactNode,
  visible: boolean,
  position?: 'top' | 'bottom'
}> = ({ children, content, visible, position = 'bottom' }) => {
  return (
    <div className="relative inline-block">
      {children}
      {visible && (
        <div className={`absolute z-10 w-auto min-w-[200px] p-3 bg-gray-800 text-white text-xs rounded shadow-lg left-0 ${
          position === 'top' ? 'bottom-6' : 'top-6'
        }`}>
          {content}
          <div className={`absolute w-3 h-3 bg-gray-800 rotate-45 ${
            position === 'top' ? 'bottom-[-6px]' : '-top-1'
          } left-4 transform`}></div>
        </div>
      )}
    </div>
  );
};

const SecurityMonitoring: React.FC = () => {
  // 存储当前悬浮的项目索引
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);

  // 判断是否应该显示在顶部（针对列表底部的项目）
  const shouldShowOnTop = (index: number) => {
    return index >= 3; // 如果是列表中的第4或第5项，tooltip显示在上方
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">数据资产防护监测</h1>
        
        {/* 统计数据卡片 */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="bg-indigo-500 rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="mr-4">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12h8m-8 3h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">2,4324</div>
                <div className="text-sm text-white/80">数据总量</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-500 rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="mr-4">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">322</div>
                <div className="text-sm text-white/80">数据分类数</div>
              </div>
            </div>
          </div>
          <div className="bg-fuchsia-500 rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="mr-4">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 3v6m0 0l-2-2m2 2l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">8</div>
                <div className="text-sm text-white/80">数据分级数</div>
              </div>
            </div>
          </div>
        </div>

        {/* 顶部区域 - 分为左右两部分 */}
        <div className="grid grid-cols-12 gap-4 mb-6">
          {/* 左上: 数据资产数，数据分类数，数据分级数 */}
          <div className="col-span-8">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <DataIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">数据总量</p>
                    <p className="text-2xl font-bold text-gray-800">1,234,567</p>
                  </div>
                </div>
            </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DataIcon className="w-6 h-6 text-green-500" />
        </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">数据分类数</p>
                    <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <DataIcon className="w-6 h-6 text-purple-500" />
                        </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">数据分级数</p>
                    <p className="text-2xl font-bold text-gray-800">4</p>
            </div>
                </div>
              </div>
                        </div>
            <div className="bg-white rounded-lg shadow mt-8">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-base font-medium text-gray-700">数据资产访问链路图</h3>
              </div>
              <div className="p-2">
                <ResourceFlowChart />
                        </div>
            </div>
          </div>

          {/* 右上: 风险最多业务资源TOP和高风险数据使用人TOP */}
          <div className="col-span-4 grid grid-rows-2 gap-4">
            {/* 风险最多业务资源TOP */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium text-gray-700">风险最多数据资源TOP</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>总计5个</span>
                  <button className="ml-2 text-blue-500 hover:underline">更多</button>
                </div>
              </div>
              
              {/* 水平柱状图 */}
              <div className="space-y-2">
                {storageRiskResourceData.map((item, index) => (
                  <div key={index} className="relative pt-2">
                    <div className="flex items-center justify-between mb-1">
                      <Tooltip 
                        visible={hoveredItemIndex === index}
                        position={shouldShowOnTop(index) ? 'top' : 'bottom'}
                        content={
                          <div>
                            <p className="font-bold text-sm mb-2 whitespace-normal">{item.name}</p>
                            <p className="whitespace-nowrap mb-1">
                              <span className="text-gray-300">访问次数: </span>
                              <span className="font-medium">{item.visits || '0'}</span>
                            </p>
                            <p className="whitespace-nowrap mb-1">
                              <span className="text-gray-300">风险数: </span>
                              <span className="font-medium">{item.riskCount || '0'}</span>
                            </p>
                            <p className="whitespace-nowrap">
                              <span className="text-gray-300">风险类型数: </span>
                              <span className="font-medium">{item.riskTypeCount || '0'}</span>
                            </p>
                      </div>
                        }
                      >
                        <span 
                          className="text-sm cursor-pointer hover:text-blue-600 w-40 truncate block"
                          onMouseEnter={() => setHoveredItemIndex(index)}
                          onMouseLeave={() => setHoveredItemIndex(null)}
                        >
                          {item.name}
                        </span>
                      </Tooltip>
                      <span className="ml-auto text-sm">{item.riskCount || '0'}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(parseInt(item.riskCount || '0') / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 高风险数据使用风险最多人TOP */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium text-gray-700">高敏数据使用风险最多人员TOP</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>总计5个</span>
                  <button className="ml-2 text-blue-500 hover:underline">更多</button>
                </div>
              </div>
              
              {/* 表头 */}
              <div className="flex items-center pb-2 border-b border-gray-200 mb-1 text-xs text-gray-500 font-medium">
                <div className="w-8"></div>
                <div className="w-40 pl-1">姓名</div>
                <div className="flex-1 text-left pl-4">威胁数</div>
              </div>
              
              <div className="space-y-1">
                {highRiskUserData.map((item, index) => (
                  <div key={index} className="flex items-center py-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-2">
                      {item.id}
                    </div>
                    <Tooltip 
                      visible={hoveredItemIndex === index + 100}
                      position={shouldShowOnTop(index) ? 'top' : 'bottom'}
                      content={
                        <div>
                          <p className="font-bold text-sm mb-2 whitespace-normal">{item.name}</p>
                          <p className="whitespace-nowrap mb-1">
                            <span className="text-gray-300">访问量: </span>
                            <span className="font-medium">{item.visits || '未知'}</span>
                          </p>
                          <p className="whitespace-nowrap mb-1">
                            <span className="text-gray-300">风险数: </span>
                            <span className="font-medium">{item.riskCount || '未知'}</span>
                          </p>
                          <p className="whitespace-nowrap">
                            <span className="text-gray-300">涉及敏感资源数: </span>
                            <span className="font-medium">{item.sensitiveResources || '未知'}</span>
                          </p>
                        </div>
                      }
                    >
                      <span 
                        className="text-sm cursor-pointer hover:text-blue-600 w-40 truncate block"
                        onMouseEnter={() => setHoveredItemIndex(index + 100)}
                        onMouseLeave={() => setHoveredItemIndex(null)}
                      >
                        {item.name}
                      </span>
                    </Tooltip>
                    <span className="text-sm text-red-600 font-medium flex-1 text-left pl-4">{item.riskCount || '0'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 底部区域 - 分为左中右三部分 */}
        <div className="grid grid-cols-12 gap-4">
          {/* 左下: 存在存储风险的数据资源TOP */}
          <div className="col-span-3 bg-white rounded-lg shadow p-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-medium text-gray-700 truncate mr-2">存在存储风险的数据资源TOP</h3>
              <div className="flex items-center text-xs text-gray-500 whitespace-nowrap">
                <span>总计5个</span>
                <button className="ml-1 text-blue-500 hover:underline">更多</button>
              </div>
            </div>
            
            {/* 表头 */}
            <div className="flex items-center pb-2 border-b border-gray-200 mb-1 text-xs text-gray-500 font-medium">
              <div className="w-6"></div>
              <div className="w-28 pl-1">资源名称</div>
              <div className="flex-1">风险标签</div>
            </div>
            
            <div className="space-y-1">
              {storageRiskResourceData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center py-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-1">
                    {index + 1}
                  </div>
                  <Tooltip 
                    visible={hoveredItemIndex === index + 200}
                    position={shouldShowOnTop(index) ? 'top' : 'bottom'}
                    content={
                      <div>
                        <p className="font-bold text-sm mb-2 whitespace-normal">{item.name}</p>
                        <p className="whitespace-nowrap mb-1">
                          <span className="text-gray-300">风险类型数量: </span>
                          <span className="font-medium">{Array.isArray(item.risk) ? item.risk.length : 1}</span>
                        </p>
                        <p className="whitespace-nowrap mb-1">
                          <span className="text-gray-300">风险数: </span>
                          <span className="font-medium">{item.riskCount || '未知'}</span>
                        </p>
                        <p className="whitespace-nowrap mb-1">
                          <span className="text-gray-300">访问量: </span>
                          <span className="font-medium">{item.visits || '未知'}</span>
                        </p>
                        <div className="mt-2">
                          <p className="text-gray-300 mb-1">风险标签:</p>
                          <div className="flex flex-wrap gap-1">
                            {Array.isArray(item.risk) ? (
                              item.risk.map((risk, i) => (
                                <span key={i} className="px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                                  {risk}
                                </span>
                              ))
                            ) : (
                              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                                {item.risk}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <span 
                      className="text-xs cursor-pointer hover:text-blue-600 w-28 truncate block"
                      onMouseEnter={() => setHoveredItemIndex(index + 200)}
                      onMouseLeave={() => setHoveredItemIndex(null)}
                    >
                      {item.name}
                    </span>
                  </Tooltip>
                  <div className="flex-1 flex flex-wrap gap-1">
                    {Array.isArray(item.risk) ? (
                      item.risk.slice(0, 2).map((risk, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                          {risk}
                        </span>
                      ))
                    ) : (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                        {item.risk}
                      </span>
                    )}
                    {Array.isArray(item.risk) && item.risk.length > 2 && (
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        +{item.risk.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 中下: 存在防护能力缺失的数据资源TOP */}
          <div className="col-span-3 bg-white rounded-lg shadow p-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-medium text-gray-700 truncate mr-2">存在防护能力缺失的数据资源TOP</h3>
              <div className="flex items-center text-xs text-gray-500 whitespace-nowrap">
                <span>总计5个</span>
                <button className="ml-1 text-blue-500 hover:underline">更多</button>
              </div>
            </div>
            
            {/* 表头 */}
            <div className="flex items-center pb-2 border-b border-gray-200 mb-1 text-xs text-gray-500 font-medium">
              <div className="w-6"></div>
              <div className="w-28 pl-1">资源名称</div>
              <div className="flex-1">防护能力</div>
            </div>
            
            <div className="space-y-1">
              {lackProtectionResourceData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center py-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs mr-1">
                    {index + 1}
                  </div>
                  <Tooltip 
                    visible={hoveredItemIndex === index + 300}
                    position={shouldShowOnTop(index) ? 'top' : 'bottom'}
                    content={
                      <div>
                        <p className="font-bold text-sm mb-2 whitespace-normal">{item.name}</p>
                        <p className="whitespace-nowrap mb-1">
                          <span className="text-gray-300">防护能力: </span>
                          <span className="font-medium">{item.protection}</span>
                        </p>
                      </div>
                    }
                  >
                    <span 
                      className="text-xs cursor-pointer hover:text-blue-600 w-28 truncate block"
                      onMouseEnter={() => setHoveredItemIndex(index + 300)}
                      onMouseLeave={() => setHoveredItemIndex(null)}
                    >
                      {item.name}
                    </span>
                  </Tooltip>
                  <div className="flex-1 flex flex-wrap gap-1">
                    {item.protection.split(',').slice(0, 2).map((cap, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                        {cap.trim()}
                      </span>
                    ))}
                    {item.protection.split(',').length > 2 && (
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        +{item.protection.split(',').length - 2}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 右下: 最常发生的风险类型趋势 */}
          <div className="col-span-6 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">最常发生的风险类型趋势</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs text-gray-600">数据泄露风险</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-gray-600">越权访问风险</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span className="text-xs text-gray-600">敏感数据滥用</span>
                </div>
              </div>
            </div>
            <div className="h-[240px]">
              <LineChart
                title=""
                xAxisData={riskTrendData.xAxis}
                series={riskTrendData.series}
                height={240}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityMonitoring; 