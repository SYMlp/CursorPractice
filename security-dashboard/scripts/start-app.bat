@echo off
setlocal enabledelayedexpansion

:: 设置颜色代码
set "BLUE=[94m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "RESET=[0m"

:: 清屏
cls

:: 打印带颜色的文本
echo %BLUE%====================================%RESET%
echo %BLUE%    安全大屏项目启动脚本 v1.1      %RESET%
echo %BLUE%====================================%RESET%

:: 检查是否在正确的目录
echo %GREEN%1. 检查并切换到正确目录...%RESET%
set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%\..
cd /d "%PROJECT_DIR%"

:: 检查npm是否安装
echo %GREEN%2. 检查npm是否可用...%RESET%
where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo %RED%错误: 未找到npm，请确保Node.js已正确安装%RESET%
    echo 按任意键退出...
    pause > nul
    exit /b 1
)

:: 检查node_modules是否存在
echo %GREEN%3. 检查依赖...%RESET%
if not exist "node_modules\" (
    echo %YELLOW%依赖不存在，首次运行，安装依赖中...%RESET%
    echo 这可能需要几分钟时间，请耐心等待...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo %YELLOW%警告: npm install 命令可能未成功完成，尝试继续执行...%RESET%
    )
) else (
    echo %GREEN%依赖已安装，跳过安装步骤...%RESET%
)

:: 启动应用程序
echo %GREEN%4. 启动应用程序...%RESET%
echo %BLUE%启动完成后，请访问: http://localhost:3000%RESET%
echo %YELLOW%按Ctrl+C可以停止应用%RESET%
echo %BLUE%====================================%RESET%

:: 尝试自动打开浏览器
ping -n 4 127.0.0.1 > nul
start http://localhost:3000

:: 设置环境变量
set "NODE_ENV=development"
:: 设置OpenSSL兼容模式，解决Node.js 17+版本的兼容性问题
set "NODE_OPTIONS=--openssl-legacy-provider"

echo %GREEN%已设置OpenSSL兼容性模式，解决Node.js 22+版本兼容性问题%RESET%

:: 启动应用
call npm start

:: 应用结束后
echo.
echo %GREEN%应用已停止%RESET%
echo %BLUE%====================================%RESET%
echo 按任意键退出...
pause > nul 