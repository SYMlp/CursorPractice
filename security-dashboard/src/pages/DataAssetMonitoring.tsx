import React from 'react';
import { ResourceFlowChart, ResourceFlowLegend } from '../components/networks';
import LineChart from '../components/charts/LineChart';
import { RiskTag, CapabilityTag, CustomTooltip } from '../components/tags/index';
import { StatisticCard, RankingCard, TableTopCard } from '../components/cards';
import { 
  assetStats, 
  riskResourceData, 
  highRiskUserData, 
  storageRiskResourceData, 
  lackProtectionResourceData,
  riskTrendData
} from '../data/securityMonitoringData';
import {
  storageRiskResourceTableData,
  protectionLackResourceTableData,
  highRiskUserTableData
} from '../data/tableTopData';
// 导入资源流图的模拟数据
import resourceFlowData from '../data/mock/network/resourceFlowData';

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
 * - 2024-07-25: 新增TableTopCard组件，支持表格式和条形图展示数据，更符合设计图样式
 * - 2024-07-24: 更新TOP排行榜组件，使用实际数据量显示总计数，将"更多"改为按钮并支持弹窗展示完整数据
 * - 2024-07-24: 将节点详情面板集成到ResourceFlowChart组件中，移除冗余代码
 * - 2024-07-23: 提取可复用组件，优化页面布局和交互体验
 * - 2024-07-18: 根据UI设计图优化页面布局，调整为上下分区，改善视觉效果和信息结构
 * - 2024-06-18: 规范文件名为 DataAssetMonitoring.tsx（原 SecurityMonitoring.tsx）
 * - 2024-06-16: 优化数据资产防护监测大屏，添加ResourceFlowChart组件，创建标签组件目录和相关组件
 */
const DataAssetMonitoring: React.FC = () => {
  // 处理节点点击，仅用于日志记录或其他操作，不再管理选中状态
  const handleNodeClick = (node: any) => {
    console.log('Node clicked in parent component:', node);
  };

  // 处理边点击，仅用于日志记录或其他操作，不再管理选中状态
  const handleEdgeClick = (edge: any) => {
    console.log('Edge clicked in parent component:', edge);
  };

  // 处理排行榜项点击
  const handleRankingItemClick = (item: any) => {
    console.log('Ranking item clicked:', item);
  };

  // 获取包含异常连接的数据集，用于展示更丰富的资源访问关系
  const { nodes, edges } = resourceFlowData.withAbnormal;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题区域 */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">数据资产防护监测</h1>
          <div className="text-sm text-gray-500">
            最后更新: {new Date().toLocaleString()}
          </div>
        </div>
        
        {/* 上部分内容 - 左右布局 */}
        <div className="grid grid-cols-12 gap-4 mb-4" style={{ height: '480px' }}>
          {/* 左侧 - 访问关系图及数据统计 */}
          <div className="col-span-8 flex flex-col h-full overflow-hidden">
            <div className="grid grid-cols-3 gap-4 mb-4 flex-none">
              {assetStats.map((stat, index) => (
                <StatisticCard
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  className="bg-gray-50"
                />
              ))}
            </div>
            
            {/* 资源访问关系图 */}
            <div className="bg-white rounded-lg shadow flex-1 flex flex-col overflow-hidden min-h-0">
              <div className="p-2 flex flex-col h-full">
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
                <div className="flex-1 min-h-0">
                  <ResourceFlowChart 
                    initialNodes={nodes}
                    initialEdges={edges}
                    onNodeClick={handleNodeClick}
                    onEdgeClick={handleEdgeClick}
                    showControls={true}
                    fitView={true}
                  />
                </div>
                
                {/* 图例说明 */}
                <ResourceFlowLegend />
              </div>
            </div>
          </div>

          {/* 右侧 - 排行榜区域 */}
          <div className="col-span-4 flex flex-col h-full overflow-hidden">
            {/* 风险最多数据资源TOP */}
            <div className="flex-1 mb-4">
              <TableTopCard
                title="风险最多数据资源TOP"
                data={storageRiskResourceTableData}
                columns={[
                  { key: 'name', title: '资源名称' },
                  { key: 'riskValue', title: '风险', align: 'right' }
                ]}
                progressBarField="riskValue"
                onItemClick={handleRankingItemClick}
                className="h-full"
              />
            </div>
            
            {/* 高风险数据使用风险最多人TOP */}
            <div className="flex-1">
              <TableTopCard
                title="高敏数据使用风险最多人TOP"
                data={highRiskUserTableData}
                columns={[
                  { key: 'name', title: '姓名' },
                  { key: 'threatValue', title: '威胁数', align: 'right' }
                ]}
                progressBarField="threatValue"
                onItemClick={handleRankingItemClick}
                className="h-full"
              />
            </div>
          </div>
        </div>
        
        {/* 下部分内容 - 左右布局 */}
        <div className="grid grid-cols-12 gap-4" style={{ height: '320px' }}>
          {/* 左侧 - 存储风险和防护能力缺失的TOP榜单 */}
          <div className="col-span-6 grid grid-cols-2 gap-4">
            {/* 存在存储风险的数据资源TOP */}
            <TableTopCard
              title="存在存储风险的数据资源TOP"
              data={storageRiskResourceTableData}
              columns={[
                { key: 'name', title: '资源名称' },
                { 
                  key: 'risk', 
                  title: '风险', 
                  render: (value) => (
                    <div>
                      {Array.isArray(value) && value.map((tag, idx) => (
                        <RiskTag key={idx} text={tag} />
                      ))}
                    </div>
                  )
                }
              ]}
              showProgressBar={false}
              onItemClick={handleRankingItemClick}
            />
            
            {/* 存在防护能力缺失的数据资源TOP */}
            <TableTopCard
              title="存在防护能力缺失的数据资源TOP"
              data={protectionLackResourceTableData}
              columns={[
                { key: 'name', title: '资源名称' },
                { 
                  key: 'protection', 
                  title: '防护能力', 
                  render: (value) => (
                    <div>
                      <CapabilityTag text={value} />
                    </div>
                  )
                }
              ]}
              showProgressBar={false}
              onItemClick={handleRankingItemClick}
            />
          </div>
          
          {/* 右侧 - 风险类型趋势图 */}
          <div className="col-span-6 bg-white rounded-lg shadow p-4 flex flex-col h-full">
            <div className="border-b border-gray-200 pb-2 mb-4">
              <div className="text-base font-medium">最常发生的风险类型趋势</div>
            </div>
            <div className="flex-grow">
              <LineChart
                title=""
                xAxisData={riskTrendData.xAxis}
                series={riskTrendData.series}
                showLegend={true}
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAssetMonitoring; 