import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import UnoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site';

export default defineConfig({
  site: site.url,
  // Site institucional é estático: sai HTML puro pro Firebase Hosting.
  // Vue entra como island (`client:*`) só onde precisa de interação.
  integrations: [
    vue(),
    mdx(),
    UnoCSS({ injectReset: false }),
    // O manual de marca é material interno: fica fora do sitemap (e do robots).
    sitemap({ filter: (page) => !page.includes('/marca') }),
  ],
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
});
