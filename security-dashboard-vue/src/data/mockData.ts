// Placeholder for migrated mockData.ts content

// 资源管理数据
export const resourceManagementData = {
  title: '资源管理', // Added title based on React Card usage
  total: 123456, // Changed from 'count' to 'total' based on React Card usage
  metrics: [
    { label: '身份标识率', value: 75.0, color: '#4096ff' },
    { label: '标准化属性', value: 65.2, color: '#f59e0b' },
    { label: '安全防护率', value: 42.8, color: '#f5222d' },
  ],
  growthItems: [
    { label: '同比上周', value: 8, isUp: true },
    { label: '同比昨日', value: 3, isUp: false },
  ],
}

// 资源类型数据
export const resourceTypesData = [
  // Added count based on Vue template usage
  { title: '核心资产', percentage: 82.5, color: '#3b82f6', count: 101864 },
  { title: '对外资产', percentage: 45.0, color: '#3b82f6', count: 55555 },
  { title: '内部资产', percentage: 79.8, color: '#3b82f6', count: 98518 },
  { title: '云上资产', percentage: 43.2, color: '#3b82f6', count: 53333 },
  { title: 'API', percentage: 43.2, color: '#3b82f6', count: 53333 },
]

// 安全规则数据
export const securityRulesData = [
  {
    title: '安全访问规则',
    total: 512,
    issuedCount: 500,
    revokedCount: 12,
    rules: [
      { name: '规则 A', enabled: true },
      { name: '规则 B', enabled: false },
    ],
    color: '#3b82f6',
  },
  {
    title: '安全防护规则',
    total: 512,
    issuedCount: 480,
    revokedCount: 32,
    rules: [{ name: '规则 C', enabled: true }],
    color: '#ef4444',
  },
  {
    title: '安全检测规则',
    total: 512,
    issuedCount: 510,
    revokedCount: 2,
    rules: [],
    color: '#8b5cf6',
  },
  {
    title: '安全通信规则',
    total: 512,
    issuedCount: 495,
    revokedCount: 17,
    rules: [{ name: '规则 D', enabled: true }],
    color: '#f59e0b',
  },
  {
    title: '安全容器规则',
    total: 512,
    issuedCount: 505,
    revokedCount: 7,
    rules: [{ name: '规则 E', enabled: true }],
    color: '#3b82f6',
  },
]

// 接口管理数据
export const interfaceManagementData = {
  title: '接口管理',
  total: 123456,
  publishRate: 82.5,
  metrics: [
    {
      value: 751234,
      label: '南向接口数据量',
      color: '#8b5cf6',
      iconPath: '/src/assets/icons/metrics/southbound.png',
    },
    {
      value: 751234,
      label: '北向接口流量',
      color: '#f97316',
      iconPath: '/src/assets/icons/metrics/northbound.png',
    },
  ],
}

// 保持 timeSeriesData 和 interfaceSecurityDistribution 不变，因为 PlatformOverview 不直接用它们
// export const timeSeriesData = { ... };
// export const interfaceSecurityDistribution = [ ... ];
// export const passwordRulesData = [ ... ]; // Not used in PlatformOverview
