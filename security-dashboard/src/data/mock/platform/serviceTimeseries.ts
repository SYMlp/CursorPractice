// Corresponds to API: GET /platform/service/timeseries?serviceId={id}&timeRange={range}

// Raw data extracted from the original mockData.ts
const rawTimeSeriesData = {
    xAxisData: ['01-03', '01-04', '01-05', '01-06', '01-07', '01-08'],
    series: {
      // 南向接口数据量 (assuming serviceId: 'south' or 'interface')
      south: [
        {
          name: '授权接口数量',
          data: [2000, 8000, 3500, 5000, 7000, 4000],
          color: '#3b82f6'
        },
        {
          name: '敏感资源接口',
          data: [6000, 4000, 2000, 4000, 8000, 7000],
          color: '#10b981'
        },
        {
          name: '未知安全接口',
          data: [1000, 3000, 1500, 2000, 4000, 6000],
          color: '#f59e0b'
        }
      ],
      // 识别服务接口数据量 (assuming serviceId: 'identify')
      identify: [
        {
          name: '识别服务',
          data: [2000, 4000, 1500, 2000, 6000, 7000],
          color: '#f59e0b',
          areaStyle: true
        }
      ],
      // 防护服务数据量 (assuming serviceId: 'protection')
      protection: [
        {
          name: '防护服务',
          data: [2000, 8000, 3000, 6000, 4000, 5000],
          color: '#3b82f6'
        }
      ],
      // 检测服务接口数据量 (assuming serviceId: 'detection')
      detection: [
        {
          name: '检测服务',
          data: [1000, 2000, 2500, 3000, 5000, 6000],
          color: '#f97316',
          areaStyle: true
        }
      ],
      // 响应服务接口数据量 (assuming serviceId: 'response')
      response: [
        {
          name: '响应服务',
          data: [2000, 8000, 2000, 5000, 3000, 4000],
          color: '#10b981'
        }
      ]
    }
  };
  
  // Define the expected return type - ensure areaStyle is boolean | undefined
  interface ServiceTimeSeriesData {
    xAxisData: string[];
    series: { 
      name: string;
      data: number[];
      color?: string;
      areaStyle?: boolean;
    }[];
  }
  
  // Mock function to simulate fetching data based on serviceId
  export const getServiceTimeseriesMock = (
      serviceId: 'south' | 'identify' | 'protection' | 'detection' | 'response' | string, 
      timeRange?: 'day' | 'week' | 'month'
  ) : Promise<ServiceTimeSeriesData> => {
      console.log(`Mock Fetching timeseries for serviceId: ${serviceId}, timeRange: ${timeRange}`);
      
      let seriesData: any[] = [];
      
      // Map serviceId to the corresponding key in rawTimeSeriesData.series
      const key = serviceId as keyof typeof rawTimeSeriesData.series;
  
      if (rawTimeSeriesData.series[key]) {
          seriesData = rawTimeSeriesData.series[key].map(s => {
              const seriesItem: any = { ...s }; // Use 'any' temporarily for flexibility
              // Explicitly check and assign areaStyle
              if (typeof (s as any).areaStyle === 'boolean') {
                  seriesItem.areaStyle = (s as any).areaStyle;
              } else {
                  seriesItem.areaStyle = undefined; // Ensure it's undefined if not a boolean
              }
              return seriesItem;
          });
      } else {
          console.warn(`Mock data for serviceId '${serviceId}' not found. Returning empty series.`);
          // Return default structure or empty data
          seriesData = [{ name: 'Unknown Service', data: rawTimeSeriesData.xAxisData.map(() => 0), areaStyle: undefined }];
      }
  
      return Promise.resolve({
          xAxisData: rawTimeSeriesData.xAxisData,
          series: seriesData
      });
  };
  
  // Optionally, export a default dataset if needed elsewhere directly
  export const defaultSouthTimeseriesData: ServiceTimeSeriesData = {
      xAxisData: rawTimeSeriesData.xAxisData,
      series: rawTimeSeriesData.series.south
  };
  