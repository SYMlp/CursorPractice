/**
 * 数据格式化工具
 * 
 * 提供各种数据格式化函数，用于将原始数据格式化为适合展示的格式
 */

/**
 * 格式化数字
 * @param value 要格式化的数字
 * @param locale 区域设置，默认中文
 * @returns 格式化后的字符串
 */
export function formatNumber(value: number | string, locale: string = 'zh-CN'): string {
  if (typeof value === 'string') {
    // 尝试将字符串转换为数字
    const numValue = parseFloat(value.replace(/,/g, ''));
    if (isNaN(numValue)) {
      return value;
    }
    value = numValue;
  }
  
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * 格式化百分比
 * @param value 要格式化的值（0-1之间的小数或带%的字符串）
 * @param decimals 小数位数
 * @returns 格式化后的百分比字符串
 */
export function formatPercent(value: number | string, decimals: number = 2): string {
  if (typeof value === 'string') {
    // 如果是以%结尾的字符串，直接返回
    if (value.endsWith('%')) {
      return value;
    }
    
    // 否则转换为数字
    value = parseFloat(value);
    if (isNaN(value)) {
      return '0%';
    }
  }
  
  // 如果值已经是0-100范围，不需要乘以100
  if (value > 1) {
    return `${value.toFixed(decimals)}%`;
  }
  
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * 格式化日期时间
 * @param date 日期对象或时间戳
 * @param format 格式化模式：'date'=仅日期, 'time'=仅时间, 'datetime'=日期和时间
 * @param locale 区域设置
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTime(
  date: Date | number | string,
  format: 'date' | 'time' | 'datetime' = 'datetime',
  locale: string = 'zh-CN'
): string {
  const dateObj = typeof date === 'object' ? date : new Date(date);
  
  const options: Intl.DateTimeFormatOptions = {};
  
  if (format === 'date' || format === 'datetime') {
    options.year = 'numeric';
    options.month = '2-digit';
    options.day = '2-digit';
  }
  
  if (format === 'time' || format === 'datetime') {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }
  
  return dateObj.toLocaleString(locale, options);
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
} 