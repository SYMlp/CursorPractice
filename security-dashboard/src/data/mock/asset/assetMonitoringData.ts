// 资产监控页面的模拟数据
import { v4 as uuidv4 } from 'uuid';
import { MarkerType, Node, Edge } from 'reactflow';

// 时间范围类型
export type TimeRange = 'day' | 'week' | 'month';

// 图表ID类型
export type ChartId = 'businessTrend' | 'alarmType' | 'riskDistribution';

// 排名项接口
export interface RankItem {
  id: string;
  name: string;
  value: number;
  percent?: number;
  trend?: 'up' | 'down' | 'stable';
  risk?: 'high' | 'medium' | 'low';
}

// 登录用户数据接口
export interface LoginUserData {
  id: string;
  name: string;
  department: string;
  lastLoginTime: string;
  loginCount: number;
  risk?: 'high' | 'medium' | 'low';
}

// 资产流图的节点接口
export interface AssetFlowNode {
  id: string;
  name: string;
  type: 'application' | 'user' | 'service' | 'resource';
  risk?: 'high' | 'medium' | 'low';
  x?: number;
  y?: number;
}

// 资产流图的连接接口
export interface AssetFlowLink {
  source: string;
  target: string;
  value: number;
  risk?: 'high' | 'medium' | 'low';
}

// 资产流图数据接口
export interface AssetFlowData {
  nodes: AssetFlowNode[];
  links: AssetFlowLink[];
}

// 监控指标接口
export interface MonitoringMetric {
  id: string;
  name: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  percent?: number;
  icon?: string;
}

// 资产统计数据
export const assetStatsData = {
  totalAssets: 328,
  activeAssets: 287,
  riskAssets: 42,
  businessApplications: 156,
  growthRate: 12.5,
};

// 监控指标数据
export const monitoringMetricsData: MonitoringMetric[] = [
  {
    id: uuidv4(),
    name: '告警数',
    value: 168,
    trend: 'up',
    percent: 23.5,
    icon: 'alert',
  },
  {
    id: uuidv4(),
    name: '访问者数',
    value: 1254,
    trend: 'down',
    percent: 5.2,
    icon: 'user',
  },
  {
    id: uuidv4(),
    name: '应用数',
    value: 156,
    trend: 'up',
    percent: 8.7,
    icon: 'application',
  },
  {
    id: uuidv4(),
    name: '风险资产',
    value: 42,
    trend: 'stable',
    percent: 0,
    icon: 'risk',
  },
];

// 应用交互排名数据
export const applicationInteractionRankData: RankItem[] = [
  { id: uuidv4(), name: '财务管理系统', value: 9865, trend: 'up', risk: 'medium' },
  { id: uuidv4(), name: '人力资源系统', value: 8743, trend: 'up', risk: 'low' },
  { id: uuidv4(), name: '客户关系管理', value: 7654, trend: 'down', risk: 'high' },
  { id: uuidv4(), name: '数据分析平台', value: 6287, trend: 'up', risk: 'low' },
  { id: uuidv4(), name: '供应链管理系统', value: 5932, trend: 'stable', risk: 'medium' },
  { id: uuidv4(), name: '项目管理系统', value: 4853, trend: 'down', risk: 'low' },
  { id: uuidv4(), name: '库存管理系统', value: 3965, trend: 'up', risk: 'medium' },
  { id: uuidv4(), name: '电子商务平台', value: 3742, trend: 'up', risk: 'high' },
];

