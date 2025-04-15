import React from 'react';
import { Handle, Position } from 'reactflow';
import './nodes.css';

interface ApplicationNodeProps {
  data: {
    label: string;
    riskScore: number;
    riskLevel: string;
  };
  isConnectable: boolean;
}

const ApplicationNode: React.FC<ApplicationNodeProps> = ({ data, isConnectable }) => {
  return (
    <div className="application-node node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-content">
        <div className="node-header application">应用</div>
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

export default ApplicationNode; 