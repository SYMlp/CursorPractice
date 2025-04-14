// 资源管理数据
export const resourceManagementData = {
  count: 123456,
  metrics: [
    { label: '身份标识率', value: 75.0, color: '#4096ff' },
    { label: '标准化属性', value: 65.2, color: '#f59e0b' },
    { label: '安全防护率', value: 42.8, color: '#f5222d' }
  ],
  growthItems: [
    { label: '同比上周', value: 8, isUp: true },
    { label: '同比昨日', value: 3, isUp: false }
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
  securityRate: 75.8,
  publishRate: 82.5, // 接口发布率
  callbackRate: 82.5,
  metrics: [
    { value: 751234, label: '南向接口数据量', color: '#8b5cf6' }, // 南向接口数据量
    { value: 751234, label: '北向接口流量', color: '#f97316' }    // 北向接口流量
  ],
  // 接口分类数据 - 按照已发布接口的类型分类
  publishedInterfaces: [
    { label: '安全实时防护接口', count: 160, percentage: 35.8, color: '#3b82f6' },
    { label: '安全管理权限接口', count: 60, percentage: 15.2, color: '#10b981' },
    { label: '敏感资源访问接口', count: 75, percentage: 12.8, color: '#8b5cf6' },
    { label: '任务分发管理接口', count: 55, percentage: 10.5, color: '#f59e0b' },
    { label: '主机行为监控接口', count: 42, percentage: 8.7, color: '#06b6d4' },
    { label: '任务执行反馈接口', count: 36, percentage: 7.5, color: '#ec4899' },
    { label: '数据处理接口', count: 26, percentage: 5.2, color: '#14b8a6' },
    { label: '资源探索服务接口', count: 20, percentage: 4.3, color: '#6366f1' }
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

// 安全密码规则数据
export const passwordRulesData = [
  { 
    title: '复杂度规则', 
    count: 86, 
    baseCount: 80, 
    todayCount: 6,
    color: '#3b82f6'
  },
  { 
    title: '更新周期规则', 
    count: 42, 
    baseCount: 40, 
    todayCount: 2,
    color: '#ef4444'
  },
  { 
    title: '历史复用规则', 
    count: 38, 
    baseCount: 35, 
    todayCount: 3,
    color: '#8b5cf6'
  },
  { 
    title: '密码验证规则', 
    count: 56, 
    baseCount: 50, 
    todayCount: 6,
    color: '#f59e0b'
  },
  { 
    title: '强制重置规则', 
    count: 24, 
    baseCount: 20, 
    todayCount: 4,
    color: '#10b981'
  }
]; 