import { Node, Edge } from 'reactflow';

// 从ResourceFlowChart.tsx引入需要的类型
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

// 模拟数据 - 节点
export const mockNodes: Node<NodeData>[] = [
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
      label: '企业信用数据', 
      accessCount: 15784,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 78,
      description: '包含企业工商注册、税务记录、违法违规等信息'
    },
    position: { x: 400, y: 50 },
  },
  {
    id: 'resource3',
    type: 'resource',
    data: { 
      label: '金融交易数据', 
      accessCount: 28765,
      frequency: AccessFrequency.VERY_HIGH,
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 95,
      description: '包含银行交易、支付记录、投资行为等敏感金融信息'
    },
    position: { x: 700, y: 50 },
  },
  {
    id: 'resource4',
    type: 'resource',
    data: { 
      label: '医疗健康数据', 
      accessCount: 17632,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 90,
      description: '包含病历、诊断记录、用药信息等敏感医疗数据'
    },
    position: { x: 1000, y: 50 },
  },
  {
    id: 'resource5',
    type: 'resource',
    data: { 
      label: '位置轨迹数据', 
      accessCount: 19843,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 85,
      description: '包含用户移动轨迹、出行记录、常驻地等位置数据'
    },
    position: { x: 250, y: 50 },
  },
  
  // 服务节点
  {
    id: 'service1',
    type: 'service',
    data: { 
      label: '人口数据查询服务', 
      accessCount: 18956,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 75,
      description: '提供人口基本信息的实时查询服务'
    },
    position: { x: 100, y: 200 },
  },
  {
    id: 'service2',
    type: 'service',
    data: { 
      label: '信用评分服务', 
      accessCount: 9876,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 62,
      description: '提供个人和企业信用评分计算服务'
    },
    position: { x: 400, y: 200 },
  },
  {
    id: 'service3',
    type: 'service',
    data: { 
      label: '交易监控服务', 
      accessCount: 23456,
      frequency: AccessFrequency.VERY_HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 80,
      description: '提供金融交易实时监控和风险评估'
    },
    position: { x: 700, y: 200 },
  },
  {
    id: 'service4',
    type: 'service',
    data: { 
      label: '医疗数据分析服务', 
      accessCount: 12543,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.HIGH,
      riskScore: 78,
      description: '提供医疗数据统计分析和病历查询功能'
    },
    position: { x: 1000, y: 200 },
  },
  {
    id: 'service5',
    type: 'service',
    data: { 
      label: '位置轨迹分析服务', 
      accessCount: 15678,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 68,
      description: '提供用户位置数据查询和轨迹分析功能'
    },
    position: { x: 250, y: 200 },
  },
  
  // 应用节点
  {
    id: 'app1',
    type: 'application',
    data: { 
      label: '公安信息系统', 
      accessCount: 12567,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 65,
      description: '公安内部使用的信息管理系统'
    },
    position: { x: 100, y: 350 },
  },
  {
    id: 'app2',
    type: 'application',
    data: { 
      label: '企业信用平台', 
      accessCount: 8745,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.LOW,
      riskScore: 42,
      description: '面向社会公众开放的企业信用查询平台'
    },
    position: { x: 400, y: 350 },
  },
  {
    id: 'app3',
    type: 'application',
    data: { 
      label: '金融监管平台', 
      accessCount: 19876,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.HIGH,
      riskScore: 76,
      description: '金融监管部门使用的交易监控和风险管理平台'
    },
    position: { x: 700, y: 350 },
  },
  {
    id: 'app4',
    type: 'application',
    data: { 
      label: '医疗数据平台', 
      accessCount: 9834,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.HIGH,
      riskScore: 72,
      description: '医疗机构使用的患者数据管理和分析平台'
    },
    position: { x: 1000, y: 350 },
  },
  {
    id: 'app5',
    type: 'application',
    data: { 
      label: '智慧城市平台', 
      accessCount: 14567,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 60,
      description: '城市管理部门使用的人口和位置数据分析平台'
    },
    position: { x: 250, y: 350 },
  },
  
  // 任务节点
  {
    id: 'task1',
    type: 'task',
    data: { 
      label: '人口数据分析任务', 
      accessCount: 987,
      frequency: AccessFrequency.LOW,
      riskLevel: RiskLevel.LOW,
      riskScore: 35,
      description: '每月执行的人口数据统计分析任务'
    },
    position: { x: 100, y: 500 },
  },
  {
    id: 'task2',
    type: 'task',
    data: { 
      label: '企业风险评估任务', 
      accessCount: 765,
      frequency: AccessFrequency.LOW,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 55,
      description: '定期执行的企业经营风险和信用评估任务'
    },
    position: { x: 400, y: 500 },
  },
  {
    id: 'task3',
    type: 'task',
    data: { 
      label: '异常交易监测任务', 
      accessCount: 2345,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.HIGH,
      riskScore: 78,
      description: '实时执行的金融交易异常行为监测任务'
    },
    position: { x: 700, y: 500 },
  },
  {
    id: 'task4',
    type: 'task',
    data: { 
      label: '患者病历分析任务', 
      accessCount: 876,
      frequency: AccessFrequency.LOW,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 60,
      description: '针对特定疾病患者的病历数据分析研究任务'
    },
    position: { x: 1000, y: 500 },
  },
  {
    id: 'task5',
    type: 'task',
    data: { 
      label: '人口迁徙分析任务', 
      accessCount: 1234,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.LOW,
      riskScore: 48,
      description: '分析城市人口流动和迁徙规律的定期任务'
    },
    position: { x: 250, y: 500 },
  },
  
  // 人员节点
  {
    id: 'person1',
    type: 'person',
    data: { 
      label: '公安数据分析师', 
      accessCount: 3562,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.LOW,
      riskScore: 28,
      description: '负责公安数据的分析工作'
    },
    position: { x: 100, y: 650 },
  },
  {
    id: 'person2',
    type: 'person',
    data: { 
      label: '企业信用管理员', 
      accessCount: 2845,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 55,
      description: '负责企业信用数据的维护和更新'
    },
    position: { x: 400, y: 650 },
  },
  {
    id: 'person3',
    type: 'person',
    data: { 
      label: '金融风控分析师', 
      accessCount: 7845,
      frequency: AccessFrequency.HIGH,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 58,
      description: '负责金融交易风险监控和分析'
    },
    position: { x: 700, y: 650 },
  },
  {
    id: 'person4',
    type: 'person',
    data: { 
      label: '医疗数据研究员', 
      accessCount: 3421,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 62,
      description: '负责医疗健康数据的研究和分析'
    },
    position: { x: 1000, y: 650 },
  },
  {
    id: 'person5',
    type: 'person',
    data: { 
      label: '城市规划分析师', 
      accessCount: 4567,
      frequency: AccessFrequency.MEDIUM,
      riskLevel: RiskLevel.LOW,
      riskScore: 40,
      description: '负责城市人口和位置数据的分析规划'
    },
    position: { x: 250, y: 650 },
  },
  {
    id: 'person6',
    type: 'person',
    data: { 
      label: '系统维护工程师', 
      accessCount: 1235,
      frequency: AccessFrequency.LOW,
      riskLevel: RiskLevel.HIGH,
      riskScore: 75,
      description: '负责各类数据平台的系统维护和升级'
    },
    position: { x: 550, y: 650 },
  }
];

