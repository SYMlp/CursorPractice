// Corresponds to API: GET /data-asset/risk-trend

// Define type based on api_documentation_plan.md (Ideally import from api/types.ts)
interface RiskTrendSeries {
    name: string;
    data: number[];
    color?: string;
  }
  
  interface RiskTrendData {
    xAxisData: string[]; // Changed from xAxis to xAxisData for consistency
    series: RiskTrendSeries[];
  }
  
  export const riskTrendData: RiskTrendData = {
    xAxisData: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
    series: [
      {
        name: '数据泄露风险',
        data: [25, 15, 12, 20, 25, 30, 35, 30, 25, 20, 15, 20, 25, 20],
        color: '#1E90FF' // Example color
      },
      {
        name: '越权访问风险',
        data: [20, 25, 28, 25, 15, 40, 45, 35, 30, 35, 30, 25, 15, 10],
        color: '#32CD32' // Example color
      },
      {
        name: '敏感数据滥用',
        data: [30, 20, 15, 10, 20, 55, 45, 35, 30, 45, 40, 35, 45, 30],
        color: '#FFA500' // Example color
      }
    ]
  };