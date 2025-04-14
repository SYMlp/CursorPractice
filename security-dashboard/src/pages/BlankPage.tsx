import React from 'react';

/**
 * 安全大屏页面
 * 
 * 根据图片布局设计，使用两列布局：
 * 左列：
 * - 资源管理（左上）
 * - 安全规则（中部，含5个规则卡片）
 * - 接口管理（左下）
 * 
 * 右列：
 * - 资源类型（右上，含5个环形进度图）
 * - 数据趋势（右中右下，横跨两行，包含南向接口数据量）
 * - 其他服务数据量图表位于页面底部
 */
const BlankPage: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* 两列主布局 */}
        <div className="grid grid-cols-4 gap-4">
          {/* 左列 - 包含资源管理、安全规则、接口管理 */}
          <div className="col-span-1 space-y-4">
            {/* 资源管理 */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-gray-700 mb-4">资源管理</h2>
              <div className="flex items-start">
                {/* 这里将放置资源管理的图标和数据 */}
                <div className="w-16 h-16 bg-blue-100 rounded-lg mr-4"></div>
                <div className="flex-1">
                  <div className="mb-4">
                    {/* 这里将放置资源总量 */}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {/* 这里将放置指标数据 */}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 安全规则 */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-gray-700 mb-4">安全规则</h2>
              <div className="grid grid-cols-1 gap-4">
                {/* 5个安全规则卡片垂直排列 */}
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg mr-2"></div>
                      <div className="text-sm">安全规则{item}</div>
                    </div>
                    <div className="text-xl font-bold">512</div>
                    <div className="text-xs text-gray-500 mt-2">
                      规则相关数据
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 接口管理 */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-gray-700 mb-4">接口管理</h2>
              <div className="flex items-start">
                <div className="w-16 h-16 bg-blue-100 rounded-lg mr-4"></div>
                <div className="flex-1">
                  <div className="mb-4">
                    {/* 接口数量 */}
                  </div>
                  <div className="mt-4">
                    {/* 环形进度图占位 */}
                    <div className="w-28 h-28 mx-auto rounded-full border-4 border-gray-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右列 - 包含资源类型和数据趋势图 */}
          <div className="col-span-3 space-y-4">
            {/* 资源类型 */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-gray-700 mb-4">资源类型</h2>
              <div className="grid grid-cols-5 gap-4">
                {/* 5个环形进度图占位 */}
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-gray-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">%</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-center">资源类型{item}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 数据趋势 - 扩展的区域（占据第三行和第四行的位置） */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-700">数据趋势</h2>
                <div className="flex items-center space-x-2">
                  <button className="text-xs px-2 py-1 bg-gray-100 rounded">一天</button>
                  <button className="text-xs px-2 py-1 bg-gray-100 rounded">一周</button>
                </div>
              </div>
              {/* 图表占位 - 高度更大，适合展示大型图表 */}
              <div className="h-96 bg-gray-50 rounded flex flex-col items-center justify-center">
                <span className="text-gray-400">南向接口数据量图表</span>
                <div className="mt-4 w-full px-4">
                  <div className="h-4 bg-blue-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-green-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-yellow-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-red-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-purple-200 rounded w-4/5"></div>
                </div>
                <div className="grid grid-cols-5 w-full mt-6 px-4">
                  <div className="text-center text-xs text-gray-500">00:00</div>
                  <div className="text-center text-xs text-gray-500">06:00</div>
                  <div className="text-center text-xs text-gray-500">12:00</div>
                  <div className="text-center text-xs text-gray-500">18:00</div>
                  <div className="text-center text-xs text-gray-500">24:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 底部服务数据图表区域 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* 防护服务数据量 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">防护服务数据量</h2>
              <div className="flex items-center space-x-2">
                <button className="text-xs px-2 py-1 bg-gray-100 rounded">一天</button>
                <button className="text-xs px-2 py-1 bg-gray-100 rounded">一周</button>
              </div>
            </div>
            {/* 图表占位 */}
            <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
              <span className="text-gray-400">防护服务数据量图表</span>
            </div>
          </div>
          
          {/* 检测服务接口数据量 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">检测服务接口数据量</h2>
              <div className="flex items-center space-x-2">
                <button className="text-xs px-2 py-1 bg-gray-100 rounded">一天</button>
                <button className="text-xs px-2 py-1 bg-gray-100 rounded">一周</button>
              </div>
            </div>
            {/* 图表占位 */}
            <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
              <span className="text-gray-400">检测服务接口数据量图表</span>
            </div>
          </div>
          
          {/* 响应服务接口数据量 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">响应服务接口数据量</h2>
              <div className="flex items-center space-x-2">
                <button className="text-xs px-2 py-1 bg-gray-100 rounded">一天</button>
                <button className="text-xs px-2 py-1 bg-gray-100 rounded">一周</button>
              </div>
            </div>
            {/* 图表占位 */}
            <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
              <span className="text-gray-400">响应服务接口数据量图表</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlankPage; 