<script>
  import { onMount } from 'svelte';
  import { loadProgress, saveAnswer, clearProgress } from '@/lib/store.js';
  import { t } from '@/lib/ui.js';

  let { questions = [], lang = 'en' } = $props();

  const primary = lang === 'zh-tw' ? 'zh' : 'en';
  const secondary = primary === 'en' ? 'zh' : 'en';

  let answers = $state({});
  let scenarioFilter = $state('all');
  let onlyIncorrect = $state(false);
  let showSecondary = $state(true);
  let idx = $state(0);

  onMount(() => {
    answers = { ...loadProgress() };
  });

  const scenarioList = $derived.by(() => {
    const seen = new Map();
    for (const q of questions) if (!seen.has(q.scenario.en)) seen.set(q.scenario.en, q.scenario[primary]);
    return [...seen.entries()];
  });

  const filtered = $derived(
    questions.filter((q) => {
      const okScenario = scenarioFilter === 'all' || q.scenario.en === scenarioFilter;
      const a = answers[q.n];
      const okWrong = !onlyIncorrect || (a && !a.correct);
      return okScenario && okWrong;
    })
  );

  // Keep idx valid as the filter changes.
  $effect(() => {
    const max = Math.max(0, filtered.length - 1);
    if (idx > max) idx = max;
  });

  const current = $derived(filtered[idx]);
  const answeredCount = $derived(Object.keys(answers).length);
  const correctCount = $derived(Object.values(answers).filter((a) => a.correct).length);
  const accuracy = $derived(answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0);

  function choose(q, letter) {
    const correct = letter === q.correct;
    answers = { ...answers, [q.n]: { chosen: letter, correct, ts: Date.now() } };
    saveAnswer(q.n, letter, correct);
  }

  function go(delta) {
    idx = Math.min(Math.max(0, idx + delta), filtered.length - 1);
  }

  function jump(i) {
    idx = i;
  }

  function reset() {
    if (typeof confirm !== 'undefined' && !confirm(t(lang, 'resetConfirm'))) return;
    answers = {};
    clearProgress();
    idx = 0;
  }

  function setScenario(e) {
    scenarioFilter = e.currentTarget.value;
    idx = 0;
  }

  function esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function md(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  function chipClass(q) {
    const a = answers[q.n];
    if (!a) return 'chip';
    return a.correct ? 'chip ok' : 'chip bad';
  }
  function optClass(q, letter) {
    const a = answers[q.n];
    if (!a) return 'opt';
    if (letter === q.correct) return 'opt correct';
    if (letter === a.chosen) return 'opt wrong';
    return 'opt dim';
  }
</script>

<div class="quiz">
  <div class="toolbar">
    <select aria-label={t(lang, 'allScenarios')} onchange={setScenario}>
      <option value="all">{t(lang, 'allScenarios')}</option>
      {#each scenarioList as [key, label]}
        <option value={key} selected={scenarioFilter === key}>{label}</option>
      {/each}
    </select>

    <label class="check">
      <input type="checkbox" bind:checked={onlyIncorrect} />
      {t(lang, 'onlyIncorrect')}
    </label>

    <button class="ghost" onclick={() => (showSecondary = !showSecondary)}>
      {showSecondary ? t(lang, 'hideSecondary') : t(lang, 'showSecondary')}
    </button>

    <span class="spacer"></span>

    <span class="stat">{t(lang, 'answered')}: <b>{answeredCount}</b>/{questions.length}</span>
    <span class="stat">{t(lang, 'accuracy')}: <b>{accuracy}%</b></span>
    <button class="ghost danger" onclick={reset}>{t(lang, 'resetProgress')}</button>
  </div>

  {#if filtered.length === 0}
    <p class="empty">{t(lang, 'noMatch')}</p>
  {:else if current}
    <div class="nav-grid">
      {#each filtered as q, i}
        <button class={chipClass(q) + (i === idx ? ' active' : '')} onclick={() => jump(i)} title={`#${q.n}`}>
          {q.n}
        </button>
      {/each}
    </div>

    <article class="card">
      <header class="card-head">
        <span class="badge">{current.scenario[primary]}</span>
        <span class="qnum">{t(lang, 'question')} {current.n} · {idx + 1}/{filtered.length}</span>
      </header>

      <div class="situation">{@html md(current.situation[primary])}</div>
      {#if showSecondary}
        <div class="situation secondary">{@html md(current.situation[secondary])}</div>
      {/if}

      <p class="prompt">{@html md(current.question[primary])}</p>
      {#if showSecondary}
        <p class="prompt secondary">{@html md(current.question[secondary])}</p>
      {/if}

      <div class="options">
        {#each current.options as opt}
          <button class={optClass(current, opt.letter)} onclick={() => choose(current, opt.letter)}>
            <span class="letter">{opt.letter}</span>
            <span class="opt-text">
              {@html md(opt[primary])}
              {#if showSecondary}<span class="opt-secondary">{@html md(opt[secondary])}</span>{/if}
            </span>
          </button>
        {/each}
      </div>

      {#if answers[current.n]}
        <div class="explain {answers[current.n].correct ? 'good' : 'bad'}">
          <strong>
            {answers[current.n].correct ? '✓ ' + t(lang, 'correct') : '✗ ' + t(lang, 'incorrect')}
            · {t(lang, 'why')} {current.correct}:
          </strong>
          <div>{@html md(current.explanation[primary])}</div>
          {#if showSecondary}<div class="secondary">{@html md(current.explanation[secondary])}</div>{/if}
        </div>
      {/if}

      <footer class="card-foot">
        <button class="ghost" disabled={idx === 0} onclick={() => go(-1)}>{t(lang, 'prev')}</button>
        <button class="ghost" disabled={idx >= filtered.length - 1} onclick={() => go(1)}>{t(lang, 'next')}</button>
      </footer>
    </article>
  {/if}
</div>

<style>
  .quiz {
    --ok: #15803d;
    --bad: #b91c1c;
    --ok-bg: color-mix(in srgb, #16a34a 14%, transparent);
    --bad-bg: color-mix(in srgb, #dc2626 14%, transparent);
    margin-top: 1rem;
  }
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }
  .toolbar select,
  .toolbar .check,
  .toolbar .ghost,
  .toolbar .stat {
    font-size: var(--sl-text-sm);
  }
  select {
    padding: 0.35rem 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
  }
  .check {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    cursor: pointer;
  }
  .spacer {
    flex: 1;
  }
  .stat {
    color: var(--sl-color-gray-2);
  }
  .stat b {
    color: var(--sl-color-text);
  }
  .ghost {
    padding: 0.35rem 0.7rem;
    border-radius: 0.5rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    cursor: pointer;
  }
  .ghost:hover:not(:disabled) {
    background: var(--sl-color-gray-6);
  }
  .ghost:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .ghost.danger {
    color: var(--bad);
    border-color: color-mix(in srgb, var(--bad) 40%, transparent);
  }
  .nav-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-height: 6.5rem;
    overflow-y: auto;
    padding: 0.4rem;
    border: 1px solid var(--sl-color-gray-6);
    border-radius: 0.6rem;
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
  .chip.ok {
    background: var(--ok-bg);
    color: var(--ok);
    border-color: transparent;
  }
  .chip.bad {
    background: var(--bad-bg);
    color: var(--bad);
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
    align-items: center;
    gap: 0.5rem;
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
  .qnum {
    color: var(--sl-color-gray-3);
    font-size: var(--sl-text-xs);
  }
  .situation {
    border: 1px solid var(--sl-color-gray-6);
    border-radius: 0.6rem;
    padding: 0.7rem 0.9rem;
    margin-bottom: 0.6rem;
    line-height: 1.6;
  }
  .prompt {
    font-weight: 700;
    margin: 0.8rem 0 0.4rem;
  }
  .secondary {
    color: var(--sl-color-gray-3);
    font-size: 0.95em;
  }
  .situation.secondary {
    background: var(--sl-color-gray-7, transparent);
  }
  .options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.8rem 0;
  }
  .opt {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    text-align: start;
    padding: 0.7rem 0.9rem;
    border: 1.5px solid var(--sl-color-gray-5);
    border-radius: 0.6rem;
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    cursor: pointer;
    width: 100%;
  }
  .opt:hover {
    border-color: var(--sl-color-accent);
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
  .opt-text {
    line-height: 1.5;
  }
  .opt-secondary {
    display: block;
    color: var(--sl-color-gray-3);
    font-size: 0.95em;
    margin-top: 0.15rem;
  }
  .opt.correct {
    border-color: var(--ok);
    background: var(--ok-bg);
  }
  .opt.correct .letter {
    background: var(--ok);
    color: #fff;
  }
  .opt.wrong {
    border-color: var(--bad);
    background: var(--bad-bg);
  }
  .opt.wrong .letter {
    background: var(--bad);
    color: #fff;
  }
  .opt.dim {
    opacity: 0.6;
  }
  .explain {
    border-radius: 0.6rem;
    padding: 0.8rem 1rem;
    line-height: 1.6;
    border-inline-start: 4px solid var(--sl-color-gray-4);
    background: var(--sl-color-gray-6);
  }
  .explain.good {
    border-inline-start-color: var(--ok);
  }
  .explain.bad {
    border-inline-start-color: var(--bad);
  }
  .card-foot {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .empty {
    color: var(--sl-color-gray-3);
    padding: 2rem;
    text-align: center;
  }
  :global(.quiz code) {
    font-size: 0.9em;
  }
</style>
