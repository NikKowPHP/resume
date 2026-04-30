# CV Templates

**Parent:** `AGENTS.md` → [Root](/AGENTS.md) → [Components](../AGENTS.md)

## OVERVIEW

Template registry pattern. Each file exports a `render(data: CVData, lang: LanguageCode) => string` function. Only 2 of 6 are registered — 4 orphaned.

## STRUCTURE

```
cv-templates/
├── index.ts              # Registry: { classic: { name, render }, ats: { name, render } }
├── ClassicTemplate.ts    # ✅ Registered — two-column layout, sidebar left
├── AtsTemplate.ts        # ✅ Registered — single-column ATS-optimized
├── BackendTemplate.ts    # ❌ Exists, NOT registered
├── CompactTemplate.ts    # ❌ Exists, NOT registered
├── CorporateTemplate.ts  # ❌ Exists, NOT registered
└── ModernTemplate.ts     # ❌ Exists, NOT registered
```

## WHERE TO LOOK

| Pattern | Files | Notes |
|---------|-------|-------|
| Registry | `index.ts` | Maps `id → { name, render }`. Add new templates here. |
| Registered templates | `ClassicTemplate.ts`, `AtsTemplate.ts` | Both use `CVData` + helper functions |
| Orphaned templates | `BackendTemplate.ts`, `CompactTemplate.ts`, `CorporateTemplate.ts`, `ModernTemplate.ts` | Have render functions, CSS imported in main.ts, but never wired in `index.ts` |

## CONVENTIONS

- **Signature** — `export const render = (data: CVData, lang: LanguageCode): string` returning an HTML string.
- **Helper functions** — Each file defines `createXxx(item)` helpers returning template-literal HTML strings.
- **`CVData` sections** — Uses `data.sections.xxx` (translated section headers) + `data.personalInfo` / `data.experience` / etc.
- **No sanitization** — `innerHTML` assignment. Template strings can contain `<script>` if `CVData` is compromised.
- **CSS class prefixes** — Classic uses `.cv-container`, ATS uses `.ats-container`. Other templates have their own prefixes too.

## NOTES

- Orphaned templates' CSS IS imported in `main.ts`, adding ~X KB to every page load.
- To add a new template: (1) create render function, (2) register in `index.ts`, (3) CSS import in `main.ts` already exists for most.
