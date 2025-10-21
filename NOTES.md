# High-Level Design

This is a **Next.js application** built using the **App Router**, structured into three main modules — `profiler`, `llm`, and `scraper`.

---

## Architecture Overview

The app follows a **Client–Server Architecture**:

- **Client (profiler)** — Runs in the browser and manages the UI and user interactions.  
- **Server (llm & scraper)** — Exposed through **Next.js server actions** to handle scraping and llm orchestration.

---

## Modules

### 1. `profiler` (Client-Side)
Handles the **frontend UI** and report orchestration.

**Includes:**
- `ProductProfileCard`
- `ICPCard` (Ideal Customer Profile)
- `UserPersonasCard`
- `PersonaChatModal`
- `PersonaEditForm`

**Role:**  
Displays generated profiles and triggers backend server actions to `scraper` and `llm`.

---

### 2. `llm` (Server-Side)
Contains all **LLM orchestration logic**.

**Responsibilities:**
- Invokes the model through **LangChain**
- Manages **prompt templates**
- Validates output with **Zod**
- Handles **persona chat logic**

---

### 3. `scraper` (Server-Side)
Provides **scraping utilities** using **Cheerio**.

**Responsibilities:**
- Fetches and parses web content
- Extracts **visual semantics** (headings, paragraphs, structure)

---

## Data Persistence

Generated reports — **Product Profiles**, **Customer Profiles**, and **User Personas** — are stored in **browser localStorage**, keeping only the **10 most recent** reports.

---

# Instructions to run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

# Todos: For Production

### Core Improvements
- **Implement Authentication** — Secure the app and associate reports with user accounts.  
- **Persist Reports in Database** — Replace localStorage with a proper database.  
- **Add API Tracing** — Use **Langfuse** or similar tools to trace and monitor requests made to Gemini.  
- **Track Usage per User** — Implement user-level analytics and apply **rate or usage limits**.  
- **Add Detailed Logging** — Introduce structured logs for debugging and performance monitoring.  
- **Implement URL-Based Caching** — Cache generation results.

---

### Good to Haves
- **Stream Output** — Stream model responses to improve perceived performance.  
- **Async Background Jobs** — Run AI generation workflows asynchronously (e.g., using a job queue).  
