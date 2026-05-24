import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '@/consts';
import { getPostsForLocale, slugFor } from '@/lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPostsForLocale('en');
  return rss({
    title: SITE.rssTitle.en,
    description: SITE.description.en,
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description ?? '',
      link: `/en/posts/${slugFor(p)}/`,
      categories: p.data.tags,
    })),
    customData: '<language>en-US</language>',
  });
}
