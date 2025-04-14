#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import subprocess
import sys
import webbrowser
import platform
import time
from pathlib import Path

def print_colored(text, color="normal"):
    """打印彩色文本，跨平台支持"""
    colors = {
        "red": "\033[91m",
        "green": "\033[92m",
        "yellow": "\033[93m",
        "blue": "\033[94m",
        "purple": "\033[95m",
        "end": "\033[0m"
    }
    
    # Windows命令提示符不支持ANSI颜色代码，除非使用特殊设置
    if platform.system() == "Windows" and not os.environ.get("ANSICON"):
        print(text)
    else:
        if color in colors:
            print(f"{colors[color]}{text}{colors['end']}")
        else:
            print(text)

def check_npm_installed():
    """检查npm是否安装"""
    try:
        npm_version = subprocess.run(
            ["npm", "--version"], 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            text=True,
            check=False
        )
        return npm_version.returncode == 0
    except FileNotFoundError:
        return False

def main():
    # 打印欢迎信息
    print_colored("="*50, "blue")
    print_colored("   安全大屏项目启动脚本 (Python版) v1.1   ", "blue")
    print_colored("="*50, "blue")
    
    # 获取项目根目录
    script_dir = Path(__file__).resolve().parent
    project_dir = script_dir.parent
    
    # 切换到项目根目录
    print_colored(f"1. 切换到项目目录: {project_dir}", "green")
    try:
        os.chdir(project_dir)
    except Exception as e:
        print_colored(f"错误: 无法切换到项目目录: {e}", "red")
        input("按Enter键退出...")
        sys.exit(1)
    
    # 检查npm是否安装
    if not check_npm_installed():
        print_colored("错误: 未找到npm，请确保Node.js已正确安装", "red")
        input("按Enter键退出...")
        sys.exit(1)
    
    # 检查 node_modules 是否存在
    print_colored("2. 检查依赖...", "green")
    if not os.path.exists("node_modules"):
        print_colored("3. 首次运行，安装依赖中...", "yellow")
        try:
            result = subprocess.run(
                ["npm", "install"], 
                check=False,
                stderr=subprocess.PIPE,
                text=True
            )
            if result.returncode != 0:
                print_colored(f"警告: npm install 返回非零状态: {result.returncode}", "yellow")
                print_colored(f"错误信息: {result.stderr}", "red")
                print_colored("尝试继续执行...", "yellow")
        except Exception as e:
            print_colored(f"错误: 安装依赖时出错: {e}", "red")
            input("按Enter键退出...")
            sys.exit(1)
    else:
        print_colored("3. 依赖已安装，跳过安装步骤...", "green")
    
    # 启动应用
    print_colored("4. 启动应用程序...", "green")
    print_colored("启动完成后，请访问: http://localhost:3000", "purple")
    print_colored("按Ctrl+C可以停止应用", "yellow")
    print_colored("="*50, "blue")
    
    # 开发模式设置环境变量，防止某些Node.js版本的警告
    env = os.environ.copy()
    if platform.system() == "Windows":
        env["NODE_ENV"] = "development"
        env["BROWSER"] = "none"  # 防止npm start自动打开浏览器，我们将自己控制
    
    # 自动打开浏览器（默认启用，可通过参数禁用）
    should_open_browser = len(sys.argv) <= 1 or sys.argv[1].lower() != 'noopen'
    
    # 启动应用
    try:
        # 启动npm进程
        process = subprocess.Popen(
            ["npm", "start"],
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True,
            bufsize=1
        )
        
        # 等待几秒钟确保服务器启动
        time.sleep(3)
        
        # 打开浏览器
        if should_open_browser:
            try:
                webbrowser.open("http://localhost:3000")
            except Exception as e:
                print_colored(f"警告: 无法打开浏览器: {e}", "yellow")
        
        # 实时显示npm输出
        for line in process.stdout:
            print(line, end='')
            
        process.wait()
    except KeyboardInterrupt:
        print_colored("\n用户中断，正在停止应用...", "yellow")
    except Exception as e:
        print_colored(f"\n错误: 运行应用时出错: {e}", "red")
    finally:
        # 确保进程被终止
        try:
            if 'process' in locals() and process.poll() is None:
                if platform.system() == "Windows":
                    subprocess.run(["taskkill", "/F", "/T", "/PID", str(process.pid)])
                else:
                    process.terminate()
                    process.wait(timeout=5)
        except Exception as e:
            print_colored(f"警告: 无法正常终止进程: {e}", "yellow")
    
    print_colored("应用已停止", "green")
    
if __name__ == "__main__":
    main() 