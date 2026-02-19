import { NextRequest } from 'next/server'

export interface RateLimitConfig {
	limit: number
	windowMs: number
}

export interface RateLimitResult {
	allowed: boolean
	remaining: number
	resetTime: number
}

interface RateLimitRecord {
	count: number
	resetTime: number
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitRecord>()

export function getRateLimitKey(request: NextRequest): string {
	const forwarded = request.headers.get('x-forwarded-for')
	const realIp = request.headers.get('x-real-ip')
	const ip = forwarded?.split(',')[0] ?? realIp
	
	if (!ip) {
		throw new Error('Unable to determine client IP address')
	}
	
	return ip
}

export function checkRateLimit(
	key: string,
	config: RateLimitConfig
): RateLimitResult {
	const now = Date.now()
	const record = rateLimitStore.get(key)

	// Clean up expired entries
	if (record && now > record.resetTime) {
		rateLimitStore.delete(key)
	}

	const currentRecord = rateLimitStore.get(key)

	if (!currentRecord) {
		const resetTime = now + config.windowMs
		rateLimitStore.set(key, {
			count: 1,
			resetTime,
		})
		return {
			allowed: true,
			remaining: config.limit - 1,
			resetTime,
		}
	}

	if (currentRecord.count >= config.limit) {
		return {
			allowed: false,
			remaining: 0,
			resetTime: currentRecord.resetTime,
		}
	}

	currentRecord.count++
	return {
		allowed: true,
		remaining: config.limit - currentRecord.count,
		resetTime: currentRecord.resetTime,
	}
}

export function getRateLimitHeaders(
	config: RateLimitConfig,
	result: RateLimitResult
): Record<string, string> {
	const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000)

	return {
		'X-RateLimit-Limit': config.limit.toString(),
		'X-RateLimit-Remaining': result.remaining.toString(),
		...(result.allowed ? {} : { 'Retry-After': retryAfter.toString() }),
	}
}
