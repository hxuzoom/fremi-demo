'use client'

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { Checkbox } from '@/components/ui/checkbox'
import { Toast } from '@/components/ui/toast'
import dynamic from 'next/dynamic'

const ContactMap = dynamic(() => import('./contact-map').then((mod) => ({ default: mod.ContactMap })), {
	ssr: false,
	loading: () => (
		<div className="flex h-full items-center justify-center bg-gray-200">
			<p className="text-gray-600">Loading map...</p>
		</div>
	),
})

const contactSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	phone: z.string().optional(),
	message: z.string().min(10, 'Message must be at least 10 characters'),
	consent: z.boolean().refine((val) => val === true, {
		message: 'You must agree to the terms',
	}),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactSection() {
	const { t, language, languageKey } = useLanguage()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [toast, setToast] = useState<{
		message: string
		type: 'success' | 'error'
	} | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	})

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true)
		setToast(null)

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			const result = await response.json()

			if (response.status === 429) {
				setToast({
					message:
						language === 'no'
							? 'For mange forespørsler. Vennligst prøv igjen senere.'
							: 'Too many requests. Please try again later.',
					type: 'error',
				})
				setIsSubmitting(false)
				return
			}

			if (!response.ok) {
				throw new Error(result.message || 'Failed to submit form')
			}

			setToast({
				message:
					language === 'no'
						? 'Melding sendt! Vi kontakter deg snart.'
						: 'Message sent! We will contact you soon.',
				type: 'success',
			})
			reset()
		} catch (error) {
			console.error('Form submission error:', error)
			setToast({
				message:
					language === 'no'
						? 'Noe gikk galt. Vennligst prøv igjen.'
						: 'Something went wrong. Please try again.',
				type: 'error',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section id="contact" className="bg-black py-20 lg:py-28">
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(null)}
				/>
			)}

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<AnimatePresence mode="wait">
					<motion.div
						key={languageKey}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="mb-8 text-center lg:mb-16"
					>
						<h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
							{t.contact.title}
						</h2>
					</motion.div>
				</AnimatePresence>

			<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
				{/* Left Side - Map (order-2 on mobile, order-1 on desktop) */}
				<div className="order-2 flex flex-col lg:order-1">
					<AnimatePresence mode="wait">
						<motion.h3
							key={languageKey}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, ease: 'easeInOut' }}
							className="mb-6 text-2xl font-bold text-accent sm:text-3xl"
						>
							{language === 'no' ? 'Kartvisning' : 'Map view'}
						</motion.h3>
					</AnimatePresence>
					<div className="mx-auto h-[350px] w-[90%] overflow-hidden rounded-lg shadow-xl sm:h-[400px] sm:w-full lg:h-[700px] lg:w-full lg:flex-1">
						<Suspense fallback={<div className="h-full w-full bg-gray-200" />}>
							<ContactMap />
						</Suspense>
					</div>
				</div>

				{/* Right Side - Form (order-1 on mobile, order-2 on desktop) */}
				<AnimatePresence mode="wait">
					<motion.div
						key={languageKey}
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -30 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="order-1 lg:order-2"
					>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-6 bg-black p-8"
						>
							<div>
								<label
									htmlFor="name"
									className="mb-2 block text-sm font-medium text-white"
								>
									{t.contact.nameLabel}*
								</label>
								<input
									{...register('name')}
									id="name"
									type="text"
									placeholder={t.contact.namePlaceholder}
									className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
								/>
								{errors.name && (
									<p className="mt-1 text-sm text-red-500">
										{errors.name.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-medium text-white"
								>
									{t.contact.emailLabel}*
								</label>
								<input
									{...register('email')}
									id="email"
									type="email"
									placeholder={t.contact.emailPlaceholder}
									className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
								/>
								{errors.email && (
									<p className="mt-1 text-sm text-red-500">
										{errors.email.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="phone"
									className="mb-2 block text-sm font-medium text-white"
								>
									{t.contact.phoneLabel}
								</label>
								<input
									{...register('phone')}
									id="phone"
									type="tel"
									inputMode="numeric"
									pattern="[0-9]*"
									placeholder={t.contact.phonePlaceholder}
									className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
									onKeyPress={(e) => {
										if (!/[0-9]/.test(e.key)) {
											e.preventDefault()
										}
									}}
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="mb-2 block text-sm font-medium text-white"
								>
									{t.contact.messageLabel}*
								</label>
								<textarea
									{...register('message')}
									id="message"
									rows={5}
									placeholder={t.contact.messagePlaceholder}
									className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
								/>
								{errors.message && (
									<p className="mt-1 text-sm text-red-500">
										{errors.message.message}
									</p>
								)}
							</div>

							<Checkbox
								{...register('consent')}
								id="consent"
								label={`${t.contact.consent}*`}
								error={errors.consent?.message}
							/>

							<motion.button
								type="submit"
								disabled={isSubmitting}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-4 font-semibold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
							>
								{isSubmitting ? (
									<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
								) : (
									<>
										<Send size={20} aria-hidden="true" />
										{t.contact.submit}
									</>
								)}
							</motion.button>
					</form>
				</motion.div>
			</AnimatePresence>
			</div>
		</div>
	</section>
	)
}
