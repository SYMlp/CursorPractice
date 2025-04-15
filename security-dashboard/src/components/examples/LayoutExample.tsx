import React from 'react';
import MainLayout from '../layout/MainLayout';
import ContentLayout from '../layout/ContentLayout';

const LayoutExample: React.FC = () => {
  // 模拟操作按钮组件
  const ActionButtons = () => (
    <div className="flex gap-2">
      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
        刷新
      </button>
      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
        导出
      </button>
    </div>
  );

  return (
    <MainLayout title="示例页面" subtitle="演示布局组件的使用方法">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* 卡片布局示例 */}
        <ContentLayout title="基础信息" subtitle="系统基本状态信息">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-500">设备总数</p>
              <p className="text-2xl font-bold text-blue-600">256</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-gray-500">正常运行</p>
              <p className="text-2xl font-bold text-green-600">98%</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded">
              <p className="text-sm text-gray-500">告警数量</p>
              <p className="text-2xl font-bold text-yellow-600">12</p>
            </div>
            <div className="bg-red-50 p-4 rounded">
              <p className="text-sm text-gray-500">风险数量</p>
              <p className="text-2xl font-bold text-red-600">5</p>
            </div>
          </div>
        </ContentLayout>

        {/* 带额外操作的内容布局 */}
        <ContentLayout 
          title="资产统计" 
          subtitle="最近7天资产访问统计" 
          extra={<ActionButtons />}
        >
          <div className="h-full flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">图表区域</p>
          </div>
        </ContentLayout>

        {/* 表格示例布局 */}
        <ContentLayout title="最近活动">
          <div className="space-y-3">
            {[1, 2, 3, 4].map(item => (
              <div key={item} className="p-3 border border-gray-100 rounded hover:bg-gray-50">
                <div className="flex justify-between">
                  <span className="font-medium">用户登录</span>
                  <span className="text-sm text-gray-500">10分钟前</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  用户admin从192.168.1.{item}登录系统
                </p>
              </div>
            ))}
          </div>
        </ContentLayout>
      </div>

      {/* 全宽内容区域 */}
      <ContentLayout 
        title="详细数据" 
        subtitle="展示系统数据详情"
        extra={<ActionButtons />}
      >
        <div className="h-[400px] border border-gray-200 rounded p-4">
          <p>这是一个全宽的内容区域，可以放置更复杂的数据或图表</p>
          <div className="mt-4 h-[300px] bg-gray-50 flex items-center justify-center">
            <p className="text-gray-500">图表或表格内容区域</p>
          </div>
        </div>
      </ContentLayout>
    </MainLayout>
  );
};

export default LayoutExample; 