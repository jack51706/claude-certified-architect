# Claude Architect Academy — interactive learning site

A bilingual (English + 繁體中文) study site for the **Claude Certified Architect — Foundations** exam, built with [Astro Starlight](https://starlight.astro.build/) + Svelte. It turns the repo's Markdown guides and question bank into a navigable, searchable, interactive learning platform.

## Features

- **Study guide** — all 13 theory chapters + exam-domain notes, generated from the source guides, with sidebar nav, full-text search, and a one-click language switcher.
- **Question bank** — 100 practice questions across all 8 scenarios; bilingual, instant feedback + explanations, scenario filter, "only incorrect" review, progress saved locally.
- **Mock exam** — timed, 4 of 8 scenarios at random, scaled 100–1000 (pass 720), per-scenario breakdown + answer review + attempt history.
- **Flashcards** — spaced repetition (SM-2-lite) over the key terms, bilingual.
- **Glossary** — searchable EN↔中 term reference, filterable by topic.
- **Progress dashboard** — per-scenario accuracy and weakest-area focus.

All progress is stored in the browser (`localStorage`); no backend, no accounts.

## Quick start

```bash
cd web
npm install
npm run dev        # http://localhost:4321
```

```bash
npm run build      # static output in web/dist
npm run preview    # serve the production build locally
```

## How it works

The Markdown guides in the repo root are the **single source of truth**. `npm run dev`/`build` first runs `scripts/sync.mjs`, which:

1. Splits `../guide_en.MD` and `../guide_zh-tw.md` into per-chapter Starlight pages (paired by section order so the language switcher links them), excluding the question-bank sections.
2. Extracts the Practice Test questions from both guides and merges them into one bilingual `src/data/questions.json`.

Both outputs are generated (git-ignored) — **edit the guides, not the generated pages.** To add/translate study content or questions, edit the root `guide_*.md` files and re-run the build.

Interactive features are Svelte islands in `src/components/` (`Quiz`, `Exam`, `Flashcards`, `Glossary`, `Dashboard`), sharing `src/lib/store.js` (localStorage) and `src/lib/ui.js` (bilingual labels). The glossary/flashcards are driven by the authored `src/data/glossary.json`.

## Deploy (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy-site.yml`, which builds the site and deploys it to GitHub Pages. The base path is derived automatically from the repository name, so it works on any fork. **One-time setup:** in the repo's **Settings → Pages**, set the source to **GitHub Actions**.

For a user/organization site or a custom domain (served at the domain root), no base path is needed — the workflow's `BASE_PATH` defaults are only relevant for project Pages (`<user>.github.io/<repo>/`).
