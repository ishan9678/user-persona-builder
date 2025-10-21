# User Persona Builder

Transform any website into detailed user personas using AI-powered analysis.

## Features

- 🔍 **Web Scraping**: Extract content, semantics, and visual information from any website
- 🤖 **AI-Powered Analysis**: Uses Google Gemini to create comprehensive profiles
- 👥 **Multiple Personas**: Generate 1-5 unique user personas per website
- 📊 **Transparent Process**: See real-time progress through each analysis stage
- 🎨 **Modern UI**: Clean, minimalist design with subtle neo-brutalism aesthetics
- 🏗️ **Modular Architecture**: Well-organized codebase with separation of concerns

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **AI**: Google Gemini (via LangChain)
- **Scraping**: Cheerio
- **Validation**: Zod

## Project Structure

```
user-persona-builder/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Main page component
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── modules/                      # Feature modules
│   ├── scraper/                  # Web scraping module
│   │   ├── types.ts              # Type definitions
│   │   ├── scraper-utils.ts      # Scraping utilities
│   │   └── actions.ts            # Server actions
│   ├── persona-generator/        # AI persona generation
│   │   ├── types.ts              # Type definitions
│   │   ├── llm-utils.ts          # LLM utilities
│   │   ├── workflow.ts           # Workflow orchestrator
│   │   └── actions.ts            # Server actions
│   └── landing/                  # Landing page components
│       ├── types.ts              # Type definitions
│       ├── config.ts             # Stage configuration mapping
│       ├── url-input.tsx         # URL input component
│       ├── product-profile-display.tsx    # Product profile display
│       ├── customer-profile-display.tsx   # Customer profile display
│       └── user-personas-display.tsx      # User personas display
├── components/ui/                # shadcn/ui components
├── lib/                          # Shared utilities
│   ├── env.ts                    # Environment validation
│   └── utils.ts                  # Helper functions
└── .env.local                    # Environment variables
```

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

## Usage

1. Enter a website URL in the input field
2. Adjust the number of personas (1-5) using the slider
3. Click "Generate Personas"
4. Watch the progress as the system:
   - Scrapes the website content
   - Creates a product profile
   - Develops an ideal customer profile
   - Generates detailed user personas
5. View the results including:
   - Product profile (features, value proposition, visual identity)
   - Customer profile (needs, pain points, decision drivers)
   - User personas (demographics, goals, behaviors, visual preferences)

## Architecture

### Modular Design
Each feature is organized into its own module with type definitions, business logic, server actions, and UI components (where applicable).

### Server Actions
All data fetching and AI operations use Next.js server actions for better type safety and simpler organization.

### Workflow
The persona generation uses a sequential workflow:
1. **Product Profile Agent**: Analyzes website to create product profile
2. **Customer Profile Agent**: Uses product profile to define ideal customer
3. **Persona Generator Agent**: Creates diverse user personas based on previous profiles

## License

MIT

