import { z } from "zod";

/**
 * 基础API错误类
 */
export class ApiError extends Error {
  constructor(public status: number, message: string, public details?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 验证错误类
 */
export class ValidationError extends ApiError {
  constructor(details: z.ZodError) {
    super(400, '验证错误', details.errors);
    this.name = 'ValidationError';
  }
}

/**
 * 方法不允许错误类
 */
export class MethodNotAllowedError extends ApiError {
  constructor() {
    super(405, '不允许使用方法');
    this.name = 'MethodNotAllowedError';
  }
} 