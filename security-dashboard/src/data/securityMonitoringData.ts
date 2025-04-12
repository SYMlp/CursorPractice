// 资产统计数据
export const assetStats = [
  { label: '数据总量', value: '2,4324' },
  { label: '数据分类数', value: '322' },
  { label: '数据分级数', value: '322' }
];

// 风险最多业务资源TOP
export const riskResourceData = [
  { id: 1, name: '数据资源名称', value: '50' },
  { id: 2, name: '数据资源名称', value: '40' },
  { id: 3, name: '数据资源名称', value: '30' },
  { id: 4, name: '数据资源名称', value: '20' },
  { id: 5, name: '数据资源名称', value: '10' }
];

// 高数据使用风险最多人TOP
export const highRiskUserData = [
  { id: 1, name: '张三', value: '64,565' },
  { id: 2, name: '历史', value: '64,565' },
  { id: 3, name: '无方网', value: '64,565' },
  { id: 4, name: '大德', value: '64,565' },
  { id: 5, name: '李德龙', value: '64,565' }
];

// 存在存储风险的数据资源TOP
export const storageRiskResourceData = [
  { id: 1, name: 'XX应用', risk: 'X盘中转站', action: '查看风险' },
  { id: 2, name: 'XX应用', risk: '备份失败', action: '查看风险' },
  { id: 3, name: 'XX应用', risk: '内存泄出', action: '查看风险' },
  { id: 4, name: 'XX应用', risk: 'CPU过载', action: '查看风险' },
  { id: 5, name: 'XX应用', risk: '备份失败', action: 'CPU过载' }
];

// 存在防护能力缺失的数据资源TOP
export const lackProtectionResourceData = [
  { id: 1, name: 'XX应用', protection: '权限管控, 多维认证' },
  { id: 2, name: 'XX应用', protection: '权限管控' },
  { id: 3, name: 'XX应用', protection: 'IDS, IPS' },
  { id: 4, name: 'XX应用', protection: '防病毒, 权限管理' },
  { id: 5, name: 'XX应用', protection: '权限管控' }
];

// 最常发生的风险类型趋势
export const riskTrendData = {
  xAxis: ['10:00', '10:30', '11:00', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
  series: [
    {
      name: '风险类型1',
      data: [30, 15, 12, 20, 25, 30, 40, 35, 30, 20, 15, 20, 25],
      color: '#1E90FF'
    },
    {
      name: '风险类型2',
      data: [15, 20, 25, 30, 20, 15, 30, 45, 40, 35, 30, 10, 25],
      color: '#32CD32'
    },
    {
      name: '风险类型3',
      data: [25, 30, 15, 25, 10, 50, 60, 40, 35, 30, 45, 40, 30],
      color: '#FFA500'
    }
  ]
}; 