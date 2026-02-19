'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { useEffect } from 'react'

interface ToastProps {
	message: string
	type: 'success' | 'error'
	onClose: () => void
	duration?: number
}

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
	useEffect(() => {
		if (duration > 0) {
			const timer = setTimeout(onClose, duration)
			return () => clearTimeout(timer)
		}
	}, [duration, onClose])

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{ opacity: 0, y: -100, scale: 0.95 }}
				animate={{ 
					opacity: 1, 
					y: 0, 
					scale: 1,
					transition: {
						type: 'spring',
						stiffness: 300,
						damping: 25,
						duration: 0.4,
					}
				}}
				exit={{ 
					opacity: 0, 
					y: -100, 
					scale: 0.95,
					transition: {
						duration: 0.3,
						ease: 'easeInOut',
					}
				}}
				className="fixed left-1/2 top-24 z-9999 flex min-w-[320px] max-w-md -translate-x-1/2 items-center gap-3 rounded-lg border px-6 py-4 shadow-2xl"
				style={{
					backgroundColor: type === 'success' ? '#065f46' : '#7f1d1d',
					borderColor: type === 'success' ? '#10b981' : '#ef4444',
				}}
			>
				{type === 'success' ? (
					<CheckCircle className="shrink-0 text-green-400" size={24} aria-hidden="true" />
				) : (
					<XCircle className="shrink-0 text-red-400" size={24} aria-hidden="true" />
				)}
				<p className="flex-1 text-sm font-medium text-white">{message}</p>
				<button
					onClick={onClose}
					className="shrink-0 text-white/70 transition-colors hover:text-white"
					aria-label="Close notification"
				>
					<X size={18} aria-hidden="true" />
				</button>
			</motion.div>
		</AnimatePresence>
	)
}
