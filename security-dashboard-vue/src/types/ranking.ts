export interface RankingItem {
  id: number | string // TableTopCard 的 key 可能也是 string，改为 union type
  name: string
  value?: string | number
  risk?: string[]
  risks?: string | number
  riskCount?: string | number
  riskTypeCount?: string | number
  threatValue?: string | number // highRiskUserTableData 使用的字段
  visits?: string | number
  protection?: string
  sensitiveResources?: string | number
  riskValue?: string | number // storageRiskResourceTableData 使用的字段
  [key: string]: any // Keep this for flexibility with different data shapes
}