// 风险业务排名数据
export const riskBusinessRankData: RankItem[] = [
  { id: uuidv4(), name: '客户关系管理', value: 68, percent: 24.5, risk: 'high' },
  { id: uuidv4(), name: '电子商务平台', value: 52, percent: 18.7, risk: 'high' },
  { id: uuidv4(), name: '财务管理系统', value: 43, percent: 15.5, risk: 'medium' },
  { id: uuidv4(), name: '供应链管理系统', value: 38, percent: 13.7, risk: 'medium' },
  { id: uuidv4(), name: '库存管理系统', value: 29, percent: 10.4, risk: 'medium' },
  { id: uuidv4(), name: '数据分析平台', value: 18, percent: 6.5, risk: 'low' },
  { id: uuidv4(), name: '人力资源系统', value: 16, percent: 5.8, risk: 'low' },
  { id: uuidv4(), name: '项目管理系统', value: 14, percent: 5.0, risk: 'low' },
];

// 登录用户数据
export const loginUserData: LoginUserData[] = [
  { 
    id: uuidv4(), 
    name: '张三', 
    department: '研发部', 
    lastLoginTime: '2024-07-13 09:23:45', 
    loginCount: 127,
    risk: 'low'
  },
  { 
    id: uuidv4(), 
    name: '李四', 
    department: '财务部', 
    lastLoginTime: '2024-07-13 10:15:32', 
    loginCount: 98,
    risk: 'medium'
  },
  { 
    id: uuidv4(), 
    name: '王五', 
    department: '市场部', 
    lastLoginTime: '2024-07-13 08:45:11', 
    loginCount: 87,
    risk: 'low'
  },
  { 
    id: uuidv4(), 
    name: '赵六', 
    department: '人力资源部', 
    lastLoginTime: '2024-07-13 11:05:27', 
    loginCount: 76,
    risk: 'high'
  },
  { 
    id: uuidv4(), 
    name: '钱七', 
    department: '销售部', 
    lastLoginTime: '2024-07-13 09:37:18', 
    loginCount: 65,
    risk: 'medium'
  },
  { 
    id: uuidv4(), 
    name: '孙八', 
    department: '客服部', 
    lastLoginTime: '2024-07-13 10:42:56', 
    loginCount: 54,
    risk: 'low'
  },
  { 
    id: uuidv4(), 
    name: '周九', 
    department: '技术支持部', 
    lastLoginTime: '2024-07-13 08:30:22', 
    loginCount: 43,
    risk: 'medium'
  },
  { 
    id: uuidv4(), 
    name: '吴十', 
    department: '产品部', 
    lastLoginTime: '2024-07-13 11:25:33', 
    loginCount: 32,
    risk: 'high'
  }
];

// 风险用户排名数据
export const riskUserRankData: RankItem[] = [
  { id: uuidv4(), name: '赵六', value: 42, percent: 28.5, risk: 'high' },
  { id: uuidv4(), name: '吴十', value: 36, percent: 24.3, risk: 'high' },
  { id: uuidv4(), name: '李四', value: 28, percent: 18.9, risk: 'medium' },
  { id: uuidv4(), name: '钱七', value: 25, percent: 16.8, risk: 'medium' },
  { id: uuidv4(), name: '周九', value: 18, percent: 12.1, risk: 'medium' },
  { id: uuidv4(), name: '张三', value: 12, percent: 8.1, risk: 'low' },
  { id: uuidv4(), name: '王五', value: 10, percent: 6.7, risk: 'low' },
  { id: uuidv4(), name: '孙八', value: 8, percent: 5.4, risk: 'low' }
];

// 行业分布数据
export const industryDistributionData = [
  { name: '金融', value: 28 },
  { name: '制造', value: 22 },
  { name: '零售', value: 18 },
  { name: '教育', value: 12 },
  { name: '医疗', value: 10 },
  { name: '其他', value: 10 }
];

// 安全分布数据
export const securityDistributionData = [
  { name: '高风险', value: 25, color: '#FF4D4F' },
  { name: '中风险', value: 35, color: '#FAAD14' },
  { name: '低风险', value: 40, color: '#52C41A' }
];

