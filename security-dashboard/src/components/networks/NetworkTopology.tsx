import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { TopologyNode, TopologyEdge } from '../../data/api/interface'; // Import types

interface NodeDetails {
  name: string;
  type: string;
  ports: string[];
  interfaces: string[];
}

// Define Props interface
interface NetworkTopologyProps {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
}

const NetworkTopology: React.FC<NetworkTopologyProps> = ({ nodes, edges }) => {
  const [selectedNode, setSelectedNode] = useState<NodeDetails | null>(null);

  // Remove hardcoded nodes and links
  // const nodes = [ ... ]; // REMOVED
  // const links = [ ... ]; // REMOVED

  // Map props to ECharts format
  const echartsNodes = nodes.map((node, index) => ({
    id: node.id, // Use id from props
    name: node.label, // Use label as name
    // Add default/derived values for ECharts properties if not in TopologyNode
    value: 10, // Example: derive size/value based on type or properties?
    category: node.type === 'service' ? 1 : (node.type === 'database' ? 2 : 0), // Example category mapping
    symbol: 'circle',
    symbolSize: node.type === 'service' ? 50 : (node.type === 'database' ? 40 : 30), // Example size mapping
    itemStyle: {
      color: node.status === 'warning' ? '#F59E0B' : (node.status === 'error' ? '#EF4444' : '#3B82F6') // Example color mapping
    },
    // If node details are needed for tooltip/popup, add them here
    // details: { name: node.label, type: node.type || 'N/A', ports: [], interfaces: [] } // Example details mapping
  }));

  const echartsEdges = edges.map(edge => ({
    source: edge.source, // Use source id from props
    target: edge.target, // Use target id from props
    // Add default/derived values for ECharts link properties
    lineStyle: {
      color: edge.status === 'warning' ? '#F59E0B' : (edge.status === 'error' ? '#EF4444' : '#94A3B8'), // Example color mapping
      width: 2
    },
    label: { // Optional: show edge label
      show: !!edge.label,
      formatter: edge.label
    }
  }));

  const option = {
    tooltip: {},
    legend: [
      {
        // Example legend based on mapped categories
        data: ['Unknown/Other', 'Service', 'Database'].map(a => String(a))
      }
    ],
    series: [
      {
        name: 'Network Topology',
        type: 'graph',
        layout: 'force',
        data: echartsNodes, // Use mapped nodes
        links: echartsEdges, // Use mapped edges
        categories: [
          { name: 'Unknown/Other' }, // Corresponds to category 0
          { name: 'Service' },       // Corresponds to category 1
          { name: 'Database' }      // Corresponds to category 2
        ],
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        },
        force: {
          repulsion: 100,
          gravity: 0.03,
          edgeLength: 80
        }
      }
    ]
  };

  // TODO: Implement click handling (onChartClick) if needed, 
  // potentially mapping ECharts params back to TopologyNode data
  const onChartClick = (params: any) => {
    console.log('Chart clicked', params);
    // Example: Find the original node data based on params.data.id
    const clickedNodeData = nodes.find(n => n.id === params.data.id);
    if (clickedNodeData) {
       // Update selectedNode state or show details
       // setSelectedNode( ... map TopologyNode to NodeDetails ... );
       console.log('Original Node Data:', clickedNodeData);
    }
  };

  return (
    <div className="relative w-full h-full">
      <ReactECharts 
        echarts={echarts} 
        option={option} 
        style={{ height: '100%', width: '100%' }} 
        onEvents={{ 'click': onChartClick }} 
      />
      {/* Optional: Display selected node details */}
      {/* {selectedNode && ( ... details popup ... ) } */}
    </div>
  );
};

export default NetworkTopology; 