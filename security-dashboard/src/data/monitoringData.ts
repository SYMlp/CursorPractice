// 时间数据
export const timeData = {
  xAxis: ['01:00', '01:10', '01:20', '01:30', '01:40', '01:50'],
};

// 顶部指标卡数据
export const metricCardsData = [
  {
    title: '服务注册总数',
    value: '12,345',
    color: 'bg-emerald-500'
  },
  {
    title: '接口暴露',
    value: '0',
    color: 'bg-blue-500'
  },
  {
    title: '接口调用链路',
    value: '0',
    color: 'bg-blue-500'
  },
  {
    title: '任务状态详情',
    value: '0',
    color: 'bg-orange-500'
  },
  {
    title: '任务执行时间序列',
    value: '0',
    color: 'bg-blue-500'
  },
  {
    title: '服务注册总数',
    value: '12,345',
    color: 'bg-emerald-500'
  }
];

// TPS数据
export const tpsData = {
  series: [
    {
      name: '每秒钟平均TPS',
      data: [0.2, 0.4, 0.2, 0.15, 0.6, 0.8],
      color: '#FFCC00'
    }
  ]
};

// 并发连接数据
export const connectionData = {
  series: [
    {
      name: '网络连接数',
      data: [0.3, 0.4, 0.8, 0.35, 0.6, 0.4],
      color: '#3B82F6'
    }
  ]
};

// 接口应用层数据
export const applicationData = {
  series: [
    {
      name: '接口查询',
      data: [0.3, 0.7, 0.5, 0.2, 0.4, 0.6],
      color: '#3B82F6' 
    },
    {
      name: '安全检测',
      data: [0.5, 0.6, 0.7, 0.4, 0.8, 0.6],
      color: '#10B981'
    },
    {
      name: '配置更新',
      data: [0.1, 0.3, 0.2, 0.1, 0.4, 0.5],
      color: '#F59E0B'
    }
  ]
};

// 安全检测点数据
export const securityCheckpointData = {
  series: [
    {
      name: '防护点',
      data: [0.2, 0.4, 0.6, 0.3, 0.4, 0.5],
      color: '#3B82F6'
    },
    {
      name: '检测点',
      data: [0.1, 0.3, 0.2, 0.1, 0.5, 0.6],
      color: '#EF4444'
    }
  ]
}; 