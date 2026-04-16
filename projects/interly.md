To provide you with the most effective resume content and a comprehensive context for future AI interactions, I have organized this information into three formats: **Resume-Ready Bullet Points**, a **Project Summary**, and a **Technical Deep-Dive**.

---

### 1. Resume Content (Action-Oriented)

**Project Name: Interly – AI Interview Coaching Platform**
*Full-Stack Engineer | Next.js, TypeScript, PostgreSQL, Gemini AI*

*   **System Architecture:** Architected a full-stack Web application using **Next.js 15 (App Router)** and **TypeScript**, leveraging **Supabase** for authentication and storage, and **Prisma ORM** for managing complex relational data in **PostgreSQL**.
*   **AI Integration & Reliability:** Integrated **Google Gemini LLM** for real-time technical and behavioral interview evaluation; implemented a custom **API key rotation and exponential backoff retry mechanism** to ensure 99.9% availability against rate limits.
*   **Audio Engineering:** Developed a voice-based practice module utilizing the **Web MediaRecorder API** and **Google Speech-to-Text**, enabling users to record verbal responses and receive instant feedback on both content accuracy and delivery metrics (pace, clarity, filler words).
*   **Adaptive Learning Engine:** Built a custom **Spaced Repetition System (SRS)** based on cognitive science principles (Ebbinghaus Forgetting Curve) that dynamically schedules questions based on user performance and mastery levels.
*   **Advanced Analytics:** Designed a "Readiness Score" algorithm and an interactive dashboard using **Chart.js** and **Framer Motion** to visualize knowledge gaps and track preparation progress across technical and behavioral domains.
*   **Testing & Quality:** Achieved high reliability by implementing a multi-layer testing strategy, including unit/integration tests with **Jest** and end-to-end (E2E) testing of AI flows with **Playwright**.

---

### 2. Project Summary (The "Elevator Pitch")

**Interly** is a science-backed, AI-driven interview preparation platform designed to bridge the gap between theoretical knowledge and verbal performance. Unlike static flashcard apps, Interly acts as an active coach. It allows users to define specific "Learning Objectives" (e.g., Senior Go Developer), generates tailored questions using LLMs, and requires users to answer out loud. 

The platform evaluates not only the technical correctness of the answer but also the "soft skills"—analyzing pacing (WPM), confidence levels, and the use of filler words. It specifically targets behavioral interviews by analyzing stories against the **STAR (Situation, Task, Action, Result) method**, providing users with a "Holistic Feedback" score and a path to improvement.

---

### 3. Detailed Technical Description (For Context)

#### **Core Tech Stack**
*   **Frontend:** React 19, Next.js 15, Tailwind CSS, Radix UI (shadcn/ui), Framer Motion (animations), Zustand (state management).
*   **Backend:** Next.js API Routes, Supabase (Auth/Storage), Prisma (ORM), PostgreSQL.
*   **AI/ML:** Google Gemini 2.0 Flash (Evaluation/Generation), Google Cloud Speech-to-Text (Transcription).
*   **Infrastructure:** Dockerized environment, Sentry (error tracking), PostHog (product analytics).

#### **Key Technical Implementations**

*   **The SRS Logic (`srs.ts` / `scheduler.ts`):** 
    The application categorizes questions into `New`, `Learning`, `To Review` (Overdue), and `Struggling`. The scheduler prioritizes overdue and struggling questions, using a "Review Ease" factor (starting at 2.5) that increases or decreases based on AI-generated evaluation scores. This ensures users spend time on their weakest areas.
    
*   **Behavioral Weakness Analysis:** 
    A specific logic layer parses historical feedback to identify which part of the STAR method a user consistently fails in (e.g., they always forget the "Result"). The AI then generates **adaptive questions** specifically designed to force the user to practice that specific weakness.

*   **Robust AI Executor (`gemini-executor.ts`):** 
    To handle the unpredictability of LLM APIs, a specialized executor was built. It shuffles multiple API keys and wraps requests in a rotation logic. If one key is rate-limited (429 error) or fails (5xx), the system automatically rolls to the next key and retries with exponential backoff.

*   **Mock Interview Sessions:** 
    A complex state machine handles Mock Interview sessions, allowing users to configure a mix of technical and behavioral questions. It tracks session duration, aggregates scores across multiple questions, and generates a finalized PDF report via **jsPDF**.

*   **Data Integrity & Privacy:** 
    Includes a "Danger Zone" with full data portability. Users can export their entire practice history as a JSON file or perform a transactional permanent deletion (cascading through Prisma to Supabase Auth).

#### **Testing Suite**
*   **Playwright:** Used for heavy-lifting E2E tests, including a "fake audio capture" setup to simulate voice interviews in a CI/CD environment.
*   **Jest:** Covers complex logic such as readiness score calculations and SRS interval shifts.

---

### 4. Keywords for ATS Optimization
`Next.js`, `TypeScript`, `Prisma`, `PostgreSQL`, `LLM Integration`, `Google Gemini`, `Web Audio API`, `Speech-to-Text`, `Spaced Repetition System (SRS)`, `Relational Database Design`, `API Key Rotation`, `Tailwind CSS`, `Playwright E2E`, `Zustand`, `Scalable Architecture`, `AI-driven Analytics`.