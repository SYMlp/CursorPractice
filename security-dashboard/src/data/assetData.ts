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

// 扩展模拟数据 - 数据交互量应用TOP
export const extendedAssetInteractionRankData = [
  { id: 1, name: 'OA系统', value: '64,565' },
  { id: 2, name: '智慧搜', value: '64,565' },
  { id: 3, name: '智慧搜', value: '64,565' },
  { id: 4, name: '智慧搜', value: '64,565' },
  { id: 5, name: '智慧搜', value: '64,565' },
  { id: 6, name: '财务系统', value: '53,421' },
  { id: 7, name: '人事管理', value: '48,965' },
  { id: 8, name: '客户服务', value: '42,378' },
  { id: 9, name: '数据分析', value: '38,712' },
  { id: 10, name: '业务管理', value: '35,648' },
  { id: 11, name: '资源规划', value: '31,254' },
  { id: 12, name: '项目管理', value: '28,763' }
];

// 风险最多业务应用TOP
export const riskBusinessRankData = [
  { id: 1, name: '业务应用1', value: '50%' },
  { id: 2, name: '业务应用2', value: '40%' },
  { id: 3, name: '业务应用3', value: '30%' },
  { id: 4, name: '业务应用4', value: '20%' },
  { id: 5, name: '业务应用5', value: '10%' }
];

// 扩展模拟数据 - 风险最多业务应用TOP
export const extendedRiskBusinessRankData = [
  { id: 1, name: '业务应用名称', value: '50' },
  { id: 2, name: '业务应用名称', value: '40' },
  { id: 3, name: '业务应用名称', value: '30' },
  { id: 4, name: '业务应用名称', value: '20' },
  { id: 5, name: '业务应用名称', value: '10' },
  { id: 6, name: '数据管理平台', value: '9' },
  { id: 7, name: '财务报表系统', value: '8' },
  { id: 8, name: '客户信息管理', value: '7' },
  { id: 9, name: '权限管理系统', value: '6' },
  { id: 10, name: '日志审计平台', value: '5' },
  { id: 11, name: '安全监控系统', value: '4' },
  { id: 12, name: '资源管理平台', value: '3' }
];

// 探索登录用户TOP数据
export const loginUserData = {
  categories: ['一类', '二类', '三类', '四类', '五类', '六类', '王磊'],
  data: [80, 60, 50, 40, 30, 20, 10]
};

// 扩展模拟数据 - 频繁登录用户TOP
export const extendedLoginUserData = {
  categories: ['一鸣', '张三', '三月', '李四', '周五', '赵柳', '王强', '刘洋', '林明', '陈华', '王伟', '杨光'],
  data: [80, 62, 52, 45, 38, 30, 25, 20, 15, 12, 10, 8]
};

// 数据使用风险最多人员TOP
export const riskUserRankData = [
  { id: 1, name: '张三', value: '64,565' },
  { id: 2, name: '历史', value: '64,565' },
  { id: 3, name: '无头网', value: '64,565' },
  { id: 4, name: '大德', value: '64,565' },
  { id: 5, name: '李德龙', value: '64,565' }
];

// 扩展模拟数据 - 数据使用风险最多人TOP
export const extendedRiskUserRankData = [
  { id: 1, name: '张三', value: '64,565' },
  { id: 2, name: '历史', value: '64,565' },
  { id: 3, name: '无为网', value: '64,565' },
  { id: 4, name: '大德', value: '64,565' },
  { id: 5, name: '李德龙', value: '64,565' },
  { id: 6, name: '王明', value: '58,432' },
  { id: 7, name: '陈亮', value: '52,876' },
  { id: 8, name: '刘浩', value: '48,321' },
  { id: 9, name: '黄伟', value: '43,654' },
  { id: 10, name: '吴强', value: '39,876' },
  { id: 11, name: '马超', value: '35,432' },
  { id: 12, name: '孙亮', value: '32,145' }
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

// 扩展模拟数据 - 告警类型分布
export const extendedSecurityDistributionData = [
  { name: '类型一', value: 60, itemStyle: { color: '#8B5CF6' } },
  { name: '类型二', value: 60, itemStyle: { color: '#EC4899' } },
  { name: '类型三', value: 60, itemStyle: { color: '#3B82F6' } },
  { name: '类型四', value: 60, itemStyle: { color: '#F59E0B' } },
  { name: '类型五', value: 60, itemStyle: { color: '#10B981' } },
  { name: '类型六', value: 60, itemStyle: { color: '#6366F1' } }
];

// 业务态势历史趋势
export const businessTrendData = {
  xAxis: ['01/01', '01/03', '01/05', '01/07', '01/09', '01/11', '01/13', '01/15', '01/17', '01/19', '01/21', '01/23', '01/25'],
  data: [-30, -25, -15, -5, 0, 10, 15, 20, 15, 5, 0, -10, -15]
};

export const riskTypeData = {
  xAxis: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
  series: [
    {
      name: '数据泄露风险',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
    {
      name: '越权访问风险',
      data: [20, 30, 25, 40, 39, 50, 60, 81, 115],
    },
    {
      name: '敏感数据滥用',
      data: [10, 20, 15, 30, 29, 40, 50, 71, 105],
    },
  ],
};

// 添加mock数据生成函数
export const generateMockChartData = (range: 'day' | 'week' | 'month') => {
  const baseData = {
    day: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    month: ['1日', '5日', '10日', '15日', '20日', '25日', '30日']
  };

  const generateRandomData = (base: number, range: number) => {
    return Array(7).fill(0).map(() => 
      Math.floor(base + Math.random() * range)
    );
  };

  // 生成业务趋势数据
  const businessData = generateRandomData(5, 40);
  businessData[0] = -30; // 确保有负值以保持图表风格
  
  return {
    xAxisData: baseData[range],
    series: {
      business: [{
        name: '访问量',
        data: businessData,
        color: '#3b82f6',
        areaStyle: true
      }],
      security: extendedSecurityDistributionData
    }
  };
}; 