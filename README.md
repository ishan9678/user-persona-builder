# User Persona Builder

Transform any website into detailed user personas using AI-powered analysis.

Try it out - 
https://user-persona-builder-4fux60jz4-ishan9678s-projects.vercel.app/

## Features

- 🔍 **Web Scraping**: Extract content, semantics, and visual information from any website
- 🤖 **AI-Powered Analysis**: Uses Google Gemini to create comprehensive product profile, ideal customer profile (IDP) 
- 👥 **Multiple Personas**: Generate 1-5 unique user personas per website

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **AI**: Google Gemini (via LangChain)
- **Scraping**: Cheerio
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and add your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## License

MIT

