import 'reactflow/dist/style.css';
import React, { useCallback, useState, useRef, useEffect } from 'react';
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
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  useReactFlow,
  Panel,
} from 'reactflow';
import {
  ResourceNode,
  ServiceNode,
  ApplicationNode,
  TaskNode,
  PersonNode
} from './nodes';

// 导入DetailPanel组件
import { DetailPanel } from '../cards';

// 自定义枚举和接口定义
export enum AccessFrequency {
  LOW = '低频',
  MEDIUM = '中频',
  HIGH = '高频',
  VERY_HIGH = '超高频'
}

export enum RiskLevel {
  LOW = '低风险',
  MEDIUM = '中风险',
  HIGH = '高风险',
  VERY_HIGH = '极高风险'
}

// 节点数据类型
export interface NodeData {
  label: string;
  accessCount?: number;      // 访问次数
  frequency?: AccessFrequency; // 访问频率
  riskLevel?: RiskLevel;     // 风险级别
  riskScore?: number;        // 风险评分(0-100)
  description?: string;      // 描述信息
}

// 边数据类型
export interface EdgeData {
  frequency?: AccessFrequency; // 访问频率
  accessCount?: number;       // 访问次数
  lastAccess?: string;        // 最后访问时间
  riskLevel?: RiskLevel;      // 风险级别
  riskScore?: number;         // 风险评分(0-100)
}

// 自定义节点类型
const nodeTypes: NodeTypes = {
  resource: ResourceNode,
  service: ServiceNode,
  application: ApplicationNode,
  task: TaskNode,
  person: PersonNode,
};

// 根据风险级别获取边的颜色
export const getEdgeColorByRisk = (riskLevel?: RiskLevel): string => {
  switch(riskLevel) {
    case RiskLevel.VERY_HIGH:
      return '#ff4500'; // 红色
    case RiskLevel.HIGH:
      return '#ff8c00'; // 橙色
    case RiskLevel.MEDIUM:
      return '#ffa500'; // 浅橙色
    case RiskLevel.LOW:
      return '#32cd32'; // 绿色
    default:
      return '#1d4ed8'; // 默认蓝色
  }
};

interface ResourceFlowChartProps {
  initialNodes?: Node<NodeData>[];
  initialEdges?: Edge<EdgeData>[];
  onNodeClick?: (node: Node<NodeData>) => void;
  onEdgeClick?: (edge: Edge<EdgeData>) => void;
  className?: string;
  fitView?: boolean;
  showControls?: boolean;
  showMiniMap?: boolean;
}

