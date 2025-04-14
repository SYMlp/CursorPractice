# 启动脚本说明

本目录包含用于不同环境下启动安全大屏项目的脚本。

## 脚本列表

| 脚本名称 | 适用环境 | 说明 |
|---------|---------|------|
| `start-app.bat` | Windows | Windows批处理脚本，支持彩色输出，双击即可运行 |
| `run-app.cmd` | Windows | 简化版CMD脚本，在PowerShell或CMD中都能正常工作 |
| `start-app.sh` | Linux/MacOS | Bash脚本，在终端中运行 `./start-app.sh` |
| `start-app.py` | 跨平台 | Python脚本，运行 `python start-app.py` |

## 脚本功能

所有脚本提供相同的基本功能：

1. 检查并切换到项目根目录
2. 检查npm是否已正确安装
3. 检查 `node_modules` 是否存在，不存在则安装依赖
4. 启动开发服务器
5. 自动打开浏览器访问应用（可选）
6. 提供错误处理和用户友好的反馈

## 使用方法

### Windows环境

#### 方法1: 使用增强批处理脚本

双击 `start-app.bat` 或在命令提示符中运行：

```cmd
scripts\start-app.bat
```

**特性**：
- 彩色输出提示
- 自动检测npm可用性
- 错误处理与状态提示
- 延迟启动浏览器，确保服务启动完成

#### 方法2: 使用兼容CMD脚本（推荐在PowerShell中）

双击 `run-app.cmd` 或在PowerShell/命令提示符中运行：

```powershell
# 在PowerShell中
.\scripts\run-app.cmd

# 或在CMD中
scripts\run-app.cmd
```

**特性**：
- 兼容性强，在PowerShell中也能正常工作
- 简洁明了的操作流程
- 自动延迟打开浏览器
- 精简错误处理

### Linux/MacOS环境

在终端中运行：

```bash
# 首次运行可能需要添加执行权限
chmod +x scripts/start-app.sh

# 运行脚本
./scripts/start-app.sh
```

**新增功能**：
- 改进的错误处理
- 智能检测浏览器打开方式
- CTRL+C处理优化
- npm版本检测

### Python环境（跨平台）

在任何支持Python的系统中运行：

```bash
python scripts/start-app.py
```

若要启动时不自动打开浏览器，可以使用：

```bash
python scripts/start-app.py noopen
```

**新增功能**：
- 实时输出npm日志
- 跨平台彩色输出支持
- 改进的错误处理与状态提示
- 智能进程管理与清理

## 注意事项

- 所有脚本默认启动开发服务器，访问地址为 http://localhost:3000
- 按 Ctrl+C 可以安全地停止服务器
- 首次运行时，安装依赖可能需要较长时间
- 脚本会自动处理嵌套目录问题，确保在正确的项目根目录运行
- 所有脚本都添加了环境变量设置，避免常见Node.js/npm警告
- 如果在PowerShell中遇到执行策略限制，可以使用`run-app.cmd`脚本替代

## 更新记录

- 2025-04-15: 添加PowerShell兼容的`run-app.cmd`脚本
- 2025-04-14: 增强所有脚本，添加错误处理、彩色输出和自动浏览器打开功能
- 2025-04-13: 首次添加跨平台启动脚本 