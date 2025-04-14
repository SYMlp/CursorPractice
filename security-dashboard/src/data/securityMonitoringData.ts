// 资产统计数据
export const assetStats = [
  { label: '数据总量', value: '2,4324' },
  { label: '数据分类数', value: '322' },
  { label: '数据分级数', value: '8' }
];

// 风险最多业务资源TOP
export const riskResourceData = [
  { id: 1, name: '人口信息查询', value: '186', visits: '2345', risks: '186' },
  { id: 2, name: '企业信用查询', value: '142', visits: '1986', risks: '142' },
  { id: 3, name: '车辆违章查询', value: '98', visits: '1657', risks: '98' },
  { id: 4, name: '社保缴纳记录查询', value: '65', visits: '1234', risks: '65' },
  { id: 5, name: '公积金账户查询', value: '32', visits: '856', risks: '32' }
];

// 高数据使用风险最多人TOP
export const highRiskUserData = [
  { id: 1, name: '王铭俊', value: '64,565', visits: '10,245', sensitiveResources: '52', riskCount: '325' },
  { id: 2, name: '李欣怡', value: '64,565', visits: '9,876', sensitiveResources: '48', riskCount: '312' },
  { id: 3, name: '张伟翔', value: '64,565', visits: '8,532', sensitiveResources: '42', riskCount: '287' },
  { id: 4, name: '陈诗琪', value: '64,565', visits: '7,621', sensitiveResources: '39', riskCount: '254' },
  { id: 5, name: '刘浩宇', value: '64,565', visits: '6,987', sensitiveResources: '35', riskCount: '221' }
];

// 存在存储风险的数据资源TOP
export const storageRiskResourceData = [
  { 
    "id": 1, 
    "name": "人口信息查询", 
    "risk": ["存储空间不足", "备份文件损坏"],
    "riskTypeCount": "5",
    "riskCount": "186",
    "visits": "23,451"
  },
  { 
    "id": 2, 
    "name": "企业信用查询", 
    "risk": ["磁盘I/O错误", "备份超时"],
    "riskTypeCount": "4",
    "riskCount": "142",
    "visits": "19,872"
  },
  { 
    "id": 3, 
    "name": "车辆违章查询", 
    "risk": ["存储设备故障", "数据冗余不足"],
    "riskTypeCount": "3",
    "riskCount": "98",
    "visits": "16,583"
  },
  { 
    "id": 4, 
    "name": "社保信息查询", 
    "risk": ["存储容量告警", "数据恢复失败"],
    "riskTypeCount": "2",
    "riskCount": "65",
    "visits": "12,347"
  },
  { 
    "id": 5, 
    "name": "公积金查询服务", 
    "risk": ["存储介质老化", "数据碎片化严重"],
    "riskTypeCount": "2",
    "riskCount": "32",
    "visits": "8,569"
  }
];

// 存在防护能力缺失的数据资源TOP
interface LackProtectionResourceData {
  id: number;
  name: string;
  protection: string;
  visits?: string;  // 添加可选的访问量字段
}

export const lackProtectionResourceData: LackProtectionResourceData[] = [
  { id: 1, name: '人口信息查询系统', protection: '权限管控, 多维认证', visits: '23,451' },
  { id: 2, name: '企业信用公示平台', protection: '权限管控', visits: '19,872' },
  { id: 3, name: '车辆违章查询服务', protection: 'IDS, IPS', visits: '16,583' },
  { id: 4, name: '社保信息查询系统', protection: '防病毒, 权限管理', visits: '12,347' },
  { id: 5, name: '公积金查询服务', protection: '权限管控', visits: '8,569' }
];

// 最常发生的风险类型趋势
export const riskTrendData = {
  xAxis: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
  series: [
    {
      name: '数据泄露风险',
      data: [25, 15, 12, 20, 25, 30, 35, 30, 25, 20, 15, 20, 25, 20],
      color: '#1E90FF'
    },
    {
      name: '越权访问风险',
      data: [20, 25, 28, 25, 15, 40, 45, 35, 30, 35, 30, 25, 15, 10],
      color: '#32CD32'
    },
    {
      name: '敏感数据滥用',
      data: [30, 20, 15, 10, 20, 55, 45, 35, 30, 45, 40, 35, 45, 30],
      color: '#FFA500'
    }
  ]
}; 