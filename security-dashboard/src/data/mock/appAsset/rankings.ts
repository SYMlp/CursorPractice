// Corresponds to API: GET /asset/interaction/rank and GET /asset/business/risk/rank
import { v4 as uuidv4 } from 'uuid';

// Define type based on existing data (Ideally import from api/types.ts)
export interface RankItem {
  id: string;
  name: string;
  value: number;
  percent?: number;
  trend?: 'up' | 'down' | 'stable';
  risk?: 'high' | 'medium' | 'low';
}

// 应用交互排名数据 (GET /asset/interaction/rank)
export const applicationInteractionRankData: RankItem[] = [
  { id: uuidv4(), name: '财务管理系统', value: 9865, trend: 'up', risk: 'medium' },
  { id: uuidv4(), name: '人力资源系统', value: 8743, trend: 'up', risk: 'low' },
  { id: uuidv4(), name: '客户关系管理', value: 7654, trend: 'down', risk: 'high' },
  { id: uuidv4(), name: '数据分析平台', value: 6287, trend: 'up', risk: 'low' },
  { id: uuidv4(), name: '供应链管理系统', value: 5932, trend: 'stable', risk: 'medium' },
  { id: uuidv4(), name: '项目管理系统', value: 4853, trend: 'down', risk: 'low' },
  { id: uuidv4(), name: '库存管理系统', value: 3965, trend: 'up', risk: 'medium' },
  { id: uuidv4(), name: '电子商务平台', value: 3742, trend: 'up', risk: 'high' },
];

// 风险业务排名数据 (GET /asset/business/risk/rank)
export const riskBusinessRankData: RankItem[] = [
  { id: uuidv4(), name: '客户关系管理', value: 68, percent: 24.5, risk: 'high' },
  { id: uuidv4(), name: '电子商务平台', value: 52, percent: 18.7, risk: 'high' },
  { id: uuidv4(), name: '财务管理系统', value: 43, percent: 15.5, risk: 'medium' },
  { id: uuidv4(), name: '供应链管理系统', value: 38, percent: 13.7, risk: 'medium' },
  { id: uuidv4(), name: '库存管理系统', value: 29, percent: 10.4, risk: 'medium' },
  { id: uuidv4(), name: '数据分析平台', value: 18, percent: 6.5, risk: 'low' },
  { id: uuidv4(), name: '人力资源系统', value: 16, percent: 5.8, risk: 'low' },
  { id: uuidv4(), name: '项目管理系统', value: 14, percent: 5.0, risk: 'low' },
]; 