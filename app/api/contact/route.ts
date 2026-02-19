import { NextRequest, NextResponse } from 'next/server'
import {
	getRateLimitKey,
	checkRateLimit,
	getRateLimitHeaders,
} from '@/lib/rate-limit'
import { sendContactEmail } from '@/lib/email'
import { z } from 'zod'

export const runtime = 'edge'

const contactSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	phone: z.string().optional(),
	message: z.string().min(10, 'Message must be at least 10 characters'),
	consent: z.boolean().refine((val) => val === true, {
		message: 'You must agree to the terms',
	}),
})

export async function POST(request: NextRequest) {
	try {
		// Check rate limit: 5 requests per 10 minutes for contact form
		const rateLimitKey = getRateLimitKey(request)
		const rateLimitResult = checkRateLimit(rateLimitKey, {
			limit: 5,
			windowMs: 10 * 60 * 1000, // 10 minutes
		})

		if (!rateLimitResult.allowed) {
			return NextResponse.json(
				{
					error: 'rate_limited',
					message: 'Too many contact form submissions. Please try again later.',
				},
				{
					status: 429,
					headers: getRateLimitHeaders(
						{ limit: 5, windowMs: 10 * 60 * 1000 },
						rateLimitResult
					),
				}
			)
		}

		const body = await request.json()

		// Validate input
		const validationResult = contactSchema.safeParse(body)
		if (!validationResult.success) {
			return NextResponse.json(
				{
					error: 'validation_error',
					message: 'Invalid form data',
					details: validationResult.error.flatten(),
				},
				{ status: 400 }
			)
		}

		const data = validationResult.data

		// Send email
		await sendContactEmail({
			name: data.name,
			email: data.email,
			phone: data.phone,
			message: data.message,
		})

		return NextResponse.json(
			{
				success: true,
				message: 'Contact form submitted successfully',
			},
			{
				status: 200,
				headers: getRateLimitHeaders(
					{ limit: 5, windowMs: 10 * 60 * 1000 },
					rateLimitResult
				),
			}
		)
	} catch (error) {
		console.error('Contact form error:', error)
		return NextResponse.json(
			{
				error: 'server_error',
				message: 'Failed to process contact form',
			},
			{ status: 500 }
		)
	}
}
