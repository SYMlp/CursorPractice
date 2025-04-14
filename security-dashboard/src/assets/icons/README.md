# 平台概览页图标目录

此目录用于存放安全防护系统平台概览页使用的图标图片。

## 目录结构

```
icons/
├── platform/           # 平台概览页通用图标
│   ├── resource.png    # 资源总量图标
│   ├── identity.png    # 身份标识图标
│   └── standard.png    # 标准化属性图标
├── interface/          # 接口相关图标
│   ├── api.png         # 接口图标
│   ├── south.png       # 南向接口图标
│   ├── north.png       # 北向接口图标
│   ├── register.png    # 接口注册总数图标
│   ├── publish.png     # 接口发布数图标
│   └── schedule.png    # 接口调度任务数图标
├── task/              # 任务相关图标
│   ├── control.png     # 任务执行控制图标
│   └── monitor.png     # 任务执行监测异常图标
├── security/          # 安全相关图标
│   ├── cert-manage.png # 通讯证书管理图标
│   ├── network-suppress.png # 网络攻击抑制图标
│   ├── host-discover.png # 主机资产发现图标
│   ├── software-identify.png # 软件资产识别图标
│   └── security-identify.png # 安全识别类图标
└── services/           # 服务相关图标
    ├── identify.png    # 识别服务图标
    ├── protection.png  # 防护服务图标
    ├── detection.png   # 检测服务图标
    └── response.png    # 响应服务图标
```

## 图标命名规范

1. 使用小写字母和连字符命名
2. 避免使用空格和特殊字符
3. 使用有意义的名称，反映图标用途

## 图标格式规范

- **格式**：优先使用PNG格式（透明背景），或SVG格式（可缩放）
- **尺寸**：根据用途决定
  - 主要图标：64x64px
  - 指标图标：24x24px
  - 卡片图标：32x32px
- **颜色**：建议使用主题色或白色（在彩色背景上）

## 使用方法

### 方法一：直接导入

```tsx
import resourceIcon from '../assets/icons/platform/resource.png';

<ImageIcon 
  src={resourceIcon}
  width={40} 
  height={40}
  alt="资源图标"
/>
```

### 方法二：使用图标映射工具

```tsx
import { getIcon } from '../utils/iconMapping';

<ImageIcon 
  src={getIcon('resource')}
  width={40} 
  height={40}
  alt="资源图标"
/>
```

## 图标示例

| 目录 | 图标名称 | 使用位置 | 建议尺寸 |
|------|----------|----------|----------|
| platform | resource.png | 资源卡片主图标 | 64x64px |
| platform | identity.png | 身份标识指标 | 24x24px |
| platform | standard.png | 标准化属性指标 | 24x24px |
| interface | register.png | 接口注册总数 | 32x32px |
| interface | publish.png | 接口发布数 | 32x32px |
| interface | schedule.png | 接口调度任务数 | 32x32px |
| task | control.png | 任务执行控制 | 32x32px |
| task | monitor.png | 任务执行监测异常 | 32x32px |
| security | cert-manage.png | 通讯证书管理 | 32x32px |
| security | network-suppress.png | 网络攻击抑制 | 32x32px |
| security | host-discover.png | 主机资产发现 | 32x32px |
| security | software-identify.png | 软件资产识别 | 32x32px |
| security | security-identify.png | 安全识别类 | 32x32px |
| services | identify.png | 识别服务图表标题 | 24x24px |
| services | protection.png | 防护服务图表标题 | 24x24px |
| services | detection.png | 检测服务图表标题 | 24x24px |
| services | response.png | 响应服务图表标题 | 24x24px |

## 如何添加新图标

1. 将图标文件放入相应子目录
2. 在 `src/utils/iconMapping.ts` 中添加导入语句和映射
3. 在组件中使用 `getIcon()` 函数或直接导入

## 设计建议

1. 保持风格一致性
2. 简洁明了，避免过于复杂的细节
3. 颜色与系统主题保持一致
4. 确保在小尺寸下仍然清晰可辨

## 图标分类

- 功能图标: `feature-*.png`
- 指标图标: `metric-*.png`
- 导航图标: `nav-*.png`
- 状态图标: `status-*.png`

## 使用方法

1. 将图标文件放入此目录
2. 在组件中导入图标：

```tsx
import databaseIcon from '../assets/icons/database-icon.png';
```

3. 使用ImageIcon组件显示图标：

```tsx
import { ImageIcon } from '../components/icons';

<ImageIcon 
  src={databaseIcon}
  width={24} 
  height={24}
  alt="数据库图标"
/>
```

或直接使用img标签：

```tsx
<img 
  src={databaseIcon} 
  width={24} 
  height={24} 
  alt="数据库图标" 
/>
```

## 图标列表

| 文件名 | 说明 | 预览 |
|-------|------|------|
| database-icon.png | 数据库图标 | [预览] |
| identity-icon.png | 身份标识图标 | [预览] |
| standard-icon.png | 标准化属性图标 | [预览] |
| rules/password.png | 密码规则图标 | [预览] |

*注：实际使用时请替换上述预览链接为实际图片*

## 图标使用实例

### 使用密码规则图标(passwordRule)

```tsx
// 方法1：直接导入
import passwordRuleIcon from '../assets/icons/rules/password.png';

<ImageIcon 
  src={passwordRuleIcon}
  width={32} 
  height={32}
  alt="密码规则图标"
/>

// 方法2：使用图标映射工具
import { getIcon } from '../utils/iconMapping';

<ImageIcon 
  src={getIcon('passwordRule')}
  width={32} 
  height={32}
  alt="密码规则图标"
/>

// 方法3：处理可能的null返回值
const iconSrc = getIcon('passwordRule') || passwordRuleIcon;

<ImageIcon 
  src={iconSrc}
  width={32} 
  height={32}
  alt="密码规则图标"
/>
```

以上方法3为推荐做法，能够处理图标映射失败的情况，提高代码健壮性。

## 更新记录

- 2023-11-01: 初始版本，添加基础图标说明
- 2023-12-15: 添加password.png图标及使用示例
- 2023-12-18: 全面实施图标系统改进，从SVG转向真实图片，优化图标尺寸和显示效果
- 2024-04-14: 添加services目录及相关服务图标
- 2024-04-14: 添加interface、task和security目录及相关图标 