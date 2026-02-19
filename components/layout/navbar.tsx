'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import Image from 'next/image'
import { LanguageDropdown } from '@/components/ui/language-dropdown'

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const { t, languageKey } = useLanguage()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToSection = (id: string) => {
		// Close menu first
		setIsMobileMenuOpen(false)
		
		// Wait for menu to close, then scroll
		setTimeout(() => {
			const element = document.getElementById(id)
			if (element) {
				const navbarHeight = 80 // Height of navbar (5rem = 80px)
				const elementPosition = element.getBoundingClientRect().top
				const offsetPosition = elementPosition + window.pageYOffset - navbarHeight
				
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				})
			}
		}, 300) // Match animation duration
	}

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
			className={`fixed left-0 right-0 top-0 z-100 w-full transition-all duration-300 ${
				isScrolled || isMobileMenuOpen
					? 'bg-white/95 backdrop-blur-md shadow-lg dark:bg-black/95'
					: 'bg-transparent'
			}`}
		>
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="flex h-20 items-center justify-between overflow-visible">
				<motion.button
					onClick={() => scrollToSection('home')}
					className={`flex items-center gap-3 text-2xl font-bold transition-colors ${
						isScrolled || isMobileMenuOpen ? 'text-foreground' : 'text-white'
					}`}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Image
						src="/fremi.webp"
						alt="FREMI Logo"
						width={40}
						height={40}
						className="h-10 w-10"
					/>
					<span>FREMI</span>
				</motion.button>

				<div className="flex items-center gap-4">
					<div className="hidden items-center gap-8 md:flex">
						<AnimatePresence mode="wait">
							<motion.div
								key={languageKey}
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.3 }}
								className="flex items-center gap-8"
							>
								<button
									onClick={() => scrollToSection('home')}
									className={`min-w-[60px] transition-colors hover:text-accent ${
										isScrolled ? 'text-foreground' : 'text-white'
									}`}
								>
									{t.nav.home}
								</button>
								<button
									onClick={() => scrollToSection('services')}
									className={`min-w-[80px] transition-colors hover:text-accent ${
										isScrolled ? 'text-foreground' : 'text-white'
									}`}
								>
									{t.nav.services}
								</button>
								<button
									onClick={() => scrollToSection('about')}
									className={`min-w-[70px] transition-colors hover:text-accent ${
										isScrolled ? 'text-foreground' : 'text-white'
									}`}
								>
									{t.nav.about}
								</button>
								<button
									onClick={() => scrollToSection('contact')}
									className={`min-w-[80px] transition-colors hover:text-accent ${
										isScrolled ? 'text-foreground' : 'text-white'
									}`}
								>
									{t.nav.contact}
								</button>
							</motion.div>
						</AnimatePresence>

						{/* Language Dropdown */}
						<LanguageDropdown variant="desktop" isScrolled={isScrolled} />
					</div>

					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="flex h-10 w-10 shrink-0 items-center justify-center md:hidden"
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? (
							<X size={24} className="text-foreground" />
						) : (
							<Menu size={24} className={isScrolled ? 'text-foreground' : 'text-white'} />
						)}
					</button>
				</div>
			</div>
		</div>

		<AnimatePresence>
			{isMobileMenuOpen && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3 }}
					className="w-full bg-white/95 backdrop-blur-md dark:bg-black/95 md:hidden"
					style={{ pointerEvents: 'auto' }}
				>
					<nav className="space-y-4 px-4 pb-6 pt-2">
					<button
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							scrollToSection('home')
						}}
						type="button"
						className="block w-full min-h-[44px] cursor-pointer text-left text-foreground transition-colors hover:text-accent active:text-accent"
					>
						{t.nav.home}
					</button>
					<button
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							scrollToSection('services')
						}}
						type="button"
						className="block w-full min-h-[44px] cursor-pointer text-left text-foreground transition-colors hover:text-accent active:text-accent"
					>
						{t.nav.services}
					</button>
					<button
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							scrollToSection('about')
						}}
						type="button"
						className="block w-full min-h-[44px] cursor-pointer text-left text-foreground transition-colors hover:text-accent active:text-accent"
					>
						{t.nav.about}
					</button>
					<button
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							scrollToSection('contact')
						}}
						type="button"
						className="block w-full min-h-[44px] cursor-pointer text-left text-foreground transition-colors hover:text-accent active:text-accent"
					>
						{t.nav.contact}
					</button>
					<LanguageDropdown variant="mobile" />
				</nav>
				</motion.div>
			)}
		</AnimatePresence>
		</motion.nav>
	)
}
