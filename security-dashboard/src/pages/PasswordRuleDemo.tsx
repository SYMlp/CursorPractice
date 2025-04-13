import React from 'react';
import PasswordRuleCard from '../components/cards/PasswordRuleCard';

/**
 * 密码规则卡片演示页面
 * 展示如何使用专门的PasswordRuleCard组件，该组件利用了passwordRule图标
 */
const PasswordRuleDemo: React.FC = () => {
  // 示例密码规则数据
  const passwordRules = [
    {
      id: 1,
      title: '密码长度要求',
      description: '密码至少包含8个字符，最多不超过32个字符。',
      isActive: true,
      severity: 'high' as const
    },
    {
      id: 2,
      title: '密码复杂度要求',
      description: '密码必须包含大写字母、小写字母、数字和特殊字符中的至少三类。',
      isActive: true,
      severity: 'high' as const
    },
    {
      id: 3,
      title: '密码更新周期',
      description: '密码必须每90天更新一次，提前7天提醒用户进行更新。',
      isActive: true,
      severity: 'medium' as const
    },
    {
      id: 4,
      title: '密码历史记录',
      description: '新密码不能与最近5次使用过的密码相同。',
      isActive: true,
      severity: 'medium' as const
    },
    {
      id: 5,
      title: '尝试失败限制',
      description: '连续5次密码尝试失败后，账户将被锁定30分钟。',
      isActive: true,
      severity: 'high' as const
    },
    {
      id: 6,
      title: '弱密码禁用',
      description: '系统将检测并禁止使用常见的弱密码。',
      isActive: false,
      severity: 'low' as const
    }
  ];

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">密码规则卡片演示</h1>
          <div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              添加新规则
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          此页面展示了使用专门为密码规则设计的卡片组件，它利用了密码规则图标（passwordRule）。
        </p>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {passwordRules.map(rule => (
            <PasswordRuleCard
              key={rule.id}
              title={rule.title}
              description={rule.description}
              isActive={rule.isActive}
              severity={rule.severity}
            />
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">使用说明</h2>
          <p className="text-sm text-gray-600">
            本组件使用 <code>getIcon('passwordRule')</code> 获取图标资源，展示了如何在组件中利用通用的图标映射机制。
            当图标不可用时，会回退到默认的本地图标。这种方式使得图标的使用更加灵活，便于统一管理。
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordRuleDemo; 