 // Corresponds to API: GET /platform/interface/overview
export const interfaceOverviewData = {
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
  
  // Corresponds potentially to GET /platform/interface/overview or a separate API
  export const interfaceSecurityDistributionData = [
    { name: '安全防护', value: 75.8, itemStyle: { color: '#3b82f6' } },
    { name: '中等风险', value: 14.2, itemStyle: { color: '#f59e0b' } },
    { name: '高风险', value: 10.0, itemStyle: { color: '#ef4444' } }
  ];
  