// 生成业务趋势图数据
export const generateBusinessTrendData = (timeRange: TimeRange) => {
  let days = 0;
  let step = 0;
  
  switch (timeRange) {
    case 'day':
      days = 24;
      step = 1;
      break;
    case 'week':
      days = 7;
      step = 1;
      break;
    case 'month':
      days = 30;
      step = 1;
      break;
  }
  
  const xAxis: string[] = [];
  const series: { name: string; data: number[] }[] = [
    { name: '访问量', data: [] },
    { name: '交互量', data: [] },
    { name: '数据量', data: [] }
  ];
  
  // 生成时间轴
  for (let i = 0; i < days; i += step) {
    if (timeRange === 'day') {
      xAxis.push(`${i}:00`);
    } else if (timeRange === 'week') {
      const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      xAxis.push(days[i]);
    } else {
      xAxis.push(`${i + 1}日`);
    }
    
    // 生成数据
    series[0].data.push(Math.floor(Math.random() * 500) + 500);
    series[1].data.push(Math.floor(Math.random() * 300) + 300);
    series[2].data.push(Math.floor(Math.random() * 200) + 200);
  }
  
  return {
    xAxis,
    series
  };
};

// 生成告警类型数据
export const generateAlarmTypeData = (timeRange: TimeRange) => {
  try {
    // 根据不同的时间范围生成不同的数据分布
    let baseValues: Record<string, number> = {};
    
    switch(timeRange) {
      case 'day':
        baseValues = {
          '未授权访问': Math.floor(Math.random() * 30) + 40,
          '敏感数据操作': Math.floor(Math.random() * 25) + 35,
          '异常登录行为': Math.floor(Math.random() * 25) + 30,
          '权限提升尝试': Math.floor(Math.random() * 20) + 20,
          '数据泄露风险': Math.floor(Math.random() * 15) + 15,
          '系统漏洞': Math.floor(Math.random() * 10) + 10,
          '其他告警': Math.floor(Math.random() * 5) + 5
        };
        break;
      case 'week':
        baseValues = {
          '未授权访问': Math.floor(Math.random() * 60) + 80,
          '敏感数据操作': Math.floor(Math.random() * 50) + 65,
          '异常登录行为': Math.floor(Math.random() * 45) + 60,
          '权限提升尝试': Math.floor(Math.random() * 35) + 40,
          '数据泄露风险': Math.floor(Math.random() * 25) + 30,
          '系统漏洞': Math.floor(Math.random() * 20) + 20,
          '其他告警': Math.floor(Math.random() * 10) + 10
        };
        break;
      case 'month':
      default:
        baseValues = {
          '未授权访问': Math.floor(Math.random() * 100) + 200,
          '敏感数据操作': Math.floor(Math.random() * 80) + 150,
          '异常登录行为': Math.floor(Math.random() * 70) + 130,
          '权限提升尝试': Math.floor(Math.random() * 60) + 100,
          '数据泄露风险': Math.floor(Math.random() * 40) + 80,
          '系统漏洞': Math.floor(Math.random() * 30) + 50,
          '其他告警': Math.floor(Math.random() * 20) + 30
        };
    }
    
    // 转换为数组格式
    const alarmTypes = Object.entries(baseValues).map(([name, value]) => ({ name, value }));
    
    // 验证数据有效性并添加描述性说明
    return alarmTypes.map(item => ({
      name: item.name || '未知类型',
      value: typeof item.value === 'number' && !isNaN(item.value) ? item.value : 10,
      description: getAlarmTypeDescription(item.name)
    }));
  } catch (error) {
    console.error('生成告警类型数据出错:', error);
    // 返回默认数据
    return [
      { name: '未授权访问', value: 120, description: getAlarmTypeDescription('未授权访问') },
      { name: '敏感数据操作', value: 100, description: getAlarmTypeDescription('敏感数据操作') },
      { name: '异常登录行为', value: 80, description: getAlarmTypeDescription('异常登录行为') },
      { name: '权限提升尝试', value: 60, description: getAlarmTypeDescription('权限提升尝试') },
      { name: '数据泄露风险', value: 45, description: getAlarmTypeDescription('数据泄露风险') },
      { name: '系统漏洞', value: 30, description: getAlarmTypeDescription('系统漏洞') },
      { name: '其他告警', value: 15, description: getAlarmTypeDescription('其他告警') }
    ];
  }
};

