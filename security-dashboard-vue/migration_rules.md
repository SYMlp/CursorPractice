# React 到 Vue 迁移规则

本文档记录了将 React 项目代码迁移到 Vue 项目时需要遵循的主要转换规则。

## 1. 模板语法 (JSX -> Vue Template)

- **标签:** HTML 标签保持不变。
- **根元素:** Vue 2 需要一个单一根元素，Vue 3 `<script setup>` 不需要。React Fragment (`<>...</>`) 可以直接移除或保留一个根 `<div>`。
- **`className` -> `class`:**
  ```diff
  - <div className="my-class">
  + <div class="my-class">
  ```
- **插值:**
  ```diff
  - <div>{someVariable}</div>
  + <div>{{ someVariable }}</div>
  ```
- **属性绑定:**
  ```diff
  - <img src={imageUrl} alt={altText} />
  + <img :src="imageUrl" :alt="altText" />
  ```
  或
  ```diff
  - <MyComponent propValue={data} />
  + <MyComponent :prop-value="data" />
  ```
  (注意 prop 名称的大小写转换: camelCase -> kebab-case)

## 2. 事件处理

- **事件绑定:**
  ```diff
  - <button onClick={handleClick}>Click Me</button>
  + <button @click="handleClick">Click Me</button>
  ```
- **事件处理函数:** React 中的类方法或函数组件中的函数，在 Vue `<script setup>` 中通常定义为 `const handleClick = () => { ... }`。

## 3. 条件渲染

- **`v-if`/`v-else-if`/`v-else`:**

  ```diff
  - {condition && <p>Rendered when true</p>}
  - {condition ? <p>True</p> : <p>False</p>}

  + <p v-if="condition">Rendered when true</p>

  + <p v-if="status === 'ok'">OK</p>
  + <p v-else-if="status === 'warning'">Warning</p>
  + <p v-else>Error</p>
  ```

- **`v-show`:** (对应于通过 CSS `display` 控制显隐)
  ```diff
  - <div style={{ display: isVisible ? 'block' : 'none' }}>...</div>
  + <div v-show="isVisible">...</div>
  ```

## 4. 列表渲染

- **`v-for`:**

  ```diff
  - <ul>
  -   {items.map(item => (
  -     <li key={item.id}>{item.name}</li>
  -   ))}
  - </ul>

  + <ul>
  +   <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  + </ul>
  ```

  (如果需要索引: `v-for="(item, index) in items"`)

## 5. 样式

- **普通 CSS/SCSS:**
  - 全局样式: 可以将 CSS/SCSS 文件导入到 Vue 项目的入口文件 (如 `main.ts`) 或全局样式文件中。
  - 组件级样式: 推荐将样式写入 `.vue` 文件中的 `<style scoped>` 标签内，以实现样式隔离。
- **CSS Modules:** 将样式移入 `<style module>` 或 `<style scoped>`。
- **CSS-in-JS (Styled Components, Emotion):** 需要将样式提取为纯 CSS/SCSS，放入 `<style scoped>` 或单独的样式文件中。
- **Tailwind CSS:** 如果两个项目都使用 Tailwind，迁移会相对容易。确保 Vue 项目正确配置了 Tailwind，然后可以直接复用类名。

## 6. State 和 Props

- **State -> `ref`/`reactive`:** React 的 `useState` 或类组件的 `this.state` 对应 Vue 的 `ref` (用于基本类型和单个对象) 或 `reactive` (用于复杂对象)。
  ```diff
  - const [count, setCount] = useState(0);
  + import { ref } from 'vue';
  + const count = ref(0);
  + // 修改: count.value++
  ```
  ```diff
  - const [user, setUser] = useState({ name: '张三', age: 30 });
  + import { reactive } from 'vue';
  + const user = reactive({ name: '张三', age: 30 });
  + // 修改: user.name = '李四'; user.age = 31;
  ```
- **Props -> `defineProps`:** React 的函数组件 props 或类组件的 `this.props` 对应 Vue `<script setup>` 中的 `defineProps`。

  ```diff
  - function MyComponent(props) { ... }
  - function MyComponent({ message, count }) { ... }

  + // 在 <script setup> 中
  + const props = defineProps(['message', 'count']);
  + // 或更推荐的带类型定义的方式
  + const props = defineProps<{
  +   message: string;
  +   count: number;
  +   optionalProp?: boolean; // 可选 prop
  + }>();
  ```

- **Prop 传递:** React 通过 JSX 属性传递，Vue 通过模板属性绑定 (`:` 或 `v-bind`)。

## 7. 生命周期

- **React -> Vue 3 (`<script setup>`) 映射:**

  - `constructor` / 函数体初始化: `<script setup>` 的顶层代码。
  - `componentDidMount`: `onMounted`
  - `componentDidUpdate`: `onUpdated`
  - `componentWillUnmount`: `onUnmounted`
  - `useEffect`: `watch` 或 `watchEffect` (根据具体依赖和逻辑判断)。

    ```diff
    - useEffect(() => { /* DidMount + DidUpdate */ }, [dep]);
    + import { watch } from 'vue';
    + watch(dep, (newValue, oldValue) => { /* ... */ });

    - useEffect(() => { /* DidMount + DidUpdate on any render */ });
    + import { watchEffect } from 'vue';
    + watchEffect(() => { /* ... */ }); // 自动追踪依赖

    - useEffect(() => { return () => { /* Unmount */ }; }, []);
    + import { onMounted, onUnmounted } from 'vue';
    + onMounted(() => { /* ... */ });
    + onUnmounted(() => { /* Cleanup */ });
    ```

## 8. 组件导入/导出

- **导入:**
  ```diff
  - import MyComponent from './MyComponent';
  + import MyComponent from './MyComponent.vue';
  ```
- **导出:** React 默认导出或命名导出，Vue 单文件组件 (`.vue`) 本身即代表一个组件，无需显式导出（在 `<script setup>` 模式下）。

## 9. 数据获取

- 通常在 `onMounted` 钩子中使用 `fetch` 或 `axios` 等库进行异步数据获取，并将结果赋值给 `ref` 或 `reactive` 定义的状态。

---

_此文档会根据迁移过程中的具体情况持续更新。_
