# FREMI

A modern, bilingual website for FREMI, a Norwegian excavation and contracting company. Built with Next.js 16, React 19, and TypeScript.

## Tech Stack

- Next.js 16.1.6
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12
- Zod 4

## Features

### Core Features
- Bilingual support (Norwegian/English)
- Responsive design
- Server-side rendering
- Edge runtime optimization
- Image optimization (AVIF/WebP)

### AI Chatbot
- Google Gemini AI integration
- Streaming responses
- Language-aware responses
- Rate limiting (10 requests/minute per IP)
- Black and orange themed UI

### Contact Form
- Email integration via Resend
- Form validation with Zod
- Rate limiting (5 requests/10 minutes per IP)
- Numeric-only phone input
- Professional HTML email templates

### Interactive Map
- Leaflet integration
- Dynamic import for client-side rendering
- Location display for Skodje, Norway

## Project Structure

```
fremi/
├── app/
│   ├── api/
│   │   ├── chat/         # AI chatbot endpoint
│   │   └── contact/      # Contact form endpoint
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── checkbox.tsx
│   │   └── language-dropdown.tsx
│   ├── about-section.tsx
│   ├── ai-chatbot.tsx
│   ├── contact-section.tsx
│   ├── hero-section.tsx
│   └── services-section.tsx
├── contexts/
│   └── language-context.tsx
├── lib/
│   ├── email.ts          # Email service
│   ├── rate-limit.ts     # Rate limiting utility
│   └── translations.ts   # i18n translations
└── public/
    ├── images/
    └── svg/
```

## Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_PROMPT="your_system_prompt"
RESEND_API_KEY=your_resend_api_key
EMAIL_RECIPIENT=your_email@example.com
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Rate Limiting

### AI Chatbot
- 10 requests per minute per IP
- 429 status on limit exceeded
- Automatic cleanup of expired records

### Contact Form
- 5 requests per 10 minutes per IP
- Rate limit headers included in responses
- In-memory storage (suitable for single-instance deployments)

## Image Configuration

Supported formats: AVIF, WebP
Quality: 75
Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048, 3840
Image sizes: 16, 32, 48, 64, 96, 128, 256, 384

## Language Support

The application supports Norwegian (Bokmål) and English with:
- URL-based language detection
- Context-based state management
- Dynamic content switching
- AI chatbot language awareness

## Key Dependencies

- @google/genai: AI chatbot integration
- resend: Email service
- react-hook-form: Form management
- zod: Schema validation
- framer-motion: Animations
- leaflet: Map integration
- lucide-react: Icons

## API Routes

### POST /api/chat
AI chatbot endpoint with streaming responses

**Body:**
```json
{
  "message": "string",
  "language": "no" | "en"
}
```

**Rate Limit:** 10 requests/minute

### POST /api/contact
Contact form submission

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string",
  "consent": true
}
```

**Rate Limit:** 5 requests/10 minutes

## Deployment

The application is configured for Vercel deployment with:
- Edge runtime for API routes
- Automatic image optimization
- Environment variable management

## License

Demo Project
