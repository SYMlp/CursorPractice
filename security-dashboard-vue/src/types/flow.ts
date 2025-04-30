// Type definitions extracted from ResourceFlowChart.tsx

export enum AccessFrequency {
  LOW = '低频',
  MEDIUM = '中频',
  HIGH = '高频',
  VERY_HIGH = '超高频',
}

export enum RiskLevel {
  LOW = '低风险',
  MEDIUM = '中风险',
  HIGH = '高风险',
  VERY_HIGH = '极高风险',
}

// Node data structure expected by custom nodes and chart
export interface NodeData {
  label: string
  accessCount?: number
  frequency?: AccessFrequency
  riskLevel?: RiskLevel
  riskScore?: number
  description?: string
  // Add any other relevant fields observed in data
}

// Edge data structure
export interface EdgeData {
  frequency?: AccessFrequency
  accessCount?: number
  lastAccess?: string
  riskLevel?: RiskLevel
  riskScore?: number
  // Add any other relevant fields
}

// Helper function moved from ResourceFlowChart.tsx
export const getEdgeColorByRisk = (riskLevel?: RiskLevel): string => {
  switch (riskLevel) {
    case RiskLevel.VERY_HIGH:
      return '#ff4500' // 红色
    case RiskLevel.HIGH:
      return '#ff8c00' // 橙色
    case RiskLevel.MEDIUM:
      return '#ffa500' // 浅橙色
    case RiskLevel.LOW:
      return '#32cd32' // 绿色
    default:
      return '#1d4ed8' // 默认蓝色
  }
}
