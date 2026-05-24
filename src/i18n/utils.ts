import { ui, type UIKey } from './ui';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/consts';

export function getLocaleFromUrl(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && (LOCALES as readonly string[]).includes(first)) {
    return first as Locale;
  }
  return DEFAULT_LOCALE;
}

export function t(locale: Locale) {
  return (key: UIKey): string => ui[locale][key] ?? ui[DEFAULT_LOCALE][key] ?? key;
}

/**
 * Build a route path for the given locale. The default locale lives at the
 * root; non-default locales are prefixed with `/{locale}`.
 */
export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized;
  return `/${locale}${normalized === '/' ? '' : normalized}`;
}

export function altLocale(locale: Locale): Locale {
  return locale === 'zh' ? 'en' : 'zh';
}

/**
 * Format a date for display. Returns ISO-ish so it works the same on
 * server and client without timezone surprises.
 */
export function formatDate(date: Date, locale: Locale): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  if (locale === 'zh') return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
  return new Date(Date.UTC(y, Number(m) - 1, Number(d))).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function estimateReadingMinutes(content: string): number {
  const cjkCharCount = (content.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const wordCount = content
    .replace(/[\u4e00-\u9fff]/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.ceil(cjkCharCount / 500 + wordCount / 220);
  return Math.max(1, minutes);
}
