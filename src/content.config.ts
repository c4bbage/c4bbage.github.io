import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Posts — bilingual. Each language lives in its own subfolder so the
 * subagent can drop two parallel files per topic.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      lang: z.enum(['zh', 'en']),
      slug: z.string().optional(),
      tags: z.array(z.string()).default([]),
      categories: z
        .array(
          z.enum(['ai', 'infra', 'security', 'tools', 'career', 'research']),
        )
        .default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      crosspost: z.string().optional(),
    }),
});

/**
 * Notes — short fragments, single-language, no formal structure.
 */
const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['zh', 'en']).default('zh'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, notes };
