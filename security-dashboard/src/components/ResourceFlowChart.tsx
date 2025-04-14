import React from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeTypes,
  ConnectionMode,
  NodeProps,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

// 自定义节点组件
const ResourceNode: React.FC<NodeProps> = ({ data }) => {
  const getNodeStyle = () => {
    switch (data.type) {
      case 'resource':
        return 'bg-blue-50 border-blue-500 text-blue-700';
      case 'service':
        return 'bg-green-50 border-green-500 text-green-700';
      case 'application':
        return 'bg-purple-50 border-purple-500 text-purple-700';
      case 'task':
        return 'bg-orange-50 border-orange-500 text-orange-700';
      case 'person':
        return 'bg-red-50 border-red-500 text-red-700';
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
const resourceNodes: Node[] = [
  {
    id: '1',
    type: 'resource',
    position: { x: 100, y: 100 },
    data: { 
      label: '资产A',
      visits: 1234,
      type: 'resource'
    }
  },
  {
    id: '2',
    type: 'resource',
    position: { x: 400, y: 100 },
    data: { 
      label: '资产B',
      visits: 567,
      type: 'resource'
    }
  },
  {
    id: '3',
    type: 'person',
    position: { x: 700, y: 100 },
    data: { 
      label: '用户C',
      visits: 89,
      type: 'person'
    }
  }
];

// 连线数据
const resourceEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true,
    style: { stroke: '#2563eb', strokeWidth: 2 },
    type: 'straight',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#2563eb',
    }
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    animated: true,
    style: { stroke: '#2563eb', strokeWidth: 2 },
    type: 'straight',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#2563eb',
    }
  }
];

// 节点类型映射
const nodeTypes: NodeTypes = {
  resource: ResourceNode,
  person: ResourceNode,
};

// 默认连线样式
const defaultEdgeOptions = {
  style: {
    strokeWidth: 2,
    stroke: '#2563eb',
  },
  type: 'straight',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#2563eb',
  }
};

const ResourceFlowChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={resourceNodes}
        edges={resourceEdges}
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

export default ResourceFlowChart; 