import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'
import {
	getRateLimitKey,
	checkRateLimit,
	getRateLimitHeaders,
} from '@/lib/rate-limit'

export const runtime = 'edge'

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY!,
})

const systemPrompt = process.env.GEMINI_PROMPT!

export async function POST(request: NextRequest) {
	try {
		// Check rate limit: 10 requests per minute
		const rateLimitKey = getRateLimitKey(request)
		const rateLimitResult = checkRateLimit(rateLimitKey, {
			limit: 10,
			windowMs: 60 * 1000,
		})

		if (!rateLimitResult.allowed) {
			return NextResponse.json(
				{
					error: 'rate_limited',
					message: 'Too many requests. Please try again in a minute.',
				},
				{
					status: 429,
					headers: getRateLimitHeaders(
						{ limit: 10, windowMs: 60 * 1000 },
						rateLimitResult
					),
				}
			)
		}

		const { message, language } = await request.json()

		if (!message || typeof message !== 'string') {
			return NextResponse.json(
				{ error: 'Message is required' },
				{ status: 400 }
			)
		}

		if (!process.env.GEMINI_API_KEY) {
			return NextResponse.json(
				{ error: 'API key not configured' },
				{ status: 500 }
			)
		}

		const languageInstruction =
			language === 'no'
				? 'IMPORTANT: Respond in Norwegian (Bokmål). The user is writing in Norwegian.'
				: 'IMPORTANT: Respond in English. The user is writing in English.'

		const config = {
			thinkingConfig: {
				thinkingBudget: 0,
			},
		}

		const model = 'gemini-flash-lite-latest'

		const contents = [
			{
				role: 'user',
				parts: [
					{
						text: `${systemPrompt}\n\n${languageInstruction}\n\nUser message: ${message}`,
					},
				],
			},
		]

		const response = await ai.models.generateContentStream({
			model,
			config,
			contents,
		})

		const encoder = new TextEncoder()
		const stream = new ReadableStream({
			async start(controller) {
				try {
					for await (const chunk of response) {
						const text = chunk.text
						if (text) {
							controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
						}
					}
					controller.enqueue(encoder.encode('data: [DONE]\n\n'))
					controller.close()
				} catch (error) {
					console.error('Stream error:', error)
					controller.error(error)
				}
			},
		})

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive',
				...getRateLimitHeaders(
					{ limit: 10, windowMs: 60 * 1000 },
					rateLimitResult
				),
			},
		})
	} catch (error) {
		console.error('Chat API error:', error)
		return NextResponse.json(
			{ error: 'Failed to process chat message' },
			{ status: 500 }
		)
	}
}
