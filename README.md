# c4bbage.github.io

> Source for [blog.dobest1.com](https://blog.dobest1.com). Astro 5, bilingual (zh / en), GitHub Pages.

## Layout

```
src/
  consts.ts           # site metadata (single source of truth)
  content.config.ts   # typed schemas for posts / notes
  i18n/               # translations and helpers
  components/         # UI atoms + MDX components
  layouts/            # BaseLayout, PostLayout
  pages/              # zh routes at /, en routes at /en/
  content/
    posts/{zh,en}/    # one bilingual pair per topic
    notes/            # short fragments
```

## Develop

```bash
npm install
npm run dev       # http://localhost:4321/
```

## Write a post

Create both files. Drafts are excluded from production builds.

```
src/content/posts/zh/2026-05-29-some-slug.mdx
src/content/posts/en/2026-05-29-some-slug.mdx
```

Frontmatter required: `title`, `date`, `lang`. See `src/content.config.ts` for the full schema.

## Deploy

Push to `main`. The `.github/workflows/deploy.yml` action builds and deploys to GitHub Pages.
DNS / CNAME (`blog.dobest1.com`) is unchanged from the legacy site.

## History

The old MkDocs blog (2017–2020) lives at the `legacy-2017` tag. Not in any active branch.
