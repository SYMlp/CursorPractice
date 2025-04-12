// 资产统计数据
export const assetStatsData = {
  stats: [
    { label: '总资产数', value: '2.4324' },
    { label: '应用资产', value: '322' },
    { label: '安全资产', value: '322' }
  ],
  description: '展示一段说明词，检讨应用的关系图，包含访问者（用户）通过什么IP访问业务应用（应用名称），每一个小区域，展示实时告警信息（实时活动）》包含访问词、被访问应用、风险类型，点击可跳转到告警详情信息'
};

// 资产交互量排行TOP
export const assetInteractionRankData = [
  { id: 1, name: 'OA系统', value: '64,565' },
  { id: 2, name: '智管理', value: '64,565' },
  { id: 3, name: '智管理', value: '64,565' },
  { id: 4, name: '智管理', value: '64,565' },
  { id: 5, name: '智管理', value: '64,565' }
];

// 风险最多业务应用TOP
export const riskBusinessRankData = [
  { id: 1, name: '业务应用1', value: '50%' },
  { id: 2, name: '业务应用2', value: '40%' },
  { id: 3, name: '业务应用3', value: '30%' },
  { id: 4, name: '业务应用4', value: '20%' },
  { id: 5, name: '业务应用5', value: '10%' }
];

// 探索登录用户TOP数据
export const loginUserData = {
  categories: ['一类', '二类', '三类', '四类', '五类', '六类', '王磊'],
  data: [80, 60, 50, 40, 30, 20, 10]
};

// 数据使用风险最多人员TOP
export const riskUserRankData = [
  { id: 1, name: '张三', value: '64,565' },
  { id: 2, name: '历史', value: '64,565' },
  { id: 3, name: '无头网', value: '64,565' },
  { id: 4, name: '大德', value: '64,565' },
  { id: 5, name: '李德龙', value: '64,565' }
];

// 业务行业分布数据
export const industryDistributionData = [
  { name: '类型一', value: 60 },
  { name: '类型二', value: 60 },
  { name: '类型三', value: 60 },
  { name: '类型四', value: 60 }
];

// 告警类型分布
export const securityDistributionData = [
  { name: '类型一', value: 60 },
  { name: '类型二', value: 60 },
  { name: '类型三', value: 60 },
  { name: '类型四', value: 60 }
];

// 业务态势历史趋势
export const businessTrendData = {
  xAxis: ['01/01', '01/03', '01/05', '01/07', '01/09', '01/11', '01/13', '01/15', '01/17', '01/19', '01/21', '01/23', '01/25'],
  data: [-30, -25, -15, -5, 0, 10, 15, 20, 15, 5, 0, -10, -15]
}; 