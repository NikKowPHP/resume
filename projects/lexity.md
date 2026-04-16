This project, **Lexity**, is a highly sophisticated, production-grade AI platform designed to bridge the gap between passive consumption and active fluency in language learning. 

Below is a detailed summary, technical breakdown, and resume-ready bullet points you can use.

---

### **Project Summary (The "Pitch")**
**Lexity** is an AI-native language learning ecosystem that transforms traditional journaling into a personalized, data-driven curriculum. Unlike apps that rely on pre-set curriculum, Lexity analyzes a user’s unique writing and speaking output in real-time using a **Composite AI architecture** (Gemini, Groq, Cerebras). It identifies granular linguistic weaknesses, generates targeted Spaced Repetition (SRS) flashcards, and builds a dynamic "Learning Path" that adapts to the user's specific performance trends and proficiency levels.

---

### **Resume-Ready Bullet Points**

*   **Architected a multimodal AI journaling platform** using **Next.js 15 (App Router)** and **TypeScript**, enabling real-time linguistic feedback for both text and audio inputs.
*   **Engineered a Composite AI Service Layer** utilizing **Google Gemini 2.0**, **Groq**, and **Cerebras** with a custom-built automated failover/rotation logic, achieving high reliability and sub-second latency for AI translations and suggestions.
*   **Developed a proprietary Spaced Repetition System (SRS)** based on an enhanced **SM-2 algorithm**, featuring automated card generation from user mistakes and dynamic review scheduling.
*   **Implemented robust security protocols**, including **AES-256-GCM application-layer encryption** for all user-generated content and **Supabase Auth** for secure session management.
*   **Built a data-driven "Path Planner" engine** that analyzes historical performance via **Prisma ORM** to programmatically generate personalized learning modules and micro-lessons.
*   **Designed an advanced analytics dashboard** incorporating **hybrid forecasting models** (Holt’s Linear and Damped Trend) to predict user proficiency growth over 30/90-day horizons.
*   **Optimized application performance** by implementing a **Redis caching layer** and **optimistic UI updates** via **TanStack Query**, reducing database load and enhancing perceived user latency.
*   **Integrated a secure subscription billing system** using **Stripe**, supporting tiered access levels and automated webhook-based status synchronization.

---

### **Detailed Technical Context (For Interviews)**

#### **1. The AI Strategy (Composite AI)**
You didn't just plug in one API. You built a system that selects the best model for the job:
*   **Gemini 2.0:** Used for multimodal tasks like **transcribing YouTube videos**, analyzing **audio journals**, and describing images.
*   **Groq/Cerebras:** Used for "Stuck Writer" and "Stuck Speaker" hints where **low-latency inference** is critical to maintaining user flow.
*   **Prompt Engineering:** You implemented structured JSON outputs with Zod validation to ensure AI responses integrated seamlessly with the PostgreSQL schema.

#### **2. Performance & Caching**
*   **Redis Integration:** You implemented a `RedisCacheService` to cache system settings, analytics snapshots, and learning paths. 
*   **Optimistic UI:** When a user adds a mistake to their study deck or completes a review, the UI updates instantly via TanStack Query's `onMutate` patterns, with automatic rollback on server failure.

#### **3. Advanced Algorithms**
*   **Fluency Forecasting:** You wrote a hybrid model in `forecasting.ts` that switches between Holt’s Linear Trend (for small datasets) and Damped Trend (for large datasets) to provide realistic proficiency predictions.
*   **Linguistic Tagging:** You built a pipeline that uses LLMs to convert natural language explanations of grammar mistakes into `snake_case` **canonical concept tags** for database indexing and struggle-score calculation.

#### **4. Security & Data Integrity**
*   **Encryption at Rest:** You didn't rely solely on the database. You built a custom encryption utility (`encryption.ts`) that handles IVs and Auth Tags for every sensitive field before it hits the DB.
*   **Sync Delta System:** To support future mobile or offline use, you implemented **SyncTombstones**, tracking deleted entities so offline clients can synchronize state correctly.

#### **5. Testing & Quality Assurance**
*   **E2E Testing:** You utilized **Playwright** for complex user journeys, including a custom "E2E Auth Bypass" to run tests without hitting Supabase Auth rate limits.
*   **Unit Testing:** Used **Jest** and **React Testing Library** with deep mocking of AI providers and the Prisma client.

---

### **Tech Stack Overview**
*   **Frontend:** Next.js 15, React 19, Tailwind CSS, shadcn/ui, Zustand, Lucide React.
*   **Backend:** Next.js Route Handlers (Serverless), Prisma ORM, PostgreSQL (Supabase).
*   **AI/ML:** Google Gemini (Flash/Pro), Groq (Whisper/Llama), Cerebras (Qwen), Google TTS.
*   **Infrastructure:** Redis (Upstash/ioredis), Supabase (Auth/Storage), Stripe (Payments), Resend (Email).
*   **DevOps/Tooling:** Sentry (Error Tracking), PostHog (Product Analytics), Playwright (E2E), Docker.

---

### **Project "Flex" Points (Great for "Tell me about a time..." questions)**
1.  **The "Stuck Speaker" Feature:** You solved the problem of user anxiety during audio recording by building an AI listener that provides real-time "sentence starters" based on the partial transcript.
2.  **The Path-First Onboarding:** You redesigned the app to move away from a standard dashboard to a "Learning Path" that forces a diagnostic journal entry before generating a curriculum.
3.  **The Book Reader:** You integrated `epub.js` to allow users to read their own books, with a custom content hook that wraps every word in an interactive span for instant translation and "Mark as Known" logic.