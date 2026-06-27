// scripts/sync.mjs
// Regenerates the site's study content (and, in a later module, quiz data) from
// the source guides in the repo root so the Markdown stays the single source of
// truth. Run automatically before `astro dev` / `astro build`.
//
// Content model:
//   * Each top-level `#` section of guide_<lang> becomes one Starlight page.
//   * The question-bank sections (Examples / Practice Test, in any language) are
//     detected structurally and excluded — they are served by the quiz instead.
//   * en and zh-tw are paired by section order and share an English-derived slug
//     so Starlight's language switcher links the two locales together.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(__dirname, '..');
const ROOT = path.resolve(WEB, '..'); // repo root

const LANGS = [
  { code: 'en', file: 'guide_en.MD', outDir: path.join(WEB, 'src/content/docs/guides') },
  { code: 'zh-tw', file: 'guide_zh-tw.md', outDir: path.join(WEB, 'src/content/docs/zh-tw/guides') },
];

// A heading line for a question block, e.g. "## Question 12 (Scenario: …)" or
// "## 問題 12（情境：…）" — half/full-width punctuation both accepted.
const Q_HEADER = /^#{2,6}\s+\D*?\d+\s*[(（].+[)）]\s*$/;

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/^﻿/, '');
}

function parseSections(md) {
  const sections = [];
  let cur = null;
  let inFence = false;
  for (const line of md.split(/\r?\n/)) {
    // Toggle on ``` / ~~~ fences so `#` comments inside code blocks aren't
    // mistaken for section headings.
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      if (cur) cur.body.push(line);
      continue;
    }
    if (!inFence && /^# /.test(line)) {
      if (cur) sections.push(cur);
      cur = { title: line.replace(/^#\s+/, '').trim(), body: [] };
      continue;
    }
    if (cur) cur.body.push(line);
  }
  if (cur) sections.push(cur);
  return sections;
}

function isQuestionBank(section) {
  return section.body.filter((l) => Q_HEADER.test(l)).length >= 3;
}

function slugify(s) {
  return (
    s
      .toLowerCase()
      .replace(/[`*_]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'section'
  );
}

function bodyText(section) {
  return section.body.join('\n').replace(/^\n+/, '').replace(/\n+$/, '') + '\n';
}

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function parseGuide(lang) {
  return parseSections(read(lang.file)).filter((s) => !isQuestionBank(s));
}

function generateContent() {
  const parsed = LANGS.map((lang) => ({ lang, sections: parseGuide(lang) }));
  const [en, zh] = parsed;

  if (en.sections.length !== zh.sections.length) {
    console.warn(
      `[sync] WARNING: section count mismatch — en=${en.sections.length}, zh-tw=${zh.sections.length}. ` +
        `Pairing by order up to the shorter list; check guide parity.`
    );
  }
  const count = Math.min(en.sections.length, zh.sections.length);

  for (const { lang } of parsed) cleanDir(lang.outDir);

  const usedSlugs = new Set();
  for (let i = 0; i < count; i++) {
    let slug = i === 0 ? 'introduction' : slugify(en.sections[i].title);
    while (usedSlugs.has(slug)) slug += '-x';
    usedSlugs.add(slug);

    for (const { lang, sections } of parsed) {
      const section = sections[i];
      const frontmatter =
        `---\n` +
        `title: ${JSON.stringify(section.title)}\n` +
        `sidebar:\n  order: ${i}\n` +
        `---\n\n`;
      fs.writeFileSync(path.join(lang.outDir, `${slug}.md`), frontmatter + bodyText(section), 'utf8');
    }
  }

  console.log(`[sync] content: wrote ${count} page(s) per locale (en + zh-tw); question-bank sections excluded.`);
}

// ---------------------------------------------------------------------------
// Quiz data — extract the Practice Test questions from each guide and merge the
// two languages into one bilingual questions.json. (JS port of
// extract_question.py so the web build needs only Node, not Python.)
// ---------------------------------------------------------------------------

const Q_HDR = /^#{1,6}\s+\D*?(\d+)\s*[(（]\s*(.+?)\s*[)）]\s*$/;
const OPTION = /^[-*]\s*([A-Za-z])\)\s*(.*)$/;
const BOLD = /^\*\*([^*]+?)\*\*\s*(.*)$/;

function scenarioName(inner) {
  const idx = inner.search(/[:：]/);
  return (idx >= 0 ? inner.slice(idx + 1) : inner).trim();
}

function parseQuestionBlock(body) {
  let situation = '';
  let question = '';
  let explanation = '';
  const options = [];
  let inOptions = false;
  let target = null;
  for (const raw of body) {
    const line = raw.trim();
    if (!line || line === '---' || line.startsWith('#')) continue;
    const mo = line.match(OPTION);
    if (mo) {
      const correct = /\*\*\[[^\]]+\]\*\*/.test(mo[2]);
      const text = mo[2].replace(/\s*\*\*\[[^\]]+\]\*\*\s*/g, ' ').trim();
      options.push({ letter: mo[1].toUpperCase(), text, correct });
      inOptions = true;
      target = null;
      continue;
    }
    const mb = line.match(BOLD);
    if (mb) {
      const trailing = (mb[2] || '').trim();
      if (trailing === '') {
        question = mb[1].trim();
        target = null;
      } else if (!inOptions) {
        situation = trailing;
        target = 'situation';
      } else {
        explanation = trailing;
        target = 'explanation';
      }
      continue;
    }
    if (target === 'situation') situation = `${situation} ${line}`.trim();
    else if (target === 'explanation') explanation = `${explanation} ${line}`.trim();
  }
  const correct = (options.find((o) => o.correct) || {}).letter || '';
  return { situation, question, options, correct, explanation };
}

function extractQuestions(md) {
  const lines = md.split(/\r?\n/);
  const blocks = [];
  for (let i = 0; i < lines.length; ) {
    const m = lines[i].replace(/\s+$/, '').match(Q_HDR);
    if (m) {
      const body = [];
      let j = i + 1;
      while (j < lines.length && !lines[j].replace(/\s+$/, '').match(Q_HDR)) body.push(lines[j++]);
      blocks.push({ number: parseInt(m[1], 10), scenario: scenarioName(m[2]), body });
      i = j;
    } else i++;
  }
  const qs = blocks.filter((b) => b.body.filter((l) => OPTION.test(l.trim())).length >= 2);
  const resets = qs.map((b, idx) => (b.number === 1 ? idx : -1)).filter((x) => x >= 0);
  const start = resets.length ? resets[resets.length - 1] : 0;
  return qs.slice(start).map((b, idx) => ({ n: idx + 1, scenario: b.scenario, ...parseQuestionBlock(b.body) }));
}

function generateQuiz() {
  const en = extractQuestions(read('guide_en.MD'));
  const zh = extractQuestions(read('guide_zh-tw.md'));
  if (en.length !== zh.length) {
    console.warn(`[sync] WARNING: question count mismatch — en=${en.length}, zh-tw=${zh.length}.`);
  }
  const count = Math.min(en.length, zh.length);
  const merged = [];
  for (let i = 0; i < count; i++) {
    const e = en[i];
    const z = zh[i];
    const zhByLetter = Object.fromEntries(z.options.map((o) => [o.letter, o.text]));
    merged.push({
      n: e.n,
      scenario: { en: e.scenario, zh: z.scenario },
      situation: { en: e.situation, zh: z.situation },
      question: { en: e.question, zh: z.question },
      options: e.options.map((o) => ({ letter: o.letter, en: o.text, zh: zhByLetter[o.letter] || '', correct: o.correct })),
      correct: e.correct,
      explanation: { en: e.explanation, zh: z.explanation },
    });
  }
  const dataDir = path.join(WEB, 'src/data');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, 'questions.json'), JSON.stringify(merged, null, 0), 'utf8');
  console.log(`[sync] quiz: wrote ${merged.length} bilingual question(s).`);
}

generateContent();
generateQuiz();
