/**
 * API 通用或跨模块共享的类型定义
 */

// 通用API响应结构
export interface ApiResponse<T> {
  code: number;     // 状态码，200表示成功
  data: T;          // 响应数据
  message: string;  // 响应消息
  success: boolean; // 是否成功
}

// 分页请求参数
export interface PaginationParams {
  pageSize: number; // 每页条数
  current: number;  // 当前页码
}

// 分页结果
export interface PaginationResult<T> {
  total: number;    // 总记录数
  list: T[];        // 数据列表
  pageSize: number; // 每页条数
  current: number;  // 当前页码
}

// 通用时间范围类型 (用于API参数)
export type TimeRange = 'day' | 'week' | 'month';

// 通用请求配置选项
export interface RequestOptions {
  headers?: Record<string, string>; // 自定义请求头
  signal?: AbortSignal;             // 用于取消请求的 AbortSignal
} 