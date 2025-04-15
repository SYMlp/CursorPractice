import React from 'react';
import MetricCard from '../components/cards/MetricCard';
import NetworkTopology from '../components/networks/NetworkTopology';
import MultiLineChart from '../components/charts/MultiLineChart';
import { 
  ServerIcon, 
  ApiIcon, 
  ConnectionIcon, 
  RequestIcon, 
  ResponseIcon, 
  MonitorIcon 
} from '../components/icons/MonitoringIcons';
import { 
  metricCardsData, 
  timeData, 
  tpsData, 
  connectionData, 
  applicationData, 
  securityCheckpointData 
} from '../data/monitoringData';

// 时间范围类型
type TimeRange = 'day' | 'week';

const InterfaceMonitoring: React.FC = () => {
  // 获取对应的图标组件
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'server':
        return <ServerIcon size={28} />;
      case 'api':
        return <ApiIcon size={28} />;
      case 'connection':
        return <ConnectionIcon size={28} />;
      case 'request':
        return <RequestIcon size={28} />;
      case 'response':
        return <ResponseIcon size={28} />;
      case 'monitor':
        return <MonitorIcon size={28} />;
      default:
        return <ServerIcon size={28} />;
    }
  };

  // 时间范围选择器组件
  const TimeRangeSelector: React.FC<{ value: TimeRange; onChange: (range: TimeRange) => void }> = ({ value, onChange }) => {
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => onChange('day')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            value === 'day'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          一天
        </button>
        <button
          onClick={() => onChange('week')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            value === 'week'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          一周
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* 指标卡片区域 */}
        <div className="grid grid-cols-6 gap-4">
          {metricCardsData.map((card, index) => (
            <MetricCard
              key={index}
              title={card.title}
              value={card.value}
              color={card.color}
              icon={getIconComponent(card.icon)}
            />
          ))}
        </div>

        {/* 网络拓扑图 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">网络拓扑</h2>
            <div className="text-sm text-gray-500">
              共 4 个节点 | 4 个连接
            </div>
          </div>
          <div className="h-[400px]">
            <NetworkTopology />
          </div>
        </div>

        {/* 图表第一行 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">每分钟平均TPS</h3>
            </div>
            <MultiLineChart
              title=""
              timeData={timeData}
              series={tpsData}
              showLegend={false}
            />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">每分钟网络连接数</h3>
            </div>
            <MultiLineChart
              title=""
              timeData={timeData}
              series={connectionData}
              showLegend={false}
            />
          </div>
        </div>

        {/* 图表第二行 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">每分钟应用层详情</h3>
            </div>
            <MultiLineChart
              title=""
              timeData={timeData}
              series={applicationData}
              showLegend={true}
            />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">每分钟服务安全检测点</h3>
            </div>
            <MultiLineChart
              title=""
              timeData={timeData}
              series={securityCheckpointData}
              showLegend={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceMonitoring; 