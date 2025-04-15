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
  useNodesState,
  useEdgesState,
  EdgeTypes,
  addEdge,
  Connection,
} from 'reactflow';
import {
  ResourceNode,
  ServiceNode,
  ApplicationNode,
  TaskNode,
  PersonNode
} from '../networks/nodes';

// 自定义节点类型
const nodeTypes: NodeTypes = {
  resource: ResourceNode,
  service: ServiceNode,
  application: ApplicationNode,
  task: TaskNode,
  person: PersonNode,
};

// 访问频率枚举
export enum AccessFrequency {
  LOW = '低频',
  MEDIUM = '中频',
  HIGH = '高频',
  VERY_HIGH = '超高频'
}

// 风险级别枚举
export enum RiskLevel {
  LOW = '低风险',
  MEDIUM = '中风险',
  HIGH = '高风险',
  VERY_HIGH = '极高风险'
}

// 节点数据增强类型
interface NodeData {
  label: string;
  accessCount?: number;      // 访问次数
  frequency?: AccessFrequency; // 访问频率
  riskLevel?: RiskLevel;     // 风险级别
  riskScore?: number;        // 风险评分(0-100)
  description?: string;      // 描述信息
}

// 边数据增强类型
interface EdgeData {
  frequency?: AccessFrequency; // 访问频率
  accessCount?: number;       // 访问次数
  lastAccess?: string;        // 最后访问时间
  riskLevel?: RiskLevel;      // 风险级别
  riskScore?: number;         // 风险评分(0-100)
}

// 初始节点数据
const initialNodes: Node<NodeData>[] = [
  // 资源节点
  {
    id: 'resource1',
    type: 'resource',
    data: { 
      label: '人口信息数据', 
      accessCount: 23451,
      frequency: AccessFrequency.VERY_HIGH,
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 92,
      description: '包含公民身份证号、姓名、出生日期等基本信息'
    },
    position: { x: 100, y: 50 },
  },
  {
    id: 'resource2',
    type: 'resource',
    data: { 
      label: '车辆信息数据', 
      accessCount: 16583,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 78,
      description: '包含车牌号、车辆型号、所有人信息等'
    },
    position: { x: 100, y: 150 },
  },
  {
    id: 'resource3',
    type: 'resource',
    data: { 
      label: '社保信息数据', 
      accessCount: 12347,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 65,
      description: '包含社保账号、缴费记录、保险类型等'
    },
    position: { x: 100, y: 250 },
  },
  {
    id: 'resource4',
    type: 'resource',
    data: { 
      label: '公积金数据', 
      accessCount: 8569,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 60,
      description: '包含公积金账号、缴存记录、提取记录等'
    },
    position: { x: 100, y: 350 },
  },

  // 服务节点
  {
    id: 'service1',
    type: 'service',
    data: { 
      label: '资源管理服务', 
      accessCount: 39284,
      frequency: AccessFrequency.VERY_HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 85,
      description: '提供各类资源的统一访问接口'
    },
    position: { x: 350, y: 100 },
  },
  {
    id: 'service2',
    type: 'service',
    data: { 
      label: '数据查询服务', 
      accessCount: 28974,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 82,
      description: '提供各类数据的查询能力'
    },
    position: { x: 350, y: 300 },
  },

  // 应用节点
  {
    id: 'app1',
    type: 'application',
    data: { 
      label: '人口信息查询系统', 
      accessCount: 23451,
      frequency: AccessFrequency.VERY_HIGH,
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 95,
      description: '提供人口基本信息的查询功能'
    },
    position: { x: 600, y: 50 },
  },
  {
    id: 'app2',
    type: 'application',
    data: { 
      label: '车辆信息查询系统', 
      accessCount: 16583,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 75,
      description: '提供车辆相关信息的查询功能'
    },
    position: { x: 600, y: 150 },
  },
  {
    id: 'app3',
    type: 'application',
    data: { 
      label: '社保信息查询系统', 
      accessCount: 12347,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 68,
      description: '提供社保相关信息的查询功能'
    },
    position: { x: 600, y: 250 },
  },
  {
    id: 'app4',
    type: 'application',
    data: { 
      label: '公积金信息查询系统', 
      accessCount: 8569,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.LOW,
      riskScore: 45,
      description: '提供公积金相关信息的查询功能'
    },
    position: { x: 600, y: 350 },
  },

  // 任务节点
  {
    id: 'task1',
    type: 'task',
    data: { 
      label: '信息查询任务', 
      accessCount: 18735,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 70,
      description: '执行基本信息查询操作'
    },
    position: { x: 850, y: 100 },
  },
  {
    id: 'task2',
    type: 'task',
    data: { 
      label: '数据导出任务', 
      accessCount: 9648,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.HIGH,
      riskScore: 85,
      description: '执行数据批量导出操作'
    },
    position: { x: 850, y: 200 },
  },
  {
    id: 'task3',
    type: 'task',
    data: { 
      label: '报表生成任务', 
      accessCount: 5732,
      frequency: AccessFrequency.LOW,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 62,
      description: '生成统计分析报表'
    },
    position: { x: 850, y: 300 },
  },

  // 人员节点
  {
    id: 'person1',
    type: 'person',
    data: { 
      label: '张三', 
      accessCount: 10245,
      frequency: AccessFrequency.VERY_HIGH,
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 92,
      description: '数据分析师，拥有高级数据访问权限'
    },
    position: { x: 1100, y: 100 },
  },
  {
    id: 'person2',
    type: 'person',
    data: { 
      label: '李四', 
      accessCount: 9876,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 80,
      description: '业务人员，拥有基础数据访问权限'
    },
    position: { x: 1100, y: 200 },
  },
  {
    id: 'person3',
    type: 'person',
    data: { 
      label: '王五', 
      accessCount: 8532,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 65,
      description: '客服人员，拥有有限数据访问权限'
    },
    position: { x: 1100, y: 300 },
  },
  {
    id: 'person4',
    type: 'person',
    data: { 
      label: '赵六', 
      accessCount: 7621,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.LOW,
      riskScore: 45,
      description: '后勤人员，拥有有限数据访问权限'
    },
    position: { x: 1100, y: 400 },
  },
];

