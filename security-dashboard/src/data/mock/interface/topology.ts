import { TopologyData, TopologyNode, TopologyEdge } from '../../api'; // Use correct type names

// Basic mock nodes
const nodes: TopologyNode[] = [
  { id: 'api-gateway', label: 'API Gateway', type: 'external', status: 'normal', /* data: { traffic: 1500, latency: 50 } */ }, // Change type to 'external'
  { id: 'auth-service', label: 'Auth Service', type: 'service', status: 'normal', /* data: { cpu: 30, memory: 60 } */ },
  { id: 'user-service', label: 'User Service', type: 'service', status: 'warning', /* data: { cpu: 75, memory: 80 } */ },
  { id: 'order-service', label: 'Order Service', type: 'service', status: 'normal', /* data: { cpu: 40, memory: 70 } */ },
  { id: 'database', label: 'Database', type: 'database', status: 'normal', /* data: { connections: 120 } */ },
];

// Basic mock edges - Remove 'id' property
const edges: TopologyEdge[] = [
  { source: 'api-gateway', target: 'auth-service', label: 'Auth requests', /* data: { protocol: 'HTTPS' } */ },
  { source: 'api-gateway', target: 'user-service', label: 'User data', /* data: { protocol: 'HTTPS' } */ },
  { source: 'api-gateway', target: 'order-service', label: 'Order processing', /* data: { protocol: 'HTTPS' } */ },
  { source: 'user-service', target: 'database', label: 'DB Read/Write', /* data: { protocol: 'TCP' } */ },
  { source: 'order-service', target: 'database', label: 'DB Read/Write', /* data: { protocol: 'TCP' } */ },
  { source: 'auth-service', target: 'user-service', label: 'Verify User', /* data: { protocol: 'gRPC' } */ },
];

// Export the topology data structure
export const topologyData: TopologyData = {
  nodes,
  edges,
}; 