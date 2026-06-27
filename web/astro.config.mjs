// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

// Deploy-time overrides (set by the GitHub Pages workflow). Local dev uses '/'.
const SITE = process.env.SITE_URL || 'https://example.github.io';
const BASE = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [
    starlight({
      title: 'Claude Architect Academy',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
      },
      sidebar: [
        {
          label: 'Study Guide',
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Practice',
          items: [
            { label: 'Question bank', link: '/practice/' },
            { label: 'Mock exam', link: '/exam/' },
            { label: 'Flashcards', link: '/flashcards/' },
            { label: 'Progress', link: '/progress/' },
          ],
        },
        {
          label: 'Reference',
          items: [{ label: 'Glossary (EN↔中)', link: '/glossary/' }],
        },
      ],
    }),
    svelte(),
    mdx(),
  ],
});
