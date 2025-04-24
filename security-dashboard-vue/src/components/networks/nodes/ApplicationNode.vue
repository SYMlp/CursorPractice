<template>
  <div class="application-node node">
    <Handle id="a" type="target" :position="Position.Top" :is-connectable="isConnectable" />
    <div class="node-content">
      <div class="node-header application">应用</div>
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

interface ApplicationNodeProps {
  data: NodeData
  isConnectable?: boolean
}

const props = defineProps<ApplicationNodeProps>()
const isConnectable = props.isConnectable ?? true
</script>

<style>
/* Styles are global */
</style>
