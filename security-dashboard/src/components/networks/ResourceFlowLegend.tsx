import React from 'react';

/**
 * 资源流程图图例组件
 * 
 * 展示资源流程图中各类节点和连线的含义说明
 */
const ResourceFlowLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2">
      <div className="flex items-center">
        <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
        <span>资源</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
        <span>服务</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-purple-500 rounded-sm mr-1"></div>
        <span>应用</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-1"></div>
        <span>任务</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-pink-500 rounded-sm mr-1"></div>
        <span>人员</span>
      </div>
      <div className="flex items-center mx-2">|</div>
      <div className="flex items-center">
        <div className="w-6 h-0.5 bg-green-500 mr-1"></div>
        <span>低风险</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-0.5 bg-yellow-500 mr-1"></div>
        <span>中风险</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-0.5 bg-orange-500 mr-1"></div>
        <span>高风险</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-0.5 bg-red-500 mr-1"></div>
        <span>极高风险</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-0.5 border-t-2 border-dashed border-red-500 mr-1"></div>
        <span>异常连接</span>
      </div>
    </div>
  );
};

export default ResourceFlowLegend; 