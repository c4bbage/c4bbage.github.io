import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/consts';

/**
 * Strip the leading locale segment from a content ID. `glob` loader produces
 * IDs like `zh/2026-05-22-hello` — we want the bare slug `2026-05-22-hello`.
 */
export function stripLocale(id: string): string {
  return id.replace(/^(zh|en)\//, '');
}

export async function getPostsForLocale(locale: Locale, includeDrafts = false) {
  const all = await getCollection(
    'posts',
    (entry: CollectionEntry<'posts'>) =>
      entry.data.lang === locale && (includeDrafts || !entry.data.draft),
  );
  return all.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export function slugFor(entry: CollectionEntry<'posts'>): string {
  return entry.data.slug ?? stripLocale(entry.id).replace(/\.(md|mdx)$/, '');
}
