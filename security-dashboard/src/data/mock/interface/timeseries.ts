// Corresponds to API: GET /interface/timeseries?chartType={type}&timeRange={range}

import { TimeRange as CommonTimeRange } from '../../api/commonTypes';

// Raw data extracted from monitoringData.ts
const timeData = {
    day: {
      xAxis: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
    },
    week: {
      xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  };
  
  const tpsData = {
    day: {
      series: [
        {
          name: 'TPS',
          data: [120, 180, 150, 130, 190, 230, 250, 220, 200, 180, 160, 140, 130],
          color: '#3B82F6'
        }
      ]
    },
    week: {
      series: [
        {
          name: 'TPS',
          data: [180, 220, 190, 250, 210, 170, 200],
          color: '#3B82F6'
        }
      ]
    }
  };
  
  const connectionData = {
    day: {
      series: [
        {
          name: '连接数',
          data: [500, 600, 550, 700, 800, 750, 900, 850, 750, 650, 600, 550, 500],
          color: '#10B981'
        }
      ]
    },
    week: {
      series: [
        {
          name: '连接数',
          data: [600, 700, 800, 750, 850, 700, 650],
          color: '#10B981'
        }
      ]
    }
  };
  
  const applicationData = {
    day: {
      series: [
        {
          name: 'HTTP请求',
          data: [300, 350, 400, 380, 450, 500, 480, 520, 490, 460, 420, 380, 350],
          color: '#F59E0B'
        },
        {
          name: 'WebSocket连接',
          data: [150, 180, 200, 190, 220, 240, 230, 250, 240, 220, 200, 180, 170],
          color: '#8B5CF6'
        },
        {
          name: 'RPC调用',
          data: [80, 100, 120, 110, 130, 150, 140, 160, 150, 140, 120, 100, 90],
          color: '#EC4899'
        }
      ]
    },
    week: {
      series: [
        {
          name: 'HTTP请求',
          data: [380, 420, 450, 480, 440, 400, 420],
          color: '#F59E0B'
        },
        {
          name: 'WebSocket连接',
          data: [200, 220, 240, 230, 250, 220, 210],
          color: '#8B5CF6'
        },
        {
          name: 'RPC调用',
          data: [100, 120, 140, 130, 150, 120, 110],
          color: '#EC4899'
        }
      ]
    }
  };
  
  const securityCheckpointData = {
    day: {
      series: [
        {
          name: '身份认证',
          data: [200, 250, 230, 280, 300, 290, 320, 310, 290, 270, 250, 230, 220],
          color: '#3B82F6'
        },
        {
          name: '访问控制',
          data: [150, 180, 170, 200, 220, 210, 240, 230, 220, 200, 190, 170, 160],
          color: '#10B981'
        },
        {
          name: '数据加密',
          data: [100, 120, 110, 130, 150, 140, 160, 150, 140, 130, 120, 110, 100],
          color: '#F59E0B'
        }
      ]
    },
    week: {
      series: [
        {
          name: '身份认证',
          data: [250, 280, 300, 290, 310, 270, 260],
          color: '#3B82F6'
        },
        {
          name: '访问控制',
          data: [180, 200, 220, 210, 230, 200, 190],
          color: '#10B981'
        },
        {
          name: '数据加密',
          data: [120, 130, 150, 140, 160, 130, 120],
          color: '#F59E0B'
        }
      ]
    }
  };
  
  // Define the expected return type based on api_documentation_plan.md
  // (Ideally import from api/types.ts)
  interface InterfaceTimeSeriesData {
    xAxisData: string[];
    series: {
      name: string;
      data: number[];
      color?: string;
    }[];
  }
  
  type ChartType = 'tps' | 'connection' | 'application' | 'securityCheckpoint' | 'callVolume' | 'errorRate';
  // type TimeRange = 'day' | 'week';
  
  // Map chart types to their corresponding data objects
  const dataMap: Record<ChartType, Partial<Record<CommonTimeRange, TimeSeriesSet>>> = {
      tps: { 
        day: { xAxis: ['00:00', '06:00', '12:00', '18:00'], series: [{ name: 'TPS', data: [10, 20, 15, 25] }] },
        week: { xAxis: ['周一', '周三', '周五', '周日'], series: [{ name: 'TPS', data: [100, 200, 150, 250] }] }
      },
      connection: { 
        day: { xAxis: ['00:00', '06:00', '12:00', '18:00'], series: [{ name: 'Connections', data: [50, 40, 60, 55] }] },
        week: { xAxis: ['周一', '周三', '周五', '周日'], series: [{ name: 'Connections', data: [500, 400, 600, 550] }] }
      },
      application: { 
        day: { xAxis: ['00:00', '06:00', '12:00', '18:00'], series: [{ name: 'App Data 1', data: [5, 8, 6, 9] }, { name: 'App Data 2', data: [3, 4, 2, 5] }] },
        week: { xAxis: ['周一', '周三', '周五', '周日'], series: [{ name: 'App Data 1', data: [50, 80, 60, 90] }, { name: 'App Data 2', data: [30, 40, 20, 50] }] }
      },
      securityCheckpoint: { 
        day: { xAxis: ['00:00', '06:00', '12:00', '18:00'], series: [{ name: 'Checkpoint Hits', data: [2, 1, 3, 2] }] },
        week: { xAxis: ['周一', '周三', '周五', '周日'], series: [{ name: 'Checkpoint Hits', data: [20, 10, 30, 20] }] }
      },
      callVolume: { // 填充 callVolume 示例数据
        day: { xAxis: ['00:00', '06:00', '12:00', '18:00'], series: [{ name: 'Call Volume', data: [100, 150, 120, 180] }] },
        week: { xAxis: ['周一', '周三', '周五', '周日'], series: [{ name: 'Call Volume', data: [1000, 1500, 1200, 1800] }] }
      },
      errorRate: { // 填充 errorRate 示例数据
        day: { xAxis: ['00:00', '06:00', '12:00', '18:00'], series: [{ name: 'Error Rate', data: [1, 0.5, 1.2, 0.8] }] }, // 百分比?
        week: { xAxis: ['周一', '周三', '周五', '周日'], series: [{ name: 'Error Rate', data: [10, 5, 12, 8] }] }
      }
  };
  
  // Mock function to simulate fetching timeseries data
  export const getInterfaceTimeseriesMock = (
      chartType: string, // chartType 决定返回哪个模拟数据系列
      timeRange: CommonTimeRange // Use the imported TimeRange type
  ): Promise<InterfaceTimeSeriesData> => {
      console.log(`Mock Fetching timeseries for chartType: ${chartType}, timeRange: ${timeRange}`);
  
      const validChartType = chartType as ChartType;
      // Access dataMap using CommonTimeRange - no cast needed now
      const timeSeriesSet = dataMap[validChartType]?.[timeRange];

      if (timeSeriesSet) {
          return Promise.resolve({
              xAxisData: timeSeriesSet.xAxis,
              series: timeSeriesSet.series
          });
      } else {
          console.warn(`Mock data for chartType '${chartType}' (range: ${timeRange}) not found. Returning empty series.`);
          // Generate a default empty structure based on CommonTimeRange
          let defaultXAxis: string[];
          if (timeRange === 'day') {
              defaultXAxis = Array(24).fill('').map((_, i) => `${String(i).padStart(2, '0')}:00`);
          } else if (timeRange === 'week') {
              defaultXAxis = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
          } else { // Assuming timeRange === 'month'
              defaultXAxis = Array(30).fill('').map((_, i) => `${i + 1}日`); // Adjust month days if needed
          }
          
          return Promise.resolve({
              xAxisData: defaultXAxis,
              series: [{ name: 'Unknown', data: defaultXAxis.map(() => 0) }]
          });
      }
  };
  
  // Optional: Export a default dataset if needed
  export const defaultTpsDayData: InterfaceTimeSeriesData = {
      xAxisData: timeData.day.xAxis,
      series: tpsData.day.series
  };
  
  // 定义时间序列数据结构
  interface SeriesData {
    name: string;
    data: number[];
    color?: string;
  }
  // 导出 TimeSeriesSet 接口
  export interface TimeSeriesSet {
    xAxis: string[];
    series: SeriesData[];
  }
  