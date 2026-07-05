<script>
  import { onMount } from 'svelte';
  import { loadProgress, loadExams, loadSrs, loadMeta, dayKey, exportAll, importAll, resetAll } from '@/lib/store.js';
  import { t } from '@/lib/ui.js';

  let { questions = [], lang = 'en' } = $props();
  const primary = lang === 'zh-tw' ? 'zh' : 'en';
  // Respect Astro's base path (e.g. "/repo-name/" on GitHub project Pages).
  const base = import.meta.env.BASE_URL;
  const practiceHref = `${base}${lang === 'zh-tw' ? 'zh-tw/practice/' : 'practice/'}`;

  let progress = $state({});
  let exams = $state([]);
  let srs = $state({});
  let meta = $state({});
  onMount(() => {
    progress = loadProgress();
    exams = loadExams();
    srs = loadSrs();
    meta = loadMeta();
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

  // Study streak from the per-day activity log (survives until a full day is missed).
  const streak = $derived.by(() => {
    const act = meta.activity || {};
    const d = new Date();
    if (!act[dayKey(d)]) d.setDate(d.getDate() - 1);
    let n = 0;
    while (act[dayKey(d)]) {
      n += 1;
      d.setDate(d.getDate() - 1);
    }
    return n;
  });

  const srsStats = $derived.by(() => {
    const entries = Object.values(srs);
    const now = Date.now();
    return { learned: entries.length, due: entries.filter((s) => s.due <= now).length };
  });

  // Mock-exam score trend — one series; the dashed 720 line encodes pass/fail
  // by position, so the status-colored dots are never color-alone.
  const W = 560;
  const H = 130;
  const PADX = 26;
  const TOP = 12;
  const BOT = 26;
  const trend = $derived(exams.slice(-20));
  const dom = $derived.by(() => {
    if (trend.length < 2) return null;
    const scores = trend.map((e) => e.scaled);
    return {
      lo: Math.max(100, Math.min(720, ...scores) - 60),
      hi: Math.min(1000, Math.max(720, ...scores) + 60),
    };
  });
  const ty = (v) => TOP + ((dom.hi - v) / (dom.hi - dom.lo)) * (H - TOP - BOT);
  const tx = (i) => PADX + (i * (W - 2 * PADX)) / Math.max(1, trend.length - 1);
  const points = $derived(dom ? trend.map((e, i) => `${tx(i)},${ty(e.scaled)}`).join(' ') : '');

  function shortDate(ts) {
    return new Date(ts).toLocaleDateString(lang === 'zh-tw' ? 'zh-TW' : 'en-US', { month: 'numeric', day: 'numeric' });
  }

  let fileInput = $state(null);

  function doExport() {
    const blob = new Blob([JSON.stringify(exportAll(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cca-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function doImport(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      importAll(JSON.parse(await f.text()));
      location.reload();
    } catch {
      if (typeof alert !== 'undefined') alert(t(lang, 'importBad'));
    } finally {
      e.target.value = '';
    }
  }

  function doReset() {
    if (typeof confirm !== 'undefined' && !confirm(t(lang, 'resetAllConfirm'))) return;
    resetAll();
    location.reload();
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
      {#if streak > 0}
        <div class="kpi">
          <div class="big">🔥 {streak}</div>
          <div class="lbl">{t(lang, 'streakLabel')}</div>
        </div>
      {/if}
      {#if srsStats.learned > 0}
        <div class="kpi">
          <div class="big">{srsStats.due}</div>
          <div class="lbl">{t(lang, 'cardsDue')} · {srsStats.learned} {t(lang, 'cardsLearned')}</div>
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

    {#if dom}
      <h3>{t(lang, 'scoreTrend')}</h3>
      <svg
        class="trend"
        viewBox="0 0 {W} {H}"
        role="img"
        aria-label={`${t(lang, 'scoreTrend')}: ${trend.map((e) => e.scaled).join(', ')}`}
      >
        <line class="passline" x1={PADX} x2={W - PADX} y1={ty(720)} y2={ty(720)} stroke-dasharray="4 4" />
        <text class="axis" x={W - PADX} y={ty(720) - 5} text-anchor="end">720</text>
        <polyline class="line" {points} />
        {#each trend as e, i}
          <circle class={'dot ' + (e.passed ? 'pass' : 'fail')} cx={tx(i)} cy={ty(e.scaled)} r="4" />
          <circle class="hit" cx={tx(i)} cy={ty(e.scaled)} r="11">
            <title>{shortDate(e.ts)} · {e.scaled} · {e.passed ? t(lang, 'passed') : t(lang, 'failed')}</title>
          </circle>
        {/each}
        <text class="axis" x={PADX} y={H - 6}>{shortDate(trend[0].ts)}</text>
        <text class="axis" x={W - PADX} y={H - 6} text-anchor="end">{shortDate(trend[trend.length - 1].ts)}</text>
      </svg>
    {/if}

    <p class="cta"><a href={practiceHref}>{t(lang, 'practice')} →</a></p>
  {/if}

  <div class="data">
    <h3>{t(lang, 'dataSection')}</h3>
    <p class="hint">{t(lang, 'dataHint')}</p>
    <div class="data-actions">
      <button class="ghost" onclick={doExport}>{t(lang, 'exportData')}</button>
      <button class="ghost" onclick={() => fileInput?.click()}>{t(lang, 'importData')}</button>
      <button class="ghost danger" onclick={doReset}>{t(lang, 'resetAllData')}</button>
      <input type="file" accept="application/json,.json" bind:this={fileInput} onchange={doImport} hidden />
    </div>
  </div>
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
  .trend {
    width: 100%;
    height: auto;
    display: block;
    margin: 0.4rem 0 1rem;
  }
  .trend .line {
    fill: none;
    stroke: var(--sl-color-accent);
    stroke-width: 2;
  }
  .trend .dot {
    stroke: var(--sl-color-bg-nav);
    stroke-width: 2;
  }
  .trend .dot.pass {
    fill: #16a34a;
  }
  .trend .dot.fail {
    fill: #dc2626;
  }
  .trend .hit {
    fill: transparent;
  }
  .trend .passline {
    stroke: var(--sl-color-gray-5);
    stroke-width: 1;
  }
  .trend .axis {
    fill: var(--sl-color-gray-3);
    font-size: 10px;
  }
  .data {
    margin-top: 2rem;
    border-top: 1px solid var(--sl-color-gray-6);
    padding-top: 1rem;
  }
  .hint {
    color: var(--sl-color-gray-3);
    font-size: 0.85em;
  }
  .data-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
  .ghost {
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    cursor: pointer;
  }
  .ghost.danger {
    color: #b91c1c;
  }
  @media (max-width: 30rem) {
    .row {
      grid-template-columns: 1fr;
      gap: 0.2rem;
    }
  }
</style>
