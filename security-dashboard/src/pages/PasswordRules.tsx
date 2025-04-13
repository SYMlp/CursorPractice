import React from 'react';
import RuleCard from '../components/cards/RuleCard';
import { passwordRulesData } from '../data/mockData';
import { ImageIcon } from '../components/icons';
import { getIcon } from '../utils/iconMapping';
import { KeyIcon, LockIcon, ShieldIcon, ClockIcon, HistoryIcon } from '../components/icons/Icons';

/**
 * 密码规则页面
 * 展示系统中的各类密码安全规则，包括：
 * - 复杂度规则
 * - 更新周期规则
 * - 历史复用规则
 * - 密码验证规则
 * - 强制重置规则
 */
const PasswordRules: React.FC = () => {
  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">密码安全规则管理</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              添加规则
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              导出规则
            </button>
          </div>
        </div>

        {/* 规则卡片区域 */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3 text-gray-700">规则概览</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {passwordRulesData.map((rule, index) => (
              <RuleCard 
                key={index}
                // 使用Icon组件
                icon={
                  index === 0 ? <KeyIcon color={rule.color} /> :
                  index === 1 ? <ClockIcon color={rule.color} /> :
                  index === 2 ? <HistoryIcon color={rule.color} /> :
                  index === 3 ? <ShieldIcon color={rule.color} /> :
                  <LockIcon color={rule.color} />
                }
                
                // 或使用图标映射工具（当实际添加图片后使用）:
                // icon={
                //   <ImageIcon 
                //     src={getIcon('passwordRule')}
                //     width={32} 
                //     height={32} 
                //   />
                // }
                
                title={rule.title}
                count={rule.count}
                baseCount={rule.baseCount}
                todayCount={rule.todayCount}
                color={rule.color}
              />
            ))}
          </div>
        </div>

        {/* 规则详情表格 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-3 text-gray-700">规则详情</h2>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">规则名称</th>
                <th className="py-2 px-4 text-left">规则类型</th>
                <th className="py-2 px-4 text-left">应用范围</th>
                <th className="py-2 px-4 text-left">状态</th>
                <th className="py-2 px-4 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">密码长度要求</td>
                <td className="py-2 px-4">复杂度规则</td>
                <td className="py-2 px-4">所有用户</td>
                <td className="py-2 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">启用</span>
                </td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">编辑</button>
                  <button className="text-red-500 hover:text-red-700">禁用</button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">特殊字符要求</td>
                <td className="py-2 px-4">复杂度规则</td>
                <td className="py-2 px-4">所有用户</td>
                <td className="py-2 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">启用</span>
                </td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">编辑</button>
                  <button className="text-red-500 hover:text-red-700">禁用</button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">90天强制更新</td>
                <td className="py-2 px-4">更新周期规则</td>
                <td className="py-2 px-4">普通用户</td>
                <td className="py-2 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">启用</span>
                </td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">编辑</button>
                  <button className="text-red-500 hover:text-red-700">禁用</button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">禁止使用最近5个密码</td>
                <td className="py-2 px-4">历史复用规则</td>
                <td className="py-2 px-4">所有用户</td>
                <td className="py-2 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">启用</span>
                </td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">编辑</button>
                  <button className="text-red-500 hover:text-red-700">禁用</button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4">连续失败5次锁定</td>
                <td className="py-2 px-4">密码验证规则</td>
                <td className="py-2 px-4">所有用户</td>
                <td className="py-2 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">待审批</span>
                </td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">审批</button>
                  <button className="text-red-500 hover:text-red-700">拒绝</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PasswordRules; 