#!/bin/bash

# 终止于错误
set -e

# 彩色输出函数
print_blue() {
    echo -e "\033[34m$1\033[0m"
}

print_green() {
    echo -e "\033[32m$1\033[0m"
}

print_yellow() {
    echo -e "\033[33m$1\033[0m"
}

print_red() {
    echo -e "\033[31m$1\033[0m"
}

# 清屏（跨平台兼容）
clear

# 错误处理函数
handle_error() {
    print_red "错误: 脚本执行失败 ($1)"
    print_red "位置: 第 ${BASH_LINENO[0]} 行"
    exit 1
}

# 设置错误处理
trap 'handle_error $LINENO' ERR

# 处理CTRL+C
handle_interrupt() {
    echo ""
    print_yellow "用户中断，正在停止应用..."
    print_green "应用已停止"
    exit 0
}

trap handle_interrupt INT

# 检查npm是否已安装
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_red "错误: 未找到npm，请确保Node.js已正确安装"
        exit 1
    fi
    
    npm_version=$(npm --version)
    print_green "已检测到npm版本: $npm_version"
}

# 打印欢迎信息
print_blue "====================================="
print_blue "    安全大屏项目启动脚本 v1.1 (Bash版)    "
print_blue "====================================="

# 获取脚本所在目录的上一级目录(项目根目录)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# 切换到项目根目录
print_green "1. 切换到项目目录: $PROJECT_DIR"
cd "$PROJECT_DIR" || { print_red "无法切换到项目目录"; exit 1; }

# 检查npm是否安装
print_green "2. 检查npm是否可用..."
check_npm

# 检查node_modules是否存在
print_green "3. 检查依赖..."
if [ ! -d "node_modules" ]; then
    print_yellow "依赖不存在，首次运行，安装依赖中..."
    print_yellow "这可能需要几分钟时间，请耐心等待..."
    npm install || {
        print_yellow "警告: npm install 命令可能未成功完成，尝试继续执行..."
    }
else
    print_green "依赖已安装，跳过安装步骤..."
fi

# 启动应用
print_green "4. 启动应用程序..."
print_blue "启动完成后，请访问: http://localhost:3000"
print_yellow "按Ctrl+C可以停止应用"
print_blue "====================================="

# 尝试自动打开浏览器（如果有xdg-open或open命令）
(sleep 4 && {
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:3000" &>/dev/null
    elif command -v open &> /dev/null; then
        open "http://localhost:3000" &>/dev/null
    else
        print_yellow "无法自动打开浏览器，请手动访问 http://localhost:3000"
    fi
}) &

# 设置开发环境变量
export NODE_ENV=development

# 启动应用
npm start

# 应用结束后
print_green "应用已停止"
print_blue "=====================================" 