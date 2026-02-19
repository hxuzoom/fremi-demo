'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { Language, translations, Translations } from '@/lib/translations'

interface LanguageContextType {
	language: Language
	setLanguage: (lang: Language) => void
	t: Translations
	languageKey: number
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState] = useState<Language>('no')
	const [languageKey, setLanguageKey] = useState(0)

	const setLanguage = useCallback((lang: Language) => {
		setLanguageState(lang)
		setLanguageKey((prev) => prev + 1)
	}, [])

	const value = {
		language,
		setLanguage,
		t: translations[language],
		languageKey,
	}

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	)
}

export function useLanguage() {
	const context = useContext(LanguageContext)
	if (context === undefined) {
		throw new Error('useLanguage must be used within a LanguageProvider')
	}
	return context
}
