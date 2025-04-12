import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

interface NetworkTopologyProps {
  className?: string;
}

const NetworkTopology: React.FC<NetworkTopologyProps> = ({ className }) => {
  // 拓扑图的节点和连线数据
  const nodes = [
    {
      name: '安全访问',
      x: 300,
      y: 200,
      itemStyle: {
        color: '#67C23A'
      },
      symbolSize: 70,
      category: 0
    },
    {
      name: '接口访问',
      x: 200,
      y: 300,
      itemStyle: {
        color: '#F56C6C'
      },
      symbolSize: 50,
      category: 1
    },
    {
      name: '安全存储器',
      x: 400,
      y: 300,
      itemStyle: {
        color: '#409EFF'
      },
      symbolSize: 50,
      category: 1
    },
    {
      name: '安全算法库',
      x: 200,
      y: 400,
      itemStyle: {
        color: '#E6A23C'
      },
      symbolSize: 50,
      category: 2
    },
    {
      name: '安全配置',
      x: 400,
      y: 400,
      itemStyle: {
        color: '#FFCC66'
      },
      symbolSize: 50,
      category: 2
    },
    {
      name: '加密数据',
      x: 300,
      y: 500,
      itemStyle: {
        color: '#9B59B6'
      },
      symbolSize: 60,
      category: 3
    }
  ];

  const links = [
    {
      source: '安全访问',
      target: '接口访问',
      lineStyle: {
        color: '#FF9900',
        width: 2
      }
    },
    {
      source: '安全访问',
      target: '安全存储器',
      lineStyle: {
        color: '#FF9900',
        width: 2
      }
    },
    {
      source: '接口访问',
      target: '安全算法库',
      lineStyle: {
        color: '#87CEFA',
        width: 2
      }
    },
    {
      source: '安全存储器',
      target: '安全配置',
      lineStyle: {
        color: '#87CEFA',
        width: 2
      }
    },
    {
      source: '安全算法库',
      target: '加密数据',
      lineStyle: {
        color: '#2ECE89',
        width: 2
      }
    },
    {
      source: '安全配置',
      target: '加密数据',
      lineStyle: {
        color: '#2ECE89',
        width: 2
      }
    }
  ];

  const categories = [
    { name: '根节点' },
    { name: '一级节点' },
    { name: '二级节点' },
    { name: '三级节点' }
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}'
    },
    legend: {
      data: categories.map(a => a.name),
      orient: 'vertical',
      right: 10,
      top: 20,
      textStyle: {
        color: '#666'
      }
    },
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: '网络拓扑',
        type: 'graph',
        layout: 'none',
        data: nodes,
        links: links,
        categories: categories,
        roam: true,
        focusNodeAdjacency: true,
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}',
          fontSize: 12,
          fontStyle: '400',
          color: '#fff'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          lineStyle: {
            width: 6
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }
    ]
  };

  // 额外信息区域数据
  const infoData = {
    安全防护通信协议: 'XXXXX',
    接口总数量: 432516,
    接口响应时间: '5s',
  };

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className || ''}`}>
      <h2 className="text-lg font-medium mb-4 text-gray-700">接口网络拓扑</h2>
      <div className="relative">
        <ReactECharts
          option={option}
          style={{ height: '400px', width: '100%' }}
        />
        <div className="absolute top-10 left-10 bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm font-semibold text-blue-600 mb-2">当前状态</div>
          {Object.entries(infoData).map(([key, value]) => (
            <div key={key} className="flex text-xs mb-1">
              <span className="text-gray-600 mr-2">{key}:</span>
              <span className="text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkTopology; 