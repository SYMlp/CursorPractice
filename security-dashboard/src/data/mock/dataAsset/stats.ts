 // Corresponds to API: GET /data-asset/stats

// Define type based on api_documentation_plan.md (Ideally import from api/types.ts)
interface StatItem {
    label: string;
    value: string;
  }
  
  export const statsData: StatItem[] = [
    { label: '数据总量', value: '2,4324' }, // Note: Value format might need adjustment for real API
    { label: '数据分类数', value: '322' },
    { label: '数据分级数', value: '8' }
  ];