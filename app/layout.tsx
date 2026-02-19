import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/language-context'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'FREMI - Pålitelig maskinentreprenør',
	description:
		'FREMI utfører grave- og entreprenørtjenester i Møre og Romsdal. Vi tilbyr graving, drenering, tomteutgraving og massetransport.',
	metadataBase: new URL('https://fremi-demo.vercel.app'),
	openGraph: {
		title: 'FREMI - Pålitelig maskinentreprenør',
		description:
			'FREMI utfører grave- og entreprenørtjenester i Møre og Romsdal. Vi tilbyr graving, drenering, tomteutgraving og massetransport.',
		url: 'https://fremi-demo.vercel.app',
		siteName: 'FREMI',
		locale: 'no_NO',
		type: 'website',
		images: [
			{
				url: '/images/og.webp',
				width: 1200,
				height: 630,
				alt: 'FREMI - Pålitelig maskinentreprenør',
			},
		],
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="no">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<LanguageProvider>{children}</LanguageProvider>
			</body>
		</html>
	)
}