// 获取告警类型的描述文本
const getAlarmTypeDescription = (type: string): string => {
  const descriptions: Record<string, string> = {
    '未授权访问': '检测到非授权用户尝试访问系统资源',
    '敏感数据操作': '用户对敏感数据进行了异常操作',
    '异常登录行为': '检测到可疑的用户登录行为',
    '权限提升尝试': '用户尝试获取更高权限访问',
    '数据泄露风险': '系统检测到潜在的数据泄露风险',
    '系统漏洞': '发现系统存在安全漏洞',
    '其他告警': '其他类型的安全告警'
  };
  
  return descriptions[type] || '未知类型告警';
};

// 生成风险分布数据
export const generateRiskDistributionData = (timeRange: TimeRange) => {
  let days = 0;
  let step = 0;
  
  switch (timeRange) {
    case 'day':
      days = 24;
      step = 1;
      break;
    case 'week':
      days = 7;
      step = 1;
      break;
    case 'month':
      days = 30;
      step = 1;
      break;
  }
  
  const xAxis: string[] = [];
  const series: { name: string; data: number[] }[] = [
    { name: '高风险', data: [] },
    { name: '中风险', data: [] },
    { name: '低风险', data: [] }
  ];
  
  // 生成时间轴
  for (let i = 0; i < days; i += step) {
    if (timeRange === 'day') {
      xAxis.push(`${i}:00`);
    } else if (timeRange === 'week') {
      const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      xAxis.push(days[i]);
    } else {
      xAxis.push(`${i + 1}日`);
    }
    
    // 生成数据
    series[0].data.push(Math.floor(Math.random() * 20) + 5);
    series[1].data.push(Math.floor(Math.random() * 30) + 10);
    series[2].data.push(Math.floor(Math.random() * 40) + 15);
  }
  
  return {
    xAxis,
    series
  };
};

// 资产流数据
export const assetFlowData: AssetFlowData = {
  nodes: [
    { id: 'app1', name: '财务管理系统', type: 'application', risk: 'medium' },
    { id: 'app2', name: '人力资源系统', type: 'application', risk: 'low' },
    { id: 'app3', name: '客户关系管理', type: 'application', risk: 'high' },
    { id: 'app4', name: '数据分析平台', type: 'application', risk: 'low' },
    { id: 'user1', name: '研发部用户', type: 'user', risk: 'low' },
    { id: 'user2', name: '财务部用户', type: 'user', risk: 'medium' },
    { id: 'user3', name: '市场部用户', type: 'user', risk: 'high' },
    { id: 'service1', name: '数据库服务', type: 'service', risk: 'medium' },
    { id: 'service2', name: 'API服务', type: 'service', risk: 'low' },
    { id: 'service3', name: '身份认证服务', type: 'service', risk: 'high' },
    { id: 'resource1', name: '财务数据', type: 'resource', risk: 'high' },
    { id: 'resource2', name: '人员数据', type: 'resource', risk: 'medium' },
    { id: 'resource3', name: '客户数据', type: 'resource', risk: 'high' },
    { id: 'resource4', name: '分析数据', type: 'resource', risk: 'low' },
  ],
  links: [
    { source: 'user1', target: 'app1', value: 8, risk: 'low' },
    { source: 'user1', target: 'app2', value: 10, risk: 'low' },
    { source: 'user1', target: 'app4', value: 14, risk: 'low' },
    { source: 'user2', target: 'app1', value: 16, risk: 'medium' },
    { source: 'user2', target: 'app3', value: 5, risk: 'high' },
    { source: 'user3', target: 'app3', value: 18, risk: 'high' },
    { source: 'user3', target: 'app4', value: 8, risk: 'medium' },
    { source: 'app1', target: 'service1', value: 12, risk: 'medium' },
    { source: 'app1', target: 'service3', value: 7, risk: 'high' },
    { source: 'app2', target: 'service1', value: 9, risk: 'low' },
    { source: 'app2', target: 'service2', value: 8, risk: 'low' },
    { source: 'app3', target: 'service1', value: 10, risk: 'high' },
    { source: 'app3', target: 'service2', value: 6, risk: 'medium' },
    { source: 'app3', target: 'service3', value: 9, risk: 'high' },
    { source: 'app4', target: 'service2', value: 11, risk: 'low' },
    { source: 'service1', target: 'resource1', value: 14, risk: 'high' },
    { source: 'service1', target: 'resource2', value: 12, risk: 'medium' },
    { source: 'service1', target: 'resource3', value: 8, risk: 'high' },
    { source: 'service2', target: 'resource2', value: 7, risk: 'low' },
    { source: 'service2', target: 'resource4', value: 11, risk: 'low' },
    { source: 'service3', target: 'resource1', value: 6, risk: 'high' },
    { source: 'service3', target: 'resource3', value: 9, risk: 'high' },
  ]
};

