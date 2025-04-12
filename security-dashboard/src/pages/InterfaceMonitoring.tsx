import React from 'react';
import MetricCard from '../components/cards/MetricCard';
import NetworkTopology from '../components/charts/NetworkTopology';
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

const InterfaceMonitoring: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* 顶部指标卡 */}
        <div className="grid grid-cols-6 gap-4 mb-4">
          {metricCardsData.map((card, index) => (
            <MetricCard
              key={index}
              title={card.title}
              value={card.value}
              color={card.color}
              icon={
                index === 0 || index === 5 ? <ServerIcon size={28} /> :
                index === 1 ? <ApiIcon size={28} /> :
                index === 2 ? <ConnectionIcon size={28} /> :
                index === 3 ? <RequestIcon size={28} /> :
                <ResponseIcon size={28} />
              }
            />
          ))}
        </div>

        {/* 接口网络拓扑 */}
        <div className="mb-4">
          <NetworkTopology />
        </div>

        {/* 图表第一行 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <MultiLineChart
            title="每分钟平均TPS"
            xAxisData={timeData.xAxis}
            series={tpsData.series}
            showLegend={false}
          />
          <MultiLineChart
            title="每分钟网络连接数"
            xAxisData={timeData.xAxis}
            series={connectionData.series}
            showLegend={false}
          />
        </div>

        {/* 图表第二行 */}
        <div className="grid grid-cols-2 gap-4">
          <MultiLineChart
            title="每分钟应用层详情"
            xAxisData={timeData.xAxis}
            series={applicationData.series}
            showLegend={true}
          />
          <MultiLineChart
            title="每分钟服务安全检测点"
            xAxisData={timeData.xAxis}
            series={securityCheckpointData.series}
            showLegend={true}
          />
        </div>
      </div>
    </div>
  );
};

export default InterfaceMonitoring; 