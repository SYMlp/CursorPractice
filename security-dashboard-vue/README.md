# Security Dashboard Vue (Vue 3 + Ant Design + Tailwind + ECharts)

这是一个基于 Vue 3, Vite, TypeScript 构建的仪表盘项目模板，集成了 Ant Design Vue 作为 UI 组件库, Tailwind CSS 作为 CSS 框架, 以及 ECharts 用于数据可视化。

## 主要技术栈

- **框架**: Vue 3
- **构建工具**: Vite
- **语言**: TypeScript
- **UI 组件库**: Ant Design Vue (使用 `unplugin-vue-components` 实现按需自动导入)
- **CSS 框架**: Tailwind CSS (使用 `@tailwindcss/postcss` 插件，配置文件为 `.cjs` 格式)
- **数据可视化**: ECharts
- **路由**: Vue Router
- **状态管理**: Pinia
- **代码规范**: ESLint + Prettier
- **API 自动导入**: 使用 `unplugin-auto-import` 自动导入 Vue, Vue Router, Pinia 相关 API

## 推荐 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (请禁用 Vetur 插件)。

同时推荐安装 Tailwind CSS IntelliSense 插件以获得更好的 Tailwind CSS 开发体验。

## 类型支持 `.vue` 文件导入 (TypeScript)

TypeScript 默认无法处理 `.vue` 文件的类型信息，因此我们使用 `vue-tsc` 替代 `tsc` 进行类型检查。在编辑器中，需要 Volar 插件来让 TypeScript 语言服务识别 `.vue` 类型。

由于使用了 `unplugin-auto-import` 和 `unplugin-vue-components`，它们会自动生成类型声明文件 (`src/auto-imports.d.ts`, `src/components.d.ts`)，请确保你的 IDE 加载了这些文件以获得正确的类型提示。

## 自定义配置

- Vite 配置: `vite.config.ts`
- Tailwind CSS 配置: `tailwind.config.cjs`
- PostCSS 配置: `postcss.config.cjs`

参考 [Vite 配置文档](https://vite.dev/config/)。

## 项目设置

```sh
npm install
```

### 开发环境编译与热重载

```sh
npm run dev
```

### 生产环境类型检查、编译与压缩

```sh
npm run build
```

### 运行单元测试 (Vitest)

```sh
npm run test:unit
```

### 运行端到端测试 (Cypress)

#### 开发模式下运行

```sh
npm run test:e2e:dev
```

该命令会在 Vite 开发服务器上运行端到端测试，速度比生产构建快。

#### 生产模式下运行

推荐在部署前 (例如 CI 环境中) 测试生产构建：

```sh
npm run build
npm run test:e2e
```

### 代码风格检查 (ESLint)

```sh
npm run lint
```
