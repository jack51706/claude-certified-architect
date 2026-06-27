<script>
  import { onMount } from 'svelte';
  import { loadSrs, saveSrs } from '@/lib/store.js';
  import { t } from '@/lib/ui.js';
  import { md } from '@/lib/md.js';

  let { cards = [], lang = 'en' } = $props();
  const primary = lang === 'zh-tw' ? 'zh' : 'en';
  const secondary = primary === 'en' ? 'zh' : 'en';
  const DAY = 86400000;

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  let srs = $state({});
  let queue = $state([]);
  let pos = $state(0);
  let flipped = $state(false);
  let ready = $state(false);

  onMount(() => {
    srs = loadSrs();
    rebuild();
    ready = true;
  });

  function rebuild() {
    const now = Date.now();
    queue = cards.filter((c) => {
      const s = srs[slug(c.term)];
      return !s || s.due <= now;
    }).map((c) => slug(c.term));
    pos = 0;
    flipped = false;
  }

  const current = $derived.by(() => {
    if (pos < 0 || pos >= queue.length) return null;
    const cid = queue[pos];
    return cards.find((c) => slug(c.term) === cid) || null;
  });
  const isNew = $derived(current ? !srs[slug(current.term)] : false);
  const remaining = $derived(queue.length);

  function grade(kind) {
    const c = current;
    if (!c) return;
    const cid = slug(c.term);
    const now = Date.now();
    const s = { ease: 2.3, interval: 0, reps: 0, ...(srs[cid] || {}) };

    if (kind === 'again') {
      s.ease = Math.max(1.3, s.ease - 0.2);
      s.interval = 0;
      s.reps = 0;
    } else if (kind === 'hard') {
      s.ease = Math.max(1.3, s.ease - 0.15);
      s.interval = Math.max(1, Math.round((s.interval || 1) * 1.2));
      s.reps += 1;
    } else if (kind === 'good') {
      s.interval = s.interval ? Math.round(s.interval * s.ease) : 1;
      s.reps += 1;
    } else if (kind === 'easy') {
      s.ease += 0.15;
      s.interval = s.interval ? Math.round(s.interval * s.ease * 1.3) : 2;
      s.reps += 1;
    }
    s.due = now + (kind === 'again' ? 0 : s.interval * DAY);
    srs = { ...srs, [cid]: s };
    saveSrs(srs);
    flipped = false;

    // remove current; for "again", re-queue at the end of the session
    const rest = [...queue.slice(0, pos), ...queue.slice(pos + 1)];
    queue = kind === 'again' ? [...rest, cid] : rest;
    if (pos >= queue.length) pos = 0;
  }

  function reset() {
    const msg = lang === 'zh-tw' ? '重設所有字卡的複習進度?' : 'Reset all flashcard review progress?';
    if (typeof confirm !== 'undefined' && !confirm(msg)) return;
    srs = {};
    saveSrs({});
    rebuild();
  }
</script>

<div class="cards-wrap">
  <div class="bar">
    <span class="due">{t(lang, 'dueToday')}: <b>{remaining}</b></span>
    <span class="spacer"></span>
    <button class="ghost danger" onclick={reset}>{t(lang, 'resetCards')}</button>
  </div>

  {#if ready && !current}
    <p class="done">{t(lang, 'allDone')}</p>
  {:else if current}
    <div class="card" class:flipped onclick={() => (flipped = !flipped)} role="button" tabindex="0"
      onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (flipped = !flipped)}>
      <span class="kind">{isNew ? t(lang, 'newCard') : '↻'}</span>
      {#if !flipped}
        <div class="face front">
          <div class="term">{current.term}</div>
          <div class="zh">{current.zh}</div>
          <div class="hint">{t(lang, 'showAnswer')}</div>
        </div>
      {:else}
        <div class="face back">
          <div class="tag">{current.tag}</div>
          <div class="def">{@html md(primary === 'zh' ? current.def_zh : current.def_en)}</div>
          <div class="def sec">{@html md(primary === 'zh' ? current.def_en : current.def_zh)}</div>
        </div>
      {/if}
    </div>

    {#if flipped}
      <div class="grades">
        <button class="g again" onclick={() => grade('again')}>{t(lang, 'again')}</button>
        <button class="g hard" onclick={() => grade('hard')}>{t(lang, 'hard')}</button>
        <button class="g good" onclick={() => grade('good')}>{t(lang, 'good')}</button>
        <button class="g easy" onclick={() => grade('easy')}>{t(lang, 'easy')}</button>
      </div>
    {:else}
      <p class="tap">{t(lang, 'flip')} ↑</p>
    {/if}
  {/if}
</div>

<style>
  .cards-wrap {
    margin-top: 1rem;
    max-width: 40rem;
  }
  .bar {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  .spacer {
    flex: 1;
  }
  .due b {
    color: var(--sl-color-accent-high);
  }
  .ghost {
    padding: 0.35rem 0.7rem;
    border-radius: 0.5rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    cursor: pointer;
  }
  .ghost.danger {
    color: #b91c1c;
  }
  .card {
    position: relative;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.8rem;
    padding: 2rem 1.5rem;
    min-height: 11rem;
    display: grid;
    place-items: center;
    text-align: center;
    cursor: pointer;
    background: var(--sl-color-bg-nav);
  }
  .card:hover {
    border-color: var(--sl-color-accent);
  }
  .kind {
    position: absolute;
    top: 0.6rem;
    inset-inline-start: 0.8rem;
    font-size: 0.7rem;
    color: var(--sl-color-gray-3);
  }
  .term {
    font-size: 1.4rem;
    font-weight: 800;
  }
  .zh {
    color: var(--sl-color-gray-2);
    margin-top: 0.3rem;
    font-size: 1.05rem;
  }
  .hint {
    margin-top: 1rem;
    font-size: 0.75rem;
    color: var(--sl-color-gray-3);
  }
  .back .tag {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--sl-color-accent-high);
    margin-bottom: 0.6rem;
  }
  .def {
    line-height: 1.6;
  }
  .def.sec {
    color: var(--sl-color-gray-3);
    font-size: 0.92em;
    margin-top: 0.5rem;
  }
  .tap {
    text-align: center;
    color: var(--sl-color-gray-3);
    font-size: 0.8rem;
    margin-top: 0.6rem;
  }
  .grades {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    margin-top: 0.8rem;
  }
  .g {
    padding: 0.6rem;
    border-radius: 0.5rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    font-weight: 600;
    cursor: pointer;
  }
  .g.again:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
  .g.hard:hover {
    border-color: #d97706;
    color: #d97706;
  }
  .g.good:hover {
    border-color: #2563eb;
    color: #2563eb;
  }
  .g.easy:hover {
    border-color: #16a34a;
    color: #16a34a;
  }
  .done {
    text-align: center;
    padding: 2.5rem 1rem;
    font-size: 1.1rem;
    color: var(--sl-color-gray-2);
  }
</style>
