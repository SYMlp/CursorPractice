import React, { useState } from 'react';
import './App.css';
import InterfaceMonitoring from './pages/InterfaceMonitoring';
import AssetMonitoring from './pages/AssetMonitoring';
import DataAssetMonitoring from './pages/DataAssetMonitoring';
import PlatformOverview from './pages/PlatformOverview';
import { NotificationProvider, GlobalNotificationListener } from './services/NotificationService';
import NotificationServiceExample from './components/examples/NotificationServiceExample';

// 使用内联SVG组件替代外部SVG文件
const SecurityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.8 1.1 2.8 2.5V11h1.7v5h-9v-5h1.7V9.5C9.2 8.1 10.6 7 12 7zm0 1.5c-.8 0-1.3.6-1.3 1.3V11h2.6V9.8c0-.7-.5-1.3-1.3-1.3z" />
  </svg>
);

const InterfaceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z" />
  </svg>
);

const AssetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  </svg>
);

const OverviewIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

function App() {
  const [activePage, setActivePage] = useState('platform');

  // 菜单项数据
  const menuItems = [
    { id: 'platform', label: '平台概览', icon: <OverviewIcon className="w-6 h-6" /> },
    { id: 'interface', label: '接口监控', icon: <InterfaceIcon className="w-6 h-6" /> },
    { id: 'asset', label: '应用资产监控', icon: <AssetIcon className="w-6 h-6" /> },
    { id: 'security', label: '数据资产安全', icon: <SecurityIcon className="w-6 h-6" /> },
  ];

  return (
    <NotificationProvider>
      <GlobalNotificationListener />
      <div className="bg-gray-100 min-h-screen">
        {/* 导航栏 - 使用深蓝色背景 */}
        <nav className="bg-blue-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-xl">安全管理平台</span>
            </div>
            <div>
              <button className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                登录
              </button>
            </div>
          </div>
        </nav>

        {/* 左侧菜单栏和主内容区 */}
        <div className="flex">
          {/* 侧边栏 */}
          <div className="bg-white w-64 min-h-screen shadow-md">
            <ul className="py-4">
              {menuItems.map((item) => (
                <li 
                  key={item.id}
                  className={`px-6 py-3 flex items-center space-x-3 cursor-pointer transition-colors ${
                    activePage === item.id ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActivePage(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              ))}
              <li 
                className="px-6 py-3 flex items-center space-x-3 cursor-pointer transition-colors hover:bg-gray-100"
                onClick={() => setActivePage('notification-example')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>通知组件示例</span>
              </li>
            </ul>
          </div>

          {/* 主内容区 */}
          <div className="flex-1 p-6">
            {activePage === 'platform' && <PlatformOverview />}
            {activePage === 'interface' && <InterfaceMonitoring />}
            {activePage === 'asset' && <AssetMonitoring />}
            {activePage === 'security' && <DataAssetMonitoring />}
            {activePage === 'notification-example' && <NotificationServiceExample />}
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
}

export default App;