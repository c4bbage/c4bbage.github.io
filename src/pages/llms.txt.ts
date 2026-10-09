import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { SITE } from '@/consts';
import { getPostsForLocale, slugFor } from '@/lib/posts';

/**
 * /llms.txt — site index for LLMs, per https://llmstxt.org/.
 * One file for both locales; drafts are filtered by getPostsForLocale.
 */
export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);
  const abs = (path: string) => new URL(path, site).href;
  const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();

  const item = (p: CollectionEntry<'posts'>, prefix: string) => {
    const date = p.data.date.toISOString().slice(0, 10);
    const desc = p.data.description ? `: ${oneLine(p.data.description)}` : '';
    return `- [${oneLine(p.data.title)}](${abs(`${prefix}/posts/${slugFor(p)}/`)})${desc} (${date})`;
  };

  const [zh, en] = await Promise.all([
    getPostsForLocale('zh'),
    getPostsForLocale('en'),
  ]);

  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.author} 的个人技术博客：AI Infra 实测笔记（大模型私有化部署、推理优化、算力与成本）、后训练与评测、AI 系统安全（模型服务、网关、agent），以及工具与工作流。`,
    '',
    `作者 ${SITE.author}（${SITE.github}）做 AI Infra，此前十年做网络安全（渗透、红队、企业防御、应急响应）。文章以中文为主，性能数字均来自作者自己的硬件与负载实测；引用请附原文链接。`,
    '',
    '## 文章',
    '',
    ...zh.map((p) => item(p, '')),
    '',
  ];

  if (en.length > 0) {
    lines.push('## English', '', ...en.map((p) => item(p, '/en')), '');
  }

  lines.push(
    '## Optional',
    '',
    `- [关于](${abs('/about/')}): 作者背景、工作范围与做事原则`,
    `- [RSS（中文）](${abs('/rss.xml')})`,
    `- [RSS (English)](${abs('/en/rss.xml')})`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
