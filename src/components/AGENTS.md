# Components

**Parent:** `AGENTS.md` → [Root](/AGENTS.md)

## OVERVIEW

Two main views: CV display (with template switching + AI review) and cover letter generator. Vanilla DOM rendering — no framework.

## STRUCTURE

```
components/
├── CvView.ts           # CV view: template switcher, print, AI review + improve modal
├── LetterView.ts       # Cover letter: job desc input, screenshot, Gemini gen, combined print
└── cv-templates/       # Template renderer registry (see its AGENTS.md)
```

## WHERE TO LOOK

| Pattern | Files | Notes |
|---------|-------|-------|
| CV template switching | `CvView.ts:18-153` | Local state + localStorage, re-renders on switch |
| AI review modal | `CvView.ts:67-110` | Calls `reviewCv()` then `improveCv()`, modal apply callback |
| Cover letter generation | `LetterView.ts:139-186` | Job description text OR screenshot → `generateCoverLetter()` |
| Combined print (CV+letter) | `LetterView.ts:225-275` | Clones both into `#printable-area` for A4 print |
| Print title management | `LetterView.ts:202-223` | Temporarily sets `document.title` for print output |

## CONVENTIONS

- **Inline translations** — Each component defines its own `translations` object keyed by `LanguageCode`.
- **Function-based rendering** — `renderXxx(data, lang, ...callbacks)` returns `HTMLElement`.
- **Re-render on state change** — Parent `App.handleNavigation()` clears `container.innerHTML` and re-creates the element.
- **Event listeners attached post-render** — `attachListeners()` or manual `.addEventListener()` after `innerHTML` assignment.
- **`SAFEGUARD` fallback** — Language fallback chain: `currentLang → 'en' → first available`.
- **All 7 template CSS files** are imported in `main.ts` — not code-split per template.

## NOTES

- `LetterView.ts` has no loading state differentiation between "generating" and "done with error" — both replace `letterOutput.innerHTML`.
- Both views use `window.print()` directly. The combined print in LetterView injects a clone into the DOM temporarily.
