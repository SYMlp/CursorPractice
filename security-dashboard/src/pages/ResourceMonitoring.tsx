/**
 * 兼容性重定向文件
 * 
 * 该文件用于保持向后兼容性，将ResourceMonitoring重定向至PlatformOverview
 * 
 * 更新记录：
 * - 2024-05-01: 将ResourceMonitoring重命名为PlatformOverview，创建此重定向文件确保兼容性
 */

import PlatformOverview from './PlatformOverview';

// 导出PlatformOverview作为默认导出，保持向后兼容
export default PlatformOverview; 