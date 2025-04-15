import React, { ReactNode, useState } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * 主布局组件
 * 提供应用的基本布局结构，包含侧边栏、顶部导航栏和内容区域
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = '安全仪表盘',
  subtitle = '系统总览',
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 侧边栏 */}
      <div 
        className={`bg-gray-800 text-white transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && <div className="text-xl font-bold">安全仪表盘</div>}
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-gray-700"
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {['仪表盘', '资产监控', '威胁分析', '告警中心', '系统设置'].map((item, index) => (
              <li key={index} className="mb-2">
                <a
                  href="#"
                  className={`flex items-center p-3 hover:bg-gray-700 ${
                    index === 0 ? 'bg-gray-700' : ''
                  }`}
                >
                  <span className="mr-3">📊</span>
                  {!sidebarCollapsed && <span>{item}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow">
          <div className="p-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-gray-500">{subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded hover:bg-gray-100">
                🔍
              </button>
              <button className="p-2 rounded hover:bg-gray-100">
                🔔
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                👤
              </div>
            </div>
          </div>
        </header>
        
        {/* 内容区域 */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 