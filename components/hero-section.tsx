'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import Image from 'next/image'

export function HeroSection() {
	const { t, languageKey } = useLanguage()

	const scrollToContact = () => {
		const element = document.getElementById('contact')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<section id="home" className="relative h-screen pt-20">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/images/hero.webp"
					alt="FREMI Maskinentreprenør"
					fill
					priority
					className="object-cover"
				quality={75}
				/>
				<div className="absolute inset-0 bg-black/50" />
			</div>

			{/* Content */}
			<div className="relative z-10 mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
					<AnimatePresence mode="wait">
						<motion.div
							key={languageKey}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -30 }}
							transition={{ duration: 0.5, ease: 'easeInOut' }}
							className="max-w-4xl"
						>
							<p className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
								{t.hero.subtitle}
							</p>

							<h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
								{t.hero.title}
							</h1>

							<p className="mb-10 text-lg text-gray-200">
								{t.hero.description}
							</p>

							<motion.button
								onClick={scrollToContact}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="mb-8 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl"
							>
								{t.hero.cta}
							</motion.button>

					{/* Contact Info */}
					<div className="relative z-40 mt-8 flex flex-col items-center gap-4 text-white sm:mt-12 sm:flex-row sm:justify-center sm:gap-6">
						<a
							href={`mailto:${t.company.email}`}
							className="flex items-center gap-2 transition-colors hover:text-accent"
						>
							<Mail size={20} aria-hidden="true" />
							<span className="text-sm sm:text-base">{t.company.email}</span>
						</a>

						<a
							href={`tel:${t.company.phone.replace(/\s/g, '')}`}
							className="flex items-center gap-2 transition-colors hover:text-accent"
						>
							<Phone size={20} aria-hidden="true" />
							<span className="text-sm sm:text-base">{t.company.phone}</span>
						</a>

						<div className="flex items-center gap-2">
							<MapPin size={20} aria-hidden="true" />
							<span className="text-sm sm:text-base">
								{t.company.address}
							</span>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
				</div>
			</div>

		{/* Scroll Indicator */}
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 1 }}
			className="absolute bottom-8 left-1/2 z-60 -translate-x-1/2"
		>
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ repeat: Infinity, duration: 2 }}
				className="h-12 w-6 rounded-full border-2 border-white p-1"
			>
				<div className="h-2 w-2 rounded-full bg-white" />
			</motion.div>
		</motion.div>
	</section>
	)
}
