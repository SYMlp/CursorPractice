// Corresponds to API: GET /asset/stats

// Define type based on api_documentation_plan.md (Ideally import from api/types.ts)
interface AssetStatsData {
  totalAssets: number;
  activeAssets: number;
  riskAssets: number;
  businessApplications: number;
  growthRate: number;
}

export const assetStatsData: AssetStatsData = {
  totalAssets: 328,
  activeAssets: 287,
  riskAssets: 42,
  businessApplications: 156,
  growthRate: 12.5, // Example: 12.5%
}; 