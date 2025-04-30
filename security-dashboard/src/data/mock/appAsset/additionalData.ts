// Contains additional mock data found in assetMonitoringData.ts that doesn't directly map 
// to the primary API endpoints defined in api_documentation_plan.md for the asset module.
// This data might be used for secondary UI elements or might be legacy data.
import { v4 as uuidv4 } from 'uuid';
import type { RankItem } from './rankings'; // Assuming RankItem is defined in rankings.ts

// Define types based on existing data (Ideally import from api/types.ts)
export interface LoginUserData {
  id: string;
  name: string;
  department: string;
  lastLoginTime: string;
  loginCount: number;
  risk?: 'high' | 'medium' | 'low';
}

interface DistributionItem {
  name: string;
  value: number;
  color?: string; // For securityDistributionData
}

// 登录用户数据
export const loginUserData: LoginUserData[] = [
  { 
    id: uuidv4(), 
    name: '张三', 
    department: '研发部', 
    lastLoginTime: '2024-07-13 09:23:45', 
    loginCount: 127,
    risk: 'low'
  },
  { 
    id: uuidv4(), 
    name: '李四', 
    department: '财务部', 
    lastLoginTime: '2024-07-13 10:15:32', 
    loginCount: 98,
    risk: 'medium'
  },
  // ... (rest of the data - add if needed, keep short for example) ...
  { 
    id: uuidv4(), 
    name: '吴十', 
    department: '产品部', 
    lastLoginTime: '2024-07-13 11:25:33', 
    loginCount: 32,
    risk: 'high'
  }
];

// 风险用户排名数据 (Note: Similar structure to RankItem, but kept separate as its API mapping is unclear)
export const riskUserRankData: RankItem[] = [
  { id: uuidv4(), name: '赵六', value: 42, percent: 28.5, risk: 'high' },
  { id: uuidv4(), name: '吴十', value: 36, percent: 24.3, risk: 'high' },
  // ... (rest of the data) ...
  { id: uuidv4(), name: '孙八', value: 8, percent: 5.4, risk: 'low' }
];

// 行业分布数据
export const industryDistributionData: DistributionItem[] = [
  { name: '金融', value: 28 },
  { name: '制造', value: 22 },
  { name: '零售', value: 18 },
  { name: '教育', value: 12 },
  { name: '医疗', value: 10 },
  { name: '其他', value: 10 }
];

// 安全分布数据 (Note: May relate to chart data, but provided as a simple list here)
export const securityDistributionData: DistributionItem[] = [
  { name: '高风险', value: 25, color: '#FF4D4F' },
  { name: '中风险', value: 35, color: '#FAAD14' },
  { name: '低风险', value: 40, color: '#52C41A' }
]; 