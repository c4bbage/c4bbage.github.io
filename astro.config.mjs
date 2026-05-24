import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://blog.dobest1.com',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: { zh: 'zh-CN', en: 'en-US' },
      },
    }),
    icon({
      include: {
        lucide: ['*'],
        'simple-icons': ['github'],
      },
    }),
  ],

  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] },
      ],
    ],
  },

  image: {
    responsiveStyles: true,
  },

  build: {
    assets: 'assets',
  },
});
