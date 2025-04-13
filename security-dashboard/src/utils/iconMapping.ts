/**
 * 图标资源映射工具
 * 集中管理平台概览页使用的所有图标资源
 */

// 平台图标
// 注意：这些导入路径需要在实际添加图片后才能生效
import resourceIcon from '../assets/icons/platform/resource.png';
import identityIcon from '../assets/icons/platform/identity.png';
import standardIcon from '../assets/icons/platform/standard.png';

// 服务图标
// import identifyServiceIcon from '../assets/icons/services/identify.png';
// import protectionIcon from '../assets/icons/services/protection.png';
// import detectionIcon from '../assets/icons/services/detection.png';
// import responseIcon from '../assets/icons/services/response.png';

// 规则图标
import identifyRuleIcon from '../assets/icons/rules/identify.png';
import protectionRuleIcon from '../assets/icons/rules/protection.png';
import detectRuleIcon from '../assets/icons/rules/detect.png';
import responseRuleIcon from '../assets/icons/rules/response.png';
import passwordRuleIcon from '../assets/icons/rules/password.png';

// 接口图标
import apiIcon from '../assets/icons/interface/api.png';
import southApiIcon from '../assets/icons/interface/south.png';
import northApiIcon from '../assets/icons/interface/north.png';

// 图标映射对象
// 当实际添加图片后，取消下面注释
const iconMap: Record<string, string> = {
  // 平台图标
  resource: resourceIcon,
  identity: identityIcon,
  standard: standardIcon,
  
  // 规则图标
  identifyRule: identifyRuleIcon,
  protectionRule: protectionRuleIcon,
  detectRule: detectRuleIcon,
  responseRule: responseRuleIcon,
  passwordRule: passwordRuleIcon,
  
  // 服务图标
  // identifyService: identifyServiceIcon,
  // protectionService: protectionIcon,
  // detectionService: detectionIcon,
  // responseService: responseIcon,
  
  // 接口图标
  api: apiIcon,
  southApi: southApiIcon,
  northApi: northApiIcon,
};

/**
 * 获取图标资源
 * @param iconKey 图标键名
 * @param fallback 备选图标键名（当指定图标不存在时使用）
 * @returns 图标资源路径
 */
export const getIcon = (iconKey: string, fallback?: string): string | null => {
  return iconMap[iconKey] || (fallback ? iconMap[fallback] : null);
};

export default iconMap; 