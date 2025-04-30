 // Corresponds to API: GET /interface/metrics

// Define the type based on api_documentation_plan.md (Ideally import from api/types.ts)
interface MetricItem {
    title: string; 
    value: string; 
    color?: string; 
    icon?: string; 
  }
  
  export const metricsData: MetricItem[] = [
    {
      title: '服务器总数',
      value: '128',
      color: 'bg-blue-500', // Frontend might use this class directly
      icon: 'server'       // Icon identifier for frontend
    },
    {
      title: '接口总数',
      value: '256',
      color: 'bg-green-500',
      icon: 'api'
    },
    {
      title: '连接总数',
      value: '512',
      color: 'bg-purple-500',
      icon: 'connection'
    },
    {
      title: '请求总数',
      value: '1024',
      color: 'bg-orange-500',
      icon: 'request'
    },
    {
      title: '响应总数',
      value: '1024',
      color: 'bg-red-500',
      icon: 'response'
    },
    {
      title: '监控总数',
      value: '64',
      color: 'bg-indigo-500',
      icon: 'monitor'
    }
  ];