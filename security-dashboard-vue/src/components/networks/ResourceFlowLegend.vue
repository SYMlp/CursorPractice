<template>
  <div class="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2">
    <div class="flex items-center">
      <div class="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
      <span>资源</span>
    </div>
    <div class="flex items-center">
      <div class="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
      <span>服务</span>
    </div>
    <div class="flex items-center">
      <div class="w-3 h-3 bg-purple-500 rounded-sm mr-1"></div>
      <span>应用</span>
    </div>
    <div class="flex items-center">
      <div class="w-3 h-3 bg-yellow-500 rounded-sm mr-1"></div>
      <span>任务</span>
    </div>
    <div class="flex items-center">
      <div class="w-3 h-3 bg-pink-500 rounded-sm mr-1"></div>
      <span>人员</span>
    </div>
    <div class="flex items-center mx-2">|</div>
    <div class="flex items-center">
      <div class="w-6 h-0.5 bg-green-500 mr-1"></div>
      <span>低风险</span>
    </div>
    <div class="flex items-center">
      <div class="w-6 h-0.5 bg-yellow-500 mr-1"></div>
      <span>中风险</span>
    </div>
    <div class="flex items-center">
      <div class="w-6 h-0.5 bg-orange-500 mr-1"></div>
      <span>高风险</span>
    </div>
    <div class="flex items-center">
      <div class="w-6 h-0.5 bg-red-500 mr-1"></div>
      <span>极高风险</span>
    </div>
    <div class="flex items-center">
      <div class="w-6 h-0.5 border-t-2 border-dashed border-red-500 mr-1"></div>
      <span>异常连接</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这个组件是纯展示性的，没有脚本逻辑
</script>

<style scoped>
/* Tailwind 类名已在模板中直接使用 */
</style>