// 模拟数据 - 边
export const mockEdges: Edge<EdgeData>[] = [
  // 资源 -> 服务
  {
    id: 'e1-2',
    source: 'resource1',
    target: 'service1',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.VERY_HIGH,
      accessCount: 18956,
      lastAccess: '2023-05-15 14:30:22',
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 88
    }
  },
  {
    id: 'e2-4',
    source: 'resource2',
    target: 'service2',
    animated: true,
    style: { stroke: '#ff8c00', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 9876,
      lastAccess: '2023-05-15 12:45:18',
      riskLevel: RiskLevel.HIGH,
      riskScore: 72
    }
  },
  
  // 服务 -> 应用
  {
    id: 'e3-5',
    source: 'service1',
    target: 'app1',
    animated: true,
    style: { stroke: '#ffa500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.HIGH,
      accessCount: 12567,
      lastAccess: '2023-05-15 16:22:45',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 65
    }
  },
  {
    id: 'e4-6',
    source: 'service2',
    target: 'app2',
    animated: true,
    style: { stroke: '#32cd32', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 8745,
      lastAccess: '2023-05-15 10:15:33',
      riskLevel: RiskLevel.LOW,
      riskScore: 42
    }
  },
  
  // 应用 -> 任务
  {
    id: 'e5-7',
    source: 'app1',
    target: 'task1',
    animated: true,
    style: { stroke: '#32cd32', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.LOW,
      accessCount: 987,
      lastAccess: '2023-05-14 23:45:12',
      riskLevel: RiskLevel.LOW,
      riskScore: 35
    }
  },
  
  // 任务 -> 人员
  {
    id: 'e7-8',
    source: 'task1',
    target: 'person1',
    animated: true,
    style: { stroke: '#32cd32', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.LOW,
      accessCount: 987,
      lastAccess: '2023-05-14 08:30:55',
      riskLevel: RiskLevel.LOW,
      riskScore: 28
    }
  },
  
  // 应用 -> 人员
  {
    id: 'e6-9',
    source: 'app2',
    target: 'person2',
    animated: true,
    style: { stroke: '#ffa500', strokeWidth: 3 },
    data: {
      frequency: AccessFrequency.MEDIUM,
      accessCount: 2845,
      lastAccess: '2023-05-15 09:12:41',
      riskLevel: RiskLevel.MEDIUM,
      riskScore: 55
    }
  }
];

// 模拟数据 - 具有异常连接的数据集
export const mockNodesWithAbnormal = [...mockNodes];
export const mockEdgesWithAbnormal = [
  ...mockEdges,
  // 异常连接：低权限人员直接访问敏感资源
  {
    id: 'abnormal-1',
    source: 'person2',
    target: 'resource1',
    animated: true,
    style: { stroke: '#ff4500', strokeWidth: 3, strokeDasharray: '5,5' },
    data: {
      frequency: AccessFrequency.LOW,
      accessCount: 23,
      lastAccess: '2023-05-15 03:12:41',
      riskLevel: RiskLevel.VERY_HIGH,
      riskScore: 95
    }
  }
];

// 导出基本的和异常的数据集
export const resourceFlowData = {
  basic: {
    nodes: mockNodes,
    edges: mockEdges
  },
  withAbnormal: {
    nodes: mockNodesWithAbnormal,
    edges: mockEdgesWithAbnormal
  }
};

export default resourceFlowData; 