// 初始连线数据
const initialEdges: Edge<EdgeData>[] = [
  // 资源到服务的连接
  { 
    id: 'r1-s1', 
    source: 'resource1', 
    target: 'service1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.VERY_HIGH,
      accessCount: 19875,
      lastAccess: '2023-08-15 14:32:45',
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 92
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff4500',
    }
  },
  { 
    id: 'r2-s1', 
    source: 'resource2', 
    target: 'service1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff8c00', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 15243,
      lastAccess: '2023-08-15 13:21:34',
      riskLevel: RiskLevel.HIGH,
      riskScore: 85
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff8c00',
    }
  },
  { 
    id: 'r3-s2', 
    source: 'resource3', 
    target: 'service2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ffa500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 12347,
      lastAccess: '2023-08-15 10:45:12',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 65
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ffa500',
    }
  },
  { 
    id: 'r4-s2', 
    source: 'resource4', 
    target: 'service2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#32cd32', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 8569,
      lastAccess: '2023-08-15 09:14:28',
      riskLevel: RiskLevel.LOW,
      riskScore: 45
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#32cd32',
    }
  },

  // 服务到应用的连接
  { 
    id: 's1-a1', 
    source: 'service1', 
    target: 'app1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.VERY_HIGH,
      accessCount: 18735,
      lastAccess: '2023-08-15 14:35:12',
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 95
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff4500',
    }
  },
  { 
    id: 's1-a2', 
    source: 'service1', 
    target: 'app2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff8c00', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 14256,
      lastAccess: '2023-08-15 13:28:46',
      riskLevel: RiskLevel.HIGH,
      riskScore: 78
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff8c00',
    }
  },
  { 
    id: 's2-a3', 
    source: 'service2', 
    target: 'app3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ffa500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 10987,
      lastAccess: '2023-08-15 11:54:23',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 65
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ffa500',
    }
  },
  { 
    id: 's2-a4', 
    source: 'service2', 
    target: 'app4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#32cd32', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 7654,
      lastAccess: '2023-08-15 10:12:56',
      riskLevel: RiskLevel.LOW,
      riskScore: 42
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#32cd32',
    }
  },

  // 应用到任务的连接
  { 
    id: 'a1-t1', 
    source: 'app1', 
    target: 'task1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.VERY_HIGH,
      accessCount: 16732,
      lastAccess: '2023-08-15 14:38:02',
      riskLevel: RiskLevel.HIGH,
      riskScore: 85
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff4500',
    }
  },
  { 
    id: 'a2-t1', 
    source: 'app2', 
    target: 'task1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff8c00', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 12345,
      lastAccess: '2023-08-15 13:42:18',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 72
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff8c00',
    }
  },
  { 
    id: 'a2-t2', 
    source: 'app2', 
    target: 'task2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff8c00', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 9876,
      lastAccess: '2023-08-15 13:15:46',
      riskLevel: RiskLevel.HIGH,
      riskScore: 78
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff8c00',
    }
  },
  { 
    id: 'a3-t2', 
    source: 'app3', 
    target: 'task2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ffa500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 8765,
      lastAccess: '2023-08-15 12:05:38',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 68
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ffa500',
    }
  },
  { 
    id: 'a3-t3', 
    source: 'app3', 
    target: 'task3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ffa500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.LOW,
      accessCount: 5432,
      lastAccess: '2023-08-15 11:27:52',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 60
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ffa500',
    }
  },
  { 
    id: 'a4-t3', 
    source: 'app4', 
    target: 'task3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#32cd32', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.LOW,
      accessCount: 4321,
      lastAccess: '2023-08-15 10:34:19',
      riskLevel: RiskLevel.LOW,
      riskScore: 42
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#32cd32',
    }
  },

  // 任务到人员的连接
  { 
    id: 't1-p1', 
    source: 'task1', 
    target: 'person1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.VERY_HIGH,
      accessCount: 10245,
      lastAccess: '2023-08-15 14:42:33',
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 92
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff4500',
    }
  },
  { 
    id: 't1-p2', 
    source: 'task1', 
    target: 'person2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff8c00', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 8765,
      lastAccess: '2023-08-15 13:58:22',
      riskLevel: RiskLevel.HIGH,
      riskScore: 82
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff8c00',
    }
  },
  { 
    id: 't2-p2', 
    source: 'task2', 
    target: 'person2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff8c00', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 7654,
      lastAccess: '2023-08-15 13:24:15',
      riskLevel: RiskLevel.HIGH,
      riskScore: 78
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff8c00',
    }
  },
  { 
    id: 't2-p3', 
    source: 'task2', 
    target: 'person3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ffa500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 6543,
      lastAccess: '2023-08-15 12:18:47',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 65
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ffa500',
    }
  },
  { 
    id: 't3-p3', 
    source: 'task3', 
    target: 'person3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ffa500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 5432,
      lastAccess: '2023-08-15 11:36:29',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 62
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ffa500',
    }
  },
  { 
    id: 't3-p4', 
    source: 'task3', 
    target: 'person4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#32cd32', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.LOW,
      accessCount: 4321,
      lastAccess: '2023-08-15 10:48:55',
      riskLevel: RiskLevel.LOW,
      riskScore: 45
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#32cd32',
    }
  },
  
  // 直接跨级连接
  { 
    id: 'a1-p1', 
    source: 'app1', 
    target: 'person1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 2, strokeDasharray: '5,5' },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 9876,
      lastAccess: '2023-08-15 14:15:27',
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 95
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff4500',
    }
  },
  { 
    id: 'r1-a1', 
    source: 'resource1', 
    target: 'app1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 2, strokeDasharray: '5,5' },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 7654,
      lastAccess: '2023-08-15 13:42:18',
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 92
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff4500',
    }
  },
  
  // 服务之间的连接
  { 
    id: 's1-s2', 
    source: 'service1', 
    target: 'service2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff8c00', strokeWidth: 2, strokeDasharray: '3,3' },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 8932,
      lastAccess: '2023-08-15 12:18:45',
      riskLevel: RiskLevel.HIGH,
      riskScore: 76
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff8c00',
    }
  },
  
  // 资源之间的直接连接
  { 
    id: 'r1-r2', 
    source: 'resource1', 
    target: 'resource2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ffa500', strokeWidth: 2 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 6543,
      lastAccess: '2023-08-15 11:47:32',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 65
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ffa500',
    }
  },
  
  // 资源直接到任务的特殊连接
  { 
    id: 'r3-t1', 
    source: 'resource3', 
    target: 'task1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 2, strokeDasharray: '5,2' },
    data: {
      frequency: AccessFrequency.VERY_HIGH,
      accessCount: 10876,
      lastAccess: '2023-08-15 14:22:36',
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 90
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff4500',
    }
  },
  
  // 应用间的数据传输
  { 
    id: 'a1-a2', 
    source: 'app1', 
    target: 'app2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff8c00', strokeWidth: 2 },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 9345,
      lastAccess: '2023-08-15 13:32:14',
      riskLevel: RiskLevel.HIGH,
      riskScore: 82
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff8c00',
    }
  },
  
  // 服务到人员的特殊权限连接
  { 
    id: 's1-p2', 
    source: 'service1', 
    target: 'person2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 2, strokeDasharray: '10,2' },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 7845,
      lastAccess: '2023-08-15 13:04:56',
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 88
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ff4500',
    }
  },
  
  // 人员之间的协作关系
  { 
    id: 'p1-p2', 
    source: 'person1', 
    target: 'person2',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#6495ed', strokeWidth: 2, strokeDasharray: '3,3' },
    data: {
      frequency: AccessFrequency.VERY_HIGH,
      accessCount: 12478,
      lastAccess: '2023-08-15 14:35:42',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 60
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#6495ed',
    }
  },
  { 
    id: 'p2-p3', 
    source: 'person2', 
    target: 'person3',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#6495ed', strokeWidth: 2, strokeDasharray: '3,3' },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 9547,
      lastAccess: '2023-08-15 13:48:15',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 58
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#6495ed',
    }
  }
];

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

