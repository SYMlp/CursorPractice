<script setup lang="ts">
// 如果需要，可以在这里添加一些逻辑
import { ref } from 'vue';

const reactAppUrl = ref('http://localhost:3001'); // 把 React 应用的地址放在这里，方便修改
const currentPage = ref('platform'); // 默认显示的页面

const iframeSrc = ref(`${reactAppUrl.value}/${currentPage.value}?viewMode=embedded`);

// 切换页面的函数示例 (可以通过 Ant Design Menu 等触发)
function changePage(page: string) {
  currentPage.value = page;
  iframeSrc.value = `${reactAppUrl.value}/${currentPage.value}?viewMode=embedded`;
}

</script>

<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-header style="background: #fff; padding: 0 20px;">
      <h1>Vue 3 + Ant Design (Iframe Test)</h1>
      <!-- 这里可以放一个简单的切换按钮或菜单 -->
      <a-button @click="changePage('platform')" :type="currentPage === 'platform' ? 'primary' : 'default'">平台总览</a-button>
      <a-button @click="changePage('interface')" :type="currentPage === 'interface' ? 'primary' : 'default'" style="margin-left: 8px;">接口监控</a-button>
      <a-button @click="changePage('asset')" :type="currentPage === 'asset' ? 'primary' : 'default'" style="margin-left: 8px;">资产监控</a-button>
      <a-button @click="changePage('security')" :type="currentPage === 'security' ? 'primary' : 'default'" style="margin-left: 8px;">数据资产监控</a-button>
    </a-layout-header>
    <a-layout-content style="margin: 16px;">
      <div style="background: #fff; padding: 24px; min-height: 360px; height: calc(100vh - 100px);"> {/* 设置一个容器高度 */}
        <p>当前嵌入页面: {{ currentPage }}</p>
        <iframe
          :src="iframeSrc"
          class="embedded-iframe"
          frameborder="0"
          title="Embedded React App"
        ></iframe>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center;">
      Vue Iframe Test ©2024 Created by Assistant
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.embedded-iframe {
  width: 100%;
  height: calc(100% - 30px); /* 保留之前的高度计算 */
  border: none; /* 移除默认边框 */
  overflow: auto !important; /* 覆盖 clip，允许滚动 */
}

/* 如果需要，可以添加一些特定于 App.vue 的样式 */
</style>
