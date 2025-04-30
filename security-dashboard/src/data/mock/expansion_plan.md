 # Mock 数据扩充计划

本文档旨在规划如何扩充现有的 Mock 数据，使其更贴近真实场景，覆盖更多边界情况，并更好地支持前端开发与测试。

## 扩充原则

1.  **遵循结构**: 继续遵循按模块、按 API/数据实体组织文件的结构。
2.  **类型一致**: 确保所有 Mock 数据严格符合 `src/data/api/types.ts` 中定义的类型。
3.  **提升真实感**: 使用多样化、合理范围的数据，避免过多静态或重复内容。考虑引入数据生成工具（如 faker-js，若允许）。
4.  **覆盖边界**: 包含空数据、缺少可选字段、极端值等情况。
5.  **记录清晰**: 在 Mock 数据文件或本文档中添加注释，说明数据意图或模拟的场景。

## 具体扩充点

### 1. 数据真实感提升

*   [ ] **平台模块 (`platform/`)**:
    *   `resourceOverview.ts`: 随机化 `count` 值，模拟 `metrics` 百分比的波动。
    *   `resourceTypes.ts`: 调整 `percentage` 使其总和不总是固定，模拟真实分布。
    *   `securityRules.ts`: 随机化 `count`, `baseCount`, `todayCount`。
    *   `interfaceOverview.ts`: 随机化 `count`, `securityRate`, `publishRate`, `callbackRate`。
    *   `serviceTimeseries.ts`: 改进 `getServiceTimeseriesMock`，使其生成的时序数据包含一些趋势或噪声，而不仅仅是纯随机或固定模式。
*   [ ] **接口模块 (`interface/`)**:
    *   `metrics.ts`: 随机化指标的 `value`。
    *   `timeseries.ts`: 改进 `getInterfaceTimeseriesMock`，生成更真实的时序波动。
*   [ ] **数据资产模块 (`dataAsset/`)**:
    *   `stats.ts`: 随机化统计数值。
    *   `topRanking.ts`:
        *   使用生成器或更多样本替换重复/简单的名字。
        *   随机化数值、风险等级、访问量等。
        *   实现 `getDataAssetTopRankingMock` 返回不同长度的列表（模拟 `limit` 参数效果）。
    *   `riskTrend.ts`: 改进时序数据，模拟风险事件的发生模式。
*   [ ] **应用资产模块 (`appAsset/`)**:
    *   `stats.ts`: 随机化统计数值。
    *   `rankings.ts`: 随机化排名项的值、趋势、风险。
    *   `metrics.ts`: 随机化指标值。
    *   `chart.ts`: (需先确认内部实现) 确保 `generate...` 函数能产生有意义的、随时间范围变化的图表数据。
    *   `additionalData.ts`: 随机化用户、分布等数据。
    *   `assetFlowData.ts`: 使用更真实的节点/边标签和数值。

### 2. 边界情况覆盖

*   [ ] **空数据**: 在各模块的 `rankings.ts`, `topRanking.ts` 或时序数据 `series` 中，增加返回空数组 `[]` 的 Mock 场景或函数。
*   [ ] **可选字段**: 确保各种 `RankItem`, `MetricItem` 等数据中，存在缺少 `trend`, `risk`, `percent`, `icon`, `color` 等可选字段的条目。
*   [ ] **极端值**: 在统计、排名、时序数据中包含非常大或非常小（包括 0）的数值。

### 3. 动态性增强 (可选)

*   [ ] 探索 `getChartData`, `getServiceTimeseriesMock`, `getInterfaceTimeseriesMock`, `getDataAssetTopRankingMock` 等函数，看是否能根据更多参数（如筛选条件、特定 ID）返回更细致、动态的数据。

### 4. 补充缺失数据

*   [ ] **`dataAsset/resourceFlow.ts`**: 实现 `getResourceFlowMock` 函数，生成符合 `reactflow` 格式的节点和边数据。 *(此文件目前只有占位符)*
*   [ ] **`interface/topology.ts`**: 创建此文件，并添加符合 `reactflow` 格式的网络拓扑节点和边模拟数据。实现 `getTopologyMock` 函数。

## 实施说明

*   建议分模块、分批次进行扩充。
*   优先补充缺失的数据 (`resourceFlow`, `topology`)。
*   其次提升现有数据的真实感和覆盖边界情况。
*   动态性增强根据项目需求和复杂度决定是否投入。
*   每次修改后，简单验证相关页面是否能正常加载 Mock 数据。