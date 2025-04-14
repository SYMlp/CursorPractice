import React from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeTypes,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';

// 自定义节点组件
const AssetNode: React.FC<any> = ({ data }) => {
  const getNodeStyle = () => {
    switch (data.type) {
      case 'asset':
        return 'bg-blue-50 border-blue-500 text-blue-700';
      case 'user':
        return 'bg-green-50 border-green-500 text-green-700';
      default:
        return 'bg-gray-50 border-gray-500 text-gray-700';
    }
  };

  return (
    <div className={`px-4 py-2 rounded-lg border-2 ${getNodeStyle()}`}>
      <div className="text-sm font-medium">{data.label}</div>
      {data.visits && (
        <div className="text-xs mt-1">访问量: {data.visits}</div>
      )}
    </div>
  );
};

// 节点数据
const assetNodes: Node[] = [
  {
    id: '1',
    type: 'asset',
    position: { x: 100, y: 100 },
    data: { label: '数据资产A', visits: 1234, type: 'asset' }
  },
  {
    id: '2',
    type: 'asset',
    position: { x: 100, y: 200 },
    data: { label: '数据资产B', visits: 890, type: 'asset' }
  },
  {
    id: '3',
    type: 'user',
    position: { x: 400, y: 150 },
    data: { label: '用户群体', visits: 2124, type: 'user' }
  }
];

// 连线数据
const assetEdges: Edge[] = [
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
  }
];

// 节点类型映射
const nodeTypes: NodeTypes = {
  asset: AssetNode,
  user: AssetNode,
};

// 默认连线样式
const defaultEdgeOptions = {
  style: {
    strokeWidth: 4,
    stroke: '#0000ff',
  },
  type: 'step',
};

const AssetFlowChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={assetNodes}
        edges={assetEdges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionMode={ConnectionMode.Loose}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default AssetFlowChart; 