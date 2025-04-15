/**
 * 网络关系图模拟数据统一导出
 */

// 导出资源流程图数据
export * from './resourceFlowData';

// 默认导出所有网络数据
import resourceFlowData from './resourceFlowData';

export default {
  resourceFlow: resourceFlowData
}; 