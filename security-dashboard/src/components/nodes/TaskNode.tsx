import React from 'react';
import { Handle, Position } from 'reactflow';
import './nodes.css';

interface TaskNodeProps {
  data: {
    label: string;
    riskScore: number;
    riskLevel: string;
  };
  isConnectable: boolean;
}

const TaskNode: React.FC<TaskNodeProps> = ({ data, isConnectable }) => {
  return (
    <div className="task-node node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-content">
        <div className="node-header task">任务</div>
        <div className="node-label">{data.label}</div>
        <div className="risk-score">风险评分: {data.riskScore}</div>
        <div className="risk-level">风险等级: {data.riskLevel}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TaskNode; 