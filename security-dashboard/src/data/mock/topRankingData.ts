import { v4 as uuidv4 } from 'uuid';
import { RankingItem } from '../../components/charts/TopRankingCard';

// 应用交互量排名数据
export const applicationInteractionRankData: RankingItem[] = [
  { id: uuidv4(), name: '财务管理系统', value: 9865, trend: 'up', risk: 'medium', color: '#4e79a7' },
  { id: uuidv4(), name: '人力资源系统', value: 8743, trend: 'up', risk: 'low', color: '#f28e2c' },
  { id: uuidv4(), name: '客户关系管理', value: 7654, trend: 'down', risk: 'high', color: '#e15759' },
  { id: uuidv4(), name: '数据分析平台', value: 6287, trend: 'up', risk: 'low', color: '#76b7b2' },
  { id: uuidv4(), name: '供应链管理系统', value: 5932, trend: 'stable', risk: 'medium', color: '#59a14f' },
  { id: uuidv4(), name: '项目管理系统', value: 4853, trend: 'down', risk: 'low', color: '#edc949' },
  { id: uuidv4(), name: '库存管理系统', value: 3965, trend: 'up', risk: 'medium', color: '#af7aa1' },
  { id: uuidv4(), name: '电子商务平台', value: 3742, trend: 'up', risk: 'high', color: '#ff9da7' },
];

// 风险业务排名数据
export const riskBusinessRankData: RankingItem[] = [
  { id: uuidv4(), name: '客户关系管理', value: 68, percent: 24.5, risk: 'high', color: '#e15759' },
  { id: uuidv4(), name: '电子商务平台', value: 52, percent: 18.7, risk: 'high', color: '#ff9da7' },
  { id: uuidv4(), name: '财务管理系统', value: 43, percent: 15.5, risk: 'medium', color: '#4e79a7' },
  { id: uuidv4(), name: '供应链管理系统', value: 38, percent: 13.7, risk: 'medium', color: '#59a14f' },
  { id: uuidv4(), name: '库存管理系统', value: 29, percent: 10.4, risk: 'medium', color: '#af7aa1' },
  { id: uuidv4(), name: '数据分析平台', value: 18, percent: 6.5, risk: 'low', color: '#76b7b2' },
  { id: uuidv4(), name: '人力资源系统', value: 16, percent: 5.8, risk: 'low', color: '#f28e2c' },
  { id: uuidv4(), name: '项目管理系统', value: 14, percent: 5.0, risk: 'low', color: '#edc949' },
];

// 登录用户数据
export const frequentLoginUserRankData: RankingItem[] = [
  { id: uuidv4(), name: '张三', value: 127, secondaryValue: '研发部', risk: 'low', color: '#4e79a7' },
  { id: uuidv4(), name: '李四', value: 98, secondaryValue: '财务部', risk: 'medium', color: '#f28e2c' },
  { id: uuidv4(), name: '王五', value: 87, secondaryValue: '市场部', risk: 'low', color: '#e15759' },
  { id: uuidv4(), name: '赵六', value: 76, secondaryValue: '人力资源部', risk: 'high', color: '#76b7b2' },
  { id: uuidv4(), name: '钱七', value: 65, secondaryValue: '销售部', risk: 'medium', color: '#59a14f' },
  { id: uuidv4(), name: '孙八', value: 54, secondaryValue: '客服部', risk: 'low', color: '#edc949' },
  { id: uuidv4(), name: '周九', value: 43, secondaryValue: '技术支持部', risk: 'medium', color: '#af7aa1' },
  { id: uuidv4(), name: '吴十', value: 32, secondaryValue: '产品部', risk: 'high', color: '#ff9da7' },
];

// 风险用户排名数据
export const riskUserRankData: RankingItem[] = [
  { id: uuidv4(), name: '赵六', value: 42, percent: 28.5, risk: 'high', color: '#e15759' },
  { id: uuidv4(), name: '吴十', value: 36, percent: 24.3, risk: 'high', color: '#ff9da7' },
  { id: uuidv4(), name: '李四', value: 28, percent: 18.9, risk: 'medium', color: '#f28e2c' },
  { id: uuidv4(), name: '钱七', value: 25, percent: 16.8, risk: 'medium', color: '#59a14f' },
  { id: uuidv4(), name: '周九', value: 18, percent: 12.1, risk: 'medium', color: '#af7aa1' },
  { id: uuidv4(), name: '张三', value: 12, percent: 8.1, risk: 'low', color: '#4e79a7' },
  { id: uuidv4(), name: '王五', value: 10, percent: 6.7, risk: 'low', color: '#76b7b2' },
  { id: uuidv4(), name: '孙八', value: 8, percent: 5.4, risk: 'low', color: '#edc949' },
];

// 告警类型分布数据
export const alarmTypeDistributionData: RankingItem[] = [
  { id: uuidv4(), name: '敏感数据访问', value: 35, color: '#e15759' },
  { id: uuidv4(), name: '异常登录', value: 25, color: '#ff9da7' },
  { id: uuidv4(), name: '权限提升', value: 18, color: '#f28e2c' },
  { id: uuidv4(), name: '数据泄露', value: 12, color: '#59a14f' },
  { id: uuidv4(), name: '系统异常', value: 10, color: '#af7aa1' },
];

// 行业分布数据
export const industryDistributionData: RankingItem[] = [
  { id: uuidv4(), name: '金融', value: 28, color: '#4e79a7' },
  { id: uuidv4(), name: '制造', value: 22, color: '#f28e2c' },
  { id: uuidv4(), name: '零售', value: 18, color: '#e15759' },
  { id: uuidv4(), name: '教育', value: 12, color: '#76b7b2' },
  { id: uuidv4(), name: '医疗', value: 10, color: '#59a14f' },
  { id: uuidv4(), name: '其他', value: 10, color: '#edc949' },
];

// 安全分布数据
export const securityDistributionData: RankingItem[] = [
  { id: uuidv4(), name: '高风险', value: 25, color: '#e15759' },
  { id: uuidv4(), name: '中风险', value: 35, color: '#f28e2c' },
  { id: uuidv4(), name: '低风险', value: 40, color: '#59a14f' },
];

// 业务应用响应时间排名
export const applicationResponseTimeRankData: RankingItem[] = [
  { id: uuidv4(), name: 'OA系统', value: 2432, secondaryValue: 302, secondaryLabel: '访问次数', color: '#4e79a7' },
  { id: uuidv4(), name: '智慧定价系统', value: 1856, secondaryValue: 258, secondaryLabel: '访问次数', color: '#f28e2c' },
  { id: uuidv4(), name: 'CRM系统', value: 1543, secondaryValue: 198, secondaryLabel: '访问次数', color: '#e15759' },
  { id: uuidv4(), name: '员工考评系统', value: 986, secondaryValue: 156, secondaryLabel: '访问次数', color: '#76b7b2' },
  { id: uuidv4(), name: '设备管理系统', value: 875, secondaryValue: 132, secondaryLabel: '访问次数', color: '#59a14f' },
];

// 根据仪表盘需要组合数据
export const dashboardRankingData = {
  applicationInteraction: applicationInteractionRankData,
  riskBusiness: riskBusinessRankData,
  frequentLoginUser: frequentLoginUserRankData,
  riskUser: riskUserRankData,
  alarmTypeDistribution: alarmTypeDistributionData,
  industryDistribution: industryDistributionData,
  securityDistribution: securityDistributionData,
  applicationResponseTime: applicationResponseTimeRankData
}; 