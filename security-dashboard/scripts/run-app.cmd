@echo off
:: 安全大屏项目启动脚本 (CMD版)
:: 此脚本为Windows专用，可在PowerShell或CMD中正常运行

:: 切换到项目根目录
cd /d "%~dp0\.."

:: 检查是否为首次运行
if not exist "node_modules\" (
  echo 首次运行，正在安装依赖...
  call npm install
)

:: 启动应用
echo 正在启动安全大屏项目...
echo 应用启动后，将自动打开浏览器
echo 按Ctrl+C可停止应用运行

:: 设置环境变量，避免常见Node.js警告
set NODE_ENV=development

:: 延迟4秒后打开浏览器
start "" cmd /c "timeout /t 4 && start http://localhost:3000"

:: 启动应用
call npm start 