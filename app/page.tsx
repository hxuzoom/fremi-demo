'use client'

import {
	Navbar,
	HeroSection,
	VignetteDivider,
	AboutSection,
	ServicesSection,
	ContactSection,
	Footer,
	AiChatbot,
} from '@/components'

export default function Home() {
	return (
		<div className="relative min-h-screen overflow-x-hidden">
			<Navbar />
			<main>
				<HeroSection />
				<VignetteDivider />
				<AboutSection />
				<ServicesSection />
				<ContactSection />
			</main>
			<Footer />
			<AiChatbot />
		</div>
	)
}
