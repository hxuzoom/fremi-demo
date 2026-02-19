'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'

interface Message {
	role: 'user' | 'assistant'
	content: string
}

export function AiChatbot() {
	const [isOpen, setIsOpen] = useState(false)
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const { language, t } = useLanguage()

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	useEffect(() => {
		if (isOpen && messages.length === 0) {
			setMessages([
				{
					role: 'assistant',
					content: t.chatbot.welcome,
				},
			])
		}
	}, [isOpen, t.chatbot.welcome, messages.length])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim() || isLoading) return

		const userMessage = input.trim()
		setInput('')
		setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
		setIsLoading(true)

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: userMessage,
					language,
				}),
			})

			if (response.status === 429) {
				// Rate limit exceeded
				setMessages((prev) => [
					...prev,
					{
						role: 'assistant',
						content: t.chatbot.rateLimit,
					},
				])
				setIsLoading(false)
				return
			}

			if (!response.ok) {
				throw new Error('Failed to get response')
			}

			const reader = response.body?.getReader()
			const decoder = new TextDecoder()

			if (!reader) {
				throw new Error('No reader available')
			}

			let assistantMessage = ''
			setMessages((prev) => [
				...prev,
				{ role: 'assistant', content: '' },
			])

			while (true) {
				const { done, value } = await reader.read()
				if (done) break

				const chunk = decoder.decode(value)
				const lines = chunk.split('\n')

				for (const line of lines) {
					if (line.startsWith('data: ')) {
						const data = line.slice(6)
						if (data === '[DONE]') {
							break
						}
						try {
							const parsed = JSON.parse(data)
							if (parsed.text) {
								assistantMessage += parsed.text
								setMessages((prev) => {
									const newMessages = [...prev]
									newMessages[newMessages.length - 1] = {
										role: 'assistant',
										content: assistantMessage,
									}
									return newMessages
								})
							}
						} catch (e) {
							console.error('Failed to parse chunk:', e)
						}
					}
				}
			}
		} catch (error) {
			console.error('Chat error:', error)
			setMessages((prev) => [
				...prev,
				{
					role: 'assistant',
					content: t.chatbot.error,
				},
			])
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<AnimatePresence>
				{!isOpen && (
					<motion.button
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={() => setIsOpen(true)}
						className="fixed bottom-6 right-6 z-150 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
						aria-label={t.chatbot.title}
					>
						<MessageCircle size={24} className="text-white" />
					</motion.button>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ duration: 0.3 }}
						className="fixed bottom-6 right-6 z-150 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl bg-black shadow-2xl"
					>
						{/* Header */}
						<div className="flex items-center justify-between bg-black px-6 py-4">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
									<Bot size={20} className="text-white" />
								</div>
								<div>
									<h3 className="text-base font-semibold text-white">
										AI Assistant
									</h3>
									<p className="text-xs text-accent">FREMI</p>
								</div>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="rounded-full p-1 transition-colors hover:bg-white/10"
								aria-label="Close chat"
							>
								<X size={20} className="text-white" />
							</button>
						</div>

						{/* Messages */}
						<div className="flex-1 space-y-4 overflow-y-auto bg-black p-4">
							{messages.map((message, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
									className={`flex gap-2 ${
										message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
									}`}
								>
									{/* Avatar */}
									<div
										className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
											message.role === 'user'
												? 'bg-accent'
												: 'bg-accent'
										}`}
									>
										{message.role === 'user' ? (
											<User size={16} className="text-white" />
										) : (
											<Bot size={16} className="text-white" />
										)}
									</div>

									{/* Message Bubble */}
									<div
										className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
											message.role === 'user'
												? 'bg-accent text-white'
												: 'bg-white/10 text-white backdrop-blur-sm'
										}`}
									>
										<p className="whitespace-pre-wrap text-sm leading-relaxed">
											{message.content}
										</p>
									</div>
								</motion.div>
							))}
							{isLoading && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="flex gap-2"
								>
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
										<Bot size={16} className="text-white" />
									</div>
									<div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
										<Loader2 size={16} className="animate-spin text-accent" />
										<p className="text-sm text-white">{t.chatbot.thinking}</p>
									</div>
								</motion.div>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Input */}
						<form
							onSubmit={handleSubmit}
							className="border-t border-white/10 bg-black p-4"
						>
							<div className="flex gap-2">
								<input
									type="text"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder={t.chatbot.placeholder}
									className="flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white transition-colors placeholder:text-white/40 focus:border-accent focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/30"
									disabled={isLoading}
								/>
								<button
									type="submit"
									disabled={!input.trim() || isLoading}
									className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent transition-all hover:scale-105 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
									aria-label={t.chatbot.send}
								>
									<Send size={18} className="text-white" />
								</button>
							</div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
