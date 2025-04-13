import React from 'react';

export const DatabaseIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 40,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

export const ShieldIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

export const AlertIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export const DocumentIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export const CheckListIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="10" y1="6" x2="21" y2="6"></line>
    <line x1="10" y1="12" x2="21" y2="12"></line>
    <line x1="10" y1="18" x2="21" y2="18"></line>
    <polyline points="3 6 4 7 6 5"></polyline>
    <polyline points="3 12 4 13 6 11"></polyline>
    <polyline points="3 18 4 19 6 17"></polyline>
  </svg>
);

export const LayersIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

export const InterfaceIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

export const IdentityIcon: React.FC<{ color?: string }> = ({ color = '#3b82f6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width="24" height="24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.5.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
  </svg>
);

export const StandardIcon: React.FC<{ color?: string }> = ({ color = '#f59e0b' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width="24" height="24">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4v-1h4v1zm0 3H8v-1h8v1zm0 3H8v-1h8v1z" />
  </svg>
);

// 密码规则相关图标
export const KeyIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
  </svg>
);

export const LockIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export const ClockIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export const HistoryIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "text-blue-500", 
  size = 32,
  color 
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v5h5"></path>
    <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path>
    <path d="M12 7v5l4 2"></path>
  </svg>
); 