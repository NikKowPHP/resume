# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-30
**Commit:** 9253816
**Branch:** main

## OVERVIEW

Personal resume site + AI cover letter generator for Mikita Kavaliou. Vanilla TypeScript, Vite 6, Google Gemini API via proxy. No framework — pure DOM manipulation.

## STRUCTURE

```
resume/
├── src/
│   ├── main.ts             # Bootstrap: imports all CSS, mounts App
│   ├── App.ts              # Hash router + lang/cv-profile state
│   ├── types.ts            # Core types (CVData, CVProfile, LanguageCode)
│   ├── helpers.ts          # blobToBase64 utility
│   ├── components/         # UI rendering (CvView, LetterView, cv-templates/)
│   ├── data/               # 4 CV profiles × 2 languages (8 JSON + index.ts)
│   ├── services/           # GeminiService.ts (raw HTTP to Gemini via proxy)
│   ├── styles/             # 7 CSS files (all imported unconditionally in main.ts)
│   └── types/              # supabase.ts (dead code — all never types)
├── projects/               # Markdown reference docs for AI cover letter context
├── supabase/               # Unused scaffolding (config.toml, no functions dir)
├── index.html              # Entry HTML
├── vite.config.ts          # Proxy /api → Gemini API, path alias @/ → src/
├── tsconfig.json           # ES2022, bundler resolution, has jsx:react-jsx (unused)
├── vercel.json             # Production rewrite: /api → Gemini
└── apply_changes.sh        # AI response parser (not build infrastructure)
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| App initialization & routing | `src/main.ts`, `src/App.ts` | Hash-based router, language + CV profile state |
| CV display & template switching | `src/components/CvView.ts` | Imports templates registry, AI review/improve modal |
| Cover letter generation | `src/components/LetterView.ts` | Job description textarea, screenshot upload, Gemini call |
| Template renderers | `src/components/cv-templates/` | ClassicTemplate + AtsTemplate registered; 4 orphaned |
| Resume data | `src/data/` | JSON files (en/fr per profile), index.ts assembles CVDatabase |
| AI service | `src/services/GeminiService.ts` | Cover letter gen, CV review, CV improve — raw axios to Gemini |
| Styling | `src/styles/` | Plain CSS (no preprocessor), all imported in main.ts |
| Deploy config | `vercel.json` | Rewrite `/api/*` to `generativelanguage.googleapis.com` |

## CONVENTIONS

- **No framework** — Pure DOM (`createElement`, `innerHTML`, `addEventListener`). No React/Vue/Svelte.
- **Hash routing** — `window.location.hash` + `hashchange` event. `#cv` or `#letter`.
- **Translations** — Inline `Record<LanguageCode, {...}>` objects per component. 4 languages: FR, EN, PL, DE.
- **CSS** — Plain CSS, no preprocessor, no CSS modules. All 7 files imported eagerly in `main.ts`.
- **Path alias** — `@/*` → `./src/*` available but unused in current code.
- **Type safety** — No `strict: true` in tsconfig. No `@ts-ignore` / `as any` found.

## UNIQUE STYLES

- **Gemini via reverse proxy** — No official Google AI SDK. Raw `axios` POST to `/api/v1beta/models/...` via Vite dev proxy (mirrored in Vercel).
- **Data-driven CV profiles** — 4 engineer role profiles, each with per-language JSON. All imported statically at build time.
- **Template registry pattern** — `cv-templates/index.ts` maps `{ id: { name, render } }`. Only 2 of 6 available templates are wired in.
- **`apply_changes.sh`** — Shell script that parses AI XML responses to auto-apply file changes. Not standard build infrastructure.

## ANTI-PATTERNS (THIS PROJECT)

- **No linting, no formatting, no tests, no CI** — Zero quality automation.
- **Supabase dead code** — `@supabase/supabase-js` installed but never imported. `supabase/functions/` doesn't exist. `.vscode` configures Deno for it anyway.
- **jsx:react-jsx with no React** — tsconfig artifact from template bootstrap. No JSX or React in codebase.
- **Orphaned templates** — 4 of 6 template renderers exist but are not registered in `cv-templates/index.ts`. Their CSS files ARE imported though.
- **`package-lock.json` gitignored** — Unusual. Should be committed for reproducible installs.

## COMMANDS

```bash
npm run dev         # Vite dev server on :3000 (proxy /api → Gemini)
npm run build       # Production build to dist/
npm run preview     # Preview production build
npx tsc --noEmit    # Type-check only
```

## NOTES

- `GEMINI_API_KEY` env var required (loaded at module import time — crash if missing).
- Model name hardcoded: `"gemini-3-flash-preview"` (may need updating if model name changes).
- `dist/` is NOT gitignored — build output tracked in version control.
- `metadata.json` says "Empty" / "An empty app" — AI Studio bootstrap artifact, never updated.
