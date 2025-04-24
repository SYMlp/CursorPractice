<template>
  <div class="resource-node node">
    <Handle id="a" type="target" :position="Position.Top" :is-connectable="isConnectable" />
    <div class="node-content">
      <div class="node-header resource">资源</div>
      <div class="node-label">{{ data.label }}</div>
      <div class="risk-score">风险评分: {{ data.riskScore ?? 'N/A' }}</div>
      <div class="risk-level">风险等级: {{ data.riskLevel ?? 'N/A' }}</div>
    </div>
    <Handle id="b" type="source" :position="Position.Bottom" :is-connectable="isConnectable" />
  </div>
</template>

<script setup lang="ts">
import type { NodeData } from '@/types/flow'
import { Handle, Position } from '@vue-flow/core'

// Define the props using NodeProps helper type if available, or define manually
// NodeProps usually includes id, type, data, selected, isConnectable, etc.
interface ResourceNodeProps {
  data: NodeData // Use the imported NodeData type
  isConnectable?: boolean // isConnectable is often available directly in custom nodes
  // selected?: boolean;
  // zIndex?: number;
  // xPos?: number;
  // yPos?: number;
  // dragging?: boolean;
}

// Use defineProps for type checking
// Vue Flow usually injects props automatically, we just need to type them
const props = defineProps<ResourceNodeProps>()

// isConnectable might be directly available in the scope of custom nodes
// depending on the Vue Flow version and how it's used. Let's assume it's passed via props for now.
const isConnectable = props.isConnectable ?? true
</script>

<style>
/* Styles are now global from nodes.css */
/* We can add scoped styles here if needed for overrides or specifics */
</style>
