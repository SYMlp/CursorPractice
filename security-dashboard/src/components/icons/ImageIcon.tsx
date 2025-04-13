import React from 'react';

interface ImageIconProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * 图片图标组件
 * 用于从assets/icons目录加载图片作为图标
 */
const ImageIcon: React.FC<ImageIconProps> = ({ 
  src, 
  alt = "图标", 
  width = 24, 
  height = 24,
  className = ""
}) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default ImageIcon; 