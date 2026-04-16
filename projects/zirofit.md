

# Project Name: ZIRO.FIT
**Role:** Full-Stack Software Engineer / Architect  
**Project Type:** B2B2C SaaS Fitness & Business Management Platform  
**Tech Stack:** Next.js 15 (App Router), TypeScript, Prisma ORM, PostgreSQL, Supabase (Auth/Storage), Stripe (Connect & Billing), Redis, Tailwind CSS, Framer Motion, Sentry, PostHog.

---

## 1. Executive Summary
**ZIRO.FIT** is a high-performance, full-stack SaaS platform designed to bridge the gap between personal trainers and their clients. It provides trainers with a suite of business tools (revenue tracking, client engagement analytics, and automated scheduling) while offering clients an AI-powered fitness experience. The platform features a unique "AI Co-Pilot" that generates personalized, periodized training programs based on user history and biological feedback, alongside a location-based discovery engine for fitness events.

## 2. Technical Key Features

### A. AI-Driven Performance Coaching
*   **Multi-Model AI Integration:** Built a robust AI engine utilizing **Google Gemini, Groq, and Cerebras** with automated fallback logic to ensure high availability for generating workout plans and business insights.
*   **Goal Refinement Engine:** Developed a prompt-engineered wizard that transforms vague user goals (e.g., "get fit") into structured 4-week progressive training blocks.
*   **Context-Aware Generation:** Leverages historical workout data, personal records (PRs), and injury history to calculate "Exercise Mastery" scores, informing the AI on how to apply progressive overload safely.

### B. Scalable Business & Fintech Infrastructure
*   **Stripe Connect Integration:** Implemented a complex marketplace payment flow using Stripe Connect, allowing trainers to onboard, set up custom packages, and receive automated payouts with dynamic application fees.
*   **Tiered Subscription System:** Engineered a multi-tier subscription model (Starter/Pro/Elite) with feature-gating and client limits enforced via server-side middleware and custom hooks.
*   **Real-time Analytics:** Built a "Business Co-Pilot" dashboard for trainers that visualizes revenue trends, client retention risks, and service popularity using **Chart.js**.

### C. Advanced Event Discovery & Management
*   **Geospatial Search:** Integrated **Leaflet and OpenStreetMap (Nominatim)** for location-based event discovery, allowing clients to find fitness workshops nearby using coordinate-based distance calculation.
*   **Ticketing & Moderation:** Developed an end-to-end event lifecycle including trainer submission, admin moderation workflows, and secure ticket purchasing via Stripe.

### D. Performance & UX Optimization
*   **Data Optimization:** Reduced dashboard load times significantly by replacing standard ORM queries with optimized **Raw SQL** utilizing `json_agg` and `LATERAL JOINs` to minimize database round-trips.
*   **Granular Cache Strategy:** Implemented a sophisticated revalidation system using **Vercel KV (Redis)** and Next.js tags, separating "heavy" business metrics from "light" activity feeds to ensure UI snappiness.
*   **Offline-Ready Architecture:** Designed a synchronization service intended for mobile parity, ensuring data integrity between web and mobile clients.

---

## 3. Resume-Ready Descriptions

### Option 1: Focus on Full-Stack & AI (Best for Senior roles)
> **Full-Stack Software Engineer | ZIRO.FIT**
> *   Architected a B2B2C SaaS platform using **Next.js 15** and **TypeScript**, enabling personal trainers to manage 50+ clients and automate business operations.
> *   Integrated a multi-LLM engine (**Gemini, Groq, Cerebras**) with a custom fallback executor to generate personalized, periodized workout programs and predictive business insights.
> *   Optimized data retrieval by 60% through **Raw SQL** aggregation and a granular **Redis-backed** caching layer, handling complex relational data for real-time dashboards.
> *   Engineered a secure payment and payout infrastructure using **Stripe Connect**, managing automated billing, tiered subscriptions, and marketplace fee logic.

### Option 2: Focus on Product & Architecture (Best for Lead roles)
> **Lead Developer | ZIRO.FIT (Fitness SaaS)**
> *   Designed and implemented a dual-sided dashboard architecture for trainers and clients, featuring real-time messaging via **Supabase Realtime** and location-based discovery using **Leaflet**.
> *   Developed a "self-healing" user synchronization layer between Supabase Auth and PostgreSQL, ensuring 100% data consistency across distributed systems.
> *   Scaled trainer outreach capabilities by building a custom domain "white-label" system, allowing users to point personal domains to the platform via Vercel’s API.
> *   Implemented comprehensive observability and analytics using **Sentry** and **PostHog**, leading to a 40% reduction in client-side error rates within the first three months of beta.

---

## 4. Interview "Talking Points" (Context)

*   **The "N+1" Challenge:** Talk about how the trainer dashboard initially required 12+ database queries to load. Explain how you moved to a single Raw SQL query using `json_build_object` to return the entire dashboard state in one request.
*   **The Fallback AI Logic:** Discuss why you chose to use multiple AI providers (Groq for speed, Gemini for complex reasoning, Cerebras for high-throughput). Explain the `executeWithFallbacks` utility you wrote.
*   **The Multi-Tenant Security:** Describe how you used "Lightweight Auth Context" headers in the Next.js middleware to prevent unauthorized data access between different trainers' client lists.
*   **Fintech Complexity:** Detail the struggle of handling "Package Credits." Explain how you built the transaction logic where a session is only marked as "completed" and a credit is deducted if the trainer-client relationship is valid and credits are available.