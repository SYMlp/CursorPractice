#!/bin/bash

# 安全仪表盘Docker部署脚本
# 使用方法: ./deploy.sh [参数]
# 参数:
#   - build: 构建Docker镜像
#   - start: 启动容器
#   - stop: 停止容器
#   - restart: 重启容器
#   - logs: 查看日志
#   - status: 查看容器状态
#   - help: 显示帮助信息

# 变量定义
APP_NAME="security-dashboard"
IMAGE_NAME="security-dashboard:latest"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的信息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 帮助信息
show_help() {
    echo "安全仪表盘Docker部署脚本"
    echo "使用方法: ./deploy.sh [参数]"
    echo "参数:"
    echo "  - build: 构建Docker镜像"
    echo "  - start: 启动容器"
    echo "  - stop: 停止容器"
    echo "  - restart: 重启容器"
    echo "  - logs: 查看日志"
    echo "  - status: 查看容器状态"
    echo "  - help: 显示帮助信息"
}

# 检查Docker是否安装
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker未安装，请先安装Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_warning "Docker Compose未安装，部分功能可能无法使用"
    fi
}

# 构建Docker镜像
build_image() {
    print_info "开始构建 $IMAGE_NAME 镜像..."
    
    # 确保docker目录存在
    if [ ! -d "docker" ]; then
        print_info "创建docker目录..."
        mkdir -p docker
    fi
    
    # 确保nginx配置文件存在
    if [ ! -f "docker/nginx.conf" ]; then
        print_error "未找到nginx配置文件，请确保docker/nginx.conf存在"
        exit 1
    fi
    
    # 构建镜像
    docker-compose build
    
    if [ $? -eq 0 ]; then
        print_success "镜像构建成功"
    else
        print_error "镜像构建失败"
        exit 1
    fi
}

# 启动容器
start_container() {
    print_info "启动 $APP_NAME 容器..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        print_success "$APP_NAME 已成功启动"
        print_info "可以通过 http://localhost 访问应用"
    else
        print_error "启动容器失败"
        exit 1
    fi
}

# 停止容器
stop_container() {
    print_info "停止 $APP_NAME 容器..."
    docker-compose down
    
    if [ $? -eq 0 ]; then
        print_success "$APP_NAME 已停止"
    else
        print_error "停止容器失败"
        exit 1
    fi
}

# 重启容器
restart_container() {
    print_info "重启 $APP_NAME 容器..."
    docker-compose restart
    
    if [ $? -eq 0 ]; then
        print_success "$APP_NAME 已重启"
    else
        print_error "重启容器失败"
        exit 1
    fi
}

# 查看日志
view_logs() {
    print_info "显示 $APP_NAME 日志..."
    docker-compose logs -f
}

# 查看状态
check_status() {
    print_info "$APP_NAME 状态："
    docker-compose ps
}

# 检查Docker是否安装
check_docker

# 解析命令行参数
case "$1" in
    build)
        build_image
        ;;
    start)
        start_container
        ;;
    stop)
        stop_container
        ;;
    restart)
        restart_container
        ;;
    logs)
        view_logs
        ;;
    status)
        check_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        if [ -z "$1" ]; then
            print_warning "未提供参数，显示帮助信息"
            show_help
        else
            print_error "未知参数: $1"
            show_help
        fi
        exit 1
        ;;
esac

exit 0 