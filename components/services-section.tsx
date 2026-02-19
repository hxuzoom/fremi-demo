'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import Image from 'next/image'

const serviceImages = {
	graving: '/images/excavation.webp',
	drenering: '/images/drainage.webp',
	tomteutgraving: '/images/plot-excavation.webp',
	massetransport: '/images/mass-transport.webp',
}

export function ServicesSection() {
	const { t, languageKey } = useLanguage()

	const services = [
		{
			key: 'graving',
			image: serviceImages.graving,
			title: t.services.graving.title,
			description: t.services.graving.description,
		},
		{
			key: 'drenering',
			image: serviceImages.drenering,
			title: t.services.drenering.title,
			description: t.services.drenering.description,
		},
		{
			key: 'tomteutgraving',
			image: serviceImages.tomteutgraving,
			title: t.services.tomteutgraving.title,
			description: t.services.tomteutgraving.description,
		},
		{
			key: 'massetransport',
			image: serviceImages.massetransport,
			title: t.services.massetransport.title,
			description: t.services.massetransport.description,
		},
	]

	return (
		<section
			id="services"
			className="bg-black py-20 lg:py-28"
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Title Row */}
				<AnimatePresence mode="wait">
					<motion.div
						key={languageKey}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="mb-16 grid gap-8 lg:grid-cols-2"
					>
						<div>
							<h3 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
								{t.services.title}
							</h3>
						</div>

						<div className="flex items-center justify-end">
							<h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
								{t.services.subtitle}
							</h2>
						</div>
					</motion.div>
				</AnimatePresence>

				{/* Services Grid - Alternating Layout */}
				<AnimatePresence mode="wait">
					<motion.div
						key={languageKey}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="space-y-20"
					>
						{services.map((service, index) => {
							const isEven = index % 2 === 0
							const number = index + 1
							return (
								<div
									key={service.key}
									className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${
										isEven ? '' : 'lg:grid-flow-dense'
									}`}
								>
									{/* Text Content */}
									<div
										className={`flex flex-col justify-center ${
											isEven ? 'lg:order-1' : 'lg:order-2 lg:col-start-2'
										}`}
									>
										<div className="mb-4 flex items-center gap-4">
											<span className="text-4xl font-bold text-accent">
												{number}.
											</span>
											<h4 className="text-2xl font-bold text-white">
												{service.title}
											</h4>
										</div>
										<p className="leading-relaxed text-gray-300">
											{service.description}
										</p>
									</div>

									{/* Image */}
									<div
										className={`group relative h-64 overflow-hidden shadow-xl lg:h-80 ${
											isEven ? 'lg:order-2' : 'lg:order-1 lg:col-start-1'
										}`}
									>
										<Image
											src={service.image}
											alt={service.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
										quality={75}
									/>
										<div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/5" />
									</div>
								</div>
							)
						})}
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	)
}