// 资产访问关系图数据
export const assetFlowChartData = {
  nodes: [
    // 应用节点
    {
      id: 'app1',
      type: 'application',
      position: { x: 100, y: 80 },
      data: { 
        label: '财务管理系统', 
        details: '数据量: 9,865', 
        type: 'application' 
      }
    },
    {
      id: 'app2',
      type: 'application',
      position: { x: 100, y: 180 },
      data: { 
        label: '人力资源系统', 
        details: '数据量: 8,743', 
        type: 'application' 
      }
    },
    {
      id: 'app3',
      type: 'application',
      position: { x: 100, y: 280 },
      data: { 
        label: '客户关系管理', 
        details: '数据量: 7,654', 
        type: 'application' 
      }
    },
    {
      id: 'app4',
      type: 'application',
      position: { x: 100, y: 380 },
      data: { 
        label: '数据分析平台', 
        details: '数据量: 6,287', 
        type: 'application' 
      }
    },
    {
      id: 'app5',
      type: 'application',
      position: { x: 100, y: 480 },
      data: { 
        label: '供应链管理系统', 
        details: '数据量: 5,932', 
        type: 'application' 
      }
    },
    
    // 用户节点
    {
      id: 'user1',
      type: 'user',
      position: { x: 350, y: 50 },
      data: { 
        label: '张三', 
        details: '研发部', 
        type: 'user' 
      }
    },
    {
      id: 'user2',
      type: 'user',
      position: { x: 350, y: 150 },
      data: { 
        label: '李四', 
        details: '财务部', 
        type: 'user' 
      }
    },
    {
      id: 'user3',
      type: 'user',
      position: { x: 350, y: 250 },
      data: { 
        label: '王五', 
        details: '市场部', 
        type: 'user' 
      }
    },
    {
      id: 'user4',
      type: 'user',
      position: { x: 350, y: 350 },
      data: { 
        label: '赵六', 
        details: '人力资源部', 
        type: 'user' 
      }
    },
    {
      id: 'user5',
      type: 'user',
      position: { x: 350, y: 450 },
      data: { 
        label: '钱七', 
        details: '销售部', 
        type: 'user' 
      }
    },
    
    // 告警节点
    {
      id: 'alert1',
      type: 'alert',
      position: { x: 600, y: 100 },
      data: { 
        label: '异常登录', 
        details: '可疑IP访问', 
        type: 'alert' 
      }
    },
    {
      id: 'alert2',
      type: 'alert',
      position: { x: 600, y: 200 },
      data: { 
        label: '批量导出', 
        details: '敏感数据', 
        type: 'alert' 
      }
    },
    {
      id: 'alert3',
      type: 'alert',
      position: { x: 600, y: 300 },
      data: { 
        label: '非法访问', 
        details: '越权操作', 
        type: 'alert' 
      }
    },
    {
      id: 'alert4',
      type: 'alert',
      position: { x: 600, y: 400 },
      data: { 
        label: '频繁查询', 
        details: '短时多次访问', 
        type: 'alert' 
      }
    }
  ],
  edges: [
    // 应用到用户的连线
    {
      id: 'e-app1-user1',
      source: 'app1',
      target: 'user1',
      animated: true,
      type: 'default',
      style: { stroke: '#ff8c00', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ff8c00',
      },
      label: 'IP: 192.168.1.1',
      labelStyle: { fill: '#666', fontWeight: 500, fontSize: 10 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    },
    {
      id: 'e-app1-user2',
      source: 'app1',
      target: 'user2',
      animated: true,
      type: 'default',
      style: { stroke: '#ffa500', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ffa500',
      },
      label: 'IP: 192.168.1.100',
      labelStyle: { fill: '#666', fontWeight: 500, fontSize: 10 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    },
    {
      id: 'e-app2-user1',
      source: 'app2',
      target: 'user1',
      animated: true,
      type: 'default',
      style: { stroke: '#ffa500', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ffa500',
      },
      label: 'IP: 192.168.2.45',
      labelStyle: { fill: '#666', fontWeight: 500, fontSize: 10 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    },
    {
      id: 'e-app2-user2',
      source: 'app2',
      target: 'user2',
      animated: true,
      type: 'default',
      style: { stroke: '#ff4500', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ff4500',
      },
      label: 'IP: 10.0.0.15',
      labelStyle: { fill: '#666', fontWeight: 500, fontSize: 10 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    },
    {
      id: 'e-app3-user2',
      source: 'app3',
      target: 'user2',
      animated: true,
      type: 'default',
      style: { stroke: '#008000', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#008000',
      },
      label: 'IP: 172.16.5.87',
      labelStyle: { fill: '#666', fontWeight: 500, fontSize: 10 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    },
    {
      id: 'e-app3-user3',
      source: 'app3',
      target: 'user3',
      animated: true,
      type: 'default',
      style: { stroke: '#ffa500', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ffa500',
      },
      label: 'IP: 192.168.3.12',
      labelStyle: { fill: '#666', fontWeight: 500, fontSize: 10 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    },
    {
      id: 'e-app4-user3',
      source: 'app4',
      target: 'user3',
      animated: true,
      type: 'default',
      style: { stroke: '#ff8c00', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ff8c00',
      },
      label: 'IP: 192.168.4.25',
      labelStyle: { fill: '#666', fontWeight: 500, fontSize: 10 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    },
    {
      id: 'e-app4-user4',
      source: 'app4',
      target: 'user4',
      animated: true,
      type: 'default',
      style: { stroke: '#008000', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#008000',
      }
    },
    {
      id: 'e-app5-user4',
      source: 'app5',
      target: 'user4',
      animated: true,
      type: 'default',
      style: { stroke: '#ffa500', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ffa500',
      }
    },
    {
      id: 'e-app5-user5',
      source: 'app5',
      target: 'user5',
      animated: true,
      type: 'default',
      style: { stroke: '#ff8c00', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ff8c00',
      },
      label: 'IP: 10.10.5.89',
      labelStyle: { fill: '#666', fontWeight: 500, fontSize: 10 },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    },
    
    // 告警到节点的连线
    {
      id: 'e-alert1-app1',
      source: 'alert1',
      target: 'app1',
      type: 'default',
      style: { stroke: '#ff4500', strokeWidth: 2, strokeDasharray: '5 5' }
    },
    {
      id: 'e-alert1-user1',
      source: 'alert1',
      target: 'user1',
      type: 'default',
      style: { stroke: '#ff8c00', strokeWidth: 2, strokeDasharray: '5 5' }
    },
    {
      id: 'e-alert2-app2',
      source: 'alert2',
      target: 'app2',
      type: 'default',
      style: { stroke: '#ff8c00', strokeWidth: 2, strokeDasharray: '5 5' }
    },
    {
      id: 'e-alert2-user2',
      source: 'alert2',
      target: 'user2',
      type: 'default',
      style: { stroke: '#ff4500', strokeWidth: 2, strokeDasharray: '5 5' }
    },
    {
      id: 'e-alert3-app3',
      source: 'alert3',
      target: 'app3',
      type: 'default',
      style: { stroke: '#ffa500', strokeWidth: 2, strokeDasharray: '5 5' }
    },
    {
      id: 'e-alert3-user3',
      source: 'alert3',
      target: 'user3',
      type: 'default',
      style: { stroke: '#ff8c00', strokeWidth: 2, strokeDasharray: '5 5' }
    },
    {
      id: 'e-alert4-app5',
      source: 'alert4',
      target: 'app5',
      type: 'default',
      style: { stroke: '#ff8c00', strokeWidth: 2, strokeDasharray: '5 5' }
    }
  ]
};

// 获取指定图表数据
export const getChartData = (chartId: ChartId, timeRange: TimeRange) => {
  switch (chartId) {
    case 'businessTrend':
      return generateBusinessTrendData(timeRange);
    case 'alarmType':
      return generateAlarmTypeData(timeRange);
    case 'riskDistribution':
      return generateRiskDistributionData(timeRange);
    default:
      return null;
  }
};

// 资产列表数据
export const assetListData = [
  {
    id: '1',
    name: '财务管理系统',
    type: '应用系统',
    level: '核心',
    department: '财务部',
    ipAddress: '192.168.1.10',
    status: 'normal',
    alertCount: 0,
  },
  {
    id: '2',
    name: '人力资源系统',
    type: '应用系统',
    level: '重要',
    department: '人力资源部',
    ipAddress: '192.168.1.11',
    status: 'warning',
    alertCount: 2,
  },
  {
    id: '3',
    name: '销售管理系统',
    type: '应用系统',
    level: '一般',
    department: '销售部',
    ipAddress: '192.168.1.12',
    status: 'error',
    alertCount: 5,
  },
  {
    id: '4',
    name: '客户关系管理系统',
    type: '应用系统',
    level: '重要',
    department: '市场部',
    ipAddress: '192.168.1.13',
    status: 'normal',
    alertCount: 0,
  },
  {
    id: '5',
    name: '供应链管理系统',
    type: '应用系统',
    level: '核心',
    department: '运营部',
    ipAddress: '192.168.1.14',
    status: 'normal',
    alertCount: 1,
  },
  {
    id: '6',
    name: '数据库服务器',
    type: '服务器',
    level: '核心',
    department: 'IT部',
    ipAddress: '192.168.1.100',
    status: 'normal',
    alertCount: 0,
  },
  {
    id: '7',
    name: '应用服务器1',
    type: '服务器',
    level: '重要',
    department: 'IT部',
    ipAddress: '192.168.1.101',
    status: 'normal',
    alertCount: 0,
  },
  {
    id: '8',
    name: '应用服务器2',
    type: '服务器',
    level: '重要',
    department: 'IT部',
    ipAddress: '192.168.1.102',
    status: 'warning',
    alertCount: 1,
  },
];

// 资产详情数据
export const assetDetailData = {
  basic: {
    id: '1',
    name: '财务管理系统',
    type: '应用系统',
    level: '核心',
    department: '财务部',
    manager: '李明',
    description: '公司核心财务管理系统，包含账务管理、财务报表、工资核算等功能',
    createTime: '2022-01-10',
    updateTime: '2023-11-15',
  },
  technical: {
    ipAddress: '192.168.1.10',
    domain: 'finance.internal.company.com',
    deployEnv: '生产环境',
    serverInfo: 'Linux CentOS 7.9',
    databaseInfo: 'MySQL 8.0',
    framework: 'Spring Boot 2.7.0',
    ports: '8080, 8443',
  },
  security: {
    securityLevel: 'A级',
    lastScanTime: '2023-11-28 14:30:00',
    vulnerabilityCount: {
      high: 0,
      medium: 2,
      low: 5,
    },
    securityMeasures: [
      'WAF防护',
      '定期漏洞扫描',
      '数据加密传输',
      '访问控制',
    ],
    complianceStatus: '合规',
    certificateInfo: {
      hasSSL: true,
      issuer: 'DigiCert Inc',
      expireDate: '2024-06-15',
    },
  },
  operation: {
    status: 'running',
    uptime: '99.98%',
    maintainPeriod: '每月第一个周日凌晨2点-6点',
    lastMaintainTime: '2023-11-05 02:00:00',
    performanceMetrics: {
      cpu: '45%',
      memory: '62%',
      diskUsage: '58%',
      responseTime: '180ms',
    },
    backupStrategy: '每日增量备份，每周全量备份',
    lastBackupTime: '2023-11-29 01:00:00',
  },
};

// 资产关系图数据
export const assetRelationNodes: Node[] = [
  {
    id: 'app1',
    type: 'application',
    position: { x: 250, y: 100 },
    data: { 
      label: '财务管理系统', 
      details: '核心系统', 
      type: 'application' 
    }
  },
  {
    id: 'app2',
    type: 'application',
    position: { x: 250, y: 300 },
    data: { 
      label: '人力资源系统', 
      details: '重要系统', 
      type: 'application' 
    }
  },
  {
    id: 'user1',
    type: 'user',
    position: { x: 50, y: 200 },
    data: { 
      label: '财务部用户组', 
      details: '15名用户', 
      type: 'user' 
    }
  },
  {
    id: 'user2',
    type: 'user',
    position: { x: 50, y: 350 },
    data: { 
      label: '人力资源部用户组', 
      details: '12名用户', 
      type: 'user' 
    }
  },
  {
    id: 'server1',
    type: 'application',
    position: { x: 450, y: 150 },
    data: { 
      label: '应用服务器1', 
      details: 'IP: 192.168.1.101', 
      type: 'application' 
    }
  },
  {
    id: 'db1',
    type: 'application',
    position: { x: 450, y: 250 },
    data: { 
      label: '数据库服务器', 
      details: 'IP: 192.168.1.100', 
      type: 'application' 
    }
  },
  {
    id: 'alert1',
    type: 'alert',
    position: { x: 650, y: 200 },
    data: { 
      label: '安全告警', 
      details: '数据库异常访问', 
      type: 'alert' 
    }
  }
];

export const assetRelationEdges: Edge[] = [
  {
    id: 'e1',
    source: 'user1',
    target: 'app1',
    animated: true,
    style: { stroke: '#2563eb', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#2563eb',
    },
    label: '访问',
  },
  {
    id: 'e2',
    source: 'user2',
    target: 'app2',
    animated: true,
    style: { stroke: '#2563eb', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#2563eb',
    },
    label: '访问',
  },
  {
    id: 'e3',
    source: 'app1',
    target: 'server1',
    animated: false,
    style: { stroke: '#4b5563', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#4b5563',
    },
    label: '部署',
  },
  {
    id: 'e4',
    source: 'app1',
    target: 'db1',
    animated: false,
    style: { stroke: '#4b5563', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#4b5563',
    },
    label: '存储数据',
  },
  {
    id: 'e5',
    source: 'app2',
    target: 'db1',
    animated: false,
    style: { stroke: '#4b5563', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#4b5563',
    },
    label: '存储数据',
  },
  {
    id: 'e6',
    source: 'db1',
    target: 'alert1',
    animated: true,
    style: { stroke: '#dc2626', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#dc2626',
    },
    label: '产生告警',
  }
]; 