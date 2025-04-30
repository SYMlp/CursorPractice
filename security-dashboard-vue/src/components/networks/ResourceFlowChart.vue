<template>
  <div :class="['w-full h-full relative', className]" ref="flowWrapper">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :node-types="nodeTypes"
      :connection-mode="ConnectionMode.Loose"
      :min-zoom="0.2"
      :max-zoom="4"
      :fit-view-on-init="fitViewOnInit"
      :apply-default="false"
      :fit-view-options="{ padding: 0.2 }"
      :pro-options="{ hideAttribution: true }"
      @connect="onConnect"
      @node-click="onNodeClickHandler"
      @edge-click="onEdgeClickHandler"
      class="touch-none"
    >
      <Background color="#f0f0f0" :variant="BackgroundVariant.Dots" :gap="16" :size="1" />
      <Controls v-if="showControls" :show-interactive="false" />

      <Panel
        v-if="selectedNode || selectedEdge"
        position="bottom-right"
        class="z-10 p-0 bg-transparent border-0"
      >
        <div class="w-64">
          <DetailPanel
            v-if="selectedNode"
            :title="`节点详情: ${selectedNode.data?.label || '未命名节点'}`"
            :items="getNodeDetailItems(selectedNode)"
          />
          <DetailPanel
            v-if="selectedEdge"
            :title="`连接详情`"
            :items="getEdgeDetailItems(selectedEdge)"
          />
        </div>
      </Panel>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
// Imports: Corrected based on Vue Flow v1 package structure
import { Background, BackgroundVariant } from '@vue-flow/background' // <-- Import Background here
import { Controls } from '@vue-flow/controls' // <-- Import Controls here
import {
  type Connection,
  ConnectionMode,
  type Edge,
  type EdgeMouseEvent,
  MarkerType,
  // BackgroundVariant, // Removed from core
  type Node,
  // type NodeTypes, // Removed
  type NodeMouseEvent,
  // Controls, // Removed from core
  // Background, // Removed from core
  Panel,
  useVueFlow,
  VueFlow,
} from '@vue-flow/core'
import {
  defineComponent,
  markRaw,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  type VNode,
  watch,
} from 'vue'

// Import types and helper
import {
  AccessFrequency,
  type EdgeData,
  getEdgeColorByRisk,
  type NodeData,
  RiskLevel,
} from '@/types/flow'

// Import custom components
import DetailPanel from '../cards/DetailPanel.vue'
import ApplicationNode from './nodes/ApplicationNode.vue'
import PersonNode from './nodes/PersonNode.vue'
import ResourceNode from './nodes/ResourceNode.vue'
import ServiceNode from './nodes/ServiceNode.vue'
import TaskNode from './nodes/TaskNode.vue'

// Import styles
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

// Define a more specific type for the value passed to DetailPanel
type DetailValue = string | number | VNode | object | null | undefined

// --- Props ---
interface ResourceFlowChartProps {
  initialNodes?: Node<NodeData>[]
  initialEdges?: Edge<EdgeData>[]
  className?: string
  fitView?: boolean
  showControls?: boolean
}

const props = withDefaults(defineProps<ResourceFlowChartProps>(), {
  initialNodes: () => [],
  initialEdges: () => [],
  className: '',
  fitView: true,
  showControls: true,
})

// --- Emits ---
const emit = defineEmits<{
  (e: 'nodeClick', node: Node<NodeData>): void
  (e: 'edgeClick', edge: Edge<EdgeData>): void
}>()

// --- State using ref and v-model ---
const nodes = ref<Node<NodeData>[]>(props.initialNodes)
const edges = ref<Edge<EdgeData>[]>(props.initialEdges)

// Get methods from useVueFlow, renaming fitView
const { addEdges, fitView: vueFlowFitView } = useVueFlow()

const selectedNode = shallowRef<Node<NodeData> | null>(null)
const selectedEdge = shallowRef<Edge<EdgeData> | null>(null)
const flowWrapper = ref<HTMLDivElement | null>(null)
let resizeObserver: ResizeObserver | null = null
const fitViewOnInit = ref(props.fitView)

// Watch initial props to update internal state if they change AFTER mount
// This might be needed if the parent should be able to reset the chart
watch(
  () => props.initialNodes,
  (newNodes) => {
    nodes.value = newNodes ?? []
  },
  { deep: true },
)

watch(
  () => props.initialEdges,
  (newEdges) => {
    edges.value = newEdges ?? []
  },
  { deep: true },
)

