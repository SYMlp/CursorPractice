// Placeholder for migrated monitoringData.ts content

// 指标卡片数据
export const metricCardsData = [
  {
    title: '服务器总数',
    value: '128',
    color: 'bg-blue-500',
    icon: 'server',
  },
  {
    title: '接口总数',
    value: '256',
    color: 'bg-green-500',
    icon: 'api',
  },
  {
    title: '连接总数',
    value: '512',
    color: 'bg-purple-500',
    icon: 'connection',
  },
  {
    title: '请求总数',
    value: '1024',
    color: 'bg-orange-500',
    icon: 'request',
  },
  {
    title: '响应总数',
    value: '1024',
    color: 'bg-red-500',
    icon: 'response',
  },
  {
    title: '监控总数',
    value: '64',
    color: 'bg-indigo-500',
    icon: 'monitor',
  },
]

// 时间数据
export const timeData = {
  day: {
    xAxis: [
      '00:00',
      '02:00',
      '04:00',
      '06:00',
      '08:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
      '24:00',
    ],
  },
  week: {
    xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
}

// TPS数据
export const tpsData = {
  day: {
    series: [
      {
        name: 'TPS',
        data: [120, 180, 150, 130, 190, 230, 250, 220, 200, 180, 160, 140, 130],
        color: '#3B82F6',
      },
    ],
  },
  week: {
    series: [
      {
        name: 'TPS',
        data: [180, 220, 190, 250, 210, 170, 200],
        color: '#3B82F6',
      },
    ],
  },
}

// 连接数数据
export const connectionData = {
  day: {
    series: [
      {
        name: '连接数',
        data: [500, 600, 550, 700, 800, 750, 900, 850, 750, 650, 600, 550, 500],
        color: '#10B981',
      },
    ],
  },
  week: {
    series: [
      {
        name: '连接数',
        data: [600, 700, 800, 750, 850, 700, 650],
        color: '#10B981',
      },
    ],
  },
}

// 应用层数据
export const applicationData = {
  day: {
    series: [
      {
        name: 'HTTP请求',
        data: [300, 350, 400, 380, 450, 500, 480, 520, 490, 460, 420, 380, 350],
        color: '#F59E0B',
      },
      {
        name: 'WebSocket连接',
        data: [150, 180, 200, 190, 220, 240, 230, 250, 240, 220, 200, 180, 170],
        color: '#8B5CF6',
      },
      {
        name: 'RPC调用',
        data: [80, 100, 120, 110, 130, 150, 140, 160, 150, 140, 120, 100, 90],
        color: '#EC4899',
      },
    ],
  },
  week: {
    series: [
      {
        name: 'HTTP请求',
        data: [380, 420, 450, 480, 440, 400, 420],
        color: '#F59E0B',
      },
      {
        name: 'WebSocket连接',
        data: [200, 220, 240, 230, 250, 220, 210],
        color: '#8B5CF6',
      },
      {
        name: 'RPC调用',
        data: [100, 120, 140, 130, 150, 120, 110],
        color: '#EC4899',
      },
    ],
  },
}

// 安全检测点数据
export const securityCheckpointData = {
  day: {
    series: [
      {
        name: '身份认证',
        data: [200, 250, 230, 280, 300, 290, 320, 310, 290, 270, 250, 230, 220],
        color: '#3B82F6',
      },
      {
        name: '访问控制',
        data: [150, 180, 170, 200, 220, 210, 240, 230, 220, 200, 190, 170, 160],
        color: '#10B981',
      },
      {
        name: '数据加密',
        data: [100, 120, 110, 130, 150, 140, 160, 150, 140, 130, 120, 110, 100],
        color: '#F59E0B',
      },
    ],
  },
  week: {
    series: [
      {
        name: '身份认证',
        data: [250, 280, 300, 290, 310, 270, 260],
        color: '#3B82F6',
      },
      {
        name: '访问控制',
        data: [180, 200, 220, 210, 230, 200, 190],
        color: '#10B981',
      },
      {
        name: '数据加密',
        data: [120, 130, 150, 140, 160, 130, 120],
        color: '#F59E0B',
      },
    ],
  },
}
