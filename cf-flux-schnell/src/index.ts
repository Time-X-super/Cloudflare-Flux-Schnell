/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { z } from 'zod';
import { ApiError, MethodNotAllowedError, ValidationError } from './errors';

/**
 * 认证令牌
 */
const FLUX_TOKEN = 'Hsue8p20snchw734ambncMD';

/**
 * 环境变量接口
 */
export interface Env {
	AI: any;
}

/**
 * 生成图像响应接口
 */
interface GenerateImageResponse {
	image: string;
}

/**
 * API错误类
 */
class UnauthorizedError extends ApiError {
	constructor() {
		super(401, '未授权访问');
		this.name = 'UnauthorizedError';
	}
}

/**
 * 生成图像请求验证Schema
 */
const GenerateImageSchema = z.object({
	prompt: z.string().min(1, '提示不能为空').max(2048, '提示值不得超过2048个字符'),
	steps: z.number().int().min(1).max(8).default(4).optional(),
});

/**
 * 创建JSON响应
 */
const createJsonResponse = (data: unknown, status = 200): Response => {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
};

/**
 * 处理错误
 */
const handleError = (error: unknown): Response => {
	console.error('处理请求时出错:', error);

	if (error instanceof ApiError) {
		return createJsonResponse(
			{
				error: error.message,
				details: error.details ? error.details : undefined,
			},
			error.status
		);
	}

	return createJsonResponse(
		{
			error: '内部服务器错误',
			details: error instanceof Error ? error.message : '未知错误',
		},
		500
	);
};

/**
 * 验证请求
 */
const validateRequest = async (request: Request): Promise<z.infer<typeof GenerateImageSchema>> => {
	if (request.method !== 'POST') {
		throw new MethodNotAllowedError();
	}

	// 验证Authorization头
	const authHeader = request.headers.get('Authorization');
	const expectedToken = `Bearer ${FLUX_TOKEN}`;

	if (!authHeader || authHeader !== expectedToken) {
		throw new UnauthorizedError();
	}

	try {
		const body = await request.json();
		return GenerateImageSchema.parse(body);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new ValidationError(error);
		}
		throw new ApiError(400, '请求正文无效');
	}
};

/**
 * 主处理程序
 */
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// 设置CORS
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		};

		// 处理预检请求
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		try {
			const validatedData = await validateRequest(request);

			const response = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', {
				prompt: validatedData.prompt,
				steps: validatedData.steps,
			});

			const result: GenerateImageResponse = {
				image: response.image ? `data:image/png;base64,${response.image}` : '',
			};

			return new Response(JSON.stringify(result), {
				headers: {
					...corsHeaders,
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			const errorResponse = handleError(error);
			
			// 添加CORS头到错误响应
			const errorHeaders = new Headers(errorResponse.headers);
			Object.entries(corsHeaders).forEach(([key, value]) => {
				errorHeaders.set(key, value);
			});
			
			return new Response(errorResponse.body, {
				status: errorResponse.status,
				headers: errorHeaders,
			});
		}
	},
} satisfies ExportedHandler<Env>;
