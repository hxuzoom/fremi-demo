'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import Image from 'next/image'

export function Footer() {
	const { t, languageKey } = useLanguage()

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<footer className="bg-black py-12 text-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<AnimatePresence mode="wait">
					<motion.div
						key={languageKey}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
					>
						<div className="sm:col-span-2 lg:col-span-1">
							<button
								onClick={() => scrollToSection('home')}
								className="mb-4 flex items-center gap-3 transition-opacity hover:opacity-80"
							>
								<Image
									src="/fremi.webp"
									alt="FREMI Logo"
									width={40}
									height={40}
									className="h-10 w-10"
								/>
								<h3 className="text-2xl font-bold">FREMI</h3>
							</button>
							<p className="mb-4 text-gray-400">
								{t.hero.description.split('.')[0]}.
							</p>
							<p className="text-sm text-gray-500">{t.company.orgNr}</p>
						</div>

						<div>
							<button
								onClick={() => scrollToSection('contact')}
								className="mb-4 text-lg font-semibold transition-colors hover:text-accent"
							>
								{t.nav.contact}
							</button>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Mail size={18} className="text-accent" aria-hidden="true" />
									<a
										href={`mailto:${t.company.email}`}
										className="text-gray-400 transition-colors hover:text-accent"
									>
										{t.company.email}
									</a>
								</div>
								<div className="flex items-center gap-3">
									<Phone size={18} className="text-accent" aria-hidden="true" />
									<a
										href={`tel:${t.company.phone.replace(/\s/g, '')}`}
										className="text-gray-400 transition-colors hover:text-accent"
									>
										{t.company.phone}
									</a>
								</div>
								<div className="flex items-center gap-3">
									<MapPin size={18} className="text-accent" aria-hidden="true" />
									<span className="text-gray-400">{t.company.address}</span>
								</div>
							</div>
						</div>

						<div>
							<button
								onClick={() => scrollToSection('services')}
								className="mb-4 text-lg font-semibold transition-colors hover:text-accent"
							>
								{t.nav.services}
							</button>
							<ul className="space-y-2 text-gray-400">
								<li
									onClick={() => scrollToSection('services')}
									className="cursor-pointer transition-colors hover:text-accent"
								>
									{t.services.graving.title}
								</li>
								<li
									onClick={() => scrollToSection('services')}
									className="cursor-pointer transition-colors hover:text-accent"
								>
									{t.services.drenering.title}
								</li>
								<li
									onClick={() => scrollToSection('services')}
									className="cursor-pointer transition-colors hover:text-accent"
								>
									{t.services.tomteutgraving.title}
								</li>
								<li
									onClick={() => scrollToSection('services')}
									className="cursor-pointer transition-colors hover:text-accent"
								>
									{t.services.massetransport.title}
								</li>
							</ul>
						</div>
					</motion.div>
				</AnimatePresence>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500"
				>
					<p>© {new Date().getFullYear()} FREMI. All rights reserved.</p>
				</motion.div>
			</div>
		</footer>
	)
}
