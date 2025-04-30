<template>
  <div class="w-full h-full border border-gray-200 rounded-lg overflow-hidden">
    <VueFlow
      v-model:nodes="internalNodes"
      v-model:edges="internalEdges"
      :node-types="nodeTypes"
      :default-edge-options="edgeOptions"
      :min-zoom="0.5"
      :max-zoom="1.5"
      :nodes-draggable="true"
      :nodes-connectable="false"
      :elements-selectable="true"
      :connection-mode="ConnectionMode.Loose"
      :pro-options="{ hideAttribution: true }"
      fit-view
      @node-click="onNodeClick"
      @edge-click="onEdgeClick"
      @pane-click="onPaneClick"
      class="relative"
    >
      <!-- 自定义节点插槽 -->
      <template #node-asset="{ data, id, type }">
        <AssetNode :data="data" :id="id" :type="type" />
      </template>

      <Background :color="backgroundColor" :size="1.5" />
      <Controls
        class="bg-white shadow-md rounded-md border border-gray-200 !bottom-4 !right-4"
        :show-interactive="false"
        position="bottom-right"
      />
      <MiniMap
        v-if="showMiniMap"
        :node-stroke-width="3"
        :zoomable="true"
        :pannable="true"
        :node-color="miniMapNodeColor"
        class="!right-4 !top-4 !h-32 !w-48 !bg-white/90 !border !border-gray-200 !rounded-md !shadow-sm"
      />
      <Panel position="top-left" class="bg-white p-2 rounded-md shadow-sm border border-gray-200">
        <div class="flex items-center space-x-4 text-xs">
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span>应用系统</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>用户</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span>告警</span>
          </div>
        </div>
      </Panel>

      <!-- 空状态 -->
      <div
        v-if="isEmpty"
        class="absolute inset-0 flex items-center justify-center text-gray-400 bg-white/50"
      >
        <div class="text-center">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
            />
          </svg>
          <p class="mt-2 text-sm">暂无资产关系数据</p>
        </div>
      </div>
    </VueFlow>

    <!-- 可选: 选中节点/边的信息面板 -->
    <!-- <div v-if="selectedNode || selectedEdge" class="absolute bottom-4 left-4 bg-white p-3 rounded shadow-lg border border-gray-200 text-xs max-w-xs">
      <pre>{{ JSON.stringify(selectedNode || selectedEdge, null, 2) }}</pre>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { Background } from '@vue-flow/background' // Correct import for Background
import { Controls } from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'
import type {
  Edge,
  EdgeMouseEvent,
  Node,
  NodeComponent,
  NodeMouseEvent,
  NodeTypesObject,
} from '@vue-flow/core'
import { ConnectionMode, MarkerType, Panel, VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/minimap/dist/style.css'
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'
// import '@vue-flow/node-toolbar/dist/style.css';

// --- 自定义节点组件 ---
import AssetNode from './AssetNode.vue' // Assume AssetNode is defined in a separate file

// --- Props ---
const props = defineProps({
  nodes: {
    type: Array as PropType<Node[]>,
    default: () => [],
  },
  edges: {
    type: Array as PropType<Edge[]>,
    default: () => [],
  },
})

// --- Emits ---
const emit = defineEmits<{
  (e: 'nodeClick', event: NodeMouseEvent): void
  (e: 'edgeClick', event: EdgeMouseEvent): void
}>()

// --- State ---
const internalNodes = ref<Node[]>([])
const internalEdges = ref<Edge[]>([])
const selectedNode = ref<Node | null>(null)
const selectedEdge = ref<Edge | null>(null)
const showMiniMap = ref(true) // Can be controlled via prop later
const backgroundColor = ref('#f1f5f9')

// --- Vue Flow Instance (optional, for programmatic control) ---
// const { findNode, findEdge, ... } = useVueFlow();

// --- Computed ---
const isEmpty = computed(() => internalNodes.value.length === 0 && internalEdges.value.length === 0)

// --- Watchers ---
watch(
  () => props.nodes,
  (newNodes) => {
    // Vue Flow handles reactivity, direct assignment might be enough if props are reactive
    // For controlled flow, you might need more complex update logic
    internalNodes.value = newNodes || []
    console.log('Internal nodes updated:', internalNodes.value.length)
  },
  { deep: true, immediate: true }, // Use deep watch and run immediately
)

watch(
  () => props.edges,
  (newEdges) => {
    internalEdges.value = newEdges || []
    console.log('Internal edges updated:', internalEdges.value.length)
  },
  { deep: true, immediate: true },
)

// --- Node and Edge Configuration ---
const nodeTypes: NodeTypesObject = {
  // Use a generic type name, the template slot determines the component
  asset: AssetNode as NodeComponent,
}

const edgeOptions = ref({
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#3B82F6', strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#3B82F6',
  },
})

// --- Event Handlers ---
const onNodeClick = (event: NodeMouseEvent) => {
  console.log('Node clicked:', event.node)
  selectedNode.value = event.node
  selectedEdge.value = null
  emit('nodeClick', event)
}

const onEdgeClick = (event: EdgeMouseEvent) => {
  console.log('Edge clicked:', event.edge)
  selectedEdge.value = event.edge
  selectedNode.value = null
  emit('edgeClick', event)
}

const onPaneClick = () => {
  selectedNode.value = null
  selectedEdge.value = null
}

// --- MiniMap Color Function ---
const miniMapNodeColor = (node: Node): string => {
  // Assuming node.type corresponds to the original React node types
  // or you adapt AssetNode.vue to set a specific class/data attribute
  // For simplicity, using the data field if available
  switch (node.data?.type || node.type) {
    case 'application':
      return '#3B82F6' // Blue
    case 'user':
      return '#10B981' // Green
    case 'alert':
      return '#EF4444' // Red
    default:
      return '#9CA3AF' // Gray
  }
}
</script>

<style>
/* Import Vue Flow styles or define global styles */
.vue-flow__controls {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

/* Add any other global or scoped styles needed */
</style>
