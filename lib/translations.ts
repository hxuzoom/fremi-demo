export type Language = 'no' | 'en'

export interface Translations {
	nav: {
		home: string
		services: string
		about: string
		contact: string
	}
	hero: {
		title: string
		subtitle: string
		description: string
		cta: string
	}
	company: {
		email: string
		phone: string
		address: string
		orgNr: string
	}
	services: {
		title: string
		subtitle: string
		graving: {
			title: string
			description: string
		}
		drenering: {
			title: string
			description: string
		}
		tomteutgraving: {
			title: string
			description: string
		}
		massetransport: {
			title: string
			description: string
		}
	}
	about: {
		title: string
		subtitle: string
		description: string
		values: {
			fagfolk: {
				title: string
				description: string
			}
			avtalt: {
				title: string
				description: string
			}
			fleksibel: {
				title: string
				description: string
			}
		}
	}
	contact: {
		title: string
		namePlaceholder: string
		nameLabel: string
		emailPlaceholder: string
		emailLabel: string
		phonePlaceholder: string
		phoneLabel: string
		messagePlaceholder: string
		messageLabel: string
		consent: string
		submit: string
	}
	chatbot: {
		title: string
		placeholder: string
		send: string
		thinking: string
		error: string
		rateLimit: string
		welcome: string
	}
	footer: {
		developedBy: string
		privacy: string
	}
}

