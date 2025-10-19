# Quick Start Guide

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the `.env.example` file to `.env.local`:
```bash
# Windows PowerShell
Copy-Item .env.example .env.local
```

Then edit `.env.local` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it into `.env.local`

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Enter a URL**: Type any website URL (e.g., https://stripe.com)
2. **Select Persona Count**: Use the slider to choose 1-5 personas
3. **Click Generate**: Watch the AI analyze the website
4. **View Results**: See the product profile, customer profile, and detailed personas

## 🏗️ Project Structure Overview

```
modules/
├── scraper/          → Web scraping logic
├── persona-generator/ → AI workflow and agents
└── landing/          → UI components
```

## 🧪 Testing

Try these example URLs:
- https://stripe.com
- https://notion.so
- https://figma.com
- https://airbnb.com

## ⚠️ Important Notes

- The CSS errors shown in VS Code are normal (Tailwind v4 syntax)
- First generation may take 30-60 seconds
- Requires active internet connection
- Gemini API has rate limits on free tier

## 🐛 Troubleshooting

**Error: Environment validation failed**
- Make sure `.env.local` exists with `GEMINI_API_KEY`

**Error: Scraping failed**
- Some websites block scraping - try a different URL
- Verify the URL is accessible and valid

**Slow generation**
- Normal for first request (cold start)
- Subsequent requests should be faster

## 📝 Features

✅ Real-time progress tracking
✅ Transparent intermediate results
✅ Responsive design
✅ Dark mode support
✅ Type-safe with TypeScript
✅ Modular architecture
✅ Server-side rendering

Enjoy building personas! 🎨