const FlowChartContent: React.FC<ResourceFlowChartProps> = ({
  initialNodes,
  initialEdges,
  onNodeClick: externalNodeClick,
  onEdgeClick: externalEdgeClick,
  className = "",
  fitView = true,
  showControls = true,
  showMiniMap = false,
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView: fitViewFunc } = useReactFlow();
  
  // 使用props提供的初始数据或从mock获取默认数据
  const [nodes, setNodes] = useNodesState(initialNodes || []);
  const [edges, setEdges] = useEdgesState(initialEdges || []);
  
  // 添加选中节点和边的状态管理
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge<EdgeData> | null>(null);

  // 监听容器大小变化以适应布局
  useEffect(() => {
    if (!reactFlowWrapper.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(() => fitViewFunc({ padding: 0.2 }), 0);
    });
    
    resizeObserver.observe(reactFlowWrapper.current);
    return () => {
      if (reactFlowWrapper.current) {
        resizeObserver.unobserve(reactFlowWrapper.current);
      }
    };
  }, [fitViewFunc]);

  // 处理连接创建
  const onConnect = useCallback((connection: Connection) => {
    // 根据连接的源节点和目标节点来确定风险级别和样式
    const sourceNode = nodes.find(node => node.id === connection.source);
    const targetNode = nodes.find(node => node.id === connection.target);
    let riskLevel = RiskLevel.LOW;
    
    // 如果源节点或目标节点有高风险, 则连接也具有高风险
    if (sourceNode?.data?.riskLevel === RiskLevel.VERY_HIGH || 
        targetNode?.data?.riskLevel === RiskLevel.VERY_HIGH) {
      riskLevel = RiskLevel.VERY_HIGH;
    } else if (sourceNode?.data?.riskLevel === RiskLevel.HIGH || 
              targetNode?.data?.riskLevel === RiskLevel.HIGH) {
      riskLevel = RiskLevel.HIGH;
    } else if (sourceNode?.data?.riskLevel === RiskLevel.MEDIUM || 
              targetNode?.data?.riskLevel === RiskLevel.MEDIUM) {
      riskLevel = RiskLevel.MEDIUM;
    }
    
    const edgeColor = getEdgeColorByRisk(riskLevel);
    
    setEdges((eds) => addEdge({
      ...connection,
      type: 'smoothstep',
      animated: true,
      style: { stroke: edgeColor, strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edgeColor,
      },
      data: {
        riskLevel,
        accessCount: 0,
        frequency: AccessFrequency.LOW,
        lastAccess: new Date().toLocaleString('zh-CN'),
        riskScore: riskLevel === RiskLevel.VERY_HIGH ? 85 : 
                  riskLevel === RiskLevel.HIGH ? 65 :
                  riskLevel === RiskLevel.MEDIUM ? 45 : 25
      }
    }, eds));
  }, [nodes, setEdges]);

  const onNodeClickHandler = useCallback((event: React.MouseEvent, node: Node<NodeData>) => {
    // 设置选中节点
    setSelectedNode(node);
    setSelectedEdge(null);
    
    // 如果有外部回调，也调用它
    if (externalNodeClick) {
      externalNodeClick(node);
    }
  }, [externalNodeClick]);

  const onEdgeClickHandler = useCallback((event: React.MouseEvent, edge: Edge<EdgeData>) => {
    // 设置选中边
    setSelectedEdge(edge);
    setSelectedNode(null);
    
    // 如果有外部回调，也调用它
    if (externalEdgeClick) {
      externalEdgeClick(edge);
    }
  }, [externalEdgeClick]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <div className={`w-full h-full relative ${className}`} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClickHandler}
        onEdgeClick={onEdgeClickHandler}
        fitView={fitView}
        minZoom={0.2}
        maxZoom={4}
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        className="touch-none"
      >
        <Background 
          color="#f0f0f0" 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1} 
        />
        {showControls && <Controls showInteractive={false} />}
        
        {/* 添加节点/边详情面板 */}
        {(selectedNode || selectedEdge) && (
          <Panel position="bottom-right" className="z-10 p-0 bg-transparent border-0">
            <div className="w-64">
              {selectedNode && (
                <DetailPanel
                  title={`节点详情: ${selectedNode.data?.label || '未命名节点'}`}
                  items={[
                    { label: '节点类型', value: selectedNode.type || '' },
                    { label: '节点ID', value: selectedNode.id },
                    ...(selectedNode.data ? Object.entries(selectedNode.data)
                      .filter(([key]) => key !== 'label')
                      .map(([key, value]) => ({ 
                        label: key === 'frequency' ? '访问频率' :
                               key === 'riskLevel' ? '风险等级' :
                               key === 'riskScore' ? '风险评分' :
                               key === 'accessCount' ? '访问次数' :
                               key === 'description' ? '描述' : key, 
                        value: value === undefined ? '' : 
                              typeof value === 'object' ? JSON.stringify(value) : 
                              String(value)
                      })) : [])
                  ]}
                />
              )}
              
              {selectedEdge && (
                <DetailPanel
                  title="连接详情"
                  items={[
                    { label: '连接ID', value: selectedEdge.id },
                    { label: '源节点', value: selectedEdge.source },
                    { label: '目标节点', value: selectedEdge.target },
                    ...(selectedEdge.data ? Object.entries(selectedEdge.data).map(([key, value]) => ({ 
                      label: key === 'frequency' ? '访问频率' :
                             key === 'riskLevel' ? '风险等级' :
                             key === 'riskScore' ? '风险评分' :
                             key === 'accessCount' ? '访问次数' :
                             key === 'lastAccess' ? '最后访问时间' : key,
                      value: value === undefined ? '' : 
                            typeof value === 'object' ? JSON.stringify(value) : 
                            String(value)
                    })) : [])
                  ]}
                />
              )}
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

// 使用React.memo减少不必要的重渲染
const MemoizedFlowChartContent = React.memo(FlowChartContent);

const ResourceFlowChart: React.FC<ResourceFlowChartProps> = (props) => {
  return (
    <ReactFlowProvider>
      <MemoizedFlowChartContent {...props} />
    </ReactFlowProvider>
  );
};

export default ResourceFlowChart; 