<script>
  import { onMount } from 'svelte';
  import { loadProgress, loadExams } from '@/lib/store.js';
  import { t } from '@/lib/ui.js';

  let { questions = [], lang = 'en' } = $props();
  const primary = lang === 'zh-tw' ? 'zh' : 'en';
  // Respect Astro's base path (e.g. "/repo-name/" on GitHub project Pages).
  const base = import.meta.env.BASE_URL;
  const practiceHref = `${base}${lang === 'zh-tw' ? 'zh-tw/practice/' : 'practice/'}`;

  let progress = $state({});
  let exams = $state([]);
  onMount(() => {
    progress = loadProgress();
    exams = loadExams();
  });

  const byScenario = $derived.by(() => {
    const m = new Map();
    for (const q of questions) {
      const k = q.scenario.en;
      if (!m.has(k)) m.set(k, { label: q.scenario[primary], total: 0, answered: 0, correct: 0 });
      const e = m.get(k);
      e.total += 1;
      const a = progress[q.n];
      if (a) {
        e.answered += 1;
        if (a.correct) e.correct += 1;
      }
    }
    return [...m.values()].map((e) => ({ ...e, acc: e.answered ? Math.round((e.correct / e.answered) * 100) : null }));
  });

  const totals = $derived.by(() => {
    const answered = byScenario.reduce((s, e) => s + e.answered, 0);
    const correct = byScenario.reduce((s, e) => s + e.correct, 0);
    return { total: questions.length, answered, correct, acc: answered ? Math.round((correct / answered) * 100) : 0 };
  });

  // Weakest = lowest accuracy among scenarios with >=3 answered.
  const weakest = $derived.by(() => {
    const c = byScenario.filter((e) => e.answered >= 3);
    if (!c.length) return null;
    return c.reduce((a, b) => (b.acc < a.acc ? b : a)).label;
  });

  function barColor(acc) {
    if (acc === null) return 'var(--sl-color-gray-5)';
    if (acc >= 80) return '#16a34a';
    if (acc >= 60) return '#d97706';
    return '#dc2626';
  }
</script>

<div class="dash">
  {#if totals.answered === 0}
    <p class="empty">{t(lang, 'noData')} <a href={practiceHref}>{t(lang, 'practice')} →</a></p>
  {:else}
    <div class="cards">
      <div class="kpi">
        <div class="big">{totals.acc}%</div>
        <div class="lbl">{t(lang, 'overallAccuracy')}</div>
      </div>
      <div class="kpi">
        <div class="big">{totals.answered}<span class="of">/{totals.total}</span></div>
        <div class="lbl">{t(lang, 'answered')}</div>
      </div>
      <div class="kpi">
        <div class="big">{totals.correct}</div>
        <div class="lbl">{t(lang, 'correct')}</div>
      </div>
      {#if exams.length}
        <div class="kpi">
          <div class="big">{Math.max(...exams.map((e) => e.scaled))}</div>
          <div class="lbl">{t(lang, 'score')} (best)</div>
        </div>
      {/if}
    </div>

    {#if weakest}
      <p class="focus">🎯 <b>{t(lang, 'weakest')}:</b> {weakest}</p>
    {/if}

    <h3>{t(lang, 'perScenario')}</h3>
    <div class="rows">
      {#each byScenario as e}
        <div class="row">
          <div class="name">{e.label}</div>
          <div class="track">
            <div class="fill" style={`width:${e.acc ?? 0}%; background:${barColor(e.acc)}`}></div>
          </div>
          <div class="val">
            {#if e.answered}{e.acc}% <span class="sub">({e.correct}/{e.answered}{e.answered < e.total ? ` · ${e.answered}/${e.total}` : ''})</span>{:else}<span class="sub">{t(lang, 'notStarted')}</span>{/if}
          </div>
        </div>
      {/each}
    </div>

    <p class="cta"><a href={practiceHref}>{t(lang, 'practice')} →</a></p>
  {/if}
</div>

<style>
  .dash {
    margin-top: 1rem;
  }
  .empty {
    color: var(--sl-color-gray-3);
    padding: 1.5rem 0;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  }
  .kpi {
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.7rem;
    padding: 1rem;
    text-align: center;
    background: var(--sl-color-bg-nav);
  }
  .kpi .big {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    color: var(--sl-color-accent-high);
  }
  .kpi .of {
    font-size: 1rem;
    color: var(--sl-color-gray-3);
    font-weight: 600;
  }
  .kpi .lbl {
    margin-top: 0.3rem;
    font-size: var(--sl-text-xs);
    color: var(--sl-color-gray-3);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .focus {
    background: color-mix(in srgb, var(--sl-color-accent) 12%, transparent);
    padding: 0.6rem 0.9rem;
    border-radius: 0.5rem;
  }
  .rows {
    display: grid;
    gap: 0.5rem;
  }
  .row {
    display: grid;
    grid-template-columns: minmax(8rem, 14rem) 1fr auto;
    align-items: center;
    gap: 0.7rem;
  }
  .name {
    font-size: var(--sl-text-sm);
  }
  .track {
    height: 0.6rem;
    border-radius: 1rem;
    background: var(--sl-color-gray-6);
    overflow: hidden;
  }
  .fill {
    height: 100%;
    border-radius: 1rem;
    transition: width 0.3s;
  }
  .val {
    font-size: var(--sl-text-sm);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .val .sub {
    color: var(--sl-color-gray-3);
    font-size: 0.85em;
  }
  .cta {
    margin-top: 1.2rem;
  }
  @media (max-width: 30rem) {
    .row {
      grid-template-columns: 1fr;
      gap: 0.2rem;
    }
  }
</style>
