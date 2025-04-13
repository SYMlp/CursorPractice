import React from 'react';
import { ImageIcon } from '../icons';
import { getIcon } from '../../utils/iconMapping';
// 导入默认图标，当 getIcon 返回 null 时使用
import passwordRuleIcon from '../../assets/icons/rules/password.png';

interface PasswordRuleCardProps {
  title: string;
  description: string;
  isActive: boolean;
  severity: 'low' | 'medium' | 'high';
}

/**
 * 密码规则卡片组件
 * 用于展示特定的密码规则及其详情
 */
const PasswordRuleCard: React.FC<PasswordRuleCardProps> = ({
  title,
  description,
  isActive,
  severity
}) => {
  // 根据严重程度选择颜色
  const getSeverityColor = () => {
    switch (severity) {
      case 'high': return '#ef4444'; // 红色
      case 'medium': return '#f59e0b'; // 橙色
      case 'low': return '#3b82f6'; // 蓝色
      default: return '#3b82f6';
    }
  };

  const color = getSeverityColor();
  // 获取图标并处理可能的 null 值
  const iconSrc = getIcon('passwordRule') || passwordRuleIcon;

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex items-center mb-3">
        <div className="mr-4">
          {/* 使用密码规则图标 */}
          <ImageIcon 
            src={iconSrc}
            width={32} 
            height={32} 
            alt="密码规则图标"
          />
        </div>
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className={`text-xs py-1 px-2 rounded-full inline-block ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isActive ? '已启用' : '已禁用'}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-3">
        {description}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xs" style={{ color }}>
          {severity === 'high' ? '高强度' : severity === 'medium' ? '中强度' : '低强度'}
        </div>
        <button className="text-xs text-blue-500 hover:text-blue-700">
          查看详情
        </button>
      </div>
    </div>
  );
};

export default PasswordRuleCard; 