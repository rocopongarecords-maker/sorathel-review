// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rocopongarecords-maker.github.io',
  base: '/sorathel-review',
  vite: {
    assetsInclude: ['**/*.md'],
  },
});