export const translations: Record<Language, Translations> = {
	no: {
		nav: {
			home: 'Forside',
			services: 'Tjenester',
			about: 'Om oss',
			contact: 'Kontakt',
		},
		hero: {
			title: 'Pålitelig og sikker maskinentreprenør!',
			subtitle: 'FREMI V/ FRODE FREMMERLID',
			description:
				'Vi nyter stor tillit blant våre kunder og kan vise til gode referanser fra tidligere arbeid. Vi skal være ditt naturlige valg for å dekke etterspørselen etter en maskinentreprenør.',
			cta: 'Kontakt oss',
		},
		company: {
			email: 'fro-fre@outlook.com',
			phone: '926 04 072',
			address: '6260 SKODJE',
			orgNr: 'Orgnr 912 166 805',
		},
		services: {
			title: 'Graving, drenering og transport av masser i Møre og Romsdal!',
			subtitle: 'Våre tjenester',
			graving: {
				title: 'Graving',
				description:
					'Vi utfører alt innen grunnarbeid og graving. Trenger du hjelp ved planering for grunnmur er vi de rette til saken. Vi graver også grøfter for legging av vann- og avløpsrør. Velg oss, og du får en solid aktør innen grunn- og betong!',
			},
			drenering: {
				title: 'Drenering',
				description:
					'God drenering rundt huset hindrer fukt- og kondensskader i grunnmuren. Om du kun isolerer innvendig er faren større for at det oppstår fukt. Vi tar jobben for deg!',
			},
			tomteutgraving: {
				title: 'Tomteutgraving',
				description:
					'Vi graver tomtene for deg! Et bra resultat krever godt grunnarbeid. Vi utfører alltid grunnarbeid i henhold til Norsk Standard og vi har lang erfaring innen faget!',
			},
			massetransport: {
				title: 'Massetransport',
				description:
					'Vi sørger for at overskuddsmasse etter graving blir fraktet vekk. Vi skaffer også jord, stein og singel ved behov. Ta kontakt for priser.',
			},
		},
		about: {
			title: 'Velkommen til Fremi!',
			subtitle: 'Om oss',
			description:
				'Fremi utfører grave-, og entreprenørtjenester innen privat- og næringsmarkedet i Møre og Romsdal og omegn. Det er bare å ta kontakt med oss angående arbeidsområder, vi er svært fleksible, og vi skreddersyr løsninger som er tilpasset våre kunder. Alt arbeid blir utført profesjonelt og med svært høy standard. Materialer som anvendes er av høy kvalitet fra kjente vareleverandører. Vår styrke er tillit og fokus på beste løsninger samt alltid topp kvalitet.',
			values: {
				fagfolk: {
					title: 'La fagfolk gjøre jobben',
					description:
						'For å sikre at jobben gjøres riktig, og for å unngå overraskelser er det alltid best å la fagfolk gjøre jobben',
				},
				avtalt: {
					title: 'Til avtalt tid og pris',
					description:
						'Vi holder det vi lover, og holder deg som kunde oppdatert til enhver tid.',
				},
				fleksibel: {
					title: 'Fleksibel aktør',
					description:
						'Vi kartlegger kundens behov og tilpasser deretter en løsning som begge partner er fornøyd med.',
				},
			},
		},
		contact: {
			title: 'Kontakt oss',
			namePlaceholder: 'Ditt navn',
			nameLabel: 'Ditt navn',
			emailPlaceholder: 'Din epost',
			emailLabel: 'Din epost',
			phonePlaceholder: 'Ditt telefonnummer',
			phoneLabel: 'Ditt telefonnummer',
			messagePlaceholder: 'Din forespørsel...',
			messageLabel: 'Din forespørsel...',
			consent: 'Jeg godtar at opplysningene brukes til kontakt',
			submit: 'Send',
		},
		chatbot: {
			title: 'Chat med oss',
			placeholder: 'Skriv din melding...',
			send: 'Send',
			thinking: 'Tenker...',
			error: 'Noe gikk galt. Prøv igjen.',
			rateLimit: 'For mange forespørsler. Vennligst vent et minutt før du prøver igjen.',
			welcome: 'Hei! Hvordan kan jeg hjelpe deg i dag?',
		},
		footer: {
			developedBy: 'Utviklet av Hjemmesidehuset',
			privacy: 'Personvern',
		},
	},
	en: {
		nav: {
			home: 'Home',
			services: 'Services',
			about: 'About',
			contact: 'Contact',
		},
		hero: {
			title: 'Reliable and safe machine contractor!',
			subtitle: 'FREMI V/ FRODE FREMMERLID',
			description:
				'We enjoy great trust among our customers and can show good references from previous work. We shall be your natural choice to meet the demand for a machine contractor.',
			cta: 'Contact us',
		},
		company: {
			email: 'fro-fre@outlook.com',
			phone: '+47 926 04 072',
			address: '6260 SKODJE, Norway',
			orgNr: 'Org No. 912 166 805',
		},
		services: {
			title: 'Excavation, drainage and mass transport in Møre og Romsdal!',
			subtitle: 'Our services',
			graving: {
				title: 'Excavation',
				description:
					'We perform all types of foundation work and excavation. If you need help planning for foundation walls, we are the right choice. We also dig trenches for laying water and sewage pipes. Choose us, and you get a solid player in foundation and concrete!',
			},
			drenering: {
				title: 'Drainage',
				description:
					'Good drainage around the house prevents moisture and condensation damage to the foundation. If you only insulate internally, the risk of moisture is greater. We take care of the job for you!',
			},
			tomteutgraving: {
				title: 'Plot Excavation',
				description:
					'We excavate the plots for you! A good result requires good foundation work. We always perform foundation work in accordance with Norwegian Standards and we have extensive experience in the field!',
			},
			massetransport: {
				title: 'Mass Transport',
				description:
					'We ensure that excess mass after excavation is transported away. We also provide soil, stone and gravel as needed. Contact us for prices.',
			},
		},
		about: {
			title: 'Welcome to Fremi!',
			subtitle: 'About us',
			description:
				'Fremi performs excavation and contractor services within the private and commercial market in Møre og Romsdal and surrounding areas. Just contact us regarding work areas, we are very flexible, and we tailor solutions that are adapted to our customers. All work is performed professionally and to a very high standard. Materials used are of high quality from well-known suppliers. Our strength is trust and focus on the best solutions and always top quality.',
			values: {
				fagfolk: {
					title: 'Let professionals do the job',
					description:
						'To ensure that the job is done right, and to avoid surprises, it is always best to let professionals do the job',
				},
				avtalt: {
					title: 'On agreed time and price',
					description:
						'We keep our promises and keep you as a customer updated at all times.',
				},
				fleksibel: {
					title: 'Flexible operator',
					description:
						'We map the customer\'s needs and then adapt a solution that both partners are satisfied with.',
				},
			},
		},
		contact: {
			title: 'Contact us',
			namePlaceholder: 'Your name',
			nameLabel: 'Your name',
			emailPlaceholder: 'Your email',
			emailLabel: 'Your email',
			phonePlaceholder: 'Your phone number',
			phoneLabel: 'Your phone number',
			messagePlaceholder: 'Your inquiry...',
			messageLabel: 'Your inquiry...',
			consent: 'I agree that the information is used for contact',
			submit: 'Send',
		},
		chatbot: {
			title: 'Chat with us',
			placeholder: 'Type your message...',
			send: 'Send',
			thinking: 'Thinking...',
			error: 'Something went wrong. Please try again.',
			rateLimit: 'Too many requests. Please wait a minute before trying again.',
			welcome: 'Hi! How can I help you today?',
		},
		footer: {
			developedBy: 'Developed by Hjemmesidehuset',
			privacy: 'Privacy',
		},
	},
}
