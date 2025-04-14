/**
 * API响应通用类型定义
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

// 时间范围类型
export type TimeRange = 'day' | 'week' | 'month' | 'year';

// 排序方向
export type SortDirection = 'ascend' | 'descend';

// 排序参数
export interface SortParams {
  field: string;
  order: SortDirection;
}

// 筛选参数
export interface FilterParams {
  [key: string]: any;
}

// 请求选项
export interface RequestOptions {
  signal?: AbortSignal;
  headers?: Record<string, string>;
} 