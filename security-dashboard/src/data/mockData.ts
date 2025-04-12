// 资源管理数据
export const resourceManagementData = {
  count: 123456,
  metrics: [
    { label: '安全防护率', value: 75.0, color: '#3b82f6' },
    { label: '标准化覆盖', value: 95.0, color: '#f59e0b' }
  ],
  growthItems: [
    { label: '周比上周', value: 8, isUp: true },
    { label: '月比上月', value: 5, isUp: true }
  ]
};

// 资源类型数据
export const resourceTypesData = [
  { title: '核心资产', percentage: 82.5, color: '#3b82f6' },
  { title: '对外资产', percentage: 45.0, color: '#3b82f6' },
  { title: '内部资产', percentage: 79.8, color: '#3b82f6' },
  { title: '云上资产', percentage: 43.2, color: '#3b82f6' },
  { title: 'API', percentage: 43.2, color: '#3b82f6' }
];

// 安全规则数据
export const securityRulesData = [
  { 
    title: '安全访问规则', 
    count: 512, 
    baseCount: 500, 
    todayCount: 12,
    color: '#3b82f6'
  },
  { 
    title: '安全防护规则', 
    count: 512, 
    baseCount: 500, 
    todayCount: 12,
    color: '#ef4444'
  },
  { 
    title: '安全检测规则', 
    count: 512, 
    baseCount: 500, 
    todayCount: 12,
    color: '#8b5cf6'
  },
  { 
    title: '安全通信规则', 
    count: 512, 
    baseCount: 500, 
    todayCount: 12,
    color: '#f59e0b'
  },
  { 
    title: '安全容器规则', 
    count: 512, 
    baseCount: 500, 
    todayCount: 12,
    color: '#3b82f6'
  }
];

// 接口管理数据
export const interfaceManagementData = {
  count: 123456,
  securityRate: 82.5,
  metrics: [
    { value: 75751234 }, // 高频接口数量
    { value: 75751234 }  // 北向接口数量
  ],
  details: [
    { label: '安全全防护保证接口', count: 160, percentage: 75.8, color: '#3b82f6' },
    { label: '安全管理权限及下行接口', count: 40, percentage: 25, color: '#10b981' },
    { label: '敏感安全访问管理接口', count: 60, percentage: 25, color: '#8b5cf6' },
    { label: '任务分发及资源接口', count: 40, percentage: 25, color: '#f59e0b' },
    { label: '主机行为及功能接口', count: 60, percentage: 25, color: '#06b6d4' },
    { label: '任务执行反馈接口', count: 40, percentage: 25, color: '#ec4899' },
    { label: '任务执行结果处理接口', count: 40, percentage: 25, color: '#14b8a6' },
    { label: '资源探索关联服务', count: 40, percentage: 25, color: '#6366f1' }
  ]
};

// 时间序列数据
export const timeSeriesData = {
  xAxisData: ['01-03', '01-04', '01-05', '01-06', '01-07', '01-08'],
  series: {
    // 面向接口数据量
    interfaceData: [
      {
        name: '授权接口数量',
        data: [2000, 8000, 3500, 5000, 7000, 4000],
        color: '#3b82f6'
      },
      {
        name: '敏感资源接口',
        data: [6000, 4000, 2000, 4000, 8000, 7000],
        color: '#10b981'
      },
      {
        name: '未知安全接口',
        data: [1000, 3000, 1500, 2000, 4000, 6000],
        color: '#f59e0b'
      }
    ],
    // 识别服务接口数据量
    identificationData: [
      {
        name: '识别服务',
        data: [2000, 4000, 1500, 2000, 6000, 7000],
        color: '#f59e0b',
        areaStyle: true
      }
    ],
    // 防护服务数据量
    protectionData: [
      {
        name: '防护服务',
        data: [2000, 8000, 3000, 6000, 4000, 5000],
        color: '#3b82f6'
      }
    ],
    // 检测服务接口数据量
    detectionData: [
      {
        name: '检测服务',
        data: [1000, 2000, 2500, 3000, 5000, 6000],
        color: '#f97316',
        areaStyle: true
      }
    ],
    // 响应服务接口数据量
    responseData: [
      {
        name: '响应服务',
        data: [2000, 8000, 2000, 5000, 3000, 4000],
        color: '#10b981'
      }
    ]
  }
};

// 接口安全分布
export const interfaceSecurityDistribution = [
  { name: '安全防护', value: 75.8, itemStyle: { color: '#3b82f6' } },
  { name: '中等风险', value: 14.2, itemStyle: { color: '#f59e0b' } },
  { name: '高风险', value: 10.0, itemStyle: { color: '#ef4444' } }
]; 