const nodeTypes = shallowRef<Record<string, ReturnType<typeof defineComponent>>>({
  resource: markRaw(ResourceNode),
  service: markRaw(ServiceNode),
  application: markRaw(ApplicationNode),
  task: markRaw(TaskNode),
  person: markRaw(PersonNode),
})

onMounted(() => {
  if (flowWrapper.value) {
    resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => vueFlowFitView({ padding: 0.2 }))
    })
    resizeObserver.observe(flowWrapper.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver && flowWrapper.value) {
    resizeObserver.unobserve(flowWrapper.value)
  }
})

const onConnect = (connection: Connection) => {
  const sourceNode = nodes.value.find((node: Node<NodeData>) => node.id === connection.source)
  const targetNode = nodes.value.find((node: Node<NodeData>) => node.id === connection.target)
  let riskLevel = RiskLevel.LOW

  if (
    sourceNode?.data?.riskLevel === RiskLevel.VERY_HIGH ||
    targetNode?.data?.riskLevel === RiskLevel.VERY_HIGH
  ) {
    riskLevel = RiskLevel.VERY_HIGH
  } else if (
    sourceNode?.data?.riskLevel === RiskLevel.HIGH ||
    targetNode?.data?.riskLevel === RiskLevel.HIGH
  ) {
    riskLevel = RiskLevel.HIGH
  } else if (
    sourceNode?.data?.riskLevel === RiskLevel.MEDIUM ||
    targetNode?.data?.riskLevel === RiskLevel.MEDIUM
  ) {
    riskLevel = RiskLevel.MEDIUM
  }

  const edgeColor = getEdgeColorByRisk(riskLevel)
  const newEdge: Edge<EdgeData> = {
    ...connection,
    id: `${connection.source}->${connection.target}`,
    type: 'smoothstep',
    animated: true,
    style: { stroke: edgeColor, strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edgeColor,
    },
    data: {
      riskLevel,
      accessCount: Math.floor(Math.random() * 100),
      frequency: Object.values(AccessFrequency)[Math.floor(Math.random() * 4)],
      lastAccess: new Date(Date.now() - Math.random() * 1e10).toLocaleString('zh-CN'),
      riskScore:
        riskLevel === RiskLevel.VERY_HIGH
          ? 85
          : riskLevel === RiskLevel.HIGH
            ? 65
            : riskLevel === RiskLevel.MEDIUM
              ? 45
              : 25,
    },
  }
  addEdges([newEdge])
}

const onNodeClickHandler = (event: NodeMouseEvent) => {
  const node = event.node as Node<NodeData>
  selectedNode.value = node
  selectedEdge.value = null
  emit('nodeClick', node)
}

const onEdgeClickHandler = (event: EdgeMouseEvent) => {
  const edge = event.edge as Edge<EdgeData>
  selectedEdge.value = edge
  selectedNode.value = null
  emit('edgeClick', edge)
}

const getNodeDetailItems = (node: Node<NodeData>): { label: string; value: DetailValue }[] => {
  const items: { label: string; value: DetailValue }[] = [
    { label: '类型', value: node.type },
    { label: '标签', value: node.data?.label },
    { label: '风险等级', value: node.data?.riskLevel ?? 'N/A' },
    { label: '风险评分', value: node.data?.riskScore ?? 'N/A' },
    { label: '访问频率', value: node.data?.frequency ?? 'N/A' },
    { label: '访问次数', value: node.data?.accessCount ?? 'N/A' },
    { label: '描述', value: node.data?.description ?? '无' },
  ]
  return items.filter((item) => item.value !== undefined && item.value !== null)
}

const getEdgeDetailItems = (edge: Edge<EdgeData>): { label: string; value: DetailValue }[] => {
  const items: { label: string; value: DetailValue }[] = [
    { label: '源节点', value: edge.source },
    { label: '目标节点', value: edge.target },
    { label: '风险等级', value: edge.data?.riskLevel ?? 'N/A' },
    { label: '风险评分', value: edge.data?.riskScore ?? 'N/A' },
    { label: '访问频率', value: edge.data?.frequency ?? 'N/A' },
    { label: '访问次数', value: edge.data?.accessCount ?? 'N/A' },
    { label: '最后访问', value: edge.data?.lastAccess ?? 'N/A' },
  ]
  return items.filter((item) => item.value !== undefined && item.value !== null)
}
</script>

<style scoped>
/* Scoped styles if needed */
.touch-none {
  touch-action: none; /* Prevent default touch actions on the flow container */
}
</style>
