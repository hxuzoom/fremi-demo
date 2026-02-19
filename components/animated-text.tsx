'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { ReactNode } from 'react'

interface AnimatedTextProps {
	children: ReactNode
	className?: string
}

export function AnimatedText({ children, className = '' }: AnimatedTextProps) {
	const { languageKey } = useLanguage()

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={languageKey}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className={className}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