const FlowChartContent: React.FC = () => {
  const [nodes, setNodes] = useState<Node<NodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge<EdgeData>[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge<EdgeData> | null>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node<NodeData>) => {
    console.log('Node data:', node.data);
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge<EdgeData>) => {
    console.log('Edge data:', edge.data);
    setSelectedEdge(edge);
    setSelectedNode(null);
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
    <div className="flex flex-col w-full h-full">
      <div className="h-[600px] bg-white rounded-lg border-2 border-gray-200">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
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
      
      {/* 显示选中节点或连线的详细信息 */}
      {(selectedNode || selectedEdge) && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {selectedNode ? '节点详情' : '连接详情'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {selectedNode && (
              <>
                <div className="col-span-2">
                  <span className="font-medium">名称：</span>
                  <span>{selectedNode.data.label}</span>
                </div>
                <div>
                  <span className="font-medium">访问次数：</span>
                  <span>{selectedNode.data.accessCount?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-medium">访问频率：</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    selectedNode.data.frequency === AccessFrequency.VERY_HIGH ? 'bg-red-100 text-red-800' :
                    selectedNode.data.frequency === AccessFrequency.HIGH ? 'bg-orange-100 text-orange-800' :
                    selectedNode.data.frequency === AccessFrequency.MEDIUM ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedNode.data.frequency}
                  </span>
                </div>
                <div>
                  <span className="font-medium">风险级别：</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    selectedNode.data.riskLevel === RiskLevel.VERY_HIGH ? 'bg-red-100 text-red-800' :
                    selectedNode.data.riskLevel === RiskLevel.HIGH ? 'bg-orange-100 text-orange-800' :
                    selectedNode.data.riskLevel === RiskLevel.MEDIUM ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedNode.data.riskLevel}
                  </span>
                </div>
                <div>
                  <span className="font-medium">风险评分：</span>
                  <span>{selectedNode.data.riskScore}</span>
                </div>
                {selectedNode.data.description && (
                  <div className="col-span-2">
                    <span className="font-medium">描述：</span>
                    <span>{selectedNode.data.description}</span>
                  </div>
                )}
              </>
            )}

            {selectedEdge && (
              <>
                <div>
                  <span className="font-medium">访问次数：</span>
                  <span>{selectedEdge.data?.accessCount?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-medium">访问频率：</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    selectedEdge.data?.frequency === AccessFrequency.VERY_HIGH ? 'bg-red-100 text-red-800' :
                    selectedEdge.data?.frequency === AccessFrequency.HIGH ? 'bg-orange-100 text-orange-800' :
                    selectedEdge.data?.frequency === AccessFrequency.MEDIUM ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedEdge.data?.frequency}
                  </span>
                </div>
                <div>
                  <span className="font-medium">风险级别：</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    selectedEdge.data?.riskLevel === RiskLevel.VERY_HIGH ? 'bg-red-100 text-red-800' :
                    selectedEdge.data?.riskLevel === RiskLevel.HIGH ? 'bg-orange-100 text-orange-800' :
                    selectedEdge.data?.riskLevel === RiskLevel.MEDIUM ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedEdge.data?.riskLevel}
                  </span>
                </div>
                <div>
                  <span className="font-medium">风险评分：</span>
                  <span>{selectedEdge.data?.riskScore}</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">最后访问时间：</span>
                  <span>{selectedEdge.data?.lastAccess}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
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