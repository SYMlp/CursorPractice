<template>
  <div :class="['bg-white rounded-lg shadow', className]">
    <div class="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <div class="text-sm font-medium flex items-center">
        <span>{{ title }}</span>
        <span v-if="totalCount !== undefined || realTotal > 0" class="text-xs text-gray-500 ml-2">
          总计{{ totalCount !== undefined ? totalCount : realTotal }}个
        </span>
      </div>
      <button
        v-if="showMoreLink"
        class="text-xs text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded transition-colors"
        @click.prevent="handleMoreClick"
      >
        更多
      </button>
    </div>
    <div class="p-2 max-h-[250px] overflow-y-auto">
      <div
        v-for="(item, index) in displayData"
        :key="item.id"
        class="mb-2 p-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
        @click="handleItemClick(item)"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <span
              class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2"
            >
              {{ index + 1 }}
            </span>
            <!-- 假设 CustomTooltip 已迁移 -->
            <CustomTooltip :title="item.name">
              <span class="text-sm font-medium truncate max-w-[170px] block">{{ item.name }}</span>
            </CustomTooltip>
          </div>
          <span class="text-xs text-gray-500">
            {{ valueLabel }}{{ item.riskCount || item.risks || item.value }}
          </span>
        </div>
        <div v-if="showTag && item[tagField] && TagComponent" class="mt-1 flex flex-wrap gap-1">
          <template v-if="Array.isArray(item[tagField])">
            <component
              v-for="(tag, idx) in item[tagField]"
              :key="idx"
              :is="TagComponent"
              :text="tag"
            />
          </template>
          <template v-else>
            <component :is="TagComponent" :text="item[tagField]" />
          </template>
        </div>
      </div>
    </div>

    <!-- 模态框 -->
    <div
      v-if="showAllData"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 w-4/5 max-w-4xl max-h-[80vh] overflow-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">{{ title }}（共计{{ realTotal }}个）</h3>
          <button @click="handleCloseModal" class="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="overflow-y-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  排名
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  名称
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ valueLabel }}
                </th>
                <th
                  v-if="data.length > 0 && data[0]?.visits !== undefined"
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  访问量
                </th>
                <th
                  v-if="showTag"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  标签
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(item, index) in data"
                :key="item.id"
                class="hover:bg-gray-50 cursor-pointer"
                @click="handleItemClick(item)"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {{ item.riskCount || item.risks || item.value }}
                </td>
                <td
                  v-if="item.visits !== undefined"
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right"
                >
                  {{ item.visits }}
                </td>
                <td
                  v-if="showTag && item[tagField] && TagComponent"
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  <div class="flex flex-wrap gap-1">
                    <template v-if="Array.isArray(item[tagField])">
                      <component
                        v-for="(tag, idx) in item[tagField]"
                        :key="idx"
                        :is="TagComponent"
                        :text="tag"
                      />
                    </template>
                    <template v-else>
                      <component :is="TagComponent" :text="item[tagField]" />
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component, PropType } from 'vue'
import { computed, defineEmits, defineProps, ref } from 'vue'
import CustomTooltip from '../tags/CustomTooltip.vue' // 假设路径正确

// 定义数据项接口
export interface RankingItem {
  id: number
  name: string
  value?: string | number
  risk?: string[]
  risks?: string | number
  riskCount?: string | number
  riskTypeCount?: string | number
  visits?: string | number
  protection?: string
  sensitiveResources?: string | number
  [key: string]: any
}

// 定义 Props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array as PropType<RankingItem[]>,
    required: true,
  },
  totalCount: {
    type: Number,
    default: undefined, // 使用 undefined 表示未提供
  },
  showMoreLink: {
    type: Boolean,
    default: true,
  },
  className: {
    type: String,
    default: '',
  },
  maxItems: {
    type: Number,
    default: 5,
  },
  showTag: {
    type: Boolean,
    default: false,
  },
  tagField: {
    type: String,
    default: 'risk',
  },
  // 在 Vue 中，通常直接传递组件定义或组件实例
  tagComponent: {
    type: Object as PropType<Component>, // 使用 Component 类型
    default: null,
  },
  valueLabel: {
    type: String,
    default: '风险',
  },
})

// 定义 Emits
const emit = defineEmits(['item-click', 'more-click'])

// State
const showAllData = ref<boolean>(false)

// Computed
const displayData = computed(() => props.data.slice(0, props.maxItems))
const realTotal = computed(() => props.data.length)
const TagComponent = computed(() => props.tagComponent) // 包装一下方便模板使用

// Methods
const handleMoreClick = () => {
  // 始终先触发父组件事件
  emit('more-click')
  // 然后执行子组件的默认行为：打开模态框
  // 父组件可以通过监听 @more-click 事件并在其处理函数中采取措施
  // (例如，如果父组件自己处理弹窗，可以传递一个 prop 来禁用此处的默认行为)
  showAllData.value = true
}

const handleCloseModal = () => {
  showAllData.value = false
}

const handleItemClick = (item: RankingItem) => {
  emit('item-click', item)
}
</script>

<style scoped>
/* 如果需要特定于此组件的样式，可以添加在这里 */
/* Tailwind 类名已在模板中直接使用 */
</style>
