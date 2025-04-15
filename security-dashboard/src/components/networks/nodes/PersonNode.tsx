import React from 'react';
import { Handle, Position } from 'reactflow';
import './nodes.css';

interface PersonNodeProps {
  data: {
    label: string;
    riskScore: number;
    riskLevel: string;
  };
  isConnectable: boolean;
}

const PersonNode: React.FC<PersonNodeProps> = ({ data, isConnectable }) => {
  return (
    <div className="person-node node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-content">
        <div className="node-header person">人员</div>
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

export default PersonNode; 