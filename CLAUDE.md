# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **content repository** — study materials for the *Claude Certified Architect — Foundations* certification, not a software application. The primary artifacts are multilingual Markdown study guides. There is one small Python build tool and a CI pipeline; everything else is content.

Three artifact layers, by source-of-truth precedence:
1. **`guide_<lang>.md` (source of truth)** — the study guides, one per language. Hand-edited.
2. **`pdf/guide_<lang>.pdf` (generated)** — auto-built from the guides by CI. **Never hand-edit; edit the Markdown and let CI regenerate.**
3. **`practical_test_<lang>.html` (generated)** — self-contained interactive quiz apps built from the guides' question sections.

## Critical gotchas

- **The interactive-quiz build is a two-step pipeline.** `extract_question.py` (repo root) parses the **Practice Test** question blocks from `guide_<lang>` and prints them as JSON; `utils/build_practical_test_html.py` consumes that JSON and writes `practical_test_<lang>.html`. The extractor is language-agnostic: it handles half/full-width punctuation, treats any `**[…]**` token as the correct-answer marker, and detects the Practice Test section via the question-number reset (so the earlier examples section is excluded). `global_n` is renumbered sequentially 1..N. Non-`en`/`zh-tw` HTML files may be stale — regenerate any language with `python utils/build_practical_test_html.py <lang>`.
- **PDFs are build outputs.** Commits titled `Update guide PDFs [skip ci]` are made by GitHub Actions. Do not edit `pdf/*` or include PDF changes in content PRs.
- **Inconsistent file extensions:** `guide_en.MD`, `guide_ar.MD`, `guide_ru.MD` are uppercase `.MD`; the rest are lowercase `.md`. The CI glob uses `shopt -s nullglob nocaseglob` so both match — preserve each file's existing case, don't "normalize" it.
- **`.claude/` is gitignored** (see `.gitignore`).

## Guide structure (every `guide_<lang>` mirrors this)

Intro → Target Candidate → Exam Format → 5 Domains (weighted) → 8 Exam Scenarios → **PART I: Theory Foundations** (Chapters 1–13) → **PART II: Exam Domain Notes** → sample-question bank → **Practical Exercises** → **Appendix**. The English guide holds ~112 sample questions (12 in the examples section + 100 in the Practice Test, across all 8 exam scenarios). When editing one language, keep section ordering and headings parallel across languages.

### Question block format (what the quiz builder parses)

Fully **localized per language** — the header word, the `Situation:` label, and the correct-answer marker are all translated. English:

```
## Question 12 (Scenario: Multi-agent Research System)

**Situation:** <scenario text>

**<the question prompt>**

- A) <option>
- B) <option>
- C) <option> **[CORRECT]**
- D) <option>

**Why C:** <explanation>

---
```

Japanese equivalent uses `## 問題1（シナリオ：…）`, `**状況：**`, and `**[正解]**`. Any `extract_question.py` reimplementation must therefore carry per-language markers. The builder’s JSON shape per question: `scenario, global_n, situation, question, options[{letter,text,correct}], correct, explanation`.

## Commands

```bash
# Build interactive quizzes — build_practical_test_html.py auto-invokes extract_question.py
# (it resolves the interpreter via sys.executable, so `python` or `python3` both work)
python utils/build_practical_test_html.py             # all langs in LANG_TITLES
python utils/build_practical_test_html.py en zh-tw    # specific languages
# Output: practical_test_<lang>.html written to the repo root.
python extract_question.py en all                     # inspect the extractor's raw JSON

# Build a PDF locally the same way CI does (CI normally handles this)
npm install -g md-to-pdf
md-to-pdf guide_en.MD --stylesheet .github/workflows/pdf-style.css
```

Quiz languages are whatever keys exist in `LANG_TITLES` inside `utils/build_practical_test_html.py` (currently en, ru, ja, zh, it, zh-tw) — this set is independent of which guides/PDFs exist, so add a key there to enable a new quiz language.

## CI

`.github/workflows/markdown-to-pdf.yml` runs on push to `main` (and manual dispatch): installs `fonts-noto-cjk` (CJK rendering) + `md-to-pdf`, converts every `guide_*.md` to PDF using `.github/workflows/pdf-style.css`, then commits the results back to `main` with `[skip ci]`. PDF generation needs no review — only the Markdown does.

## Conventions

- **Commits:** conventional-ish — `feat:` / `feature:` / `chore:` / `docs:`. Translations land as PRs (e.g. "add Turkish (tr) study guide translation").
- **Adding a language:** create `guide_<lang>.md`, add it to both lists in `README.md` (Study Guide + PDF Version); the PDF is generated automatically on merge. For an interactive quiz, also add the language to `LANG_TITLES` and ensure `extract_question.py` recognizes that language's localized question markers.
- Keep translations structurally faithful to `guide_en.MD` (same chapters, scenarios, and question numbering).
