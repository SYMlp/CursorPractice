import { RankingItem } from '../components/cards';

// 存在存储风险的数据资源TOP数据
export const storageRiskResourceTableData: RankingItem[] = [
  { id: 1, name: '人口信息数据库', riskValue: 186, risk: ['存储空间不足'], visits: '54,321', riskLevel: 'high' },
  { id: 2, name: '企业信用数据平台', riskValue: 142, risk: ['磁盘I/O错误'], visits: '47,852', riskLevel: 'high' },
  { id: 3, name: '车辆管理数据库', riskValue: 98, risk: ['存储设备故障'], visits: '43,765', riskLevel: 'medium' },
  { id: 4, name: '社保信息资源库', riskValue: 65, risk: ['数据恢复失败'], visits: '38,921', riskLevel: 'medium' },
  { id: 5, name: '公积金数据中心', riskValue: 58, risk: ['数据碎片化严重'], visits: '36,543', riskLevel: 'medium' },
  { id: 6, name: '医保服务数据库', riskValue: 47, risk: ['元数据丢失'], visits: '32,874', riskLevel: 'medium' },
  { id: 7, name: '税务数据资源库', riskValue: 39, risk: ['文件系统错误'], visits: '29,654', riskLevel: 'low' },
  { id: 8, name: '教育信息中心库', riskValue: 36, risk: ['存储性能下降'], visits: '27,543', riskLevel: 'low' },
  { id: 9, name: '银行账户数据库', riskValue: 32, risk: ['缓存失效'], visits: '25,432', riskLevel: 'low' },
  { id: 10, name: '不动产登记中心', riskValue: 29, risk: ['备份任务失败'], visits: '23,765', riskLevel: 'low' },
  { id: 11, name: '交通出行数据库', riskValue: 25, risk: ['存储架构老化'], visits: '21,654', riskLevel: 'low' },
  { id: 12, name: '食品安全数据库', riskValue: 22, risk: ['存储扩展受限'], visits: '19,876', riskLevel: 'low' },
  { id: 13, name: '居民健康档案库', riskValue: 19, risk: ['数据分区故障'], visits: '18,543', riskLevel: 'low' },
  { id: 14, name: '旅游资源数据库', riskValue: 17, risk: ['备份空间不足'], visits: '16,987', riskLevel: 'low' },
  { id: 15, name: '电子政务数据库', riskValue: 15, risk: ['存储结构异常'], visits: '15,432', riskLevel: 'low' },
];

// 存在防护能力缺失的数据资源TOP数据
export const protectionLackResourceTableData: RankingItem[] = [
  { id: 1, name: '人口信息查询系统', protectionValue: 4, protection: '权限管控缺失', visits: '54,321', protectionLevel: 'high' },
  { id: 2, name: '企业信用公示平台', protectionValue: 3, protection: '认证机制薄弱', visits: '47,852', protectionLevel: 'high' },
  { id: 3, name: '车辆违章查询服务', protectionValue: 3, protection: '缺少入侵检测', visits: '43,765', protectionLevel: 'high' },
  { id: 4, name: '社保信息查询系统', protectionValue: 2, protection: '防病毒能力弱', visits: '38,921', protectionLevel: 'medium' },
  { id: 5, name: '公积金查询服务', protectionValue: 2, protection: '缺少审计能力', visits: '36,543', protectionLevel: 'medium' },
  { id: 6, name: '医疗保险查询系统', protectionValue: 2, protection: '数据加密缺失', visits: '32,874', protectionLevel: 'medium' },
  { id: 7, name: '个人税务服务平台', protectionValue: 2, protection: '边界防护弱', visits: '29,654', protectionLevel: 'medium' },
  { id: 8, name: '教育信息查询系统', protectionValue: 1, protection: '漏洞扫描缺失', visits: '27,543', protectionLevel: 'low' },
  { id: 9, name: '银行账户查询系统', protectionValue: 1, protection: '数据脱敏不足', visits: '25,432', protectionLevel: 'low' },
  { id: 10, name: '不动产登记查询系统', protectionValue: 1, protection: '安全审计弱', visits: '23,765', protectionLevel: 'low' },
  { id: 11, name: '公共交通查询系统', protectionValue: 1, protection: '访问控制缺失', visits: '21,654', protectionLevel: 'low' },
  { id: 12, name: '食品安全监管平台', protectionValue: 1, protection: '日志分析弱', visits: '19,876', protectionLevel: 'low' },
  { id: 13, name: '居民健康档案系统', protectionValue: 1, protection: '数据防泄漏弱', visits: '18,543', protectionLevel: 'low' },
  { id: 14, name: '住房公积金管理系统', protectionValue: 1, protection: '防火墙配置弱', visits: '16,987', protectionLevel: 'low' },
  { id: 15, name: '旅游景点预约系统', protectionValue: 1, protection: '数据保护弱', visits: '15,432', protectionLevel: 'low' },
];

// 高敏数据使用风险最多人员TOP
export const highRiskUserTableData: RankingItem[] = [
  { id: 1, name: '张三', department: '数据中心', threatValue: 186, threatType: '数据下载', accessCount: '3,254' },
  { id: 2, name: '历史', department: '研发部门', threatValue: 142, threatType: '权限滥用', accessCount: '2,876' },
  { id: 3, name: '无为网', department: '安全部门', threatValue: 98, threatType: '异常访问', accessCount: '2,543' },
  { id: 4, name: '大德', department: '业务部门', threatValue: 65, threatType: '敏感查询', accessCount: '2,187' },
  { id: 5, name: '李德龙', department: '客服中心', threatValue: 52, threatType: '数据导出', accessCount: '1,987' },
  { id: 6, name: '王明珠', department: '技术支持', threatValue: 47, threatType: '操作频繁', accessCount: '1,876' },
  { id: 7, name: '赵雅芝', department: '业务运营', threatValue: 43, threatType: '敏感访问', accessCount: '1,765' },
  { id: 8, name: '刘建国', department: '研发部门', threatValue: 39, threatType: '越权操作', accessCount: '1,654' },
  { id: 9, name: '孙宇轩', department: '数据分析', threatValue: 34, threatType: '批量访问', accessCount: '1,543' },
  { id: 10, name: '陈佳慧', department: '客户服务', threatValue: 29, threatType: '异常登录', accessCount: '1,432' },
  { id: 11, name: '黄建军', department: '技术运维', threatValue: 25, threatType: '非工作时间访问', accessCount: '1,321' },
  { id: 12, name: '杨嘉宁', department: '安全运营', threatValue: 22, threatType: '异地登录', accessCount: '1,265' },
  { id: 13, name: '周思琪', department: '研发测试', threatValue: 19, threatType: '频繁查询', accessCount: '1,187' },
  { id: 14, name: '吴子健', department: '数据治理', threatValue: 17, threatType: '数据修改', accessCount: '1,098' },
  { id: 15, name: '郑小丽', department: '业务支持', threatValue: 15, threatType: '非授权访问', accessCount: '987' },
]; 