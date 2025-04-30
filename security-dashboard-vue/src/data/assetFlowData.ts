import type { Edge, Node } from '@vue-flow/core'

export interface AssetNodeData {
  label: string
  visits: number
  type: 'asset' | 'user'
}

export const assetNodes: Node<AssetNodeData>[] = [
  {
    id: 'asset1',
    type: 'asset',
    position: { x: 100, y: 100 },
    data: { label: '客户信息数据', visits: 1234, type: 'asset' },
  },
  {
    id: 'asset2',
    type: 'asset',
    position: { x: 100, y: 250 },
    data: { label: '交易记录数据', visits: 2345, type: 'asset' },
  },
  {
    id: 'asset3',
    type: 'asset',
    position: { x: 100, y: 400 },
    data: { label: '产品配置数据', visits: 3456, type: 'asset' },
  },
  {
    id: 'user1',
    type: 'user',
    position: { x: 500, y: 150 },
    data: { label: '客服人员', visits: 890, type: 'user' },
  },
  {
    id: 'user2',
    type: 'user',
    position: { x: 500, y: 350 },
    data: { label: '运营人员', visits: 678, type: 'user' },
  },
]

export const assetEdges: Edge[] = [
  {
    id: 'e1-1',
    source: 'asset1',
    target: 'user1',
    label: '访问次数: 567',
    type: 'step',
    style: { stroke: '#0000ff', strokeWidth: 5 },
  },
  {
    id: 'e1-2',
    source: 'asset1',
    target: 'user2',
    label: '访问次数: 667',
    type: 'step',
    style: { stroke: '#0000ff', strokeWidth: 5 },
  },
  {
    id: 'e2-1',
    source: 'asset2',
    target: 'user1',
    label: '访问次数: 890',
    type: 'step',
    style: { stroke: '#0000ff', strokeWidth: 5 },
  },
  {
    id: 'e2-2',
    source: 'asset2',
    target: 'user2',
    label: '访问次数: 1455',
    type: 'step',
    style: { stroke: '#0000ff', strokeWidth: 5 },
  },
  {
    id: 'e3-2',
    source: 'asset3',
    target: 'user2',
    label: '访问次数: 1001',
    type: 'step',
    style: { stroke: '#0000ff', strokeWidth: 5 },
  },
]
