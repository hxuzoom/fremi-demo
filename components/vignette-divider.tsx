'use client'

import { motion } from 'framer-motion'

export function VignetteDivider() {
	return (
		<div className="pointer-events-none absolute left-0 right-0 z-50 h-96" style={{ top: 'calc(100vh - 10vh)' }}>
			{/* Black Smoke/Blur Effect */}
			<div className="absolute inset-0">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1.5 }}
					className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/30"
					style={{
						filter: 'blur(60px)',
					}}
				/>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1.7, delay: 0.2 }}
					className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/20"
					style={{
						filter: 'blur(80px)',
					}}
				/>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 2, delay: 0.4 }}
					className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-transparent"
					style={{
						filter: 'blur(100px)',
					}}
				/>
			</div>
		</div>
	)
}
