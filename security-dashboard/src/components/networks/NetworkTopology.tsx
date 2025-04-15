import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

interface NodeDetails {
  name: string;
  type: string;
  ports: string[];
  interfaces: string[];
}

const NetworkTopology: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeDetails | null>(null);

  // 节点数据
  const nodes = [
    // 根节点
    {
      name: '安全防护',
      value: 60,
      category: 0,
      symbol: 'circle',
      symbolSize: 70,
      itemStyle: {
        color: '#3B82F6'
      },
      details: {
        name: '安全防护',
        type: '系统',
        ports: ['45533'],
        interfaces: ['安全管理接口', '策略配置接口']
      }
    },
    // 一级节点 - 四大服务
    {
      name: '识别服务',
      value: 50,
      category: 1,
      symbol: 'circle',
      symbolSize: 60,
      itemStyle: {
        color: '#F97316'
      },
      details: {
        name: '识别服务',
        type: '服务',
        ports: ['8080'],
        interfaces: ['资产识别接口', '服务管理接口']
      }
    },
    {
      name: '防护服务',
      value: 50,
      category: 1,
      symbol: 'circle',
      symbolSize: 60,
      itemStyle: {
        color: '#F97316'
      },
      details: {
        name: '防护服务',
        type: '服务',
        ports: ['8081'],
        interfaces: ['防护策略接口', '规则配置接口']
      }
    },
    {
      name: '检测服务',
      value: 50,
      category: 1,
      symbol: 'circle',
      symbolSize: 60,
      itemStyle: {
        color: '#F97316'
      },
      details: {
        name: '检测服务',
        type: '服务',
        ports: ['8082'],
        interfaces: ['威胁检测接口', '告警管理接口']
      }
    },
    {
      name: '响应服务',
      value: 50,
      category: 1,
      symbol: 'circle',
      symbolSize: 60,
      itemStyle: {
        color: '#F97316'
      },
      details: {
        name: '响应服务',
        type: '服务',
        ports: ['8083'],
        interfaces: ['事件响应接口', '处置管理接口']
      }
    },
    // 一级节点 - 四大类
    {
      name: '安全识别类',
      value: 45,
      category: 2,
      symbol: 'circle',
      symbolSize: 55,
      itemStyle: {
        color: '#8B5CF6'
      },
      details: {
        name: '安全识别类',
        type: '类别',
        ports: ['9001'],
        interfaces: ['识别能力接口']
      }
    },
    {
      name: '安全防护类',
      value: 45,
      category: 2,
      symbol: 'circle',
      symbolSize: 55,
      itemStyle: {
        color: '#8B5CF6'
      },
      details: {
        name: '安全防护类',
        type: '类别',
        ports: ['9002'],
        interfaces: ['防护能力接口']
      }
    },
    {
      name: '安全检测类',
      value: 45,
      category: 2,
      symbol: 'circle',
      symbolSize: 55,
      itemStyle: {
        color: '#8B5CF6'
      },
      details: {
        name: '安全检测类',
        type: '类别',
        ports: ['9003'],
        interfaces: ['检测能力接口']
      }
    },
    {
      name: '安全响应类',
      value: 45,
      category: 2,
      symbol: 'circle',
      symbolSize: 55,
      itemStyle: {
        color: '#8B5CF6'
      },
      details: {
        name: '安全响应类',
        type: '类别',
        ports: ['9004'],
        interfaces: ['响应能力接口']
      }
    },
    // 二级节点
    {
      name: '主机资产发现',
      value: 40,
      category: 3,
      symbol: 'circle',
      symbolSize: 50,
      itemStyle: {
        color: '#10B981'
      },
      details: {
        name: '主机资产发现',
        type: '功能',
        ports: ['7001'],
        interfaces: ['资产发现接口', '资产管理接口']
      }
    },
    {
      name: '软件资产识别',
      value: 40,
      category: 3,
      symbol: 'circle',
      symbolSize: 50,
      itemStyle: {
        color: '#10B981'
      },
      details: {
        name: '软件资产识别',
        type: '功能',
        ports: ['7002'],
        interfaces: ['软件识别接口', '软件管理接口']
      }
    },
    {
      name: '网络攻击抑制',
      value: 40,
      category: 3,
      symbol: 'circle',
      symbolSize: 50,
      itemStyle: {
        color: '#10B981'
      },
      details: {
        name: '网络攻击抑制',
        type: '功能',
        ports: ['7003'],
        interfaces: ['攻击抑制接口', '策略配置接口']
      }
    }
  ];

  // 连线数据
  const links = [
    // 根节点到一级节点
    {
      source: '安全防护',
      target: '识别服务',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    {
      source: '安全防护',
      target: '防护服务',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    {
      source: '安全防护',
      target: '检测服务',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    {
      source: '安全防护',
      target: '响应服务',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    {
      source: '安全防护',
      target: '安全识别类',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    {
      source: '安全防护',
      target: '安全防护类',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    {
      source: '安全防护',
      target: '安全检测类',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    {
      source: '安全防护',
      target: '安全响应类',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    // 识别服务到二级节点
    {
      source: '识别服务',
      target: '主机资产发现',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    {
      source: '识别服务',
      target: '软件资产识别',
      lineStyle: { color: '#94A3B8', width: 2 }
    },
    // 响应服务到二级节点
    {
      source: '响应服务',
      target: '网络攻击抑制',
      lineStyle: { color: '#94A3B8', width: 2 }
    }
  ];

  const categories = [
    { name: '根节点' },
    { name: '服务节点' },
    { name: '类别节点' },
    { name: '功能节点' }
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { data } = params;
        if (data.details) {
          return `
            <div class="font-medium">${data.details.name}</div>
            <div class="text-xs mt-1">类型：${data.details.type}</div>
            <div class="text-xs">端口：${data.details.ports.join(', ')}</div>
          `;
        }
        return data.name;
      }
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
        layout: 'force',
        data: nodes,
        links: links,
        categories: categories,
        roam: true,
        draggable: true,
        force: {
          repulsion: 400,
          edgeLength: 200
        },
        label: {
          show: true,
          position: 'bottom',
          formatter: '{b}',
          fontSize: 12,
          color: '#666'
        },
        lineStyle: {
          curveness: 0  // 设置为0表示直线
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4
          }
        }
      }
    ]
  };

  const onChartClick = (params: any) => {
    if (params.data && params.data.details) {
      setSelectedNode(params.data.details);
    }
  };

  const onEvents = {
    click: onChartClick
  };

  return (
    <div className="relative">
      <ReactECharts
        option={option}
        style={{ height: '400px' }}
        onEvents={onEvents}
      />
      
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64">
          <div className="flex justify-between items-center mb-3">
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setSelectedNode(null)}
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium text-gray-500">名称</div>
              <div className="text-sm">{selectedNode.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">类型</div>
              <div className="text-sm">{selectedNode.type}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">端口</div>
              <div className="text-sm">{selectedNode.ports.join(', ')}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">接口列表</div>
              <ul className="list-disc list-inside text-sm">
                {selectedNode.interfaces.map((intf, index) => (
                  <li key={index}>{intf}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkTopology; 