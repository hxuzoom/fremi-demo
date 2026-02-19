'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { Language } from '@/lib/translations'
import Image from 'next/image'

interface LanguageDropdownProps {
	variant?: 'desktop' | 'mobile'
	isScrolled?: boolean
}

export function LanguageDropdown({ variant = 'desktop', isScrolled = false }: LanguageDropdownProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { language, setLanguage } = useLanguage()
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (variant === 'desktop') {
			const handleClickOutside = (event: MouseEvent) => {
				if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
					setIsOpen(false)
				}
			}
			document.addEventListener('mousedown', handleClickOutside)
			return () => document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [variant])

	const handleLanguageChange = (lang: Language) => {
		setLanguage(lang)
		setIsOpen(false)
	}

	const getFlagIcon = (lang: Language) => {
		return lang === 'no' ? '/svg/no.svg' : '/svg/eng.svg'
	}

	const getLanguageLabel = (lang: Language) => {
		return lang === 'no' ? 'NO' : 'EN'
	}

	const getFullLanguageName = (lang: Language) => {
		return lang === 'no' ? 'Norwegian' : 'English'
	}

	if (variant === 'mobile') {
		return (
			<div className="border-t border-gray-700 pt-4">
				<button
					onClick={() => handleLanguageChange('no')}
					className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
						language === 'no' ? 'bg-accent/10' : ''
					}`}
				>
					<Image
						src="/svg/no.svg"
						alt="Norwegian"
						width={24}
						height={24}
						className="h-5 w-6 shrink-0 rounded"
					/>
					<span className="truncate text-sm font-medium text-foreground">{getFullLanguageName('no')}</span>
				</button>
				<button
					onClick={() => handleLanguageChange('en')}
					className={`mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
						language === 'en' ? 'bg-accent/10' : ''
					}`}
				>
					<Image
						src="/svg/eng.svg"
						alt="English"
						width={24}
						height={24}
						className="h-5 w-6 shrink-0 rounded"
					/>
					<span className="truncate text-sm font-medium text-foreground">{getFullLanguageName('en')}</span>
				</button>
			</div>
		)
	}

	return (
		<div className="relative overflow-visible" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex min-w-[100px] items-center justify-between gap-2 rounded-md px-3 py-2 transition-colors hover:bg-accent/10 ${
					isScrolled ? 'text-foreground' : 'text-white'
				}`}
			>
				<div className="flex items-center gap-2">
					<Image
						src={getFlagIcon(language)}
						alt={getLanguageLabel(language)}
						width={24}
						height={24}
						className="h-5 w-6 rounded"
					/>
					<span className="text-sm font-medium">{getLanguageLabel(language)}</span>
				</div>
				<ChevronDown size={16} />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 top-full z-200 mt-2 w-32 rounded-lg bg-white shadow-lg dark:bg-gray-900"
					>
						<button
							onClick={() => handleLanguageChange('no')}
							className={`flex w-full items-center gap-3 rounded-t-lg px-4 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
								language === 'no' ? 'bg-accent/10' : ''
							}`}
						>
							<Image
								src="/svg/no.svg"
								alt="Norwegian"
								width={24}
								height={24}
								className="h-5 w-6 rounded"
							/>
							<span className="text-sm font-medium text-foreground">NO</span>
						</button>
						<button
							onClick={() => handleLanguageChange('en')}
							className={`flex w-full items-center gap-3 rounded-b-lg px-4 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
								language === 'en' ? 'bg-accent/10' : ''
							}`}
						>
							<Image
								src="/svg/eng.svg"
								alt="English"
								width={24}
								height={24}
								className="h-5 w-6 rounded"
							/>
							<span className="text-sm font-medium text-foreground">EN</span>
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
