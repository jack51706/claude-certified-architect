<script>
  import { t } from '@/lib/ui.js';
  import { md } from '@/lib/md.js';

  let { terms = [], lang = 'en' } = $props();
  const primary = lang === 'zh-tw' ? 'zh' : 'en';

  let q = $state('');
  let tag = $state('all');

  const tags = $derived(['all', ...[...new Set(terms.map((x) => x.tag))]]);
  const filtered = $derived(
    terms.filter((x) => {
      const okTag = tag === 'all' || x.tag === tag;
      const s = q.trim().toLowerCase();
      const okQ = !s || [x.term, x.zh, x.def_en, x.def_zh, x.tag].some((v) => v.toLowerCase().includes(s));
      return okTag && okQ;
    })
  );
</script>

<div class="gloss">
  <div class="toolbar">
    <input class="search" type="search" placeholder={t(lang, 'search')} bind:value={q} />
    <div class="tags">
      {#each tags as tg}
        <button class={'tagchip' + (tag === tg ? ' on' : '')} onclick={() => (tag = tg)}>
          {tg === 'all' ? t(lang, 'allScenarios') : tg}
        </button>
      {/each}
    </div>
  </div>

  <p class="count">{filtered.length} / {terms.length}</p>

  {#if filtered.length === 0}
    <p class="empty">{t(lang, 'noTerms')}</p>
  {:else}
    <div class="list">
      {#each filtered as x}
        <div class="entry">
          <div class="head">
            <span class="term">{x.term}</span>
            <span class="zh">{x.zh}</span>
            <span class="tag">{x.tag}</span>
          </div>
          <div class="def">{@html md(primary === 'zh' ? x.def_zh : x.def_en)}</div>
          <div class="def sec">{@html md(primary === 'zh' ? x.def_en : x.def_zh)}</div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .gloss {
    margin-top: 1rem;
  }
  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 0.8rem;
  }
  .search {
    padding: 0.5rem 0.7rem;
    border-radius: 0.5rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    max-width: 22rem;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .tagchip {
    font-size: var(--sl-text-xs);
    padding: 0.25rem 0.7rem;
    border-radius: 1rem;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-bg);
    color: var(--sl-color-gray-2);
    cursor: pointer;
  }
  .tagchip.on {
    background: var(--sl-color-accent);
    color: var(--sl-color-white);
    border-color: transparent;
  }
  .count {
    color: var(--sl-color-gray-3);
    font-size: var(--sl-text-xs);
    margin: 0 0 0.6rem;
  }
  .list {
    display: grid;
    gap: 0.6rem;
  }
  .entry {
    border: 1px solid var(--sl-color-gray-6);
    border-radius: 0.6rem;
    padding: 0.7rem 0.9rem;
  }
  .head {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin-bottom: 0.3rem;
  }
  .term {
    font-weight: 700;
  }
  .zh {
    color: var(--sl-color-gray-2);
  }
  .tag {
    margin-inline-start: auto;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--sl-color-accent-high);
    background: color-mix(in srgb, var(--sl-color-accent) 14%, transparent);
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
  }
  .def {
    line-height: 1.55;
  }
  .def.sec {
    color: var(--sl-color-gray-3);
    font-size: 0.93em;
    margin-top: 0.2rem;
  }
</style>
