// Contains monitoring metrics specific to the asset monitoring page.
// Note: These might not directly correspond to a specific backend API endpoint 
// in the current api_documentation_plan.md, but were present in the mock data.
import { v4 as uuidv4 } from 'uuid';

// Define type based on existing data (Ideally import from api/types.ts)
export interface MonitoringMetric {
  id: string;
  name: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  percent?: number;
  icon?: string; // Icon identifier used by frontend
}

export const monitoringMetricsData: MonitoringMetric[] = [
  {
    id: uuidv4(),
    name: '告警数',
    value: 168,
    trend: 'up',
    percent: 23.5,
    icon: 'alert',
  },
  {
    id: uuidv4(),
    name: '访问者数',
    value: 1254,
    trend: 'down',
    percent: 5.2,
    icon: 'user',
  },
  {
    id: uuidv4(),
    name: '应用数',
    value: 156,
    trend: 'up',
    percent: 8.7,
    icon: 'application',
  },
  {
    id: uuidv4(),
    name: '风险资产',
    value: 42,
    trend: 'stable',
    percent: 0,
    icon: 'risk',
  },
]; 