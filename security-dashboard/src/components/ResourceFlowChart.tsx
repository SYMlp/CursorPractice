import 'reactflow/dist/style.css';
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ConnectionMode,
  NodeTypes,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  ReactFlowProvider,
} from 'reactflow';

// 自定义节点类型
const nodeTypes: NodeTypes = {
  resource: ({ data }: any) => (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-blue-200">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
          <svg className="w-4 h-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>
        </div>
        <span className="text-sm font-medium">{data.label}</span>
      </div>
    </div>
  ),
  service: ({ data }: any) => (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-green-200">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
          <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-medium">{data.label}</span>
      </div>
    </div>
  ),
  application: ({ data }: any) => (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-purple-200">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
          <svg className="w-4 h-4 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-medium">{data.label}</span>
      </div>
    </div>
  ),
  task: ({ data }: any) => (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-orange-200">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
          <svg className="w-4 h-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-medium">{data.label}</span>
      </div>
    </div>
  ),
  person: ({ data }: any) => (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-red-200">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
          <svg className="w-4 h-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-medium">{data.label}</span>
      </div>
    </div>
  ),
};

// 初始节点数据
const initialNodes: Node[] = [
  // 资源节点
  {
    id: 'resource1',
    type: 'resource',
    data: { label: '人口信息数据' },
    position: { x: 50, y: 50 },
  },
  {
    id: 'resource2',
    type: 'resource',
    data: { label: '车辆信息数据' },
    position: { x: 50, y: 150 },
  },
  {
    id: 'resource3',
    type: 'resource',
    data: { label: '社保信息数据' },
    position: { x: 50, y: 250 },
  },
  {
    id: 'resource4',
    type: 'resource',
    data: { label: '公积金数据' },
    position: { x: 50, y: 350 },
  },

  // 服务节点
  {
    id: 'service1',
    type: 'service',
    data: { label: '资源管理服务' },
    position: { x: 300, y: 100 },
  },
  {
    id: 'service2',
    type: 'service',
    data: { label: '数据查询服务' },
    position: { x: 300, y: 300 },
  },

  // 应用节点
  {
    id: 'app1',
    type: 'application',
    data: { label: '人口信息查询系统' },
    position: { x: 550, y: 50 },
  },
  {
    id: 'app2',
    type: 'application',
    data: { label: '车辆违章查询系统' },
    position: { x: 550, y: 150 },
  },
  {
    id: 'app3',
    type: 'application',
    data: { label: '社保查询系统' },
    position: { x: 550, y: 250 },
  },
  {
    id: 'app4',
    type: 'application',
    data: { label: '公积金查询系统' },
    position: { x: 550, y: 350 },
  },

  // 任务节点
  {
    id: 'task1',
    type: 'task',
    data: { label: '信息查询任务001' },
    position: { x: 800, y: 100 },
  },
  {
    id: 'task2',
    type: 'task',
    data: { label: '信息查询任务002' },
    position: { x: 800, y: 200 },
  },
  {
    id: 'task3',
    type: 'task',
    data: { label: '信息查询任务003' },
    position: { x: 800, y: 300 },
  },

  // 人员节点
  {
    id: 'person1',
    type: 'person',
    data: { label: '张三' },
    position: { x: 1050, y: 100 },
  },
  {
    id: 'person2',
    type: 'person',
    data: { label: '李四' },
    position: { x: 1050, y: 200 },
  },
  {
    id: 'person3',
    type: 'person',
    data: { label: '王五' },
    position: { x: 1050, y: 300 },
  },
];

// 初始连线数据
const initialEdges: Edge[] = [
  // 资源到服务的连接
  { 
    id: 'r1-s1', 
    source: 'resource1', 
    target: 'service1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 'r2-s1', 
    source: 'resource2', 
    target: 'service1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 'r3-s2', 
    source: 'resource3', 
    target: 'service2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 'r4-s2', 
    source: 'resource4', 
    target: 'service2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },

  // 服务到应用的连接
  { 
    id: 's1-a1', 
    source: 'service1', 
    target: 'app1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 's1-a2', 
    source: 'service1', 
    target: 'app2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 's2-a3', 
    source: 'service2', 
    target: 'app3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 's2-a4', 
    source: 'service2', 
    target: 'app4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },

  // 应用到任务的连接
  { 
    id: 'a1-t1', 
    source: 'app1', 
    target: 'task1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 'a2-t1', 
    source: 'app2', 
    target: 'task1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 'a2-t2', 
    source: 'app2', 
    target: 'task2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 'a3-t2', 
    source: 'app3', 
    target: 'task2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 'a3-t3', 
    source: 'app3', 
    target: 'task3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 'a4-t3', 
    source: 'app4', 
    target: 'task3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },

  // 任务到人员的连接
  { 
    id: 't1-p1', 
    source: 'task1', 
    target: 'person1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 't2-p2', 
    source: 'task2', 
    target: 'person2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
  { 
    id: 't3-p3', 
    source: 'task3', 
    target: 'person3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#1d4ed8',
    }
  },
];

const FlowChartContent: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Clicked node:', node);
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ width: '100%', height: '600px', background: 'white', borderRadius: '0.5rem', border: '2px solid #e5e7eb' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#1d4ed8', strokeWidth: 3 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#1d4ed8',
          }
        }}
        proOptions={{ hideAttribution: true }}
        fitView
        style={{ background: 'white' }}
      >
        <Background color="#e2e8f0" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const FlowChart: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowChartContent />
    </ReactFlowProvider>
  );
};

export default FlowChart; 