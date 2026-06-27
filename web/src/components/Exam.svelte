<script>
  import { onDestroy } from 'svelte';
  import { saveExam, loadExams, clearExams } from '@/lib/store.js';
  import { t } from '@/lib/ui.js';
  import { md } from '@/lib/md.js';

  let { questions = [], lang = 'en', scenarioCount = 4, questionCount = 40, minutes = 60 } = $props();

  const primary = lang === 'zh-tw' ? 'zh' : 'en';
  const secondary = primary === 'en' ? 'zh' : 'en';

  let phase = $state('intro'); // intro | running | result
  let examQs = $state([]);
  let chosen = $state({});
  let idx = $state(0);
  let showSecondary = $state(true);
  let secondsLeft = $state(0);
  let history = $state([]);
  let interval = null;

  $effect(() => {
    history = loadExams();
  });

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function start() {
    const allScenarios = [...new Set(questions.map((q) => q.scenario.en))];
    const picked = new Set(shuffle(allScenarios).slice(0, scenarioCount));
    const pool = shuffle(questions.filter((q) => picked.has(q.scenario.en)));
    examQs = pool.slice(0, Math.min(questionCount, pool.length));
    chosen = {};
    idx = 0;
    phase = 'running';
    secondsLeft = minutes * 60;
    clearInterval(interval);
    interval = setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) submit(true);
    }, 1000);
  }

  function pick(n, letter) {
    chosen = { ...chosen, [n]: letter };
  }

  const answeredCount = $derived(Object.keys(chosen).length);

  let result = $state(null);

  function submit(auto = false) {
    if (!auto && answeredCount < examQs.length) {
      const left = examQs.length - answeredCount;
      const msg = lang === 'zh-tw' ? `還有 ${left} 題未作答,確定交卷?` : `${left} question(s) unanswered. Submit anyway?`;
      if (typeof confirm !== 'undefined' && !confirm(msg)) return;
    }
    clearInterval(interval);
    const total = examQs.length;
    const correct = examQs.filter((q) => chosen[q.n] === q.correct).length;
    const scaled = Math.round(100 + (correct / Math.max(1, total)) * 900);
    const passed = scaled >= 720;
    const byScenario = {};
    for (const q of examQs) {
      const k = q.scenario.en;
      byScenario[k] = byScenario[k] || { label: q.scenario[primary], c: 0, total: 0 };
      byScenario[k].total += 1;
      if (chosen[q.n] === q.correct) byScenario[k].c += 1;
    }
    result = { total, correct, scaled, passed, byScenario: Object.values(byScenario) };
    history = saveExam({ ts: Date.now(), scaled, correct, total, passed });
    phase = 'result';
    idx = 0;
  }

  function retake() {
    result = null;
    start();
  }

  function fmt(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  function resetHistory() {
    const msg = lang === 'zh-tw' ? '清除所有考試紀錄?' : 'Clear all exam history?';
    if (typeof confirm !== 'undefined' && !confirm(msg)) return;
    clearExams();
    history = [];
  }

  function dateStr(ts) {
    const d = new Date(ts);
    return d.toLocaleString(lang === 'zh-tw' ? 'zh-TW' : 'en-US', { dateStyle: 'short', timeStyle: 'short' });
  }

  onDestroy(() => clearInterval(interval));

  const current = $derived(examQs[idx]);
  const lowTime = $derived(phase === 'running' && secondsLeft <= 60);
</script>

<div class="exam">
  {#if phase === 'intro'}
    <div class="intro">
      <p>{t(lang, 'examIntro')}</p>
      <ul class="facts">
        <li><b>{scenarioCount}</b> / 8 {lang === 'zh-tw' ? '情境' : 'scenarios'}</li>
        <li><b>{Math.min(questionCount, questions.length)}</b> {t(lang, 'questionsLabel')}</li>
        <li><b>{minutes}</b> {t(lang, 'minutes')}</li>
        <li>{lang === 'zh-tw' ? '及格' : 'Pass'}: <b>720</b> / 1000</li>
      </ul>
      <button class="primary" onclick={start}>{t(lang, 'startExam')}</button>

      {#if history.length}
        <div class="history">
          <h3>{t(lang, 'history')}</h3>
          <ul>
            {#each [...history].reverse().slice(0, 8) as h}
              <li>
                <span class="score {h.passed ? 'pass' : 'fail'}">{h.scaled}</span>
                <span>{h.correct}/{h.total}</span>
                <span class="muted">{dateStr(h.ts)}</span>
                <span class="tag {h.passed ? 'pass' : 'fail'}">{h.passed ? t(lang, 'passed') : t(lang, 'failed')}</span>
              </li>
            {/each}
          </ul>
          <button class="ghost danger" onclick={resetHistory}>{lang === 'zh-tw' ? '清除紀錄' : 'Clear history'}</button>
        </div>
      {/if}
    </div>
  {:else if phase === 'running' && current}
    <div class="bar">
      <span class="timer {lowTime ? 'low' : ''}">⏱ {t(lang, 'timeLeft')}: {fmt(secondsLeft)}</span>
      <span class="spacer"></span>
      <span class="muted">{t(lang, 'answered')}: {answeredCount}/{examQs.length}</span>
      <button class="ghost" onclick={() => (showSecondary = !showSecondary)}>
        {showSecondary ? t(lang, 'hideSecondary') : t(lang, 'showSecondary')}
      </button>
      <button class="primary" onclick={() => submit(false)}>{t(lang, 'submit')}</button>
    </div>

    <div class="nav-grid">
      {#each examQs as q, i}
        <button class={'chip' + (chosen[q.n] ? ' done' : '') + (i === idx ? ' active' : '')} onclick={() => (idx = i)}>
          {i + 1}
        </button>
      {/each}
    </div>

    <article class="card">
      <header class="card-head">
        <span class="badge">{current.scenario[primary]}</span>
        <span class="muted">{idx + 1} / {examQs.length}</span>
      </header>
      <div class="situation">{@html md(current.situation[primary])}</div>
      {#if showSecondary}<div class="situation secondary">{@html md(current.situation[secondary])}</div>{/if}
      <p class="prompt">{@html md(current.question[primary])}</p>
      {#if showSecondary}<p class="prompt secondary">{@html md(current.question[secondary])}</p>{/if}

      <div class="options">
        {#each current.options as opt}
          <button class={'opt' + (chosen[current.n] === opt.letter ? ' picked' : '')} onclick={() => pick(current.n, opt.letter)}>
            <span class="letter">{opt.letter}</span>
            <span class="opt-text">
              {@html md(opt[primary])}
              {#if showSecondary}<span class="opt-secondary">{@html md(opt[secondary])}</span>{/if}
            </span>
          </button>
        {/each}
      </div>

      <footer class="card-foot">
        <button class="ghost" disabled={idx === 0} onclick={() => (idx -= 1)}>{t(lang, 'prev')}</button>
        <button class="ghost" disabled={idx >= examQs.length - 1} onclick={() => (idx += 1)}>{t(lang, 'next')}</button>
      </footer>
    </article>
  {:else if phase === 'result' && result}
    <div class="result">
      <div class="score-hero {result.passed ? 'pass' : 'fail'}">
        <div class="big">{result.scaled}</div>
        <div class="sub">/ 1000 · {result.passed ? t(lang, 'passed') : t(lang, 'failed')}</div>
        <div class="muted">{result.correct} / {result.total} {lang === 'zh-tw' ? '答對' : 'correct'}</div>
      </div>

      <h3>{t(lang, 'byScenario')}</h3>
      <div class="scen-list">
        {#each result.byScenario as s}
          <div class="scen">
            <span>{s.label}</span>
            <span class="muted">{s.c}/{s.total} · {Math.round((s.c / s.total) * 100)}%</span>
          </div>
        {/each}
      </div>

      <div class="result-actions">
        <button class="primary" onclick={retake}>{t(lang, 'retake')}</button>
      </div>

      <h3>{t(lang, 'finish')}</h3>
      <div class="review">
        {#each examQs as q}
          {@const ok = chosen[q.n] === q.correct}
          <details class={ok ? 'ok' : 'bad'}>
            <summary>
              <span class="rtag {ok ? 'ok' : 'bad'}">{ok ? '✓' : '✗'}</span>
              <span class="rscen">{q.scenario[primary]}</span>
              <span class="rq">{@html md(q.question[primary])}</span>
            </summary>
            <div class="rbody">
              <div class="situation">{@html md(q.situation[primary])}</div>
              {#if showSecondary}<div class="situation secondary">{@html md(q.situation[secondary])}</div>{/if}
              <ul class="ropts">
                {#each q.options as opt}
                  <li class={opt.letter === q.correct ? 'c' : opt.letter === chosen[q.n] ? 'w' : ''}>
                    <b>{opt.letter}.</b> {@html md(opt[primary])}
                    {#if opt.letter === q.correct}<span class="mini c">✓</span>{/if}
                    {#if opt.letter === chosen[q.n] && !ok}<span class="mini w">{t(lang, 'yourAnswer')}</span>{/if}
                  </li>
                {/each}
              </ul>
              <div class="explain"><b>{t(lang, 'why')} {q.correct}:</b> {@html md(q.explanation[primary])}</div>
              {#if showSecondary}<div class="explain secondary">{@html md(q.explanation[secondary])}</div>{/if}
            </div>
          </details>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .exam {
    --ok: #15803d;
    --bad: #b91c1c;
    --ok-bg: color-mix(in srgb, #16a34a 14%, transparent);
    --bad-bg: color-mix(in srgb, #dc2626 14%, transparent);
    margin-top: 1rem;
  }
  .muted {
    color: var(--sl-color-gray-3);
  }
  .spacer {
    flex: 1;
  }
  .primary {
    background: var(--sl-color-accent);
    color: var(--sl-color-white);
    border: none;
    padding: 0.5rem 1.1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
  }
  .primary:hover {
    background: var(--sl-color-accent-high);
  }
  .ghost {
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    cursor: pointer;
  }
  .ghost:disabled {
    opacity: 0.4;
  }
  .ghost.danger {
    color: var(--bad);
  }
  .intro .facts {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    list-style: none;
    padding: 0;
    margin: 1rem 0 1.4rem;
  }
  .intro .facts li {
    color: var(--sl-color-gray-2);
  }
  .history {
    margin-top: 2rem;
    border-top: 1px solid var(--sl-color-gray-6);
    padding-top: 1rem;
  }
  .history ul {
    list-style: none;
    padding: 0;
  }
  .history li {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.3rem 0;
  }
  .history .score {
    font-weight: 800;
    font-size: 1.05rem;
  }
  .score.pass {
    color: var(--ok);
  }
  .score.fail {
    color: var(--bad);
  }
  .tag {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
  }
  .tag.pass {
    background: var(--ok-bg);
    color: var(--ok);
  }
  .tag.fail {
    background: var(--bad-bg);
    color: var(--bad);
  }
  .bar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .timer {
    font-variant-numeric: tabular-nums;
    font-weight: 700;
  }
  .timer.low {
    color: var(--bad);
  }
  .nav-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-height: 5.5rem;
    overflow-y: auto;
    margin-bottom: 1rem;
  }
  .chip {
    width: 2rem;
    height: 1.7rem;
    font-size: 0.72rem;
    border-radius: 0.35rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-gray-2);
    cursor: pointer;
  }
  .chip.done {
    background: color-mix(in srgb, var(--sl-color-accent) 20%, transparent);
    color: var(--sl-color-accent-high);
    border-color: transparent;
  }
  .chip.active {
    outline: 2px solid var(--sl-color-accent);
    outline-offset: 1px;
  }
  .card {
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.8rem;
    padding: 1.25rem;
    background: var(--sl-color-bg-nav);
  }
  .card-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
  }
  .badge {
    background: color-mix(in srgb, var(--sl-color-accent) 18%, transparent);
    color: var(--sl-color-accent-high);
    font-size: var(--sl-text-xs);
    font-weight: 700;
    padding: 0.2rem 0.7rem;
    border-radius: 1rem;
  }
  .situation {
    border: 1px solid var(--sl-color-gray-6);
    border-radius: 0.6rem;
    padding: 0.7rem 0.9rem;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  .prompt {
    font-weight: 700;
    margin: 0.7rem 0 0.4rem;
  }
  .secondary {
    color: var(--sl-color-gray-3);
    font-size: 0.95em;
  }
  .options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.8rem 0;
  }
  .opt {
    display: flex;
    gap: 0.7rem;
    text-align: start;
    padding: 0.7rem 0.9rem;
    border: 1.5px solid var(--sl-color-gray-5);
    border-radius: 0.6rem;
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    cursor: pointer;
  }
  .opt:hover {
    border-color: var(--sl-color-accent);
  }
  .opt.picked {
    border-color: var(--sl-color-accent);
    background: color-mix(in srgb, var(--sl-color-accent) 12%, transparent);
  }
  .letter {
    flex: 0 0 1.6rem;
    height: 1.6rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--sl-color-gray-6);
    font-weight: 700;
    font-size: 0.8rem;
  }
  .opt-secondary {
    display: block;
    color: var(--sl-color-gray-3);
    font-size: 0.95em;
    margin-top: 0.15rem;
  }
  .card-foot {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .score-hero {
    text-align: center;
    padding: 1.5rem;
    border-radius: 0.8rem;
    border: 2px solid var(--sl-color-gray-5);
    margin-bottom: 1.5rem;
  }
  .score-hero.pass {
    border-color: var(--ok);
    background: var(--ok-bg);
  }
  .score-hero.fail {
    border-color: var(--bad);
    background: var(--bad-bg);
  }
  .score-hero .big {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
  }
  .score-hero .sub {
    font-weight: 700;
    margin: 0.3rem 0;
  }
  .scen-list {
    display: grid;
    gap: 0.4rem;
    margin-bottom: 1.2rem;
  }
  .scen {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0.7rem;
    border: 1px solid var(--sl-color-gray-6);
    border-radius: 0.5rem;
  }
  .result-actions {
    margin: 1rem 0 2rem;
  }
  .review details {
    border: 1px solid var(--sl-color-gray-6);
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.3rem 0.6rem;
  }
  .review summary {
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
  }
  .rtag {
    font-weight: 800;
  }
  .rtag.ok {
    color: var(--ok);
  }
  .rtag.bad {
    color: var(--bad);
  }
  .rscen {
    font-size: 0.7rem;
    color: var(--sl-color-gray-3);
    white-space: nowrap;
  }
  .rbody {
    padding: 0.6rem 0.2rem;
  }
  .ropts {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
  }
  .ropts li {
    padding: 0.3rem 0.5rem;
    border-radius: 0.4rem;
  }
  .ropts li.c {
    background: var(--ok-bg);
  }
  .ropts li.w {
    background: var(--bad-bg);
  }
  .mini {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0 0.4rem;
    border-radius: 1rem;
  }
  .mini.c {
    color: var(--ok);
  }
  .mini.w {
    color: var(--bad);
  }
  .explain {
    border-inline-start: 3px solid var(--sl-color-gray-4);
    padding: 0.3rem 0.7rem;
    margin-top: 0.4rem;
    line-height: 1.6;
  }
</style>
