import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeTypes,
  ConnectionMode,
  MarkerType,
  useNodesState,
  useEdgesState,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
  MiniMap,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

// 自定义节点组件
const AssetNode: React.FC<any> = ({ data }) => {
  const getNodeStyle = () => {
    switch (data.type) {
      case 'application':
        return 'bg-blue-50 border-blue-500 text-blue-700';
      case 'user':
        return 'bg-green-50 border-green-500 text-green-700';
      case 'alert':
        return 'bg-red-50 border-red-500 text-red-700';
      default:
        return 'bg-gray-50 border-gray-500 text-gray-700';
    }
  };

  const getIcon = () => {
    switch (data.type) {
      case 'application':
        return (
          <svg className="w-4 h-4 mr-1 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 9h16" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'user':
        return (
          <svg className="w-4 h-4 mr-1 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-4 h-4 mr-1 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`px-3 py-2 rounded-lg border-2 shadow-md hover:shadow-lg transition-shadow ${getNodeStyle()}`}>
      <div className="flex items-center text-sm font-medium">
        {getIcon()}
        <span>{data.label}</span>
      </div>
      {data.details && (
        <div className="text-xs mt-1 text-gray-600">{data.details}</div>
      )}
    </div>
  );
};

// 节点类型映射
const nodeTypes: NodeTypes = {
  application: AssetNode,
  user: AssetNode,
  alert: AssetNode,
};

// 组件的props类型定义
interface AssetFlowChartProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodeClick?: (node: Node) => void;
  onEdgeClick?: (edge: Edge) => void;
}

// 风险等级颜色映射
const riskColorMap: Record<string, string> = {
  high: '#EF4444', // 高风险 - 红色
  medium: '#F59E0B', // 中风险 - 橙色
  low: '#3B82F6',  // 低风险 - 蓝色
  default: '#9CA3AF' // 默认 - 灰色
};

const AssetFlowChartContent: React.FC<AssetFlowChartProps> = ({ 
  nodes, 
  edges, 
  onNodeClick: externalNodeClickHandler,
  onEdgeClick: externalEdgeClickHandler
}) => {
  // 使用useMemo确保初始值在组件重新渲染时不会重置
  const initialNodes = useMemo(() => nodes || [], []);
  const initialEdges = useMemo(() => edges || [], []);
  
  // 初始化状态
  const [flowNodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [showMiniMap, setShowMiniMap] = useState<boolean>(true);

  // 当props变化时更新图表数据
  useEffect(() => {
    // 只有当节点和边的数据有效时才更新
    if (nodes && Array.isArray(nodes)) {
      setNodes(nodes);
      console.log('节点数据已更新:', nodes.length);
    }
    
    if (edges && Array.isArray(edges)) {
      setEdges(edges);
      console.log('边数据已更新:', edges.length);
    }
  }, [nodes, edges, setNodes, setEdges]);

  // 记录组件状态，用于调试
  useEffect(() => {
    console.log('AssetFlowChart状态:', {
      propNodes: nodes?.length || 0, 
      propEdges: edges?.length || 0,
      flowNodes: flowNodes.length,
      flowEdges: flowEdges.length
    });
  }, [nodes, edges, flowNodes, flowEdges]);

  // 节点点击事件处理
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node);
    setSelectedNode(node);
    setSelectedEdge(null);
    
    if (externalNodeClickHandler) {
      externalNodeClickHandler(node);
    }
  }, [externalNodeClickHandler]);

  // 边点击事件处理
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    console.log('Edge clicked:', edge);
    setSelectedEdge(edge);
    setSelectedNode(null);
    
    if (externalEdgeClickHandler) {
      externalEdgeClickHandler(edge);
    }
  }, [externalEdgeClickHandler]);

  // 风格配置对象
  const edgeOptions = useMemo(() => ({
    type: 'smoothstep', // 平滑折线类型
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#3B82F6',
    }
  }), []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-full" style={{ border: '1px solid #eaeaea', borderRadius: '8px' }}>
        {flowNodes.length > 0 && flowEdges.length > 0 ? (
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            minZoom={0.5}
            maxZoom={1.5}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            defaultEdgeOptions={edgeOptions}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#f1f5f9" size={1.5} />
            <Controls className="bg-white shadow-md rounded-md border border-gray-200" showInteractive={false} position="bottom-right" />
            {showMiniMap && (
              <MiniMap 
                nodeStrokeWidth={3}
                zoomable
                pannable
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'application': return '#3B82F6';
                    case 'user': return '#10B981';
                    case 'alert': return '#EF4444';
                    default: return '#9CA3AF';
                  }
                }}
                style={{
                  height: 120,
                  width: 160,
                  right: 10,
                  top: 10,
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              />
            )}
            <Panel position="top-left" className="bg-white p-2 rounded-md shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>应用系统</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>用户</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>告警</span>
                </div>
              </div>
            </Panel>
          </ReactFlow>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <p className="mt-2 text-sm">暂无资产关系数据</p>
            </div>
          </div>
        )}
      </div>

      {/* 显示选中节点或边的详细信息 */}
      {(selectedNode || selectedEdge) && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {selectedNode ? '节点详情' : '连接详情'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {selectedNode && (
              <>
                <div className="col-span-2">
                  <span className="font-medium">名称：</span>
                  <span>{selectedNode.data?.label}</span>
                </div>
                <div>
                  <span className="font-medium">类型：</span>
                  <span>{selectedNode.data?.type || '未定义'}</span>
                </div>
                {selectedNode.data?.details && (
                  <div className="col-span-2">
                    <span className="font-medium">详情：</span>
                    <span>{selectedNode.data.details}</span>
                  </div>
                )}
              </>
            )}

            {selectedEdge && (
              <>
                <div className="col-span-2">
                  <span className="font-medium">连接：</span>
                  <span>从 "{flowNodes.find(n => n.id === selectedEdge.source)?.data?.label}" 到 "{flowNodes.find(n => n.id === selectedEdge.target)?.data?.label}"</span>
                </div>
                {selectedEdge.label && (
                  <div className="col-span-2">
                    <span className="font-medium">标签：</span>
                    <span>{selectedEdge.label}</span>
                  </div>
                )}
                {selectedEdge.data && typeof selectedEdge.data === 'object' && Object.keys(selectedEdge.data).length > 0 && (
                  <div className="col-span-2">
                    <span className="font-medium">详情：</span>
                    <ul className="mt-1 list-disc list-inside text-sm">
                      {Object.entries(selectedEdge.data as Record<string, any>).map(([key, value]) => (
                        <li key={key}><span className="text-gray-600">{key}:</span> {String(value)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AssetFlowChart: React.FC<AssetFlowChartProps> = (props) => {
  return (
    <ReactFlowProvider>
      <AssetFlowChartContent {...props} />
    </ReactFlowProvider>
  );
};

export default AssetFlowChart; 