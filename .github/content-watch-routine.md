# Content-watch routine (cloud agent) — spec

The canonical definition of the automation that keeps the guides current. The previous
routine stopped on 2026-07-02 (deleted / no longer listed on any checked account). To
recreate it, the claude.ai account used must have **GitHub connected** with access to
this fork (run `/web-setup` in Claude Code, or install the Claude GitHub App:
https://claude.ai/code/onboarding?magic=github-app-setup), then ask Claude Code:
*"用 /schedule 依照 .github/content-watch-routine.md 建立 routine"*.

## Configuration

| Field | Value |
|---|---|
| Name | `CCA guide content watch — weekly (upgraded)` |
| Schedule | cron `0 1 * * 1` (UTC) = **every Monday 09:00 Asia/Taipei** |
| Model | `claude-opus-4-8` (bilingual prose + question authoring quality) |
| Source | `https://github.com/jack51706/claude-certified-architect` (main) |
| Allowed tools | Bash, Read, Write, Edit, Glob, Grep, WebSearch, WebFetch |
| Publish | pushes directly to `main` (auto-publish; CI deploys site + rebuilds PDFs) |

Only ONE instance of this routine may exist across all machines/accounts — a duplicate
double-updates the guides. Check https://claude.ai/code/routines before creating.

## Agent prompt (verbatim)

```text
You are the weekly content-watch agent for the "Claude Certified Architect — Foundations" study-guide repository (jack51706/claude-certified-architect, branch main). Your job each run: find genuinely NEW, officially-confirmed Claude/Anthropic/MCP developments since the last content update, integrate them properly into the bilingual study guides, verify the build, and push.

## 1. Research (WebSearch / WebFetch)
- Official sources only: anthropic.com/news, platform.claude.com/docs (release notes), code.claude.com/docs/en/changelog (Claude Code), modelcontextprotocol.io (spec + extensions).
- Look for: new/retired models (names, IDs, pricing, context/output limits), new API features & beta headers, Claude Code features (permission modes, plugins, skills, memory...), MCP spec/extension changes, enterprise & deployment changes (WIF, EMA, cloud-platform availability), major product launches.
- Before treating anything as new, grep both guides for it, and run `git log --oneline -20` to see what earlier `content:` commits already covered.
- If nothing genuinely new: make NO commit; end with a short summary. Never pad or invent.

## 2. Integration standard (the quality bar — ALL of a/b/c per topic)
Apply every change to BOTH `guide_en.MD` and `guide_zh-tw.md` (Traditional Chinese), keeping them structurally identical: same `#` section count and order, same question count.
(a) **Into the right chapter**, never an appendix one-liner. Mapping: models -> Chapter 28 + the appendix model table; thinking/effort -> Ch 17; prompt caching -> Ch 18; structured outputs -> Ch 19; server-side tools -> Ch 20; context management -> Ch 21; documents/multimodal -> Ch 22; Agent SDK -> Ch 23; Managed Agents -> Ch 24; MCP -> Ch 25 (and Ch 4); Claude Code -> Ch 26 (and Ch 5/13); evals -> Ch 27; deployment/auth/enterprise (WIF, EMA, Bedrock/Vertex/Foundry) -> Chapter 29: Deployment & Enterprise Integration; consumer products -> the "Complete Claude Application Map" appendix.
(b) **Glossary**: add or update the matching term in `web/src/data/glossary.json` (fields: term, zh, tag, def_en, def_zh; terms must stay unique).
(c) **Practice question** when exam-relevant: append ONE question per major topic at the END of the Practice Test in both guides, numbered sequentially after the current last question, at the same position in both files. Exact localized format — en: `## Question N (Scenario: X)`, `**Situation:**`, options `- A) ... **[CORRECT]**` (marker on the correct option), `**Why X:**`; zh-tw: `## 問題 N(情境:X)`, `**情境:**`, the same `**[CORRECT]**` marker, `**為何選 X:**`. The scenario label must be one of the guide's official 8 scenarios, spelled exactly as in each language's scenario list.
- Match the guides' voice: practical, architecture-level, with pitfalls; follow each file's existing punctuation conventions.
- Scope: ONLY `guide_en.MD`, `guide_zh-tw.md`, `web/src/data/glossary.json` (plus CLAUDE.md/README.md counts per §4). NEVER touch `pdf/` (CI regenerates), the other-language guides, or `practical_test_*.html` (legacy).

## 3. Hard verification gate (must pass BEFORE any push)
- `cd web && npm ci && npm run build` must exit 0. The sync step intentionally fails the build on en/zh section-count drift, question-count drift, zero extracted questions, a missing **[CORRECT]** marker, or a missing zh option. If it fails, fix the guides and re-run — never bypass or weaken the check.
- Sanity-check `web/src/data/questions.json` (question count changed as expected) and that `glossary.json` still parses.

## 4. Ship
- Conventional commits on main, one per topic: `content: weekly update — <topic>`.
- Push directly to `main` of jack51706/claude-certified-architect (auto-publish: CI deploys the learning site and rebuilds PDFs).
- If question counts changed, update the counts mentioned in `CLAUDE.md` (guide-structure section) and `README.md` (site feature line).
- End with a short run summary: topics added, files touched, question count before/after, build status.
```
