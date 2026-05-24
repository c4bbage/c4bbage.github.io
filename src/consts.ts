/**
 * Site-wide constants. Edit here, never hardcode.
 */

export const SITE = {
  url: 'https://blog.dobest1.com',
  title: 'c4bbage / blog',
  author: 'c4bbage',
  authorUrl: 'https://github.com/c4bbage',
  github: 'https://github.com/c4bbage',
  rssTitle: { zh: 'c4bbage 的博客', en: "c4bbage's blog" },
  description: {
    zh: '随手记一些技术与工具',
    en: 'A small place for technical notes',
  },
  defaultOgImage: '/og-default.png',
  themeColor: '#06b6d4',
  startYear: 2026,
} as const;

export const LOCALES = ['zh', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'zh';

export const NAV = [
  { key: 'home', href: '/' },
  { key: 'posts', href: '/posts/' },
  { key: 'about', href: '/about/' },
] as const;
