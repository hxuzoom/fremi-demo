'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Users, Clock, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import Image from 'next/image'

export function AboutSection() {
	const { t, languageKey } = useLanguage()

	const values = [
		{
			key: 'fagfolk',
			icon: Users,
			title: t.about.values.fagfolk.title,
			description: t.about.values.fagfolk.description,
		},
		{
			key: 'avtalt',
			icon: Clock,
			title: t.about.values.avtalt.title,
			description: t.about.values.avtalt.description,
		},
		{
			key: 'fleksibel',
			icon: Sparkles,
			title: t.about.values.fleksibel.title,
			description: t.about.values.fleksibel.description,
		},
	]

	return (
		<section
			id="about"
			className="relative z-50 bg-black py-20 pt-32 lg:py-28"
		>
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					{/* Left Side - Text Content */}
					<AnimatePresence mode="wait">
						<motion.div
							key={languageKey}
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 30 }}
							transition={{ duration: 0.5, ease: 'easeInOut' }}
							className="flex h-auto flex-col justify-center lg:h-[600px]"
						>
							<h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
								{t.about.subtitle}
							</h2>
							<h3 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
								{t.about.title}
							</h3>
							<p className="mb-10 text-lg leading-relaxed text-gray-300">
								{t.about.description}
							</p>

							{/* Values - Compact List */}
							<div className="space-y-8">
								{values.map((value, index) => (
									<div key={value.key}>
										<h4 className="mb-2 text-xl font-bold text-white">
											{value.title}
										</h4>
										<p className="text-base leading-relaxed text-gray-300">
											{value.description}
										</p>
									</div>
								))}
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Right Side - Image */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="relative flex items-center justify-center"
					>
						<div className="relative h-[500px] w-full overflow-hidden shadow-2xl lg:h-[600px]">
							<Image
								src="/images/about-us.webp"
								alt="About Fremi"
							fill
							className="object-cover"
							quality={75}
						/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
