 // Corresponds to API: GET /platform/resource/overview
export const resourceOverviewData = {
    count: 123456,
    metrics: [
      { label: '身份标识率', value: 75.0, color: '#4096ff' },
      { label: '标准化属性', value: 65.2, color: '#f59e0b' },
      { label: '安全防护率', value: 42.8, color: '#f5222d' }
    ],
    growthItems: [
      { label: '同比上周', value: 8, isUp: true },
      { label: '同比昨日', value: 3, isUp: false }
    ]
  };