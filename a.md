</response>
  <reasoning>
    The user is encountering a 404 error in their production environment on Vercel. This is a classic development-vs-production configuration issue.

    **The Problem:**
    In the development environment, the Vite dev server (`vite.config.ts`) is configured to use a proxy. It intercepts any frontend request made to `/api` and forwards it to the real Gemini API endpoint (`https://generativelanguage.googleapis.com`). This is done to bypass browser CORS security restrictions during development.

    However, this proxy configuration **only exists in the development server**. When you build the project for production, the output is a set of static files (HTML, CSS, JS). The production server (Vercel) has no knowledge of the Vite proxy configuration. When the deployed app makes a request to `/api/...`, Vercel tries to find a file or a serverless function at that path within your project, fails to find one, and returns a 404 "Not Found" error.

    **The Solution:**
    To fix this, we need to tell Vercel how to handle these `/api` requests. I will create a `vercel.json` configuration file in the root of the project. This file will contain a `rewrites` rule that instructs Vercel to act as a proxy in production, mimicking the behavior of our development server.

    Specifically, I will add a rule that rewrites any request to `/api/:path*` to `https://generativelanguage.googleapis.com/:path*`. This will correctly forward the API calls to Google's servers, resolving the 404 error and allowing the application to work in production.

    No other code changes are needed. I will also update `TASKS.md`.
  </reasoning>
  <modifications>
    <file path="TASKS.md">
      <![CDATA[
- [x] Fix CORS error when calling Gemini API
- [x] Add a button to combine the CV and cover letter in the same PDF on different pages.
- [x] Refactor CV data retrieval to use JSON data directly instead of scraping the DOM.
- [x] Answer user question about sending JSON vs. formatted text to the AI.
- [x] Fix AI prompt to prevent generating the date and any Markdown formatting.
- [x] Fix 404 error for API calls in production by adding Vercel rewrite configuration.
]]>
    </file>
    <file path="vercel.json">
      <![CDATA[
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://generativelanguage.googleapis.com/:path*"
    }
  ]
}
]]>
    </file>
  </modifications>
</response>